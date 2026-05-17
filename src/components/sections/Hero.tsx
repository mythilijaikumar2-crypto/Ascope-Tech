import React from "react";
import { motion } from "framer-motion";

// Custom SVG Icons
const PlayIcon = ({ size = 18, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const StarIcon = ({ size = 14, fill = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const UsersIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldCheckIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const TrendingUpIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 border border-primary/10 rounded-full" />
        <div className="absolute top-40 right-20 w-[600px] h-[600px] border border-primary/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #075a97 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-navy space-y-8 lg:text-left text-center"
          >
            <div className="flex items-center gap-3 lg:justify-start justify-center">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-muted">
                Premier EdTech Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-tight tracking-tighter text-navy">
              Build Skills.
              <br />
              Build{" "}
              <span className="text-gradient drop-shadow-sm">Future</span>
              <br />
              with Ascope Tech.
            </h1>

            <p className="text-lg md:text-xl text-text max-w-xl lg:mx-0 mx-auto leading-relaxed font-body">
              Industry-ready courses, expert mentors, real-world projects and
              guaranteed placement support to launch your career in tech.
            </p>

            <div className="flex flex-wrap gap-5 pt-4 lg:justify-start justify-center">
              <button className="premium-button px-10 py-4 rounded-[14px] font-bold text-lg flex items-center gap-3 shadow-xl shadow-primary/20 group">
                Explore Courses{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <button className="flex items-center gap-3 px-10 py-4 rounded-[14px] font-bold text-lg border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayIcon size={18} fill="#075a97" />
                </div>
                Watch Demo
              </button>
            </div>


          </motion.div>

          {/* Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative lg:flex hidden items-center justify-center w-full"
          >
            <div className="relative z-10 w-full max-w-xl mx-auto flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 pointer-events-none opacity-40" />
              <img
                src="/src/assets/hero_student_v2.png"
                alt="Student"
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
