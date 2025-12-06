import React, { useEffect } from 'react';
import { Github, Instagram, Twitter, Linkedin } from 'lucide-react';
import gsap from 'gsap';

const Socials: React.FC = () => {
  useEffect(() => {
    // Entrance anim for sidebars
    gsap.fromTo('.social-sidebar', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 1.5, duration: 1 }
    );
  }, []);

  return (
    <>
      {/* Right Side - Social Icons */}
      <div className="social-sidebar hidden md:flex fixed bottom-0 right-10 z-10 flex-col items-center gap-6 text-slate transition-colors duration-300">
        <a href="#" className="hover:text-green hover:-translate-y-1 transition-all duration-300"><Github size={20} /></a>
        <a href="#" className="hover:text-green hover:-translate-y-1 transition-all duration-300"><Instagram size={20} /></a>
        <a href="#" className="hover:text-green hover:-translate-y-1 transition-all duration-300"><Twitter size={20} /></a>
        <a href="#" className="hover:text-green hover:-translate-y-1 transition-all duration-300"><Linkedin size={20} /></a>
        <div className="w-[1px] h-24 bg-slate mt-4 opacity-50"></div>
      </div>

      {/* Left Side - Email */}
      <div className="social-sidebar hidden md:flex fixed bottom-0 left-10 z-10 flex-col items-center gap-6 text-slate transition-colors duration-300">
        <a 
          href="mailto:maaz@example.com" 
          className="font-mono text-xs tracking-widest hover:text-green hover:-translate-y-1 transition-all duration-300 writing-vertical-rl"
          style={{ writingMode: 'vertical-rl' }}
        >
          maaz@example.com
        </a>
        <div className="w-[1px] h-24 bg-slate mt-4 opacity-50"></div>
      </div>
    </>
  );
};

export default Socials;