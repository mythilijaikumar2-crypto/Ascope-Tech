import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const PlayIcon = ({ size = 18, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const StarIcon = ({ size = 14, fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const UsersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BriefcaseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const GraduationCapIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const ShieldCheckIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
);
const TrendingUpIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const LaptopIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
);

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#07598A]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute top-40 right-20 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Premier EdTech Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold leading-[1.1]">
              Build Skills.<br />
              Build <span className="text-secondary">Future</span><br />
              with Ascope Tech.
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              Industry-ready courses, expert mentors, real-world projects and guaranteed placement support to launch your career in tech.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <button className="bg-secondary hover:bg-accent text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-secondary/20 group">
                Explore Courses <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <PlayIcon size={16} fill="white" />
                </div>
                Watch Demo
              </button>
            </div>
            
            {/* Stats Bottom */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                  <UsersIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black">10K+</p>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Students Trained</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                  <TrendingUpIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black">500+</p>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Placements</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                  <GraduationCapIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black">50+</p>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Expert Trainers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                  <ShieldCheckIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black">95%</p>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Success Rate</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Large Glowing Circle Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[20px] border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" 
                alt="Student" 
                className="w-full max-w-lg h-[600px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating Glass Cards */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -left-10 z-20 glass-card p-5 w-48 shadow-2xl border-white/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <UsersIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black text-primary">15,000+</p>
                  <p className="text-[10px] font-bold text-dark/40 uppercase">Active Learners</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-24 -right-10 z-20 glass-card p-5 w-48 shadow-2xl border-white/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <TrendingUpIcon size={20} />
                </div>
                <div>
                  <p className="text-lg font-black text-primary">₹12 LPA</p>
                  <p className="text-[10px] font-bold text-dark/40 uppercase">Highest Package</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-32 -left-20 z-20 glass-card p-6 w-56 shadow-2xl border-white/30"
            >
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                    <StarIcon size={24} fill="white" />
                 </div>
                 <div>
                    <p className="text-lg font-black text-primary">4.9/5</p>
                    <p className="text-[10px] font-bold text-dark/40 uppercase">from 2000+ Reviews</p>
                 </div>
              </div>
              <div className="flex gap-1 text-yellow-400">
                {[1,2,3,4,5].map(i => <StarIcon key={i} size={14} />)}
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 -right-16 z-20 glass-card p-6 w-52 shadow-2xl border-white/30"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white">
                    <ShieldCheckIcon size={24} />
                 </div>
                 <div>
                    <p className="text-lg font-black text-primary">100%</p>
                    <p className="text-[10px] font-bold text-dark/40 uppercase">Placement Support</p>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
