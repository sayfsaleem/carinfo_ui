'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCar } from 'react-icons/fa6';

/**
 * LiveCheckFeed Component
 * Animated feed showing recent vehicle checks (demo data)
 */

// Demo check data
const DEMO_CHECKS = [
  { vrm: 'XX12 ABC', time: '2 minutes ago', status: 'Valid MOT', statusColor: 'green' },
  { vrm: 'YY34 DEF', time: '5 minutes ago', status: 'Taxed', statusColor: 'blue' },
  { vrm: 'ZZ56 GHI', time: '8 minutes ago', status: 'Valid MOT', statusColor: 'green' },
  { vrm: 'AA78 JKL', time: '12 minutes ago', status: 'Checked', statusColor: 'gray' },
  { vrm: 'BB90 MNO', time: '15 minutes ago', status: 'Valid MOT', statusColor: 'green' }
];

export default function LiveCheckFeed() {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {DEMO_CHECKS.map((check, index) => (
          <motion.div
            key={check.vrm}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 flex items-center gap-4 hover:shadow-xl transition-shadow"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <FaCar className="text-blue-600 text-lg" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="font-mono font-bold text-gray-900 text-lg">{check.vrm}</p>
              <p className="text-sm text-gray-600">{check.time}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-2 h-2 bg-${check.statusColor}-500 rounded-full animate-pulse`}></div>
              <span className="text-xs text-gray-600 hidden sm:block">{check.status}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
