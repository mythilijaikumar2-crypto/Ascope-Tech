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

const DETAILS_COPY = {
  notFound: "Course Not Found",
  cannotLocateStart: "We couldn't locate the course matching ID \"",
  cannotLocateEnd: "\". Check our course list.",
  backToCourses: "Back to Courses",
  backToDirectory: "Back to Course Directory",
  liveBatch: "Interactive Live Batch",
  overview: "Course Overview",
  masterIntricacies: "Master the intricacies of ",
  syllabusIntro: " with our world-class professional curriculum. Designed for students who expect absolute visual excellence and complete full-stack mastery, this course guides you from foundational setup concepts to high-end API design and robust database configurations.",
  whatYouGain: "What you will gain",
  curriculumModules: "Curriculum Modules",
  tuitionFeeSummary: "TUITION FEE SUMMARY",
  secureYourSpot: "SECURE YOUR SPOT",
  isoCertified: "ISO Certified",
  secureBooking: "Secure Booking",
  studentRating: "(Student Rating)",
  off20: "20% OFF",
  emiDisclaimer: "* Dynamic EMI options available. Price includes absolute lifetime placement training resources, certificates, and live support tickets access.",
};

interface SyllabusModule {
  num: string;
  title: string;
  topics: string[];
}

const getSyllabusModules = (courseTitle: string): SyllabusModule[] => {
  const title = courseTitle.toLowerCase();

  if (title.includes("python") && title.includes("data science")) {
    return [
      {
        num: "01",
        title: "Python Fundamentals & Data Prep",
        topics: [
          "Python variables, control flows, and lists/dicts",
          "Working with files, CSV, and JSON parsing",
          "Pandas DataFrame cleaning & handling missing values"
        ]
      },
      {
        num: "02",
        title: "Data Wrangling & Visualization",
        topics: [
          "Merging, joining, and grouping datasets in Pandas",
          "Data visualization with Matplotlib, Seaborn & Plotly",
          "Querying SQL databases using SQLAlchemy & Python"
        ]
      },
      {
        num: "03",
        title: "Statistical Analysis & Modeling",
        topics: [
          "Probability distributions & correlation metrics",
          "Linear and Logistic Regression using Statsmodels & Scikit-Learn",
          "Feature engineering and pipeline preprocessing"
        ]
      },
      {
        num: "04",
        title: "Practical Data Science Projects",
        topics: [
          "Exploratory analysis on real-world datasets",
          "Developing interactive dashboards using Streamlit",
          "Interfacing with web APIs to fetch and process live data"
        ]
      }
    ];
  }

  if (title.includes("python") && title.includes("c programming")) {
    return [
      {
        num: "01",
        title: "C Programming & Memory Management",
        topics: [
          "C syntax, operators, and control structures",
          "Pointers, arrays, and manual memory allocation (malloc/free)",
          "Structures, unions, and file I/O operations in C"
        ]
      },
      {
        num: "02",
        title: "Python Fundamentals & Core Libraries",
        topics: [
          "Python syntax, variables, lists, dicts & functions",
          "File handling, exception blocks, and standard libraries",
          "Inter-process communication and scripting automation"
        ]
      },
      {
        num: "03",
        title: "Advanced OOP & System Integration",
        topics: [
          "Object-Oriented Programming paradigms in Python",
          "Error handling, exceptions & debugging strategies",
          "Integrating Python with C using ctypes and C extensions"
        ]
      },
      {
        num: "04",
        title: "High Performance Application Development",
        topics: [
          "Subprocesses, multi-threading, and multiprocessing",
          "Building robust console applications & utilities",
          "Memory management comparisons: Garbage Collection vs Manual"
        ]
      }
    ];
  }

  if (title.includes("python")) {
    return [
      {
        num: "01",
        title: "Python Fundamentals & Scripting Basics",
        topics: [
          "Introduction to Python syntax, variables & core types",
          "Control flows, loops, match-case, and iterations",
          "Functions, modular programming, and custom packages"
        ]
      },
      {
        num: "02",
        title: "Core Data Structures & Collections",
        topics: [
          "Lists, tuples, dictionaries, and sets in-depth",
          "String formatting, manipulation, and regex (re) patterns",
          "File handling (I/O) with text, CSV, and JSON formats"
        ]
      },
      {
        num: "03",
        title: "Object-Oriented Programming & Advanced Features",
        topics: [
          "OOP paradigms: Classes, inheritance, and polymorphism",
          "Exception handling, try-except-finally & debugging tools",
          "Advanced iterators, generators, and decorators"
        ]
      },
      {
        num: "04",
        title: "Web Integration, APIs & Data Tools",
        topics: [
          "Web scraping using BeautifulSoup and Requests",
          "Building RESTful APIs with FastAPI or Flask",
          "Testing with pytest and SQLite database integration"
        ]
      }
    ];
  }

  if (title.includes("java")) {
    return [
      {
        num: "01",
        title: "Java Programming Fundamentals",
        topics: [
          "Java syntax, JVM architecture & memory model",
          "Data types, operators, and control flow statements",
          "Object-Oriented Programming concepts in Java"
        ]
      },
      {
        num: "02",
        title: "Advanced Java & Collections Framework",
        topics: [
          "Java Collections (List, Set, Map) and Generics",
          "Exception handling mechanisms & multithreading",
          "Java 8 features: Streams API & Lambda expressions"
        ]
      },
      {
        num: "03",
        title: "Backend Services with Spring Boot",
        topics: [
          "Spring Framework core concepts & Dependency Injection",
          "Developing REST APIs with Spring Boot Controllers",
          "Spring Data JPA, Hibernate, and SQL integrations"
        ]
      },
      {
        num: "04",
        title: "Security, Integration & Deployment",
        topics: [
          "Secure JWT authentication & Spring Security settings",
          "Connecting Java APIs with modern React frontends",
          "Docker containerization & basic deployment pipelines"
        ]
      }
    ];
  }

  if (title.includes("cyber security") || title.includes("ethical hacking") || title.includes("security")) {
    return [
      {
        num: "01",
        title: "Networking & Security Foundations",
        topics: [
          "TCP/IP, OSI model, DNS & network protocols",
          "Port scanning, Nmap, and network sniffing (Wireshark)",
          "Cryptography principles, hashing, and encryption algorithms"
        ]
      },
      {
        num: "02",
        title: "Web Application Penetration Testing",
        topics: [
          "OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF)",
          "Burp Suite fundamentals & intercepting web traffic",
          "Session hijacking and authentication bypass techniques"
        ]
      },
      {
        num: "03",
        title: "System Hacking & Exploits",
        topics: [
          "Privilege escalation and password cracking tactics",
          "Metasploit framework & payload customization",
          "Basic reverse engineering & static malware analysis"
        ]
      },
      {
        num: "04",
        title: "Defensive Security & Operations",
        topics: [
          "Firewalls, IDS/IPS system configurations",
          "Security log analysis & incident response basics",
          "Penetration testing reporting & compliance guidelines"
        ]
      }
    ];
  }

  if (title.includes("cloud")) {
    return [
      {
        num: "01",
        title: "Cloud Fundamentals & Architecture",
        topics: [
          "Introduction to Cloud service models (IaaS, PaaS, SaaS)",
          "Virtualization basics & hypervisors",
          "Identity & Access Management (IAM) permissions"
        ]
      },
      {
        num: "02",
        title: "Core Cloud Services (AWS Focus)",
        topics: [
          "Compute resources: Amazon EC2 & AWS Lambda functions",
          "Storage solutions: S3, EBS, and RDS databases",
          "Virtual Private Cloud (VPC) & Application Load Balancers"
        ]
      },
      {
        num: "03",
        title: "Infrastructure as Code & Containers",
        topics: [
          "Containerizing apps with Docker & Kubernetes setups",
          "Version control with Git and CI/CD pipelines",
          "Infrastructure provisioning using Terraform scripts"
        ]
      },
      {
        num: "04",
        title: "Cloud Operations & Security",
        topics: [
          "Cloud monitoring with CloudWatch, Prometheus & Grafana",
          "High availability architectures & Auto Scaling groups",
          "Cost optimization tips & disaster recovery plans"
        ]
      }
    ];
  }

  if (title.includes("marketing") || title.includes("digital marketing")) {
    return [
      {
        num: "01",
        title: "Search Engine Optimization (SEO)",
        topics: [
          "Keyword research & SEO search intent analysis",
          "On-page optimization & Off-page link building",
          "Google Analytics 4 (GA4) & Search Console settings"
        ]
      },
      {
        num: "02",
        title: "Social Media & Content Strategy",
        topics: [
          "Content planning, copywriting & scheduling calendars",
          "Social media channels (Meta, LinkedIn, Instagram)",
          "Brand building and influencer collaboration guides"
        ]
      },
      {
        num: "03",
        title: "Paid Advertising Campaigns",
        topics: [
          "Google Ads setup (Search, Display, and Video ads)",
          "Meta Ads Manager & custom audience targeting",
          "Landing page creation & conversion rate optimization"
        ]
      },
      {
        num: "04",
        title: "Email Marketing & Analytics",
        topics: [
          "Building subscriber lists & lead magnets",
          "Email campaign design & marketing automation flows",
          "Campaign analytics, ROI tracking, and KPI reviews"
        ]
      }
    ];
  }

  if (title.includes("ui/ux") || title.includes("design")) {
    return [
      {
        num: "01",
        title: "UX Research & User Analysis",
        topics: [
          "UX design process and design thinking methodologies",
          "User research: interviews, surveys & empathy mapping",
          "Information Architecture (IA) and user journey mapping"
        ]
      },
      {
        num: "02",
        title: "Figma Wireframing & Prototyping",
        topics: [
          "Figma basics, grids, styles, and auto-layout tools",
          "Designing low-fidelity and high-fidelity wireframes",
          "Interactive prototyping, smart animate, and transitions"
        ]
      },
      {
        num: "03",
        title: "Visual Design & Systems",
        topics: [
          "Color theory, typography, and visual brand guides",
          "Building responsive layouts for mobile and web views",
          "Creating reusable UI components and design systems"
        ]
      },
      {
        num: "04",
        title: "Usability Testing & Developer Handoff",
        topics: [
          "Conducting testing sessions and aggregating feedback",
          "Accessibility standards (WCAG) & design specifications",
          "Preparing Figma files for standard developer handoff"
        ]
      }
    ];
  }

  if (title.includes("data science") || title.includes("machine learning")) {
    return [
      {
        num: "01",
        title: "Python & Core Math Foundations",
        topics: [
          "Python variables, control structures, and NumPy arrays",
          "Linear Algebra, Calculus, and descriptive statistics",
          "Data cleaning and preprocessing using Pandas"
        ]
      },
      {
        num: "02",
        title: "Exploratory Data Analysis & Viz",
        topics: [
          "EDA techniques & outlier detection methods",
          "Data visualization using Seaborn and Matplotlib",
          "Feature engineering and scaling methodologies"
        ]
      },
      {
        num: "03",
        title: "Supervised & Unsupervised Learning",
        topics: [
          "Regression & Classification algorithms in Scikit-Learn",
          "Clustering algorithms (K-Means, Hierarchical)",
          "Model evaluation: Cross-validation, ROC-AUC, confusion matrices"
        ]
      },
      {
        num: "04",
        title: "Advanced Analytics & Deep Learning",
        topics: [
          "Intro to Neural Networks using TensorFlow/Keras",
          "Basic Natural Language Processing (NLP) workflows",
          "Deploying ML pipelines to web pages using Streamlit"
        ]
      }
    ];
  }

  // Default Full Stack Web Development Syllabus (the one originally hardcoded)
  return [
    {
      num: "01",
      title: "Fundamentals & Basic Constructs",
      topics: [
        "Introduction to syntax & core variables",
        "Control flows, loops, and iterations",
        "Data structure foundations & operations"
      ]
    },
    {
      num: "02",
      title: "Advanced Concepts & Design Patterns",
      topics: [
        "Object-Oriented Programming (OOP) paradigms",
        "Error handling, exceptions & debugging strategies",
        "Functional programming techniques"
      ]
    },
    {
      num: "03",
      title: "Database Engineering & Integrations",
      topics: [
        "PostgreSQL database configuration & pools",
        "Structured SQL schemas & parameterized queries",
        "Object relational mapping models"
      ]
    },
    {
      num: "04",
      title: "Full Stack APIs & Frameworks",
      topics: [
        "Express.js backend server architectures",
        "RESTful routing & secure JWT verification",
        "State management & dynamic React component grids"
      ]
    }
  ];
};

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
          <h2 className="text-3xl font-black text-navy">{DETAILS_COPY.notFound}</h2>
          <p className="text-navy/60 font-medium">
            {DETAILS_COPY.cannotLocateStart}{courseId}{DETAILS_COPY.cannotLocateEnd}
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-bold rounded-xl"
          >
            <ArrowLeft size={16} />
            <span>{DETAILS_COPY.backToCourses}</span>
          </Link>
        </div>
      </div>
    );
  }

  const syllabusModules = getSyllabusModules(course.title);

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
          <span>{DETAILS_COPY.backToDirectory}</span>
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
                  <span>{DETAILS_COPY.studentRating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={18} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={18} />
                  <span>{DETAILS_COPY.liveBatch}</span>
                </div>
              </div>
            </div>

            {/* Narrative Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-navy tracking-tight">{DETAILS_COPY.overview}</h2>
              <p className="text-navy/70 leading-relaxed font-body">
                {DETAILS_COPY.masterIntricacies}{course.title}{DETAILS_COPY.syllabusIntro}
              </p>
            </div>

            {/* Highlighted Perks */}
            <div className="bg-sky/20 rounded-[32px] p-8 border border-border/40 space-y-6">
              <h3 className="text-xl font-black text-navy tracking-tight">{DETAILS_COPY.whatYouGain}</h3>
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
              <h2 className="text-2xl font-black text-navy tracking-tight">{DETAILS_COPY.curriculumModules}</h2>
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
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Price Details */}
              <div className="space-y-4">
                <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest block">
                  {DETAILS_COPY.tuitionFeeSummary}
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
                      {DETAILS_COPY.off20}
                    </span>
                  )}
                </div>
                <p className="text-navy/50 text-xs font-semibold leading-relaxed">
                  {DETAILS_COPY.emiDisclaimer}
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-4 pt-4">
                <Link
                  to={`/checkout/${course.id}`}
                  className="w-full py-5 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 hover:bg-primary/95 hover:shadow-2xl hover:scale-[1.01]"
                >
                  <span>{DETAILS_COPY.secureYourSpot}</span>
                  <ArrowRight size={18} />
                </Link>
                <div className="flex justify-center gap-6 pt-2 text-xs font-bold text-navy/40">
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span>{DETAILS_COPY.isoCertified}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={16} />
                    <span>{DETAILS_COPY.secureBooking}</span>
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
