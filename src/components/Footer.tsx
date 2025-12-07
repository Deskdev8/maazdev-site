import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { CONTENT } from '../constants';

const Footer: React.FC = () => {
  const { language } = useGlobal();
  const content = CONTENT[language].footer;

  return (
    <footer className="py-6 text-center text-slate text-sm bg-navy transition-colors duration-300">
        <div className="flex justify-center gap-6 mb-4 md:hidden">
            <a href="#" className="hover:text-green transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-green transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-green transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-green transition-colors"><Linkedin size={20} /></a>
        </div>
        <a href="https://github.com/maazxp" className="font-mono hover:text-green transition-colors mb-2 block">
          {content.designedBy}
        </a>
        <div className="text-xs opacity-70">
            &copy; {new Date().getFullYear()} Maaz.XP
        </div>
    </footer>
  );
};

export default Footer;