"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TiltCard from "@/components/TiltCard";

const EASE = [0.23, 1, 0.32, 1] as const;
const DUR  = 0.65;

const history = [
  {
    role: "Full Stack Developer",
    company: "MediTechSafe.Inc",
    tag: "Engineering",
    description:
      "Worked in a fast-paced startup environment, delivering key platform capabilities in risk management, cybersecurity, and compliance management. Took product requirements from concept to wireframes/prototypes to final execution — building scalable features within tight deadlines, maintaining top quality, and adopting new technologies rapidly to meet evolving business needs.",
  },
  {
    role: "Technical Lead",
    company: "MediTechSafe.Inc",
    tag: "Leadership",
    description:
      "Led a team of developers and interns, driving code quality, hiring, and mentoring — while remaining hands-on in product development to ensure timely and high-quality delivery.",
  },
  {
    role: "Lead UI/UX Designer",
    company: "QLeapAi LLC",
    tag: "Design",
    description:
      "Currently leading the UI/UX design for five AI-powered applications, delivering user-friendly interfaces and seamless experiences tailored to complex AI features.",
  },
  {
    role: "Founder / Director",
    company: "Modawal Labs Pvt. Ltd.",
    tag: "Venture",
    description:
      "Collaborating with founders to design, build, and launch scalable SaaS products — from idea validation to production-ready MVPs — focusing on speed, clarity, and real-world traction.",
  },
];

export default function CredibilityStrip() {
  const { ref, isInView, y } = useScrollAnimation();

  return (
    <section ref={ref} className="py-[81px] border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-12">

          {/* Left — image with orbital tilt */}
          <motion.div
            className="flex-shrink-0 lg:self-stretch justify-center align-center"
            animate={
              isInView
                ? { opacity: 1, y: 0,   transition: { duration: DUR, ease: EASE } }
                : { opacity: 0, y,      transition: { duration: DUR, ease: EASE } }
            }
          >
            <TiltCard
              src="/assets/shivansh.jpeg"
              alt="Shivansh Modawal"
              wrapperClassName="lg:h-full"
              cardClassName="w-[300px] sm:w-[340px] lg:w-[380px] h-[400px] sm:h-[440px] lg:h-full"
            >
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F1629] border border-white/10 whitespace-nowrap z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">Hey ! I&apos;m Shivansh Modawal</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right — professional history */}
          <div className="flex-1">
            <motion.p
              className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-medium"
              animate={
                isInView
                  ? { opacity: 1, y: 0,   transition: { duration: DUR, delay: 0.15, ease: EASE } }
                  : { opacity: 0, y,      transition: { duration: DUR, delay: 0,    ease: EASE } }
              }
            >
              Professional History
            </motion.p>

            <div className="flex flex-col gap-4">
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0,   transition: { duration: DUR, delay: 0.25 + i * 0.1, ease: EASE } }
                      : { opacity: 0, y,      transition: { duration: DUR, delay: 0,               ease: EASE } }
                  }
                  className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0b1220] shadow-[0_20px_80px_rgba(15,23,42,0.45)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 group"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.16),transparent_28%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_35%)] pointer-events-none" />
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')" }} />
                  <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-blue-100 transition-colors duration-200">
                      {item.role}
                    </h3>
                    <span className="flex-shrink-0 text-[10px] font-semibold text-blue-300 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 mt-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-400 mb-3 tracking-wide">{item.company}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
