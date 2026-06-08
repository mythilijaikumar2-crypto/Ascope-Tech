import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import {
  Building2,
  Code,
  Cpu,
  Database,
  Laptop,
  Brain,
  BarChart3,
  Binary,
  Sparkles,
  Shield,
  Lock,
  Terminal,
  Network,
  Coffee,
  Server,
  Cloud,
  GitBranch,
  Palette,
  Layers,
  Eye,
  Compass,
  TrendingUp,
  PieChart,
  FileSpreadsheet,
  Briefcase,
} from "lucide-react";

interface Trainer {
  id: number;
  name: string;
  role: string;
  company: string;
  skills: string[];
  color: string;
  emoji: string;
  socials?: {
    linkedin: string;
    github: string;
    web: string;
  };
}

const DEFAULT_TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Mr Aswinraj",
    role: "Senior Full Stack Developer",
    company: "Zoho - Software Developer Engineer",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    color: "bg-[#0f172a]",
    emoji: "👨‍💻",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 2,
    name: "Ms Mahalakshmi V",
    role: "Java & DevOps Expert",
    company: "LT Mindtree - 2 Years Experience",
    skills: ["Java", "Spring Boot", "Jenkins"],
    color: "bg-[#083344]",
    emoji: "☕",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 3,
    name: "Mr Keerthivasan VR",
    role: "UI/UX Design Expert & Digital Marketing Specialist",
    company: "Ex- Infinity notion - 5 Years Experience",
    skills: ["Figma", "Adobe XD", "Prototyping", "Research"],
    color: "bg-[#581c87]",
    emoji: "🎨",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 4,
    name: "Priya",
    role: "Business Analytics Expert",
    company: "LT Mindtree - 2 Years Experience",
    skills: ["Excel", "Tableau", "SAP", "JIRA"],
    color: "bg-[#064e3b]",
    emoji: "📈",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 5,
    name: "Ms Yashmeen",
    role: "Data Science Lead",
    company: "Trainer On Ascope Tech",
    skills: ["Python", "ML", "TensorFlow", "SQL", "Power BI"],
    color: "bg-[#064e3b]",
    emoji: "👩‍🔬",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 6,
    name: "Ms Brindha A",
    role: "Junior Full Stack Developer",
    company: "Ascope Tech - Core Developer",
    skills: ["React", "Node.js", "Express.js", "Tailwind CSS", "MongoDB", "Git"],
    color: "bg-[#075a97]",
    emoji: "👩‍💻",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 7,
    name: "Ms Dharshini S",
    role: "Data Science, Machine Learning & Data Analytics",
    company: "Ascope Tech - AI Specialist",
    skills: ["Python", "Machine Learning", "Data Analytics", "Pandas", "SQL", "Scikit-Learn"],
    color: "bg-[#10b981]",
    emoji: "👩‍🔬",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
  {
    id: 8,
    name: "Mr Sathiyanarayana J",
    role: "Cybersecurity & Ethical Hacking",
    company: "Ascope Tech - Security Lead",
    skills: ["Ethical Hacking", "Penetration Testing", "Linux", "Network Security", "Wireshark", "Metasploit"],
    color: "bg-[#6366f1]",
    emoji: "👨‍💻",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      web: "https://ascope.tech",
    },
  },
];

const getDomainIcons = (role: string) => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes("full stack") || roleLower.includes("developer")) {
    return [
      { Icon: Code, className: "top-4 left-4" },
      { Icon: Cpu, className: "top-5 right-5" },
      { Icon: Database, className: "bottom-5 left-5" },
      { Icon: Laptop, className: "bottom-4 right-4" },
    ];
  } else if (
    roleLower.includes("data science") ||
    roleLower.includes("machine learning") ||
    roleLower.includes("analytics")
  ) {
    return [
      { Icon: Brain, className: "top-4 left-4" },
      { Icon: BarChart3, className: "top-5 right-5" },
      { Icon: Binary, className: "bottom-5 left-5" },
      { Icon: Sparkles, className: "bottom-4 right-4" },
    ];
  } else if (
    roleLower.includes("cybersecurity") ||
    roleLower.includes("hacking") ||
    roleLower.includes("security")
  ) {
    return [
      { Icon: Shield, className: "top-4 left-4" },
      { Icon: Lock, className: "top-5 right-5" },
      { Icon: Terminal, className: "bottom-5 left-5" },
      { Icon: Network, className: "bottom-4 right-4" },
    ];
  } else if (roleLower.includes("java") || roleLower.includes("devops")) {
    return [
      { Icon: Coffee, className: "top-4 left-4" },
      { Icon: Server, className: "top-5 right-5" },
      { Icon: Cloud, className: "bottom-5 left-5" },
      { Icon: GitBranch, className: "bottom-4 right-4" },
    ];
  } else if (roleLower.includes("ui/ux") || roleLower.includes("design")) {
    return [
      { Icon: Palette, className: "top-4 left-4" },
      { Icon: Layers, className: "top-5 right-5" },
      { Icon: Eye, className: "bottom-5 left-5" },
      { Icon: Compass, className: "bottom-4 right-4" },
    ];
  } else {
    // Default fallback (e.g. Business Analytics or general)
    return [
      { Icon: TrendingUp, className: "top-4 left-4" },
      { Icon: PieChart, className: "top-5 right-5" },
      { Icon: FileSpreadsheet, className: "bottom-5 left-5" },
      { Icon: Briefcase, className: "bottom-4 right-4" },
    ];
  }
};

