import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../constants';
import { isReducedMotion } from '../utils/animations';
import { useGlobal } from '../context/GlobalContext';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useGlobal();
  const content = CONTENT[language].skills;

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        scale: 0.8,
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });
      
      gsap.from('.skills-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      borderColor: 'var(--color-accent)',
      boxShadow: '0 10px 30px -10px rgba(var(--color-accent-rgb), 0.3)',
      duration: 0.3
    });
    gsap.to(e.currentTarget.querySelector('.skill-icon'), {
      scale: 1.1,
      color: 'var(--color-accent)',
      rotate: 5,
      duration: 0.3
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      borderColor: 'var(--text-secondary)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      duration: 0.3
    });
    gsap.to(e.currentTarget.querySelector('.skill-icon'), {
      scale: 1,
      color: '#60a5fa',
      rotate: 0,
      duration: 0.3
    });
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 max-w-6xl mx-auto px-6 md:px-12">
       <div className="skills-title flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-lightest-slate mb-4">
                {content.title}
            </h2>
            <div className="h-1 w-24 bg-green rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {content.items.map((skill, index) => (
                <div 
                    key={index} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="skill-card bg-light-navy border border-slate/20 p-8 rounded-xl shadow-lg cursor-default transition-colors duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-green/5 rounded-full blur-xl group-hover:bg-green/10 transition-all duration-500"></div>

                    <div className="skill-icon mb-6 p-4 rounded-full border border-slate/30 text-blue-400 bg-navy transition-colors">
                        <skill.icon size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-lightest-slate mb-4">{skill.name}</h3>
                    <p className="text-slate leading-relaxed font-medium">
                        {skill.description}
                    </p>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Skills;