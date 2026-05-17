import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  Code, 
  Calendar 
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: "Placement Guarantee",
    desc: "We connect you with 500+ hiring partners and ensure placement support until you succeed.",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    desc: "Learn from industry professionals with 5+ years of real-world experience.",
  },
  {
    icon: Code,
    title: "Live Projects",
    desc: "Work on real-time projects and build a portfolio that gets you hired.",
  },
  {
    icon: Calendar,
    title: "Flexible Batches",
    desc: "Choose from weekday, weekend, and fast-track batches that fit your schedule.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:text-left text-center">
          <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-black text-navy leading-tight">
            Everything you need to{" "}
            <br className="hidden lg:block" />
            <span className="text-gradient">launch your career</span>
          </h2>
          <div className="w-16 h-1.5 bg-accent mt-6 lg:mx-0 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 group border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-lightBlue flex items-center justify-center text-accent mb-8 group-hover:accent-gradient group-hover:text-white transition-all duration-300">
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-navy mb-4">
                {feature.title}
              </h4>
              <p className="text-text text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
