import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'tensorLoom backend service is active',
    engine: 'Next.js Route Handler (Vercel Serverless)',
    timestamp: new Date().toISOString(),
  });
}
