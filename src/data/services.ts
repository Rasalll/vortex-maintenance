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
  features: string[];
};

export const SERVICES: Service[] = [
  {
    id: 'institute',
    title: 'AI Integrated Technology Institute',
    icon: GraduationCap,
    description:
      'A next-generation learning institute with AI-integrated curriculum across design, development, DevOps, marketing, and robotics.',
    available: true,
    bgImage: '/logos/webp/ai-integrated-technology-institute.webp',
    features: [
      'AI Integrated Curriculum',
      'Hands-on Live Projects',
      'Direct Career Referral Support',
      'Industry Expert Mentorship',
    ],
  },
  {
    id: 'it-solutions',
    title: 'AI Integrated IT Solutions',
    icon: Code2,
    description:
      'Intelligent software, web, and mobile solutions powered by AI-driven development workflows.',
    available: false,
    bgImage: '/logos/webp/ai-integrated-it-solutions.webp',
    features: [
      'Custom Software Architecture',
      'AI-Driven Workflows',
      'Web & Mobile App Delivery',
      'Optimized Cloud DevOps',
    ],
  },
  {
    id: 'iot-robotics',
    title: 'AI / IoT and Robotics Lab',
    icon: Cpu,
    description:
      'A research lab exploring automation, embedded systems, IoT devices, and AI-driven robotics.',
    available: false,
    bgImage: '/logos/webp/ai-iot-robotics-lab.webp',
    features: [
      'Smart Embedded Systems',
      'Sensor & Actuator Networks',
      'Robotics Vision Programming',
      'Hardware Prototyping',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'AI Era of Digital Marketing',
    icon: Megaphone,
    description:
      'AI-powered SEO, social, paid ads, analytics, branding, and content marketing that scales.',
    available: false,
    bgImage: '/logos/webp/ai-era-digital-marketing.webp',
    features: [
      'AI Audience Targeting',
      'Automated Ad Optimization',
      'Predictive Marketing Analytics',
      'Dynamic Content Generation',
    ],
  },
  {
    id: 'automation',
    title: 'AI Integrated Automation Products',
    icon: Zap,
    description:
      'Smart automation products that reduce manual work and unlock operational efficiency.',
    available: false,
    bgImage: '/logos/webp/ai-integrated-automation-products.webp',
    features: [
      'Enterprise Task Automation',
      'Intelligent Document Extractors',
      'Legacy System API Bridges',
      'Operational Efficiency Dashboards',
    ],
  },
  {
    id: 'startup',
    title: 'Startup Incubation',
    icon: Rocket,
    description:
      'Mentorship, infrastructure, and AI tooling to launch and scale future-ready startups.',
    available: false,
    bgImage: '/logos/webp/startup-incubation.webp',
    features: [
      'AI Tooling Sandbox Access',
      'Pre-seed Pitch Mentorship',
      'Cloud Architecture Credits',
      'Strategic VC Matchmaking',
    ],
  },
];
