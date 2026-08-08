const { MongoClient } = require('mongodb');

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://tensorloom_db_user:413xDRjToI47ufE3@cluster0.utalvhp.mongodb.net/tensorloom_db?retryWrites=true&w=majority';

async function seed() {
  console.log('Connecting to MongoDB Atlas at cluster0.utalvhp.mongodb.net...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');

    const db = client.db('tensorloom_db');
    const quotesCollection = db.collection('quotes');
    const contactsCollection = db.collection('contacts');

    const sampleQuotes = [
      {
        quoteId: 'TL-Q-104921',
        name: 'Sarah Jenkins',
        email: 'sarah@icashiq.com',
        company: 'iCashiq Financial',
        service: 'Fintech Core',
        budget: '$25,000 - $50,000',
        projectName: 'iCashiq',
        message: 'High-performance real-time financial cashflow analytics engine.',
        status: 'downloaded',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        quoteId: 'TL-Q-208493',
        name: 'David Chen',
        email: 'david@easydocuments.com',
        company: 'Easy Documents Tech',
        service: 'Enterprise SaaS',
        budget: '$10,000 - $25,000',
        projectName: 'Easy Documents',
        message: 'Instant document compilation and workflow orchestrator.',
        status: 'downloaded',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        quoteId: 'TL-Q-309182',
        name: 'Alex Vance',
        email: 'alex@studentscorners.com',
        company: 'EdTech Network',
        service: 'EdTech & Analytics Hub',
        budget: '$10,000 - $25,000',
        projectName: 'Students Corner',
        message: 'Collaborative student portal and course management hub.',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const sampleContacts = [
      {
        contactId: 'TL-C-849102',
        name: 'Elena Rostova',
        email: 'elena@soul-sync.app',
        subject: 'Custom AI Microservice Partnership',
        message: 'Looking to integrate semantic vector search into our mobile app.',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ];

    const resQuotes = await quotesCollection.insertMany(sampleQuotes);
    console.log(`Seeded ${resQuotes.insertedCount} quotes into 'quotes' collection.`);

    const resContacts = await contactsCollection.insertMany(sampleContacts);
    console.log(`Seeded ${resContacts.insertedCount} contacts into 'contacts' collection.`);

    console.log('MongoDB Seeding complete!');
  } catch (err) {
    console.error('MongoDB Seeding failed:', err);
  } finally {
    await client.close();
  }
}

seed();
