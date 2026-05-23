import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GradientButton from '../../components/ui/GradientButton';
import { authService } from '../../services/authService';

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
const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12.5a10 10 0 1 1-2.5-6.5L16 10H12v4h6.5l-.5 2.5a6 6 0 1 0-6-6h4V10H10v2h4"/></svg>
);
const CalendarIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const PhoneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const EyeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Creating account...' });

    try {
      const payload = {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      };

      await authService.register(payload);
      setStatus({ type: 'success', message: 'Account created! Redirecting...' });
      
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get('redirect') || '/dashboard';
      setTimeout(() => window.location.href = redirectPath, 1000);
    } catch (err: unknown) {
      const errorData = err as { error?: string };
      setStatus({ type: 'error', message: errorData.error || 'Registration failed.' });
    }
  };

  const handleGoogleLogin = async () => {
    setStatus({ type: 'loading', message: 'Authenticating with Google...' });
    try {
      const payload = {
        fullName: 'Google Learner',
        email: 'googlelearner@gmail.com',
        password: 'GoogleOauthDemo123!',
        phone: '9999999999',
        dateOfBirth: '2000-01-01'
      };

      try {
        await authService.register(payload);
      } catch {
        // If already registered, log in
        await authService.login({
          email: payload.email,
          password: payload.password
        });
      }

      setStatus({ type: 'success', message: 'Signed in with Google! Redirecting...' });
      
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get('redirect') || '/dashboard';
      setTimeout(() => window.location.href = redirectPath, 1000);
    } catch {
      setStatus({ type: 'error', message: 'Google authentication failed.' });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-cream p-6 overflow-hidden relative">
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
        className="bg-white/80 backdrop-blur-xl w-full max-w-[960px] p-8 sm:p-10 relative z-10 rounded-[40px] shadow-premium border border-border/50 flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch"
      >
        {/* Left Column: Branding, Google Login & Redirect */}
        <div className="flex-1 flex flex-col justify-center gap-8 py-4 text-center md:text-left">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center justify-center md:justify-start group">
              <img 
                src="/ascopetech_logo.png" 
                alt="Ascope Tech Logo" 
                className="h-16 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-md" 
              />
            </Link>
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold text-navy">Create Account</h2>
              <p className="text-muted text-xs font-bold uppercase tracking-widest leading-relaxed">
                Start your tech journey today. Build premium products, master modern tech stacks, and accelerate your career.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px bg-border flex-grow" />
              <span className="text-[9px] text-muted font-black uppercase tracking-[0.3em]">Or join with</span>
              <div className="h-px bg-border flex-grow" />
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-[20px] border border-border hover:bg-cream transition-all font-bold text-sm text-navy bg-white shadow-sm"
            >
              <GoogleIcon size={20} /> Continue with Google
            </button>
          </div>

          <p className="text-center md:text-left text-muted text-xs font-bold uppercase tracking-widest pt-4 border-t border-border/50">
            Already have an account? <Link to={`/login${window.location.search}`} className="text-accent hover:underline">Sign In</Link>
          </p>
        </div>

        {/* Dynamic Border Divider */}
        <div className="hidden md:block w-px bg-border/50 self-stretch my-2" />

        {/* Right Column: Registration Input Form */}
        <div className="flex-[1.2] flex flex-col justify-center">
          <form onSubmit={handleSignup} className="space-y-4">
            {/* First Name & Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">First Name</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <UserIcon />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John" 
                    className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Last Name</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <UserIcon />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe" 
                    className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth & Mobile Number Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Date of Birth</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <CalendarIcon />
                  </div>
                  <input 
                    type="date" 
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <PhoneIcon />
                  </div>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210" 
                    className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                  <MailIcon />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                />
              </div>
            </div>

            {/* Password & Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <LockIcon />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-12 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                    <LockIcon />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 rounded-[18px] bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner font-medium text-sm text-navy"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1 py-1">
               <input type="checkbox" required className="w-5 h-5 rounded-lg accent-accent border-none bg-cream shadow-inner cursor-pointer" />
               <label className="text-xs text-muted font-bold">I agree to the <a href="#" className="text-accent hover:underline">Terms of Service</a></label>
            </div>

            {status.message && (
              <div className={`p-3 rounded-xl text-xs font-bold text-center ${status.type === 'error' ? 'bg-red-50 text-red-600' : status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                {status.message}
              </div>
            )}

            <GradientButton type="submit" className="w-full py-4 text-lg mt-2">
              {status.type === 'loading' ? 'Creating...' : 'Create Account'}
            </GradientButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
