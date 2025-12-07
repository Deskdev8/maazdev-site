import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../constants';
import { isReducedMotion, animateTitle } from '../utils/animations';
import { useGlobal } from '../context/GlobalContext';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language } = useGlobal();
  const content = CONTENT[language].projects;

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      if (titleRef.current) {
        animateTitle(titleRef.current);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion()) return;

    const card = e.currentTarget;
    const content = card.querySelector('.project-content') as HTMLElement;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width - 0.5) * 20; 
    const yPct = (y / rect.height - 0.5) * -20; 

    gsap.to(content, {
      rotationY: xPct,
      rotationX: yPct,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const content = card.querySelector('.project-content') as HTMLElement;
    
    gsap.to(content, {
      rotationY: 0,
      rotationX: 0,
      ease: "power1.out",
      duration: 0.6
    });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 max-w-5xl mx-auto px-6 md:px-12">
      <div className="flex flex-col items-center mb-20 text-center">
            <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-lightest-slate mb-4">
                {content.title}
            </h2>
            <div className="h-1 w-24 bg-green rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 perspective-1000">
            {content.items.map((project) => (
                <div 
                    key={project.id} 
                    className="project-card-container relative h-full group perspective-1000"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    data-cursor="hover"
                >
                    <div className="project-content transform-style-3d bg-light-navy border border-slate/20 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full transition-shadow duration-300 hover:shadow-neon/50">
                        
                        <div className="h-56 overflow-hidden bg-navy relative">
                            <div className="absolute inset-0 bg-green/20 mix-blend-multiply opacity-50 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                        </div>

                        <div className="p-8 text-center flex-grow flex flex-col items-center bg-light-navy relative z-20">
                            <h3 className="text-2xl font-bold text-lightest-slate mb-4 group-hover:text-green transition-colors">
                                {project.title}
                            </h3>
                            
                            <p className="text-slate mb-8 font-medium flex-grow leading-relaxed">
                                {project.description}
                            </p>
                            
                            <a 
                                href={project.external} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block border border-green text-green px-8 py-3 rounded hover:bg-green/10 transition-all duration-300 shadow-[0_0_0_0_rgba(var(--color-accent-rgb),0.7)] hover:shadow-[0_0_15px_0_rgba(var(--color-accent-rgb),0.3)]"
                            >
                                {project.buttonText || "View"}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Projects;