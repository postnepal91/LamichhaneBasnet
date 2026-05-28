import { NextRequest } from 'next/server';
import { send, checkMethod, readBody, required, email, id } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  try {
    const body = await readBody(req);

    const submission = {
      submissionId: id('msg'),
      name: required(body.name, 'नाम'),
      email: email(body.email),
      purpose: required(body.purpose, 'उद्देश्य'),
      message: required(body.message, 'सन्देश'),
      createdAt: new Date(),
    };

    if (submission.message.length < 10) throw new Error('सन्देश कम्तीमा १० अक्षरको हुनुपर्छ।');

    const { db } = await connectToDatabase();
    await db.collection('contacts').insertOne(submission);

    return send(200, { id: submission.submissionId, message: 'सन्देश प्राप्त भयो। धन्यवाद!' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'सन्देश पठाउन सकिएन।';
    return send(400, { error: message });
  }
}
