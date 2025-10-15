'use client';

import { motion } from 'framer-motion';
import { FaLock, FaStar, FaArrowRight } from 'react-icons/fa6';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { trackLockedFeatureView } from '../../lib/promotionUtils';

/**
 * FeatureLock Component
 * Overlay for locked tier features
 * Supports two variants: full (card) and inline (compact)
 *
 * @param {string} feature - Feature name
 * @param {string} description - Feature description
 * @param {Function} onUpgrade - Callback when upgrade button clicked
 * @param {string} targetTier - Target tier needed ('silver' or 'gold')
 * @param {string} variant - Display variant ('full' or 'inline')
 * @param {boolean} showComparison - Show "Compare Plans" button
 */
export default function FeatureLock({
  feature,
  description,
  onUpgrade,
  targetTier = 'gold',
  variant = 'full',
  showComparison = false
}) {
  const handleClick = () => {
    trackLockedFeatureView(feature);
    onUpgrade?.();
  };

  // Inline variant - compact version
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className={`
          ${targetTier === 'silver'
            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
          }
          rounded-xl border-2 p-8 text-center
        `}>
          {/* Lock Icon */}
          <div className="inline-block mb-4">
            <div className="relative">
              <FaLock className="text-4xl text-gray-400" />
              <div className={`
                absolute -top-1 -right-1 rounded-full p-1.5 shadow-lg
                ${targetTier === 'silver' ? 'bg-blue-600' : 'bg-yellow-500'}
              `}>
                <FaStar className="text-white text-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {feature}
          </h3>

          <p className="text-gray-600 mb-6">
            {description || `This feature requires ${targetTier === 'silver' ? 'Silver' : 'Gold'} tier`}
          </p>

          {/* CTA */}
          <Button
            onClick={handleClick}
            variant="primary"
            size="md"
            className={`
              font-bold
              ${targetTier === 'silver'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
              }
            `}
          >
            Unlock with {targetTier === 'silver' ? 'Silver' : 'Gold'}
            <FaArrowRight className="inline ml-2" />
          </Button>

          {showComparison && (
            <button
              onClick={handleClick}
              className="block mx-auto mt-3 text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Compare plans
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // Full variant - original card version
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[400px] flex items-center justify-center">
        <div className="text-center px-6 py-12 max-w-lg">
          {/* Lock Icon with Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 2
            }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <FaLock className="text-7xl text-gray-400" />
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2 shadow-lg">
                <FaStar className="text-white text-xl" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            {feature}
          </h3>

          <p className="text-lg text-gray-600 mb-6">
            {description || 'This premium feature is available exclusively for Gold tier members.'}
          </p>

          {/* Upgrade Benefits */}
          <div className={`
            bg-white rounded-lg border-2 p-4 mb-6 text-left
            ${targetTier === 'silver' ? 'border-blue-300' : 'border-yellow-300'}
          `}>
            <p className={`
              text-sm font-bold mb-2
              ${targetTier === 'silver' ? 'text-blue-700' : 'text-yellow-700'}
            `}>
              {targetTier === 'silver' ? '⭐ Unlock with Silver Tier' : '🌟 Unlock with Gold Tier'}
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {targetTier === 'silver' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Full MOT History (6+ years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Mileage Progression Chart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Environmental Data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Previous Keeper Count</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Keeper Duration History</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Professional Vehicle Valuation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Additional Mileage Records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Priority Support</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleClick}
            variant="primary"
            size="lg"
            className={`
              w-full font-bold shadow-lg hover:shadow-xl transition-all
              ${targetTier === 'silver'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
              }
              text-white
            `}
          >
            <FaStar className="inline mr-2" />
            Upgrade to {targetTier === 'silver' ? 'Silver - £2.99' : 'Gold - £5.99'}
          </Button>

          <p className="text-xs text-gray-500 mt-3">
            {targetTier === 'silver' ? 'Monthly billing • Cancel anytime' : 'Monthly billing • Cancel anytime'}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
