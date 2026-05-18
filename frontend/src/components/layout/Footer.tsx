import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Sleek, high-quality, brand-accurate WhatsappIcon inline SVG
const WhatsappIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 overflow-hidden relative">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-6 col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                src="/src/assets/ascopetech_logo.png"
                alt="Ascope Tech Logo"
                className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(23,181,231,0.2)]"
              />
              <span className="text-2xl font-heading font-black text-white tracking-tight">
                Ascope <span className="text-accent">Tech</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs font-body text-sm">
              Empowering the next generation of tech leaders through industry-ready courses and expert mentorship since 2018.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { Icon: Instagram, color: "hover:bg-[#E4405F] hover:border-[#E4405F]", href: "#" },
                { Icon: WhatsappIcon, color: "hover:bg-[#25D366] hover:border-[#25D366]", href: "https://wa.me/917418240526" },
                { Icon: Facebook, color: "hover:bg-[#1877F2] hover:border-[#1877F2]", href: "#" },
                { Icon: Linkedin, color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]", href: "#" },
                { Icon: Mail, color: "hover:bg-[#EA4335] hover:border-[#EA4335]", href: "mailto:ascopetech@gmail.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white ${social.color} hover:scale-110 transition-all border border-white/10 group`}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-heading font-black text-white mb-8 border-l-4 border-accent pl-4 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {['Courses', 'Trainers', 'Placements', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-accent hover:pl-2 transition-all flex items-center gap-2 font-bold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
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
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-heading font-black text-white mb-8 border-l-4 border-accent pl-4 uppercase tracking-widest text-xs">Contact Info</h4>
            <div className="space-y-6">
              <div className="flex gap-4 text-white/60 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={20} />
                </div>
                <span className="text-sm">5th floor, SBRR Square,<br />Anna Nagar, Trichy – 620017</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                  <Phone size={20} />
                </div>
                <span className="text-sm">+91 74182 40526</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent shrink-0">
                  <Mail size={20} />
                </div>
                <span className="text-sm">ascopetech@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
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
