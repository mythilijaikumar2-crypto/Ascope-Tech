import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
interface IconProps {
  size?: number;
  className?: string;
}

const TrendingUpIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const BuildingIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="15" y1="22" x2="15" y2="22"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="8" y1="6" x2="8" y2="6"/><line x1="16" y1="18" x2="16" y2="18"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="16" y1="6" x2="16" y2="6"/></svg>
);
const UserCheckIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
const DollarSignIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const AwardIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

const stats = [
  { icon: DollarSignIcon, label: "Highest Package", value: "45 LPA", sub: "Placed at Amazon" },
  { icon: TrendingUpIcon, label: "Average Hike", value: "150%", sub: "Career transition" },
  { icon: BuildingIcon, label: "Hiring Partners", value: "500+", sub: "Top tier tech MNCs" },
  { icon: UserCheckIcon, label: "Placement Rate", value: "98%", sub: "Guaranteed support" },
];

const companies = ["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Tesla", "Adobe", "Apple"];

const Placements: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-heading font-black text-navy mb-6 tracking-tighter"
          >
            Placement <span className="text-gradient">Statistics</span>
          </motion.h1>
          <p className="text-text max-w-2xl mx-auto text-lg font-medium leading-relaxed">Our alumni are working at some of the world's most prestigious technology companies. See the impact of our industry-ready curriculum.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-20 shadow-soft text-center group hover:bg-primary transition-all duration-500 border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center text-accent mx-auto mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                <stat.icon size={32} />
              </div>
              <h3 className="text-3xl font-black text-navy mb-2 group-hover:text-white transition-colors">{stat.value}</h3>
              <p className="text-text font-bold mb-1 group-hover:text-white/90 transition-colors">{stat.label}</p>
              <p className="text-xs text-muted font-bold uppercase tracking-widest group-hover:text-white/60 transition-colors">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Hiring Partners */}
        <div className="bg-white rounded-[40px] p-16 shadow-premium border border-border/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-heading font-bold text-navy mb-4 flex items-center justify-center gap-3">
                   <AwardIcon size={32} className="text-accent" /> Our Hiring Network
                 </h2>
                 <p className="text-muted font-medium">Direct placement opportunities with world-class organizations</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
                 {companies.map((company) => (
                    <div key={company} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100">
                       <span className="text-3xl font-black text-navy/80 uppercase tracking-tighter">{company}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Success Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 accent-gradient rounded-20 p-12 lg:p-20 text-white text-center shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-8">Ready to be our next success story?</h2>
             <p className="text-white/80 text-lg mb-12 font-medium">Join the thousands of students who have transformed their careers with Ascope Tech. Our placement cell works tirelessly to get you the best opportunities.</p>
             <button className="bg-white text-primary hover:bg-white/90 px-12 py-5 rounded-xl font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95">
                Apply for Next Batch
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Placements;
