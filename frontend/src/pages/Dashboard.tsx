import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLifeBuoy,
  FiBookOpen,
  FiSave,
  FiPlusCircle,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
  FiBell,
  FiShield,
  FiCreditCard,
  FiDownload,
  FiPrinter,
  FiX,
  FiFileText,
  FiCalendar,
  FiActivity,
  FiAward,
  FiCheck,
  FiChevronRight,
  FiArrowLeft
} from 'react-icons/fi';
import { IoSparklesOutline } from 'react-icons/io5';
import { authService } from '../services/authService';
import type { TicketCreateData } from '../services/authService';
import { paymentService } from '../services/paymentService';
import type { PaymentHistoryItem, InvoiceDetail } from '../services/paymentService';

// Helper to determine time-of-day greeting
const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};


interface Enrollment {
  enrollment_id: number;
  status: string;
  created_at: string;
  course_id: number;
  title: string;
  duration: string;
  price: string;
  image: string;
}

interface Ticket {
  id?: number;
  subject: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

interface DashboardProps {
  defaultTab?: 'profile' | 'courses' | 'tickets' | 'settings' | 'billing';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

const Dashboard: React.FC<DashboardProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'courses' | 'tickets' | 'settings' | 'billing'>(defaultTab || 'profile');
  const [profileData, setProfileData] = useState({ fullName: '', email: '', phone: '' });
  const [settingsData, setSettingsData] = useState({ emailNotifications: true, smsNotifications: false, darkMode: false });
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);

  // Form input states
  const [ticketForm, setTicketForm] = useState<TicketCreateData>({ subject: '', description: '', priority: 'medium' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Alert/Status states
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const parseCurrency = (val?: string) => {
    if (!val) return 0;
    return parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const invoiceOriginalPrice = selectedInvoice
    ? (selectedInvoice.course_original_price ? parseCurrency(selectedInvoice.course_original_price) : parseFloat(selectedInvoice.total) + parseFloat(selectedInvoice.discount || '0'))
    : 0;

  const invoiceDiscountPrice = selectedInvoice
    ? (selectedInvoice.course_discount_price ? parseCurrency(selectedInvoice.course_discount_price) : parseFloat(selectedInvoice.total) + parseFloat(selectedInvoice.discount || '0'))
    : 0;

  const invoiceSpecialOffer = selectedInvoice
    ? Math.max(0, invoiceOriginalPrice - invoiceDiscountPrice)
    : 0;

  const couponDiscount = selectedInvoice
    ? parseFloat(selectedInvoice.discount || '0')
    : 0;

  const totalPaid = selectedInvoice
    ? parseFloat(selectedInvoice.total)
    : 0;

  const originalCoursePrice = invoiceOriginalPrice;

  // Update active tab if defaultTab prop changes
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      Promise.resolve().then(() => {
        setActiveTab(defaultTab);
      });
    }
  }, [defaultTab, activeTab]);

  // Fetch all user information on mount with clean-up listener to avoid state updates on unmounted components
  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const data = await authService.getProfile();
        if (!isMounted) return;

        if (data.success) {
          setProfileData({
            fullName: data.user.fullName || '',
            email: data.user.email || '',
            phone: data.user.phone || ''
          });
          setSettingsData({
            emailNotifications: data.settings.emailNotifications ?? true,
            smsNotifications: data.settings.smsNotifications ?? false,
            darkMode: data.settings.darkMode ?? false
          });
          setEnrollments(data.enrollments || []);
        }

        // Fetch user raised tickets
        const ticketData = await authService.getTickets();
        if (!isMounted) return;

        if (ticketData.success) {
          setTickets(ticketData.tickets || []);
        }

        // Fetch user billing/payment history
        try {
          const billingRes = await paymentService.getHistory();
          if (billingRes.success && isMounted) {
            setPaymentHistory(billingRes.data || []);
          }
        } catch (billingErr) {
          console.warn("Failed to fetch billing history:", billingErr);
        }

