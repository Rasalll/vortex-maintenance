import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
}

export const Timeline = ({
  data,
  title = "Institute Roadmap & Learning Journey",
  subtitle = "Follow the structured pathway designed to transform beginners into industry-ready AI & software engineering professionals."
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white text-slate-900 font-sans md:px-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm my-16 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-10">
        <p className="text-vortex-green font-mono text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          // Curriculum Timeline
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight max-w-4xl">
          {title}
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-vortex-green/10 border border-vortex-green/30 flex items-center justify-center">
                <div className="h-3.5 w-3.5 rounded-full bg-vortex-green shadow-glow-green-sm" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-display font-bold text-slate-700">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-display font-bold text-slate-800">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-slate-200"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-vortex-green via-[#9ECB3B] to-[#7BA82A] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
