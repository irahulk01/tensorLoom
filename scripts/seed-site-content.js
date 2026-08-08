const { MongoClient } = require('mongodb');
const { contentData } = require('../src/lib/data.ts');

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://tensorloom_db_user:413xDRjToI47ufE3@cluster0.utalvhp.mongodb.net/tensorloom_db?retryWrites=true&w=majority';

async function seedContent() {
  console.log('Connecting to MongoDB Atlas to seed site content...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('tensorloom_db');
    const contentCollection = db.collection('content');

    for (const [lang, data] of Object.entries(contentData)) {
      await contentCollection.updateOne(
        { lang },
        { $set: { lang, data, updatedAt: new Date().toISOString() } },
        { upsert: true },
      );
      console.log(`Seeded website content for language: [${lang}]`);
    }

    console.log('Site content successfully seeded to MongoDB Atlas!');
  } catch (err) {
    console.error('Failed to seed site content:', err);
  } finally {
    await client.close();
  }
}

seedContent();
