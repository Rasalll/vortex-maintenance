import React, { useEffect } from 'react';
import { Check, Zap, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AutomationProductsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const whatsappMessage = encodeURIComponent('Hi VORTEX, I want to know more about your AI Integrated Automation Products');
  const whatsappUrl = `https://wa.me/918606101333?text=${whatsappMessage}`;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pt-44 pb-20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vortex-purple/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Hero Section */}
        <div className="relative mb-16 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] py-8 sm:py-12">
          <div className="max-w-3xl text-left">
            <h1 className="font-display font-bold text-slate-900 text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              AI Integrated <br />
              <span className="text-vortex-purple text-glow">Automation Products</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Smart automation products and bridges that eliminate repetitive manual labor, streamline operations, and unlock business efficiency.
            </p>

            <div className="mt-8 flex flex-wrap justify-start gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-vortex-purple px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire Automation Products
              </a>
              <a
                href="tel:+918606101333"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-vortex-purple/50 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-vortex-purple" />
                Call Direct
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <img
              src="/logos/webp/vortex-v-purple.png"
              alt="VORTEX purple icon"
              className="h-auto w-[min(90vw,42rem)] max-w-none object-contain"
            />
          </div>
        </div>

        {/* ── SECTION 1: Services ── */}
        <div id="automation-services" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl tracking-tight">
              Our <span className="text-vortex-purple text-glow">Services</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500">
              AI software, automation, development, and digital growth services tailored to your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 overflow-x-clip px-1 pb-4">
            {[
              {
                title: 'AI Software Development',
                desc: 'Custom web, mobile, SaaS, and enterprise applications built with intelligent development workflows.',
              },
              {
                title: 'Business Process Automation',
                desc: 'Automate repetitive tasks, approvals, data processing, reporting, and day-to-day business operations.',
              },
              {
                title: 'AI Integration & Solutions',
                desc: 'Integrate AI assistants, intelligent search, recommendations, and AI-powered workflows into existing systems.',
              },
              {
                title: 'Web & Mobile Development',
                desc: 'Modern websites, dashboards, portals, and mobile applications designed for performance and scalability.',
              },
              {
                title: 'Digital Marketing & AI SEO',
                desc: 'SEO, content, social media, paid advertising, analytics, and AI-driven digital growth strategies.',
              },
              {
                title: 'IoT, Robotics & Smart Systems',
                desc: 'IoT devices, embedded systems, robotics, computer vision, sensors, and intelligent automation solutions.',
              },
            ].map((s) => (
              <div key={s.title} className="card-purple-stack group">
                <span className="card-purple-stack-layer" aria-hidden="true" />
                <article className="card-purple flex h-full flex-col justify-between p-8 relative overflow-hidden">
                  <div className="relative z-10 pt-2">
                    <h3 className="font-helvetica font-bold text-white text-xl leading-snug transition-colors duration-300 group-hover:text-violet-300">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-white leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Products ── */}
        <div id="automation-products" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl tracking-tight">
              <span className="text-vortex-purple text-glow">Products</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500">
              Business platforms that bring customer management, operations, support, and workflows together.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 overflow-x-clip px-1 pb-4">
            {[
              {
                name: 'CRM',
                desc: 'Customer, lead, sales pipeline, and follow-up management.',
                image: '/automation-products/CRM.png',
              },
              {
                name: 'CMS',
                desc: 'Website, content, pages, media, and publishing management.',
                image: '/automation-products/CMS.png',
              },
              {
                name: 'ERP',
                desc: 'Business operations, finance, inventory, purchasing, and reporting management.',
                image: '/automation-products/ERP.png',
              },
              {
                name: 'HRMS',
                desc: 'Employee, attendance, leave, payroll, and recruitment management.',
                image: '/automation-products/HRMS.png',
              },
              {
                name: 'Helpdesk',
                desc: 'Customer support, tickets, knowledge base, and automated assistance.',
                image: '/automation-products/HELPDESK.png',
              },
              {
                name: 'Workflow Automation',
                desc: 'Automate repetitive tasks, approvals, notifications, and business processes.',
                image: '/automation-products/WORKFLOW-AUTOMATION.png',
              },
            ].map((p, index) => {
              const spans = ['md:col-span-4', 'md:col-span-8', 'md:col-span-8', 'md:col-span-4', 'md:col-span-4', 'md:col-span-8'];
              return (
                <motion.article
                  key={p.name}
                  whileHover={{ scale: 0.95, rotate: '-1deg' }}
                  className={`group relative col-span-12 min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${spans[index]}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-500 to-indigo-500 p-5 text-white transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                    <h3 className="text-center text-xl font-semibold leading-snug text-white">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-center text-base font-medium leading-relaxed text-indigo-50">
                      {p.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 3: Why VORTEX Automation ── */}
        <section className="mb-20 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
             
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Why Choose <span className="text-vortex-purple">VORTEX Automation?</span>
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Practical automation designed to reduce repetitive work, simplify operations, and help businesses get more done without unnecessary complexity.
              </p>
            </div>

            <div className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center text-vortex-purple md:mx-4 md:h-36 md:w-36">
              <div className="absolute inset-3 rounded-full bg-vortex-purple/10 blur-xl" aria-hidden="true" />
              <Zap className="relative h-20 w-20 drop-shadow-sm md:h-28 md:w-28" strokeWidth={1.25} aria-hidden="true" />
            </div>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Reduce Repetitive Work',
                desc: 'Automate time-consuming tasks such as data entry, document handling, notifications, and routine processes.',
              },
              {
                title: 'Built Around Your Business',
                desc: 'We design automation around your actual workflows instead of forcing you into a fixed system.',
              },
              {
                title: 'Professional Without the High Cost',
                desc: 'Get reliable automation solutions focused on real business value without unnecessary complexity or expensive enterprise overhead.',
              },
              {
                title: 'Works With Existing Systems',
                desc: 'Connect your current software, databases, and business tools instead of replacing everything from scratch.',
              },
              {
                title: 'Faster Everyday Operations',
                desc: 'Reduce manual steps and help your team complete routine processes more efficiently.',
              },
              {
                title: 'Scalable When You Need It',
                desc: 'Start with one workflow and expand your automation as your business grows.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <Check className="mt-1 h-5 w-5 shrink-0 text-vortex-purple" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold leading-tight text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
