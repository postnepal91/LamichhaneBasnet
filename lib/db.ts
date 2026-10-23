import { MongoClient, Db } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'lamichhaneb';

// Use a global cache to reuse connections across serverless function invocations
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in Vercel dashboard.');
  }

  if (!clientPromise) {
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri);
        global._mongoClientPromise = client.connect().catch((error: unknown) => {
          global._mongoClientPromise = undefined;
          throw error;
        });
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production, always create a new client per cold start
      const client = new MongoClient(uri);
      clientPromise = client.connect().catch((error: unknown) => {
        clientPromise = null;
        throw error;
      });
    }
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return { client, db };
}
