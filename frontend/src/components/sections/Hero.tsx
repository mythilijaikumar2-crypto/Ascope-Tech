import React from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Star, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  TrendingUp,
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
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 border border-primary/10 rounded-full" />
        <div className="absolute top-40 right-20 w-[600px] h-[600px] border border-primary/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ff8531 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-navy space-y-8 lg:text-left text-center"
          >
            <motion.div variants={textReveal} className="flex items-center gap-3 lg:justify-start justify-center">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-muted">
                Premier EdTech Platform
              </span>
            </motion.div>

            <motion.h1 
              variants={textReveal}
              className="text-5xl md:text-6xl lg:text-8xl font-heading font-black leading-tight tracking-tighter text-navy"
            >
              Build Skills.
              <br />
              Build{" "}
              <span className="text-gradient drop-shadow-sm">Future</span>
              <br />
              with Ascope Tech.
            </motion.h1>

            <motion.p 
              variants={textReveal}
              className="text-lg md:text-xl text-text max-w-xl lg:mx-0 mx-auto leading-relaxed font-body"
            >
              Industry-ready courses, expert mentors, real-world projects and
              guaranteed placement support to launch your career in tech.
            </motion.p>

            <motion.div variants={textReveal} className="flex flex-wrap gap-5 pt-4 lg:justify-start justify-center">
              <button className="premium-button px-10 py-4 rounded-[14px] font-bold text-lg flex items-center gap-3 shadow-xl shadow-primary/20 group">
                Explore Courses{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </span>
              </button>
              <button className="flex items-center gap-3 px-10 py-4 rounded-[14px] font-bold text-lg border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={18} fill="#075a97" className="ml-1" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Stats Bottom */}
            <motion.div variants={textReveal} className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-border">
              {[
                {
                  value: "10K+",
                  label: "Students",
                  icon: <Users size={20} />,
                },
                {
                  value: "500+",
                  label: "Placed",
                  icon: <TrendingUp size={20} />,
                },
                {
                  value: "50+",
                  label: "Trainers",
                  icon: <GraduationCap size={20} />,
                },
                {
                  value: "95%",
                  label: "Success",
                  icon: <ShieldCheck size={20} />,
                },
              ].map((stat, i) => (
                <div key={i} className="space-y-2 lg:text-left text-center">
                  <div className="text-accent flex lg:justify-start justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-black text-navy">{stat.value}</p>
                  <p className="text-[10px] text-muted uppercase font-bold tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:block hidden"
          >
            <div className="relative z-10 flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 pointer-events-none opacity-40" />
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/src/assets/hero_student_male.png"
                alt="Student"
                className="w-full max-w-xl h-auto object-contain drop-shadow-2xl relative z-10"
              />
            </div>

            {/* Floating Glass Cards */}
            {[
              { icon: <Users size={20} />, val: "15,000+", lab: "Learners", pos: "top-[10%] -left-5", bg: "bg-accent", delay: 0 },
              { icon: <TrendingUp size={20} />, val: "₹12 LPA", lab: "Highest", pos: "top-[15%] -right-5", bg: "bg-primary", delay: 1 },
              { icon: <Star size={20} fill="white" />, val: "4.9/5", lab: "2000+ Reviews", pos: "bottom-[20%] -left-10", bg: "bg-yellow-400", delay: 0.5 },
              { icon: <ShieldCheck size={20} />, val: "100%", lab: "Placements", pos: "bottom-[25%] -right-10", bg: "bg-accent", delay: 0.8 }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + card.delay, duration: 0.8 }}
                className={`absolute ${card.pos} z-30 glass-card p-5 rounded-2xl w-48 shadow-premium`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center text-white`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-lg font-black text-navy">{card.val}</p>
                    <p className="text-[10px] font-bold text-muted uppercase">{card.lab}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
