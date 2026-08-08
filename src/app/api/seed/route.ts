import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();

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
      {
        contactId: 'TL-C-930182',
        name: 'Marcus Vance',
        email: 'marcus@starlightgames.io',
        subject: 'Unity Backend Migration',
        message: 'Need help migrating game backend servers to Bun + Go.',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];

    const quotesCollection = db.collection('quotes');
    const contactsCollection = db.collection('contacts');

    // Insert sample quotes if collection empty
    const existingQuotesCount = await quotesCollection.countDocuments();
    let seededQuotesCount = 0;
    if (existingQuotesCount === 0) {
      const result = await quotesCollection.insertMany(sampleQuotes);
      seededQuotesCount = result.insertedCount;
    }

    // Insert sample contacts if collection empty
    const existingContactsCount = await contactsCollection.countDocuments();
    let seededContactsCount = 0;
    if (existingContactsCount === 0) {
      const result = await contactsCollection.insertMany(sampleContacts);
      seededContactsCount = result.insertedCount;
    }

    return NextResponse.json({
      status: 'success',
      message: 'MongoDB database initialized and seeded successfully.',
      database: 'tensorloom_db',
      collections: {
        quotesCount: await quotesCollection.countDocuments(),
        contactsCount: await contactsCollection.countDocuments(),
      },
      newlySeeded: {
        quotes: seededQuotesCount,
        contacts: seededContactsCount,
      },
    });
  } catch (error: any) {
    console.error('Error seeding MongoDB database:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to seed MongoDB database. Please check Atlas URI & IP Access rules.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
