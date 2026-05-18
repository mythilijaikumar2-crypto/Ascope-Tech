const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        data: [
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
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
            },
            { 
                id: 3, 
                name: "Mr Keerthivasan VR", 
                role: "UI/UX Design Expert", 
                company: "Ex- Infinity notion - 5 Years Experience", 
                skills: ["Figma", "Adobe XD", "Prototyping", "Research"],
                color: "bg-[#581c87]",
                emoji: "🎨",
                socials: {
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
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
                    web: "https://ascope.tech"
                }
            }
        ]
    });
});

module.exports = router;
