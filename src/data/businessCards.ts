export interface BusinessCardProfile {
  username: string;
  name: string;
  designation: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  website?: string;
  linkedin?: string;
  whatsapp?: string;
  address?: string;
  companyLogo?: string;
  profileImage?: string;
  qrImage?: string;
  theme?: {
    accentFrom: string;
    accentTo: string;
  };
}

const BUSINESS_CARDS: Record<string, BusinessCardProfile> = {
  arshad_arif: {
    username: 'arshad_arif',
    name: 'Arshad Arif',
    designation: 'Founder & CEO',
    company: 'VORTEX Global Technologies',
    phone: '+91 8606 288 788',
    email: 'arshadceo.vgt@gmail.com',
    instagram: 'vortex_t_hub',
    website: 'https://www.vortexglobaltechnologies.in/',
    companyLogo: '/logos/webp/vortexx-logo-horizontal-blue-violet.webp',
    qrImage: '/arshad-business-card-qr.png',
    theme: { accentFrom: '#2563eb', accentTo: '#7c3aed' },
  },
};

/** Keeps profile retrieval independent from the current static data source. */
export function getBusinessCardProfile(username: string): BusinessCardProfile | undefined {
  return BUSINESS_CARDS[username.toLowerCase()];
}