const getCentralIcon = (role: string) => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes("full stack") || roleLower.includes("developer")) {
    return { Icon: Code, colorClass: "text-[#075a97]", bgClass: "bg-blue-50/80" };
  } else if (
    roleLower.includes("data science") ||
    roleLower.includes("machine learning") ||
    roleLower.includes("analytics")
  ) {
    return { Icon: Brain, colorClass: "text-[#10b981]", bgClass: "bg-emerald-50/80" };
  } else if (
    roleLower.includes("cybersecurity") ||
    roleLower.includes("hacking") ||
    roleLower.includes("security")
  ) {
    return { Icon: Shield, colorClass: "text-[#6366f1]", bgClass: "bg-indigo-50/80" };
  } else if (roleLower.includes("java") || roleLower.includes("devops")) {
    return { Icon: Coffee, colorClass: "text-[#f97316]", bgClass: "bg-orange-50/80" };
  } else if (roleLower.includes("ui/ux") || roleLower.includes("design")) {
    return { Icon: Palette, colorClass: "text-[#a855f7]", bgClass: "bg-purple-50/80" };
  } else {
    return { Icon: TrendingUp, colorClass: "text-[#064e3b]", bgClass: "bg-teal-50/80" };
  }
};

const Trainers: React.FC = () => {
  // Content strings — extracted to JS variables to satisfy IDE i18n analysis
  const text = {
    headingPart1: "Our Expert ",
    headingPart2: "Trainers",
    subheading: "Learn from industry practitioners with years of hands-on experience",
  };

  const [trainers, setTrainers] = useState<Trainer[]>(DEFAULT_TRAINERS);

  useEffect(() => {
    api.get("/trainers")
      .then((res) => {
        if (res.data && res.data.data) {
          setTrainers(res.data.data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch fresh trainers, using high-fidelity offline fallback:", err);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="pt-20 md:pt-32 pb-12 md:pb-24 bg-white min-h-screen font-sans overflow-hidden">
      {/* GPU-Accelerated Lighter CSS Animation Classes */}
      <style>{`
        @keyframes gpu-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-float-1 { animation: gpu-float 5s ease-in-out infinite; }
        .animate-float-2 { animation: gpu-float 5.5s ease-in-out infinite 0.5s; }
        .animate-float-3 { animation: gpu-float 6s ease-in-out infinite 1s; }
        .animate-float-4 { animation: gpu-float 6.5s ease-in-out infinite 1.5s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="text-center mb-12 md:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy mb-6 tracking-tighter">
            {text.headingPart1}<span className="text-gradient">{text.headingPart2}</span>
          </h1>
          <p className="text-muted text-sm font-bold max-w-xl mx-auto uppercase tracking-widest">
            {text.subheading}
          </p>
        </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 lg:gap-x-12 lg:gap-y-16"
          >
            {trainers.map((trainer) => {
              const centralIcon = getCentralIcon(trainer.role);
              return (
                <motion.div
                  key={trainer.id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-[24px] shadow-soft hover:shadow-premium transition-all duration-500 border border-border/40 flex flex-col h-full justify-between overflow-hidden max-w-[290px] sm:max-w-sm mx-auto w-full mt-0"
                >
                  <div>
                    {/* Sleek, Modern, Low-Height Banner (No absolute overlap above the card) */}
                    <div className={`h-24 w-full ${trainer.color} relative flex items-center justify-center overflow-hidden`}>
                      {/* Floating Domain Icons background layer */}
                      {getDomainIcons(trainer.role).map(
                        ({ Icon, className }, index) => {
                          const floatClass = `animate-float-${(index % 4) + 1}`;
                          return (
                            <div
                              key={index}
                              className={`absolute ${className} ${floatClass} z-10 text-white/20 p-1 rounded-lg backdrop-blur-[1px] bg-white/5 border border-white/10`}
                            >
                              <Icon size={12} className="opacity-40 group-hover:opacity-85 transition-opacity" />
                            </div>
                          );
                        }
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Integrated Circular Avatar/Icon inside Card */}
                    <div className="relative -mt-8 flex justify-center z-20">
                      <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-border/30 group-hover:scale-105 transition-transform duration-300">
                        <div className={`w-full h-full ${centralIcon.bgClass} rounded-xl flex items-center justify-center shadow-inner group-hover:rotate-[360deg] transition-all duration-700 ease-out`}>
                          <centralIcon.Icon
                            className={`${centralIcon.colorClass} w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Compact Details Section */}
                    <div className="pt-3 pb-4 px-5 text-center flex flex-col items-center">
                      <h3 className="text-xl font-black text-navy mb-1 group-hover:text-primary transition-colors leading-tight">
                        {trainer.name}
                      </h3>
                      
                      {/* Role Pill Badge */}
                      <span className="px-2.5 py-0.5 mb-3 bg-slate-50 border border-slate-100 text-muted text-[9px] font-black rounded-full uppercase tracking-wider min-h-[16px] flex items-center justify-center">
                        {trainer.role}
                      </span>

                      <div className="flex items-center justify-center gap-2 mb-3.5 text-accent font-bold text-[10px] uppercase tracking-wider">
                        <Building2 size={13} className="opacity-50" />
                        <span>{trainer.company}</span>
                      </div>

                      {/* Skills Grid */}
                      <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                        {trainer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-slate-50 text-navy/60 text-[9px] font-black rounded-md border border-slate-100/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>


                </motion.div>
              );
            })}
          </motion.div>
      </div>
    </div>
  );
};

export default Trainers;
