import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface Trainer {
  id: number;
  name: string;
  role: string;
  company: string;
  skills: string[];
  color: string;
  emoji: string;
}

const Trainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5004/api/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch trainers:', err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy mb-6 tracking-tighter">
            Our Expert <span className="text-gradient">Trainers</span>
          </h1>
          <p className="text-navy/40 max-w-2xl mx-auto font-bold uppercase tracking-[0.4em] text-[11px] leading-relaxed">
            Industry veterans working in world-class technology hubs
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                variants={itemVariants}
                className="group relative bg-white rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 border border-border/50"
              >
                <div className={`h-40 ${trainer.color} relative flex items-center justify-center overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-2 shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-110">
                      <div className="w-full h-full bg-cream rounded-full flex items-center justify-center text-4xl shadow-inner">
                        {trainer.emoji}
                      </div>
                   </div>
                </div>

                <div className="pt-14 pb-10 px-8 text-center">
                   <h3 className="text-2xl font-black text-navy mb-1 group-hover:text-primary transition-colors">
                     {trainer.name}
                   </h3>
                   <p className="text-muted text-xs font-bold uppercase tracking-widest mb-6">
                     {trainer.role}
                   </p>

                   <div className="flex items-center justify-center gap-2 mb-6 text-accent font-black text-xs uppercase tracking-wider">
                      <Building2 size={16} className="opacity-50" />
                      <span>{trainer.company}</span>
                   </div>

                   <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      {trainer.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-50 text-navy/60 text-[10px] font-black rounded-full uppercase tracking-widest border border-gray-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                          {skill}
                        </span>
                      ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
