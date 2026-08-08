import { NextRequest, NextResponse } from 'next/server';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
import { getDatabase } from '@/lib/mongodb';
import { sendContactEmailNotification } from '@/lib/mailer';

// Strict Email Regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, subject, message } = body;

    // 1. Name Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        {
          status: 'error',
          field: 'name',
          message: 'Please provide a valid full name (minimum 2 characters).',
        },
        { status: 400 },
      );
    }

    // 2. Email Validation
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        {
          status: 'error',
          field: 'email',
          message: 'Please enter a valid work email address (e.g. name@company.com).',
        },
        { status: 400 },
      );
    }

    // 3. Strict International Phone Number Validation using Google's libphonenumber-js standard
    let formattedPhone = '';
    if (phone && phone.trim()) {
      const trimmedPhone = phone.trim();
      const isValid = isValidPhoneNumber(trimmedPhone);

      if (!isValid) {
        return NextResponse.json(
          {
            status: 'error',
            field: 'phone',
            message:
              'Invalid international phone number. Please include your country code (e.g. +1 555-0199 or +44 7911 123456).',
          },
          { status: 400 },
        );
      }

      const parsedNumber = parsePhoneNumberFromString(trimmedPhone);
      formattedPhone = parsedNumber ? parsedNumber.formatInternational() : trimmedPhone;
    }

    // 4. Message Validation
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        {
          status: 'error',
          field: 'message',
          message: 'Please include project details or inquiry (at least 5 characters).',
        },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');

    const contactId = `TL-C-${Math.floor(100000 + Math.random() * 900000)}`;

    const contactDocument = {
      contactId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      service: service || 'General Engineering',
      subject: subject || service || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const result = await contactsCollection.insertOne(contactDocument);

    // Send email notification via Nodemailer asynchronously in background
    sendContactEmailNotification(contactDocument).catch((err) =>
      console.warn('Background mailer error:', err),
    );

    return NextResponse.json({
      status: 'success',
      message:
        'Thank you! Your project inquiry has been verified and saved to MongoDB. A senior engineer will follow up shortly.',
      contactId,
      insertedId: result.insertedId,
      contact: contactDocument,
    });
  } catch (err: any) {
    console.error('Error processing contact submission:', err);
    return NextResponse.json(
      { status: 'error', message: 'Unable to process contact submission.', error: err.message },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '9', 10);
    const sort = searchParams.get('sort') || 'newest';

    const skip = (page - 1) * limit;
    const sortDirection = sort === 'oldest' ? 1 : -1;

    const db = await getDatabase();
    const contactsCollection = db.collection('contacts');

    const totalCount = await contactsCollection.countDocuments();
    const contacts = await contactsCollection
      .find({})
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      status: 'success',
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
        sort,
      },
      contacts,
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch contact records', error: err.message },
      { status: 500 },
    );
  }
}
