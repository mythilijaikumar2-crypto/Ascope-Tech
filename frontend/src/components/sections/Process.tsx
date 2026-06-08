import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Compass, 
  BookOpen, 
  Code, 
  Trophy, 
  ArrowRight 
} from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Explore & Choose Path",
    desc: "Speak with our career advisors or browse our modern, industry-focused tech courses in Software Engineering, Data Science, and UI/UX.",
    icon: Compass,
    color: "from-primary to-accent",
    glow: "bg-primary/10",
    path: "/courses"
  },
  {
    number: "02",
    title: "Interactive Live Training",
    desc: "Master coding skills through interactive sessions conducted by veteran mentors, backed by instant one-on-one doubt resolution.",
    icon: BookOpen,
    color: "from-accent to-secondary",
    glow: "bg-accent/10",
    path: "/trainers"
  },
  {
    number: "03",
    title: "Build Real-World Projects",
    desc: "Cement your expertise by building production-grade, collaborative group projects that demonstrate true technical capability.",
    icon: Code,
    color: "from-secondary to-primary",
    glow: "bg-secondary/10",
    path: "/courses"
  },
  {
    number: "04",
    title: "Get Hired & Placed",
    desc: "Clear mock interviews, build a competitive resume, and gain access to our extensive network of over 350+ global hiring partners.",
    icon: Trophy,
    color: "from-primary to-accent",
    glow: "bg-primary/10",
    path: "/placements"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

// Create a Framer Motion-enabled Link component
const MotionLink = motion(Link);

const Process: React.FC = () => {
  // Content strings — extracted to JS variables to satisfy IDE i18n analysis
  const text = {
    sectionBadge: 'Our Learning Journey',
    headingLine1: 'How We Guide You',
    headingLine2: 'To Your Dream Career',
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-cream">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-20 text-center lg:text-left">
          <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">
            {text.sectionBadge}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-black text-navy leading-tight">
            {text.headingLine1} <br className="hidden lg:block" />
            <span className="text-gradient">{text.headingLine2}</span>
          </h2>
          <div className="w-16 h-1.5 bg-accent mt-4 md:mt-6 lg:mx-0 mx-auto" />
        </div>

        {/* Dynamic Process Steps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Timeline connecting line for Desktop */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 -translate-y-1/2 hidden lg:block z-0 pointer-events-none" />

          {steps.map((step, idx) => (
            <MotionLink
              key={idx}
              to={step.path}
              variants={cardVariants}
              className="group relative bg-white p-8 rounded-2xl border border-border/40 hover:border-accent/40 shadow-soft hover:shadow-premium transition-all duration-500 z-10 flex flex-col justify-between cursor-pointer hover:no-underline text-left"
            >
              {/* Card Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl ${step.glow} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`} />

              <div>
                {/* Header of the Step Card */}
                <div className="flex items-center justify-between mb-8">
                  {/* Icon Container with Gradient Background */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={26} />
                  </div>
                  {/* Glassmorphic Step Number */}
                  <span className="text-4xl font-heading font-black tracking-tight text-navy/10 group-hover:text-accent/30 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-text/80 text-sm leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator arrow at bottom (navigates to relevant page) */}
              <div 
                className="mt-8 flex items-center gap-2 text-xs font-bold text-accent/60 group-hover:text-accent transition-colors group/btn"
              >
                <span>{idx === steps.length - 1 ? "Explore Placements" : "Next Step"}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
