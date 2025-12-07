import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Socials from './components/Socials';
import { GlobalProvider } from './context/GlobalContext';
import gsap from 'gsap';

// -- Sub Components --

const PageLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    tl.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
      .to('.loader-screen', { y: '-100%', duration: 0.8, ease: 'expo.inOut', delay: 0.2 });
  }, [onComplete]);

  return (
    <div className="loader-screen fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center">
      <div className="text-green text-4xl font-bold mb-4 font-sans tracking-widest">MAAZ.XP</div>
      <div className="w-64 h-1 bg-light-navy rounded-full overflow-hidden">
        <div className="loader-bar w-0 h-full bg-green"></div>
      </div>
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor on desktop
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const hoverHandlers = () => {
        const hoverables = document.querySelectorAll('[data-cursor="hover"], a, button, .project-card-container');
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', () => gsap.to(cursorRef.current, { scale: 2.5, opacity: 0.5, mixBlendMode: 'difference' }));
            el.addEventListener('mouseleave', () => gsap.to(cursorRef.current, { scale: 1, opacity: 1, mixBlendMode: 'normal' }));
        });
    };

    window.addEventListener('mousemove', moveCursor);
    // Initial binding
    hoverHandlers();
    
    // Observer for dynamic elements
    const observer = new MutationObserver(hoverHandlers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:block fixed top-0 left-0 w-6 h-6 border-2 border-green rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
    />
  );
};

const ScrollProgress: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setWidth(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-green z-[100] transition-all duration-100 ease-out" style={{ width: `${width * 100}%` }}></div>
  );
};

// -- Main App --

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-navy min-h-screen text-slate selection:bg-green selection:text-navy transition-colors duration-300">
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar />
      <Socials />
      
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
};

export default App;