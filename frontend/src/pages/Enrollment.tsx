import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const Enrollment: React.FC = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', courseId: courseId || '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [courseName, setCourseName] = useState<string>('');

  useEffect(() => {
    if (courseId) {
      api.get(`/courses/${courseId}`)
        .then(res => {
          if (res.data.success && res.data.data) {
            setCourseName(res.data.data.title);
          } else if (res.data.data) {
            setCourseName(res.data.data.title);
          }
        })
        .catch(err => {
          console.error("Error fetching course details:", err);
        });
    }
  }, [courseId]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if phone number is exactly 10 digits
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setStatus({ type: 'error', message: 'Phone number must be exactly 10 digits.' });
      return;
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Processing enrollment...' });

    try {
      const res = await api.post('/enroll', formData);
      if (res.data.success) {
        setStatus({ type: 'success', message: res.data.message });
      } else {
        setStatus({ type: 'error', message: res.data.message || 'Enrollment failed.' });
      }
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string; error?: string } } };
      setStatus({ 
        type: 'error', 
        message: axiosError.response?.data?.message || axiosError.response?.data?.error || 'Network error. Please try again.' 
      });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-sky min-h-screen font-sans relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center lg:text-left">
           <Link to="/courses" className="inline-flex items-center gap-2 text-navy/40 font-black text-xs uppercase tracking-widest hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Courses
           </Link>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl lg:text-7xl font-heading font-black text-navy leading-[0.9] tracking-tighter"
           >
             Secure Your <br />
             <span className="text-gradient">Future.</span>
           </motion.h1>
           <p className="text-navy/60 text-lg font-medium mt-6">
             {courseName ? 'Complete your registration for:' : 'Complete your registration to join the next batch of elite tech professionals.'}
             {courseName && <span className="text-primary font-black block text-2xl mt-2 tracking-tight">{courseName}</span>}
           </p>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white p-10 lg:p-14 rounded-[48px] shadow-premium border border-white relative overflow-hidden"
        >
          {status.type === 'success' ? (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black text-navy mb-4 tracking-tight">Enrollment Successful!</h3>
              <p className="text-navy/60 text-lg mb-10">{status.message}</p>
              <Link to="/courses">
                <button className="px-10 py-5 bg-navy text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-navy/20">
                  Explore More Courses
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleEnroll} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-navy/30 uppercase tracking-widest ml-2">Selected Course</label>
                  <input 
                    type="text" 
                    readOnly
                    value={courseName ? `${courseName} (ID: ${formData.courseId})` : `Course ID: ${formData.courseId}`}
                    className="w-full px-7 py-4 rounded-2xl bg-sky/20 border-2 border-transparent text-navy/40 font-black outline-none cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-navy/30 uppercase tracking-widest ml-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full px-7 py-4 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium text-navy" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-navy/30 uppercase tracking-widest ml-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full px-7 py-4 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium text-navy" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-navy/30 uppercase tracking-widest ml-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) {
                        setFormData({...formData, phone: val});
                      }
                    }}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="w-full px-7 py-4 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium text-navy" 
                  />
                </div>
              </div>

              {status.message && (
                <div className={`p-5 rounded-2xl text-sm font-bold text-center ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="w-full py-6 bg-navy text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-navy/20 active:scale-[0.98]"
              >
                {status.type === 'loading' ? 'Processing...' : 'Complete Enrollment'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Enrollment;
