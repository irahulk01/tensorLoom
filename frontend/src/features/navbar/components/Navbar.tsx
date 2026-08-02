import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  navContent: any;
  languages: any[];
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  navY?: any;
  navScale?: any;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('light-mode', saved === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('light-mode', nextTheme === 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer overflow-hidden shadow-sm backdrop-blur-md shrink-0"
      title={`Active: ${theme === 'dark' ? 'Dark' : 'Light'} Mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-violet-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-xs font-medium whitespace-nowrap overflow-hidden pr-0.5"
          >
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Navbar({ navContent, languages, currentLang, setCurrentLang }: NavbarProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isDockedBottom, setIsDockedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      let inContact = false;

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          inContact = true;
        }
      }

      const scrollY = window.scrollY;
      if (scrollY > 350 && !inContact) {
        setIsDockedBottom(true);
      } else {
        setIsDockedBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      layout
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:bottom-4 max-md:top-auto ${
        isDockedBottom
          ? 'bottom-6 top-auto max-w-2xl px-3 sm:px-4'
          : 'md:top-6 md:bottom-auto max-w-5xl px-3 sm:px-4'
      }`}
    >
      <div
        className={`backdrop-blur-md rounded-full flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDockedBottom
            ? 'bg-black/25 border border-white/20 px-4 sm:px-5 py-2 sm:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-cyan-400/30'
            : 'bg-black/30 md:bg-black/15 border border-white/15 md:border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Homepage Logo Link */}
        <a
          href="#"
          onClick={scrollToTop}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          title="Return to Homepage"
        >
          <img
            src="/logo.jpg"
            alt="tensorLoom Logo"
            className="w-5 h-5 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
          />
          {!isDockedBottom && (
            <span className="hidden lg:inline font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              TENSORLOOM
            </span>
          )}
        </a>

        {/* Section Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[11px] sm:text-xs font-medium text-gray-300 font-sans">
          {[
            { href: '#', label: navContent?.home || 'Home' },
            { href: '#services', label: navContent?.services || 'Services' },
            { href: '#work', label: navContent?.work || 'Our Work' },
            { href: '#tech-stack', label: navContent?.techStack || 'Tech Stack' },
            { href: '/blog', label: navContent?.blog || 'Blog' },
            { href: '#contact', label: navContent?.contact || 'Contact Us' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-white transition-colors group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Controls: Theme Toggle & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{languages.find((l) => l.code === currentLang)?.code.toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: isDockedBottom ? -10 : 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isDockedBottom ? -10 : 10, scale: 0.95 }}
                  className={`absolute right-0 w-40 glass-panel-light rounded-2xl overflow-hidden z-50 p-1 bg-black/90 backdrop-blur-2xl border border-white/15 shadow-2xl ${
                    isDockedBottom
                      ? 'bottom-full mb-3'
                      : 'bottom-full md:top-full mb-3 md:mt-3 md:mb-0'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {currentLang === lang.code && (
                        <Check className="w-3 h-3 ml-auto text-cyan-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
