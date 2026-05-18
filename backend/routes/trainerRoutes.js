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
        ]
    });
});

module.exports = router;
