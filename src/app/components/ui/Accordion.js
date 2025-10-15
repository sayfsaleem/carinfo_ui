'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

/**
 * Accordion Component
 * Collapsible content sections
 *
 * @param {Array} items - Array of {id, title, content} objects
 * @param {boolean} allowMultiple - Allow multiple items open at once
 * @param {string} className - Additional CSS classes
 */
export default function Accordion({
  items = [],
  allowMultiple = false,
  className = ''
}) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

/**
 * AccordionItem Component
 */
function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {item.title}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary-500 flex-shrink-0"
        >
          <FaChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
