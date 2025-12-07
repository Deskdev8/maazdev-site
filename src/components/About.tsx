import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, animateTitle } from '../utils/animations';
import { CONTENT } from '../constants';
import { useGlobal } from '../context/GlobalContext';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language, isRTL } = useGlobal();
  const content = CONTENT[language].about;

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-content-body', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      if (titleRef.current) {
        animateTitle(titleRef.current);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section ref={sectionRef} id="about" className="py-24 max-w-6xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className={`order-2 md:order-1 ${isRTL ? 'md:text-right' : 'md:text-left'} text-center`}>
             <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-lightest-slate mb-4">
                {content.sectionTitle}
            </h2>
            <div className={`h-1 w-20 bg-slate/50 mb-8 mx-auto ${isRTL ? 'md:mr-0' : 'md:ml-0'}`}></div>

            <div className="about-content-body text-slate text-lg leading-relaxed space-y-4 font-semibold">
                <p>{content.p1}</p>
                <p>{content.p2}</p>
            </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center items-center">
           <div className="about-content-body relative w-64 h-80 md:w-72 md:h-96 border-2 border-slate/30 p-2" data-cursor="hover">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green -mb-1 -ml-1"></div>
                
                <div className="w-full h-full bg-navy overflow-hidden relative">
                    <img 
                        src={content.image} 
                        alt="Profile Art" 
                        className="w-full h-full object-cover opacity-80 filter contrast-125 hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                    />
                </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;