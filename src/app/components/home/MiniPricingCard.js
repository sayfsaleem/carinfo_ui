'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaStar } from 'react-icons/fa6';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

/**
 * MiniPricingCard Component
 * Compact pricing card for homepage preview
 *
 * @param {string} tier - Tier name (basic, silver, gold)
 * @param {string} price - Price display (e.g., "FREE", "£2.99")
 * @param {boolean} popular - Mark as popular
 * @param {Array} features - Array of feature strings
 * @param {string} cta - Call-to-action button text
 * @param {boolean} highlight - Highlight this card
 */
export default function MiniPricingCard({
  tier,
  price,
  popular = false,
  features = [],
  cta,
  highlight = false
}) {
  const tierColors = {
    basic: 'from-gray-500 to-gray-600',
    silver: 'from-blue-500 to-blue-600',
    gold: 'from-yellow-500 to-orange-500'
  };

  const tierNames = {
    basic: 'Basic',
    silver: 'Silver',
    gold: 'Gold'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <FaStar className="text-yellow-300" />
            Most Popular
          </div>
        </div>
      )}

      <Card
        hover
        glow={highlight}
        className={cn(
          'h-full',
          highlight && 'border-2 border-blue-500 shadow-2xl scale-105'
        )}
      >
        {/* Tier Badge */}
        <div className={cn(
          'inline-block px-4 py-2 rounded-xl bg-gradient-to-r text-white font-bold text-sm mb-4 shadow-md',
          tierColors[tier]
        )}>
          {tierNames[tier]}
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="text-4xl font-black text-gray-900 mb-1">
            {price}
          </div>
          {price !== 'FREE' && (
            <div className="text-sm text-gray-600">per month</div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={highlight ? 'primary' : 'secondary'}
          className="w-full"
        >
          {cta}
        </Button>
      </Card>
    </motion.div>
  );
}
