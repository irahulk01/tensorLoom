import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { contentData } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';

  try {
    const db = await getDatabase();
    const contentCollection = db.collection('content');
    const doc = await contentCollection.findOne({ lang });

    if (doc && doc.data) {
      return NextResponse.json(doc.data);
    }
  } catch (error) {
    console.warn('MongoDB content lookup failed, falling back to local dataset:', error);
  }

  // Fallback to local dataset if MongoDB is unreachable or document not found
  const content =
    (contentData as Record<string, any>)[lang] || (contentData as Record<string, any>)['en'];
  return NextResponse.json(content);
}
