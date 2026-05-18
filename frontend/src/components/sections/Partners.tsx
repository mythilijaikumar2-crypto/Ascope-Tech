import React from 'react';
import { motion } from 'framer-motion';
import hclLogo from '../../assets/partners/hcl.svg';
import tcsLogo from '../../assets/partners/tcs.svg';
import infosysLogo from '../../assets/partners/infosys.svg';
import wiproLogo from '../../assets/partners/wipro.svg';
import cognizantLogo from '../../assets/partners/cognizant.svg';
import accentureLogo from '../../assets/partners/accenture.svg';
import capgeminiLogo from '../../assets/partners/capgemini.svg';
import zohoLogo from '../../assets/partners/zoho.svg';
import ltimindtreeLogo from '../../assets/partners/ltimindtree.svg';
import hexawareLogo from '../../assets/partners/hexaware.svg';
import mindtreeLogo from '../../assets/partners/mindtree.svg';

interface Partner {
  name: string;
  src: string;
}

const partners: Partner[] = [
  { name: 'TCS',          src: tcsLogo },
  { name: 'Infosys',      src: infosysLogo },
  { name: 'Wipro',        src: wiproLogo },
  { name: 'HCLTech',      src: hclLogo },
  { name: 'Cognizant',    src: cognizantLogo },
  { name: 'Accenture',    src: accentureLogo },
  { name: 'Capgemini',    src: capgeminiLogo },
  { name: 'Zoho',         src: zohoLogo },
  { name: 'LTIMindtree',  src: ltimindtreeLogo },
  { name: 'Hexaware',     src: hexawareLogo },
  { name: 'Mindtree',     src: mindtreeLogo },
];

const Partners: React.FC = () => {
  const tripled = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden border-y border-border/30 select-none">
      <div className="w-full">
        <p className="text-center text-muted font-black uppercase tracking-[0.3em] text-[10px] mb-10">
          Our Graduates Work At
        </p>

        {/* Infinite scrolling marquee */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex items-center gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ ease: 'linear', duration: 60, repeat: Infinity }}
            style={{
              width: 'fit-content',
              willChange: 'transform',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
          >
            {tripled.map((partner, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center
                           bg-white border border-gray-100/80 rounded-2xl
                           w-[200px] h-[110px] shadow-sm
                           hover:shadow-md hover:scale-105 hover:border-gray-200
                           transition-all duration-300 cursor-default group shrink-0"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="object-contain opacity-100 transition-all duration-300 h-12 w-auto max-w-[170px]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
