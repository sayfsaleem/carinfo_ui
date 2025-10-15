'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCar, FaClock, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

/**
 * VehicleCheckCard Component
 * Display recent vehicle check preview
 */
export default function VehicleCheckCard({ check }) {
  const { vrm, make, model, color, checkDate, motStatus, taxStatus } = check;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Link href={`/check/${vrm}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card hover className="cursor-pointer">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-xl flex items-center justify-center flex-shrink-0">
              <FaCar className="text-white text-xl" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* VRM and Time */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-mono font-bold text-lg text-gray-900">
                  {vrm}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaClock />
                  <span>{formatDate(checkDate)}</span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="text-sm text-gray-600 mb-3">
                {make} {model} {color && `• ${color}`}
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={motStatus === 'valid' ? 'success' : 'danger'}
                  size="sm"
                >
                  {motStatus === 'valid' ? (
                    <>
                      <FaCircleCheck /> MOT Valid
                    </>
                  ) : (
                    <>
                      <FaCircleXmark /> MOT Expired
                    </>
                  )}
                </Badge>
                <Badge
                  variant={taxStatus === 'taxed' ? 'success' : 'danger'}
                  size="sm"
                >
                  {taxStatus === 'taxed' ? (
                    <>
                      <FaCircleCheck /> Taxed
                    </>
                  ) : (
                    <>
                      <FaCircleXmark /> Untaxed
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
