import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Exact Brand SVGs from your design specification
───────────────────────────────────────────── */

const TCSIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#004b87" strokeWidth="2.5"></circle>
    <path d="M8 12h8M12 8v8" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round"></path>
  </svg>
);

const InfosysIcon: React.FC = () => (
  <svg className="w-6 h-4 shrink-0" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="16" rx="2" fill="#007cc3"></rect>
    <path d="M5 4v8h2V8h2v4h2V8h2v4h2V8h2v4h2V4h-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const WiproIcon: React.FC = () => (
  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
    <div className="absolute w-3.5 h-3.5 rounded-full border border-[#78248c]/30"></div>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#009fda] -top-0.5"></div>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#f48120] -bottom-0.5"></div>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#13a89e] -left-0.5"></div>
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#fdd000] -right-0.5"></div>
  </div>
);

const HCLIcon: React.FC = () => (
  <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6v8h2v-3h3v3h2V6H9v3H6V6H4zm9 0v6h3v2h-5V6h2zm7 0h-2v8h4v-2h-2V6z" fill="#005691"></path>
  </svg>
);

const CognizantIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0033a0"></rect>
    <circle cx="12" cy="12" r="4.5" fill="#00b5e2"></circle>
  </svg>
);



const ZohoIcon: React.FC = () => (
  <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0">
    <div className="bg-red-500 rounded-[2px]"></div>
    <div className="bg-blue-500 rounded-[2px]"></div>
    <div className="bg-yellow-500 rounded-[2px]"></div>
    <div className="bg-green-500 rounded-[2px]"></div>
  </div>
);

const HexawareIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3l9 16H3l9-16z" fill="#002855"></path>
    <path d="M12 8l5 9H7l5-9z" fill="#78be20"></path>
  </svg>
);

const CapgeminiIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#0070ad"></circle>
    <circle cx="12" cy="12" r="5" fill="white"></circle>
  </svg>
);

const AccentureIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5l7 7-7 7" stroke="#a100ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const MphasisIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#e31b23" strokeWidth="3.5"></circle>
    <circle cx="12" cy="12" r="3.5" fill="#e31b23"></circle>
  </svg>
);

const LTIIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#002d62"></rect>
    <rect x="7" y="7" width="10" height="10" rx="1" fill="#d4af37"></rect>
  </svg>
);

const MindtreeIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#009688"></circle>
    <circle cx="9" cy="9" r="2.5" fill="#ff9800"></circle>
    <circle cx="15" cy="15" r="2.5" fill="#9c27b0"></circle>
  </svg>
);

/* ─────────────────────────────────────────────
   Exact array of requested companies
───────────────────────────────────────────── */
const partners = [
  { name: "TCS",           icon: <TCSIcon /> },
  { name: "Infosys",       icon: <InfosysIcon /> },
  { name: "Wipro",         icon: <WiproIcon /> },
  { name: "HCL",           icon: <HCLIcon /> },
  { name: "Cognizant",     icon: <CognizantIcon /> },

  { name: "Zoho",          icon: <ZohoIcon /> },
  { name: "Hexaware",      icon: <HexawareIcon /> },
  { name: "Capgemini",     icon: <CapgeminiIcon /> },
  { name: "Accenture",     icon: <AccentureIcon /> },
  { name: "Mphasis",       icon: <MphasisIcon /> },
  { name: "LTI",           icon: <LTIIcon /> },
  { name: "Mindtree",      icon: <MindtreeIcon /> },
];

const Partners: React.FC = () => {
  // Triple the array to ensure ultra-smooth seamless carousel loops without jumps
  const doubled = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-cream overflow-hidden border-y border-border/50 select-none">
      <div className="w-full">
        <p className="text-center text-muted font-black uppercase tracking-[0.3em] text-xs mb-10">
          Our Graduates Work At
        </p>

        {/* Infinite scrolling marquee wrapper */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            style={{
              width: "fit-content",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {doubled.map((partner, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {partner.icon}
                </div>
                <span className="text-xs font-black text-navy uppercase tracking-widest">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
