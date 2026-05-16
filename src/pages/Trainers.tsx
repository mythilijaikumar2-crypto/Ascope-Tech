import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.1-3 2.4c1.1.8 2 1.8 2 3-.3 1.5-1.7 2.6-3.3 2.1-.2.4-.4.8-.6 1.1C15.4 14.4 13.5 15 11.5 15c-1.1 0-2.1-.2-3-.6.5.1 1.1.2 1.6.2 1.3 0 2.5-.4 3.5-1.1-1.2 0-2.3-.8-2.7-1.9.2 0 .3.1.5.1.3 0 .5 0 .8-.1-1.3-.3-2.2-1.4-2.2-2.7 0-.1 0-.1 0-.2.4.2.8.3 1.3.3-1.1-.7-1.5-2-1-3.1 1.3 1.6 3.1 2.7 5.2 2.8-.1-.4-.1-.8-.1-1.2 0-2 1.6-3.7 3.7-3.7 1.1 0 2.1.5 2.7 1.2.9-.2 1.7-.5 2.5-.9-.3.9-1 1.6-1.7 2.1.8-.1 1.6-.3 2.3-.6-.5.8-1.1 1.5-1.8 2.1z"/></svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const BriefcaseIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

const trainers = [
  {
    name: "Dr. Emily Watson",
    role: "Lead AI Researcher",
    exp: "12+ Years",
    skills: ["Python", "TensorFlow", "PyTorch"],
    image: "https://i.pravatar.cc/150?u=emily",
    bio: "Former Google Research Lead with a passion for teaching complex AI concepts in simple ways."
  },
  {
    name: "James Rodriguez",
    role: "Senior Full Stack Architect",
    exp: "10+ Years",
    skills: ["React", "Node.js", "AWS"],
    image: "https://i.pravatar.cc/150?u=james",
    bio: "Built scalable systems for Silicon Valley startups. Expert in modern web architecture."
  },
  {
    name: "Sophia Martinez",
    role: "Creative Design Director",
    exp: "8+ Years",
    skills: ["Figma", "UI/UX", "Branding"],
    image: "https://i.pravatar.cc/150?u=sophia",
    bio: "Award-winning designer focused on human-centric digital experiences and branding."
  },
  {
    name: "Kevin Peterson",
    role: "Cybersecurity Analyst",
    exp: "15+ Years",
    skills: ["Ethical Hacking", "CISSP", "Network Security"],
    image: "https://i.pravatar.cc/150?u=kevin",
    bio: "Dedicated to protecting global infrastructures from evolving cyber threats."
  }
];

const Trainers: React.FC = () => {
  return (
    <div className="pt-40 pb-24 bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-heading font-bold text-primary mb-6"
          >
            Our World-Class <span className="text-secondary">Experts</span>
          </motion.h1>
          <p className="text-dark/60 max-w-2xl mx-auto text-lg font-medium">Learn from the best in the industry. Our trainers bring years of real-world experience from top tech giants.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {trainers.map((trainer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white rounded-[32px] p-10 shadow-soft border border-primary/5 text-center group hover:shadow-layered transition-all duration-500"
            >
              <div className="relative w-36 h-36 mx-auto mb-8">
                <div className="absolute inset-0 hero-gradient rounded-full opacity-20 scale-110 group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10 w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">{trainer.name}</h3>
              <p className="text-secondary text-sm font-black uppercase tracking-widest mb-6">{trainer.role}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {trainer.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-background text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/5">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-center gap-2 text-dark/40 text-xs font-bold uppercase tracking-widest">
                   <BriefcaseIcon size={14} /> <span>{trainer.exp} Exp</span>
                </div>
                <p className="text-dark/60 text-sm leading-relaxed line-clamp-3 font-medium">
                  {trainer.bio}
                </p>
              </div>

              <div className="flex justify-center gap-4 border-t border-gray-50 pt-8">
                <a href="#" className="w-11 h-11 rounded-xl bg-background flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all shadow-sm">
                  <LinkedinIcon size={20} />
                </a>
                <a href="#" className="w-11 h-11 rounded-xl bg-background flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all shadow-sm">
                  <TwitterIcon size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
