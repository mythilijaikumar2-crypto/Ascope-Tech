import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, LifeBuoy } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  
  const orderId = state.orderId || 'order_mock_12345xyz';
  const errorMessage = state.errorMessage || 'The payment session was canceled or timed out by the banking provider.';

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen font-sans relative overflow-hidden flex items-center">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-white rounded-[48px] p-8 lg:p-12 shadow-premium text-center relative overflow-hidden"
        >
          {/* Animated Failure Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-red-100/50"
          >
            <AlertTriangle size={44} className="stroke-[2]" />
          </motion.div>

          <span className="px-4 py-1 text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-200/50 rounded-full">
            Payment Failed
          </span>

          <h1 className="text-3xl lg:text-4xl font-heading font-black text-navy mt-4 tracking-tight leading-none">
            Transaction Declined
          </h1>
          
          <p className="text-navy/60 font-semibold text-sm mt-3.5 leading-relaxed max-w-sm mx-auto">
            We were unable to secure authorization from your payment provider. No funds have been permanently deducted.
          </p>

          {/* Error Details Card */}
          <div className="bg-cream/70 border border-navy/5 rounded-[24px] p-6 my-8 space-y-4 text-left">
            <div className="space-y-0.5 border-b border-navy/5 pb-3">
              <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block">Error/Failure Description</span>
              <span className="font-heading font-bold text-navy text-xs leading-relaxed block">{errorMessage}</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block">Razorpay Order Reference ID</span>
              <span className="text-xs font-black text-navy uppercase truncate block">{orderId}</span>
            </div>
          </div>

          <div className="bg-cream border border-navy/5 rounded-2xl p-4.5 text-xs text-navy/50 font-semibold text-center leading-relaxed mb-8">
            Need urgent assistance? Try another payment option or call +91 74182 40526.
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex-grow py-4.5 bg-navy text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-navy/10 flex items-center justify-center gap-2 hover:bg-primary"
            >
              <RefreshCw size={15} /> Retry Checkout
            </button>
            
            <Link
              to="/tickets"
              className="flex-grow py-4.5 border border-navy/10 hover:border-navy bg-white text-navy font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <LifeBuoy size={15} /> Support Ticket
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailed;
