'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaXmark, FaStar, FaCrown } from 'react-icons/fa6';
import Button from '../ui/Button';
import { cn, formatCurrency } from '../../lib/utils';

/**
 * PricingCard Component
 * Beautiful pricing tier card with glass-morphism effect
 *
 * @param {object} plan - Plan object from PRICING_PLANS
 * @param {function} onSelect - Function to call when CTA is clicked
 * @param {string} className - Additional CSS classes
 */
export default function PricingCard({ plan, onSelect, className = '' }) {
  const {
    tier,
    title,
    price,
    period,
    description,
    popular,
    features,
    ctaText,
    ctaAction
  } = plan;

  const isPopular = popular;
  const isFree = tier === 'basic';
  const isPremium = tier === 'gold';

  // Format price display
  const priceDisplay = typeof price === 'number' ? `£${price.toFixed(2)}` : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 }
      }}
      className={cn(
        'relative rounded-3xl p-8 transition-all duration-300',
        'bg-white/80 backdrop-blur-lg border-2',
        isPopular
          ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10'
          : 'border-gray-200 shadow-xl hover:shadow-2xl',
        className
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
            <FaStar className="text-yellow-300" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute -top-4 right-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
            <FaCrown />
            <span>Premium</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8 mt-2">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        {isFree ? (
          <div className="text-5xl font-bold text-gray-900">Free</div>
        ) : (
          <>
            <div
              className={cn(
                'text-5xl font-bold mb-1',
                isPremium
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent'
              )}
            >
              {priceDisplay}
            </div>
            <div className="text-gray-600 text-sm">{period}</div>
          </>
        )}
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => {
          const isIncluded = feature.included === true;
          const isNotIncluded = feature.included === false;
          const isComingSoon = typeof feature.included === 'string';
          const isHighlighted = feature.highlight;

          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {isIncluded && (
                  <FaCheck
                    className={cn(
                      'text-lg',
                      isHighlighted ? 'text-green-600' : 'text-green-500'
                    )}
                  />
                )}
                {isNotIncluded && (
                  <FaXmark className="text-gray-400 text-lg" />
                )}
                {isComingSoon && (
                  <FaStar className="text-yellow-500 text-sm" />
                )}
              </div>

              {/* Text */}
              <span
                className={cn(
                  'text-sm leading-relaxed',
                  isIncluded && !isHighlighted && 'text-gray-700',
                  isIncluded && isHighlighted && 'text-gray-900 font-semibold',
                  isNotIncluded && 'text-gray-400 line-through',
                  isComingSoon && 'text-gray-700'
                )}
              >
                {feature.text}
                {isComingSoon && (
                  <span className="ml-2 text-xs text-yellow-600 font-medium">
                    ({feature.included})
                  </span>
                )}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* CTA Button */}
      <Button
        variant={isPopular ? 'primary' : 'secondary'}
        fullWidth
        size="lg"
        onClick={() => onSelect(tier, price)}
        className={cn(
          'font-bold',
          isPremium && !isPopular && 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 border-0 hover:from-yellow-600 hover:to-yellow-700'
        )}
      >
        {ctaText}
      </Button>

      {/* Security note for free plan */}
      {isFree && (
        <p className="text-center text-xs text-gray-500 mt-4">
          No credit card required
        </p>
      )}
    </motion.div>
  );
}
