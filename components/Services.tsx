"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

const services = [
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: "MVP Validation Prototype",
    text: "Clickable Figma prototype to test your idea before building. Get real user feedback before spending a cent on development.",
    deliverables: ["Figma prototype", "User flow maps", "Feedback framework", "Iteration notes"],
    price: "From $500", duration: "3–5 days", popular: false, color: "from-blue-500/15 to-indigo-500/5",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "MVP Roadmap & Tech Strategy",
    text: "Clear plan + stack to build efficiently without wasting time or money. Know exactly what to build, how, and in what order.",
    deliverables: ["Tech stack recommendation", "90-day roadmap", "Cost breakdown", "Vendor selection"],
    price: "From $800", duration: "5–7 days", popular: true, color: "from-blue-600/20 to-blue-400/10",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "App Testing & UX Optimization",
    text: "Ensure smooth, intuitive, bug-free experience before launch. Catch every issue before your users do.",
    deliverables: ["Full UX audit", "Bug report", "Performance analysis", "Improvement roadmap"],
    price: "From $600", duration: "3–5 days", popular: false, color: "from-indigo-500/15 to-blue-500/5",
  },
];

export default function Services() {
  const { ref, isInView, y } = useScrollAnimation();

  const hdr = (delay = 0) =>
    isInView
      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay, ease: EASE } }
      : { opacity: 0, y,      transition: { duration: DUR, delay: 0, ease: EASE } };

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span animate={hdr(0)} className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            Services
          </motion.span>
          <motion.h2 animate={hdr(0.07)} className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Work <span className="gradient-text">With Me</span>
          </motion.h2>
          <motion.p animate={hdr(0.14)} className="text-slate-400 text-lg max-w-xl mx-auto">
            For founders who want it done right—and fast.
          </motion.p>
          <motion.div animate={hdr(0.2)} className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm text-amber-300 font-medium">Limited slots available — 1 spot open this month</span>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1,   transition: { duration: DUR, delay: 0.25 + i * 0.1, ease: EASE } }
                  : { opacity: 0, y,    scale: 0.96, transition: { duration: DUR, delay: 0,               ease: EASE } }
              }
              className={`relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0b1220] shadow-[0_20px_80px_rgba(15,23,42,0.45)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 ${service.popular ? "border-blue-500/30" : ""}`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">Most Requested</div>
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 pointer-events-none`} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(79,70,229,0.16), transparent 28%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')",
                }}
              />
              <div className="relative z-10 space-y-5">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-tight">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-6 md:leading-7">{service.text}</p>
                <ul className="space-y-3 mb-5">
                  {service.deliverables.map((d, di) => (
                    <li key={di} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between py-3 border-t border-white/5 mb-4">
                  <span className="text-lg md:text-xl font-bold gradient-text">{service.price}</span>
                  <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">{service.duration}</span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="#contact" className="btn-primary flex-1 py-2.5 rounded-lg text-sm font-semibold text-white text-center"><span>Book a Call</span></a>
                  {/* <a href="mailto:shivansh@example.com" className="btn-outline flex-1 py-2.5 rounded-lg text-sm font-semibold text-white text-center">Message Me</a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
