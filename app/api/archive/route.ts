import { NextRequest } from 'next/server';
import { send, checkMethod, readBody } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';

const initialItems = [
  { type: 'photos', title: 'पुरानो पारिवारिक भेटघाट', period: '१९६० दशक', summary: 'लमिछाने बस्नेत परिवारका वरिष्ठ सदस्यहरूको सामूहिक स्मृति।' },
  { type: 'docs', title: 'ताम्रपत्र र लालमोहर उल्लेख', period: 'गोरखाली काल', summary: 'भूमि, वंशावली र राजकीय आदेशसँग सम्बन्धित अभिलेख खोजको क्षेत्र।' },
  { type: 'stories', title: 'सिन्धुली युद्धको मौखिक कथा', period: 'जनश्रुति', summary: 'बस्नेत योद्धाको साहस र सीमाको रक्षा सम्बन्धी पारिवारिक वर्णन।' },
  { type: 'audio', title: 'मष्टो मन्त्र र पूजा गीत', period: 'जीवित परम्परा', summary: 'धामी-झाँक्री, ढोल, नगारा र शंखसँग जोडिएको मौखिक अभिलेख।' },
  { type: 'docs', title: 'कुलपुरोहित वंशावली रजिस्टर', period: 'पुस्तापुस्ता', summary: 'गोत्र, कुल, शाखा र विवाह सम्बन्धी जानकारीको परम्परागत स्रोत।' },
  { type: 'stories', title: 'विदेशमा बस्ने पुस्ताको पहिचान', period: 'आधुनिक काल', summary: 'बसाइँसराइपछि पनि कुलपूजा र वंश स्मृति जोगाउने अनुभव।' },
];

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST', 'GET']);
  if (!methodCheck.valid) return methodCheck.response!;

  try {
    const body = await readBody(req);
    const category = body.category || 'all';
    const searchQuery = String(body.search || '').trim();

    const { db } = await connectToDatabase();
    const archivesCollection = db.collection('archives');

    // Auto-seed archives collection if empty
    if (await archivesCollection.countDocuments() === 0) {
      await archivesCollection.insertMany(initialItems);
    }

    // If search query provided, search branches collection
    if (searchQuery) {
      const branchesCollection = db.collection('branches');
      
      // Seed branches if empty
      const initialBranches = [
        { name: 'पश्चिम नेपाल शाखा', region: 'जुम्ला, दैलेख, जाजरकोट, रुकुम, सल्यान', note: 'मष्टो परम्परा र पुराना बसोबाससँग जोडिएको मुख्य स्मृति क्षेत्र।' },
        { name: 'गोरखा सम्बन्ध', region: 'गोरखा र आसपास', note: 'नेपाल एकीकरण र गोरखाली सैनिक परम्परासँग जोडिएको शाखा।' },
        { name: 'गण्डकी/मध्य शाखा', region: 'गण्डकी क्षेत्र', note: 'बसाइँसराइ र पारिवारिक विस्तारका मौखिक विवरण भेटिने क्षेत्र।' },
        { name: 'प्रवासी शाखा', region: 'भारत, खाडी, उत्तर अमेरिका, युरोप, अस्ट्रेलिया', note: 'आधुनिक पुस्ताको पहिचान र डिजिटल अभिलेख निर्माणका लागि खुला समूह।' },
      ];
      
      if (await branchesCollection.countDocuments() === 0) {
        await branchesCollection.insertMany(initialBranches);
      }

      const results = await branchesCollection.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { region: { $regex: searchQuery, $options: 'i' } },
          { note: { $regex: searchQuery, $options: 'i' } }
        ]
      }).toArray();
      
      return send(200, { results, source: 'search' });
    }

    const filter = category === 'all' ? {} : { type: category };
    let items = await archivesCollection.find(filter).toArray();

    // Dynamically fetch and merge user-submitted stories from contributions collection
    if (category === 'all' || category === 'stories') {
      const contributionsCollection = db.collection('contributions');
      const userStories = await contributionsCollection.find({}).sort({ createdAt: -1 }).toArray();

      const mappedUserStories = userStories.map((s: any) => ({
        type: 'stories',
        title: s.title,
        period: s.category || 'मौखिक इतिहास',
        summary: s.story
      }));

      // Prepend user stories so they appear at the top
      items = [...mappedUserStories, ...items] as any;
    }

    return send(200, { items });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'अभिलेख लोड हुन सकेन।';
    return send(500, { error: message });
  }
}
