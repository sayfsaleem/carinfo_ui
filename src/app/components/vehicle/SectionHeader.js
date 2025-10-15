'use client';

import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

/**
 * SectionHeader Component
 * Reusable header for vehicle check page sections
 *
 * @param {string} id - Section ID for anchor links
 * @param {ReactNode} icon - Icon component
 * @param {string} title - Section title
 * @param {string} description - Optional description text
 * @param {string} badge - Optional badge text (e.g., "Gold", "Silver", "Premium")
 * @param {string} badgeVariant - Badge color variant
 * @param {string} className - Additional CSS classes
 */
export default function SectionHeader({
  id,
  icon,
  title,
  description,
  badge,
  badgeVariant = 'warning',
  className = ''
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg">
              {icon}
            </div>
          </div>
        )}

        {/* Title & Description */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>

            {/* Badge */}
            {badge && (
              <Badge variant={badgeVariant} className="text-xs font-bold">
                {badge}
              </Badge>
            )}
          </div>

          {description && (
            <p className="text-gray-600 text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full w-24" />
    </motion.div>
  );
}
