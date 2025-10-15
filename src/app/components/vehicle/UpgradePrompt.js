'use client';

import { motion } from 'framer-motion';
import { FaStar, FaCircleCheck, FaArrowRight } from 'react-icons/fa6';
import Button from '../ui/Button';
import Card from '../ui/Card';

/**
 * UpgradePrompt Component
 * Inline CTA to upgrade from Silver to Gold
 *
 * @param {Function} onUpgrade - Callback when upgrade button clicked
 * @param {string} className - Additional CSS classes
 */
export default function UpgradePrompt({ onUpgrade, className = '' }) {
  const goldFeatures = [
    'Complete Keeper History with Duration Details',
    'Professional Vehicle Valuation',
    'Additional Mileage Records & Anomaly Detection',
    'Time Between Previous Keepers',
    'Priority Customer Support',
    'API Access (Beta)'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="border-none bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white shadow-2xl overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

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
                <div className="bg-white text-yellow-600 rounded-full p-4 shadow-lg inline-block">
                  <FaStar className="text-5xl" />
                </div>
              </motion.div>

              <h2 className="text-3xl lg:text-4xl font-black mb-3">
                Unlock Gold Features
              </h2>

              <p className="text-xl font-medium opacity-90 mb-4">
                Get complete vehicle insights
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">£5.99</span>
                <span className="text-lg opacity-90">one-time</span>
              </div>
            </div>

            {/* Middle: Features List */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 opacity-90">
                What you&apos;ll get:
              </h3>

              <ul className="space-y-3">
                {goldFeatures.map((feature, index) => (
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
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-1 flex flex-col justify-center items-center text-center">
              <div className="space-y-4 w-full max-w-xs">
                <Button
                  onClick={onUpgrade}
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-yellow-600 hover:bg-gray-50 font-bold text-lg py-4 shadow-xl hover:shadow-2xl transition-all"
                >
                  Upgrade Now
                  <FaArrowRight className="inline ml-2" />
                </Button>

                <div className="space-y-2 text-sm opacity-90">
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>Instant Access</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>No Subscription</span>
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FaCircleCheck />
                    <span>Lifetime Access to Report</span>
                  </p>
                </div>

                <p className="text-xs opacity-75 mt-4">
                  Secure payment • 100% money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
