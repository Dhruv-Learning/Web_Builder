import type { AppConfig } from "@/context/codegenius-context";

export type Template = {
  id: string;
  name: string;
  description: string;
  config: AppConfig & { prompt: string };
};

export const templates: Template[] = [
  {
    id: 'template-modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and elegant, focusing on typography and white space.',
    config: {
      prompt: 'Create a modern, minimal portfolio website for a graphic designer named Alex. It should have a project gallery, an about section, and a contact form. Use a black, white, and gray color scheme. The design should be clean with plenty of white space.',
      websiteType: 'portfolio',
      colors: {
        primary: '#111827',
        secondary: '#f3f4f6',
        accent: '#6b7280',
        background: '#ffffff',
        text: '#1f2937',
      },
      fonts: {
        headline: 'Space Grotesk',
        body: 'Inter',
      },
    },
  },
  {
    id: 'template-vibrant-colorful',
    name: 'Vibrant Colorful',
    description: 'A bold and energetic design for creative agencies.',
    config: {
      prompt: 'Generate a vibrant and colorful website for a creative agency called "PixelPerfect". The site needs a hero section with a bold call to action, a services section, a portfolio showcase, and a team introduction. Use bright, saturated colors like electric blue and hot pink.',
      websiteType: 'saas',
      colors: {
        primary: '#ec4899',
        secondary: '#fdf2f8',
        accent: '#3b82f6',
        background: '#f5f3ff',
        text: '#3730a3',
      },
      fonts: {
        headline: 'Space Grotesk',
        body: 'Roboto',
      },
    },
  },
  {
    id: 'template-dark-elegant',
    name: 'Dark & Elegant',
    description: 'A sophisticated and luxurious dark theme for premium brands.',
    config: {
      prompt: 'Build an elegant, dark-themed website for a luxury watch brand. Feature a stunning hero image, a section for featured products, details about craftsmanship, and a store locator. The color palette should be black, gold, and dark gray.',
      websiteType: 'ecommerce',
      colors: {
        primary: '#facc15',
        secondary: '#1f2937',
        accent: '#d1d5db',
        background: '#111827',
        text: '#f9fafb',
      },
      fonts: {
        headline: 'Playfair Display',
        body: 'Lora',
      },
    },
  },
  {
    id: 'template-corporate',
    name: 'Corporate',
    description: 'A professional and trustworthy design for business websites.',
    config: {
      prompt: 'Create a professional corporate website for a financial consulting firm named "Apex Financial". The site needs a professional look and feel, with sections for services, about us, client testimonials, and a contact page. Use a blue and white color scheme.',
      websiteType: 'business',
      colors: {
        primary: '#2563eb',
        secondary: '#f0f9ff',
        accent: '#475569',
        background: '#ffffff',
        text: '#0f172a',
      },
      fonts: {
        headline: 'Roboto',
        body: 'Inter',
      },
    },
  },
    {
    id: 'template-tech-saas',
    name: 'Tech SaaS',
    description: 'Modern and clean for a software-as-a-service company.',
    config: {
      prompt: 'Create a landing page for a SaaS product called "SynthWave". It needs a hero section with signup, feature list with icons, pricing table, and testimonials. Use a futuristic blue and purple color scheme.',
      websiteType: 'saas',
      colors: {
        primary: '#4f46e5',
        secondary: '#eef2ff',
        accent: '#8b5cf6',
        background: '#f8fafc',
        text: '#1e293b',
      },
      fonts: {
        headline: 'Space Grotesk',
        body: 'Inter',
      },
    },
  },
  {
    id: 'template-artistic-portfolio',
    name: 'Artistic Portfolio',
    description: 'A creative layout for artists and photographers to showcase work.',
    config: {
      prompt: 'Generate a creative portfolio for a photographer named "Elena Ray". It should feature a masonry-style grid for her photos, an "about me" section with a picture, and a contact form. The vibe should be artistic and minimalist.',
      websiteType: 'portfolio',
      colors: {
        primary: '#c026d3',
        secondary: '#fdf4ff',
        accent: '#a855f7',
        background: '#ffffff',
        text: '#374151',
      },
      fonts: {
        headline: 'Playfair Display',
        body: 'Inter',
      },
    },
  },
    {
    id: 'template-ecommerce-landing',
    name: 'Ecommerce Landing',
    description: 'A vibrant landing page for an online store or product.',
    config: {
      prompt: 'Create a landing page for a new sneaker release. It needs a large hero image of the shoe, a section detailing its features, customer reviews, and a prominent "Buy Now" button that scrolls to a purchase section.',
      websiteType: 'ecommerce',
      colors: {
        primary: '#f59e0b',
        secondary: '#fffbeb',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#451a03',
      },
      fonts: {
        headline: 'Space Grotesk',
        body: 'Inter',
      },
    },
  },
];
