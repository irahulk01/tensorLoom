import { fallbackContentData } from './fallbackData';

const API_BASE = 'http://localhost:3001';

export async function fetchContent(lang: string) {
  try {
    const response = await fetch(`${API_BASE}/api/content?lang=${lang}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch content for language: ${lang}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(
      `[API] Backend service unreachable at ${API_BASE}. Falling back to local content.`,
      err,
    );
    return fallbackContentData[lang] || fallbackContentData['en'];
  }
}

export async function submitContact(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact');
  }

  return response.json();
}

export async function chatWithAgent(messages: { role: string; content: string }[]) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chatbot response');
  }

  return response.json();
}
