import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  label,
  suffix = "",
  delay = 0,
}) => {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (current) =>
    Math.floor(current).toLocaleString(),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      springValue.set(value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay, springValue]);

  return (
    <div className="text-center p-8">
      <div className="text-5xl lg:text-7xl font-black text-primary mb-3 flex justify-center items-baseline gap-1">
        <motion.span>{displayValue}</motion.span>
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="text-sm font-black text-dark/30 uppercase tracking-[0.2em]">
        {label}
      </p>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
        <StatsCounter value={50000} label="Active Students" suffix="+" />
        <StatsCounter
          value={120}
          label="Expert Mentors"
          suffix="+"
          delay={0.2}
        />
        <StatsCounter value={95} label="Success Rate" suffix="%" delay={0.4} />
        <StatsCounter value={45} label="LPA Highest" suffix="+" delay={0.6} />
      </div>
    </section>
  );
};

export default StatsCounter;
