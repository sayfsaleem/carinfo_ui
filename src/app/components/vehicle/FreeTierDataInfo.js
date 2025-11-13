'use client';

import { motion } from 'framer-motion';
import { FaCircleInfo, FaCheck, FaLock } from 'react-icons/fa6';

/**
 * FreeTierDataInfo Component
 * Explains what data is included in the free check vs paid tiers
 */
export default function FreeTierDataInfo({ onUpgrade }) {
  const freeFeatures = [
    'Vehicle Make, Colour & Type',
    'Year of Manufacture',
    'Engine Size & Fuel Type',
    'Current Tax Status & Due Date',
    'Current MOT Status & Expiry',
    'CO2 Emissions Rating',
    'Basic Vehicle Specifications'
  ];

  const paidFeatures = [
    'Complete MOT History (6+ years)',
    'Vehicle Model Information',
    'Detailed Technical Specifications',
    'Mileage Analysis & Charts',
    'Fuel Economy Data',
    'Ownership History',
    'Vehicle Valuation',
    'VIN & Engine Number'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FaCircleInfo className="text-2xl text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            About Your Free Vehicle Check
          </h3>
          <p className="text-gray-600">
            You&apos;re viewing basic vehicle information from the official DVLA database.
            Upgrade to unlock comprehensive vehicle history and detailed reports.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Included in Free */}
        <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaCheck className="text-green-600" />
            Included in FREE Check
          </h4>
          <ul className="space-y-2">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Available with Upgrade */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaLock className="text-blue-600" />
            Unlock with Upgrade
          </h4>
          <ul className="space-y-2 mb-4">
            {paidFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-600 mt-0.5">★</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={onUpgrade}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Upgrade from £2.99/month
          </button>
        </div>
      </div>
    </motion.div>
  );
}
