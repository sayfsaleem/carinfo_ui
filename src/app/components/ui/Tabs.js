'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Tabs Component
 * Tabbed interface for organizing content
 *
 * @param {Array} tabs - Array of tab objects with {id, label, content, icon}
 * @param {string} defaultTab - ID of default active tab
 * @param {string} className - Additional CSS classes
 */
export default function Tabs({
  tabs = [],
  defaultTab,
  className = ''
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-6 py-3 font-semibold text-base transition-all duration-300 rounded-t-lg',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                {tab.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-t-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content with animation */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {activeTabData?.content}
      </motion.div>
    </div>
  );
}
