'use client';

import { motion } from 'framer-motion';
import { FaLeaf, FaGasPump, FaSmog, FaAward } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { cn } from '../../lib/utils';

/**
 * EnvironmentalInfo Component
 * Display CO2 emissions, fuel economy, and environmental ratings
 *
 * @param {object} data - Vehicle data object
 */
export default function EnvironmentalInfo({ data }) {
  const envInfo = data?.Report?.EnvironmentalInformation;
  const fuelData = envInfo?.FuelEconomyDataModel;

  if (!envInfo) {
    return (
      <div className="text-center py-12">
        <FaLeaf className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No environmental data available for this vehicle.</p>
      </div>
    );
  }

  const co2 = envInfo.Co2OuputOfVehicle;
  const co2Band = envInfo.Co2LetterMarker;

  // Determine CO2 rating
  const getCO2Rating = (co2Value) => {
    const value = parseInt(co2Value);
    if (value <= 100) return { text: 'Excellent', color: 'success', icon: '🌟' };
    if (value <= 120) return { text: 'Good', color: 'success', icon: '✓' };
    if (value <= 140) return { text: 'Average', color: 'warning', icon: '○' };
    if (value <= 160) return { text: 'Below Average', color: 'warning', icon: '△' };
    return { text: 'Poor', color: 'danger', icon: '✕' };
  };

  const co2Rating = co2 ? getCO2Rating(co2) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Environmental Information
        </h2>
        <p className="text-gray-600">
          CO2 emissions and fuel economy data
        </p>
      </motion.div>

      {/* CO2 Emissions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-green-600 text-4xl">
              <FaSmog />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                CO2 Emissions
              </h3>

              {co2 && (
                <>
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-4xl font-bold text-green-700">
                      {co2}
                    </p>
                    <p className="text-xl text-gray-600">g/km</p>
                  </div>

                  {co2Band && (
                    <div className="mb-3">
                      <Badge variant="info" size="lg">
                        Band {co2Band}
                      </Badge>
                    </div>
                  )}

                  {co2Rating && (
                    <div className="flex items-center gap-2">
                      <Badge variant={co2Rating.color}>
                        {co2Rating.icon} {co2Rating.text}
                      </Badge>
                    </div>
                  )}
                </>
              )}

              {!co2 && (
                <p className="text-gray-500">CO2 data not available</p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Fuel Economy Section */}
      {fuelData && fuelData.FuelEconomyDataExists && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaGasPump className="text-primary-600" />
            Fuel Economy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Urban */}
            <Card className="text-center border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-2xl mb-2">🏙️</div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Urban</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {fuelData.ImperialUrban_Economy || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">mpg</p>
              {fuelData.MetricUrban_Economy && (
                <p className="text-xs text-gray-500 mt-1">
                  ({fuelData.MetricUrban_Economy} l/100km)
                </p>
              )}
            </Card>

            {/* Extra Urban */}
            <Card className="text-center border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-green-600 text-2xl mb-2">🛣️</div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Extra Urban</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {fuelData.ImperialExtraUrban_Economy || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">mpg</p>
              {fuelData.MetricExtraUrban_Economy && (
                <p className="text-xs text-gray-500 mt-1">
                  ({fuelData.MetricExtraUrban_Economy} l/100km)
                </p>
              )}
            </Card>

            {/* Combined */}
            <Card className="text-center border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-2">📊</div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Combined</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {fuelData.ImperialCombined_Economy || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">mpg</p>
              {fuelData.MetricCombined_Economy && (
                <p className="text-xs text-gray-500 mt-1">
                  ({fuelData.MetricCombined_Economy} l/100km)
                </p>
              )}
            </Card>
          </div>

          {/* Fuel Cost */}
          {fuelData.FuelCost12k_Economy && (
            <Card className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">
                    Estimated Annual Fuel Cost
                  </h4>
                  <p className="text-xs text-gray-500">Based on 12,000 miles per year</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-700">
                    £{fuelData.FuelCost12k_Economy}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Vehicle Description */}
          {fuelData.VehicleDescription_Economy && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Model:</span> {fuelData.Model_Economy || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Description:</span> {fuelData.VehicleDescription_Economy}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* WLTP Data (if available) */}
      {fuelData?.IsWldpScheme && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <FaAward className="text-blue-600 text-2xl flex-shrink-0" />
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">
                  WLTP Test Data
                </h4>
                <p className="text-sm text-gray-600">
                  This vehicle uses the Worldwide Harmonised Light Vehicle Test Procedure (WLTP) for more accurate real-world fuel economy and emissions measurements.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-sm text-gray-500 italic border-t border-gray-200 pt-4"
      >
        <p>
          Environmental data is provided by official DVLA and manufacturer sources.
          Actual fuel economy may vary depending on driving conditions, vehicle condition, and driving style.
        </p>
      </motion.div>
    </div>
  );
}
