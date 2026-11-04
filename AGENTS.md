# VORTEX Global Technologies — Project Case Study

## Project overview

VORTEX Global Technologies is a responsive marketing website for an AI-integrated technology company and its learning institute. The experience introduces the organization, presents its service areas, explains its practical learning approach, and gives visitors a focused view of the institute's programs.

**Project type:** Public-facing company and education website  
**Primary audience:** Prospective learners, clients, partners, and startup founders  
**Primary goal:** Explain VORTEX's technology and education offering and guide visitors toward exploring services or contacting the organization.

## The challenge

The site needs to communicate several related offerings—AI-integrated education, IT solutions, IoT and robotics, digital marketing, automation, and startup incubation—without making the organization feel like a disconnected list of services. It also needs to make the currently available institute offering easy to explore while setting expectations that other service verticals are forthcoming.

## The approach

The site uses a single-page company narrative with a dedicated institute view. The homepage introduces the brand and its future-focused positioning, then moves through the company overview, service catalogue, learning differentiators, and closing vision. Selecting the available institute service opens a detailed program page; unavailable services show a coming-soon state.

The visual direction pairs clean, light content sections with dark technology-focused sections and violet brand accents. Motion supports the experience through animated hero typography, interactive particle visuals, scroll reveals, parallax cards, and hover previews. Responsive navigation and layouts support both desktop and mobile browsing.

## Key experience components

- **Hero:** “Empowering a Smarter Tomorrow” headline, supporting proposition, and paths to services and company information.
- **Company overview:** A concise explanation of VORTEX's connected education, software, automation, and emerging technology work.
- **Service catalogue:** Six data-driven service entries with descriptions, feature lists, visual previews, and availability states.
- **Institute experience:** A focused view of six learning tracks: creative design, web development, mobile development, DevOps and server-side, digital marketing, and AI/IoT/robotics.
- **Learning differentiators:** AI-integrated curriculum, expert mentorship, real-world project work, practical learning, future-ready skills, and innovation.
- **Contact and discovery:** Section navigation, social links, telephone, location, and website details.

## Implementation

- **Frontend:** React 18, TypeScript, and Vite.
- **Styling:** Tailwind CSS with project-specific VORTEX colors, typography, glows, and layout utilities.
- **Motion and visuals:** Motion for React, GSAP integrations, OGL/WebGL particle effects, and custom scroll and pointer hooks.
- **Icons:** Lucide React.
- **Content model:** Service and program catalogues live in `src/data/services.ts` and `src/data/programs.ts` and are rendered by reusable components.
- **SEO foundation:** The HTML entry point includes page metadata, canonical URL, Open Graph and Twitter card metadata, and Organization and WebSite structured data.

## Project structure

- `src/App.tsx` coordinates the homepage and institute view.
- `src/components/` contains the page sections, navigation, institute experience, visual effects, and reusable business card components.
- `src/data/` contains typed service, program, and business card content.
- `src/hooks/` contains reusable scroll and pointer behavior.
- `src/index.css` and the root Tailwind configuration define the visual system.
- `index.html` contains document metadata and structured data.
- `public/_redirects` configures Netlify's SPA fallback for direct route access.

## Outcome and current scope

The repository provides a polished, interactive company website and an institute program experience, with the institute marked as the available service and five other service areas presented as forthcoming. A reusable static digital business card module is also available at `/business-card/:username`, with profile data in `src/data/businessCards.ts`, vCard contact handoff, a profile-supplied QR image, and a not-found state. The project source does not document measured traffic, conversion, enrollment, or performance outcomes, so no quantitative impact is claimed here.

## Local development

Install dependencies with `npm install`, then start the Vite development server with `npm run dev`.

Available project commands:

- `npm run build` — create a production build.
- `npm run typecheck` — run the TypeScript application check.
- `npm run lint` — run ESLint.
- `npm run preview` — serve the production build locally.

## Notes for future contributors

- Keep service and program content in the typed data modules instead of duplicating catalogue copy across components.
- Preserve responsive behavior and reduced-motion/accessibility considerations when changing animation-heavy areas.
- Treat availability labels and contact information as business content that should be confirmed before changing.
- Verify asset URLs against Vite's public asset conventions when adding or moving images.
- Do not invent business impact metrics; add them only when supplied or measured.
