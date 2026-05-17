import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Star, 
  ArrowRight
} from 'lucide-react';
import api from '../services/api';

const categories = ["All", "Development", "Data Science", "Design", "Business", "Marketing"];

interface Course {
  id: string | number;
  title: string;
  category: string;
  level?: string;
  duration: string;
  rating: number;
  price: string;
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
        console.error('Error fetching courses:', err);
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
            <h1 className="text-6xl lg:text-8xl font-heading font-black text-navy mb-8 tracking-tighter">
              Discover Your <span className="text-gradient">Future</span>
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-12">
              Browse through our industry-vetted courses and start your journey towards becoming a world-class professional.
            </p>
            
            {/* Centered Premium Search */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30 group-focus-within:text-primary transition-colors">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search courses, skills, or careers..." 
                className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-white shadow-soft border border-border/50 focus:border-primary outline-none transition-all font-medium text-lg"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy text-white px-8 py-3 rounded-2xl font-bold hover:bg-navy/90 transition-all active:scale-95">
                Search
              </button>
            </div>
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
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-navy text-white shadow-xl scale-105' : 'bg-white text-navy hover:bg-sky'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[400px] group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30 group-focus-within:text-accent transition-colors">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              className="w-full pl-16 pr-8 py-5 rounded-[20px] bg-white shadow-soft border border-transparent focus:border-accent outline-none transition-all font-medium"
            />
          </div>
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
              {filteredCourses.map((course) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={course.id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 group border border-border/50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-navy shadow-lg">
                      {course.category}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={16} fill="currentColor" />
                        <span className="font-black text-sm">{course.rating}</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <div className="flex items-center gap-2 text-navy/40 font-bold text-xs uppercase tracking-widest">
                        <Clock size={16} />
                        {course.duration}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-navy mb-6 group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest mb-1">Course Fee</span>
                        <span className="text-2xl font-black text-navy">{course.price}</span>
                      </div>
                      <Link 
                        to={`/enroll/${course.id}`}
                        className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 shadow-sm"
                      >
                        <ArrowRight size={24} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
