'use client';

import { motion } from 'framer-motion';
import {
  FaCar,
  FaPalette,
  FaGasPump,
  FaGear,
  FaCalendar,
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaLeaf,
  FaRoad,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation
} from 'react-icons/fa6';

/**
 * FreeTierDataDisplay Component - REMASTERED
 * Clean, professional display of FREE tier DVLA data
 */
export default function FreeTierDataDisplay({ data }) {
  const basicInfo = data?.Report?.BasicVehicleInformation;
  const motInfo = data?.Report?.ImportantChecks?.MotAndRoadTaxInformation;
  const taxInfo = data?.Report?.RoadTaxInformation;
  const importantChecks = data?.Report?.ImportantChecks;

  if (!basicInfo) return null;

  // Key specs for the top row
  const keySpecs = [
    { label: 'Make', value: basicInfo.Make, icon: FaCar },
    { label: 'Colour', value: basicInfo.Colour, icon: FaPalette },
    { label: 'Fuel', value: basicInfo.Fuel, icon: FaGasPump },
    { label: 'Engine', value: basicInfo.Cc, icon: FaGear },
    { label: 'Year', value: basicInfo.YearOfManufacture, icon: FaCalendar },
    { label: 'Body', value: basicInfo.Body, icon: FaCar },
  ];

  // All vehicle details in a clean table format
  const vehicleDetails = [
    { label: 'Registration (VRM)', value: basicInfo.VRM },
    { label: 'Make', value: basicInfo.Make },
    { label: 'Body Type', value: basicInfo.Body },
    { label: 'Vehicle Type', value: basicInfo.VehicleType },
    { label: 'Colour', value: basicInfo.Colour },
    { label: 'Year of Manufacture', value: basicInfo.YearOfManufacture },
    { label: 'Vehicle Age', value: basicInfo.VehicleAge },
    { label: 'Date of First Registration', value: basicInfo.RegistrationPlateDate },
    { label: 'Engine Capacity', value: basicInfo.Cc },
    { label: 'Fuel Type', value: basicInfo.Fuel },
    { label: 'Wheel Plan', value: basicInfo.WheelPlan },
    { label: 'CO2 Emissions', value: taxInfo?.Co2Emissions && taxInfo.Co2Emissions !== '0' ? `${taxInfo.Co2Emissions} g/km` : null },
    { label: 'Marked for Export', value: importantChecks?.Exported ? 'Yes' : 'No' },
  ].filter(item => item.value);

  const isMotValid = !motInfo?.IsMOTDue;
  const isTaxValid = !motInfo?.IsRoadTaxDue && !motInfo?.IsVehicleSORN;

  return (
    <div className="space-y-8">
      {/* Key Specs - Visual Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {keySpecs.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition-colors border border-gray-100"
            >
              <Icon className="text-blue-600 text-xl mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
              <p className="text-sm font-bold text-gray-900 truncate">{spec.value || 'N/A'}</p>
            </motion.div>
          );
        })}
      </div>

      {/* MOT & Tax Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MOT Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`rounded-xl p-5 border-2 ${
            isMotValid
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${isMotValid ? 'bg-green-500' : 'bg-red-500'}`}>
              <FaClipboardCheck className="text-white text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">MOT Status</p>
              <div className="flex items-center gap-2">
                {isMotValid ? (
                  <FaCircleCheck className="text-green-600" />
                ) : (
                  <FaCircleXmark className="text-red-600" />
                )}
                <span className={`font-bold ${isMotValid ? 'text-green-700' : 'text-red-700'}`}>
                  {isMotValid ? 'Valid' : 'Expired / Due'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Expiry Date:</span>{' '}
            <span className="font-semibold text-gray-900">{motInfo?.DateMotDue || 'Not Available'}</span>
          </div>
        </motion.div>

        {/* Tax Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={`rounded-xl p-5 border-2 ${
            isTaxValid
              ? 'bg-green-50 border-green-200'
              : motInfo?.IsVehicleSORN
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${
              isTaxValid ? 'bg-green-500' : motInfo?.IsVehicleSORN ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              <FaFileInvoiceDollar className="text-white text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tax Status</p>
              <div className="flex items-center gap-2">
                {isTaxValid ? (
                  <FaCircleCheck className="text-green-600" />
                ) : motInfo?.IsVehicleSORN ? (
                  <FaTriangleExclamation className="text-yellow-600" />
                ) : (
                  <FaCircleXmark className="text-red-600" />
                )}
                <span className={`font-bold ${
                  isTaxValid ? 'text-green-700' : motInfo?.IsVehicleSORN ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {taxInfo?.TaxStatus || (motInfo?.IsVehicleSORN ? 'SORN' : 'Untaxed')}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Due Date:</span>{' '}
            <span className="font-semibold text-gray-900">{motInfo?.DateRoadTaxDue || 'Not Available'}</span>
          </div>
        </motion.div>
      </div>

      {/* Complete Vehicle Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <h4 className="font-bold text-gray-900 flex items-center gap-2">
            <FaCar className="text-blue-600" />
            Complete Vehicle Details
          </h4>
        </div>
        <div className="divide-y divide-gray-100">
          {vehicleDetails.map((item, index) => (
            <div
              key={item.label}
              className={`flex justify-between items-center px-5 py-3 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              } hover:bg-blue-50/50 transition-colors`}
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
