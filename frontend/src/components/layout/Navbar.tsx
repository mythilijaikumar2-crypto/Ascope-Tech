import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  CreditCard, 
  LifeBuoy 
} from 'lucide-react';
import { authService } from "../../services/authService";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamically compute authentication status on render (synchronous and reactive to router navigation changes)
  const isLoggedIn = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  const isDashboardRoute = [
    "/dashboard",
    "/profile",
    "/billing",
    "/tickets",
    "/settings",
    "/admin"
  ].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking outside the user dropdown menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-close mobile menu on path changes
  useEffect(() => {
    Promise.resolve().then(() => {
      setIsOpen(false);
      setShowUserMenu(false);
    });
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = user?.fullName ? getInitials(user.fullName) : "ST";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Trainers", path: "/trainers" },
    { name: "Placements", path: "/placements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-24 flex items-center ${scrolled ? 'glass-navbar shadow-subtle' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center group relative">
          <div className="absolute -inset-8 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <motion.img
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              y: { duration: 0.3 }
            }}
            src="/ascopetech_logo.png"
            alt="Ascope Tech Logo"
            className="h-24 w-auto object-contain drop-shadow-[0_0_30px_rgba(7,90,151,0.2)] relative z-10 cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {!isDashboardRoute && (
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
          )}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="border-2 border-navy/20 text-navy hover:border-primary hover:text-primary px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all hover:scale-105 active:scale-95"
              >
                Login
              </Link>
              <Link
                to="/courses"
                className="premium-button px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all shadow-xl shadow-primary/30 hover:scale-105 active:scale-95"
              >
                Enroll Now
              </Link>
            </>
          ) : (
            /* Premium User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 bg-white/80 hover:bg-white px-4 py-2.5 rounded-2xl border border-navy/10 shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center text-white text-xs font-black shadow-md shadow-primary/20">
                  {initials}
                </div>
                <span className="text-xs font-black text-navy uppercase tracking-wider hidden lg:block">
                  {user?.fullName?.split(" ")[0] || "Account"}
                </span>
                <ChevronDown size={14} className={`text-navy/60 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-navy/10 rounded-2xl shadow-premium py-2 z-50 origin-top-right overflow-hidden"
                  >
                    {/* User info section */}
                    <div className="px-4 py-3 border-b border-navy/5 bg-navy/[0.02]">
                      <p className="text-xs font-black text-navy truncate">{user?.fullName || "Student"}</p>
                      <p className="text-[10px] font-bold text-navy/40 truncate">{user?.email || ""}</p>
                    </div>

                    {/* Nav Links */}
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-navy/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        <LayoutDashboard size={15} className="text-primary/70" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-navy/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        <User size={15} className="text-primary/70" />
                        My Profile
                      </Link>
                      <Link
                        to="/billing"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-navy/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        <CreditCard size={15} className="text-primary/70" />
                        Billing
                      </Link>
                      <Link
                        to="/tickets"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-navy/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        <LifeBuoy size={15} className="text-primary/70" />
                        Support
                      </Link>
                    </div>

                    <div className="border-t border-navy/5 my-1" />

                    <div className="p-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-navy p-2 hover:bg-navy/5 rounded-xl transition-all cursor-pointer"
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
            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {!isDashboardRoute && (
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
              )}
              
              <div className="flex flex-col gap-4 pt-8 border-t border-border">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm text-navy border-2 border-navy/20 hover:border-primary"
                    >
                      Login
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                      className="premium-button text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20"
                    >
                      Enroll Now
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Logged in user info header */}
                    <div className="flex items-center gap-4 bg-navy/5 p-4 rounded-2xl mb-2 border border-navy/10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center text-white text-base font-black shadow-md shadow-primary/20 shrink-0">
                        {initials}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-black text-navy truncate">{user?.fullName || "Student"}</p>
                        <p className="text-xs font-bold text-navy/40 truncate">{user?.email || ""}</p>
                      </div>
                    </div>

                    {/* Short-cuts grid */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-navy/10 rounded-2xl font-black text-[10px] uppercase tracking-wider text-navy/70 hover:text-primary transition-all"
                      >
                        <LayoutDashboard size={20} className="text-primary/70" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-navy/10 rounded-2xl font-black text-[10px] uppercase tracking-wider text-navy/70 hover:text-primary transition-all"
                      >
                        <User size={20} className="text-primary/70" />
                        Profile
                      </Link>
                      <Link
                        to="/billing"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-navy/10 rounded-2xl font-black text-[10px] uppercase tracking-wider text-navy/70 hover:text-primary transition-all"
                      >
                        <CreditCard size={20} className="text-primary/70" />
                        Billing
                      </Link>
                      <Link
                        to="/tickets"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-navy/10 rounded-2xl font-black text-[10px] uppercase tracking-wider text-navy/70 hover:text-primary transition-all"
                      >
                        <LifeBuoy size={20} className="text-primary/70" />
                        Support
                      </Link>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-5 bg-red-50 hover:bg-red-500 hover:text-white border-2 border-red-200 text-red-500 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all cursor-pointer"
                    >
                      Logout Account
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

