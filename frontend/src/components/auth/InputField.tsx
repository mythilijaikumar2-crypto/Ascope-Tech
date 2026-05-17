import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  rightElement,
  required = false 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-navy/70 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 group-focus-within:text-primary transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-12' : 'px-6'} ${rightElement ? 'pr-14' : 'pr-6'} py-4 rounded-xl bg-gray-50/50 border border-gray-100 focus:border-primary focus:bg-white outline-none transition-all duration-300 font-medium text-navy placeholder:text-navy/20 shadow-sm focus:shadow-md`}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
