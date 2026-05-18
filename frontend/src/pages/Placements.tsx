import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Quote, 
  Building2,
  DollarSign,
  Globe,
  Zap,
  CheckCircle2
} from 'lucide-react';

// Sleek, high-quality, color-accurate inline SVG brand icons for Placements Marquee
const TcsIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#004b87" strokeWidth="2.5" />
    <path d="M8 12h8M12 8v8" stroke="#004b87" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const InfosysIcon: React.FC = () => (
  <svg className="w-6 h-4 shrink-0" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="16" rx="2" fill="#007cc3" />
    <path d="M5 4v8h2V8h2v4h2V8h2v4h2V8h2v4h2V4h-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WiproIcon: React.FC = () => (
  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
    <div className="absolute w-3.5 h-3.5 rounded-full border border-[#78248c]/30" />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#009fda] -top-0.5" />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#f48120] -bottom-0.5" />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#13a89e] -left-0.5" />
    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#fdd000] -right-0.5" />
  </div>
);

const HclIcon: React.FC = () => (
  <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6v8h2v-3h3v3h2V6H9v3H6V6H4zm9 0v6h3v2h-5V6h2zm7 0h-2v8h4v-2h-2V6z" fill="#005691" />
  </svg>
);

const CognizantIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0033a0" />
    <circle cx="12" cy="12" r="4.5" fill="#00b5e2" />
  </svg>
);

const ZohoIcon: React.FC = () => (
  <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0">
    <div className="bg-red-500 rounded-[2px]" />
    <div className="bg-blue-500 rounded-[2px]" />
    <div className="bg-yellow-500 rounded-[2px]" />
    <div className="bg-green-500 rounded-[2px]" />
  </div>
);

const AccentureIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5l7 7-7 7" stroke="#a100ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CapgeminiIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#0070ad" />
    <circle cx="12" cy="12" r="5" fill="white" />
  </svg>
);

const FreshworksIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 22h20L12 2z" fill="#ff7a00" />
  </svg>
);

const HexawareIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3l9 16H3l9-16z" fill="#002855" />
    <path d="M12 8l5 9H7l5-9z" fill="#78be20" />
  </svg>
);



const LtiIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#002d62" />
    <rect x="7" y="7" width="10" height="10" rx="1" fill="#d4af37" />
  </svg>
);

const MindtreeIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#009688" />
    <circle cx="9" cy="9" r="2.5" fill="#ff9800" />
    <circle cx="15" cy="15" r="2.5" fill="#9c27b0" />
  </svg>
);

