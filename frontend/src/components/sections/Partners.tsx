import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "Uber", "Airbnb"
];

const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-cream overflow-hidden border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-muted font-black uppercase tracking-[0.3em] text-xs mb-12">
          Our Graduates Work At
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-3xl font-heading font-black text-navy cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
