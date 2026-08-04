import {
  Palette,
  Globe,
  Smartphone,
  Server,
  TrendingUp,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export type Program = {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: LucideIcon;
};

export const PROGRAMS: Program[] = [
  {
    id: 'creative-designing',
    title: 'Creative Designing',
    badge: 'AI Integrated',
    description: 'Design smarter. Create better. Inspire with AI.',
    icon: Palette,
  },
  {
    id: 'web-dev',
    title: 'Website & Web Application Development',
    badge: 'AI Integrated',
    description:
      'Build responsive, intelligent websites and web applications using AI-powered development workflows.',
    icon: Globe,
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    badge: 'AI Integrated',
    description:
      'Create powerful, intuitive Android and iOS applications with AI-assisted development.',
    icon: Smartphone,
  },
  {
    id: 'devops',
    title: 'DevOps & Server Side',
    badge: 'Backend',
    description:
      'Automate, deploy, monitor, and scale applications using modern DevOps practices and backend technologies.',
    icon: Server,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    badge: 'AI Integrated',
    description:
      'Grow businesses using AI-powered digital marketing strategies including SEO, social media marketing, paid advertising, analytics, branding, and content marketing.',
    icon: TrendingUp,
  },
  {
    id: 'ai-iot-robotics',
    title: 'AI, IoT and Robotics',
    badge: 'Future Program',
    description:
      'Explore intelligent automation, robotics, embedded systems, IoT devices, machine learning, computer vision, and AI-driven innovations.',
    icon: Bot,
  },
];
