import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Exact Brand SVGs from your design specification
───────────────────────────────────────────── */

const TCSIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 5 38 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tcsGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f58220" />
        <stop offset="35%" stopColor="#e01b84" />
        <stop offset="70%" stopColor="#7a2583" />
        <stop offset="100%" stopColor="#0072bc" />
      </linearGradient>
    </defs>
    <path d="M7 6v5H3.5c-.3 0-.5.2-.5.5v1.5c0 .3.2.5.5.5H7v8c0 1.7 1.3 3 3 3h2c.3 0 .5-.2.5-.5v-1.5c0-.3-.2-.5-.5-.5h-1c-.6 0-1-.4-1-1v-7.5h3.5c.3 0 .5-.2.5-.5v-1.5c0-.3-.2-.5-.5-.5H10V6c0-.3-.2-.5-.5-.5H7.5c-.3 0-.5.2-.5.5z" fill="url(#tcsGrad2)" />
    <path d="M23.5 11.5c-1.2-1.2-2.8-2-4.8-2-3.5 0-6.5 2.8-6.5 6.5s3 6.5 6.5 6.5c2 0 3.6-.8 4.8-2 .3-.3.3-.8 0-1.1l-1.2-1.2c-.3-.3-.8-.3-1.1 0-.8.6-1.6 1.1-2.5 1.1-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2c.9 0 1.7.5 2.5 1.1.3.3.8.3 1.1 0l1.2-1.2c.3-.3.3-.8 0-1.1z" fill="url(#tcsGrad2)" />
    <path d="M29.5 11c-1.8 0-3.2 1-3.2 2.5v.5c0 1.2 1 2 2.8 2.4h.8c1.2.3 1.6.6 1.6 1.2v.4c0 .6-.6 1.2-1.6 1.2h-2.8c-.5 0-.8.3-.8.8v1.5c0 .5.3.8.8.8H30.5c2.6 0 4.8-1.6 4.8-3.6v-.4c0-1.6-1.2-2.4-3.2-2.8h-.8c-1.2-.3-1.6-.6-1.6-1.2v-.4c0-.6.6-1.2 1.6-1.2h2.4c.5 0 .8-.3.8-.8v-1.5c0-.5-.3-.8-.8-.8h-2z" fill="url(#tcsGrad2)" />
  </svg>
);

const InfosysIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="16" fill="#007cc3" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.03em">Infosys</text>
  </svg>
);

const WiproIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(14, 14)">
      <circle cx="-10" cy="0" r="1.5" fill="#009fda" />
      <circle cx="-8.6" cy="5" r="1.5" fill="#78248c" />
      <circle cx="-5" cy="8.6" r="1.5" fill="#e01b84" />
      <circle cx="0" cy="10" r="1.5" fill="#f48120" />
      <circle cx="5" cy="8.6" r="1.5" fill="#fdd000" />
      <circle cx="8.6" cy="5" r="1.5" fill="#13a89e" />
      <circle cx="10" cy="0" r="1.5" fill="#009fda" />
      <circle cx="8.6" cy="-5" r="1.5" fill="#78248c" />
      <circle cx="5" cy="-8.6" r="1.5" fill="#e01b84" />
      <circle cx="0" cy="-10" r="1.5" fill="#f48120" />
      <circle cx="-5" cy="-8.6" r="1.5" fill="#fdd000" />
      <circle cx="-8.6" cy="-5" r="1.5" fill="#13a89e" />
      <circle cx="-7" cy="0" r="1.2" fill="#f48120" />
      <circle cx="-5" cy="5" r="1.2" fill="#fdd000" />
      <circle cx="0" cy="7" r="1.2" fill="#13a89e" />
      <circle cx="5" cy="5" r="1.2" fill="#009fda" />
      <circle cx="7" cy="0" r="1.2" fill="#78248c" />
      <circle cx="5" cy="-5" r="1.2" fill="#e01b84" />
      <circle cx="0" cy="-7" r="1.2" fill="#f48120" />
      <circle cx="-5" cy="-5" r="1.2" fill="#fdd000" />
      <circle cx="-3.5" cy="0" r="0.9" fill="#13a89e" />
      <circle cx="0" cy="3.5" r="0.9" fill="#009fda" />
      <circle cx="3.5" cy="0" r="0.9" fill="#78248c" />
      <circle cx="0" cy="-3.5" r="0.9" fill="#f48120" />
    </g>
  </svg>
);

const HclTechIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="18" fill="#0056b3" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.03em">HCL<tspan fill="#007bff">Tech</tspan></text>
  </svg>
);

const CognizantIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 2)">
      <polygon points="10 1, 18 6, 18 16, 10 21, 2 16, 2 6" fill="#0033a0" opacity="0.85" />
      <polygon points="10 3.5, 15.5 7, 15.5 15, 10 18.5, 4.5 15, 4.5 7" fill="#00b5e2" />
    </g>
  </svg>
);

const ZohoIcon: React.FC = () => (
  <div className="flex items-center gap-0.5 shrink-0 font-sans font-black text-white text-[11px] select-none">
    <div className="w-[20px] h-[20px] bg-[#e11d48] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[-4deg]">Z</div>
    <div className="w-[20px] h-[20px] bg-[#16a34a] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[2deg] -translate-y-[1px]">O</div>
    <div className="w-[20px] h-[20px] bg-[#2563eb] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[-3deg]">H</div>
    <div className="w-[20px] h-[20px] bg-[#ca8a04] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[4deg]">O</div>
  </div>
);

const HexawareIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 2)">
      <rect x="8" y="2" width="3.5" height="15" rx="1.5" fill="#004b87" />
      <rect x="3" y="7" width="13.5" height="3.5" rx="1.5" fill="#e31b23" />
      <circle cx="17.5" cy="14" r="2.2" fill="#ffc20e" />
    </g>
  </svg>
);

const CapgeminiIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(1, 2)">
      <path d="M10 1C5 1 1 5 1 9.5c0 4 3 6.5 6.5 8 .4.2.7-.2.5-.5-1.2-1.5-2.5-3.5-2.5-5.5 0-3 2.2-5.5 4.5-5.5s4.5 2.5 4.5 5.5c0 2-1.3 4-2.5 5.5-.2.3.1.7.5.5 3.5-1.5 6.5-4 6.5-8C21 5 17 1 10 1z" fill="#0070ad" />
      <path d="M10 5.5c-1.8 0-3 1.5-3 3.5 0 1.5.8 2.5 1.5 3.5.1.2.4.1.3-.1-.5-.8-.8-1.5-.8-2.4 0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 .9-.3 1.6-.8 2.4-.1.2.2.3.3.1.7-1 1.5-2 1.5-3.5 0-2-1.2-3.5-3-3.5z" fill="#0070ad" opacity="0.85" />
      <circle cx="10" cy="11.5" r="1.5" fill="#0070ad" opacity="0.9" />
    </g>
  </svg>
);

const AccentureIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l5 4.5-5 4.5" stroke="#a100ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const LtiMindtreeIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 1)">
      <circle cx="10" cy="10" r="9" stroke="#003566" strokeWidth="1.8" fill="none" />
      <path d="M4 10h12M10 4l-3.5 3.5 3.5 3.5" stroke="#003566" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   Exact array of requested companies
───────────────────────────────────────────── */
const partners = [
  { name: "TCS",           icon: <TCSIcon /> },
  { name: "Infosys",       icon: <InfosysIcon /> },
  { name: "Wipro",         icon: <WiproIcon /> },
  { name: "HCLTech",       icon: <HclTechIcon /> },
  { name: "Cognizant",     icon: <CognizantIcon /> },
  { name: "Zoho",          icon: <ZohoIcon /> },
  { name: "Hexaware",      icon: <HexawareIcon /> },
  { name: "Capgemini",     icon: <CapgeminiIcon /> },
  { name: "Accenture",     icon: <AccentureIcon /> },
  { name: "LTIMindtree",   icon: <LtiMindtreeIcon /> }
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
                className="h-14 min-w-[140px] inline-flex items-center justify-center bg-white px-6 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {partner.icon}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
