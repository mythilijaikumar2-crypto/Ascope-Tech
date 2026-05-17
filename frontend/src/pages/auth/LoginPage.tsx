import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden relative p-6">
      {/* Background Decorations (Circles & Waves) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Side Circles */}
        <div className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-primary/80 rounded-full" />
        <div className="absolute bottom-[25%] left-[2%] w-6 h-6 bg-primary/60 rounded-full" />
        <div className="absolute bottom-[10%] left-[15%] w-10 h-10 bg-primary/70 rounded-full" />
        <div className="absolute bottom-[40%] left-[8%] w-4 h-4 bg-primary/90 rounded-full" />
        
        {/* Right Side Wave & Circles */}
        <svg className="absolute bottom-0 right-0 w-[60%] h-auto opacity-80" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M600 200C500 150 450 350 350 350C250 350 200 150 100 250" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round" />
          <circle cx="550" cy="300" r="30" fill="#f4c724" />
          <circle cx="450" cy="350" r="15" fill="#f4c724" />
          <circle cx="580" cy="250" r="10" fill="#f4c724" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
