import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme = 'dark', onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isLight = theme === 'light';

  const navItems = [
    { label: 'Profile', href: '#about', number: '01' },
    { label: 'Services', href: '#services', number: '02' },
    { label: 'Works', href: '#work', number: '03' },
    { label: 'Tools', href: '#tools', number: '04' },
    { label: 'FAQ', href: '#faq', number: '05' },
    { label: 'Contact', href: '#contact', number: '06' },
  ];

  // Track page scroll to style header and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = ['hero', 'about', 'services', 'work', 'tools', 'faq', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isLight
              ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm'
              : 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex justify-between items-center">
          {/* Logo Brand Signature */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col cursor-pointer"
          >
            <span className={`font-display font-extrabold text-sm sm:text-md tracking-[0.25em] uppercase transition-colors group-hover:text-[#E67E22] ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              EMMANUEL NWIGWE
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[8px] font-mono tracking-[0.3em] uppercase leading-none transition-colors ${
                isLight ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-500 group-hover:text-white'
              }`}>
                BRAND IDENTITY DESIGNER
              </span>
              <div className="h-[1px] w-6 bg-[#E67E22] transition-all group-hover:w-10" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex space-x-5 text-[10px] tracking-widest uppercase font-semibold font-mono">
              {navItems.map((item) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(id);
                    }}
                    className={`transition-all relative py-1 hover:text-[#E67E22] flex items-center gap-1 ${
                      isActive 
                        ? isLight ? 'text-gray-900 border-b-2 border-[#E67E22]' : 'text-white border-b-2 border-[#E67E22]' 
                        : isLight ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    <span className="text-[8px] text-[#E67E22] opacity-80">{item.number}</span>
                    {item.label}
                  </a>
                );
              })}
            </div>
            
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 border transition-all duration-200 cursor-pointer ${
                  isLight 
                    ? 'bg-gray-100 border-gray-300 text-gray-800 hover:border-[#E67E22] hover:text-[#E67E22]' 
                    : 'bg-[#121212] border-white/10 text-gray-300 hover:border-[#E67E22] hover:text-[#E67E22]'
                }`}
                aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
                title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
              className="group flex items-center gap-1.5 bg-[#E67E22] text-black px-4 py-2 rounded-none text-xs font-mono uppercase font-bold hover:bg-orange-600 transition-all shadow-[0_0_15px_rgba(230,126,34,0.15)]"
            >
              Start Project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 border transition-all duration-200 cursor-pointer ${
                  isLight 
                    ? 'bg-gray-100 border-gray-300 text-gray-800' 
                    : 'bg-[#121212] border-white/10 text-gray-300'
                }`}
                aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 transition-colors ${isLight ? 'text-gray-800 hover:text-black' : 'text-gray-400 hover:text-white'}`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 md:hidden ${
              isLight ? 'bg-white text-gray-900' : 'bg-black text-white'
            }`}
          >
            {/* Drawer Header */}
            <div className={`flex justify-between items-center border-b pb-6 ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-md tracking-[0.2em] uppercase">
                  EMMANUEL NWIGWE
                </span>
                <span className="text-[8px] font-mono tracking-[0.3em] text-gray-500 uppercase mt-1">
                  BRAND IDENTITY DESIGNER
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 border rounded-none ${
                  isLight ? 'border-gray-200 bg-gray-100 text-gray-800' : 'border-white/5 bg-white/5 text-gray-400 hover:text-white'
                }`}
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links Stacked */}
            <nav className="flex flex-col gap-5 my-auto">
              {navItems.map((item, index) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.04 }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(id);
                    }}
                    className={`text-xl font-display font-extrabold uppercase tracking-wider flex items-center gap-3 ${
                      isActive ? 'text-[#E67E22]' : isLight ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    <span className="font-mono text-xs text-[#E67E22]/60">{item.number}.</span>
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Footer details in Drawer */}
            <div className={`border-t pt-6 space-y-4 ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full bg-[#E67E22] text-black py-4 rounded-none font-mono text-xs uppercase font-bold text-center block tracking-widest shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:bg-orange-600 cursor-pointer"
              >
                Start A Project
              </button>
              
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                <span>ENUGU, NIGERIA</span>
                <span>+234 816 972 5708</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

