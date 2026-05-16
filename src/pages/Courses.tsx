import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom SVG Icons
const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const BookOpenIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const StarIcon = ({ size = 14, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const ArrowRightIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const categories = ["All", "Development", "Data Science", "Design", "Business", "Marketing"];

const courses = [
  { id: 1, title: "Full Stack Mastery", category: "Development", level: "Beginner", duration: "24 Weeks", rating: 4.9, price: "$499", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400" },
  { id: 2, title: "Data Engineering with Python", category: "Data Science", level: "Intermediate", duration: "20 Weeks", rating: 4.8, price: "$599", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400" },
  { id: 3, title: "Modern UI/UX Principles", category: "Design", level: "All Levels", duration: "12 Weeks", rating: 4.7, price: "$299", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400" },
  { id: 4, title: "Cloud Architecture (AWS)", category: "Development", level: "Advanced", duration: "18 Weeks", rating: 4.9, price: "$699", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400" },
  { id: 5, title: "Digital Marketing Strategy", category: "Marketing", level: "Beginner", duration: "8 Weeks", rating: 4.6, price: "$199", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400" },
  { id: 6, title: "Business Analytics Pro", category: "Business", level: "Intermediate", duration: "16 Weeks", rating: 4.8, price: "$399", image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=400" },
];

const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className="pt-40 pb-24 bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-heading font-bold text-primary mb-6"
          >
            Explore <span className="text-secondary">Courses</span>
          </motion.h1>
          <p className="text-dark/60 max-w-2xl text-lg font-medium">Industry-vetted curricula designed to take you from zero to professional. Master the tools and techniques used by the world's best teams.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-white shadow-xl scale-105' : 'bg-white text-primary hover:bg-light_blue'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[400px] group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-secondary transition-colors">
              <SearchIcon size={22} />
            </div>
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              className="w-full pl-16 pr-8 py-5 rounded-[20px] bg-white shadow-soft border border-transparent focus:border-secondary outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={course.id}
                className="bg-white rounded-[32px] overflow-hidden shadow-soft hover:shadow-layered transition-all duration-500 group border border-primary/5"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-primary text-[10px] font-black uppercase tracking-wider">
                    {course.category}
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-1 text-yellow-500 mb-4 font-bold">
                    <StarIcon fill="currentColor" />
                    <span className="text-sm text-dark ml-1">{course.rating}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-6 group-hover:text-secondary transition-colors line-clamp-1 leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-6 text-dark/40 text-xs font-black uppercase tracking-widest mb-10">
                    <span className="flex items-center gap-2"><ClockIcon /> {course.duration}</span>
                    <span className="flex items-center gap-2"><BookOpenIcon /> {course.level}</span>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-gray-50">
                    <span className="text-3xl font-black text-primary">{course.price}</span>
                    <button className="flex items-center gap-2 text-secondary font-black hover:gap-4 transition-all uppercase tracking-wider text-xs">
                      Enroll Now <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Courses;
