import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { CONTENT } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  
  const { language, theme, toggleLanguage, toggleTheme, isRTL } = useGlobal();
  const navContent = CONTENT[language].nav;
  const resumeText = CONTENT[language].resume;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (headerRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isOpen) {
          gsap.to(headerRef.current, { y: '-100%', duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(headerRef.current, { y: '0%', duration: 0.3, ease: 'power2.out' });
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-item', 
        { x: isRTL ? 50 : -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen, isRTL]);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(language === 'ar' ? "عذراً، ملف السيرة الذاتية غير متاح حالياً." : "Sorry, the resume file is currently unavailable.");
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-20 shadow-lg' : 'h-24 bg-transparent'}`}
    >
      <div className="flex justify-between items-center h-full px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="text-green font-bold text-2xl md:text-3xl z-50 cursor-pointer hover:scale-105 transition-transform duration-300 font-sans" data-cursor="hover">
          <span className="text-lightest-slate">MAAZ</span>.XP
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8">
            {navContent.map((item, index) => (
              <li key={item.name} className="relative group">
                <span className="text-green font-mono text-sm mx-1">0{index + 1}.</span>
                <a 
                  href={item.href} 
                  className="text-lightest-slate hover:text-green text-sm font-medium transition-colors duration-300 relative overflow-hidden inline-block"
                  data-cursor="hover"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-s border-slate/20 ps-4">
             <button onClick={toggleLanguage} className="text-slate hover:text-green transition-colors flex items-center gap-1 font-mono text-xs" data-cursor="hover">
                <Globe size={18} />
                <span>{language === 'ar' ? 'EN' : 'AR'}</span>
             </button>
             <button onClick={toggleTheme} className="text-slate hover:text-green transition-colors" data-cursor="hover">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>

          <a 
            href="#" 
            onClick={handleResumeClick}
            className="border border-green text-green px-4 py-2 rounded text-sm font-mono hover:bg-green/10 transition-colors duration-300"
            data-cursor="hover"
          >
            {resumeText}
          </a>
        </nav>

        <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleTheme} className="text-green focus:outline-none">
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={toggleLanguage} className="text-green focus:outline-none font-bold">
                {language === 'ar' ? 'EN' : 'AR'}
            </button>
            <button 
            onClick={toggleMenu} 
            className="text-green focus:outline-none"
            aria-label="Toggle Menu"
            >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>

        <div className={`fixed inset-0 bg-navy/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <ul className="flex flex-col gap-8 text-center">
            {navContent.map((item, index) => (
              <li key={item.name} className="mobile-nav-item">
                <div className="text-green font-mono text-sm mb-1">0{index + 1}.</div>
                <a 
                  href={item.href} 
                  className="text-lightest-slate text-xl font-bold hover:text-green transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="mobile-nav-item mt-8">
              <a href="#" onClick={(e) => { handleResumeClick(e); toggleMenu(); }} className="border border-green text-green px-8 py-3 rounded font-mono text-lg hover:bg-green/10">
                {resumeText}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;