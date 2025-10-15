'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * ProcessStep Component
 * Visual step indicator for "How It Works" section
 *
 * @param {string} number - Step number (1, 2, 3)
 * @param {Component} icon - React Icon component
 * @param {string} title - Step title
 * @param {string} description - Step description
 * @param {string} gradient - Gradient color classes (from-X to-Y)
 */
export default function ProcessStep({
  number,
  icon: IconComponent,
  title,
  description,
  gradient = 'from-blue-500 to-indigo-600'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: parseInt(number) * 0.2 }}
      className="relative flex flex-col items-center text-center z-10"
    >
      {/* Number Badge */}
      <div className={cn(
        'w-24 h-24 rounded-full bg-gradient-to-br shadow-2xl flex items-center justify-center mb-6 relative',
        gradient
      )}>
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></div>
        <span className="text-4xl font-black text-white relative z-10">{number}</span>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 -mt-3">
        {IconComponent && <IconComponent className="text-3xl text-blue-600" />}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xs">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
