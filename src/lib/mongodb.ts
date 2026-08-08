import { MongoClient, Db } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://tensorloom_db_user:413xDRjToI47ufE3@cluster0.utalvhp.mongodb.net/tensorloom_db?retryWrites=true&w=majority';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(dbName = 'tensorloom_db'): Promise<Db> {
  const mongoClient = await clientPromise;
  return mongoClient.db(dbName);
}

export default clientPromise;
