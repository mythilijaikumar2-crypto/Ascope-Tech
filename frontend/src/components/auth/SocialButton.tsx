import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 hover:shadow-md transition-all duration-300 font-bold text-sm text-navy group"
    >
      <span className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      {label}
    </button>
  );
};

export default SocialButton;
