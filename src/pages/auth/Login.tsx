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
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);
const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12.5a10 10 0 1 1-2.5-6.5L16 10H12v4h6.5l-.5 2.5a6 6 0 1 0-6-6h4V10H10v2h4"/></svg>
);

const Login: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-background p-6 overflow-hidden relative">
      {/* Animated Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="blur-circle w-[500px] h-[500px] bg-primary/20 -top-40 -left-40" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="blur-circle w-[400px] h-[400px] bg-secondary/20 bottom-0 -right-20" 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-[480px] p-12 lg:p-16 relative z-10 rounded-[40px] shadow-layered"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="text-3xl font-heading font-black text-primary tracking-tighter">Ascope<span className="text-secondary">Tech</span></span>
          </Link>
          <h2 className="text-3xl font-heading font-bold text-primary mb-3">Welcome Back</h2>
          <p className="text-dark/40 text-sm font-bold uppercase tracking-widest">Sign in to continue your journey</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-dark/40 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30">
                <MailIcon />
              </div>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full pl-14 pr-6 py-5 rounded-[20px] bg-background border border-transparent focus:border-secondary focus:bg-white outline-none transition-all shadow-inner font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-black text-dark/40 uppercase tracking-widest">Password</label>
              <a href="#" className="text-xs text-secondary font-black uppercase tracking-widest hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30">
                <LockIcon />
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-14 pr-6 py-5 rounded-[20px] bg-background border border-transparent focus:border-secondary focus:bg-white outline-none transition-all shadow-inner font-medium"
              />
            </div>
          </div>

          <GradientButton className="w-full py-5 text-xl shadow-layered">
            Sign In
          </GradientButton>
        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="h-px bg-dark/5 flex-grow" />
          <span className="text-[10px] text-dark/20 font-black uppercase tracking-[0.3em]">Or join with</span>
          <div className="h-px bg-dark/5 flex-grow" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-[20px] border border-dark/5 hover:bg-background transition-all font-bold text-sm text-primary">
            <GoogleIcon size={20} /> Google
          </button>
          <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-[20px] border border-dark/5 hover:bg-background transition-all font-bold text-sm text-primary">
            <GithubIcon size={20} /> GitHub
          </button>
        </div>

        <p className="text-center mt-12 text-dark/40 text-sm font-bold uppercase tracking-widest">
          No account yet? <Link to="/signup" className="text-secondary hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
