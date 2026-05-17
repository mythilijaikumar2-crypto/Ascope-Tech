import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Authenticating...' });
    try {
      const data = await authService.login(formData);
      setStatus({ type: 'success', message: 'Success!' });
      setTimeout(() => window.location.href = '/', 1000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.error || 'Invalid credentials' });
    }
  };

  return (
    <div className="w-full text-center">
      <h1 className="text-4xl font-bold text-[#1a1a1a] mb-12">Welcome Back</h1>

      <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-[360px] mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#4a4a4a]">Username *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your Username"
            className="w-full px-6 py-4 bg-[#f0f0f0] border-none rounded-sm focus:ring-2 focus:ring-[#f4c724] outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#4a4a4a]">Password *</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your Password"
            className="w-full px-6 py-4 bg-[#f0f0f0] border-none rounded-sm focus:ring-2 focus:ring-[#f4c724] outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4 accent-[#f4c724]" id="remember" />
          <label htmlFor="remember" className="text-sm font-bold text-[#4a4a4a] cursor-pointer">Remember me</label>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#f4c724] hover:bg-[#e5b91f] text-[#1a1a1a] font-bold rounded-sm transition-all shadow-sm"
        >
          {status.type === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        {status.message && (
          <p className={`text-center text-xs font-bold ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {status.message}
          </p>
        )}

        <div className="pt-6 space-y-4 text-center">
          <a href="#" className="block text-sm font-bold text-gray-400 hover:text-gray-600">Forgot password?</a>
          <Link to="/signup" className="block text-sm font-bold text-gray-400 hover:text-gray-600">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
