import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech?: string[];
  github?: string;
  external: string;
  image: string;
  buttonText?: string;
}

export interface Skill {
  name: string;
  description: string;
  icon: React.ElementType;
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