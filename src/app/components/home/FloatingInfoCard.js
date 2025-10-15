'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * FloatingInfoCard Component
 * Small floating card with icon and text for hero showcase
 *
 * @param {Component} icon - React Icon component
 * @param {string} text - Card text
 * @param {string} className - Additional CSS classes for positioning
 * @param {number} delay - Animation delay in seconds
 */
export default function FloatingInfoCard({
  icon: IconComponent,
  text,
  className = '',
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 3
      }}
      className={cn(
        'absolute bg-white/90 backdrop-blur-lg border-2 border-blue-200 rounded-2xl shadow-2xl p-4 flex items-center gap-3',
        className
      )}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
        {IconComponent && <IconComponent className="text-white text-lg" />}
      </div>
      <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  );
}
