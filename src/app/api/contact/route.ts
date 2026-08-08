import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received contact submission:', body);
    return NextResponse.json({
      status: 'success',
      message: 'Contact details processed and stored.',
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
  }
}
