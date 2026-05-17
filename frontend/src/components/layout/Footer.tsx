import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-20 p-10 lg:p-16 mb-20 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl font-heading font-black mb-4">Subscribe to our newsletter</h3>
            <p className="text-white/60">Get the latest updates, course announcements and career tips directly in your inbox.</p>
          </div>
          <div className="flex w-full lg:w-[450px] gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/10 border border-white/10 rounded-xl px-5 outline-none focus:border-accent transition-all text-white"
            />
            <button className="premium-button px-8 py-3 rounded-xl font-black transition-all shadow-xl">
              Join Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex flex-col items-start gap-3">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                src="/src/assets/ascopetech_logo.png" 
                alt="Ascope Tech Logo" 
                className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(23,181,231,0.2)]" 
              />
              <span className="text-2xl font-heading font-black text-white tracking-tight -mt-10">
                Ascope <span className="text-accent">Tech</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs font-body">
              Empowering the next generation of tech leaders through industry-ready courses and expert mentorship since 2018.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, color: "hover:bg-[#1877F2]", brand: "#1877F2" },
                { Icon: Instagram, color: "hover:bg-[#E4405F]", brand: "#E4405F" },
                { Icon: Linkedin, color: "hover:bg-[#0A66C2]", brand: "#0A66C2" },
                { Icon: Youtube, color: "hover:bg-[#FF0000]", brand: "#FF0000" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white ${social.color} hover:scale-110 transition-all border border-white/10 group`}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-white mb-8 border-l-4 border-accent pl-4 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Courses', 'Trainers', 'Placements', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-accent hover:pl-2 transition-all flex items-center gap-2 font-bold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-black text-white mb-8 border-l-4 border-accent pl-4 uppercase tracking-widest text-xs">Categories</h4>
            <ul className="space-y-4">
              {['Full Stack Dev', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-accent hover:pl-2 transition-all flex items-center gap-2 font-bold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-black text-white mb-8 border-l-4 border-accent pl-4 uppercase tracking-widest text-xs">Contact Info</h4>
            <div className="space-y-6">
              <div className="flex gap-4 text-white/60 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                   <MapPin size={20} />
                </div>
                <span className="text-sm">123 Tech Avenue, Silicon Valley, <br />California, CA 94025</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                   <Phone size={20} />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                   <Mail size={20} />
                </div>
                <span className="text-sm">hello@ascopetech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© 2026 Ascope Tech. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
