import React from 'react';
import { motion } from 'framer-motion';
import GradientButton from '../components/ui/GradientButton';

// Custom SVG Icons
const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const PhoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z"/></svg>
);
const MapPinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const SendIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);
const MessageCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
);

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-heading font-black text-navy mb-6 tracking-tighter"
          >
            Let's <span className="text-gradient">Talk</span>
          </motion.h1>
          <p className="text-text max-w-2xl mx-auto text-lg font-medium leading-relaxed">Have questions about our courses or placements? Our team is here to help you navigate your tech journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: PhoneIcon, title: "Call Support", details: "+1 (555) 000-1234", sub: "Mon-Fri, 9am - 6pm", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: MailIcon, title: "Official Email", details: "hello@ascopetech.com", sub: "24/7 Online Support", color: "text-accent", bg: "bg-lightBlue" },
              { icon: MessageCircleIcon, title: "WhatsApp Chat", details: "+1 (555) 000-5678", sub: "Instant Response", color: "text-green-600", bg: "bg-green-50" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
                className="bg-white p-8 rounded-20 shadow-soft border border-border/50 flex items-start gap-6 group hover:accent-gradient transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:bg-white transition-all`}>
                  <item.icon size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="font-bold text-text group-hover:text-white transition-colors">{item.details}</p>
                  <p className="text-xs text-muted font-bold uppercase tracking-widest group-hover:text-white/60 transition-colors mt-1">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white p-12 lg:p-16 rounded-[40px] shadow-premium border border-border/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <h3 className="text-3xl font-heading font-bold text-navy mb-10 relative z-10">Drop us a Line</h3>
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 rounded-xl bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 rounded-xl bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-muted ml-1">Inquiry Type</label>
                <select className="w-full px-6 py-4 rounded-xl bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all shadow-inner appearance-none cursor-pointer">
                  <option>Full Stack Mastery</option>
                  <option>Data Science & AI</option>
                  <option>UI/UX Design</option>
                  <option>Placement Support</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-muted ml-1">Your Message</label>
                <textarea 
                  rows={5} 
                  placeholder="Tell us how we can help you..." 
                  className="w-full px-6 py-4 rounded-xl bg-cream border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none shadow-inner"
                ></textarea>
              </div>
              <GradientButton className="w-full flex items-center justify-center gap-3 py-5 text-lg">
                <SendIcon /> Send Message
              </GradientButton>
            </form>
          </motion.div>
        </div>

        {/* Global Offices */}
        <div className="mt-32 relative">
           <div className="bg-navy rounded-[40px] p-16 lg:p-24 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                 <div>
                    <h2 className="text-4xl font-heading font-bold mb-8">Our Global <br />Headquarters</h2>
                    <p className="text-white/70 text-lg mb-10 leading-relaxed">Located at the heart of innovation, our offices are designed to foster creativity and collaboration. Visit us to experience the Ascope Tech culture.</p>
                    <div className="flex items-start gap-5">
                       <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                          <MapPinIcon />
                       </div>
                       <div>
                          <p className="font-bold text-xl">Silicon Valley, CA</p>
                          <p className="text-white/60">123 Tech Avenue, Suite 500 <br />Palo Alto, California 94025</p>
                       </div>
                    </div>
                 </div>
                 <div className="h-[400px] rounded-20 overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.2172291522!2d-122.15130701198533!3d37.41331444145766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sPalo%20Alto%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
