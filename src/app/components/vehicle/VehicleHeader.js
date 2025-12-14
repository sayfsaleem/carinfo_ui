'use client';

import { motion } from 'framer-motion';
import { FaCar, FaCalendarDay, FaClock, FaPalette, FaGasPump, FaGear } from 'react-icons/fa6';
import Image from 'next/image';
import { cn, formatVRM, getVehicleAge } from '../../lib/utils';

/**
 * VehicleHeader Component - REMASTERED
 * Clean, mobile-first responsive header with UK number plate
 */
export default function VehicleHeader({ vehicle }) {
  const basicInfo = vehicle?.Report?.BasicVehicleInformation;
  const extendedInfo = vehicle?.Report?.ExtendedVehicleInformation;

  if (!basicInfo) return null;

  const make = basicInfo.Make || 'Unknown';
  const model = basicInfo.Model || '';
  const vrm = basicInfo.VRM || '';
  const year = basicInfo.YearOfManufacture || (basicInfo.ManufacturedDate
    ? new Date(basicInfo.ManufacturedDate).getFullYear()
    : null);
  const age = basicInfo.VehicleAge || getVehicleAge(basicInfo.ManufacturedDate);
  const colour = basicInfo.Colour || 'N/A';
  const fuelType = basicInfo.Fuel || 'N/A';
  const bodyType = basicInfo.Body || 'N/A';
  const imageUrl = extendedInfo?.VehicleImageUrl;

  const quickStats = [
    { label: 'Year', value: year || 'N/A', icon: FaCalendarDay },
    { label: 'Age', value: age || 'N/A', icon: FaClock },
    { label: 'Colour', value: colour, icon: FaPalette },
    { label: 'Fuel', value: fuelType, icon: FaGasPump },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Top Section - Make, Model, Plate */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Make & Model */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {make}
              </h1>
              {(model || bodyType) && (
                <p className="text-base sm:text-lg text-gray-300 mt-1 flex items-center gap-2">
                  <FaCar className="text-gray-400" />
                  <span>{model || bodyType}</span>
                  {model && bodyType && (
                    <>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{bodyType}</span>
                    </>
                  )}
                </p>
              )}
            </div>

            {/* UK Number Plate */}
            <div className="flex-shrink-0">
              <div className="vrm-plate">
                {formatVRM(vrm)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <Icon className="text-blue-500 text-lg mx-auto mb-1.5" />
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{stat.label}</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 truncate">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .vrm-plate {
          background: linear-gradient(to bottom, #FFD700 0%, #FFC800 100%);
          border: 3px solid #000;
          border-radius: 6px;
          padding: 8px 16px;
          font-family: 'Charles Wright', monospace, sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
          color: #000;
          letter-spacing: 0.12em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .vrm-plate {
            font-size: 1.5rem;
            padding: 10px 20px;
            letter-spacing: 0.14em;
          }
        }
      `}</style>
    </motion.div>
  );
}
