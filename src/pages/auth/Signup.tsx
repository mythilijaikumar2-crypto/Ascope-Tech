import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientButton from '../../components/ui/GradientButton';

// Custom SVG Icons
const MailIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const LockIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const UserIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);
const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12.5a10 10 0 1 1-2.5-6.5L16 10H12v4h6.5l-.5 2.5a6 6 0 1 0-6-6h4V10H10v2h4"/></svg>
);

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-cream p-6 overflow-hidden relative">
      {/* Animated Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="blur-circle w-[500px] h-[500px] bg-accent/20 -top-40 -left-40" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="blur-circle w-[400px] h-[400px] bg-navy/20 bottom-0 -right-20" 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl w-full max-w-[480px] p-12 lg:p-16 relative z-10 rounded-[40px] shadow-premium border border-border/50"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <img src="/src/assets/ascopetech_logo.png" alt="Ascope Tech Logo" className="w-20 h-20 object-contain rounded-2xl shadow-xl group-hover:scale-110 transition-transform border-2 border-white" />
            <span className="text-3xl font-heading font-black text-navy tracking-tighter">Ascope<span className="text-gradient">Tech</span></span>
          </Link>
          <h2 className="text-3xl font-heading font-bold text-navy mb-3">Create Account</h2>
          <p className="text-muted text-sm font-bold uppercase tracking-widest">Start your tech journey today</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30">
                <UserIcon />
              </div>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full pl-14 pr-6 py-4 rounded-[20px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30">
                <MailIcon />
              </div>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full pl-14 pr-6 py-4 rounded-[20px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30">
                <LockIcon />
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-14 pr-6 py-4 rounded-[20px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-1 py-2">
             <input type="checkbox" className="w-5 h-5 rounded-lg accent-accent border-none bg-cream shadow-inner cursor-pointer" />
             <label className="text-xs text-muted font-bold">I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a></label>
          </div>

          <GradientButton className="w-full py-5 text-xl mt-4">
            Create Account
          </GradientButton>
        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="h-px bg-border flex-grow" />
          <span className="text-[10px] text-muted font-black uppercase tracking-[0.3em]">Or join with</span>
          <div className="h-px bg-border flex-grow" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-[20px] border border-border hover:bg-cream transition-all font-bold text-sm text-navy">
            <GoogleIcon size={20} /> Google
          </button>
          <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-[20px] border border-border hover:bg-cream transition-all font-bold text-sm text-navy">
            <GithubIcon size={20} /> GitHub
          </button>
        </div>

        <p className="text-center mt-12 text-muted text-sm font-bold uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
