import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { FALLBACK_COURSES } from "../services/fallbackData";
import { getCourses } from "../services/courseService";
import { submitContact } from "../services/contactService";

// Sleek, high-quality, brand-accurate WhatsappIcon inline SVG
const WhatsappIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      fill="currentColor"
    />
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [courses, setCourses] = useState<
    { id?: number | string; title: string }[]
  >([]);
  const [confettiParticles, setConfettiParticles] = useState<
    {
      id: number;
      left: number;
      delay: number;
      duration: number;
      size: number;
      color: string;
      shape: string;
      rotate: number;
    }[]
  >([]);

  useEffect(() => {
    let isMounted = true;
    getCourses()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data)
          ? data
          : (
            data as unknown as {
              data?: { id: number | string; title: string }[];
            }
          ).data || [];
        setCourses(list);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to fetch courses, using fallback:", err);
        setCourses(FALLBACK_COURSES);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const res = await submitContact(formData);
      if (res.success) {
        // Safe procedural side-effect allowed in React event handlers
        const generated = Array.from({ length: 45 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2.5 + Math.random() * 2;
          const size = 8 + Math.random() * 8;
          const colors = [
            "#004b87",
            "#00b5e2",
            "#e31b23",
            "#ff9800",
            "#10b981",
            "#a100ff",
            "#fdd000",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const shape = Math.random() > 0.5 ? "50%" : "0%";
          const rotate = Math.random() * 360;
          return { id: i, left, delay, duration, size, color, shape, rotate };
        });
        setConfettiParticles(generated);

        setStatus({
          type: "success",
          message: res.message || "Message sent successfully!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        });

        setTimeout(() => {
          setStatus({ type: "", message: "" });
          setConfettiParticles([]);
        }, 5000);
      } else {
        setStatus({ type: "error", message: "Failed to send message." });
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const apiError = err as { response?: { data?: { message?: string } } };
      const errMsg =
        apiError.response?.data?.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errMsg });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans relative overflow-hidden">
      {/* Optimized Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          className="absolute top-0 w-full"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1440V400C1440 400 1100 600 720 400C340 200 0 400 0 400V0Z"
            fill="#dddddd"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Heading Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-heading font-black text-navy tracking-tighter"
          >
            Have Some Question?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 max-w-2xl mx-auto font-medium"
          >
            Thank you for your interest in our services. Please fill out the
            form below or email us at{" "}
            <span className="text-primary font-bold">ascopetech@gmail.com</span>{" "}
            and we will get back to you promptly.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Column: Optimized Illustration */}
          <div className="lg:w-1/2 space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="relative w-full max-w-[450px] mx-auto aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-sky/30 rounded-[60px] rotate-6 scale-95" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    willChange: "transform",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0 bg-white shadow-premium rounded-[60px] border border-border/50 flex flex-col items-center justify-center p-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      willChange: "transform",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                    className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8"
                  >
                    <Mail size={64} />
                  </motion.div>

                  <div className="space-y-4 text-center w-full max-w-[200px]">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-3 bg-sky rounded-full mx-auto"
                        style={{
                          width: i === 1 ? "100%" : i === 2 ? "70%" : "85%",
                          opacity: 1 - i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8 flex-wrap lg:flex-nowrap justify-center">
                    {[
                      {
                        Icon: Instagram,
                        color: "hover:bg-[#E4405F]",
                        href: "https://www.instagram.com/ascopetech",
                      },
                      {
                        Icon: WhatsappIcon,
                        color: "hover:bg-[#25D366]",
                        href: "https://wa.me/917418240526",
                      },
                      {
                        Icon: Facebook,
                        color: "hover:bg-[#1877F2]",
                        href: "https://www.facebook.com/share/1BArsb8YU2/",
                      },
                      {
                        Icon: Linkedin,
                        color: "hover:bg-[#0A66C2]",
                        href: "https://www.linkedin.com/company/ascope-tech-private-limited/",
                      },
                      {
                        Icon: Mail,
                        color: "hover:bg-[#EA4335]",
                        href: "https://mail.google.com/mail/?view=cm&fs=1&to=ascopetech@gmail.com",
                      },
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          social.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        whileHover={{ y: -5, scale: 1.1 }}
                        className={`w-12 h-12 shrink-0 rounded-xl bg-white border border-border flex items-center justify-center text-navy/40 ${social.color} hover:text-white hover:border-transparent transition-all shadow-sm group`}
                      >
                        <social.Icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-8 pl-4 lg:pl-10">
              <h3 className="text-3xl font-black text-navy tracking-tight mb-8">
                Get in touch
              </h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, value: "+91 74182 40526", href: "tel:+917418240526" },
                  { icon: Mail, value: "ascopetech@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=ascopetech@gmail.com" },
                  {
                    icon: MapPin,
                    value:
                      "Ascope Tech, 5th floor, SBRR Square, Anna Nagar, Trichy - 620017",
                    href: undefined
                  },
                ].map((item, i) => (
                  item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-6 group hover:text-primary transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon size={20} />
                      </div>
                      <span className="text-navy/70 font-bold tracking-tight group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                    </a>
                  ) : (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon size={20} />
                      </div>
                      <span className="text-navy/70 font-bold tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Optimized Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-premium border border-border/30 relative overflow-hidden">
              <AnimatePresence>
                {status.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
                  >
                    {/* Dynamic Shower of Happy Confetti */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {confettiParticles.map((p) => (
                        <div
                          key={p.id}
                          className="absolute animate-confetti-fall"
                          style={{
                            left: `${p.left}%`,
                            top: "-20px",
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: p.color,
                            borderRadius: p.shape,
                            opacity: 0.8,
                            transform: `rotate(${p.rotate}deg)`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Premium Animated Tick Mark Card */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                        delay: 0.2,
                      }}
                      className="w-24 h-24 rounded-full bg-emerald-500/10 border-4 border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6 shadow-lg shadow-emerald-500/10"
                    >
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5,
                            ease: "easeOut",
                          }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-3xl font-black text-navy tracking-tight mb-3"
                    >
                      Thank You!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-navy/70 font-semibold max-w-sm mb-8 leading-relaxed font-body"
                    >
                      Your message has been sent successfully. Our counselors
                      will contact you shortly!
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      onClick={() => setStatus({ type: "", message: "" })}
                      className="px-8 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                      Send Another Message
                    </motion.button>

                    {/* Confetti Animation Keyframes Style Tag */}
                    <style>{`
                       @keyframes confetti-fall {
                         0% {
                           transform: translateY(0) rotate(0deg);
                           opacity: 1;
                         }
                         100% {
                           transform: translateY(550px) rotate(720deg);
                           opacity: 0;
                         }
                       }
                       .animate-confetti-fall {
                         animation-name: confetti-fall;
                         animation-timing-function: linear;
                         animation-iteration-count: infinite;
                       }
                     `}</style>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full pl-16 pr-12 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-navy/30">
                      Select Interested Course *
                    </option>
                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.title}
                        className="text-navy font-bold"
                      >
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-navy/40">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-8 text-navy/20 group-focus-within:text-primary transition-colors">
                    <MessageSquare size={20} />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-16 pr-8 py-6 rounded-3xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20 resize-none"
                  ></textarea>
                </div>

                {status.message && status.type === "error" && (
                  <div className="p-4 rounded-xl text-xs font-black text-center bg-red-50 text-red-500">
                    {status.message}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status.type === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group"
                >
                  <span>
                    {status.type === "loading" ? "Sending..." : "SEND MESSAGE"}
                  </span>
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Optimized Map Section */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="relative p-4 lg:p-6 rounded-[48px] bg-white shadow-premium border border-border/50 overflow-hidden">
            {/* Corner Decorative Accents */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary/10 rounded-tl-3xl z-10" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary/10 rounded-tr-3xl z-10" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary/10 rounded-bl-3xl z-10" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary/10 rounded-br-3xl z-10" />

            <div className="relative overflow-hidden rounded-[32px] border-2 border-sky h-[400px] bg-sky/20 z-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.055!2d78.6864744!3d10.8165342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5707b30e439%3A0xc4d3bcf4c85116a8!2sAscope%20Tech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1716000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ascope Tech Trichy Campus"
              ></iframe>
            </div>

            <div className="absolute bottom-12 left-12 right-12 lg:right-auto lg:w-auto bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-border/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-black text-navy text-sm uppercase tracking-widest">
                    Visit our Campus
                  </h5>
                  <p className="text-navy/60 text-xs font-medium">
                    5th Floor, SBRR Square, Anna Nagar, Tennur, Trichy – 620017
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=10.8165342,78.6890493&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-5 py-3 bg-primary text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
