import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { isReducedMotion, EASING, animateTitle } from '../utils/animations';
import { CONTENT } from '../constants';
import { useGlobal } from '../context/GlobalContext';
import { Facebook, Instagram, Youtube, Link as LinkIcon, MessageSquare } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { language, isRTL, theme } = useGlobal();
  const content = CONTENT[language].hero;

  useEffect(() => {
    if (isReducedMotion()) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = theme === 'dark' ? '#ccd6f6' : '#64748b'; 

      stars.forEach((star) => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) star.y = height;

        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASING.entrance } });

      if (isReducedMotion()) {
        gsap.set('.hero-anim', { opacity: 1, y: 0 });
        return;
      }

      tl.fromTo('.hero-greeting', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5 })
        .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut', transformOrigin: isRTL ? "right" : "left" }, "-=0.6")
        .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo('.hero-socials', { x: isRTL ? -20 : 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4");

      gsap.to('.hero-avatar-container', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-content-wrapper', { x: -x, y: -y, duration: 1, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden relative"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none" />

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green/10 rounded-full filter blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lightest-navy/20 rounded-full filter blur-[100px] -z-10"></div>

      <div className={`max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        
        <div className="hero-content-wrapper flex flex-col items-start order-2 md:order-1 text-start">
            <span className="hero-anim hero-greeting text-green font-mono text-lg mb-3 block">
            {content.greeting}
            </span>
            <h1 
                ref={titleRef}
                className="hero-anim hero-title text-lightest-slate text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight"
            >
            {content.name}
            </h1>
            
            <div className="hero-anim hero-line h-1 w-24 bg-green mb-8 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]"></div>

            <p className="hero-anim hero-desc text-slate max-w-lg text-lg mb-8 leading-relaxed font-medium">
            {content.description}
            </p>
            
            <div className="hero-anim hero-btns flex gap-4 mb-10">
                <a 
                    href="#projects" 
                    className="group relative inline-block border border-green text-green px-8 py-3 rounded font-mono overflow-hidden transition-all hover:bg-green/10"
                    data-cursor="hover"
                >
                    <span className="relative z-10">{content.ctaButton}</span>
                </a>
                <a 
                    href="#contact" 
                    className="inline-block border border-slate text-slate px-8 py-3 rounded hover:border-green hover:text-green hover:shadow-neon transition-all duration-300"
                    data-cursor="hover"
                >
                    {content.secondaryButton}
                </a>
            </div>

            <div className="flex gap-4">
                {[Youtube, Facebook, Instagram, MessageSquare, LinkIcon].map((Icon, i) => (
                   <a key={i} href="#" className="hero-anim hero-socials p-2 border border-slate/30 rounded-full text-slate hover:border-green hover:text-green hover:-translate-y-1 transition-all duration-300" data-cursor="hover">
                      <Icon size={20} />
                   </a>
                ))}
            </div>
        </div>

         <div className="hero-avatar-container flex justify-center items-center order-1 md:order-2 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
             <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full border-2 border-green/20 p-2 flex items-center justify-center shadow-neon">
                <div className="w-full h-full rounded-full overflow-hidden bg-light-navy relative group cursor-pointer" data-cursor="hover">
                    <img 
                        src="https://picsum.photos/seed/fox/600/600" 
                        alt="Avatar" 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;