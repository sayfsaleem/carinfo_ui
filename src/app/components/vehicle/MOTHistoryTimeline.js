'use client';

import { motion } from 'framer-motion';
import { FaClipboardCheck } from 'react-icons/fa6';
import MOTTestCard from './MOTTestCard';

/**
 * MOTHistoryTimeline Component
 * Visual timeline of MOT tests with vertical line connection
 *
 * @param {Array} tests - Array of MOT test results
 */
export default function MOTHistoryTimeline({ tests }) {
  if (!tests || tests.length === 0) {
    return (
      <div className="text-center py-12">
        <FaClipboardCheck className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No MOT history available for this vehicle.</p>
      </div>
    );
  }

  // Sort tests by date (most recent first)
  const sortedTests = [...tests].sort((a, b) => {
    const dateA = new Date(a.DateOfTest);
    const dateB = new Date(b.DateOfTest);
    return dateB - dateA;
  });

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          MOT Test History
        </h2>
        <p className="text-gray-600">
          Showing {sortedTests.length} MOT test{sortedTests.length !== 1 ? 's' : ''} from DVSA records
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"
          style={{ marginLeft: '-0.5px' }}
        />

        {/* Timeline Items */}
        <div className="space-y-8">
          {sortedTests.map((test, index) => {
            const previousMileage = index < sortedTests.length - 1
              ? sortedTests[index + 1].OdometerModel?.OdometerReading
              : null;

            return (
              <div key={test.TestNumber || index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                      test.Result === true || test.ResultText === 'Pass'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>

                {/* Test Card */}
                <div className="ml-16">
                  <MOTTestCard
                    test={test}
                    index={index}
                    previousMileage={previousMileage}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: sortedTests.length * 0.1 }}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {sortedTests.length}
            </p>
            <p className="text-sm text-gray-600">Total Tests</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">
              {sortedTests.filter(t => t.Result === true || t.ResultText === 'Pass').length}
            </p>
            <p className="text-sm text-gray-600">Passes</p>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-700">
              {sortedTests.filter(t => t.Result === false || t.ResultText === 'Fail').length}
            </p>
            <p className="text-sm text-gray-600">Failures</p>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-700">
              {sortedTests.reduce((sum, test) => {
                const advisories = test.AdvisoryNotices_V2?.filter(
                  item => !item.IsDangerous && item.Type === 'ADVISORY'
                ).length || 0;
                return sum + advisories;
              }, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Advisories</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
