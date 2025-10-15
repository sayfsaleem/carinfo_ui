'use client';

import { motion } from 'framer-motion';
import Card from '../ui/Card';

/**
 * StatCard Component
 * Display dashboard statistics with icon
 */
export default function StatCard({ icon: Icon, value, label, variant = 'primary' }) {
  const variantColors = {
    primary: 'from-[#0069d9] to-[#007bff]',
    success: 'from-[#198754] to-[#157347]',
    warning: 'from-[#ffc107] to-[#ffb300]',
    info: 'from-[#0dcaf0] to-[#0aa2c0]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-r ${variantColors[variant]} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <Icon className="text-white text-2xl" />
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
      </Card>
    </motion.div>
  );
}
