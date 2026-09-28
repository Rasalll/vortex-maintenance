import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import RotatingText from './RotatingText';
import AIGradientBorder from './AIGradientBorder';

const PRESET_MESSAGE = "Hi VORTEX, I'd like to know more about your learning programs.";

export default function Vision() {
  const [formData, setFormData] = useState({
    fullName: '',
    message: PRESET_MESSAGE,
  });

  return (
    <section id="enquiry" className="relative py-24 sm:py-32 bg-vortex-black overflow-hidden scroll-mt-20">
      {/* Anchor for backward compatibility with existing #vision links */}
      <div id="vision" className="absolute -top-10" aria-hidden="true" />

      {/* Subtle ambient lighting for depth */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-vortex-purple/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-20 w-80 h-80 bg-vortex-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Stacked Large Heading + Low-opacity VORTEX Logo */}
          <div className="lg:col-span-6 relative flex flex-col justify-center reveal">
           

            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.14] uppercase">
              Don’t contact us —<br />
              because if you do,<br />
              you'll become{' '}
              <span className="inline-flex items-baseline bg-vortex-purple text-white text-glow rounded-xl px-3 py-0.5 align-baseline">
                <RotatingText
                  texts={[
                    'Smart',
                    'Great',
                    'Sharp',
                    'Fresh',
                    'Brave',
                  ]}
                  rotationInterval={2400}
                />
                
              </span>
            </h2>
          </div>

          {/* RIGHT SIDE: Contact Form — animated gradient border card */}
          <div className="lg:col-span-6 reveal" data-reveal-delay="200">
            <AIGradientBorder className="p-6 sm:p-10">
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    aria-label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your Name *"
                    className="w-full rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-vortex-purple focus:ring-2 focus:ring-vortex-purple/20 focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    aria-label="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-vortex-purple focus:ring-2 focus:ring-vortex-purple/20 focus:outline-none"
                  />
                </div>

                {/* CTA — calls the number directly */}
                <div className="pt-2">
                  <a
                    href="tel:+918606101333"
                    className="inline-flex w-full items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold bg-white text-slate-900 transition-all shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call to Enquire</span>
                  </a>
                </div>
              </div>
            </AIGradientBorder>
          </div>

        </div>
      </div>
    </section>
  );
}
