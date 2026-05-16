import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Placements', path: '/placements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#07598A]/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L32 30H8L20 5Z" fill="white" />
                <path d="M12 26L20 10L28 26H12Z" fill="#05A8D6" />
             </svg>
             <span className="text-2xl font-heading font-black text-white ml-2 tracking-tighter">
              Ascope<span className="text-white">Tech</span>
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-sm transition-all px-4 py-1.5 rounded-full ${location.pathname === link.path ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
           <Link to="/login" className="text-white font-bold text-sm hover:text-secondary transition-colors">Login</Link>
           <Link to="/courses" className="bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-secondary/20">
              Enroll Now
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-0 left-0 w-full bg-[#07598A] p-6 shadow-2xl"
          >
            <div className="flex justify-between mb-8">
               <span className="text-xl font-bold text-white">Menu</span>
               <button onClick={() => setIsOpen(false)} className="text-white">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold ${location.pathname === link.path ? 'text-secondary' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                 <Link to="/login" onClick={() => setIsOpen(false)} className="text-white font-bold">Login</Link>
                 <Link to="/courses" onClick={() => setIsOpen(false)} className="bg-secondary text-white py-4 rounded-xl font-bold text-center">
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
