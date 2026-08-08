import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, and service are required fields.' },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const quotesCollection = db.collection('quotes');

    const quoteId = `TL-Q-${Math.floor(100000 + Math.random() * 900000)}`;

    const quoteDocument = {
      quoteId,
      name,
      email,
      company: company || 'N/A',
      service,
      budget: budget || 'Undisclosed',
      message: message || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await quotesCollection.insertOne(quoteDocument);

    return NextResponse.json(
      {
        status: 'success',
        message: 'Quote request saved successfully to MongoDB.',
        quoteId,
        insertedId: result.insertedId,
        quote: quoteDocument,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error inserting quote into MongoDB:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to process quote request.',
        error: error.message || 'Database connection issue',
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id');

    const db = await getDatabase();
    const quotesCollection = db.collection('quotes');

    if (quoteId) {
      const quote = await quotesCollection.findOne({ quoteId });
      if (!quote) {
        return NextResponse.json({ status: 'error', message: 'Quote not found' }, { status: 404 });
      }
      return NextResponse.json({ status: 'success', quote });
    }

    const quotes = await quotesCollection.find({}).sort({ createdAt: -1 }).limit(50).toArray();

    return NextResponse.json({
      status: 'success',
      count: quotes.length,
      quotes,
    });
  } catch (error: any) {
    console.error('Error fetching quotes from MongoDB:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to retrieve quotes', error: error.message },
      { status: 500 },
    );
  }
}
