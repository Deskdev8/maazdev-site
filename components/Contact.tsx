import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '../utils/animations';
import { CONTENT } from '../constants';
import { useGlobal } from '../context/GlobalContext';
import { Facebook, Instagram, Youtube, Link as LinkIcon, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useGlobal();
  const content = CONTENT[language].contact;

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.utils.toArray('.social-float').forEach((icon: any, i) => {
        gsap.to(icon, {
          y: Math.random() * 10 - 5,
          x: Math.random() * 10 - 5,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 max-w-4xl mx-auto px-6 text-center">
      <div className="contact-anim relative">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-lightest-slate mb-6">
            {content.title}
          </h2>
          <div className="h-1 w-20 bg-green mx-auto mb-8 rounded-full"></div>
          
          <h3 className="text-xl md:text-2xl text-green font-bold mb-6 font-mono">
            {content.subtitle}
          </h3>

          <p className="text-slate text-lg mb-12 font-medium max-w-xl mx-auto">
            {content.text}
          </p>

          <div className="flex justify-center gap-8 flex-wrap">
             {[
               { Icon: Facebook, label: content.socialLabels.facebook },
               { Icon: Instagram, label: content.socialLabels.instagram },
               { Icon: MessageSquare, label: content.socialLabels.discord },
               { Icon: Youtube, label: content.socialLabels.youtube },
               { Icon: LinkIcon, label: content.socialLabels.itchio }
             ].map(({ Icon, label }, index) => (
                <div key={index} className="social-float flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full border border-slate/50 bg-light-navy flex items-center justify-center text-slate group-hover:border-green group-hover:text-green group-hover:shadow-neon transition-all duration-300">
                        <Icon size={28} />
                    </div>
                    <span className="text-sm text-slate font-mono group-hover:text-green transition-colors">{label}</span>
                </div>
             ))}
          </div>
      </div>
    </section>
  );
};

export default Contact;