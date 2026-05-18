import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ArrowRight
} from 'lucide-react';
import api from '../services/api';
import { FALLBACK_COURSES } from '../services/fallbackData';

const categories = ["All", "Development", "Data Science", "Design", "Marketing"];

interface Course {
  id: string | number;
  title: string;
  category: string;
  level?: string;
  duration: string;
  rating: number;
  price: string;
  originalPrice?: string;
  image: string;
}

const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        setCourses(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses, using fallback:', err);
        setCourses(FALLBACK_COURSES);
        setLoading(false);
      });
  }, []);

  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* 1. Streamlined Search Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy mb-8 tracking-tighter">
              Discover Your <span className="text-gradient">Future</span>
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Browse through our industry-vetted courses and start your journey towards becoming a world-class professional.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements for the minimal look */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24" />
      </section>

      {/* 2. Filters and Course Grid Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap md:justify-center gap-3 sm:gap-4 mb-16 no-scrollbar w-full scroll-smooth py-2"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-xl font-bold transition-all duration-300 border border-navy/5 flex-shrink-0 whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-navy text-white shadow-xl scale-105 border-navy' 
                  : 'bg-white text-navy hover:bg-sky'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => {
                const getCategoryBadgeStyles = (category?: string) => {
                  if (!category) return 'text-navy bg-white border border-border';
                  switch (category.toLowerCase()) {
                    case 'development':
                      return 'text-primary bg-primary/10 border border-primary/20';
                    case 'design':
                      return 'text-pink-600 bg-pink-500/10 border border-pink-500/20';
                    case 'data science':
                      return 'text-emerald-600 bg-emerald-500/10 border border-emerald-500/20';
                    case 'marketing':
                      return 'text-orange-600 bg-orange-500/10 border border-orange-500/20';
                    default:
                      return 'text-navy bg-white border border-border';
                  }
                };

                return (
                  <motion.div
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    key={course.id}
                    className="bg-white rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 group border border-border/50 hover:border-accent/40 flex flex-col justify-between h-full relative"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Glass shine transition sweep on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                      
                      <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest shadow-lg ${getCategoryBadgeStyles(course.category)}`}>
                        {course.category || 'Development'}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1 text-primary">
                            <Star size={16} fill="currentColor" className="transform group-hover:scale-110 group-hover:rotate-[15deg] transition-transform duration-300" />
                            <span className="font-black text-sm">{course.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-navy mb-6 group-hover:text-primary transition-colors leading-tight">
                          {course.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest mb-1">Course Fee</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-navy">{course.price}</span>
                            {course.originalPrice && (
                              <span className="text-sm font-semibold text-navy/30 line-through">{course.originalPrice}</span>
                            )}
                            {course.originalPrice && (
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">20% OFF</span>
                            )}
                          </div>
                        </div>
                        <Link 
                          to={`/enroll/${course.id}`}
                          className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 shadow-sm relative overflow-hidden"
                        >
                          <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
