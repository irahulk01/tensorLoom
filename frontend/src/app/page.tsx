'use client';

import { useEffect, useState } from 'react';
import { fetchContent } from '../lib/api';

import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { Beliefs } from '../components/Beliefs/Beliefs';
import { Services } from '../components/Services/Services';
import { Thinking } from '../components/Thinking/Thinking';
import { Work } from '../components/Work/Work';
import { TechStack } from '../components/TechStack/TechStack';
import Contact from '../components/Contact';
import { Footer } from '../components/Footer/Footer';
import { CurtainLoader } from '../components/Animations/CurtainLoader';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

export default function Home() {
  const [currentLang, setCurrentLang] = useState('en');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [curtainFinished, setCurtainFinished] = useState(false);

  const loadPageContent = async (lang: string) => {
    try {
      const data = await fetchContent(lang);
      setContent(data);
    } catch (err) {
      console.error('Failed to load page content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    loadPageContent(currentLang);
  }, [currentLang]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-white/20 selection:text-black relative">
      {!curtainFinished && <CurtainLoader onComplete={() => setCurtainFinished(true)} />}

      {content && (
        <>
          <div className="bg-noise" />

          <Navbar
            navContent={content.nav}
            languages={languages}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
          />

          <main className="relative z-10 w-full overflow-hidden">
            {/* 1. Introduction */}
            <Hero heroContent={content.hero} startVideo={curtainFinished} />

            {/* 2. What we believe */}
            {content.beliefsSection && <Beliefs beliefsContent={content.beliefsSection} />}

            {/* 3. What we create */}
            <Services servicesContent={content.servicesSection} />

            {/* 4. How we think */}
            {content.principlesSection && <Thinking thinkingContent={content.principlesSection} />}

            {/* 5. Proof */}
            <Work workContent={content.workSection} />

            {/* 6. Technology */}
            <TechStack />

            {/* 7. Conversation */}
            <section id="contact" className="w-full relative z-20 bg-transparent">
              <Contact translations={content.contactTranslations} />
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
