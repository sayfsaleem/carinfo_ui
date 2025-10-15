'use client';

import { motion } from 'framer-motion';
import { FaUser, FaUserCheck, FaClock, FaCalendarDays } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDate, cn } from '../../lib/utils';

/**
 * KeeperHistoryTimeline Component (GOLD TIER ONLY)
 * Timeline of previous vehicle keepers/owners
 *
 * @param {object} keeperData - Keeper duration details from API
 */
export default function KeeperHistoryTimeline({ keeperData }) {
  if (!keeperData || !keeperData.KeeperInformation || keeperData.KeeperInformation.length === 0) {
    return (
      <div className="text-center py-12">
        <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No keeper history available for this vehicle.</p>
      </div>
    );
  }

  const keepers = keeperData.KeeperInformation;
  const endDate = keeperData.EndDateOfCalculations;

  // Sort keepers by keeper number (oldest first)
  const sortedKeepers = [...keepers].sort((a, b) => a.KeeperNumber - b.KeeperNumber);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FaUser className="text-primary-600" />
          Keeper History
        </h2>
        <p className="text-gray-600">
          Complete ownership timeline for {keeperData.Vrm}
        </p>
        {endDate && (
          <p className="text-sm text-gray-500 mt-1">
            Data calculated as of: {endDate}
          </p>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200"
          style={{ marginLeft: '-0.5px' }}
        />

        {/* Timeline Items */}
        <div className="space-y-8">
          {sortedKeepers.map((keeper, index) => {
            const isCurrentKeeper = keeper.IsLatestKeeper;
            const acquiredDate = keeper.KeeperAcquired;
            const disposedDate = keeper.KeeperDisposed;
            const durationDesc = keeper.DaysBetweenKeeperAcquiredAndKeeperDisposed_Description;
            const gapToNextDesc = keeper.DaysBetweenKeeperDisposedAndNextKeeperAcquired_Description;
            const currentDurationDesc = keeper.DaysBetweenLatestKeeperAcquiredAndToday_Description;

            return (
              <div key={keeper.KeeperNumber} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      'w-5 h-5 rounded-full border-4 border-white shadow-lg',
                      isCurrentKeeper
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : 'bg-gradient-to-br from-blue-400 to-blue-600'
                    )}
                  >
                    {isCurrentKeeper && (
                      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                    )}
                  </motion.div>
                </div>

                {/* Keeper Card */}
                <div className="ml-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        'border-l-4 transition-all duration-300 hover:shadow-lg',
                        isCurrentKeeper
                          ? 'border-green-500 bg-gradient-to-r from-green-50 to-white'
                          : 'border-blue-500 bg-white'
                      )}
                    >
                      <div className="space-y-4">
                        {/* Keeper Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                Keeper #{keeper.KeeperNumber}
                              </h3>
                              {isCurrentKeeper && (
                                <Badge variant="success" size="lg">
                                  <FaUserCheck className="inline mr-1" />
                                  Current Owner
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className={cn(
                            'text-3xl',
                            isCurrentKeeper ? 'text-green-600' : 'text-blue-600'
                          )}>
                            <FaUser />
                          </div>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Acquired Date */}
                          <div className="flex items-start gap-3">
                            <FaCalendarDays className="text-green-600 text-xl flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-600">Acquired</p>
                              <p className="text-base font-bold text-gray-900">
                                {formatDate(acquiredDate, 'long')}
                              </p>
                            </div>
                          </div>

                          {/* Disposed Date */}
                          {disposedDate && (
                            <div className="flex items-start gap-3">
                              <FaCalendarDays className="text-red-600 text-xl flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-sm font-medium text-gray-600">Disposed</p>
                                <p className="text-base font-bold text-gray-900">
                                  {formatDate(disposedDate, 'long')}
                                </p>
                              </div>
                            </div>
                          )}

                          {!disposedDate && isCurrentKeeper && (
                            <div className="flex items-start gap-3">
                              <FaClock className="text-green-600 text-xl flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-sm font-medium text-gray-600">Status</p>
                                <p className="text-base font-bold text-green-700">
                                  Still Owner
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FaClock className="text-primary-600" />
                            <p className="text-sm font-medium text-gray-600">
                              {isCurrentKeeper ? 'Current Ownership Duration' : 'Ownership Duration'}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {isCurrentKeeper && currentDurationDesc
                              ? currentDurationDesc
                              : durationDesc || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Gap to Next Keeper */}
                {gapToNextDesc && !isCurrentKeeper && (
                  <div className="ml-16 mt-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm"
                    >
                      <p className="text-yellow-800">
                        <span className="font-medium">Gap before next keeper:</span>{' '}
                        {gapToNextDesc}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: sortedKeepers.length * 0.1 }}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-3xl font-bold text-blue-700">
              {sortedKeepers.length}
            </p>
            <p className="text-sm text-gray-600">
              Total Keeper{sortedKeepers.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-3xl font-bold text-green-700">
              {sortedKeepers.filter(k => k.IsLatestKeeper).length}
            </p>
            <p className="text-sm text-gray-600">Current Owner</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-3xl font-bold text-purple-700">
              {(() => {
                const currentKeeper = sortedKeepers.find(k => k.IsLatestKeeper);
                return currentKeeper?.DaysBetweenLatestKeeperAcquiredAndToday
                  ? Math.floor(currentKeeper.DaysBetweenLatestKeeperAcquiredAndToday / 365)
                  : 0;
              })()}+
            </p>
            <p className="text-sm text-gray-600">Years with Current Owner</p>
          </div>
        </div>
      </motion.div>

      {/* Gold Tier Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-yellow-600 font-medium text-sm pt-4"
      >
        <span className="text-xl">⭐</span>
        <span>Gold Tier Feature - Detailed Keeper History</span>
      </motion.div>
    </div>
  );
}
