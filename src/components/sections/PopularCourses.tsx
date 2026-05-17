import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Custom SVG Icons
interface IconProps {
  size?: number;
  fill?: string;
  className?: string;
}


const ArrowRightIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
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
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Data Science & AI Specialization",
    category: "Data Science",
    rating: 4.8,
    reviews: 850,
    students: "10k+",
    duration: "32 Weeks",
    price: "$599",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Mastering UI/UX & Digital Design",
    category: "Design",
    rating: 4.9,
    reviews: 920,
    students: "8k+",
    duration: "16 Weeks",
    price: "$399",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

const PopularCourses: React.FC = () => {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 -ml-48" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-black text-accent tracking-[0.3em] uppercase mb-4"
            >
              Industry Leading
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-heading font-black text-navy leading-tight"
            >
              Our Most Popular <span className="text-gradient">Courses</span>
            </motion.h3>
          </div>
          <Link to="/courses">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-navy font-black hover:text-accent transition-all uppercase tracking-widest text-xs"
            >
              Explore Full Catalog <ArrowRightIcon size={16} />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <Link to="/courses" key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-premium group transition-all duration-500 border border-border/30 cursor-pointer h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-navy/90 backdrop-blur-md rounded-full text-white text-[9px] font-black uppercase tracking-wider">
                    {course.category}
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-xl font-bold text-navy mb-6 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                    {course.title}
                  </h4>

                  <div className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    View Course Details <ArrowRightIcon size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
