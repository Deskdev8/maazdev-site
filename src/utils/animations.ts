import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const EASING = {
  entrance: "expo.out",
  smooth: "power2.out",
  elastic: "elastic.out(1, 0.3)",
};

export const ANIM_SETTINGS = {
  duration: 0.8,
  stagger: 0.1,
};

export const fadeUpConfig = (delay: number = 0) => ({
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: EASING.entrance,
  delay: delay,
});

export const animateTitle = (element: HTMLElement, delay: number = 0) => {
  if (isReducedMotion() || !element) return;
  
  const text = element.innerText;
  element.innerHTML = text.split(' ').map(word => 
    `<span style="display:inline-block; overflow:hidden; vertical-align:top;">
      <span style="display:inline-block;" class="word-inner">${word}</span>
    </span>`
  ).join(' ');

  gsap.fromTo(element.querySelectorAll('.word-inner'), 
    { y: '100%', opacity: 0 },
    { 
      y: '0%', 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.05, 
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      }
    }
  );
};