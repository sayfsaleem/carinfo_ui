'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaStar, FaArrowRight } from 'react-icons/fa6';
import Button from '../ui/Button';
import { shouldShowBanner, dismissBanner, getTargetTier, getTargetTierPricing } from '../../lib/promotionUtils';
import { PRICING_TIERS } from '../../lib/demoData';

/**
 * FloatingUpgradeBanner Component
 * Dismissible floating banner that appears after delay
 * Shows value proposition based on current tier
 *
 * @param {string} currentTier - Current user tier
 * @param {number} delay - Delay before showing (ms), default 30000 (30s)
 * @param {Function} onUpgrade - Callback when upgrade clicked
 */
export default function FloatingUpgradeBanner({
  currentTier,
  delay = 30000,
  onUpgrade
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Don't show for gold tier or if recently dismissed
    if (currentTier === PRICING_TIERS.GOLD || !shouldShowBanner(currentTier)) {
      return;
    }

    // Show banner after delay
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Add pulse animation every 10 seconds
      const pulseInterval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }, 10000);

      return () => clearInterval(pulseInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentTier, delay]);

  const handleDismiss = () => {
    dismissBanner();
    setIsVisible(false);
  };

  const handleUpgrade = () => {
    setIsVisible(false);
    onUpgrade?.();
  };

  const targetTier = getTargetTier(currentTier);
  const pricing = getTargetTierPricing(currentTier);

  if (!targetTier || !isVisible) return null;

  const isSilverPromo = targetTier === PRICING_TIERS.SILVER;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isPulsing ? 1.05 : 1
          }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 20
          }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div className={`
            ${isSilverPromo
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
              : 'bg-gradient-to-br from-yellow-500 to-orange-600'
            }
            rounded-2xl shadow-2xl text-white overflow-hidden
          `}>
            {/* Animated background sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: 0
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Dismiss banner"
              >
                <FaXmark className="text-lg" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <FaStar className="text-3xl" />
                  </div>
                </motion.div>

                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-black mb-2">
                    {isSilverPromo
                      ? 'Unlock Full MOT History'
                      : 'Get Complete Vehicle Intelligence'
                    }
                  </h3>
                  <p className="text-sm opacity-90 mb-3">
                    {isSilverPromo
                      ? 'See 6+ years of test records, advisories, and mileage history'
                      : 'Access keeper history, professional valuation, and premium insights'
                    }
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black">{pricing.price}</span>
                    <span className="text-sm opacity-90">{pricing.period}</span>
                  </div>

                  {/* Features */}
                  <div className="text-xs opacity-90 mb-4 space-y-1">
                    <p>✓ Instant access to all features</p>
                    <p>✓ Cancel anytime, no commitment</p>
                    <p>✓ 7-day money-back guarantee</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleUpgrade}
                    variant="secondary"
                    size="md"
                    className="w-full bg-white text-gray-900 hover:bg-gray-50 font-bold"
                  >
                    Upgrade Now
                    <FaArrowRight className="inline ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
