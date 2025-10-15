'use client';

import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';

/**
 * SuccessAnimation Component
 * Animated success indicator with checkmark
 *
 * @param {string} title - Success title
 * @param {string} message - Success message
 * @param {string} className - Additional CSS classes
 */
export default function SuccessAnimation({
  title = 'Success!',
  message = 'Redirecting...',
  className = ''
}) {
  return (
    <motion.div
      className={`text-center py-12 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 200,
          damping: 10
        }}
        className="inline-block mb-6"
      >
        <FaCircleCheck className="text-green-500 text-8xl drop-shadow-lg" />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 text-lg"
      >
        {message}
      </motion.p>

      {/* Loading dots animation */}
      <motion.div
        className="flex justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
