import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    name: "Google",
    color: "#4285F4",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    )
  },
  {
    name: "Microsoft",
    color: "#737373",
    logo: (
      <svg viewBox="0 0 23 23" className="w-full h-full p-2">
        <path fill="#f35325" d="M1 1h10v10H1z" />
        <path fill="#81bc06" d="M12 1h10v10H12z" />
        <path fill="#05a6f0" d="M1 12h10v10H1z" />
        <path fill="#ffba08" d="M12 12h10v10H12z" />
      </svg>
    )
  },
  {
    name: "Amazon",
    color: "#000000",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2">
        <path fill="currentColor" d="M15.93 17.09c-2.68 1.89-6.28 2.35-9.58 1.21-1.07-.37-2.11-.94-2.84-1.85-.35-.43-.53-.9-.37-1.33.16-.42.59-.72 1.03-.81.44-.09.91.03 1.34.21.94.39 1.95.66 2.97.77 1.93.2 3.88-.13 5.67-.93 1.16-.52 2.22-1.22 3.1-2.11.23-.23.57-.11.75.09.18.2.14.54-.09.75-1.04 1-2.22 1.74-3.5 2.21l1.52.8z" />
        <path fill="#FF9900" d="M18.8 19.34c-1.86 1.41-4.43 2.19-6.8 2.19-3.3 0-6.3-1.5-8.4-3.9-.2-.3-.1-.7.2-.9l.7-.5c.3-.2.6-.2.9.1 1.7 2 4.1 3.2 6.8 3.2 2 0 4.1-.7 5.7-1.9.3-.2.7-.2.9.1l.6.6c.3.3.3.8-.1 1.1z" />
      </svg>
    )
  },
  {
    name: "Meta",
    color: "#0668E1",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2" fill="#0668E1">
        <path d="M16.48 5.4c-1.34 0-2.6.45-3.6 1.25-.33.26-.64.56-.92.89-.28-.33-.59-.63-.92-.89-1-.8-2.26-1.25-3.6-1.25-3.15 0-5.71 2.56-5.71 5.71s2.56 5.71 5.71 5.71c1.34 0 2.6-.45 3.6-1.25.33-.26.64-.56.92-.89.28.33.59.63.92.89 1 .8 2.26 1.25 3.6 1.25 3.15 0 5.71-2.56 5.71-5.71s-2.56-5.71-5.71-5.71zm-10.4 8.57c-1.58 0-2.86-1.28-2.86-2.86s1.28-2.86 2.86-2.86c.67 0 1.29.23 1.78.61.32.25.6.54.83.87-.23.33-.51.62-.83.87-.49.38-1.11.61-1.78.61zm10.4 0c-.67 0-1.29-.23-1.78-.61-.32-.25-.6-.54-.83-.87.23-.33.51-.62.83-.87.49-.38 1.11-.61 1.78-.61 1.58 0 2.86 1.28 2.86 2.86s-1.28 2.86-2.86 2.86z" />
      </svg>
    )
  },
  {
    name: "Netflix",
    color: "#E50914",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-1" fill="#E50914">
        <path d="M6.51 24l.03-11.72L17.49 24l.03-24h-4.04l-.03 11.72L2.5 0v24h4.01z" />
      </svg>
    )
  },
  {
    name: "Apple",
    color: "#000000",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05 1.88-3.12 1.88-1.04 0-1.41-.63-2.64-.63-1.25 0-1.65.62-2.63.63-1.02.01-2.1-.96-3.11-1.92-2.01-1.94-3.53-5.46-3.53-8.68 0-3.32 1.63-5.08 3.2-5.08 1.5 0 2.45.83 3.33.83.86 0 2.02-.85 3.48-.85 1.25 0 2.89.62 3.86 1.86-2.61 1.48-2.18 5.11.49 6.22-.65 1.83-1.6 3.65-2.73 4.74zm-2.16-16.15c1.47-1.83 1.34-3.64 1.34-3.64s-1.83.08-3.23 1.76c-1.34 1.62-1.22 3.44-1.22 3.44s1.78.21 3.11-1.56z" />
      </svg>
    )
  },
  {
    name: "Uber",
    color: "#000000",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.143 17.143H6.857V6.857h10.286v10.286z" />
      </svg>
    )
  },
  {
    name: "Airbnb",
    color: "#FF5A5F",
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full p-2" fill="#FF5A5F">
        <path d="M11.96 23.96c-.34 0-.66-.14-.9-.38L1.6 13.9c-2.1-2.1-2.1-5.5 0-7.6 1.01-1.01 2.36-1.57 3.8-1.57 1.44 0 2.79.56 3.8 1.57l2.76 2.76 2.76-2.76c1.01-1.01 2.36-1.57 3.8-1.57 1.44 0 2.79.56 3.8 1.57 2.1 2.1 2.1 5.5 0 7.6L12.86 23.58c-.24.24-.56.38-.9.38zm-6.56-18.17c-1.16 0-2.25.45-3.07 1.27-1.7 1.7-1.7 4.45 0 6.15l9.46 9.46 9.46-9.46c1.7-1.7 1.7-4.45 0-6.15-.82-.82-1.91-1.27-3.07-1.27-1.16 0-2.25.45-3.07 1.27l-3.32 3.32c-.14.14-.34.22-.54.22s-.4-.08-.54-.22l-3.32-3.32c-.82-.82-1.91-1.27-3.07-1.27z" />
      </svg>
    )
  }
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-white/50 overflow-hidden border-y border-border/10 relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-center text-muted font-black uppercase tracking-[0.4em] text-[10px] opacity-70">
          Our Graduates are hired by global leaders
        </p>
      </div>

      <div className="relative flex">
        <div className="marquee-container gap-20 items-center whitespace-nowrap">
          {[...partners, ...partners].map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center gap-6 group cursor-default"
            >
              <div
                className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-border/10 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/20"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {partner.logo}
                </div>
              </div>
              <span
                className="text-2xl font-heading font-black tracking-tighter transition-all duration-500"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
