import React from "react";
import { motion } from "framer-motion";

// Custom SVG Icons
const QuoteIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-4 5.2V21zm11 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-4 5.2V21z" />
  </svg>
);

const StarIcon = ({ size = 16, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const getInitials = (name: string) => {
  return name.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase();
};

const testimonials = [
  {
    name: "Arun Kumar",
    role: "Full Stack Developer at Freshworks (Chennai)",
    rating: 5,
    content: "The curriculum at Ascope Tech is exactly what I needed to land my dream job. The mentors are incredibly supportive and the projects are real-world ready.",
    gradient: "from-primary to-accent",
  },
  {
    name: "Mythili Jaikumar",
    role: "Data Scientist at Tiger Analytics (Chennai)",
    rating: 5,
    content: "The hands-on projects were the highlight. I learned more in 6 months here than in 4 years of college. The placement support is unmatched.",
    gradient: "from-accent to-secondary",
  },
  {
    name: "Rajesh Balaji",
    role: "UI/UX Designer at Zoho Corporation (Chennai)",
    rating: 5,
    content: "Premium quality education with a focus on real-world application. Highly recommended for anyone looking to transition into high-end tech roles.",
    gradient: "from-secondary to-primary",
  },
  {
    name: "Anitha Selvam",
    role: "Software Engineer at PayPal India (Chennai)",
    rating: 5,
    content: "The placement team worked tirelessly with me. From mock interviews to resume building, their guidance helped me clear the tough technical rounds at Microsoft.",
    gradient: "from-primary to-secondary",
  },
  {
    name: "Keerthi Rajan",
    role: "DevOps Engineer at Zoho Corporation (Tenkasi)",
    rating: 5,
    content: "The Docker, Kubernetes, and CI/CD pipelines taught here are extremely practical. I was able to transition from a manual tester to a DevOps Engineer seamlessly.",
    gradient: "from-accent to-primary",
  },
  {
    name: "Divya Prakash",
    role: "Frontend Lead at Chargebee (Chennai)",
    rating: 5,
    content: "Their emphasis on clean React architectures and styling systems blew me away. The React course is state-of-the-art and gave me complete confidence.",
    gradient: "from-secondary to-accent",
  },
  {
    name: "Hariharan Sridhar",
    role: "Cybersecurity Specialist at HCLTech (Chennai)",
    rating: 5,
    content: "The practical labs for ethical hacking and network security are phenomenal. You get hands-on experience dealing with actual vulnerabilities and secure configs.",
    gradient: "from-primary to-accent",
  },
  {
    name: "Aswini Ramachandran",
    role: "Cloud Solutions Architect at Cognizant (Chennai)",
    rating: 5,
    content: "Transitioning into Cloud Computing was easy thanks to their structured AWS training. The case studies are derived from actual production-level setups.",
    gradient: "from-accent to-secondary",
  },
  {
    name: "Karthikeyan M",
    role: "Python Developer at TCS (Siruseri)",
    rating: 5,
    content: "From basic syntax to advanced algorithms, the Python full course is comprehensive. The coding contests and hackathons held at Ascope really sharpened my skills.",
    gradient: "from-secondary to-primary",
  },
  {
    name: "Deepalakshmi S",
    role: "Backend Developer at Infosys (Mahindra World City)",
    rating: 5,
    content: "The Spring Boot and database optimization modules were top-tier. The trainers are highly patient and make sure you understand the 'why' behind the code.",
    gradient: "from-primary to-secondary",
  },
  {
    name: "Vijay Raghavan",
    role: "Senior Engineer at Caterpillar India (Chennai)",
    rating: 5,
    content: "I recommended Ascope Tech to my younger brother, and he secured an internship within months! The depth of technical mentoring is truly world-class.",
    gradient: "from-accent to-primary",
  },
  {
    name: "Sandhya Ramakrishnan",
    role: "Mobile App Developer at Trimble (Chennai)",
    rating: 5,
    content: "The app development track is exceptional. They teach modern design principles, state management, and performance tuning that you rarely find in standard bootcamps.",
    gradient: "from-secondary to-accent",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -mr-48 -mb-48" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-black text-accent tracking-[0.4em] uppercase mb-4"
        >
          Success Stories
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl lg:text-5xl font-heading font-black text-navy mb-16 leading-tight"
        >
          What Our Alumni <span className="text-gradient">Achieved</span>
        </motion.h3>

        {/* Horizontal Infinite Scroll Container (Left to Right) */}
        <div className="relative w-full overflow-hidden py-10 mask-gradient">
          <div className="animate-marquee-lr">
            {/* First Set of 12 Testimonials */}
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={`first-${idx}`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-cream p-6 sm:p-10 rounded-2xl sm:rounded-20 text-left relative group border border-transparent hover:border-border/50 hover:bg-white hover:shadow-premium transition-all duration-500 w-[290px] sm:w-[380px] shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="text-accent opacity-20 absolute top-8 right-8 group-hover:opacity-40 transition-opacity">
                    <QuoteIcon />
                  </div>

                  {/* Stars Rating */}
                  <div className="flex gap-1 text-yellow-500 mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-text italic mb-6 sm:mb-8 leading-relaxed font-medium text-xs sm:text-sm">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border mt-auto">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent blur-sm rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full relative z-10 border-2 border-white shadow-soft bg-gradient-to-tr ${testimonial.gradient} text-white font-heading font-black text-xs sm:text-sm tracking-wider flex items-center justify-center select-none`}>
                      {getInitials(testimonial.name)}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-navy group-hover:text-accent transition-colors text-xs sm:text-sm truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate Set of 12 Testimonials to enable seamless looping */}
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={`second-${idx}`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-cream p-6 sm:p-10 rounded-2xl sm:rounded-20 text-left relative group border border-transparent hover:border-border/50 hover:bg-white hover:shadow-premium transition-all duration-500 w-[290px] sm:w-[380px] shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="text-accent opacity-20 absolute top-8 right-8 group-hover:opacity-40 transition-opacity">
                    <QuoteIcon />
                  </div>

                  {/* Stars Rating */}
                  <div className="flex gap-1 text-yellow-500 mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-text italic mb-6 sm:mb-8 leading-relaxed font-medium text-xs sm:text-sm">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border mt-auto">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent blur-sm rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full relative z-10 border-2 border-white shadow-soft bg-gradient-to-tr ${testimonial.gradient} text-white font-heading font-black text-xs sm:text-sm tracking-wider flex items-center justify-center select-none`}>
                      {getInitials(testimonial.name)}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-navy group-hover:text-accent transition-colors text-xs sm:text-sm truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
