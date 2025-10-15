'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCar, FaEye, FaTrash, FaStar } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * SavedVehicleCard Component
 * Display saved vehicle with quick actions
 */
export default function SavedVehicleCard({ vehicle, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { vrm, make, model, color, year, savedDate, motExpiry, favorite } = vehicle;

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (onRemove) {
      onRemove(vrm);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const isMotExpiringSoon = () => {
    if (!motExpiry) return false;
    const expiryDate = new Date(motExpiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isMotExpired = () => {
    if (!motExpiry) return false;
    const expiryDate = new Date(motExpiry);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className="relative group">
        {/* Favorite Star */}
        {favorite && (
          <div className="absolute top-4 right-4">
            <FaStar className="text-yellow-400 text-xl" />
          </div>
        )}

        {/* Vehicle Icon */}
        <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <FaCar className="text-white text-2xl" />
        </div>

        {/* VRM */}
        <div className="font-mono font-bold text-2xl text-gray-900 mb-2">
          {vrm}
        </div>

        {/* Vehicle Details */}
        <div className="text-gray-600 mb-4">
          <div className="font-semibold">{make} {model}</div>
          <div className="text-sm">
            {year} {color && `• ${color}`}
          </div>
        </div>

        {/* MOT Status */}
        {motExpiry && (
          <div className="mb-4">
            {isMotExpired() ? (
              <Badge variant="danger" size="sm" fullWidth>
                MOT Expired
              </Badge>
            ) : isMotExpiringSoon() ? (
              <Badge variant="warning" size="sm" fullWidth>
                MOT Expiring Soon
              </Badge>
            ) : (
              <Badge variant="success" size="sm" fullWidth>
                MOT Valid Until {formatDate(motExpiry)}
              </Badge>
            )}
          </div>
        )}

        {/* Saved Date */}
        <div className="text-xs text-gray-500 mb-4">
          Saved on {formatDate(savedDate)}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/check/${vrm}`} className="flex-1">
            <Button variant="primary" size="sm" fullWidth>
              <FaEye />
              View Details
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={handleRemove}
            disabled={isRemoving}
            loading={isRemoving}
          >
            <FaTrash />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
