'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCircleCheck,
  FaCircleXmark,
  FaGauge,
  FaChevronDown,
  FaChevronUp,
  FaTriangleExclamation
} from 'react-icons/fa6';
import Badge from '../ui/Badge';
import { formatDate, formatMileage, cn } from '../../lib/utils';

/**
 * MOTTestCard Component
 * Individual MOT test display with expandable advisories/failures
 *
 * @param {object} test - MOT test data
 * @param {number} index - Test number (for display)
 * @param {number} previousMileage - Previous test mileage for comparison
 */
export default function MOTTestCard({ test, index, previousMileage = null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isPassed = test.Result === true || test.ResultText === 'Pass';
  const mileage = test.OdometerModel?.OdometerReading;
  const mileageDiff = test.MileageDifference || (previousMileage ? mileage - previousMileage : 0);
  const hasAdvisories = test.AdvisoryNotices_V2 && test.AdvisoryNotices_V2.length > 0;
  const hasFailures = test.RefusalReasons_V2 && test.RefusalReasons_V2.length > 0;
  const hasDangerousItems = test.AdvisoryNotices_V2?.some(item => item.IsDangerous);

  // Count dangerous items
  const dangerousCount = test.AdvisoryNotices_V2?.filter(item => item.IsDangerous).length || 0;
  const advisoryCount = test.AdvisoryNotices_V2?.filter(item => !item.IsDangerous && item.Type === 'ADVISORY').length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-300',
        isPassed ? 'border-green-500' : 'border-red-500'
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          {/* Status and Date */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {/* Pass/Fail Icon */}
              {isPassed ? (
                <FaCircleCheck className="text-2xl text-green-600" />
              ) : (
                <FaCircleXmark className="text-2xl text-red-600" />
              )}

              {/* Date */}
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {formatDate(test.DateOfTest, 'long')}
                </p>
                <p className="text-sm text-gray-600">
                  Test #{test.TestNumber}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <Badge variant={isPassed ? 'success' : 'danger'} size="lg">
                {test.ResultText || (isPassed ? 'Pass' : 'Fail')}
              </Badge>

              {hasDangerousItems && (
                <Badge variant="danger" size="sm">
                  <FaTriangleExclamation className="inline mr-1" />
                  {dangerousCount} Dangerous
                </Badge>
              )}

              {advisoryCount > 0 && (
                <Badge variant="warning" size="sm">
                  <FaTriangleExclamation className="inline mr-1" />
                  {advisoryCount} Advisory
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Mileage Info */}
        <div className="flex items-center gap-6 mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaGauge className="text-primary-600" />
            <div>
              <p className="text-xs text-gray-600">Mileage</p>
              <p className="text-base font-bold text-gray-900">
                {formatMileage(mileage)} miles
              </p>
            </div>
          </div>

          {mileageDiff > 0 && (
            <div>
              <p className="text-xs text-gray-600">Since Last Test</p>
              <p className="text-base font-semibold text-gray-700">
                +{formatMileage(mileageDiff)} miles
              </p>
            </div>
          )}
        </div>

        {/* Expiry Date */}
        {test.TestExpiryDate && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Expires:</span>{' '}
              {formatDate(test.TestExpiryDate, 'long')}
            </p>
          </div>
        )}

        {/* Location */}
        {test.Location && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {test.Location}
            </p>
          </div>
        )}

        {/* Expand Button */}
        {(hasAdvisories || hasFailures) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors mt-3 w-full justify-center py-2 border-t border-gray-200"
          >
            {isExpanded ? (
              <>
                <FaChevronUp />
                Hide Details
              </>
            ) : (
              <>
                <FaChevronDown />
                Show Details ({advisoryCount + dangerousCount + (hasFailures ? test.RefusalReasons_V2.length : 0)} items)
              </>
            )}
          </button>
        )}

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Dangerous Items */}
                {test.AdvisoryNotices_V2?.filter(item => item.IsDangerous).map((item, idx) => (
                  <div
                    key={`dangerous-${idx}`}
                    className="bg-red-50 border-l-4 border-red-500 p-3 rounded"
                  >
                    <div className="flex items-start gap-2">
                      <FaTriangleExclamation className="text-red-600 text-lg flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-700 mb-1">
                          DANGEROUS
                        </p>
                        <p className="text-sm text-red-900">{item.Text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Failures */}
                {hasFailures && test.RefusalReasons_V2.map((failure, idx) => (
                  <div
                    key={`failure-${idx}`}
                    className="bg-red-50 border-l-4 border-red-400 p-3 rounded"
                  >
                    <div className="flex items-start gap-2">
                      <FaCircleXmark className="text-red-600 text-lg flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-700 mb-1">
                          {failure.Type || 'FAILURE'}
                        </p>
                        <p className="text-sm text-red-900">{failure.Text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Advisory Items */}
                {test.AdvisoryNotices_V2?.filter(item => !item.IsDangerous && item.Type === 'ADVISORY').map((advisory, idx) => (
                  <div
                    key={`advisory-${idx}`}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded"
                  >
                    <div className="flex items-start gap-2">
                      <FaTriangleExclamation className="text-yellow-600 text-lg flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-yellow-700 mb-1">
                          ADVISORY
                        </p>
                        <p className="text-sm text-yellow-900">{advisory.Text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
