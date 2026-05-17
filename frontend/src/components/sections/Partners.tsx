import React from 'react';
import { motion } from 'framer-motion';

// Beautiful color-accurate inline SVG icons for partners
const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="11" height="11" fill="#f25022" />
    <rect x="12" y="0" width="11" height="11" fill="#7fba00" />
    <rect x="0" y="12" width="11" height="11" fill="#00a4ef" />
    <rect x="12" y="12" width="11" height="11" fill="#ffb900" />
  </svg>
);

const AmazonIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.3 15.3c-2 1.3-4.7 2.1-7.3 2.1-3.6 0-6.8-1.5-8-3.9-.1-.2 0-.4.2-.4.4-.3.9-.6 1.3-.9.1-.1.3-.1.4.1 1 1.7 3.3 2.8 6.1 2.8 2.2 0 4.7-.7 6.4-1.9.2-.1.4 0 .4.2.1.3-.1.7-.5 1z" fill="#ff9900" />
    <path d="M23.6 17.3c-.2.2-2.1.2-2.9.2-.6 0-1-.1-1.3-.3-.2-.1-.2-.3 0-.5.6-.4 1.6-.4 2.2-.4.4-.1.7-.2.8-.3 0 0-.1-.4-.2-.8-.2-.7-.7-2.3-.7-3.1 0-.3.2-.4.4-.3.5.3 1.2 1.1 1.5 1.8.4.8.4 2.9.2 3.4z" fill="#ff9900" />
  </svg>
);

const MetaIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.924 6c-1.517 0-2.923.633-3.924 1.737C12.001 6.633 10.593 6 9.076 6 5.726 6 3 8.687 3 12c0 3.313 2.726 6 6.076 6 1.517 0 2.925-.633 3.924-1.737 1.001 1.104 2.407 1.737 3.924 1.737C20.274 18 23 15.313 23 12c0-3.313-2.726-6-6.076-6zm0 10.4c-1.157 0-2.222-.507-2.921-1.39a3.843 3.843 0 0 1-.221-.314l-.004-.007a12.87 12.87 0 0 1-.29-.481c-.244-.436-.453-.889-.623-1.353-.171.464-.38.917-.624 1.353-.089.16-.185.32-.29.481l-.004.007c-.067.102-.14.208-.221.314-.699.883-1.764 1.39-2.921 1.39-2.247 0-4.076-1.794-4.076-4s1.829-4 4.076-4c1.157 0 2.222.507 2.921 1.39.081.106.154.212.221.314l.004.007c.105.161.201.321.29.481.244.436.453.889.624 1.353.17-.464.379-.917.623-1.353.089-.16.185-.32.29-.481l.004-.007c.067-.102.14-.208.221-.314.699-.883 1.764-1.39 2.921-1.39 2.247 0 4.076 1.794 4.076 4s-1.829 4-4.076 4z" fill="url(#meta-grad)" />
    <defs>
      <linearGradient id="meta-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0064e0" />
        <stop offset="50%" stopColor="#0080fb" />
        <stop offset="100%" stopColor="#b600ee" />
      </linearGradient>
    </defs>
  </svg>
);

const NetflixIcon: React.FC = () => (
  <svg className="w-4 h-5 shrink-0" viewBox="0 0 24 24" fill="#e50914" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2v20h4V9.5l8 12.5h4V2h-4v12.5L8 2H4z"/>
  </svg>
);

const AppleIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="url(#apple-grad)" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.73-1.2 1.87-1.05 2.98 1.12.09 2.25-.57 3-.143z"/>
    <defs>
      <linearGradient id="apple-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8e8e93" />
        <stop offset="100%" stopColor="#1c1c1e" />
      </linearGradient>
    </defs>
  </svg>
);

const UberIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 11h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5z"/>
  </svg>
);

const AirbnbIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#FF5A5F" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1c-1.892 0-3.69.75-5.064 2.112A7.126 7.126 0 0 0 4.8 8.167c0 2.906 1.706 5.86 5.071 8.8 1.113.971 2.233 1.83 2.233 1.83.05.039.109.058.169.058.06 0 .119-.019.169-.058 0 0 1.12-.859 2.233-1.83 3.365-2.94 5.071-5.894 5.071-8.8 0-1.891-.749-3.676-2.112-5.044A7.123 7.123 0 0 0 12 1zm0 14.156c-1.636 0-2.966-1.32-2.966-2.944 0-1.625 1.33-2.945 2.966-2.945 1.636 0 2.966 1.32 2.966 2.945 0 1.624-1.33 2.944-2.966 2.944z"/>
  </svg>
);

const partners = [
  { name: "Google", icon: <GoogleIcon /> },
  { name: "Microsoft", icon: <MicrosoftIcon /> },
  { name: "Amazon", icon: <AmazonIcon /> },
  { name: "Meta", icon: <MetaIcon /> },
  { name: "Netflix", icon: <NetflixIcon /> },
  { name: "Apple", icon: <AppleIcon /> },
  { name: "Uber", icon: <UberIcon /> },
  { name: "Airbnb", icon: <AirbnbIcon /> }
];

const Partners: React.FC = () => {
  // Double the list for seamless loop simulation
  const doublePartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-cream overflow-hidden border-y border-border/50 select-none">
      <div className="w-full">
        <p className="text-center text-muted font-black uppercase tracking-[0.3em] text-xs mb-12">
          Our Graduates Work At
        </p>
        
        {/* Infinite Loop tape container */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Subtle side shadow masks to fade logos in and out */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />
 
          {/* Continuous left-to-right scrolling tape */}
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }} // Left-to-right translation
            transition={{
              ease: "linear",
              duration: 30, // Smooth constant movement
              repeat: Infinity,
            }}
            style={{ 
              width: "fit-content",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          >
            {doublePartners.map((partner, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {partner.icon}
                </div>
                <span className="text-sm font-black text-navy uppercase tracking-wider">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
