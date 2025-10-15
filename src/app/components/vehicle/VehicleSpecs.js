'use client';

import { motion } from 'framer-motion';
import {
  FaCar,
  FaGear,
  FaGasPump,
  FaGauge,
  FaRulerCombined,
  FaWeightHanging,
  FaDoorOpen,
  FaChair,
  FaBolt,
  FaGears,
  FaRoad
} from 'react-icons/fa6';

/**
 * VehicleSpecs Component
 * Grid display of vehicle specifications with icons
 *
 * @param {object} data - Vehicle data object
 */
export default function VehicleSpecs({ data }) {
  const basicInfo = data?.Report?.BasicVehicleInformation;
  const extendedInfo = data?.Report?.ExtendedVehicleInformation;

  if (!basicInfo) return null;

  // Organize specs into categories
  const specs = [
    // Basic Information
    {
      category: 'Basic Information',
      items: [
        {
          icon: FaCar,
          label: 'Make',
          value: basicInfo.Make
        },
        {
          icon: FaCar,
          label: 'Model',
          value: basicInfo.Model
        },
        {
          icon: FaCar,
          label: 'Body Type',
          value: basicInfo.Body
        },
        {
          icon: FaCar,
          label: 'Colour',
          value: basicInfo.Colour
        },
        {
          icon: FaCar,
          label: 'Vehicle Type',
          value: basicInfo.VehicleType
        },
        {
          icon: FaCar,
          label: 'VIN',
          value: basicInfo.VIN || 'N/A'
        }
      ]
    },
    // Engine & Performance
    {
      category: 'Engine & Performance',
      items: [
        {
          icon: FaGear,
          label: 'Engine Size',
          value: extendedInfo?.EngineSize || basicInfo.Cc
        },
        {
          icon: FaGasPump,
          label: 'Fuel Type',
          value: basicInfo.Fuel
        },
        {
          icon: FaBolt,
          label: 'Power Output',
          value: extendedInfo?.Bhp || 'N/A'
        },
        {
          icon: FaBolt,
          label: 'kW Output',
          value: extendedInfo?.KwOutputOfEngine || 'N/A'
        },
        {
          icon: FaGear,
          label: 'Cylinders',
          value: extendedInfo?.CylinderCount || 'N/A'
        },
        {
          icon: FaGear,
          label: 'Valves',
          value: extendedInfo?.ValveCount || 'N/A'
        },
        {
          icon: FaGauge,
          label: 'Top Speed',
          value: extendedInfo?.VehicleMaxSpeedMph || 'N/A'
        },
        {
          icon: FaGauge,
          label: '0-60 mph',
          value: extendedInfo?.VehicleAccelerationMph || 'N/A'
        },
        {
          icon: FaGear,
          label: 'Engine Code',
          value: extendedInfo?.EngineCode || 'N/A'
        },
        {
          icon: FaGasPump,
          label: 'Fuel Delivery',
          value: extendedInfo?.FuelDelivery || 'N/A'
        },
        {
          icon: FaGear,
          label: 'Cylinder Layout',
          value: extendedInfo?.CylinderLayout || 'N/A'
        },
        {
          icon: FaGear,
          label: 'Engine Location',
          value: extendedInfo?.EngineLocation || 'N/A'
        }
      ]
    },
    // Transmission & Drive
    {
      category: 'Transmission & Drive',
      items: [
        {
          icon: FaGears,
          label: 'Transmission',
          value: extendedInfo?.TransmissionType || 'N/A'
        },
        {
          icon: FaGears,
          label: 'Gears',
          value: extendedInfo?.GearsCount || 'N/A'
        },
        {
          icon: FaRoad,
          label: 'Drive Type',
          value: extendedInfo?.DriveType || 'N/A'
        },
        {
          icon: FaCar,
          label: 'Driving Position',
          value: extendedInfo?.DrivingPosition || 'N/A'
        }
      ]
    },
    // Dimensions
    {
      category: 'Dimensions & Weight',
      items: [
        {
          icon: FaRulerCombined,
          label: 'Length',
          value: extendedInfo?.VehicleLength || 'N/A'
        },
        {
          icon: FaRulerCombined,
          label: 'Width',
          value: extendedInfo?.VehicleWidth || 'N/A'
        },
        {
          icon: FaRulerCombined,
          label: 'Height',
          value: extendedInfo?.VehicleHeight || 'N/A'
        },
        {
          icon: FaRulerCombined,
          label: 'Wheelbase',
          value: extendedInfo?.WheelBaseOfVehicle || 'N/A'
        },
        {
          icon: FaWeightHanging,
          label: 'Unladen Weight',
          value: extendedInfo?.UnladenWeight ? `${extendedInfo.UnladenWeight} kg` : 'N/A'
        },
        {
          icon: FaWeightHanging,
          label: 'Gross Weight',
          value: extendedInfo?.GrossWeight ? `${extendedInfo.GrossWeight} kg` : 'N/A'
        }
      ]
    },
    // Capacity
    {
      category: 'Capacity',
      items: [
        {
          icon: FaDoorOpen,
          label: 'Doors',
          value: extendedInfo?.DoorCount || 'N/A'
        },
        {
          icon: FaChair,
          label: 'Seats',
          value: extendedInfo?.SeatCount || 'N/A'
        }
      ]
    },
    // Other
    {
      category: 'Other Information',
      items: [
        {
          icon: FaGear,
          label: 'Euro Status',
          value: extendedInfo?.EuroStatus ? `Euro ${extendedInfo.EuroStatus}` : 'N/A'
        },
        {
          icon: FaCar,
          label: 'Insurance Group',
          value: extendedInfo?.InsuranceGroup || 'N/A'
        },
        {
          icon: FaCar,
          label: 'Wheel Plan',
          value: basicInfo.WheelPlan || 'N/A'
        }
      ]
    }
  ];

  // Filter out categories with all N/A values
  const filteredSpecs = specs.map(category => ({
    ...category,
    items: category.items.filter(item => item.value && item.value !== 'N/A' && item.value !== 'Not Available')
  })).filter(category => category.items.length > 0);

  return (
    <div className="space-y-8">
      {filteredSpecs.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
        >
          {/* Category Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
            {category.category}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.items.map((spec, index) => {
              const Icon = spec.icon;

              return (
                <motion.div
                  key={`${category.category}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-primary-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 text-primary-600 text-xl mt-0.5">
                      <Icon />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 break-words">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {filteredSpecs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No detailed specifications available for this vehicle.</p>
        </div>
      )}
    </div>
  );
}
