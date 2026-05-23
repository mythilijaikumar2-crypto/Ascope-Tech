import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Download, ShieldCheck, Sparkles } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const payment = state.payment || {
    razorpay_payment_id: 'pay_mock_12345ABCDE',
    razorpay_order_id: 'order_mock_12345xyz',
    amount: '11999',
    created_at: new Date().toISOString()
  };

  const courseDetails = state.courseDetails || {
    title: 'Professional Web Engineering Masterclass',
    finalPrice: 11999,
    discountAmount: 0
  };

  const invoice = state.invoice || {
    invoice_number: 'INV-2026-00001',
    id: 1
  };

  const discountAmount = Number(courseDetails.discountAmount || 0);
  const finalPrice = Number(courseDetails.finalPrice || payment.amount || 0);
  const basePrice = finalPrice + discountAmount;

  const [confetti] = useState(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.0,
    duration: 2.0 + Math.random() * 1.5,
    size: 5 + Math.random() * 6,
    color: ['#075a97','#17b5e7','#10b981','#f59e0b','#a855f7','#ef4444'][i % 6],
    shape: Math.random() > 0.5 ? '50%' : '3px',
    direction: Math.random() > 0.5 ? 1 : -1,
  })));

  return (
    <div className="min-h-screen bg-cream font-sans flex items-center justify-center pt-28 pb-20 relative overflow-hidden px-4">

      {/* Ambient blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[90px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full max-w-3xl relative overflow-hidden rounded-[32px] shadow-[0_28px_70px_rgba(3,43,82,0.18)] border border-white/80 flex flex-col lg:flex-row"
      >

        {/* ── LEFT: Dark Hero Panel ── */}
        <div className="relative bg-gradient-to-br from-[#032b52] via-[#075a97] to-[#0b80c8] px-8 py-8 flex flex-col items-center justify-center text-center lg:w-[42%] shrink-0 overflow-hidden">

          {/* Confetti */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: -16, opacity: 1, rotate: 0 }}
                animate={{ y: 280, opacity: 0, rotate: 360 * p.direction }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn', repeat: Infinity, repeatDelay: 2.5 }}
                className="absolute"
                style={{ left: `${p.left}%`, width: p.size, height: p.size, backgroundColor: p.color, borderRadius: p.shape }}
              />
            ))}
          </div>

          {/* Glow orbs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

          {/* Animated check */}
          <div className="relative flex items-center justify-center mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.1, 0.25] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-28 h-28 rounded-full bg-emerald-400/30"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.2, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute rounded-full bg-emerald-400/35"
              style={{ width: 84, height: 84 }}
            />
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
              className="relative w-[72px] h-[72px] bg-emerald-500 rounded-[22px] flex items-center justify-center shadow-xl shadow-emerald-900/30 border-2 border-emerald-400/40"
            >
              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M5 12l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-black uppercase tracking-[0.18em] mb-3"
          >
            <ShieldCheck size={9} />
            Payment Completed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-2xl font-heading font-black text-white leading-tight tracking-tight"
          >
            Enrollment<br />Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-white/50 text-[11px] font-medium leading-relaxed mt-2.5"
          >
            Your payment is cryptographically validated. Portal access is fully unlocked.
          </motion.p>

          {/* Divider dots (ticket perforation style) */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-0 border-r-2 border-dashed border-white/10" />
        </div>

        {/* ── RIGHT: White Receipt Panel ── */}
        <div className="bg-white flex-1 px-7 py-7 flex flex-col justify-between gap-5">

          {/* Course row */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-2xl px-4 py-3"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <BookOpen size={15} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block">Enrolled Course</span>
              <span className="text-sm font-heading font-black text-navy leading-tight block truncate">{courseDetails.title}</span>
            </div>
          </motion.div>

          {/* Receipt grid */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#f8fafc] border border-navy/6 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 divide-x divide-navy/5">
              {/* Payment ID */}
              <div className="px-4 py-3 border-b border-navy/5">
                <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block mb-0.5">Payment ID</span>
                <span className="text-[10px] font-mono font-black text-navy truncate block">{payment.razorpay_payment_id}</span>
              </div>
              {/* Invoice */}
              <div className="px-4 py-3 border-b border-navy/5">
                <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block mb-0.5">Invoice Code</span>
                <span className="text-[10px] font-black text-navy block">{invoice.invoice_number}</span>
              </div>

              {discountAmount > 0 && (
                <>
                  {/* Tuition Price */}
                  <div className="px-4 py-3 border-b border-navy/5">
                    <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block mb-0.5">Tuition Price</span>
                    <span className="text-[12px] font-black text-navy block">₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  {/* Discount Price */}
                  <div className="px-4 py-3 border-b border-navy/5">
                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest block mb-0.5">Discount Applied</span>
                    <span className="text-[12px] font-black text-emerald-600 block">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}

              {/* Amount */}
              <div className="px-4 py-3">
                <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block mb-0.5">Amount Paid</span>
                <span className="text-xl font-heading font-black text-primary leading-none">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              {/* Date */}
              <div className="px-4 py-3">
                <span className="text-[8px] font-black text-navy/40 uppercase tracking-widest block mb-0.5">Booking Date</span>
                <span className="text-[11px] font-black text-navy/70 block">
                  {new Date(payment.created_at || new Date()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="flex gap-3"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Link
                to="/dashboard"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-[#0a6fb5] text-white font-black text-[10px] uppercase tracking-[0.18em] rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl transition-shadow relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]"
                />
                <BookOpen size={13} strokeWidth={2.5} />
                <span>Learning Portal</span>
                <Sparkles size={11} className="opacity-70" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Link
                to="/billing"
                className="w-full py-3.5 bg-[#f8fafc] border border-navy/10 hover:border-primary/30 text-navy hover:text-primary font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <Download size={13} strokeWidth={2.5} />
                <span>Download Receipt</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Security footnote */}
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck size={9} className="text-navy/25" />
            <p className="text-[8px] font-bold text-navy/25 uppercase tracking-[0.15em]">256-bit TLS Secured · Auto-verified Enrollment</p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
