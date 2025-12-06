import { NavItem, Project, Skill } from './types';
import { Code, Box, Gamepad2 } from 'lucide-react';

// === CONTENT DICTIONARY ===

export const CONTENT = {
  ar: {
    nav: [
      { name: 'عني', href: '#about' },
      { name: 'مهاراتي', href: '#skills' },
      { name: 'مشاريعي', href: '#projects' },
      { name: 'اتصل بي', href: '#contact' },
    ],
    resume: "السيرة الذاتية",
    hero: {
      greeting: "مرحباً، أنا معاذ",
      name: "مطور ألعاب ومواقع ويب",
      description: "بارع في صناعة الألعاب ومواقع الويب والنمذجة ثلاثية الأبعاد. أسعى دائماً لتحقيق الإبداع والتميز في كل مشروع.",
      ctaButton: "استعرض مشاريعي",
      secondaryButton: "لتعمل معاً"
    },
    about: {
      sectionTitle: "عني - مطور ألعاب Godot ومواقع ويب",
      p1: "أنا معاذ، مطور ألعاب ومواقع ويب شغوف بالإبداع الرقمي. أمتلك خبرة واسعة في تطوير الألعاب التفاعلية وتصميم مواقع الويب الحديثة والنمذجة ثلاثية الأبعاد. أسعى دائماً لتحقيق أعلى معايير الجودة في كل مشروع أقوم به.",
      p2: "شغفي بالتكنولوجيا والتصميم يدفعني لاستكشاف أحدث التقنيات وأساليب التطوير لإنشاء تجارب رقمية فريدة ومؤثرة.",
      image: "https://picsum.photos/seed/cat/400/500"
    },
    skills: {
      title: "مهاراتي في تطوير الألعاب والويب",
      items: [
        { 
          name: 'تطوير الألعاب', 
          description: 'تصميم وتطوير ألعاب تفاعلية ثنائية وثلاثية الأبعاد بمستويات متعددة وتجارب لعب غامرة.',
          icon: Gamepad2 
        },
        { 
          name: 'تطوير الويب', 
          description: 'بناء مواقع وتطبيقات ويب حديثة وسريعة الاستجابة باستخدام أحدث التقنيات والأطر.',
          icon: Code 
        },
        { 
          name: 'النمذجة ثلاثية الأبعاد', 
          description: 'إنشاء نماذج ثلاثية الأبعاد عالية الجودة للاستخدام في الألعاب والتطبيقات التفاعلية.',
          icon: Box 
        },
      ]
    },
    projects: {
      title: "مشاريعي في تطوير الألعاب والمواقع",
      items: [
        {
          id: 1,
          title: 'منصة itch.io',
          description: 'استعرض جميع ألعابي ومشاريعي المنشورة على منصة itch.io',
          external: 'https://itch.io',
          image: 'https://picsum.photos/id/1/600/400',
          buttonText: 'زيارة المنصة'
        },
        {
          id: 2,
          title: 'مجتمع الديسكورد',
          description: 'انضم إلى سيرفر الديسكورد للتواصل المباشر ومتابعة آخر التحديثات',
          external: 'https://discord.com',
          image: 'https://picsum.photos/id/2/600/400',
          buttonText: 'انضم الآن'
        },
      ]
    },
    contact: {
      title: "اتصل بي للتعاون في مشروعك",
      subtitle: "لنتحدث عن مشروعك!",
      text: "هل لديك فكرة لمشروع أو تحتاج مساعدة في تطوير لعبة أو موقع ويب؟ تواصل معي عبر وسائل التواصل الاجتماعي:",
      email: "maaz@example.com",
      socialLabels: {
        facebook: "فيسبوك",
        instagram: "انستغرام",
        discord: "ديسكورد",
        youtube: "يوتيوب",
        itchio: "Itch.io"
      }
    },
    footer: {
      designedBy: "تم التصميم والبناء بواسطة معاذ"
    }
  },
  en: {
    nav: [
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
    resume: "Resume",
    hero: {
      greeting: "Hi, I am Maaz",
      name: "Game & Web Developer",
      description: "Proficient in creating games, web applications, and 3D modeling. I always strive for creativity and excellence in every project.",
      ctaButton: "View Projects",
      secondaryButton: "Let's Work Together"
    },
    about: {
      sectionTitle: "About Me - Godot Game Dev & Web Developer",
      p1: "I am Maaz, a game and web developer passionate about digital creativity. I have extensive experience in developing interactive games, designing modern websites, and 3D modeling. I always strive to achieve the highest quality standards in every project I undertake.",
      p2: "My passion for technology and design drives me to explore the latest technologies and development methods to create unique and impactful digital experiences.",
      image: "https://picsum.photos/seed/cat/400/500"
    },
    skills: {
      title: "My Skills in Game & Web Development",
      items: [
        { 
          name: 'Game Development', 
          description: 'Designing and developing 2D and 3D interactive games with multiple levels and immersive gameplay experiences.',
          icon: Gamepad2 
        },
        { 
          name: 'Web Development', 
          description: 'Building modern, responsive websites and applications using the latest technologies and frameworks.',
          icon: Code 
        },
        { 
          name: '3D Modeling', 
          description: 'Creating high-quality 3D models for use in games and interactive applications.',
          icon: Box 
        },
      ]
    },
    projects: {
      title: "My Projects in Game & Web Development",
      items: [
        {
          id: 1,
          title: 'Itch.io Platform',
          description: 'Browse all my published games and projects on the Itch.io platform.',
          external: 'https://itch.io',
          image: 'https://picsum.photos/id/1/600/400',
          buttonText: 'Visit Platform'
        },
        {
          id: 2,
          title: 'Discord Community',
          description: 'Join the Discord server for direct communication and to follow the latest updates.',
          external: 'https://discord.com',
          image: 'https://picsum.photos/id/2/600/400',
          buttonText: 'Join Now'
        },
      ]
    },
    contact: {
      title: "Contact Me for Collaboration",
      subtitle: "Let's talk about your project!",
      text: "Do you have a project idea or need help developing a game or website? Contact me via social media:",
      email: "maaz@example.com",
      socialLabels: {
        facebook: "Facebook",
        instagram: "Instagram",
        discord: "Discord",
        youtube: "YouTube",
        itchio: "Itch.io"
      }
    },
    footer: {
      designedBy: "Designed & Built by Maaz"
    }
  }
};
