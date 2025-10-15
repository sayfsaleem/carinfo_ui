'use client';

import { motion } from 'framer-motion';
import { FaStar, FaCircleCheck, FaArrowRight, FaXmark } from 'react-icons/fa6';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getTargetTier, getTargetTierFeatures, getTargetTierPricing, getPromotionMessage, dismissPromotion } from '../../lib/promotionUtils';
import { PRICING_TIERS } from '../../lib/demoData';
import { useState } from 'react';

/**
 * TierUpgradePrompt Component
 * Context-aware inline promotion to upgrade tier
 * Shows different messaging based on current tier and context
 *
 * @param {string} currentTier - Current user tier ('basic' or 'silver')
 * @param {string} context - Context for messaging ('unlock-mot-history', 'unlock-valuation', etc.)
 * @param {Function} onUpgrade - Callback when upgrade button clicked
 * @param {boolean} dismissible - Whether user can dismiss this prompt
 * @param {string} className - Additional CSS classes
 */
export default function TierUpgradePrompt({
  currentTier,
  context = 'default',
  onUpgrade,
  dismissible = true,
  className = ''
}) {
  const [isDismissed, setIsDismissed] = useState(false);

  const targetTier = getTargetTier(currentTier);
  const features = getTargetTierFeatures(currentTier);
  const pricing = getTargetTierPricing(currentTier);
  const message = getPromotionMessage(currentTier, context);

  // Don't show for gold tier or if dismissed
  if (currentTier === PRICING_TIERS.GOLD || !targetTier || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    dismissPromotion(`tier-prompt-${context}`, 7);
    setIsDismissed(true);
  };

  // Color scheme based on target tier
  const colorScheme = targetTier === PRICING_TIERS.SILVER
    ? {
        gradient: 'from-blue-500 via-blue-600 to-indigo-600',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    : {
        gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
        icon: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-700',
        button: 'bg-yellow-600 hover:bg-yellow-700'
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className={`border-none bg-gradient-to-br ${colorScheme.gradient} text-white shadow-2xl overflow-hidden relative`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <FaXmark className="text-white text-lg" />
          </button>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Badge & Heading */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-4"
              >
                <div className="bg-white rounded-full p-4 shadow-lg inline-block">
                  <FaStar className={`text-5xl ${colorScheme.icon}`} />
                </div>
              </motion.div>

              <div className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold ${colorScheme.badge} w-fit`}>
                {targetTier === PRICING_TIERS.SILVER ? 'Most Popular' : 'Premium'}
              </div>

              <h2 className="text-3xl lg:text-4xl font-black mb-3">
                {message}
              </h2>

              <p className="text-xl font-medium opacity-90 mb-4">
                Upgrade to {targetTier === PRICING_TIERS.SILVER ? 'Silver' : 'Gold'} tier
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{pricing.price}</span>
                <span className="text-lg opacity-90">{pricing.period}</span>
              </div>

              {pricing.upgradeFrom && (
                <p className="text-sm opacity-90 mt-2">
                  Just {pricing.upgradeFrom} from Silver
                </p>
              )}

              {pricing.annual && (
                <p className="text-xs opacity-75 mt-2 bg-white/20 rounded-lg px-3 py-2 inline-block">
                  {pricing.annual}
                </p>
              )}
            </div>

            {/* Middle: Features List */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 opacity-90">
                What you&apos;ll get:
              </h3>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FaCircleCheck className="text-2xl flex-shrink-0 mt-0.5" />
                    <span className="text-base font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90 mb-2">Also includes:</p>
                <p className="text-xs opacity-75">
                  Everything from {currentTier === PRICING_TIERS.BASIC ? 'Basic' : 'Basic & Silver'} tier
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-1 flex flex-col justify-center items-center text-center">
              <div className="space-y-4 w-full max-w-xs">
                <Button
                  onClick={onUpgrade}
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-gray-900 hover:bg-gray-50 font-bold text-lg py-4 shadow-xl hover:shadow-2xl transition-all"
                >
                  Upgrade to {targetTier === PRICING_TIERS.SILVER ? 'Silver' : 'Gold'}
                  <FaArrowRight className="inline ml-2" />
                </Button>

                <div className="space-y-2 text-sm opacity-90">
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>Instant Access</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>Cancel Anytime</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>7-Day Money Back Guarantee</span>
                  </p>
                </div>

                <p className="text-xs opacity-75 mt-4">
                  Secure payment • No commitments
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
