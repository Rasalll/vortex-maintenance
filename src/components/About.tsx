import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";

interface AboutImage {
  id: number;
  src: string;
  alt: string;
}

const ABOUT_IMAGES: AboutImage[] = [
  {
    id: 1,
    src: "/logos/abt-images/1.webp",
    alt: "VORTEX technology and innovation",
  },
  {
    id: 2,
    src: "/logos/abt-images/2.webp",
    alt: "VORTEX engineering team collaboration",
  },
  {
    id: 3,
    src: "/logos/abt-images/3.webp",
    alt: "VORTEX AI integrated technology",
  },
  {
    id: 4,
    src: "/logos/abt-images/4.webp",
    alt: "VORTEX training and workshops",
  },
  {
    id: 5,
    src: "/logos/abt-images/5.webp",
    alt: "VORTEX AI automation solutions",
  },
  {
    id: 6,
    src: "/logos/abt-images/6.webp",
    alt: "VORTEX robotics and IoT technology",
  },
  {
    id: 7,
    src: "/logos/abt-images/7.webp",
    alt: "VORTEX robotics technology lab",
  },
  {
    id: 8,
    src: "/logos/abt-images/8.webp",
    alt: "VORTEX software development",
  },
  {
    id: 9,
    src: "/logos/abt-images/9.webp",
    alt: "VORTEX startup incubation",
  },
  {
    id: 10,
    src: "/logos/abt-images/10.webp",
    alt: "VORTEX student mentorship",
  },
  {
    id: 11,
    src: "/logos/abt-images/11.webp",
    alt: "VORTEX digital marketing technology",
  },
  {
    id: 12,
    src: "/logos/abt-images/12.webp",
    alt: "VORTEX hardware prototyping and testing",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const [images, setImages] = useState<AboutImage[]>(ABOUT_IMAGES);

  const shuffleImages = useCallback(() => {
    setImages((currentImages) => shuffleArray(currentImages));
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      shuffleImages();
    }, 4500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, shuffleImages]);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-slate-100 bg-white py-20 sm:py-28 lg:py-32"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-vortex-purple/5 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-50/50 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT — ABOUT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="
              flex
              flex-col
              items-start
              text-left
              lg:col-span-6
              -translate-y-3
              sm:-translate-y-5
            "
          >
            {/* Heading */}
            <h2
              className="
                max-w-[620px]
                font-display
                text-3xl
                font-bold
                leading-[1.15]
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-[3.25rem]
              "
            >
              Building technology for{" "}

              <span
                className="
                  relative
                  inline-block
                  whitespace-nowrap
                  px-2
                  bg-gradient-to-r
                  from-vortex-purple
                  via-purple-600
                  to-indigo-600
                  bg-clip-text
                  text-transparent
                "
              >
                smarter future.

                {/* Hand-drawn Yellow Rope */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 330 105"
                  fill="none"
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none
                    absolute
                    -left-7
                    -right-7
                    -top-6
                    -bottom-6
                    z-10
                    h-[calc(100%+3rem)]
                    w-[calc(100%+3.5rem)]
                    overflow-visible
                  "
                >
                  <motion.path
                    d="
                      M 22 55
                      C 18 35, 48 15, 105 10
                      C 165 4, 245 9, 298 25
                      C 321 32, 322 53, 307 68
                      C 285 91, 215 96, 148 94
                      C 82 93, 29 83, 20 65
                      C 11 48, 29 29, 63 21
                    "
                    stroke="#FACC15"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 1.3,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-8
                max-w-[580px]
                text-base
                leading-relaxed
                text-slate-600
                sm:mt-9
                sm:text-lg
              "
            >
              VORTEX is an AI-powered technology company building intelligent
              software, automation, and next-generation digital solutions.
              We combine AI and emerging technologies to help businesses and
              institutions operate smarter, faster, and more efficiently.
            </p>
          </motion.div>

          {/* RIGHT — 3 × 4 SHUFFLE GRID */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="
              flex
              w-full
              items-center
              justify-center
              lg:col-span-6
            "
          >
            <div
              className="
                relative
                aspect-[3/4]
                w-full
                max-w-[420px]
                rounded-3xl
                border
                border-slate-200/70
                bg-slate-50/80
                p-2.5
                shadow-2xl
                shadow-purple-900/5
                backdrop-blur-sm
                sm:max-w-[460px]
                sm:p-3.5
                lg:max-w-[480px]
              "
            >
              <div
                className="
                  grid
                  h-full
                  w-full
                  grid-cols-3
                  grid-rows-4
                  gap-2
                  sm:gap-2.5
                "
              >
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    layout
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 280,
                        damping: 26,
                      },
                    }}
                    className="
                      group
                      relative
                      h-full
                      w-full
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/80
                      bg-slate-100
                      shadow-sm
                      sm:rounded-2xl
                    "
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Hover Overlay */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-slate-950/10
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}