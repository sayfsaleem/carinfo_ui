'use client';

import { motion } from 'framer-motion';
import { FaSterlingSign, FaChartLine, FaGauge, FaCalendar } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency, formatMileage, cn } from '../../lib/utils';

/**
 * ValuationCard Component (GOLD TIER ONLY)
 * Display vehicle valuation estimates
 *
 * @param {object} valuationData - Valuation information from API
 */
export default function ValuationCard({ valuationData }) {
  if (!valuationData || !valuationData.HasValuationResults || !valuationData.ValuationResults) {
    return (
      <div className="text-center py-12">
        <FaSterlingSign className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No valuation data available for this vehicle.</p>
      </div>
    );
  }

  const valuation = valuationData.ValuationResults;
  const mileage = valuationData.Mileage;
  const plateYear = valuationData.PlateYear;
  const description = valuationData.VehicleDescription;

  // Calculate price ranges
  const tradeRange = {
    min: parseInt(valuation.TradeAverage),
    max: parseInt(valuation.TradeExcellent),
    avg: Math.round((parseInt(valuation.TradeAverage) + parseInt(valuation.TradeExcellent)) / 2)
  };

  const privateRange = {
    min: parseInt(valuation.PrivateAverage),
    max: parseInt(valuation.PrivateExcellent),
    avg: Math.round((parseInt(valuation.PrivateAverage) + parseInt(valuation.PrivateExcellent)) / 2)
  };

  const retailPrice = parseInt(valuation.Retail);

  // Highest value for display
  const topValue = Math.max(retailPrice, privateRange.max, tradeRange.max);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FaSterlingSign className="text-green-600" />
          Vehicle Valuation
        </h2>
        <p className="text-gray-600">
          Current market value estimates
        </p>
      </motion.div>

      {/* Vehicle Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">{description}</h3>

            <div className="flex flex-wrap items-center gap-4">
              {mileage && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaGauge className="text-primary-600" />
                  <span className="text-sm">
                    <span className="font-medium">Mileage:</span> {formatMileage(mileage)} miles
                  </span>
                </div>
              )}

              {plateYear && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendar className="text-primary-600" />
                  <span className="text-sm">
                    <span className="font-medium">Plate Year:</span> {plateYear}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Valuation - Retail Price */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white border-none shadow-2xl">
          <div className="text-center py-6">
            <Badge variant="success" className="mb-4 bg-white text-green-700 border-2 border-green-300">
              <FaChartLine className="inline mr-1" />
              Retail Value
            </Badge>

            <p className="text-6xl font-black mb-2">
              {formatCurrency(retailPrice)}
            </p>

            <p className="text-lg opacity-90">
              Expected dealer retail price
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Private Sale Range */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaSterlingSign className="text-blue-600" />
            Private Sale Value
          </h3>

          <div className="space-y-4">
            {/* Average to Excellent Range */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price Range</p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(privateRange.min)} - {formatCurrency(privateRange.max)}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-blue-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Average</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.PrivateAverage)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Good</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.PrivateGood)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Excellent</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.PrivateExcellent)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Trade-In Range */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-white">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaSterlingSign className="text-orange-600" />
            Trade-In Value
          </h3>

          <div className="space-y-4">
            {/* Average to Excellent Range */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price Range</p>
                <p className="text-2xl font-bold text-orange-700">
                  {formatCurrency(tradeRange.min)} - {formatCurrency(tradeRange.max)}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-orange-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Average</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.TradeAverage)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Good</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.TradeGood)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Excellent</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(valuation.TradeExcellent)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Value Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-gray-50">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Value Comparison</h4>

          <div className="space-y-3">
            {/* Retail */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Retail</span>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(retailPrice)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(retailPrice / topValue) * 100}%` }}
                />
              </div>
            </div>

            {/* Private (Average) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Private Sale (Avg)</span>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(privateRange.avg)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(privateRange.avg / topValue) * 100}%` }}
                />
              </div>
            </div>

            {/* Trade-In (Average) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Trade-In (Avg)</span>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(tradeRange.avg)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(tradeRange.avg / topValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="text-sm text-gray-500 italic border-t border-gray-200 pt-4"
      >
        <p className="mb-2">
          Valuations are estimates based on current market data, vehicle condition, mileage, and other factors.
          Actual selling prices may vary depending on location, demand, and individual vehicle condition.
        </p>
        <div className="flex items-center gap-2 text-yellow-600 font-medium mt-3">
          <span className="text-xl">⭐</span>
          <span>Gold Tier Feature - Professional Vehicle Valuation</span>
        </div>
      </motion.div>
    </div>
  );
}
