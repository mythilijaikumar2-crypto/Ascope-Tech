import React from 'react';
import { Link } from 'react-router-dom';

// Custom SVG Icons
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.1-3 2.4c1.1.8 2 1.8 2 3-.3 1.5-1.7 2.6-3.3 2.1-.2.4-.4.8-.6 1.1C15.4 14.4 13.5 15 11.5 15c-1.1 0-2.1-.2-3-.6.5.1 1.1.2 1.6.2 1.3 0 2.5-.4 3.5-1.1-1.2 0-2.3-.8-2.7-1.9.2 0 .3.1.5.1.3 0 .5 0 .8-.1-1.3-.3-2.2-1.4-2.2-2.7 0-.1 0-.1 0-.2.4.2.8.3 1.3.3-1.1-.7-1.5-2-1-3.1 1.3 1.6 3.1 2.7 5.2 2.8-.1-.4-.1-.8-.1-1.2 0-2 1.6-3.7 3.7-3.7 1.1 0 2.1.5 2.7 1.2.9-.2 1.7-.5 2.5-.9-.3.9-1 1.6-1.7 2.1.8-.1 1.6-.3 2.3-.6-.5.8-1.1 1.5-1.8 2.1z"/></svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const MailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const PhoneIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z"/></svg>
);
const MapPinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -ml-32 -mb-32" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-20 p-10 lg:p-16 mb-20 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl font-heading font-bold mb-4">Subscribe to our newsletter</h3>
            <p className="text-white/60">Get the latest updates, course announcements and career tips directly in your inbox.</p>
          </div>
          <div className="flex w-full lg:w-[450px] gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/10 border border-white/10 rounded-xl px-5 outline-none focus:border-secondary transition-all"
            />
            <button className="bg-secondary hover:bg-accent text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl">
              Join Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                A
              </div>
              <span className="text-2xl font-heading font-bold text-white tracking-tight">
                Ascope <span className="text-secondary">Tech</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Empowering the next generation of tech leaders through industry-ready courses and expert mentorship since 2018.
            </p>
            <div className="flex gap-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, idx) => (
                <a key={idx} href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-secondary hover:scale-110 transition-all border border-white/10">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-8 border-l-4 border-secondary pl-4">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Courses', 'Trainers', 'Placements', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-secondary hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/30" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-8 border-l-4 border-secondary pl-4">Categories</h4>
            <ul className="space-y-4">
              {['Full Stack Dev', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-secondary hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/30" /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-8 border-l-4 border-secondary pl-4">Contact Info</h4>
            <div className="space-y-6">
              <div className="flex gap-4 text-white/60 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                   <MapPinIcon size={20} />
                </div>
                <span className="text-sm">123 Tech Avenue, Silicon Valley, <br />California, CA 94025</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                   <PhoneIcon size={20} />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex gap-4 text-white/60 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                   <MailIcon size={20} />
                </div>
                <span className="text-sm">hello@ascopetech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© 2026 Ascope Tech. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
