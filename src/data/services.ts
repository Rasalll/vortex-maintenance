import {
  GraduationCap,
  Code2,
  Cpu,
  Megaphone,
  Zap,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  available: boolean;
  bgImage: string;
};

export const SERVICES: Service[] = [
  {
    id: 'institute',
    title: 'AI Integrated Technology Institute',
    icon: GraduationCap,
    description:
      'A next-generation learning institute with AI-integrated curriculum across design, development, DevOps, marketing, and robotics.',
    available: true,
    bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'it-solutions',
    title: 'AI Integrated IT Solutions',
    icon: Code2,
    description:
      'Intelligent software, web, and mobile solutions powered by AI-driven development workflows.',
    available: false,
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'iot-robotics',
    title: 'AI / IoT and Robotics Lab',
    icon: Cpu,
    description:
      'A research lab exploring automation, embedded systems, IoT devices, and AI-driven robotics.',
    available: false,
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'digital-marketing',
    title: 'AI Era of Digital Marketing',
    icon: Megaphone,
    description:
      'AI-powered SEO, social, paid ads, analytics, branding, and content marketing that scales.',
    available: false,
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'automation',
    title: 'AI Integrated Automation Products',
    icon: Zap,
    description:
      'Smart automation products that reduce manual work and unlock operational efficiency.',
    available: false,
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'startup',
    title: 'Startup Incubation',
    icon: Rocket,
    description:
      'Mentorship, infrastructure, and AI tooling to launch and scale future-ready startups.',
    available: false,
    bgImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
  },
];