const Placements: React.FC = () => {
  const stats = [
    { label: "Placement Rate", value: "95%", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { label: "Highest Package", value: "₹12 LPA", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Hiring Partners", value: "350+", icon: Building2, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Avg Salary", value: "₹3.5 LPA", icon: Award, color: "text-accent", bg: "bg-accent/10" },
  ];

  const partners = [
    { name: "TCS", icon: <TcsIcon /> },
    { name: "Infosys", icon: <InfosysIcon /> },
    { name: "Wipro", icon: <WiproIcon /> },
    { name: "HCL", icon: <HclIcon /> },
    { name: "Cognizant", icon: <CognizantIcon /> },
    { name: "Zoho", icon: <ZohoIcon /> },
    { name: "Accenture", icon: <AccentureIcon /> },
    { name: "Capgemini", icon: <CapgeminiIcon /> },
    { name: "Freshworks", icon: <FreshworksIcon /> },
    { name: "Hexaware", icon: <HexawareIcon /> },
    { name: "LTI", icon: <LtiIcon /> },
    { name: "Mindtree", icon: <MindtreeIcon /> }
  ];

  const salaryBenchmarks = [
    { role: "Full Stack", value: 6, max: 12, color: "bg-primary" },
    { role: "Data Science", value: 8, max: 15, color: "bg-emerald-500" },
    { role: "UI/UX Design", value: 5, max: 10, color: "bg-pink-500" },
    { role: "Cyber Security", value: 7, max: 14, color: "bg-orange-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  // Helper to get matching beautiful gradient theme matching testimonials page
  const getGradient = (idx: number) => {
    const gradients = [
      "from-primary to-accent",
      "from-accent to-secondary",
      "from-secondary to-primary",
      "from-primary to-secondary"
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-navy/10 overflow-x-hidden pt-20">
      
      {/* 1. Compact Brand-Dominant Hero Section */}
      <section className="relative py-20 lg:py-24 flex items-center justify-center overflow-hidden bg-cream/20 border-b border-border/20">
        {/* Decorative Success Wall Background */}
        <div className="absolute inset-0 z-0 opacity-[0.015] select-none pointer-events-none rotate-[-4deg] scale-110">
          <div className="flex flex-col gap-8">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className={`flex gap-16 whitespace-nowrap ${row % 2 === 0 ? 'translate-x-[-50px]' : 'translate-x-[50px]'}`}>
                {["GOOGLE", "META", "AMAZON", "NETFLIX", "APPLE", "MICROSOFT", "ADOBE", "TESLA"].map((brand) => (
                  <span key={brand} className="text-7xl font-black italic">{brand}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy text-white mb-6 shadow-md"
            >
              <Zap size={12} className="text-orange-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">The Elite Placement Hub</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy leading-tight mb-6 tracking-tighter">
              BEYOND <br />
              <span className="text-gradient">EMPLOYMENT.</span>
            </h1>

            <p className="text-sm sm:text-base text-text/80 max-w-xl mx-auto leading-relaxed font-medium mb-8">
              We don't just place students; we launch careers at the world's most innovative technology companies through structured preparation and direct industry pipelines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-3.5 bg-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-md active:scale-95">
                Start Your Journey
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr ${getGradient(i)} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}
                    >
                      {["AP", "PN", "KS", "DR"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-lg font-black text-navy leading-none">1,500+</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Hired Alumni</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Stats (Compact & Sleek) */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          className="absolute top-16 right-10 lg:right-24 bg-white p-4 px-5 rounded-2xl shadow-soft border border-border/40 hidden md:block"
        >
          <div className="text-xl font-black text-navy mb-0.5">95%</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Placement Rate</div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          className="absolute bottom-16 left-10 lg:left-24 bg-white p-4 px-5 rounded-2xl shadow-soft border border-border/40 hidden md:block"
        >
          <div className="text-xl font-black text-navy mb-0.5">₹12 LPA</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Highest Package</div>
        </motion.div>
      </section>

      {/* 2. Success Statistics (Compact padding & spacing) */}
      <section className="py-16 border-y border-border/10 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="text-center group"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-105`}>
                  <stat.icon size={22} />
                </div>
                <div className="text-2xl font-black text-navy mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Success Stories Bento Grid (Completely refined and sized) */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-3">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.35em]">Testimonials</span>
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-navy tracking-tight">
                Stories of <span className="text-gradient">Transformation</span>
              </h2>
            </div>
            <p className="text-navy/55 max-w-xs text-xs font-medium leading-relaxed">
              From non-tech backgrounds to top-tier developer positions. Learn how Ascope Tech paved the roadmap.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Card 1: Highlighted Large Card (Row 1, Cols 1-2) */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 bg-sky/30 rounded-3xl p-8 text-navy relative overflow-hidden group border border-border/40 shadow-soft flex flex-col justify-between h-[340px]"
            >
              <Quote className="text-primary/5 absolute bottom-6 right-6 select-none pointer-events-none" size={90} />
              
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center text-lg font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                      AP
                   </div>
                   <div>
                      <h4 className="text-lg font-black tracking-tight text-navy leading-tight">Arun Prakash</h4>
                      <p className="text-navy/40 uppercase tracking-widest text-[9px] font-bold">Full Stack Architect @ TCS</p>
                   </div>
                </div>
                
                <p className="text-sm sm:text-base font-medium leading-relaxed max-w-xl text-navy/70 italic my-4">
                  "The intensive 20+ mock interview sessions and structural grooming at Ascope Tech transformed my confidence. I went from being extremely nervous to confidently leading complex architectural rounds!"
                </p>

                <div className="flex items-center justify-between w-full pt-2 border-t border-navy/5">
                   <div className="flex items-center gap-2">
                      <p className="text-[9px] text-navy/40 font-bold uppercase">Final Package:</p>
                      <p className="text-sm font-black text-primary">₹6.5 LPA</p>
                   </div>
                   <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                     <CheckCircle2 className="text-emerald-500" size={14} />
                     <span>Verified Hire</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Regular Card (Row 1, Col 3) */}
            <motion.div 
              variants={itemVariants} 
              className="bg-sky/20 rounded-3xl p-6 flex flex-col justify-between border border-border/30 hover:border-primary/40 transition-all duration-300 group h-[340px]"
            >
               <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-accent to-secondary text-white flex items-center justify-center text-sm font-black shadow-sm">
                     PN
                  </div>
                  <Globe size={18} className="text-navy/30" />
               </div>
               <div>
                  <p className="text-navy/40 text-[9px] font-black uppercase tracking-widest mb-1">Priya Nair</p>
                  <p className="text-base font-black text-navy leading-tight">Data Analyst @ Cognizant</p>
                  <p className="text-primary text-xs font-black mt-1">₹8.2 LPA</p>
               </div>
               <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                 "Transitioning from zero programming skills to a confident Data Analyst in 5 months felt seamless."
               </p>
            </motion.div>

            {/* Bento Card 3: Regular Card (Row 2, Col 1) */}
            <motion.div 
              variants={itemVariants} 
              className="bg-white rounded-3xl p-6 flex flex-col justify-between border border-border/40 shadow-soft hover:border-primary/40 transition-all duration-300 h-[340px]"
            >
               <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-secondary to-primary text-white flex items-center justify-center text-sm font-black shadow-sm">
                     KS
                  </div>
                  <Zap size={18} className="text-primary/40 animate-pulse" />
               </div>
               <div>
                  <p className="text-primary/40 text-[9px] font-black uppercase tracking-widest mb-1">Karthik Sundar</p>
                  <p className="text-base font-black text-navy leading-tight">Java Developer @ Wipro / Support Engineer @ Cognizant</p>
                  <p className="text-primary text-xs font-black mt-1">₹4.8 LPA</p>
               </div>
               <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                 "The switch from Mechanical engineering to a high-paying IT developer role was perfectly mapped."
               </p>
            </motion.div>

            {/* Bento Card 4: Regular Card (Row 2, Col 2) */}
            <motion.div 
              variants={itemVariants} 
              className="bg-sky/20 rounded-3xl p-6 flex flex-col justify-between border border-border/30 hover:border-primary/40 transition-all duration-300 group h-[340px]"
            >
               <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center text-sm font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                     DR
                  </div>
                  <Award size={18} className="text-navy/30" />
               </div>
               <div>
                  <p className="text-navy/40 text-[9px] font-black uppercase tracking-widest mb-1">Dinesh Raj</p>
                  <p className="text-base font-black text-navy leading-tight">UI/UX Designer @ Freshworks</p>
                  <p className="text-primary text-xs font-black mt-1">₹7.2 LPA</p>
               </div>
               <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                 "The UX process training built a professional portfolio that wowed every interviewer I met. Highly recommended!"
               </p>
            </motion.div>

            {/* Bento Card 5: Regular Card (Row 2, Col 3) */}
            <motion.div 
              variants={itemVariants} 
              className="bg-emerald-50/50 rounded-3xl p-6 flex flex-col justify-between border border-emerald-100/60 hover:border-emerald-500/40 transition-all duration-300 group h-[340px]"
            >
               <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-sm font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                     SK
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-600/50" />
               </div>
               <div>
                  <p className="text-emerald-700/50 text-[9px] font-black uppercase tracking-widest mb-1">Saranya Kumar</p>
                  <p className="text-base font-black text-navy leading-tight">ML Engineer @ Zoho</p>
                  <p className="text-emerald-600 text-xs font-black mt-1">₹8.2 LPA</p>
               </div>
               <p className="text-xs text-navy/60 font-medium italic border-t border-emerald-100/30 pt-3">
                 "The portfolio projects made the difference and helped me land the ML role seamlessly."
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Partners Marquee (Fully optimized and GPU hardware accelerated) */}
      <section className="py-14 bg-sky/20 overflow-hidden border-y border-border/30">
         <div className="max-w-7xl mx-auto px-6 mb-8">
            <h3 className="text-navy/20 font-black uppercase tracking-[0.4em] text-[9px] text-center">Global Hiring Partners</h3>
         </div>
                 <div 
           className="flex gap-8 whitespace-nowrap animate-marquee items-center"
           style={{ 
             willChange: "transform",
             WebkitBackfaceVisibility: "hidden",
             backfaceVisibility: "hidden"
           }}
         >
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div 
                key={i} 
                className="inline-flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                 <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {p.icon}
                 </div>
                 <span className="text-xs font-black text-navy uppercase tracking-widest">{p.name}</span>
              </div>
            ))}
         </div>
      </section>

      {/* 5. Salary Benchmarks (Sleek sizing & thin ROI bars) */}
      <section className="py-24 px-6 bg-white relative">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
               <div className="space-y-3">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.35em]">Career Path ROI</span>
                  <h2 className="text-3xl lg:text-5xl font-heading font-black text-navy leading-tight tracking-tight">
                    Your Career. <br />
                    <span className="text-gradient">Engineered</span> for Growth.
                  </h2>
               </div>
               
               <p className="text-text/75 text-sm sm:text-base leading-relaxed font-medium">
                  At Ascope Tech, we design professional roadmaps that consistently bypass entry-level limits. Our hands-on tracks deliver high-performance skills that translate directly into unmatched market value and accelerated promotion cycles.
               </p>
               
               {/* Premium Interactive Metrics Grid (Replaces the removed button) */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-cream/20 p-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium hover:border-primary/20 transition-all duration-300 group select-none">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                           <TrendingUp size={14} />
                        </div>
                        <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Growth Multiplier</span>
                     </div>
                     <div className="text-3xl font-black text-navy tracking-tight mb-1 group-hover:text-primary transition-colors">3.5x</div>
                     <p className="text-[10px] text-muted font-semibold leading-normal">Average salary increase vs local baseline packages.</p>
                  </div>

                  <div className="bg-cream/20 p-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium hover:border-accent/20 transition-all duration-300 group select-none">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                           <Zap size={14} />
                        </div>
                        <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Payback Rate</span>
                     </div>
                     <div className="text-3xl font-black text-navy tracking-tight mb-1 group-hover:text-accent transition-colors">&lt; 90 Days</div>
                     <p className="text-[10px] text-muted font-semibold leading-normal">Full educational investment recovery period post graduation.</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-br from-cream/30 via-sky/10 to-sky/20 rounded-[32px] p-8 sm:p-10 shadow-premium border border-border/40 space-y-6"
            >
               <div className="space-y-1">
                  <h4 className="text-sm font-black text-navy uppercase tracking-wider">Salary Benchmarks</h4>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Domain range & placement averages</p>
               </div>
               
               <div className="space-y-5 pt-2">
                  {salaryBenchmarks.map((bench, i) => (
                    <div key={i} className="space-y-2 hover:translate-x-1 transition-transform duration-300">
                       <div className="flex justify-between items-end text-xs">
                          <p className="font-black text-navy uppercase tracking-wider">{bench.role}</p>
                          <p className="font-black text-primary">{bench.value}-{bench.max} LPA</p>
                       </div>
                       <div className="h-2 bg-white rounded-full overflow-hidden p-0.5 shadow-inner border border-border/20">
                          <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${(bench.value / 15) * 100}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                             className={`h-full ${bench.color} rounded-full relative group`}
                          >
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full m-0.5 shadow-sm" />
                          </motion.div>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="pt-5 border-t border-border/30 flex items-center gap-3 text-navy/35 font-bold text-[9px] uppercase tracking-widest">
                  <CheckCircle2 className="text-emerald-500" size={14} />
                  <span>Based on 1,500+ placements in 2025-26</span>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 6. Compact Final CTA */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto rounded-3xl bg-sky/40 py-16 px-6 text-center border border-border/30 shadow-soft relative overflow-hidden">
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" 
             />
             <div className="relative z-10 space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl font-heading font-black text-navy tracking-tight"
                >
                   Ready to be our next <br />
                   <span className="text-gradient">success story?</span>
                </motion.h2>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 bg-navy text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-md active:scale-95"
                >
                   Apply for Next Batch
                </motion.button>
             </div>
          </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-white border-t border-border/40 px-6">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy/20 text-[9px] font-black uppercase tracking-widest">© 2026 Ascope Tech. Global placement division.</p>
            <div className="flex gap-6">
               {['Success Reports', 'Hiring Portal', 'Alumni Network'].map(t => (
                 <a key={t} href="#" className="text-navy/20 text-[9px] font-black uppercase tracking-widest hover:text-navy transition-colors">{t}</a>
               ))}
            </div>
         </div>
      </footer>

      {/* Global Marquee Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Placements;
