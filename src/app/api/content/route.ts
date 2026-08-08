import { NextRequest, NextResponse } from 'next/server';
import { contentData } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';
  const content =
    (contentData as Record<string, any>)[lang] || (contentData as Record<string, any>)['en'];
  return NextResponse.json(content);
}
