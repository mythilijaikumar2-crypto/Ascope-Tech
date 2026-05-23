import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Users,
  Compass,
  Briefcase,
  Globe,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const stats = [
    { value: "10,000+", label: "Trained Students", Icon: Users },
    { value: "95%", label: "Placement Rate", Icon: Briefcase },
    { value: "50+", label: "Partner Companies", Icon: Globe },
    { value: "12+", label: "Industry Courses", Icon: BookOpen },
  ];

  const coreValues = [
    {
      title: "Industry Excellence",
      description:
        "We bridge the gap between academic knowledge and industrial demands with training curricula crafted by active tech architects.",
      Icon: Award,
    },
    {
      title: "Real-world Practicality",
      description:
        "Every session involves hands-on programming on live environments and production-grade PostgreSQL databases.",
      Icon: Compass,
    },
    {
      title: "Lifetime Mentorship",
      description:
        "Students retain access to support tickets and dedicated mentorship sessions even after securing premium employment.",
      Icon: Clock,
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans overflow-x-hidden relative">
      {/* Sleek Decorative Top Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Heading */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-black uppercase tracking-[0.25em] text-primary"
          >
            WHO WE ARE
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-heading font-black text-navy tracking-tighter"
          >
            Ascope <span className="text-gradient">Tech</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Empowering tech aspirants with high-end full-stack development skills, advanced engineering architectures, and career placement services.
          </motion.p>
        </div>

        {/* Section: Main Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-tight leading-tight">
              Bridging the gap between ambitious dreams and technical mastery.
            </h2>
            <p className="text-navy/70 leading-relaxed font-body">
              Established with the goal of creating direct, industry-ready professionals, Ascope Tech has grown to be a premier training facility in Trichy. Our custom-designed labs allow students to work on true server instances, database optimization, and high-quality frontend frameworks.
            </p>
            <p className="text-navy/70 leading-relaxed font-body">
              Whether you are a starter learning HTML/CSS, or an experienced engineer seeking knowledge on system integrations, PostgreSQL database performance, or advanced API controllers, we have tailored learning paths mapped to your career milestones.
            </p>
            <div className="pt-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>EXPLORE OUR COURSES</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-border shadow-premium bg-sky/20">
              {/* Premium geometric shapes instead of raw images */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy to-primary/80 flex items-center justify-center p-12 text-center text-white">
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mx-auto border border-white/20">
                    <Award size={40} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider">
                    Trichy's Leading Academy
                  </h3>
                  <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
                    Voted #1 technical boot camp for structural engineering, web architecture, and placement conversions.
                  </p>
                </div>
              </div>
            </div>
            {/* Overlay interactive Card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-border shadow-xl max-w-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-black text-navy text-xs uppercase tracking-wider">
                  ISO 9001:2015
                </h4>
                <p className="text-navy/60 text-[10px] font-bold">
                  Certified training standard excellence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section: Stats Dashboard Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-8 border border-border/60 shadow-soft hover:shadow-premium transition-all duration-300 text-center space-y-3 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <stat.Icon size={24} />
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-navy tracking-tight">
                {stat.value}
              </h3>
              <p className="text-navy/50 text-xs uppercase font-black tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section: Core Values */}
        <div className="bg-sky/20 rounded-[50px] p-12 lg:p-20 border border-border/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              OUR VALUES
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-navy tracking-tight">
              Why Students Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-[32px] p-8 border border-border/30 shadow-sm hover:shadow-premium transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <value.Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black text-navy">{value.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed font-body">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
