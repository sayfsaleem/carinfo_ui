'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowUp, FaShare, FaDownload, FaBookmark } from 'react-icons/fa6';
import Button from '../ui/Button';
import { getTargetTier, getTargetTierPricing } from '../../lib/promotionUtils';
import { PRICING_TIERS } from '../../lib/demoData';

/**
 * StickyUpgradeBar Component
 * Sticky bottom bar with upgrade CTA and action buttons
 * Only shows for basic/silver users
 * Collapses on scroll up, expands on scroll down
 *
 * @param {string} currentTier - Current user tier
 * @param {Function} onUpgrade - Callback when upgrade clicked
 * @param {Function} onShare - Callback when share clicked
 * @param {Function} onDownload - Callback when download clicked
 * @param {Function} onSave - Callback when save clicked
 * @param {boolean} showActions - Show action buttons (share, download, save)
 */
export default function StickyUpgradeBar({
  currentTier,
  onUpgrade,
  onShare,
  onDownload,
  onSave,
  showActions = true
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Don't show for gold users
    if (currentTier === PRICING_TIERS.GOLD) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide bar when at very top
      if (currentScrollY < 100) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      // Collapse when scrolling down, expand when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, currentTier]);

  const targetTier = getTargetTier(currentTier);
  const pricing = getTargetTierPricing(currentTier);

  if (!targetTier) return null;

  const isSilverPromo = targetTier === PRICING_TIERS.SILVER;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
        >
          <div className="container-custom mx-auto px-4 pb-4 pointer-events-auto">
            <motion.div
              animate={{ height: isExpanded ? 'auto' : '60px' }}
              transition={{ duration: 0.3 }}
              className={`
                ${isSilverPromo
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700'
                  : 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600'
                }
                rounded-2xl shadow-2xl text-white overflow-hidden
              `}
            >
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col md:flex-row items-center gap-4"
                    >
                      {/* Left: Message */}
                      <div className="flex items-center gap-3 flex-1">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <FaStar className="text-3xl" />
                        </motion.div>

                        <div>
                          <h3 className="font-bold text-lg">
                            {isSilverPromo
                              ? 'Unlock Full MOT History'
                              : 'Get Complete Intelligence'
                            }
                          </h3>
                          <p className="text-sm opacity-90">
                            {isSilverPromo
                              ? 'Access 6+ years of records for '
                              : 'Get valuation & keeper history for '
                            }
                            <strong>{pricing.price}{pricing.period}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Middle: Action Buttons (if enabled) */}
                      {showActions && (
                        <div className="flex gap-2">
                          <button
                            onClick={onShare}
                            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            title="Share"
                          >
                            <FaShare className="text-lg" />
                          </button>
                          <button
                            onClick={onDownload}
                            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            title="Download"
                          >
                            <FaDownload className="text-lg" />
                          </button>
                          <button
                            onClick={onSave}
                            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            title="Save"
                          >
                            <FaBookmark className="text-lg" />
                          </button>
                        </div>
                      )}

                      {/* Right: Upgrade CTA */}
                      <Button
                        onClick={onUpgrade}
                        variant="secondary"
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-50 font-bold whitespace-nowrap"
                      >
                        Upgrade Now
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FaStar className="text-2xl" />
                        <span className="font-bold">
                          Upgrade to {isSilverPromo ? 'Silver' : 'Gold'}
                        </span>
                      </div>

                      <Button
                        onClick={onUpgrade}
                        variant="secondary"
                        size="md"
                        className="bg-white text-gray-900 hover:bg-gray-50 font-bold"
                      >
                        {pricing.price}{pricing.period}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scroll indicator when collapsed */}
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-1 left-1/2 -translate-x-1/2"
                >
                  <FaArrowUp className="text-white/50 text-xs animate-bounce" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
