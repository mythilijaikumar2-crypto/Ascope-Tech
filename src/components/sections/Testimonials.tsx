import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const QuoteIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-4 5.2V21zm11 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-4 5.2V21z"/></svg>
);
const StarIcon = ({ size = 16, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Full Stack Developer at Google",
    content: "The curriculum at Ascope Tech is exactly what I needed to land my dream job. The mentors are incredibly supportive and the projects are real-world ready.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist at Amazon",
    content: "The hands-on projects were the highlight. I learned more in 6 months here than in 4 years of college. The placement support is unmatched.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Thorne",
    role: "UI/UX Designer at Meta",
    content: "Premium quality education with a focus on real-world application. Highly recommended for anyone looking to transition into high-end tech roles.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -mr-48 -mb-48" />

      <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-black text-secondary tracking-[0.3em] uppercase mb-4"
        >
          Success Stories
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-20"
        >
          What Our Alumni <span className="text-secondary">Achieved</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background p-12 rounded-20 text-left relative group border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-layered transition-all duration-500"
            >
              <div className="text-secondary opacity-20 absolute top-8 right-8 group-hover:opacity-40 transition-opacity">
                <QuoteIcon />
              </div>
              
              <div className="flex gap-1 text-yellow-500 mb-8">
                {[...Array(5)].map((_, i) => (<StarIcon key={i} size={16} fill="currentColor" />))}
              </div>
              
              <p className="text-dark/70 italic mb-10 leading-relaxed font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-5 pt-8 border-t border-dark/5">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary blur-sm rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full relative z-10 border-2 border-white shadow-soft" />
                </div>
                <div>
                  <h4 className="font-bold text-primary group-hover:text-secondary transition-colors">{testimonial.name}</h4>
                  <p className="text-xs text-dark/40 font-bold uppercase tracking-widest mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
