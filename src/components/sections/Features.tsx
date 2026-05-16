import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const AwardIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
const UsersIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const CodeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const CalendarIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

const features = [
  {
    icon: AwardIcon,
    title: "Placement Guarantee",
    desc: "We connect you with 500+ hiring partners and ensure placement support until you succeed.",
  },
  {
    icon: UsersIcon,
    title: "Expert Trainers",
    desc: "Learn from industry professionals with 5+ years of real-world experience.",
  },
  {
    icon: CodeIcon,
    title: "Live Projects",
    desc: "Work on real-time projects and build a portfolio that gets you hired.",
  },
  {
    icon: CalendarIcon,
    title: "Flexible Batches",
    desc: "Choose from weekday, weekend, and fast-track batches that fit your schedule.",
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-16">
          <p className="text-secondary font-black text-xs uppercase tracking-[0.2em] mb-4">Why Choose Us</p>
          <h2 className="text-3xl lg:text-4xl font-heading font-black text-primary">
            Everything you need to <span className="text-secondary">launch your career</span>
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-layered transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-light_blue flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{feature.title}</h4>
              <p className="text-dark/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
