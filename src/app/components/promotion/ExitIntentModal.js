'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowRight, FaCircleCheck } from 'react-icons/fa6';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { shouldShowExitIntent, markExitIntentShown, dismissPromotion, getTargetTier, getTargetTierPricing } from '../../lib/promotionUtils';
import { PRICING_TIERS } from '../../lib/demoData';

/**
 * ExitIntentModal Component
 * Detect when user is about to leave and show special offer
 * Only shows once per session for non-gold users
 *
 * @param {string} currentTier - Current user tier
 * @param {Function} onUpgrade - Callback when upgrade clicked
 * @param {string} offerText - Special offer text (default: "20% off your first month")
 */
export default function ExitIntentModal({
  currentTier,
  onUpgrade,
  offerText = '20% off your first month'
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Don't attach listener for gold users
    if (currentTier === PRICING_TIERS.GOLD) return;

    let timeoutId;

    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && shouldShowExitIntent(currentTier)) {
        // Small delay to avoid false positives
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          markExitIntentShown();
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      // Cancel if mouse comes back quickly
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentTier]);

  const handleClose = () => {
    dismissPromotion('exit-intent', 3); // 3 day cooldown
    setIsOpen(false);
  };

  const handleUpgrade = () => {
    setIsOpen(false);
    onUpgrade?.();
  };

  const targetTier = getTargetTier(currentTier);
  const pricing = getTargetTierPricing(currentTier);

  if (!targetTier) return null;

  const isSilverPromo = targetTier === PRICING_TIERS.SILVER;

  // Calculate discounted price (20% off)
  const originalPrice = pricing.price;
  const discountedPrice = isSilverPromo ? '£2.39' : '£4.79';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      size="medium"
    >
      <div className="text-center space-y-6">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-block"
        >
          <div className={`
            ${isSilverPromo
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
              : 'bg-gradient-to-br from-yellow-500 to-orange-600'
            }
            rounded-full p-6 shadow-2xl inline-block
          `}>
            <FaStar className="text-6xl text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-gray-900 mb-2"
          >
            Wait! Don&apos;t Miss Out
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Get <strong className={isSilverPromo ? 'text-blue-600' : 'text-yellow-600'}>
              {offerText}
            </strong> when you upgrade now
          </motion.p>
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`
            ${isSilverPromo
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
              : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
            }
            rounded-xl p-6 border-2
          `}
        >
          <p className="text-sm text-gray-600 mb-2">Special Limited Offer</p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-2xl text-gray-400 line-through">
              {originalPrice}
            </span>
            <span className="text-5xl font-black text-gray-900">
              {discountedPrice}
            </span>
            <span className="text-lg text-gray-600">/month</span>
          </div>
          <div className={`
            ${isSilverPromo ? 'bg-blue-600' : 'bg-yellow-600'}
            text-white text-sm font-bold px-4 py-2 rounded-full inline-block
          `}>
            Save {isSilverPromo ? '£0.60' : '£1.20'} per month
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 text-left"
        >
          {[
            'Instant access to all premium features',
            'Cancel anytime, no commitment',
            '7-day money-back guarantee',
            'Offer expires when you leave this page'
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <FaCircleCheck className={`
                ${isSilverPromo ? 'text-blue-600' : 'text-yellow-600'}
                text-xl flex-shrink-0
              `} />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleUpgrade}
            variant="primary"
            size="lg"
            className={`
              w-full font-bold text-lg
              ${isSilverPromo
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
              }
              shadow-xl hover:shadow-2xl
            `}
          >
            Claim {offerText}
            <FaArrowRight className="inline ml-2" />
          </Button>

          <button
            onClick={handleClose}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            No thanks, I&apos;ll pay full price
          </button>
        </div>

        {/* Urgency */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-500 pt-4 border-t border-gray-200"
        >
          This offer is only available right now and won&apos;t be shown again
        </motion.p>
      </div>
    </Modal>
  );
}
