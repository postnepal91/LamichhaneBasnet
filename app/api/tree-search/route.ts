import { NextRequest } from 'next/server';
import { send, checkMethod, readBody, required } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';

const initialBranches = [
  { name: 'पश्चिम नेपाल शाखा', region: 'जुम्ला, दैलेख, जाजरकोट, रुकुम, सल्यान', note: 'मष्टो परम्परा र पुराना बसोबाससँग जोडिएको मुख्य स्मृति क्षेत्र।' },
  { name: 'गोरखा सम्बन्ध', region: 'गोरखा र आसपास', note: 'नेपाल एकीकरण र गोरखाली सैनिक परम्परासँग जोडिएको शाखा।' },
  { name: 'गण्डकी/मध्य शाखा', region: 'गण्डकी क्षेत्र', note: 'बसाइँसराइ र पारिवारिक विस्तारका मौखिक विवरण भेटिने क्षेत्र।' },
  { name: 'प्रवासी शाखा', region: 'भारत, खाडी, उत्तर अमेरिका, युरोप, अस्ट्रेलिया', note: 'आधुनिक पुस्ताको पहिचान र डिजिटल अभिलेख निर्माणका लागि खुला समूह।' },
  { name: 'काठमाडौं उपत्यका शाखा', region: 'काठमाडौं, ललितपुर, भक्तपुर', note: 'सहरी बसाइँसराइपछि स्थापित शाखा; पेसागत विविधता र आधुनिक सञ्जाल।' },
  { name: 'पूर्वी नेपाल शाखा', region: 'इलाम, धनकुटा, तेह्रथुम', note: 'पहाडी क्षेत्रका लमिछाने बस्नेत परिवारहरू; चियाबारी र कृषि परम्पराको केन्द्र।' },
];

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  try {
    const body = await readBody(req);
    const query = required(body.query, 'खोज शब्द');

    const { db } = await connectToDatabase();
    const branchesCollection = db.collection('branches');

    // Auto-seed if empty
    if (await branchesCollection.countDocuments() === 0) {
      await branchesCollection.insertMany(initialBranches);
    }

    const results = await branchesCollection.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { region: { $regex: query, $options: 'i' } },
        { note: { $regex: query, $options: 'i' } },
      ],
    }).toArray();

    return send(200, { results, total: results.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'खोज गर्न सकिएन।';
    return send(400, { error: message });
  }
}
