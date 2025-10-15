'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import Card from '../ui/Card';

/**
 * DataSourceCard Component
 * Display official data source with badge
 *
 * @param {ReactNode} logo - Logo component or image
 * @param {string} name - Source name (e.g., "DVLA")
 * @param {string} description - Brief description
 * @param {string} checkmark - Verification text (e.g., "Real-time sync")
 */
export default function DataSourceCard({ logo, name, description, checkmark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card hover glow className="text-center h-full">
        {/* Logo/Badge */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
          {logo || <span className="text-3xl font-black text-blue-700">{name[0]}</span>}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Checkmark */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
          <FaCheck />
          {checkmark}
        </div>
      </Card>
    </motion.div>
  );
}
