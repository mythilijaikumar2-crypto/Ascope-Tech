import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Tag,
  Check,
  Loader2,
  AlertCircle,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Sparkles,
  Lock,
  X
} from 'lucide-react';
import { paymentService } from '../services/paymentService';
import api from '../services/api';
import { FALLBACK_COURSES } from '../services/fallbackData';

interface CouponData {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  discountAmount: number;
  finalPrice: number;
}

interface MockOrderDetails {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  isMock: boolean;
  courseDetails: {
    id: number;
    title: string;
    price: string;
    discountAmount: number;
    finalPrice: number;
  };
  billing: {
    fullName: string;
    email: string;
    phone: string;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CustomWindow extends Window {
  Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
}

interface Course {
  id: string | number;
  title: string;
  category: string;
  duration: string;
  rating: number;
  price: string;
  originalPrice?: string;
  image: string;
}

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Loading & Data States
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderProcessing, setOrderProcessing] = useState(false);

  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');

  // Coupon verification states
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponSuccessMessage, setCouponSuccessMessage] = useState('');

  // Payment states
  const [globalError, setGlobalError] = useState('');
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);
  const [mockOrderDetails, setMockOrderDetails] = useState<MockOrderDetails | null>(null);

  // Load Razorpay Script dynamically
  useEffect(() => {
    const scriptId = 'razorpay-checkout-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch Course details and user details on mount
  useEffect(() => {
    let isMounted = true;

    const loadCheckoutData = async () => {
      try {
        // Fetch course details
        const courseRes = await api.get('/courses');
        const list: Course[] = courseRes.data.data || [];
        const found = list.find((c) => String(c.id) === String(courseId));
        if (found) {
          setCourse(found);
        } else {
          const fallbackFound = FALLBACK_COURSES.find((c) => String(c.id) === String(courseId));
          setCourse(fallbackFound || null);
        }

        // Pre-populate user details if logged in
        const profileToken = localStorage.getItem('user_token');
        if (!profileToken) {
          navigate(`/login?redirect=/checkout/${courseId}`);
          return;
        }

        try {
          const userRes = await api.get('/auth/profile');
          if (userRes.data.success && isMounted) {
            setFullName(userRes.data.user.fullName || '');
            setEmail(userRes.data.user.email || '');
            setPhone(userRes.data.user.phone || '');
          }
        } catch (profileErr) {
          console.warn("User profile fetch bypassed on checkout:", profileErr);
        }

        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error setting up checkout:", err);
        const fallbackFound = FALLBACK_COURSES.find((c) => String(c.id) === String(courseId));
        if (isMounted) {
          setCourse(fallbackFound || null);
          setLoading(false);
        }
      }
    };

    loadCheckoutData();

    return () => {
      isMounted = false;
    };
  }, [courseId, navigate]);

  // Handle Coupon Application
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError('');
    setCouponSuccessMessage('');

    try {
      const response = await paymentService.applyCoupon(couponCode.trim(), courseId || '');
      if (response.success && response.data) {
        setAppliedCoupon(response.data);
        setCouponSuccessMessage(response.message || 'Coupon applied successfully!');
      }
    } catch (err) {
      const errObj = err as { response?: { data?: { message?: string } } };
      console.error("Apply coupon error:", err);
      const errMsg = errObj.response?.data?.message || 'Invalid or expired coupon code.';
      setCouponError(errMsg);
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponSuccessMessage('');
    setCouponError('');
  };

  // Pricing calculations
  const getPriceBreakdown = () => {
    if (!course) return { originalPrice: 0, specialOfferDiscount: 0, courseDiscountPrice: 0, discount: 0, subtotal: 0, tax: 0, total: 0 };

    const courseDiscountPrice = parseInt(course.price.replace(/[^0-9]/g, ''), 10) || 0;
    const originalPrice = course.originalPrice 
      ? (parseInt(course.originalPrice.replace(/[^0-9]/g, ''), 10) || courseDiscountPrice)
      : Math.round(courseDiscountPrice / 0.8); // Fallback: if not set, calculate +20% original price
      
    const specialOfferDiscount = originalPrice - courseDiscountPrice;
    let discount = 0;

    if (appliedCoupon) {
      discount = appliedCoupon.discountAmount;
    }

    const total = courseDiscountPrice - discount;
    const subtotal = Math.round(total / 1.18);
    const tax = total - subtotal;

    return { originalPrice, specialOfferDiscount, courseDiscountPrice, discount, subtotal, tax, total };
  };

  const { originalPrice, specialOfferDiscount, courseDiscountPrice, discount, total } = getPriceBreakdown();

  // Primary Pay Handler
  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setGlobalError('Please fill in all student billing contact information.');
      return;
    }

    setOrderProcessing(true);
    setGlobalError('');

    try {
      // 1. Create Checkout Order inside backend
      const orderRes = await paymentService.createOrder(
        courseId || '',
        appliedCoupon ? appliedCoupon.code : undefined
      );

      if (!orderRes.success || !orderRes.data) {
        throw new Error(orderRes.message || 'Failed to create payment transaction order.');
      }

      const orderData = orderRes.data;

      // 2. Determine mode (Mock Sandbox vs Razorpay Live)
      if (orderData.isMock) {
        console.log("⚙️ Mock sandbox session triggered. Loading simulated interface...");
        setMockOrderDetails({
          ...orderData,
          billing: { fullName, email, phone }
        });
        setOrderProcessing(false);
        setIsMockModalOpen(true);
      } else {
        // Run Real Razorpay Overlay
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Ascope Tech',
          description: `Tuition Fee - ${course?.title}`,
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&h=200&q=80',
          order_id: orderData.orderId,
          handler: async (response: RazorpayResponse) => {
            setOrderProcessing(true);
            try {
              const verifyRes = await paymentService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              if (verifyRes.success) {
                navigate('/payment-success', {
                  state: {
                    payment: verifyRes.data.payment,
                    courseDetails: orderData.courseDetails,
                    invoice: verifyRes.data.invoice
                  }
                });
              } else {
                navigate('/payment-failed', {
                  state: {
                    orderId: orderData.orderId,
                    errorMessage: verifyRes.message || 'Verification rejected by billing gateway.'
                  }
                });
              }
            } catch (verifyErr) {
              const errObj = verifyErr as { response?: { data?: { message?: string } } };
              console.error("Verification callback error:", verifyErr);
              navigate('/payment-failed', {
                state: {
                  orderId: orderData.orderId,
                  errorMessage: errObj.response?.data?.message || 'Server connection failure during verification.'
                }
              });
            } finally {
              setOrderProcessing(false);
            }
          },
          prefill: {
            name: fullName,
            email: email,
            contact: phone
          },
          notes: {
            course_id: courseId
          },
          theme: {
            color: '#075a97'
          },
          modal: {
            ondismiss: () => {
              setOrderProcessing(false);
            }
          }
        };

        const customWindow = window as CustomWindow;
        if (customWindow.Razorpay) {
          const rzp = new customWindow.Razorpay(options as Record<string, unknown>);
          rzp.open();
        } else {
          throw new Error('Razorpay SDK failed to load. Check your internet connection.');
        }
      }

    } catch (err) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      console.error("Payment setup error:", err);
      setGlobalError(errObj.response?.data?.message || errObj.message || 'An error occurred during order initialization.');
      setOrderProcessing(false);
    }
  };

  // Mock Sandbox Callback simulations
  const handleSimulatePayment = async (success: boolean) => {
    if (!mockOrderDetails) return;
    setIsMockModalOpen(false);
    setOrderProcessing(true);

    if (!success) {
      setTimeout(() => {
        setOrderProcessing(false);
        navigate('/payment-failed', {
          state: {
            orderId: mockOrderDetails.orderId,
            errorMessage: 'Simulated Sandbox Payment Canceled/Declined by user.'
          }
        });
      }, 800);
      return;
    }

    try {
      const mockPaymentId = `pay_mock_${Math.random().toString(36).substring(2, 12)}`;

      const verifyRes = await paymentService.verifyPayment({
        razorpay_order_id: mockOrderDetails.orderId,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: `sig_mock_${Math.random().toString(36).substring(2, 20)}`
      });

      if (verifyRes.success) {
        navigate('/payment-success', {
          state: {
            payment: verifyRes.data.payment,
            courseDetails: mockOrderDetails.courseDetails,
            invoice: verifyRes.data.invoice
          }
        });
      } else {
        navigate('/payment-failed', {
          state: {
            orderId: mockOrderDetails.orderId,
            errorMessage: verifyRes.message || 'Sandbox verification rejected.'
          }
        });
      }
    } catch (err) {
      const errObj = err as { response?: { data?: { message?: string } } };
      console.error("Sandbox verification error:", err);
      navigate('/payment-failed', {
        state: {
          orderId: mockOrderDetails?.orderId,
          errorMessage: errObj.response?.data?.message || 'Server error during mock simulation.'
        }
      });
    } finally {
      setOrderProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-heading font-black text-navy text-lg uppercase tracking-widest">Validating Checkout Session...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-cream text-center font-sans">
        <div className="max-w-md mx-auto space-y-6 px-6 bg-white/70 backdrop-blur-xl border border-white/50 p-10 rounded-[32px] shadow-premium">
          <AlertCircle size={48} className="text-red-500 mx-auto" />
          <h2 className="text-3xl font-heading font-black text-navy leading-none">Checkout Invalid</h2>
          <p className="text-navy/60 font-semibold leading-relaxed">
            The course session could not be established. Please retry from the main listings.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen font-sans relative overflow-x-hidden">

      {/* Decorative Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Navigation Breadcrumb */}
        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-navy/40 hover:text-primary transition-colors font-black text-xs uppercase tracking-widest mb-10"
        >
          <ArrowLeft size={16} />
          <span>Back to Details</span>
        </Link>

        {/* Global Error Banner */}
        <AnimatePresence>
          {globalError && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-red-50 border border-red-200/50 rounded-2xl mb-8 flex items-center gap-4 text-red-700"
            >
              <AlertCircle size={22} className="shrink-0" />
              <span className="font-bold text-sm leading-relaxed">{globalError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: Billing details form (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 lg:p-10 shadow-premium"
            >
              <h2 className="text-2xl font-heading font-black text-navy tracking-tight mb-2 flex items-center gap-3">
                <User className="text-primary stroke-[2.5]" size={24} /> Student Particulars
              </h2>
              <p className="text-navy/40 font-bold text-xs uppercase tracking-widest border-b border-navy/5 pb-5 mb-6">
                Enter details linked to your learning dashboard and certificates
              </p>

              <form onSubmit={handlePayNow} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1">Full Student Name</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mythili Jaikumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-cream/70 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="mythili@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-cream/70 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1">Mobile Contact</label>
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99999 99999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-14 pr-5 py-4 rounded-[20px] bg-cream/70 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="bg-sky/20 rounded-2xl p-5 border border-border/30 flex items-start gap-4">
                  <ShieldCheck size={24} className="text-primary shrink-0 stroke-[2.5]" />
                  <div className="space-y-1">
                    <h4 className="font-heading font-black text-navy text-xs uppercase tracking-wider">Ascope Secure Encryption System</h4>
                    <p className="text-navy/50 font-semibold text-[10px] leading-relaxed">
                      Your transactional metadata is hashed on a cryptographic server layer using SHA-256 signatures before forwarding to Razorpay.
                    </p>
                  </div>
                </div>

                {/* Dynamic Submit button */}
                <button
                  type="submit"
                  disabled={orderProcessing}
                  className="w-full py-5 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:bg-primary/95 hover:shadow-2xl hover:scale-[1.01] disabled:opacity-50 disabled:scale-100"
                >
                  {orderProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>INITIALIZING PAYMENTS...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>PROCEED TO SECURE PAYMENT (₹{total.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Price breakdown & coupon application (5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[40px] border border-border/60 p-8 shadow-premium space-y-6 overflow-hidden"
            >
              <h3 className="text-xl font-heading font-black text-navy tracking-tight border-b border-navy/5 pb-4">
                Enrollment Overview
              </h3>

              {/* Course Item Summary */}
              <div className="flex gap-4">
                <img
                  src={course.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80'}
                  alt={course.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-border/30"
                />
                <div className="space-y-1">
                  <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-md">
                    {course.category}
                  </span>
                  <h4 className="font-heading font-black text-navy text-sm leading-tight pt-1">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-heading font-black text-primary text-xs">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-[10px] font-semibold text-navy/30 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                    {course.originalPrice && (
                      <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 rounded-md">
                        20% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-navy/40 font-bold text-[9px] uppercase tracking-widest pt-1">{course.duration}</p>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="border-t border-b border-navy/5 py-6 space-y-3">
                <h4 className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <Tag size={12} className="text-primary" /> Promotional Discount Codes
                </h4>

                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-grow px-5 py-3 rounded-xl bg-cream/70 border border-navy/10 focus:border-primary/20 outline-none font-bold text-navy text-xs"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading || !couponCode.trim()}
                      className="px-5 py-3 bg-navy text-white hover:bg-primary font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shrink-0"
                    >
                      {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={14} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-emerald-800 leading-none">Code '{appliedCoupon.code}' Active</p>
                        <p className="text-[9px] font-bold text-emerald-600 uppercase">
                          Saved ₹{appliedCoupon.discountAmount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700 p-1 bg-white border border-red-100 rounded-lg hover:shadow-subtle transition-all shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Inline Coupon Messages */}
                {couponError && (
                  <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-1 ml-1 animate-pulse">
                    <AlertCircle size={10} /> {couponError}
                  </p>
                )}
                {couponSuccessMessage && (
                  <p className="text-[10px] font-black text-emerald-600 flex items-center gap-1 mt-1 ml-1">
                    <Sparkles size={10} className="animate-spin text-emerald-500" /> {couponSuccessMessage}
                  </p>
                )}
              </div>

              {/* Price Calculation List */}
              <div className="space-y-3.5 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-navy/60">
                  <span>Tuition Original Price</span>
                  <span className="line-through text-navy/40">₹{originalPrice.toLocaleString('en-IN')}</span>
                </div>

                {specialOfferDiscount > 0 && (
                  <div className="flex justify-between items-center text-xs font-black text-emerald-600">
                    <span>Special 20% Course Offer</span>
                    <span>- ₹{specialOfferDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs font-bold text-navy/70 border-b border-navy/5 pb-2">
                  <span>Tuition Discount Price</span>
                  <span className="font-heading font-bold text-navy">₹{courseDiscountPrice.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-xs font-black text-emerald-600 border-b border-navy/5 pb-2">
                    <span>Coupon Promo Discount</span>
                    <span>- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-end border-t border-navy/5 pt-4 text-navy">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest block">TOTAL AMOUNT PAYABLE</span>
                    <span className="text-xs font-bold text-muted leading-none">Secure Transaction</span>
                  </div>
                  <span className="text-3xl font-black font-heading text-navy tracking-tight leading-none">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- MOCK SANDBOX PAYMENT POPUP DIALOG --- */}
      <AnimatePresence>
        {isMockModalOpen && mockOrderDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/70 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full max-w-md relative overflow-hidden rounded-[32px] shadow-[0_32px_80px_rgba(3,43,82,0.4)] border border-white/10"
            >
              {/* ── Dark Header ── */}
              <div className="relative bg-gradient-to-br from-[#032b52] via-[#075a97] to-[#0a6fb5] px-7 pt-7 pb-8 overflow-hidden">
                {/* Decorative glowing orbs */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none" />

                {/* Header row */}
                <div className="relative flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {/* RZ badge */}
                    <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                      <span className="font-heading font-black text-white text-sm tracking-tight">RZ</span>
                    </div>
                    <div>
                      <h3 className="text-white font-heading font-black text-base leading-tight">Razorpay Sandbox</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <p className="text-[9px] font-black uppercase text-accent/90 tracking-[0.18em]">Mock Gateway Simulation</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSimulatePayment(false)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white/60 hover:text-white transition-all"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Amount spotlight */}
                <div className="relative bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.18em]">Final Tuition Amount</p>
                    <p className="text-3xl font-heading font-black text-white leading-none">
                      ₹{(mockOrderDetails.amount / 100).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={10} /> Secured
                    </span>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">INR</span>
                  </div>
                </div>
              </div>

              {/* ── White Body ── */}
              <div className="bg-white px-7 py-6 space-y-5">

                {/* Order details card */}
                <div className="bg-[#f8fafc] border border-navy/6 rounded-2xl divide-y divide-navy/5 overflow-hidden">
                  {[
                    { label: 'Order Reference', value: mockOrderDetails.orderId, mono: true, truncate: false },
                    { label: 'Billing Student', value: mockOrderDetails.billing.fullName, mono: false, truncate: false },
                    { label: 'Course', value: course.title, mono: false, truncate: true },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center px-4 py-3 gap-4">
                      <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest shrink-0">{row.label}</span>
                      <span className={`text-[11px] font-black text-navy text-right ${row.mono ? 'font-mono' : ''} ${row.truncate ? 'truncate max-w-[180px]' : ''}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sandbox warning */}
                <div className="flex gap-3 bg-amber-50 border border-amber-200/60 rounded-2xl p-4">
                  <AlertCircle size={17} className="shrink-0 text-amber-500 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider">Sandbox Mode Active</p>
                    <p className="text-[10px] font-medium text-amber-700/80 leading-relaxed">
                      Razorpay credentials in <code className="bg-amber-100 px-1 rounded text-[9px] font-mono">.env</code> are unset. Use the controls below to simulate success or failure callbacks.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSimulatePayment(true)}
                    className="relative overflow-hidden py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 bg-gradient-to-br from-emerald-400 to-emerald-600"
                  >
                    {/* Sweep shimmer */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                    />
                    <Check size={15} className="stroke-[3]" />
                    Simulate Success
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSimulatePayment(false)}
                    className="relative overflow-hidden py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 bg-gradient-to-br from-red-400 to-red-600"
                  >
                    <X size={15} className="stroke-[3]" />
                    Simulate Failure
                  </motion.button>
                </div>

                {/* Security footnote */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <Lock size={10} className="text-navy/25" />
                  <p className="text-[9px] font-bold text-navy/30 uppercase tracking-[0.15em]">256-bit TLS · Sandbox Environment Only</p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
