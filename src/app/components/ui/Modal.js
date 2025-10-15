'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

/**
 * Modal Component
 * A reusable modal/dialog component with backdrop
 *
 * @param {boolean} isOpen - Whether modal is visible
 * @param {function} onClose - Function to call when closing modal
 * @param {ReactNode} children - Modal content
 * @param {string} title - Modal title
 * @param {string} size - Modal size ('sm', 'md', 'lg', 'xl', 'full')
 * @param {boolean} showClose - Show close button
 * @param {string} className - Additional CSS classes for modal content
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showClose = true,
  className = ''
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'relative bg-white rounded-3xl shadow-2xl w-full',
                  sizeClasses[size],
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
              >
                {/* Close button */}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-2"
                    aria-label="Close modal"
                  >
                    <FaXmark className="w-5 h-5" />
                  </button>
                )}

                {/* Modal content */}
                <div className="p-8">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-3xl font-bold text-gray-900 mb-6 pr-8"
                    >
                      {title}
                    </h2>
                  )}
                  {children}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  // Only render on client-side
  if (typeof document === 'undefined') return null;

  return createPortal(modalContent, document.body);
}

/**
 * ModalHeader Component
 */
export function ModalHeader({ children, className = '' }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

/**
 * ModalBody Component
 */
export function ModalBody({ children, className = '' }) {
  return (
    <div className={cn('my-6', className)}>
      {children}
    </div>
  );
}

/**
 * ModalFooter Component
 */
export function ModalFooter({ children, className = '' }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200', className)}>
      {children}
    </div>
  );
}
