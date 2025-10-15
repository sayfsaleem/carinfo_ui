'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaXmark, FaStar } from 'react-icons/fa6';
import { PRICING_FEATURES } from '../../lib/constants';
import { cn } from '../../lib/utils';

/**
 * ComparisonTable Component
 * Feature comparison matrix for all pricing tiers
 */
export default function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl"
        >
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-sm font-bold text-gray-900"
                >
                  Features
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-center text-sm font-bold text-gray-900"
                >
                  Basic
                  <div className="text-xs font-normal text-gray-600 mt-1">
                    Free
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-center text-sm font-bold bg-primary/5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-primary">Silver</span>
                    <FaStar className="text-yellow-500 text-xs" />
                  </div>
                  <div className="text-xs font-normal text-gray-600 mt-1">
                    £2.99/month
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-center text-sm font-bold text-yellow-700 bg-yellow-50"
                >
                  Gold
                  <div className="text-xs font-normal text-gray-600 mt-1">
                    £5.99/month
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {PRICING_FEATURES.map((category, categoryIndex) => (
                <CategorySection
                  key={categoryIndex}
                  category={category}
                  isFirst={categoryIndex === 0}
                />
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * CategorySection Component
 * Renders a category with all its features
 */
function CategorySection({ category, isFirst }) {
  return (
    <>
      {/* Category Header */}
      <tr className={cn('bg-gray-50', !isFirst && 'border-t-2 border-gray-300')}>
        <td
          colSpan={4}
          className="px-6 py-4 text-sm font-bold text-gray-900"
        >
          {category.category}
        </td>
      </tr>

      {/* Category Features */}
      {category.features.map((feature, featureIndex) => (
        <FeatureRow key={featureIndex} feature={feature} />
      ))}
    </>
  );
}

/**
 * FeatureRow Component
 * Renders a single feature row
 */
function FeatureRow({ feature }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      {/* Feature Name */}
      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
        {feature.name}
      </td>

      {/* Basic Tier */}
      <td className="px-6 py-4 text-center">
        <FeatureCell value={feature.basic} />
      </td>

      {/* Silver Tier */}
      <td className="px-6 py-4 text-center bg-primary/5">
        <FeatureCell value={feature.silver} highlight />
      </td>

      {/* Gold Tier */}
      <td className="px-6 py-4 text-center bg-yellow-50">
        <FeatureCell value={feature.gold} premium />
      </td>
    </motion.tr>
  );
}

/**
 * FeatureCell Component
 * Renders the cell content based on feature availability
 */
function FeatureCell({ value, highlight = false, premium = false }) {
  // Boolean true - included
  if (value === true) {
    return (
      <div className="flex justify-center">
        <FaCheck
          className={cn(
            'text-xl',
            premium && 'text-yellow-600',
            highlight && !premium && 'text-primary',
            !highlight && !premium && 'text-green-500'
          )}
        />
      </div>
    );
  }

  // Boolean false - not included
  if (value === false) {
    return (
      <div className="flex justify-center">
        <FaXmark className="text-gray-400 text-xl" />
      </div>
    );
  }

  // String value (e.g., "Coming Soon")
  if (typeof value === 'string') {
    return (
      <div className="flex items-center justify-center gap-2">
        <FaStar className="text-yellow-500 text-sm" />
        <span className="text-xs text-gray-600 font-medium">{value}</span>
      </div>
    );
  }

  return null;
}
