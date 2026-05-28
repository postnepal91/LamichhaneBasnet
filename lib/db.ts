import { MongoClient, Db } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'lamichhaneb';

// Use a global cache to reuse connections across serverless function invocations
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in Vercel dashboard.');
  }

  if (!clientPromise) {
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(MONGODB_URI);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production, always create a new client per cold start
      const client = new MongoClient(MONGODB_URI);
      clientPromise = client.connect();
    }
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return { client, db };
}
