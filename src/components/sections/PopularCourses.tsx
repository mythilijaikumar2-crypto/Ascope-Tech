import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
interface IconProps {
  size?: number;
  fill?: string;
  className?: string;
}

const StarIcon: React.FC<IconProps> = ({ size = 16, fill = "none", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const ClockIcon: React.FC<IconProps> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const UsersIcon: React.FC<IconProps> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ArrowRightIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const courses = [
  {
    title: "Full Stack Web Development",
    category: "Development",
    rating: 4.9,
    reviews: 1200,
    students: "15k+",
    duration: "24 Weeks",
    price: "$499",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Data Science & AI Specialization",
    category: "Data Science",
    rating: 4.8,
    reviews: 850,
    students: "10k+",
    duration: "32 Weeks",
    price: "$599",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Mastering UI/UX & Digital Design",
    category: "Design",
    rating: 4.9,
    reviews: 920,
    students: "8k+",
    duration: "16 Weeks",
    price: "$399",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const PopularCourses: React.FC = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -ml-48" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-black text-secondary tracking-[0.3em] uppercase mb-4"
            >
              Industry Leading
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-primary"
            >
              Our Most Popular <span className="text-secondary">Courses</span>
            </motion.h3>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all"
          >
            Explore Full Catalog <ArrowRightIcon />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white rounded-20 overflow-hidden shadow-soft hover:shadow-layered group transition-all duration-500 border border-primary/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary/90 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-wider">
                  {course.category}
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex items-center gap-2 text-yellow-500 mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-dark ml-2">{course.rating}</span>
                  <span className="text-sm text-dark/30 font-medium">({course.reviews})</span>
                </div>
                
                <h4 className="text-2xl font-bold text-primary mb-8 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                  {course.title}
                </h4>
                
                <div className="flex justify-between items-center py-5 border-y border-gray-50 mb-8">
                  <div className="flex items-center gap-2 text-dark/60 text-sm font-bold">
                    <ClockIcon />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark/60 text-sm font-bold">
                    <UsersIcon />
                    <span>{course.students} Students</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-dark/30 font-bold uppercase tracking-widest">Starting from</span>
                    <span className="text-3xl font-black text-primary">{course.price}</span>
                  </div>
                  <button className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-secondary/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