        setLoading(false);
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error("Dashboard error:", err);
        const apiError = err as { error?: string };
        setActionStatus({
          type: 'error',
          message: apiError.error || 'Failed to sync with backend server. Check your connection.'
        });
        setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewInvoice = async (invoiceId: number) => {
    setInvoiceLoading(true);
    setActionStatus({ type: '', message: '' });
    try {
      const res = await paymentService.getInvoice(invoiceId);
      if (res.success && res.data) {
        setSelectedInvoice(res.data);
        setInvoiceModalOpen(true);
      }
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      console.error("View invoice error:", err);
      setActionStatus({
        type: 'error',
        message: errorObj.response?.data?.message || 'Unable to download or render invoice details.'
      });
    } finally {
      setInvoiceLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionStatus({ type: '', message: '' });
    try {
      const res = await authService.updateProfile(profileData);
      if (res.success) {
        setActionStatus({ type: 'success', message: 'Profile details updated successfully!' });
        setIsEditingProfile(false);
        setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
      }
    } catch (err: unknown) {
      const apiError = err as { error?: string };
      setActionStatus({ type: 'error', message: apiError.error || 'Failed to update profile details' });
    }
  };

  const handleSaveSettings = async () => {
    setActionStatus({ type: '', message: '' });
    try {
      const res = await authService.updateSettings(settingsData);
      if (res.success) {
        setActionStatus({ type: 'success', message: 'Preferences saved successfully!' });
        setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
      }
    } catch (err: unknown) {
      const apiError = err as { error?: string };
      setActionStatus({ type: 'error', message: apiError.error || 'Failed to save settings' });
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionStatus({ type: '', message: '' });

    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) {
      setActionStatus({ type: 'error', message: 'Please provide both a subject and details for your ticket.' });
      return;
    }

    try {
      const res = await authService.createTicket(ticketForm);
      if (res.success) {
        setActionStatus({ type: 'success', message: 'Support ticket raised successfully!' });
        setTicketForm({ subject: '', description: '', priority: 'medium' });
        // Refresh tickets list
        const updatedTickets = await authService.getTickets();
        if (updatedTickets.success) {
          setTickets(updatedTickets.tickets || []);
        }
        setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
      }
    } catch (err: unknown) {
      const apiError = err as { error?: string };
      setActionStatus({ type: 'error', message: apiError.error || 'Failed to submit support ticket.' });
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-heading font-black text-navy text-lg uppercase tracking-widest">Configuring Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-cream font-sans relative overflow-hidden mesh-grid">

      {/* Dynamic Fluid Kinetic Background Blur Spheres */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-primary/10 rounded-full blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.85, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-accent/15 rounded-full blur-[110px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Top Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 lg:p-10 shadow-premium flex flex-col lg:flex-row items-center justify-between gap-8 mb-8 relative overflow-hidden"
        >
          {/* Decorative absolute subtle glow inside the header */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full lg:w-auto">
            {/* Avatar with slowly rotating gradient halo */}
            <div className="relative group shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-[24px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              />
              <div className="relative w-20 h-20 bg-gradient-to-tr from-primary via-secondary to-accent rounded-[22px] flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <FiUser size={38} className="stroke-[2]" />
              </div>
              {/* Pulsing Active indicator */}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-primary/70 uppercase tracking-[0.2em] block">
                    {getTimeGreeting()},
                  </span>
                  <h1 className="text-3xl font-heading font-black text-navy tracking-tight leading-tight">
                    {profileData.fullName || 'Registered Student'}
                  </h1>
                </div>
                <span className="self-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100/50 flex items-center gap-1.5 shadow-sm shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Student
                </span>
              </div>
              <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2 justify-center sm:justify-start">
                <FiMail size={12} className="text-primary/70" /> {profileData.email}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="z-10 flex items-center gap-3 px-6 py-3.5 border border-red-200/60 text-red-500 bg-white/80 backdrop-blur-sm font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300 ease-out"
          >
            <FiLogOut size={15} /> Logout Account
          </motion.button>
        </motion.div>

        {/* --- DYNAMIC STATS OVERVIEW PANEL --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8"
        >
          {/* Stat 1: Active Courses */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-sweep bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-soft hover:shadow-premium hover:border-primary/20 transition-all duration-300 flex items-center gap-5 relative overflow-hidden cursor-default group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-300 shadow-inner shrink-0">
              <FiBookOpen size={24} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 z-10">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest block">Academic Footprint</span>
              <span className="text-2xl font-heading font-black text-navy block leading-none">
                {enrollments.length} {enrollments.length === 1 ? 'Course' : 'Courses'}
              </span>
              <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                <FiActivity className="text-emerald-500" /> 100% Verified Enrolled
              </span>
            </div>
          </motion.div>

          {/* Stat 2: Invested Tuition */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-sweep bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-soft hover:shadow-premium hover:border-accent/20 transition-all duration-300 flex items-center gap-5 relative overflow-hidden cursor-default group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-300 shadow-inner shrink-0">
              <FiCreditCard size={24} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 z-10">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest block">Tuition Invested</span>
              <span className="text-2xl font-heading font-black text-navy block leading-none">
                ₹{paymentHistory
                  .filter(p => p.status === 'captured')
                  .reduce((sum, item) => sum + parseFloat(item.amount), 0)
                  .toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-primary font-bold flex items-center gap-1 mt-1">
                <IoSparklesOutline className="text-primary animate-pulse" /> Invoiced & Secured
              </span>
            </div>
          </motion.div>

          {/* Stat 3: Help Tickets */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-sweep bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-soft hover:shadow-premium hover:border-secondary/20 transition-all duration-300 flex items-center gap-5 relative overflow-hidden cursor-default group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-300 shadow-inner shrink-0">
              <FiLifeBuoy size={24} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 z-10">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest block">Support Cases</span>
              <span className="text-2xl font-heading font-black text-navy block leading-none">
                {tickets.filter(t => t.status === 'open').length} Active
              </span>
              <span className="text-[9px] text-navy/50 font-bold flex items-center gap-1 mt-1">
                <FiAward className="text-navy/40" /> {tickets.length} total tickets raised
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Global Notification Banner */}
        <AnimatePresence>
          {actionStatus.message && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-5 rounded-2xl mb-8 flex items-center gap-4 ${actionStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200/50 text-emerald-700' : 'bg-red-50 border border-red-200/50 text-red-700'}`}
            >
              {actionStatus.type === 'success' ? <FiCheckCircle size={22} className="shrink-0" /> : <FiAlertCircle size={22} className="shrink-0" />}
              <span className="font-bold text-sm leading-relaxed">{actionStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8">

          {/* Active Tab Screen */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 lg:p-10 shadow-premium min-h-[450px] relative overflow-hidden"
              >
                {/* --- MODULE 1: STUDENT PROFILE DETAILS --- */}
                {activeTab === 'profile' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-gray-100 pb-5">
                      <div>
                        <h2 className="text-2xl font-heading font-black text-navy">Personal Profile</h2>
                        <p className="text-navy/40 font-bold text-xs uppercase tracking-widest mt-1">Manage details linked to your account</p>
                      </div>
                      {!isEditingProfile ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditingProfile(true)}
                          className="px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors duration-300"
                        >
                          Edit Details
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100/50">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Editing Mode</span>
                        </div>
                      )}
                    </motion.div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Full Name</label>
                          <motion.div
                            animate={{
                              scale: isEditingProfile ? 1.015 : 1,
                              borderColor: isEditingProfile ? 'rgba(7, 90, 151, 0.3)' : 'rgba(3, 43, 82, 0.08)',
                              backgroundColor: isEditingProfile ? '#ffffff' : 'rgba(248, 250, 252, 0.7)',
                              boxShadow: isEditingProfile ? '0 10px 30px -5px rgba(7, 90, 151, 0.1)' : 'none'
                            }}
                            className="relative transition-all duration-300 rounded-[20px] border-2 flex items-center bg-white"
                          >
                            <div className={`absolute left-5 transition-colors duration-300 ${isEditingProfile ? 'text-primary' : 'text-navy/30'}`}>
                              <FiUser size={18} />
                            </div>
                            <input
                              type="text"
                              required
                              disabled={!isEditingProfile}
                              value={profileData.fullName}
                              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                              className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-transparent outline-none font-bold text-navy text-sm disabled:text-navy/70 cursor-text disabled:cursor-not-allowed transition-all"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                          <motion.div
                            animate={{
                              scale: isEditingProfile ? 1.015 : 1,
                              borderColor: isEditingProfile ? 'rgba(7, 90, 151, 0.3)' : 'rgba(3, 43, 82, 0.08)',
                              backgroundColor: isEditingProfile ? '#ffffff' : 'rgba(248, 250, 252, 0.7)',
                              boxShadow: isEditingProfile ? '0 10px 30px -5px rgba(7, 90, 151, 0.1)' : 'none'
                            }}
                            className="relative transition-all duration-300 rounded-[20px] border-2 flex items-center bg-white"
                          >
                            <div className={`absolute left-5 transition-colors duration-300 ${isEditingProfile ? 'text-primary' : 'text-navy/30'}`}>
                              <FiMail size={18} />
                            </div>
                            <input
                              type="email"
                              required
                              disabled={!isEditingProfile}
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-transparent outline-none font-bold text-navy text-sm disabled:text-navy/70 cursor-text disabled:cursor-not-allowed transition-all"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em] ml-1">Mobile Contact</label>
                          <motion.div
                            animate={{
                              scale: isEditingProfile ? 1.015 : 1,
                              borderColor: isEditingProfile ? 'rgba(7, 90, 151, 0.3)' : 'rgba(3, 43, 82, 0.08)',
                              backgroundColor: isEditingProfile ? '#ffffff' : 'rgba(248, 250, 252, 0.7)',
                              boxShadow: isEditingProfile ? '0 10px 30px -5px rgba(7, 90, 151, 0.1)' : 'none'
                            }}
                            className="relative transition-all duration-300 rounded-[20px] border-2 flex items-center bg-white"
                          >
                            <div className={`absolute left-5 transition-colors duration-300 ${isEditingProfile ? 'text-primary' : 'text-navy/30'}`}>
                              <FiPhone size={18} />
                            </div>
                            <input
                              type="tel"
                              disabled={!isEditingProfile}
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              placeholder="e.g. +91 74182 40526"
                              className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-transparent outline-none font-bold text-navy text-sm disabled:text-navy/70 cursor-text disabled:cursor-not-allowed transition-all"
                            />
                          </motion.div>
                        </motion.div>
                      </div>

                      {isEditingProfile && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-4 pt-4"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex items-center gap-3 px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary/20 hover:opacity-95"
                          >
                            <FiSave size={16} /> Save Changes
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => {
                              setIsEditingProfile(false);
                              setActionStatus({ type: '', message: '' });
                            }}
                            className="px-6 py-4 border border-navy/10 text-navy/60 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-navy/5 transition-all"
                          >
                            Cancel
                          </motion.button>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}

                {/* --- MODULE 2: DYNAMIC ENROLLED COURSES --- */}
                {activeTab === 'courses' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-heading font-black text-navy">Active Course Enrollments</h2>
                      <p className="text-navy/40 font-bold text-xs uppercase tracking-widest mt-1">Dynamic view of your enrolled batches</p>
                    </motion.div>

                    {enrollments.length === 0 ? (
                      <motion.div variants={itemVariants} className="py-16 text-center border-2 border-dashed border-navy/10 rounded-3xl flex flex-col items-center">
                        <FiBookOpen size={48} className="text-navy/20 mb-4 animate-bounce" />
                        <h4 className="font-heading font-black text-navy/70 text-lg mb-2">No active enrollments found</h4>
                        <p className="text-navy/40 font-bold text-xs max-w-sm leading-relaxed mb-6">You are not currently enrolled in any professional batches. Visit the course catalog to get started!</p>
                        <a
                          href="/courses"
                          className="px-8 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md shadow-primary/10 hover:scale-105 transition-all"
                        >
                          Explore Batches
                        </a>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {enrollments.map((course) => {
                          // Dynamic progress percentage based on enrollment details
                          const mockProgress = course.status === 'completed' ? 100 : ((course.enrollment_id % 4) * 15 + 40);
                          return (
                            <motion.div
                              key={course.enrollment_id}
                              variants={itemVariants}
                              whileHover={{ y: -8, scale: 1.015 }}
                              className="glass-sweep group bg-white/70 border border-white/50 hover:bg-white rounded-[24px] p-6 shadow-soft hover:shadow-premium transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                            >
                              <div className="flex gap-5 z-10">
                                <div className="relative shrink-0 overflow-hidden rounded-2xl w-24 h-24 shadow-sm group-hover:shadow-md transition-shadow">
                                  <img
                                    src={course.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80'}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                  />
                                </div>
                                <div className="space-y-2 flex-grow">
                                  <h3 className="font-heading font-black text-navy text-sm md:text-base leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                                  <p className="text-navy/40 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                                    <FiCalendar size={11} className="text-primary/60" /> {course.duration}
                                  </p>
                                  <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${course.status === 'approved' || course.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50'
                                    : 'bg-amber-50 text-amber-600 border border-amber-100/50'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.status === 'approved' || course.status === 'active'
                                      ? 'bg-emerald-500'
                                      : 'bg-amber-500'
                                      } ${course.status === 'approved' || course.status === 'active' ? 'animate-pulse' : ''}`} />
                                    {course.status}
                                  </span>
                                </div>
                              </div>

                              {/* Interactive Progress Bar */}
                              <div className="mt-5 space-y-2 z-10">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-black text-navy/40 uppercase tracking-wider">Course Progress</span>
                                  <span className="font-black text-primary font-mono">{mockProgress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-navy/5 rounded-full overflow-hidden relative border border-white">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${mockProgress}%` }}
                                    transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.15 }}
                                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full relative"
                                  >
                                    {/* Glowing tip */}
                                    {mockProgress < 100 && (
                                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full glow-progress-tip" />
                                    )}
                                  </motion.div>
                                </div>
                                <div className="flex justify-between items-center text-[9px] text-navy/50 font-bold">
                                  <span>{Math.round(mockProgress * 0.1)} of 10 modules completed</span>
                                  <span>{100 - mockProgress}% remaining</span>
                                </div>
                              </div>

                              <div className="mt-5 pt-4 border-t border-navy/5 flex justify-between items-center z-10">
                                <span className="text-primary font-black text-sm md:text-base tracking-tight">{course.price}</span>
                                <motion.a
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  href={`/learn/${course.course_id}`}
                                  className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center gap-1"
                                >
                                  Resume Course <FiChevronRight size={10} className="stroke-[3]" />
                                </motion.a>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* --- MODULE 3: SUPPORT TICKET RAISING --- */}
                {activeTab === 'tickets' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-heading font-black text-navy">Student Support Center</h2>
                      <p className="text-navy/40 font-bold text-xs uppercase tracking-widest mt-1">Submit tickets to counselors and mentors</p>
                    </motion.div>

                    <motion.form
                      variants={itemVariants}
                      onSubmit={handleRaiseTicket}
                      className="bg-white/40 border border-white/50 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-soft space-y-5"
                    >
                      <h3 className="font-heading font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2 border-b border-navy/5 pb-3">
                        <FiPlusCircle size={16} className="text-primary" /> Raise Support Case
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.15em] ml-1 mb-1 block">Issue Subject *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Need assistance with python syntax installation"
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-navy/10 focus:border-primary focus:shadow-soft outline-none font-bold text-navy text-xs transition-all"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.15em] ml-1 mb-1 block">Case Priority *</label>
                          <div className="grid grid-cols-3 gap-2 bg-navy/5 p-1 rounded-2xl relative border border-navy/10 overflow-hidden">
                            {(['low', 'medium', 'high'] as const).map((level) => {
                              const isActive = ticketForm.priority === level;
                              const colors = {
                                low: 'bg-gradient-to-r from-sky-500 to-primary shadow-sky-500/20 shadow-md',
                                medium: 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/20 shadow-md',
                                high: 'bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/20 shadow-md'
                              };

                              return (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => setTicketForm({ ...ticketForm, priority: level })}
                                  className={`relative py-3 rounded-xl text-center font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-white' : 'text-navy/60 hover:text-navy hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                                >
                                  {isActive && (
                                    <motion.div
                                      layoutId="activePriorityBackground"
                                      className={`absolute inset-0 rounded-xl ${colors[level]}`}
                                      transition={{ type: "spring", stiffness: 450, damping: 24 }}
                                      style={{ zIndex: 0 }}
                                    />
                                  )}
                                  <span className="relative z-10">{level}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.15em] ml-1 mb-1 block">Describe the Request *</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Please describe what support is required. Our mentors respond within 2-4 business hours."
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                          className="w-full px-5 py-4 rounded-xl bg-white border border-navy/10 focus:border-primary focus:shadow-soft outline-none font-bold text-navy text-xs transition-all resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(7, 90, 151, 0.2)' }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
                      >
                        <FiPlusCircle size={15} /> Raise Ticket Case
                      </motion.button>
                    </motion.form>

                    <div className="space-y-4">
                      <motion.h3 variants={itemVariants} className="font-heading font-black text-navy text-sm uppercase tracking-widest">Your Ticket History</motion.h3>

                      {tickets.length === 0 ? (
                        <motion.p variants={itemVariants} className="text-center py-8 text-xs font-bold text-navy/30 bg-cream/10 border border-dashed rounded-2xl">You have no active or historical tickets raised.</motion.p>
                      ) : (
                        <div className="space-y-3.5">
                          {tickets.map((ticket, index) => (
                            <motion.div
                              key={ticket.id || index}
                              variants={itemVariants}
                              className="group p-5 bg-white/70 border border-white/50 hover:bg-white rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-soft transition-all duration-300"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <h4 className="font-heading font-black text-navy text-sm md:text-base group-hover:text-primary transition-colors">{ticket.subject}</h4>
                                  <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${ticket.priority === 'high'
                                    ? 'bg-red-50 text-red-600 border border-red-100/50 shadow-sm shadow-red-500/10'
                                    : ticket.priority === 'medium'
                                      ? 'bg-amber-50 text-amber-600 border border-amber-100/50 shadow-sm shadow-amber-500/10'
                                      : 'bg-blue-50 text-primary border border-blue-100/50 shadow-sm shadow-primary/10'
                                    }`}>
                                    {ticket.priority} priority
                                  </span>
                                </div>
                                <p className="text-navy/60 font-medium text-xs leading-relaxed max-w-xl">{ticket.description}</p>
                                <div className="flex gap-4 pt-0.5 flex-wrap">
                                  <span className="text-[10px] font-bold text-navy/40 flex items-center gap-1">
                                    <FiCalendar size={11} className="text-primary/60" /> {new Date(ticket.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </span>
                                </div>
                              </div>
                              <span className={`inline-flex self-start md:self-center px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border ${ticket.status === 'open'
                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ticket.status === 'open' ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'
                                  }`} />
                                {ticket.status}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* --- MODULE 4: ACCOUNT SETTINGS --- */}
                {activeTab === 'settings' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-heading font-black text-navy">Account Settings</h2>
                      <p className="text-navy/40 font-bold text-xs uppercase tracking-widest mt-1">Configure and customize student preferences</p>
                    </motion.div>                    <div className="space-y-6">
                      <motion.div variants={itemVariants} className="bg-white/40 border border-white/50 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-soft space-y-6">
                        <h3 className="font-heading font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2 border-b border-navy/5 pb-3">
                          <FiBell size={16} className="text-primary" /> Notifications
                        </h3>

                        <div className="flex items-center justify-between border-b border-navy/5 pb-4.5">
                          <div className="space-y-1 pr-4">
                            <h4 className="font-heading font-black text-navy text-xs uppercase tracking-wider">Email Alerts</h4>
                            <p className="text-navy/40 font-bold text-[10px] leading-relaxed">Receive updates about class schedules and batches on your email</p>
                          </div>

                          <div
                            onClick={() => setSettingsData({ ...settingsData, emailNotifications: !settingsData.emailNotifications })}
                            className={`w-14 h-7.5 rounded-full transition-all duration-300 cursor-pointer relative flex items-center px-1.5 shrink-0 ${settingsData.emailNotifications
                              ? 'bg-gradient-to-r from-primary via-secondary to-accent shadow-lg shadow-primary/15'
                              : 'bg-navy/10 border border-navy/5'
                              }`}
                          >
                            <motion.div
                              layout
                              transition={{ type: "spring", stiffness: 450, damping: 23 }}
                              className="w-5.5 h-5.5 bg-white rounded-full shadow-md relative"
                              style={{
                                marginLeft: settingsData.emailNotifications ? 'auto' : '0px'
                              }}
                            >
                              {settingsData.emailNotifications && (
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-primary font-bold">
                                  <FiCheck size={10} className="stroke-[4]" />
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1 pr-4">
                            <h4 className="font-heading font-black text-navy text-xs uppercase tracking-wider">SMS Alerts</h4>
                            <p className="text-navy/40 font-bold text-[10px] leading-relaxed">Receive direct SMS updates for placements and critical reminders</p>
                          </div>

                          <div
                            onClick={() => setSettingsData({ ...settingsData, smsNotifications: !settingsData.smsNotifications })}
                            className={`w-14 h-7.5 rounded-full transition-all duration-300 cursor-pointer relative flex items-center px-1.5 shrink-0 ${settingsData.smsNotifications
                              ? 'bg-gradient-to-r from-primary via-secondary to-accent shadow-lg shadow-primary/15'
                              : 'bg-navy/10 border border-navy/5'
                              }`}
                          >
                            <motion.div
                              layout
                              transition={{ type: "spring", stiffness: 450, damping: 23 }}
                              className="w-5.5 h-5.5 bg-white rounded-full shadow-md relative"
                              style={{
                                marginLeft: settingsData.smsNotifications ? 'auto' : '0px'
                              }}
                            >
                              {settingsData.smsNotifications && (
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-primary font-bold">
                                  <FiCheck size={10} className="stroke-[4]" />
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="bg-white/40 border border-white/50 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-soft space-y-6">
                        <h3 className="font-heading font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2 border-b border-navy/5 pb-3">
                          <FiShield size={16} className="text-primary" /> Visual & Security
                        </h3>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1 pr-4">
                            <h4 className="font-heading font-black text-navy text-xs uppercase tracking-wider">Interface Theme (Dark Mode)</h4>
                            <p className="text-navy/40 font-bold text-[10px] leading-relaxed">Toggle between elegant cream theme and low-light dark aesthetic</p>
                          </div>

                          <div
                            onClick={() => setSettingsData({ ...settingsData, darkMode: !settingsData.darkMode })}
                            className={`w-14 h-7.5 rounded-full transition-all duration-300 cursor-pointer relative flex items-center px-1.5 shrink-0 ${settingsData.darkMode
                              ? 'bg-gradient-to-r from-primary via-secondary to-accent shadow-lg shadow-primary/15'
                              : 'bg-navy/10 border border-navy/5'
                              }`}
                          >
                            <motion.div
                              layout
                              transition={{ type: "spring", stiffness: 450, damping: 23 }}
                              className="w-5.5 h-5.5 bg-white rounded-full shadow-md relative"
                              style={{
                                marginLeft: settingsData.darkMode ? 'auto' : '0px'
                              }}
                            >
                              {settingsData.darkMode && (
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-primary font-bold">
                                  <FiCheck size={10} className="stroke-[4]" />
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(7, 90, 151, 0.2)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveSettings}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-all shadow-lg"
                      >
                        <FiSave size={16} /> Save Settings
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* --- MODULE 5: BILLING & PAYMENT HISTORY --- */}
                {activeTab === 'billing' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-gray-100 pb-5">
                      <div>
                        <h2 className="text-2xl font-heading font-black text-navy">Billing & Payments</h2>
                        <p className="text-navy/40 font-bold text-xs uppercase tracking-widest mt-1"> Chronological ledger of tuition transactions </p>
                      </div>
                      {invoiceLoading && (
                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                          <Loader2 className="w-4 h-4 animate-spin" /> Retrieving invoice...
                        </div>
                      )}
                    </motion.div>                    {paymentHistory.length === 0 ? (
                      <motion.div variants={itemVariants} className="py-16 text-center border-2 border-dashed border-navy/10 rounded-3xl flex flex-col items-center">
                        <FiCreditCard size={48} className="text-navy/20 mb-4" />
                        <h4 className="font-heading font-black text-navy/70 text-lg mb-2">No billing records found</h4>
                        <p className="text-navy/40 font-bold text-xs max-w-sm leading-relaxed mb-6">
                          You haven't initiated any payment checkouts yet. Enrolling in courses generates full invoices here.
                        </p>
                        <a
                          href="/courses"
                          className="px-8 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md shadow-primary/10 hover:scale-105 transition-all"
                        >
                          Explore Course List
                        </a>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {paymentHistory.map((item) => (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="bg-white/70 border border-white/50 rounded-2xl p-5 hover:bg-white hover:shadow-soft transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                          >
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center border border-navy/5 text-navy/40 shrink-0">
                                <FiFileText size={22} className="stroke-[1.5]" />
                              </div>
                              <div className="space-y-1.5">
                                <h4 className="font-heading font-black text-navy text-sm md:text-base leading-tight">{item.course_title}</h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-0.5">
                                  <span className="text-[10px] font-bold text-navy/40 flex items-center gap-1">
                                    <FiCalendar size={11} className="text-primary/60" /> {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </span>
                                  <span className="text-[10px] font-bold text-navy/40 uppercase tracking-wider bg-cream border border-navy/5 px-2 py-0.5 rounded-md">
                                    ID: {item.razorpay_order_id.replace('order_', '')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t border-navy/5 pt-4 md:border-t-0 md:pt-0 shrink-0">
                              <div className="text-left md:text-right space-y-1">
                                <span className="text-navy font-black text-base md:text-lg block leading-none">
                                  ₹{parseFloat(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                                <span className={`inline-flex px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider border ${item.status === 'captured'
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  : item.status === 'failed'
                                    ? 'bg-red-50 text-red-600 border-red-100'
                                    : 'bg-blue-50 text-blue-600 border-blue-100'
                                  }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === 'captured'
                                    ? 'bg-emerald-500'
                                    : item.status === 'failed'
                                      ? 'bg-red-500'
                                      : 'bg-blue-500'
                                    }`} />
                                  {item.status}
                                </span>
                              </div>

                              {item.invoice_id && item.status === 'captured' && (
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleViewInvoice(item.invoice_id!)}
                                  className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                                >
                                  <FiDownload size={13} /> Download Invoice
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- CORPORATE INVOICE MODAL --- */}
      <AnimatePresence>
        {invoiceModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/80 backdrop-blur-md flex justify-center items-start p-4 md:p-6 print:p-0 print:bg-white print:backdrop-blur-none">
            {/* Styles for printing only */}
            <style>{`
              @media print {
                @page {
                  size: A4 portrait;
                  margin: 10mm 15mm;
                }
                html, body {
                  height: 100% !important;
                  overflow: hidden !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                }
                body * {
                  visibility: hidden !important;
                }
                #print-invoice-area, #print-invoice-area * {
                  visibility: visible !important;
                }
                #print-invoice-area {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  height: auto !important;
                  max-height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  box-shadow: none !important;
                  border: none !important;
                  background: white !important;
                  page-break-inside: avoid !important;
                }
                /* Compact print spacing to guarantee single-page fit */
                #print-invoice-area .p-8, 
                #print-invoice-area .md:p-12 {
                  padding: 16px !important;
                }
                #print-invoice-area .space-y-10 > * + * {
                  margin-top: 14px !important;
                }
                #print-invoice-area .pb-8 {
                  padding-bottom: 12px !important;
                }
                #print-invoice-area .pt-8 {
                  padding-top: 12px !important;
                }
                #print-invoice-area .gap-8 {
                  gap: 12px !important;
                }
                #print-invoice-area .p-6 {
                  padding: 12px !important;
                }
                #print-invoice-area .py-4 {
                  padding-top: 6px !important;
                  padding-bottom: 6px !important;
                }
                #print-invoice-area .h-28 {
                  height: 52px !important; /* Scale logo size appropriately for print page layout */
                }
                .no-print {
                  display: none !important;
                }
              }
            `}</style>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              id="print-invoice-area"
              className="relative bg-white text-navy w-full max-w-3xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden print:rounded-none print:shadow-none print:border-none my-8"
            >
              {/* Invoice Header / Actions (no-print) */}
              <div className="no-print flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 px-8 py-5 bg-navy text-white border-b border-white/10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setInvoiceModalOpen(false)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                  >
                    <FiArrowLeft size={16} /> Back to Dashboard
                  </button>
                  <div className="hidden md:flex flex-col border-l border-white/10 pl-4">
                    <h3 className="font-heading font-black text-[10px] uppercase tracking-widest text-white/50 leading-none">Invoice</h3>
                    <p className="font-heading font-bold text-xs mt-1 text-white/80">{selectedInvoice.invoice_number}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => window.print()}
                    className="p-2.5 bg-white/10 hover:bg-primary rounded-xl text-white transition-all flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
                    title="Print Invoice"
                  >
                    <FiPrinter size={14} /> Print
                  </button>
                  <button
                    onClick={() => setInvoiceModalOpen(false)}
                    className="p-2.5 bg-white/10 hover:bg-red-500 rounded-xl text-white transition-all"
                    title="Close"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              </div>

              {/* Invoice Body Content */}
              <div className="p-8 md:p-12 space-y-10">
                {/* Corporate and Brand Details */}
                <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-navy/5 pb-8">
                  <div className="space-y-3">
                    <img src="/ascopetech_logo.png" alt="Ascope Tech Logo" className="h-28 w-auto object-contain" />
                    <p className="text-[11px] font-bold text-navy/50 max-w-xs leading-relaxed uppercase tracking-wider">
                      Ascope Tech Pvt Ltd<br />
                      5th floor, SBRR Square, Anna Nagar<br />
                      Trichy - 620017
                    </p>
                  </div>

                  <div className="md:text-right space-y-2 flex flex-col md:items-end">
                    <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                      PAID & CAPTURED
                    </span>
                    <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest leading-none pt-1">Invoice Receipt</p>
                    <h2 className="text-xl font-heading font-black text-navy leading-tight">{selectedInvoice.invoice_number}</h2>
                    <p className="text-[10px] font-bold text-navy/60">
                      Date: {new Date(selectedInvoice.created_at || new Date()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Billing & Transaction Metadata Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-cream/40 rounded-2xl p-6 border border-navy/5">
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Billed To (Student)</h4>
                    <div className="space-y-1">
                      <p className="font-heading font-black text-navy text-sm">
                        {(() => {
                          const billing = selectedInvoice.billing_details;
                          if (!billing) return selectedInvoice.user_name || 'Registered Student';
                          const details = typeof billing === 'string' ? JSON.parse(billing) : billing;
                          return details.fullName || selectedInvoice.user_name || 'Registered Student';
                        })()}
                      </p>
                      <p className="text-xs font-bold text-navy/60 flex items-center gap-1.5">
                        <FiMail size={12} className="text-navy/40" />
                        {(() => {
                          const billing = selectedInvoice.billing_details;
                          if (!billing) return selectedInvoice.user_email;
                          const details = typeof billing === 'string' ? JSON.parse(billing) : billing;
                          return details.email || selectedInvoice.user_email;
                        })()}
                      </p>
                      {(() => {
                        const billing = selectedInvoice.billing_details;
                        if (!billing) return null;
                        const details = typeof billing === 'string' ? JSON.parse(billing) : billing;
                        return details.phone ? (
                          <p className="text-xs font-bold text-navy/60 flex items-center gap-1.5">
                            <FiPhone size={12} className="text-navy/40" />
                            {details.phone}
                          </p>
                        ) : null;
                      })()}
                    </div>
                  </div>

                  <div className="space-y-2.5 md:border-l md:border-navy/5 md:pl-8">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Payment Information</h4>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-navy/60">
                        <span className="text-navy/40 font-black uppercase tracking-wider block text-[10px]">Gateway Reference</span>
                        <span className="font-mono text-xs text-navy font-bold">{selectedInvoice.razorpay_payment_id || 'N/A'}</span>
                      </p>
                      <p className="text-xs font-bold text-navy/60 pt-1">
                        <span className="text-navy/40 font-black uppercase tracking-wider block text-[10px]">Order Reference</span>
                        <span className="font-mono text-xs text-navy font-bold">{selectedInvoice.razorpay_order_id || 'N/A'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-navy/10">
                        <th className="py-3 text-[10px] font-black uppercase tracking-widest text-navy/40 w-12">No.</th>
                        <th className="py-3 text-[10px] font-black uppercase tracking-widest text-navy/40">Description</th>
                        <th className="py-3 text-[10px] font-black uppercase tracking-widest text-navy/40 text-center w-16">Qty</th>
                        <th className="py-3 text-[10px] font-black uppercase tracking-widest text-navy/40 text-right w-32">Rate (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-navy/5">
                        <td className="py-4 font-bold text-navy/50 text-xs">01</td>
                        <td className="py-4">
                          <p className="font-heading font-black text-navy text-sm leading-tight">
                            {(() => {
                              const billing = selectedInvoice.billing_details;
                              if (!billing) return selectedInvoice.course_title || 'Expert-led Technology Masterclass';
                              const details = typeof billing === 'string' ? JSON.parse(billing) : billing;
                              return details.courseTitle || selectedInvoice.course_title || 'Expert-led Technology Masterclass';
                            })()}
                          </p>
                          <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mt-1">
                            Professional Training Course ({selectedInvoice.course_duration || 'Self-paced'})
                          </p>
                        </td>
                        <td className="py-4 text-center font-bold text-navy/60 text-xs">1</td>
                        <td className="py-4 text-right font-black text-navy text-xs">
                          ₹{originalCoursePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Calculation itemizations */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 pt-2">
                  {/* Note / T&C */}
                  <div className="text-[10px] font-bold text-navy/40 max-w-sm leading-relaxed uppercase tracking-wider space-y-1">
                    <p className="text-primary font-black">Declaration & Terms</p>
                    <p>1. Services provided are educational, auxiliary professional training.</p>
                    <p>2. This is a digital Invoice and acts as valid proof of enrollment.</p>
                  </div>

                  {/* Calculations Breakdown */}
                  <div className="w-full md:w-80 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-navy/60 border-b border-navy/5 pb-2">
                      <span>Base Original Price</span>
                      <span>₹{invoiceOriginalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>

                    {invoiceSpecialOffer > 0 && (
                      <div className="flex justify-between font-bold text-emerald-600 border-b border-navy/5 pb-2">
                        <span>Special 20% Course Offer</span>
                        <span>-₹{invoiceSpecialOffer.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-navy/70 border-b border-navy/5 pb-2">
                      <span>Course Discount Price</span>
                      <span>₹{invoiceDiscountPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex justify-between font-bold text-emerald-600 border-b border-navy/5 pb-2">
                        <span>Promo Coupon Discount</span>
                        <span>-₹{couponDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-1">
                      <span className="font-heading font-black text-navy text-sm uppercase tracking-wider">Total Paid</span>
                      <span className="font-heading font-black text-primary text-base">
                        ₹{totalPaid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Closing/Signature block */}
                <div className="border-t border-navy/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                  <div className="space-y-1">
                    <p className="font-heading font-black text-navy text-xs tracking-tight">ASCOPE TECH PVT LTD</p>
                    <p className="text-[9px] font-bold text-navy/40 uppercase tracking-widest">Digital Invoice Authority - Automated Verification</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[9px] font-bold text-navy/40 uppercase tracking-widest max-w-xs leading-normal">
                      This invoice is cryptographically secured & fully verified. No physical signature is required.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
