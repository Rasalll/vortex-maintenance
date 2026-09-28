// VORTEX Knowledge Base
// Each entry has a topic, keywords, and content used for retrieval.

export interface KnowledgeEntry {
  topic: string;
  keywords: string[];
  content: string;
}

export const VORTEX_KNOWLEDGE: KnowledgeEntry[] = [
  {
    topic: 'company',
    keywords: [
      'vortex', 'company', 'about', 'what is', 'entha', 'cheyyunne', 'who', 'describe',
      'overview', 'mission', 'vision', 'technology', 'ai company', 'founded', 'based',
    ],
    content: `
# VORTEX — Company Overview

VORTEX is an AI-powered technology company building intelligent software, automation, and next-generation digital solutions.

Brand message: "Building technology for a smarter future."

VORTEX combines AI and emerging technologies to help businesses and institutions operate smarter, faster, and more efficiently.

Focus areas:
- Education
- Software
- Innovation
- Automation
- Startups
- Future technologies

VORTEX is headquartered in Manjeri, Malappuram, Kerala, with offices at Infopark Kochi and CAPKON Calicut.
    `.trim(),
  },
  {
    topic: 'services',
    keywords: [
      'service', 'services', 'offer', 'do', 'provide', 'vertical', 'business',
      'what does vortex do', 'solutions', 'products', 'work', 'cheyyunne', 'cheyyum',
    ],
    content: `
# VORTEX — Main Services

VORTEX has six verticals engineered around AI:

## 1. AI Integrated Technology Institute
A next-generation learning institute with AI-integrated curriculum across design, development, DevOps, marketing, and robotics.
Key areas: AI Integrated Curriculum, Hands-on Live Projects, Direct Career Referral Support, Industry Expert Mentorship.

## 2. AI Integrated IT Solutions
Intelligent software, web, and mobile solutions powered by AI-driven development workflows.
Key areas: Custom Software Architectures, AI-Driven Workflows, Web & Mobile App Delivery, Optimized Cloud DevOps.

## 3. AI / IoT and Robotics Lab
A research lab exploring automation, embedded systems, IoT devices, and AI-driven robotics.
Key areas: Smart Embedded Systems, Sensor & Actuator Networks, Robotics Vision Programming, Hardware Prototyping.

## 4. AI Era of Digital Marketing
AI-powered SEO, social, paid ads, analytics, branding, and content marketing that scales.
Key areas: AI Audience Targeting, Automated Ad Optimizations, Predictive Marketing Analytics, Dynamic Content Generation.

## 5. AI Integrated Automation Products
Smart automation products that reduce manual work and unlock operational efficiency.
Key areas: Enterprise Task Automations, Intelligent Document Extractors, Legacy System API Bridges, Operational Efficiency Dashboards.

## 6. Startup Incubation
Mentorship, infrastructure, and AI tooling to launch and scale future-ready startups.
Key area: AI Tooling Sandbox Access.
    `.trim(),
  },
  {
    topic: 'institute',
    keywords: [
      'institute', 'course', 'courses', 'learn', 'learning', 'training', 'education',
      'program', 'programs', 'study', 'student', 'academy', 'enroll', 'admission',
      'curriculum', 'class', 'classes', 'design', 'web', 'mobile', 'devops', 'marketing',
      'robotics', 'certificate', 'certification', 'internship', 'placement', 'job',
    ],
    content: `
# VORTEX — AI Integrated Technology Institute

A next-generation learning institute in Manjeri with an AI-integrated curriculum.

## Learning Programs
1. Creative Designing — Design smarter with AI tools.
2. Website & Web Application Development — Build responsive, intelligent websites with AI-powered workflows.
3. Mobile App Development — Create Android and iOS applications with AI-assisted development.
4. DevOps & Server Side — Automate, deploy, monitor, and scale applications using modern DevOps.
5. Digital Marketing — Grow businesses using AI-powered SEO, social media, paid advertising, analytics, branding, and content marketing.
6. AI, IoT and Robotics — Explore intelligent automation, robotics, embedded systems, IoT, ML, computer vision.

## Why Study at VORTEX Institute?
- AI Workflow Integration: Master AI-driven IDEs, code generation, design automation, content intelligence.
- Real-world Client Projects: Work on actual live client applications.
- 1-on-1 Senior Mentorship: Direct code reviews and technical feedback from experienced developers.
- Career & Placement Support: Build GitHub and portfolio proof of work aimed at real opportunities.

## Learning Features
- AI Integrated Curriculum from day one.
- Expert Mentors — engineers working on real products.
- 100% Practical Learning — hands-on, project-first methodology.
- Future Ready Skills for the AI era.
- Innovation First culture.
    `.trim(),
  },
  {
    topic: 'contact',
    keywords: [
      'contact', 'phone', 'email', 'address', 'location', 'reach', 'call', 'where',
      'headquarter', 'hq', 'office', 'instagram', 'social', 'website', 'number',
      'manjeri', 'kochi', 'calicut', 'kozhikode', 'malappuram', 'kerala',
    ],
    content: `
# VORTEX — Contact & Locations

## Contact Information
- Phone: +91 8606 101 333
- Website: vortexglobaltechnologies.in
- Instagram: @vortex_t_hub

## Locations
- Primary HQ: Nelliparambu, Manjeri, Malappuram – 676122
- Infopark, Kochi: Infopark Technology Campus, Kochi
- CAPKON, Calicut: CAPKON Innovation Hub, Calicut
    `.trim(),
  },
  {
    topic: 'technology',
    keywords: [
      'technology', 'tech', 'stack', 'tool', 'tools', 'ai', 'artificial intelligence',
      'machine learning', 'automation', 'iot', 'robotics', 'cloud', 'devops', 'software',
    ],
    content: `
# VORTEX — Technology Focus

VORTEX is built around AI-integrated workflows and emerging technologies:

- Artificial Intelligence (AI) — core to every vertical.
- Machine Learning and Computer Vision.
- IoT (Internet of Things) and embedded systems.
- Robotics and intelligent automation.
- Cloud infrastructure and DevOps.
- Custom software and mobile applications.
- Digital marketing powered by AI analytics.
- Startup incubation with AI tooling.

VORTEX uses AI as a force multiplier across education, product development, marketing, and automation.
    `.trim(),
  },
];

/**
 * Retrieve knowledge entries most relevant to the user's query.
 * Simple keyword matching — good enough for Phase 1.
 */
export function retrieveRelevantKnowledge(query: string): string {
  const q = query.toLowerCase();

  const scored = VORTEX_KNOWLEDGE.map((entry) => {
    const score = entry.keywords.reduce((acc, kw) => {
      return q.includes(kw.toLowerCase()) ? acc + 1 : acc;
    }, 0);
    return { entry, score };
  });

  // Sort descending by score, pick entries with score > 0
  const relevant = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2) // top 2 most relevant entries
    .map(({ entry }) => entry.content);

  if (relevant.length === 0) {
    // Fallback: return company overview
    return VORTEX_KNOWLEDGE[0].content;
  }

  return relevant.join('\n\n---\n\n');
}
