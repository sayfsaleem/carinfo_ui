'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaStar, FaCheck, FaLock, FaArrowRight } from 'react-icons/fa6';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { getTargetTier, getTargetTierPricing, markPopupShown } from '../../lib/promotionUtils';
import { PRICING_TIERS } from '../../lib/demoData';
import { PRICING_PLANS } from '../../lib/constants';
import { useEffect } from 'react';

/**
 * FeatureComparisonPopup Component
 * Modal showing tier comparison when user clicks locked feature
 * Displays side-by-side what they have vs what they're missing
 *
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Callback to close modal
 * @param {string} currentTier - Current user tier
 * @param {string} lockedFeature - Name of the locked feature clicked
 * @param {Function} onUpgrade - Callback when upgrade clicked
 */
export default function FeatureComparisonPopup({
  isOpen,
  onClose,
  currentTier,
  lockedFeature = 'Premium Feature',
  onUpgrade
}) {
  useEffect(() => {
    if (isOpen) {
      markPopupShown('comparison');
    }
  }, [isOpen]);

  const targetTier = getTargetTier(currentTier);
  const pricing = getTargetTierPricing(currentTier);

  if (!targetTier) return null;

  const currentPlan = PRICING_PLANS[currentTier];
  const targetPlan = PRICING_PLANS[targetTier];

  const handleUpgrade = () => {
    onClose();
    onUpgrade?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="large"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <div className={`
              ${targetTier === PRICING_TIERS.SILVER
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                : 'bg-gradient-to-br from-yellow-500 to-orange-600'
              }
              rounded-full p-4 shadow-xl
            `}>
              <FaLock className="text-4xl text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {lockedFeature} is Locked
          </h2>
          <p className="text-lg text-gray-600">
            Upgrade to {targetPlan.title} to unlock this feature and more
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
                Your Current Plan
              </h3>
              <div className="text-2xl font-black text-gray-900">{currentPlan.title}</div>
              <div className="text-xl font-bold text-gray-600 mt-1">
                {currentPlan.price === 0 ? 'Free' : `£${currentPlan.price}/month`}
              </div>
            </div>

            <ul className="space-y-3">
              {currentPlan.features.slice(0, 5).map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {feature.included ? (
                    <FaCheck className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
                  ) : (
                    <FaXmark className="text-gray-300 text-lg flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Target Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`
              ${targetTier === PRICING_TIERS.SILVER
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
                : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
              }
              rounded-xl p-6 border-2 relative overflow-hidden
            `}
          >
            {/* Badge */}
            <div className="absolute top-3 right-3">
              <div className={`
                ${targetTier === PRICING_TIERS.SILVER
                  ? 'bg-blue-600'
                  : 'bg-yellow-600'
                }
                text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1
              `}>
                <FaStar className="text-xs" />
                {targetTier === PRICING_TIERS.SILVER ? 'Popular' : 'Premium'}
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className={`
                text-sm font-bold uppercase mb-2
                ${targetTier === PRICING_TIERS.SILVER ? 'text-blue-700' : 'text-yellow-700'}
              `}>
                Upgrade To
              </h3>
              <div className="text-2xl font-black text-gray-900">{targetPlan.title}</div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                £{targetPlan.price}/month
              </div>
              {pricing.upgradeFrom && (
                <p className="text-xs text-gray-600 mt-1">
                  Just {pricing.upgradeFrom} more
                </p>
              )}
            </div>

            <ul className="space-y-3">
              {targetPlan.features.filter(f => f.highlight).slice(0, 5).map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <FaCheck className={`
                    ${targetTier === PRICING_TIERS.SILVER ? 'text-blue-600' : 'text-yellow-600'}
                    text-lg flex-shrink-0 mt-0.5
                  `} />
                  <span className="text-sm font-medium text-gray-900">
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <p className="text-center text-sm text-gray-700">
            <FaCheck className="inline text-green-600 mr-2" />
            <strong>Instant access</strong> to all {targetPlan.title} features •
            <strong className="mx-2">Cancel anytime</strong> •
            <strong className="ml-2">7-day money-back guarantee</strong>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleUpgrade}
            variant="primary"
            size="lg"
            className={`
              flex-1 font-bold
              ${targetTier === PRICING_TIERS.SILVER
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
              }
            `}
          >
            Upgrade to {targetPlan.title}
            <FaArrowRight className="inline ml-2" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
