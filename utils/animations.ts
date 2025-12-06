import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Standard easing
export const EASING = {
  entrance: "expo.out",
  smooth: "power2.out",
  elastic: "elastic.out(1, 0.3)",
};

// Animation Settings
export const ANIM_SETTINGS = {
  duration: 0.8,
  stagger: 0.1,
};

// Fade Up Utility
export const fadeUpConfig = (delay: number = 0) => ({
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: EASING.entrance,
  delay: delay,
});

// Staggered Text Reveal Animation
export const animateTitle = (element: HTMLElement, delay: number = 0) => {
  if (isReducedMotion() || !element) return;
  
  // Simple word split if SplitText is not available
  const text = element.innerText;
  element.innerHTML = text.split(' ').map(word => 
    `<span style="display:inline-block; overflow:hidden; vertical-align:top;">
      <span style="display:inline-block;" class="word-inner">${word}</span>
    </span>`
  ).join(' '); // Add non-breaking space logic if needed, but space is fine for now

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
