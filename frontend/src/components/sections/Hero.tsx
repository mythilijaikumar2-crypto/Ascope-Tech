import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Cpu,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Zap,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const orbitNodes = [
  {
    id: 1,
    icon: Code2,
    label: "React",
    color: "#61dafb",
    bg: "#0d1117",
    angle: 0,
    radius: 130,
  },
  {
    id: 2,
    icon: Database,
    label: "Python",
    color: "#3b82f6",
    bg: "#eff6ff",
    angle: 72,
    radius: 130,
  },
  {
    id: 3,
    icon: Globe,
    label: "DevOps",
    color: "#10b981",
    bg: "#f0fdf4",
    angle: 144,
    radius: 130,
  },
  {
    id: 4,
    icon: Cpu,
    label: "AI / ML",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    angle: 216,
    radius: 130,
  },
  {
    id: 5,
    icon: Globe,
    label: "UI / UX",
    color: "#f59e0b",
    bg: "#fffbeb",
    angle: 288,
    radius: 130,
  },
];

const floatingCards = [
  {
    id: "mentors",
    icon: Users,
    title: "20+ Expert Mentors",
    sub: "Industry veterans",
    color: "#075a97",
    bg: "#eff6ff",
    top: "4%",
    left: "2%",
    delay: 0,
  },
  {
    id: "placed",
    icon: Trophy,
    title: "50+ Placed",
    sub: "In top companies",
    color: "#10b981",
    bg: "#f0fdf4",
    top: "4%",
    right: "0%",
    delay: 0.3,
  },
  {
    id: "rating",
    icon: Star,
    title: "4.9 Rating",
    sub: "By 1,000+ students",
    color: "#f59e0b",
    bg: "#fffbeb",
    bottom: "-8%",
    left: "2%",
    delay: 0.5,
  },
  {
    id: "live",
    icon: Zap,
    title: "Live Classes",
    sub: "Every Weekday & Weekend",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    bottom: "-8%",
    right: "0%",
    delay: 0.8,
  },
];

const skills = [
  "React",
  "Node.js",
  "Python",
  "DevOps",
  "AI/ML",
  "DSA",
  "UI/UX",
  "Java",
  "C Programming",
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function toXY(angleDeg: number, radius: number, cx = 0, cy = 0) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Animated SVG connecting lines between centre and orbit nodes */
const OrbitalLines: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 400"
    fill="none"
  >
    {/* Outer dashed ring */}
    <motion.circle
      cx="200"
      cy="200"
      r="130"
      stroke="rgba(7,90,151,0.12)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      animate={{ rotate: 360 }}
      style={{ originX: "200px", originY: "200px" }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
    {/* Inner ring */}
    <circle
      cx="200"
      cy="200"
      r="72"
      stroke="rgba(23,181,231,0.10)"
      strokeWidth="1"
      strokeDasharray="4 8"
    />

    {/* Spoke lines centre → each node */}
    {orbitNodes.map((n) => {
      const { x, y } = toXY(n.angle, 130, 200, 200);
      return (
        <motion.line
          key={n.id}
          x1="200"
          y1="200"
          x2={x}
          y2={y}
          stroke={n.color}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{
            duration: 1,
            delay: 0.4 + n.id * 0.15,
            ease: "easeOut",
          }}
        />
      );
    })}

    {/* Animated pulse on the ring */}
    {orbitNodes.map((n) => {
      const { x, y } = toXY(n.angle, 130, 200, 200);
      return (
        <motion.circle
          key={`dot-${n.id}`}
          cx={x}
          cy={y}
          r="3"
          fill={n.color}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: n.id * 0.3 }}
        />
      );
    })}
  </svg>
);

/** Central hub */
const CentralHub: React.FC = () => (
  <motion.div
    className="absolute top-[48%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-20"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
  >
    {/* Pulse rings */}
    {[1, 2, 3].map((r) => (
      <motion.div
        key={r}
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{ scale: [1, 1.5 + r * 0.3], opacity: [0.5, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: r * 0.7,
          ease: "easeOut",
        }}
        style={{ margin: `-${r * 8}px` }}
      />
    ))}

    <div
      className="relative w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #075a97 0%, #17b5e7 100%)",
        boxShadow:
          "0 0 40px rgba(7,90,151,0.45), 0 0 80px rgba(23,181,231,0.2)",
      }}
    >
      <BookOpen className="text-white mb-1" size={24} />
      <span className="text-white text-[9px] font-black uppercase tracking-widest leading-none">
        Ascope
      </span>
      <span className="text-white/70 text-[7px] font-bold tracking-wider">
        Tech
      </span>
    </div>
  </motion.div>
);

/** Orbit nodes */
const OrbitNode: React.FC<{ node: (typeof orbitNodes)[0]; index: number }> = ({
  node,
  index,
}) => {
  const Icon = node.icon;
  return (
    <motion.div
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 ${index % 2 === 0 ? 'hero-float-up' : 'hero-float-down'}`}
      style={{
        left: `calc(50% + ${toXY(node.angle, 130).x}px)`,
        top: `calc(50% + ${toXY(node.angle, 130).y}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
    >
      <div className="flex flex-col items-center gap-1.5 cursor-default group">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background: node.bg,
            border: `2px solid ${node.color}35`,
            boxShadow: `0 8px 24px ${node.color}30`,
          }}
        >
          <Icon size={24} color={node.color} />
        </motion.div>
        <span
          className="text-[10px] font-black tracking-wide whitespace-nowrap"
          style={{ color: "#1e293b" }}
        >
          {node.label}
        </span>
      </div>
    </motion.div>
  );
};

