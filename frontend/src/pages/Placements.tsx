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

const Placements: React.FC = () => {
  const stats = [
    { label: "Placement Rate", value: "95%", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { label: "Highest Package", value: "₹12LPA", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Hiring Partners", value: "500+", icon: Building2, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Avg Salary", value: "₹5.5L", icon: Award, color: "text-accent", bg: "bg-accent/10" },
  ];

  const partners = [
    "TCS", "Infosys", "Wipro", "HCL", "Cognizant", "Zoho", "Accenture", 
    "Capgemini", "Freshworks", "Hexaware", "Mphasis", "LTI", "Mindtree"
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-navy/10 overflow-x-hidden">
      
      {/* 1. Brand-Dominant Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Success Wall Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none rotate-[-5deg] scale-125">
          <div className="flex flex-col gap-12">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className={`flex gap-20 whitespace-nowrap ${row % 2 === 0 ? 'translate-x-[-100px]' : 'translate-x-[100px]'}`}>
                {["GOOGLE", "META", "AMAZON", "NETFLIX", "APPLE", "MICROSOFT", "ADOBE", "TESLA"].map((brand) => (
                  <span key={brand} className="text-9xl font-black italic">{brand}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-navy text-white mb-10 shadow-2xl"
            >
              <Zap size={16} className="text-orange-400" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">The Elite Placement Hub</span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-heading font-black text-navy leading-[0.9] mb-10 tracking-tighter">
              BEYOND <br />
              <span className="text-gradient">EMPLOYMENT.</span>
            </h1>

            <p className="text-xl text-navy/40 max-w-xl mx-auto leading-relaxed font-medium mb-12">
              We don't just place students; we launch careers at the world's most innovative technology companies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="group relative px-12 py-6 bg-navy text-white rounded-full font-bold text-xl overflow-hidden transition-all hover:shadow-2xl active:scale-95">
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-sky shadow-lg" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-navy leading-none">15,000+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-navy/30">Hired Alumni</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Stats */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-10 lg:right-40 bg-white p-8 rounded-[40px] shadow-premium border border-border/50 hidden lg:block"
        >
          <div className="text-3xl font-black text-navy mb-1">98%</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Placement Rate</div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-10 lg:left-40 bg-white p-8 rounded-[40px] shadow-premium border border-border/50 hidden lg:block"
        >
          <div className="text-3xl font-black text-navy mb-1">24 LPA</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Average Package</div>
        </motion.div>
      </section>

      {/* 2. Success Statistics */}
      <section className="py-24 border-y border-border/10 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-black text-navy mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Success Stories Bento Grid */}
      <section className="py-32 px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-black text-xs uppercase tracking-[0.4em]">Testimonials</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-black text-navy tracking-tighter">
                Stories of <span className="text-gradient">Transformation</span>
              </h2>
            </div>
            <p className="text-navy/40 max-w-sm font-medium leading-relaxed">
              From diverse backgrounds to world-class tech roles. See how our students changed their lives.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
          >
            {/* Bento Card: Large */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="md:col-span-2 md:row-span-2 bg-sky rounded-[40px] p-12 text-navy relative overflow-hidden group border border-border/50 shadow-soft"
            >
              <Quote className="text-primary/10 absolute bottom-12 right-12" size={120} />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-sm">👨‍💻</div>
                   <div>
                      <h4 className="text-3xl font-black tracking-tight text-navy">Arun Prakash</h4>
                      <p className="text-navy/40 uppercase tracking-widest text-xs font-bold">Full Stack Architect @ TCS</p>
                   </div>
                </div>
                
                <p className="text-2xl font-medium leading-relaxed max-w-2xl text-navy/70 italic">
                  "The intensive 20+ mock interview sessions at Ascope Tech transformed my confidence. I went from being nervous to leading architectural discussions."
                </p>

                <div className="flex items-center gap-8">
                   <div className="px-6 py-3 rounded-2xl bg-white border border-border shadow-sm">
                      <p className="text-[10px] text-navy/40 font-bold uppercase mb-1">Final Package</p>
                      <p className="text-xl font-black text-primary">₹6.5 LPA</p>
                   </div>
                   <CheckCircle2 className="text-emerald-500" size={32} />
                </div>
              </div>
            </motion.div>

            {/* Other Bento Cards */}
            <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="bg-sky/50 rounded-[40px] p-8 flex flex-col justify-between border border-border/30 hover:border-primary transition-colors group">
               <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <Globe size={24} />
               </div>
               <div>
                  <p className="text-navy/40 text-[10px] font-black uppercase tracking-widest mb-2">Priya Nair</p>
                  <p className="text-xl font-black text-navy leading-tight">Data Analyst @ Infosys</p>
                  <p className="text-primary font-black mt-2">₹8.2 LPA</p>
               </div>
               <p className="text-sm text-navy/60 font-medium italic">"Zero Python to Data Analyst in 5 months."</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="bg-white rounded-[40px] p-8 flex flex-col justify-between border border-border/50 shadow-soft">
               <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                  <Zap size={24} />
               </div>
               <div>
                  <p className="text-primary/40 text-[10px] font-black uppercase tracking-widest mb-2">Karthik Sundar</p>
                  <p className="text-xl font-black text-navy leading-tight">Java Developer @ Wipro</p>
                  <p className="text-primary font-black mt-2">₹4.8 LPA</p>
               </div>
               <p className="text-sm text-navy/60 font-medium italic">"Mechanical to IT transition was seamless."</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="md:col-span-2 bg-sky rounded-[40px] p-10 flex items-center gap-8 border border-border shadow-sm overflow-hidden relative group">
               <div className="w-24 h-24 shrink-0 rounded-3xl bg-white flex items-center justify-center text-5xl shadow-sm">🎨</div>
               <div className="space-y-2 relative z-10">
                  <h4 className="text-2xl font-black text-navy">Dinesh Raj</h4>
                  <p className="text-navy/60 font-medium text-lg leading-snug max-w-md">"The UI/UX program built a portfolio that wowed every interviewer I met. Highly recommended!"</p>
                  <div className="flex items-center gap-4 pt-2">
                     <span className="text-xs font-black uppercase tracking-widest text-primary">Freshworks</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                     <span className="text-xs font-black uppercase tracking-widest text-navy">₹7.2 LPA</span>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="bg-emerald-50 rounded-[40px] p-8 flex flex-col justify-between border border-emerald-100">
               <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Award size={24} />
               </div>
               <div>
                  <p className="text-emerald-600/40 text-[10px] font-black uppercase tracking-widest mb-2">Saranya Kumar</p>
                  <p className="text-xl font-black text-navy leading-tight">ML Engineer @ Zoho</p>
                  <p className="text-emerald-600 font-black mt-2">₹8.2 LPA</p>
               </div>
               <p className="text-sm text-navy/60 font-medium italic">"Portfolio projects made the difference."</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Partners Marquee */}
      <section className="py-20 bg-sky/30 overflow-hidden border-y border-border/50">
         <div className="max-w-7xl mx-auto px-6 mb-12">
            <h3 className="text-navy/20 font-black uppercase tracking-[0.5em] text-[10px] text-center">Global Hiring Partners</h3>
         </div>
         
         <div className="flex gap-10 whitespace-nowrap animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="text-navy/10 text-4xl lg:text-6xl font-black uppercase hover:text-primary transition-colors cursor-default">
                 {p} <span className="text-navy/5 mx-6">/</span>
              </div>
            ))}
         </div>
      </section>

      {/* 4. Salary Benchmarks */}
      <section className="py-32 px-6 bg-white relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
               <span className="text-primary font-black text-xs uppercase tracking-[0.4em]">Career Path ROI</span>
               <h2 className="text-5xl lg:text-6xl font-heading font-black text-navy tracking-tighter">
                 Unmatched <br />
                 <span className="text-gradient">ROI</span> in Tech
               </h2>
               <p className="text-navy/60 text-lg leading-relaxed">
                  Our graduates see an average 250% salary hike after completing our programs. Here is how different domains stack up.
               </p>
               <button className="px-8 py-4 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg shadow-navy/20">
                  View Career Report
               </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-sky/20 rounded-[40px] p-10 shadow-soft border border-border/30 space-y-10"
            >
               {salaryBenchmarks.map((bench, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <p className="font-black text-navy text-sm uppercase tracking-wider">{bench.role}</p>
                       <p className="font-black text-primary">{bench.value}-{bench.max} LPA</p>
                    </div>
                    <div className="h-4 bg-white rounded-full overflow-hidden p-1 shadow-inner">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(bench.value / 15) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                          className={`h-full ${bench.color} rounded-full relative group`}
                       >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full m-1 shadow-sm" />
                       </motion.div>
                    </div>
                 </div>
               ))}
               
               <div className="pt-6 border-t border-border/50 flex items-center gap-4 text-navy/40 font-bold text-xs uppercase tracking-widest">
                  <CheckCircle2 className="text-emerald-500" size={16} />
                  Based on 2,000+ placements in 2025-26
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 px-6 bg-sky relative overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" 
          />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
             <motion.h2 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="text-5xl lg:text-7xl font-heading font-black text-navy tracking-tighter"
             >
                Ready to be our next <br />
                <span className="text-gradient">success story?</span>
             </motion.h2>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-12 py-5 bg-navy text-white rounded-[24px] font-black text-lg uppercase tracking-widest hover:bg-primary transition-all shadow-2xl shadow-navy/20"
             >
                Apply for Next Batch
             </motion.button>
          </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 bg-white border-t border-border/50 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-navy/20 text-[10px] font-black uppercase tracking-widest">© 2026 Ascope Tech. Global placement division.</p>
            <div className="flex gap-8">
               {['Success Reports', 'Hiring Portal', 'Alumni Network'].map(t => (
                 <a key={t} href="#" className="text-navy/20 text-[10px] font-black uppercase tracking-widest hover:text-navy transition-colors">{t}</a>
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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Placements;
