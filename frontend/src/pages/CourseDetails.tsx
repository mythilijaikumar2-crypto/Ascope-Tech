import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Clock,
  Award,
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Users,
} from "lucide-react";
import api from "../services/api";
import { FALLBACK_COURSES } from "../services/fallbackData";

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

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        setLoading((prev) => {
          if (!prev) return true;
          return prev;
        });
      }
    });

    api.get("/courses")
      .then((res) => {
        if (!isMounted) return;
        const list: Course[] = res.data.data || [];
        const found = list.find((c) => String(c.id) === String(courseId));
        if (found) {
          setCourse(found);
        } else {
          // Check fallback
          const fallbackFound = FALLBACK_COURSES.find(
            (c) => String(c.id) === String(courseId)
          );
          setCourse(fallbackFound || null);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching courses, using fallback details:", err);
        const fallbackFound = FALLBACK_COURSES.find(
          (c) => String(c.id) === String(courseId)
        );
        setCourse(fallbackFound || null);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-white text-center font-sans">
        <div className="max-w-md mx-auto space-y-6 px-6">
          <h2 className="text-3xl font-black text-navy">Course Not Found</h2>
          <p className="text-navy/60 font-medium">
            We couldn't locate the course matching ID "{courseId}". Check our course list.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-bold rounded-xl"
          >
            <ArrowLeft size={16} />
            <span>Back to Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  const syllabusModules = [
    {
      num: "01",
      title: "Fundamentals & Basic Constructs",
      topics: ["Introduction to syntax & core variables", "Control flows, loops, and iterations", "Data structure foundations & operations"],
    },
    {
      num: "02",
      title: "Advanced Concepts & Design Patterns",
      topics: ["Object-Oriented Programming (OOP) paradigms", "Error handling, exceptions & debugging strategies", "Functional programming techniques"],
    },
    {
      num: "03",
      title: "Database Engineering & Integrations",
      topics: ["PostgreSQL database configuration & pools", "Structured SQL schemas & parameterized queries", "Object relational mapping models"],
    },
    {
      num: "04",
      title: "Full Stack APIs & Frameworks",
      topics: ["Express.js backend server architectures", "RESTful routing & secure JWT verification", "State management & dynamic React component grids"],
    },
  ];

  const highlights = [
    "100% Practical and Hands-on labs",
    "Real-time database and server hosting setups",
    "Professional mock interviews and CV engineering",
    "Direct corporate placement assistance",
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Decorative Blur Layers */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-navy/50 hover:text-primary transition-colors font-bold text-sm mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back to Course Directory</span>
        </Link>

        {/* Dynamic Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Descriptive Syllabus and Overview (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <span className="px-3.5 py-1 text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-full">
                {course.category}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy leading-tight tracking-tighter">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-navy/60 font-medium pt-2">
                <div className="flex items-center gap-1.5 text-primary">
                  <Star size={18} fill="currentColor" />
                  <span className="font-black text-navy">{course.rating}</span>
                  <span>(Student Rating)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={18} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={18} />
                  <span>Interactive Live Batch</span>
                </div>
              </div>
            </div>

            {/* Narrative Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-navy tracking-tight">Course Overview</h2>
              <p className="text-navy/70 leading-relaxed font-body">
                Master the intricacies of {course.title} with our world-class professional curriculum. Designed for students who expect absolute visual excellence and complete full-stack mastery, this course guides you from foundational setup concepts to high-end API design and robust database configurations.
              </p>
            </div>

            {/* Highlighted Perks */}
            <div className="bg-sky/20 rounded-[32px] p-8 border border-border/40 space-y-6">
              <h3 className="text-xl font-black text-navy tracking-tight">What you will gain</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    <span className="text-sm font-bold text-navy/80">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum/Syllabus Syllabus */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-navy tracking-tight">Curriculum Modules</h2>
              <div className="space-y-4">
                {syllabusModules.map((mod, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-[24px] border border-border/50 bg-white hover:shadow-premium transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="text-2xl font-black text-primary/30 font-heading">
                      {mod.num}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <h4 className="text-lg font-black text-navy">{mod.title}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-navy/60">
                        {mod.topics.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/45 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Card (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <div className="bg-white rounded-[40px] border border-border/60 p-8 lg:p-10 shadow-premium space-y-8 relative overflow-hidden">
              {/* Image banner preview */}
              <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-sky border border-border/30">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price Details */}
              <div className="space-y-4">
                <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest block">
                  TUITION FEE SUMMARY
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-black text-navy tracking-tight">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg font-semibold text-navy/30 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                  {course.originalPrice && (
                    <span className="text-xs bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                      20% OFF
                    </span>
                  )}
                </div>
                <p className="text-navy/50 text-xs font-semibold leading-relaxed">
                  * Dynamic EMI options available. Price includes absolute lifetime placement training resources, certificates, and live support tickets access.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-4 pt-4">
                <Link
                  to={`/checkout/${course.id}`}
                  className="w-full py-5 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 hover:bg-primary/95 hover:shadow-2xl hover:scale-[1.01]"
                >
                  <span>SECURE YOUR SPOT</span>
                  <ArrowRight size={18} />
                </Link>
                <div className="flex justify-center gap-6 pt-2 text-xs font-bold text-navy/40">
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span>ISO Certified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={16} />
                    <span>Secure Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
