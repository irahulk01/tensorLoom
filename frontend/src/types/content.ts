export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | string;
  content: string;
}

export interface AppContent {
  nav?: any;
  hero?: any;
  beliefsSection?: any;
  servicesSection?: any;
  principlesSection?: any;
  workSection?: any;
  contactTranslations?: any;
  [key: string]: any;
}
