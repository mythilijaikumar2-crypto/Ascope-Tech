import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import api from "../../services/api";
import { FALLBACK_COURSES } from "../../services/fallbackData";

const POPULAR_COPY = {
  industryLeading: "Industry Leading",
  ourMostPopular: "Our Most Popular ",
  courses: "Courses",
  exploreFullCatalog: "Explore Full Catalog",
  courseFee: "Course Fee",
};

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

const PopularCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses?limit=3")
      .then((res) => {
        const fetchedCourses = res.data.data || [];
        setCourses(fetchedCourses.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching popular courses, using fallback:", err);
        setCourses(FALLBACK_COURSES.slice(0, 3));
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-primary tracking-[0.4em] uppercase mb-4">
              {POPULAR_COPY.industryLeading}
            </h2>
            <h3 className="text-4xl lg:text-5xl font-heading font-black text-navy leading-tight tracking-tighter">
              {POPULAR_COPY.ourMostPopular} <span className="text-gradient">{POPULAR_COPY.courses}</span>
            </h3>
          </div>
          <Link to="/courses">
            <motion.button
              whileHover={{ x: 8 }}
              className="flex items-center gap-2 text-navy font-black hover:text-primary transition-all uppercase tracking-[0.2em] text-[10px]"
            >
              {POPULAR_COPY.exploreFullCatalog} <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {courses.map((course, idx) => {
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
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium group transition-all duration-500 border border-border/50 hover:border-accent/40 flex flex-col justify-between h-full relative"
                >
                  <div className="relative w-full overflow-hidden bg-slate-50/50 rounded-t-[24px] sm:rounded-t-[32px]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105 rounded-t-[24px] sm:rounded-t-[32px]"
                    />
                    {/* Glass shine transition sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />


                  </div>

                  <div className="p-5 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${getCategoryBadgeStyles(course.category)}`}>
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 text-primary">
                          <Star size={16} fill="currentColor" className="transform group-hover:scale-110 group-hover:rotate-[15deg] transition-transform duration-300" />
                          <span className="font-black text-sm">{course.rating}</span>
                        </div>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black text-navy mb-4 sm:mb-6 group-hover:text-primary transition-colors leading-tight min-h-[2.5rem] sm:min-h-[3.5rem]">
                        {course.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-border/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest mb-1">
                          {POPULAR_COPY.courseFee}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-black text-navy">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-xs sm:text-sm font-semibold text-navy/30 line-through">{course.originalPrice}</span>
                          )}
                          {course.originalPrice && (
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">20% OFF</span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/enroll/${course.id}`}
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-border flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 shadow-sm relative overflow-hidden"
                      >
                        <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
