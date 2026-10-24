// lib/audit.ts
import { connectToDatabase } from './db';

export async function logAction(userEmail: string, action: string, details?: Record<string, unknown>) {
  const { db } = await connectToDatabase();
  const entry = {
    userEmail,
    action,
    details: details || null,
    timestamp: new Date()
  };
  await db.collection('audit').insertOne(entry);
}
