import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight
} from 'lucide-react';

const Hero: React.FC = () => {
  const textReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        {/* Soft centered glowing radial accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ff8531 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10 w-full flex flex-col items-center justify-center">
        {/* Centered Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-navy space-y-10 text-center flex flex-col items-center w-full"
        >
          <motion.div variants={textReveal} className="flex items-center gap-3 justify-center">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-muted">
              Premier EdTech Platform
            </span>
            <div className="w-8 h-px bg-accent" />
          </motion.div>

          <motion.h1
            variants={textReveal}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black leading-[1.1] tracking-tight text-navy text-center max-w-4xl"
          >
            Build Skills.
            <br />
            Build <span className="text-gradient drop-shadow-sm">Future</span>
            <br />
            with Ascope Tech.
          </motion.h1>

          <motion.p
            variants={textReveal}
            className="text-lg sm:text-xl md:text-2xl text-text/80 max-w-2xl mx-auto leading-relaxed font-body font-medium tracking-wide text-center"
          >
            Industry-ready courses, expert mentors, real-world projects and
            guaranteed placement support to launch your career in tech.
          </motion.p>

          <motion.div variants={textReveal} className="flex flex-wrap gap-5 pt-4 justify-center">
            <button className="premium-button px-10 py-4 rounded-[14px] font-bold text-lg flex items-center gap-3 shadow-xl shadow-primary/20 group">
              Explore Courses{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
