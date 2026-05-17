import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Youtube
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });
    
    try {
      const res = await fetch('http://localhost:5002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans relative overflow-hidden">
      
      {/* Optimized Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg className="absolute top-0 w-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H1440V400C1440 400 1100 600 720 400C340 200 0 400 0 400V0Z" fill="#dddddd" />
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
             Thank you for your interest in our services. Please fill out the form below or email us at <span className="text-primary font-bold">ascopetech@gmail.com</span> and we will get back to you promptly.
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
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white shadow-premium rounded-[60px] border border-border/50 flex flex-col items-center justify-center p-10 will-change-transform"
                  >
                     <motion.div 
                       animate={{ scale: [1, 1.05, 1] }}
                       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                       className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8"
                     >
                        <Mail size={64} />
                     </motion.div>

                     <div className="space-y-4 text-center w-full max-w-[200px]">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-3 bg-sky rounded-full mx-auto" style={{ width: i === 1 ? "100%" : i === 2 ? "70%" : "85%", opacity: 1 - i * 0.2 }} />
                        ))}
                     </div>

                     <div className="flex gap-4 mt-8">
                       {[
                         { Icon: Facebook, color: "hover:bg-[#1877F2]", brand: "#1877F2" },
                         { Icon: Instagram, color: "hover:bg-[#E4405F]", brand: "#E4405F" },
                         { Icon: Linkedin, color: "hover:bg-[#0A66C2]", brand: "#0A66C2" },
                         { Icon: Youtube, color: "hover:bg-[#FF0000]", brand: "#FF0000" }
                       ].map((social, idx) => (
                         <motion.a 
                           key={idx}
                           href="#"
                           whileHover={{ y: -5, scale: 1.1 }}
                           className={`w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-navy/40 ${social.color} hover:text-white hover:border-transparent transition-all shadow-sm group`}
                         >
                           <social.Icon size={24} />
                         </motion.a>
                       ))}
                     </div>
                  </motion.div>
               </div>
            </motion.div>

            <div className="space-y-8 pl-4 lg:pl-10">
               <h3 className="text-3xl font-black text-navy tracking-tight mb-8">Get in touch</h3>
               <div className="space-y-6">
                  {[
                    { icon: Phone, value: '+91 97894 44431' },
                    { icon: Mail, value: 'ascopetech@gmail.com' },
                    { icon: MapPin, value: '5th floor, SBRR Square, Anna Nagar, Trichy' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon size={20} />
                      </div>
                      <span className="text-navy/70 font-bold tracking-tight">{item.value}</span>
                    </div>
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
            <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-premium border border-border/30 relative">
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
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20"
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute left-6 top-8 text-navy/20 group-focus-within:text-primary transition-colors">
                      <MessageSquare size={20} />
                    </div>
                    <textarea 
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full pl-16 pr-8 py-6 rounded-3xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy placeholder:text-navy/20 resize-none"
                    ></textarea>
                  </div>

                  {status.message && (
                    <div className={`p-4 rounded-xl text-xs font-black text-center ${status.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {status.message}
                    </div>
                  )}

                  <motion.button 
                    type="submit" 
                    disabled={status.type === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group"
                  >
                    <span>{status.type === 'loading' ? 'Sending...' : 'SEND MESSAGE'}</span>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7180234791336!2d78.6842777!3d10.8328659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50777777777%3A0x7777777777777777!2sSBRR%20Square%2C%20Anna%20Nagar%2C%20Tennur%2C%20Trichy!5e0!3m2!1sen!2sin!4v1715880000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ascope Tech Trichy Campus"
              ></iframe>
            </div>
            
            <div className="absolute bottom-12 left-12 right-12 lg:right-auto lg:w-96 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-border/50 shadow-xl flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
               </div>
               <div>
                  <h5 className="font-black text-navy text-sm uppercase tracking-widest">Visit our Campus</h5>
                  <p className="text-navy/60 text-xs font-medium">Anna Nagar, Tennur, Trichy – 620017</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
