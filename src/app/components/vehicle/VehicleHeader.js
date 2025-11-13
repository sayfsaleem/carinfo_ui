'use client';

import { motion } from 'framer-motion';
import { FaCar, FaCalendarDay, FaClock, FaPalette, FaGasPump } from 'react-icons/fa6';
import Image from 'next/image';
import Badge from '../ui/Badge';
import QuickStat from './QuickStat';
import Card from '../ui/Card';
import { cn, formatVRM, getVehicleAge } from '../../lib/utils';

/**
 * VehicleHeader Component
 * Large prominent header showing vehicle details with UK number plate
 *
 * @param {object} vehicle - Vehicle data object
 */
export default function VehicleHeader({ vehicle }) {
  const basicInfo = vehicle?.Report?.BasicVehicleInformation;
  const extendedInfo = vehicle?.Report?.ExtendedVehicleInformation;

  if (!basicInfo) return null;

  const make = basicInfo.Make || 'Unknown Make';
  const model = basicInfo.Model || '';
  const vrm = basicInfo.VRM || '';
  const year = basicInfo.ManufacturedDate
    ? new Date(basicInfo.ManufacturedDate).getFullYear()
    : null;
  const age = basicInfo.VehicleAge || getVehicleAge(basicInfo.ManufacturedDate);
  const colour = basicInfo.Colour || 'N/A';
  const fuelType = basicInfo.Fuel || 'N/A';
  const bodyType = basicInfo.Body || 'N/A';
  const imageUrl = extendedInfo?.VehicleImageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden relative border-0 shadow-2xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Left: Vehicle Image */}
          <div className="lg:col-span-1">
            <div className="relative w-full aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${make} ${model}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800">
                  <FaCar className="text-6xl text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Middle: Vehicle Info */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            {/* Make & Model */}
            <h1 className="text-4xl font-black mb-3 leading-tight">
              {make}
            </h1>
            {model && (
              <p className="text-xl text-gray-300 mb-4">
                {model}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant="info" size="lg" className="bg-blue-500/20 border-blue-400/50 text-blue-300">
                {bodyType}
              </Badge>
              <Badge variant="default" size="lg" className="bg-white/10 border-white/30 text-white">
                {fuelType}
              </Badge>
            </div>

            {/* UK Number Plate */}
            <div className="inline-block w-fit">
              <div className="vrm-plate">
                {formatVRM(vrm)}
              </div>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            <QuickStat
              icon={FaCalendarDay}
              label="Year"
              value={year || 'N/A'}
            />
            <QuickStat
              icon={FaClock}
              label="Age"
              value={age}
            />
            <QuickStat
              icon={FaPalette}
              label="Color"
              value={colour}
            />
            <QuickStat
              icon={FaGasPump}
              label="Fuel"
              value={fuelType}
            />
          </div>
        </div>
      </Card>

      <style jsx>{`
        .vrm-plate {
          background: linear-gradient(to bottom, #FFD700 0%, #FFC800 100%);
          border: 3px solid #000;
          border-radius: 6px;
          padding: 12px 24px;
          font-family: 'Charles Wright', monospace, sans-serif;
          font-size: 2rem;
          font-weight: 900;
          color: #000;
          letter-spacing: 0.15em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          text-align: center;
          text-transform: uppercase;
          transition: transform 0.2s ease;
        }

        .vrm-plate:hover {
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .vrm-plate {
            font-size: 1.5rem;
            padding: 10px 20px;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </motion.div>
  );
}
