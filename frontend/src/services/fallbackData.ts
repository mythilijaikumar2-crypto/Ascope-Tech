export interface Course {
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

export interface Trainer {
  id: number;
  name: string;
  role: string;
  company: string;
  skills: string[];
  color: string;
  emoji: string;
}

export const FALLBACK_COURSES: Course[] = [
  {
    id: 1,
    title: "Python Full Course",
    category: "Development",
    duration: "3 Months",
    rating: 4.8,
    price: "₹11,999",
    originalPrice: "₹14,399",
    image: "/images/pfc.png"
  },
  {
    id: 2,
    title: "Java Full Stack Development",
    category: "Development",
    duration: "6 Months",
    rating: 4.9,
    price: "₹19,999",
    originalPrice: "₹23,999",
    image: "/images/jfs_image.png"
  },
  {
    id: 3,
    title: "Cyber Security and Ethical Hacking",
    category: "Development",
    duration: "6 Months",
    rating: 4.9,
    price: "₹25,999",
    originalPrice: "₹31,199",
    image: "/images/cseh_image.png"
  },
  {
    id: 4,
    title: "Cloud Computing",
    category: "Development",
    duration: "4 Months",
    rating: 4.7,
    price: "₹14,999",
    originalPrice: "₹17,999",
    image: "/images/cc_image.png"
  },
  {
    id: 5,
    title: "Mastering in Python + C",
    category: "Development",
    duration: "3 Months",
    rating: 4.8,
    price: "₹19,999",
    originalPrice: "₹23,999",
    image: "/images/mpcp_image.png"
  },
  {
    id: 6,
    title: "Digital Marketing",
    category: "Marketing",
    duration: "3 Months",
    rating: 4.6,
    price: "₹9,999",
    originalPrice: "₹11,999",
    image: "/images/dm_image.png"
  },
  {
    id: 7,
    title: "UI/UX Design",
    category: "Design",
    duration: "3 Months",
    rating: 4.8,
    price: "₹9,999",
    originalPrice: "₹11,999",
    image: "/images/ui_ux_course.png"
  },
  {
    id: 8,
    title: "Data Science and Machine Learning",
    category: "Data Science",
    duration: "6 Months",
    rating: 4.9,
    price: "₹19,999",
    originalPrice: "₹23,999",
    image: "/images/dsml_image.png"
  },
  {
    id: 9,
    title: "Python and Data Science",
    category: "Data Science",
    duration: "4 Months",
    rating: 4.8,
    price: "₹16,999",
    originalPrice: "₹20,399",
    image: "/images/pds_image.png"
  }
];

export const FALLBACK_TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Mr Aswinraj",
    role: "Senior Full Stack Developer",
    company: "Zoho - Software Developer Engineer",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    color: "bg-[#0f172a]",
    emoji: "👨‍💻"
  },
  {
    id: 2,
    name: "Ms Mahalakshmi V",
    role: "Java & DevOps Expert",
    company: "LT Mindtree - 2 Years Experience",
    skills: ["Java", "Spring Boot", "Jenkins"],
    color: "bg-[#083344]",
    emoji: "☕"
  },
  {
    id: 3,
    name: "Mr Keerthivasan VR",
    role: "UI/UX Design Expert",
    company: "Ex- Infinity notion - 5 Years Experience",
    skills: ["Figma", "Adobe XD", "Prototyping", "Research"],
    color: "bg-[#581c87]",
    emoji: "🎨"
  },
  {
    id: 4,
    name: "Priya",
    role: "Business Analytics Expert",
    company: "LT Mindtree - 2 Years Experience",
    skills: ["Excel", "Tableau", "SAP", "JIRA"],
    color: "bg-[#064e3b]",
    emoji: "📈"
  },
  {
    id: 5,
    name: "Ms Yashmeen",
    role: "Data Science Lead",
    company: "Trainer On Ascope Tech",
    skills: ["Python", "ML", "TensorFlow", "SQL", "Power BI"],
    color: "bg-[#064e3b]",
    emoji: "👩‍🔬"
  }
];
