import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech?: string[]; // Made optional as the screenshot doesn't show tech tags explicitly for these cards
  github?: string;
  external: string;
  image: string;
  buttonText?: string; // Added to support different button texts like "Visit Platform" or "Join Now"
}

export interface Skill {
  name: string;
  description: string;
  icon: React.ElementType; // Changed from ReactNode to ElementType for easier usage with Lucide
}

export interface NavItem {
  name: string;
  href: string;
}

declare global {
  interface Window {
    gsap: any;
  }
}