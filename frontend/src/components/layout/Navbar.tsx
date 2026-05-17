import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Trainers", path: "/trainers" },
    { name: "Placements", path: "/placements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-24 flex items-center ${scrolled ? 'glass-navbar shadow-subtle' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group relative">
          <div className="absolute -inset-8 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.img
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ y: -12, scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              y: { duration: 0.3 }
            }}
            src="/src/assets/ascopetech_logo.png"
            alt="Ascope Tech Logo"
            className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(7,90,151,0.2)] relative z-10 cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-2 bg-navy/5 backdrop-blur-lg px-6 py-2 rounded-full border border-navy/10 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-black text-[11px] uppercase tracking-[0.2em] transition-all px-5 py-2.5 rounded-full ${location.pathname === link.path ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-navy/70 hover:text-navy hover:bg-navy/5"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/courses"
            className="premium-button px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all shadow-xl shadow-primary/30 hover:scale-105 active:scale-95"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-navy p-2 hover:bg-navy/5 rounded-xl transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-0 w-full bg-white/95 backdrop-blur-2xl shadow-premium border-b border-border/50 overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-black tracking-tighter transition-all ${location.pathname === link.path ? "text-primary pl-4 border-l-4 border-primary" : "text-navy/70 hover:text-navy"}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4 pt-8 border-t border-border">
                <Link
                  to="/courses"
                  onClick={() => setIsOpen(false)}
                  className="premium-button text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
