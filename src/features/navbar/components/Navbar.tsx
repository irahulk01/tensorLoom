import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  navContent: any;
  languages: any[];
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  navY?: any;
  navScale?: any;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#c99b3e]/10 border border-[#c99b3e]/30 text-[#b38730] dark:text-[#e5be6b] hover:bg-[#c99b3e]/20 transition-all cursor-pointer shadow-xs shrink-0"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-[#c99b3e]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-[#e5be6b]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Navbar({ navContent, languages = [], currentLang, setCurrentLang }: NavbarProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isDockedBottom, setIsDockedBottom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { href: '#', desktopLabel: navContent?.home || 'Home', mobileLabel: null },
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

  const currentLangLabel = (
    languages.find((l) => l.code === currentLang)?.code ||
    currentLang ||
    'en'
  ).toUpperCase();

  return (
    <motion.nav
      layout
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      className={`fixed left-0 right-0 z-[990] mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:bottom-4 max-md:top-auto ${
        isDockedBottom
          ? 'bottom-6 top-auto max-w-2xl px-2 sm:px-4'
          : 'md:top-6 md:bottom-auto max-w-5xl px-2 sm:px-4'
      }`}
    >
      <div
        className={`backdrop-blur-xl rounded-full flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDockedBottom
            ? 'bg-white/95 dark:bg-[#12141c]/95 border border-[#c99b3e]/30 px-3 sm:px-5 py-2 sm:py-2.5 shadow-lg ring-1 ring-[#c99b3e]/20'
            : 'bg-white/90 dark:bg-[#12141c]/90 border border-[#c99b3e]/25 px-3 sm:px-6 py-2 sm:py-3 shadow-md'
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
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-cover shadow-xs group-hover:scale-105 transition-transform"
          />
          {!isDockedBottom && (
            <span className="hidden lg:inline font-extrabold text-sm tracking-tight text-[#0f1117] dark:text-white group-hover:text-[#c99b3e] transition-colors whitespace-nowrap font-heading">
              TENSORLOOM
            </span>
          )}
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-2.5 sm:gap-5 md:gap-8 text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans overflow-x-auto no-scrollbar py-0.5 min-w-0">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-1 px-1 sm:px-0 hover:text-[#c99b3e] dark:hover:text-[#e5be6b] transition-colors group whitespace-nowrap ${
                !item.mobileLabel ? 'hidden md:inline-block' : ''
              }`}
            >
              {item.mobileLabel && (
                <span className="md:hidden tracking-wider">{item.mobileLabel}</span>
              )}
              <span className="hidden md:inline">{item.desktopLabel}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c99b3e] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* Controls: Theme Toggle & Language Selector */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <ThemeToggle />

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#c99b3e] transition-colors cursor-pointer px-2 py-1.5 rounded-full bg-[#c99b3e]/10 border border-[#c99b3e]/30 hover:bg-[#c99b3e]/20"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#c99b3e]" />
              <span>{currentLangLabel}</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: isDockedBottom ? -8 : 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isDockedBottom ? -8 : 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className={`absolute right-0 w-44 rounded-2xl overflow-hidden z-[9999] p-1.5 bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 shadow-2xl ${
                    isDockedBottom ? 'bottom-full mb-3' : 'top-full mt-3'
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
                        className={`w-full px-3 py-2 text-left text-xs rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c99b3e]/15 text-[#b38730] dark:text-[#e5be6b] font-bold border border-[#c99b3e]/30'
                            : 'hover:bg-[#c99b3e]/10 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="tracking-wide">{lang.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-[#c99b3e]" />}
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
