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
      className="relative flex items-center gap-2 px-2 py-1.5 sm:px-2.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-gray-200 hover:text-white transition-all cursor-pointer overflow-hidden shadow-sm backdrop-blur-md shrink-0"
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
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
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
            className="hidden md:inline text-xs font-medium whitespace-nowrap overflow-hidden pr-0.5"
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

  const navItems = [
    { href: '#', desktopLabel: navContent?.home || 'Home', mobileLabel: null }, // Hidden on mobile since logo icon acts as Home
    {
      href: '#services',
      desktopLabel: navContent?.services || 'Services',
      mobileLabel: 'Services',
    },
    { href: '#work', desktopLabel: navContent?.work || 'Our Work', mobileLabel: 'Work' },
    {
      href: '#tech-stack',
      desktopLabel: navContent?.techStack || 'Tech Stack',
      mobileLabel: 'Stack',
    },
    { href: '/blog', desktopLabel: navContent?.blog || 'Blog', mobileLabel: 'Blog' },
    { href: '#contact', desktopLabel: navContent?.contact || 'Contact Us', mobileLabel: 'Contact' },
  ];

  return (
    <motion.nav
      layout
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      className={`fixed left-0 right-0 z-[90] mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:bottom-4 max-md:top-auto ${
        isDockedBottom
          ? 'bottom-6 top-auto max-w-2xl px-2 sm:px-4'
          : 'md:top-6 md:bottom-auto max-w-5xl px-2 sm:px-4'
      }`}
    >
      <div
        className={`backdrop-blur-md rounded-full flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDockedBottom
            ? 'bg-black/60 border border-white/20 px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] ring-1 ring-cyan-400/30'
            : 'bg-black/70 md:bg-black/30 border border-white/20 px-3 sm:px-6 py-2 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Homepage Logo Link (Acts as Home on Mobile) */}
        <a
          href="#"
          onClick={scrollToTop}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          title="Return to Homepage"
        >
          <img
            src="/logo.jpg"
            alt="tensorLoom Logo"
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
          />
          {!isDockedBottom && (
            <span className="hidden lg:inline font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              TENSORLOOM
            </span>
          )}
        </a>

        {/* Section Navigation Text Links */}
        <div className="flex items-center gap-2.5 sm:gap-5 md:gap-8 text-[11px] sm:text-xs font-semibold text-gray-200 font-sans overflow-x-auto no-scrollbar py-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-1 px-1 sm:px-0 hover:text-white transition-colors group whitespace-nowrap ${
                !item.mobileLabel ? 'hidden md:inline-block' : ''
              }`}
            >
              {item.mobileLabel && (
                <span className="md:hidden tracking-wider">{item.mobileLabel}</span>
              )}
              <span className="hidden md:inline">{item.desktopLabel}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Controls: Theme Toggle & Language Selector */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer p-0.5 sm:p-0"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{languages.find((l) => l.code === currentLang)?.code.toUpperCase()}</span>
            </button>

            {/* High-Contrast Pure White & Cyan Accent Language List */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: isDockedBottom ? -10 : 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isDockedBottom ? -10 : 10, scale: 0.95 }}
                  className={`absolute right-0 w-44 rounded-2xl overflow-hidden z-[100] p-1.5 bg-[#0e0f14] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${
                    isDockedBottom
                      ? 'bottom-full mb-4'
                      : 'bottom-full md:top-full mb-4 md:mt-3 md:mb-0'
                  }`}
                >
                  {languages.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-xs rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/25 border border-cyan-400/40 shadow-sm'
                            : 'hover:bg-white/15'
                        }`}
                        style={{
                          color: isSelected ? '#67e8f9' : '#ffffff',
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span
                          className="tracking-wide font-semibold"
                          style={{ color: isSelected ? '#67e8f9' : '#ffffff' }}
                        >
                          {lang.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-cyan-400" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
