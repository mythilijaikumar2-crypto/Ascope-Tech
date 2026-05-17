import React from 'react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  return (
    <section className="relative pt-20 pb-10 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy rounded-[32px] p-10 lg:p-16 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background for the newsletter card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -ml-24 -mb-24" />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 text-white">Subscribe to our newsletter</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Join 10,000+ students and get the latest updates, course announcements and career tips directly in your inbox.
            </p>
          </div>
          
          <div className="flex w-full lg:w-[450px] gap-3 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/10 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-accent transition-all text-white text-sm"
            />
            <button className="premium-button px-10 py-4 rounded-xl font-black transition-all shadow-xl text-sm whitespace-nowrap">
              Join Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
