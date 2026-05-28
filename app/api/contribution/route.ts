import { NextRequest } from 'next/server';
import { send, checkMethod, readBody, required, id, requireAuth } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  // Require login to submit a story
  const auth = requireAuth(req);
  if (!auth.valid) return auth.response!;

  try {
    const body = await readBody(req);

    const title = required(body.title, 'शीर्षक');
    const category = required(body.category, 'प्रकार');
    const story = required(body.story, 'विवरण');

    if (story.length < 20) throw new Error('विवरण कम्तीमा २० अक्षरको हुनुपर्छ।');

    const contribution = {
      submissionId: id('story'),
      title,
      category,
      story,
      submittedBy: auth.payload!.email,
      status: 'pending', // pending | approved | rejected
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    await db.collection('contributions').insertOne(contribution);

    return send(200, { id: contribution.submissionId, message: 'कथा सफलतापूर्वक पेश भयो। समीक्षापछि प्रकाशित हुनेछ।' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'कथा पेश गर्न सकिएन।';
    return send(400, { error: message });
  }
}
