'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaXmark } from 'react-icons/fa6';
import { useEffect } from 'react';

/**
 * Toast Component
 * Toast notification system
 *
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success', 'error', 'info')
 * @param {boolean} isOpen - Whether toast is visible
 * @param {function} onClose - Function to close toast
 * @param {number} duration - Auto-close duration in ms (0 = no auto-close)
 */
export default function Toast({
  message,
  type = 'success',
  isOpen,
  onClose,
  duration = 3000
}) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const config = {
    success: {
      icon: <FaCircleCheck className="text-green-500 text-2xl" />,
      bgClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-900'
    },
    error: {
      icon: <FaCircleExclamation className="text-red-500 text-2xl" />,
      bgClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-900'
    },
    info: {
      icon: <FaCircleInfo className="text-blue-500 text-2xl" />,
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-900'
    }
  };

  const { icon, bgClass, textClass } = config[type] || config.success;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-[10000]"
        >
          <div
            className={`${bgClass} border rounded-2xl px-6 py-4 shadow-2xl backdrop-blur-sm flex items-center gap-4 min-w-[320px] max-w-md`}
          >
            {/* Icon */}
            <div className="flex-shrink-0">{icon}</div>

            {/* Message */}
            <p className={`${textClass} font-semibold flex-1`}>{message}</p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              aria-label="Close notification"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
