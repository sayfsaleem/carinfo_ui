'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * TrustStat Component
 * Animated statistics display with counting effect
 *
 * @param {string|number} number - The target number to count to
 * @param {string} label - Label text below number
 * @param {Component} icon - React Icon component
 * @param {string} suffix - Suffix for number (e.g., '+', '%')
 */
export default function TrustStat({ number, label, icon: IconComponent, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Parse the number (handle strings like "150,000+")
    const targetNumber = parseInt(String(number).replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      {IconComponent && (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <IconComponent className="text-white text-2xl" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 animate-count-up">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  );
}
