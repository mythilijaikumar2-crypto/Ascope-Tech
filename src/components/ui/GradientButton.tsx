import React from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick, 
  className = ""
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-8 py-3 rounded-full font-bold text-white accent-gradient shadow-premium transition-all duration-300 overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GradientButton;
