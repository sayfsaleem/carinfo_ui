'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { FaChartLine } from 'react-icons/fa6';
import { formatDate, formatMileage } from '../../lib/utils';

/**
 * MileageChart Component
 * Line chart showing mileage progression over time from MOT history
 *
 * @param {Array} tests - Array of MOT test results
 */
export default function MileageChart({ tests }) {
  if (!tests || tests.length === 0) {
    return (
      <div className="text-center py-12">
        <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No mileage data available to chart.</p>
      </div>
    );
  }

  // Sort tests by date (oldest first for chart)
  const sortedTests = [...tests].sort((a, b) => {
    const dateA = new Date(a.DateOfTest);
    const dateB = new Date(b.DateOfTest);
    return dateA - dateB;
  });

  // Prepare chart data
  const chartData = sortedTests.map((test, index) => {
    const date = new Date(test.DateOfTest);
    const mileage = test.OdometerModel?.OdometerReading || 0;

    return {
      date: formatDate(test.DateOfTest, 'short'),
      fullDate: formatDate(test.DateOfTest, 'long'),
      mileage: mileage,
      mileageFormatted: formatMileage(mileage),
      testNumber: index + 1,
      result: test.Result === true || test.ResultText === 'Pass' ? 'Pass' : 'Fail'
    };
  });

  // Calculate average mileage per year
  if (chartData.length >= 2) {
    const firstDate = new Date(sortedTests[0].DateOfTest);
    const lastDate = new Date(sortedTests[sortedTests.length - 1].DateOfTest);
    const firstMileage = sortedTests[0].OdometerModel?.OdometerReading || 0;
    const lastMileage = sortedTests[sortedTests.length - 1].OdometerModel?.OdometerReading || 0;

    const yearsDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 365);
    const mileageDiff = lastMileage - firstMileage;
    const avgMileagePerYear = yearsDiff > 0 ? Math.round(mileageDiff / yearsDiff) : 0;

    chartData.avgMileagePerYear = avgMileagePerYear;
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white border-2 border-primary-500 rounded-lg shadow-xl p-4">
          <p className="font-bold text-gray-900 mb-2">{data.fullDate}</p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Mileage:</span> {data.mileageFormatted} miles
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Test #{data.testNumber}</span>
          </p>
          <p className={`text-sm font-semibold ${
            data.result === 'Pass' ? 'text-green-600' : 'text-red-600'
          }`}>
            {data.result}
          </p>
        </div>
      );
    }

    return null;
  };

  // Custom dot for data points
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    if (!payload) return null;

    const isPassed = payload.result === 'Pass';

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={isPassed ? '#10b981' : '#ef4444'}
        stroke="#fff"
        strokeWidth={2}
        className="cursor-pointer hover:r-8 transition-all"
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Mileage Progression
        </h2>
        <p className="text-gray-600">
          Vehicle mileage recorded at each MOT test
        </p>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm"
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatMileage(value)}
              label={{
                value: 'Mileage',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '14px', fill: '#6b7280' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '14px' }}
              iconType="line"
            />

            {/* Average mileage reference line (if applicable) */}
            {chartData.avgMileagePerYear && (
              <ReferenceLine
                y={chartData[chartData.length - 1]?.mileage}
                stroke="#94a3b8"
                strokeDasharray="5 5"
                label={{
                  value: `Avg: ${formatMileage(chartData.avgMileagePerYear)}/yr`,
                  position: 'right',
                  fill: '#64748b',
                  fontSize: 12
                }}
              />
            )}

            <Line
              type="monotone"
              dataKey="mileage"
              stroke="#0069d9"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 8 }}
              name="Mileage"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Current Mileage</p>
          <p className="text-2xl font-bold text-blue-700">
            {formatMileage(chartData[chartData.length - 1]?.mileage)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Increase</p>
          <p className="text-2xl font-bold text-green-700">
            {chartData.length >= 2
              ? formatMileage(
                  chartData[chartData.length - 1].mileage - chartData[0].mileage
                )
              : 'N/A'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Per Year</p>
          <p className="text-2xl font-bold text-purple-700">
            {chartData.avgMileagePerYear
              ? formatMileage(chartData.avgMileagePerYear)
              : 'N/A'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Data Points</p>
          <p className="text-2xl font-bold text-orange-700">
            {chartData.length}
          </p>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-sm text-gray-500 italic border-t border-gray-200 pt-4"
      >
        <p>
          Mileage data is recorded during each MOT test. Green dots indicate passed tests, red dots indicate failed tests.
        </p>
      </motion.div>
    </div>
  );
}
