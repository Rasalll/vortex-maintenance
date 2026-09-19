Replace the current Services section with a scroll-driven parallax experience using React Lenis + Motion (motion/react).

IMPORTANT:
Keep the existing website design, navbar, routing, colors, typography, service card styling, and all existing functionality unless specifically changed below.

REFERENCE ANIMATION:
Recreate the SAME TYPE of scroll behavior as the provided SmoothScrollHero example:
- Lenis smooth scrolling
- Sticky viewport section
- Scroll-linked transforms
- Images moving at different vertical speeds
- Scale animation
- Opacity/fade animation
- Long scroll section that gives the animation enough travel distance
- Smooth transition into the next section

DO NOT copy the SpaceX content or dark theme.
Only reproduce the animation technique and interaction.

SERVICES:
There are exactly 6 services, in this exact order:

1. AI Integrated Technology Institute
   Image:
   /logos/ai-integrated-technology-institute.png

2. AI Integrated IT Solutions
   Image:
   /logos/ai-integrated-it-solutions.png

3. AI / IoT and Robotics Lab
   Image:
   /logos/ai-iot-robotics-lab.png

4. AI Era of Digital Marketing
   Image:
   /logos/ai-era-digital-marketing.png

5. AI Integrated Automation Products
   Image:
   /logos/ai-integrated-automation-products.png

6. Startup Incubation
   Image:
   /logos/startup-incubation.png

Use these exact filenames in the implementation.

SCROLL EXPERIENCE:

Create a tall Services section, approximately:

const SECTION_HEIGHT = 1800;

Inside it, create a sticky viewport container:

- height: 100vh
- position: sticky
- top: 0

The user should feel like they are moving through the 6 services while the viewport remains visually anchored.

IMAGE BEHAVIOR:

At the beginning, show Service 1:
AI Integrated Technology Institute

As the user scrolls:
- Service 1 becomes prominent
- Service 2 enters with a different vertical offset
- Service 3 follows
- Service 4 follows
- Service 5 follows
- Service 6 becomes the final service

Use Motion values based on scroll progress.

Each service image should have:
- translateY
- scale
- opacity
- subtle movement
- slight depth/parallax

Do NOT use aggressive rotation.

Use smooth, subtle movement.

IMPORTANT VISUAL IDEA:

The six images should feel like they are moving through the same visual space.

Example:

Service 1
    ↓
Service 2
    ↓
Service 3
    ↓
Service 4
    ↓
Service 5
    ↓
Service 6

But the transition should be visually fluid instead of six hard page jumps.

SERVICE CONTENT:

Keep the existing service information in the implementation.

For each service show:
- Service title
- Existing description
- Existing tags
- Existing status (LIVE / SOON)
- Existing clickable behavior

Only the first service is clickable:
AI Integrated Technology Institute

All other services remain disabled / SOON.

The service content should animate together with its corresponding image.

FIRST SERVICE:
The first service should appear first when the Services section enters the viewport.

FINAL SERVICE:
Startup Incubation should be the last service before the section ends.

ANIMATION DETAILS:

Use:
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate
} from "motion/react";

Use refs and scrollYProgress.

Each service can have its own parallax range.

Example idea:

const y = useTransform(
  scrollYProgress,
  [0, 1],
  [start, end]
);

const scale = useTransform(
  scrollYProgress,
  [0, 0.8, 1],
  [0.92, 1, 0.92]
);

const opacity = useTransform(
  scrollYProgress,
  [0, 0.15, 0.85, 1],
  [0, 1, 1, 0]
);

Do not blindly copy these exact values; tune them so all six services transition naturally.

IMAGE PRESENTATION:

Use each generated image as a full visual inside the service presentation.

Do not stretch images unnaturally.

Use:
object-fit: cover

or another appropriate responsive method depending on the existing card dimensions.

Maintain consistent image proportions across all six services.

DESKTOP:
- Large service visual
- Service text remains readable
- Smooth parallax movement
- Purple/violet VORTEX theme

MOBILE:
- Do not keep the exact desktop positioning
- Stack content appropriately
- Reduce image scale
- Preserve readable titles and descriptions
- Keep animations subtle
- Avoid excessive scrolling height

TRANSITION:

When the Services section reaches its end, smoothly release the sticky container and continue naturally into the next website section.

Do not show a dark background like the SpaceX example.
Maintain the existing VORTEX white / lavender / purple visual language.

IMPORTANT:
This should feel like a premium modern technology website.

Do NOT:
- add extra services
- add statistics
- add unnecessary cards
- add new text
- remove existing service descriptions
- change the service order
- make SOON services clickable
- use the SpaceX images
- use external image URLs
- replace the generated service images with placeholders

Use the local image assets exactly as provided.

The most important requirement:
The scroll behavior should closely reproduce the smooth sticky parallax feeling of the supplied SmoothScrollHero code, but using the 6 VORTEX service images and VORTEX's existing content.