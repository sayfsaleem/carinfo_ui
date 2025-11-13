'use client';

import { motion } from 'framer-motion';
import {
  FaCar,
  FaPalette,
  FaGasPump,
  FaGear,
  FaCalendar,
  FaClock,
  FaRoad,
  FaFileCircleCheck,
  FaShield,
  FaArrowRightArrowLeft
} from 'react-icons/fa6';

/**
 * FreeTierDataDisplay Component
 * Enhanced display for ALL available FREE tier data from DVLA API
 */
export default function FreeTierDataDisplay({ data }) {
  const basicInfo = data?.Report?.BasicVehicleInformation;
  const motInfo = data?.Report?.ImportantChecks?.MotAndRoadTaxInformation;
  const taxInfo = data?.Report?.RoadTaxInformation;
  const importantChecks = data?.Report?.ImportantChecks;

  if (!basicInfo) return null;

  const dataGroups = [
    {
      title: 'Vehicle Identity',
      icon: FaCar,
      color: 'blue',
      items: [
        { label: 'Registration', value: basicInfo.VRM },
        { label: 'Make', value: basicInfo.Make },
        { label: 'Body Type', value: basicInfo.Body },
        { label: 'Vehicle Type', value: basicInfo.VehicleType },
        { label: 'Colour', value: basicInfo.Colour },
      ]
    },
    {
      title: 'Age & Registration',
      icon: FaCalendar,
      color: 'green',
      items: [
        { label: 'Year of Manufacture', value: basicInfo.YearOfManufacture },
        { label: 'Vehicle Age', value: basicInfo.VehicleAge },
        { label: 'First Registration', value: basicInfo.RegistrationPlateDate },
        { label: 'V5C Last Issued', value: basicInfo.UserEnteredV5CDate || 'Not Available' },
      ]
    },
    {
      title: 'Engine & Fuel',
      icon: FaGear,
      color: 'purple',
      items: [
        { label: 'Engine Capacity', value: basicInfo.Cc },
        { label: 'Fuel Type', value: basicInfo.Fuel },
        { label: 'Wheel Plan', value: basicInfo.WheelPlan },
      ]
    },
    {
      title: 'MOT Information',
      icon: FaShield,
      color: motInfo?.IsMOTDue ? 'red' : 'green',
      items: [
        {
          label: 'MOT Status',
          value: motInfo?.IsMOTDue ? '⚠️ MOT Due' : '✓ Valid',
          highlight: motInfo?.IsMOTDue
        },
        { label: 'MOT Expiry Date', value: motInfo?.DateMotDue || 'Not Available' },
      ]
    },
    {
      title: 'Tax Information',
      icon: FaFileCircleCheck,
      color: motInfo?.IsRoadTaxDue ? 'red' : 'green',
      items: [
        {
          label: 'Tax Status',
          value: taxInfo?.TaxStatus || 'Not Available',
          highlight: motInfo?.IsRoadTaxDue
        },
        { label: 'Tax Due Date', value: motInfo?.DateRoadTaxDue || 'Not Available' },
        {
          label: 'SORN',
          value: motInfo?.IsVehicleSORN ? 'Yes' : 'No'
        },
      ]
    },
    {
      title: 'Additional Information',
      icon: FaArrowRightArrowLeft,
      color: 'gray',
      items: [
        {
          label: 'Marked for Export',
          value: importantChecks?.Exported ? 'Yes' : 'No'
        },
        {
          label: 'CO2 Emissions',
          value: taxInfo?.Co2Emissions && taxInfo.Co2Emissions !== '0'
            ? `${taxInfo.Co2Emissions} g/km`
            : 'Not Available'
        },
      ]
    }
  ];

  const colorMap = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    red: 'from-red-50 to-red-100 border-red-200',
    gray: 'from-gray-50 to-gray-100 border-gray-200'
  };

  const iconColorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    gray: 'text-gray-600'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataGroups.map((group, index) => {
          const Icon = group.icon;

          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${colorMap[group.color]} border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${iconColorMap[group.color]} text-2xl`}>
                  <Icon />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-2.5">
                {group.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <span className="text-sm text-gray-600 font-medium">
                      {item.label}:
                    </span>
                    <span className={`text-sm font-semibold text-right ml-2 ${
                      item.highlight
                        ? 'text-red-700'
                        : 'text-gray-900'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
