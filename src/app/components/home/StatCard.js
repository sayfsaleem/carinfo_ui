'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * StatCard Component
 * Animated statistics card with counting animation
 * Different from dashboard StatCard - this one is for homepage
 *
 * @param {Component} icon - React Icon component
 * @param {string|number} number - Target number to animate to
 * @param {string} label - Description label
 * @param {boolean} animate - Enable counting animation
 */
export default function StatCard({ icon: IconComponent, number, label, animate = true }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animate, isVisible]);

  useEffect(() => {
    // Parse number from string to ensure count is always numeric
    const targetStr = String(number);
    const targetNumber = parseFloat(targetStr.replace(/[^0-9.]/g, ''));

    // Validate that we got a valid number
    if (isNaN(targetNumber)) {
      console.warn('StatCard received invalid number prop:', number);
      setCount(0);
      return;
    }

    if (!isVisible || !animate) {
      setCount(targetNumber);
      return;
    }

    const isDecimal = targetStr.includes('.');
    const duration = 2000;
    const steps = 50;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? current : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, number, animate]);

  const formatDisplay = () => {
    // Ensure count is a valid number before formatting
    const safeCount = typeof count === 'number' && !isNaN(count) ? count : 0;

    const numStr = String(number);
    if (numStr.includes('/')) {
      // Handle ratings like "4.9/5.0"
      return numStr.replace(/[\d.]+/, safeCount.toFixed(1));
    }
    if (numStr.includes('.')) {
      return safeCount.toFixed(1);
    }
    if (numStr.includes('s')) {
      // Handle time like "1.8s"
      return safeCount.toFixed(1) + 's';
    }
    if (numStr.includes('+')) {
      return Math.floor(safeCount).toLocaleString() + '+';
    }
    return Math.floor(safeCount).toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center text-white"
    >
      {IconComponent && (
        <div className="inline-block mb-4">
          <IconComponent className="text-5xl opacity-90" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-black mb-2">
        {formatDisplay()}
      </div>
      <div className="text-lg opacity-90 font-medium">
        {label}
      </div>
    </motion.div>
  );
}
