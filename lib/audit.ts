// lib/audit.ts
import { connectToDatabase } from './db';

export async function logAction(userEmail: string, action: string, details?: any) {
  const { db } = await connectToDatabase();
  const entry = {
    userEmail,
    action,
    details: details || null,
    timestamp: new Date()
  };
  await db.collection('audit').insertOne(entry);
}
