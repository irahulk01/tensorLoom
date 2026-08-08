import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { status: 'error', message: 'Name and email are required fields.' },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');

    const contactId = `TL-C-${Math.floor(100000 + Math.random() * 900000)}`;

    const contactDocument = {
      contactId,
      name,
      email,
      subject: subject || 'General Inquiry',
      message: message || '',
      createdAt: new Date().toISOString(),
    };

    const result = await contactsCollection.insertOne(contactDocument);

    return NextResponse.json({
      status: 'success',
      message: 'Contact details processed and stored in MongoDB.',
      contactId,
      insertedId: result.insertedId,
      contact: contactDocument,
    });
  } catch (err: any) {
    console.error('Error saving contact to MongoDB:', err);
    return NextResponse.json(
      { status: 'error', message: 'Failed to process contact payload', error: err.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');
    const contacts = await contactsCollection.find({}).sort({ createdAt: -1 }).limit(50).toArray();

    return NextResponse.json({
      status: 'success',
      count: contacts.length,
      contacts,
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch contacts', error: err.message },
      { status: 500 },
    );
  }
}