/** Floating stat card */
const FloatingCard: React.FC<{ card: (typeof floatingCards)[0] }> = ({
  card,
}) => {
  const Icon = card.icon;
  return (
    <motion.div
      className={`absolute z-30 flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default select-none ${card.delay % 2 === 0 ? 'hero-float-up' : 'hero-float-down'}`}
      style={{
        top: card.top,
        left: card.left,
        right: card.right,
        bottom: card.bottom,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1.5px solid rgba(255,255,255,0.8)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        minWidth: "160px",
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 + card.delay * 0.1 }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: card.bg }}
      >
        <Icon size={18} color={card.color} />
      </div>
      <div>
        <p className="text-xs font-black text-slate-800 leading-tight">
          {card.title}
        </p>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
          {card.sub}
        </p>
      </div>
    </motion.div>
  );
};

/** Scrolling skill tags */
const SkillScroller: React.FC = () => (
  <div className="absolute bottom-[-16px] left-0 right-0 z-30 overflow-hidden">
    <motion.div
      className="flex gap-2 w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      {[...skills, ...skills].map((s, i) => (
        <span
          key={i}
          className="px-3 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap"
          style={{
            background: "rgba(7,90,151,0.08)",
            color: "#075a97",
            border: "1px solid rgba(7,90,151,0.15)",
          }}
        >
          {s}
        </span>
      ))}
    </motion.div>
  </div>
);

/** Active learner avatars */
const LearnersBadge: React.FC = () => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 right-[-100px] z-30 flex flex-col items-center gap-1 bg-white/90 backdrop-blur-md border border-white/80 shadow-lg rounded-2xl px-3 py-3"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
    transition={{
      opacity: { delay: 1.2, duration: 0.5 },
      x: { delay: 1.2, duration: 0.5 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
    }}
  >
    <div className="flex -space-x-2">
      {["#075a97", "#17b5e7", "#10b981", "#f59e0b"].map((c, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-black"
          style={{ background: c, zIndex: 4 - i }}
        >
          {["A", "B", "C", "D"][i]}
        </div>
      ))}
    </div>
    <div className="flex items-center gap-1">
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-[9px] font-black text-slate-600 whitespace-nowrap">
        800+ Active
      </span>
    </div>
    <CheckCircle size={10} color="#10b981" className="mt-0.5" />
  </motion.div>
);

/* ─────────────────────────────────────────────
   Main Hero
───────────────────────────────────────────── */
const Hero: React.FC = () => {
  const textReveal = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  return (
    <section className="relative min-h-[auto] md:min-h-screen pt-6 pb-2 md:py-0 flex items-center overflow-hidden bg-white">
      {/* Hardware-Accelerated Snappy Compositor CSS Animations */}
      <style>{`
        @keyframes float-up-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes float-down-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .hero-float-up {
          animation: float-up-subtle 6s ease-in-out infinite;
        }
        .hero-float-down {
          animation: float-down-subtle 5s ease-in-out infinite;
        }
      `}</style>
      {/* ── Page Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(199,210,254,0.45) 0%, rgba(224,242,254,0.3) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(191,219,254,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #075a97 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-28 pb-4 md:pb-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* ══ LEFT CONTENT ══ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-navy space-y-7 lg:text-left text-center"
          >
            <motion.div
              variants={textReveal}
              className="flex items-center gap-3 lg:justify-start justify-center"
            >
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-muted">
                Premier EdTech Platform
              </span>
            </motion.div>

            <motion.h1
              variants={textReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-black leading-[1.08] tracking-tight text-navy"
            >
              Build Skills.
              <br />
              Build <span className="text-gradient drop-shadow-sm">Future</span>
              <br />
              with Ascope Tech.
            </motion.h1>

            <motion.p
              variants={textReveal}
              className="text-base sm:text-lg text-text/75 max-w-xl lg:mx-0 mx-auto leading-relaxed font-body font-medium"
            >
              Industry-ready courses, expert mentors, real-world projects and
              guaranteed placement support to launch your career in tech.
            </motion.p>

            <motion.div
              variants={textReveal}
              className="flex flex-wrap gap-4 pt-2 lg:justify-start justify-center"
            >
              <Link
                to="/courses"
                className="premium-button px-9 py-4 rounded-[14px] font-bold text-base flex items-center gap-3 shadow-xl shadow-primary/20 group text-white hover:text-white/90"
              >
                Explore Courses
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — Illustrated Ecosystem Animation ══ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative lg:flex hidden justify-center items-center lg:scale-[0.8] xl:scale-95 2xl:scale-100 transition-all duration-300 origin-center"
            style={{ minHeight: "520px" }}
          >
            {/* Core illustration canvas */}
            <div className="relative w-[400px] h-[400px]">
              {/* SVG orbital lines layer */}
              <OrbitalLines />

              {/* Background blob */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(199,210,254,0.55) 0%, rgba(224,242,254,0.3) 55%, transparent 80%)",
                }}
              />

              {/* Central hub */}
              <CentralHub />

              {/* Orbit nodes */}
              {orbitNodes.map((node, i) => (
                <OrbitNode key={node.id} node={node} index={i} />
              ))}

              {/* Learner count badge — right edge */}
              <LearnersBadge />

              {/* Scrolling skill pills */}
              <SkillScroller />
            </div>

            {/* ── 4 corner floating stat cards ── */}
            {floatingCards.map((card) => (
              <FloatingCard key={card.id} card={card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
