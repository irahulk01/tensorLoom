import { NextRequest, NextResponse } from 'next/server';

const XAI_API_KEY = process.env.XAI_API_KEY || process.env.GROK_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body.messages || [];

    if (XAI_API_KEY) {
      try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${XAI_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content:
                  "You are tensorLoom Technology's AI Assistant. tensorLoom Technology is an elite team of senior engineers (8-9 years experience) specializing in building blazing-fast Next.js frontends, backend APIs, AI integration, and cloud-native solutions. Be extremely helpful, concise, professional, and guide users to use the contact form to hire us.",
              },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            model: 'grok-beta',
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const completion = await response.json();
          const replyText = completion.choices[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({ response: replyText });
          }
        }
      } catch (err) {
        console.error('Error connecting to xAI (Grok):', err);
      }
    }

    // Fallback heuristic mock assistant if no API key or error
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    let responseText =
      "I'm tensorLoom's AI assistant. We specialize in building ultra-high performance applications with Next.js, React, and serverless APIs. How can I help you today?";
    const text = lastUserMessage.toLowerCase();

    if (text.includes('hello') || text.includes('hi')) {
      responseText =
        'Hello! I am the tensorLoom AI Assistant. I can recommend technical stacks, estimate timelines, or walk you through our services. What are you looking to build?';
    } else if (text.includes('price') || text.includes('cost')) {
      responseText =
        'Our custom engineering pricing begins at $5,000 for standard web deployments. For complex API structures or machine learning pipelines, we provide tailored quotes. Please submit the form on the right so our senior architect can scope your requirements!';
    } else if (
      text.includes('features') ||
      text.includes('what can you do') ||
      text.includes('services')
    ) {
      responseText =
        'We build React/Next.js frontends, custom API backends, custom AI agents, cloud architectures (GCP/AWS/K8s), and handle deep optimization audits (Core Web Vitals).';
    } else if (text.includes('team') || text.includes('member') || text.includes('who are you')) {
      responseText =
        'We are an elite team of senior engineers with 8-9+ years of industry experience. Our core team includes Vikram (Principal Architect), Sarah (Frontend Artisan), and Marcus (AI Specialist). We write blazing fast code.';
    }

    return NextResponse.json({ response: responseText });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
