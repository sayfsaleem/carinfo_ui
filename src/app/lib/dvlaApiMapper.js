/**
 * DVLA API Data Mapper
 * Maps DVLA Vehicle Enquiry Service (VES) API response to our internal format
 * This is used for FREE tier users who only get data from the DVLA public API
 */

/**
 * Maps DVLA API response to our internal vehicle data format (Basic Tier)
 * The DVLA API provides limited fields compared to our full paid data
 *
 * DVLA API v1.2.0 provides these fields:
 * - registrationNumber, make, colour, fuelType
 * - yearOfManufacture, monthOfFirstRegistration, monthOfFirstDvlaRegistration
 * - engineCapacity, co2Emissions, taxStatus, taxDueDate
 * - motStatus, motExpiryDate, revenueWeight
 * - typeApproval, wheelplan, markedForExport
 * - automatedVehicle, artEndDate, euroStatus
 * - realDrivingEmissions, dateOfLastV5CIssued
 *
 * @param {Object} dvlaData - Response from DVLA API
 * @returns {Object} - Mapped vehicle data in our internal format
 */
export function mapDVLADataToVehicleFormat(dvlaData) {
  // Handle empty or invalid data
  if (!dvlaData || !dvlaData.registrationNumber) {
    return null;
  }

  console.log('[DVLA Mapper] Raw DVLA API data:', dvlaData);

  // Calculate vehicle age from year of manufacture
  const currentYear = new Date().getFullYear();
  const manufactureYear = dvlaData.yearOfManufacture;
  const vehicleAge = currentYear - manufactureYear;
  const manufacturedDate = `01011${manufactureYear}`; // Format: DDMMYYYY (using 1st Jan as default)

  // Parse month of first registration (format: "YYYY-MM")
  const registrationDate = dvlaData.monthOfFirstRegistration
    ? `01 ${new Date(dvlaData.monthOfFirstRegistration + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
    : 'Not Available';

  // Map DVLA fuel type to our format
  const fuelTypeMap = {
    'PETROL': 'Petrol',
    'DIESEL': 'Diesel',
    'ELECTRIC': 'Electric',
    'HYBRID': 'Hybrid',
    'GAS': 'Gas',
    'LPG': 'LPG'
  };

  const fuelType = fuelTypeMap[dvlaData.fuelType] || dvlaData.fuelType;

  // Map DVLA color to title case
  const colour = dvlaData.colour
    ? dvlaData.colour.charAt(0).toUpperCase() + dvlaData.colour.slice(1).toLowerCase()
    : 'Not Available';

  // Format engine capacity
  const engineCapacity = dvlaData.engineCapacity
    ? `${dvlaData.engineCapacity} cc`
    : 'Not Available';

  // Parse MOT dates
  const motExpiryDate = dvlaData.motExpiryDate || null;
  const isMOTDue = dvlaData.motStatus === 'Not valid' || dvlaData.motStatus === 'No details held by DVLA';

  // Parse tax dates
  const taxDueDate = dvlaData.taxDueDate || null;
  const isRoadTaxDue = dvlaData.taxStatus === 'Untaxed';
  const isVehicleSORN = dvlaData.taxStatus === 'SORN';

  // Map wheelplan to our format
  const wheelPlanMap = {
    '2 AXLE RIGID BODY': '2 Axle Rigid Body',
    '2 AXLE RIGID': '2 Axle Rigid',
    '3 AXLE RIGID': '3 Axle Rigid',
    'SINGLE': 'Single'
  };
  const wheelPlan = wheelPlanMap[dvlaData.wheelplan] || dvlaData.wheelplan || 'Not Available';

  // Determine vehicle body type from typeApproval
  // N1 = Light Commercial Vehicle (Van), M1 = Passenger Car
  const bodyType = dvlaData.typeApproval === 'N1' ? 'Van' : 'Saloon';

  const mappedData = {
    Id: `${dvlaData.registrationNumber}-DVLA`,
    Report: {
      BasicVehicleInformation: {
        Make: dvlaData.make || 'Not Available',
        Model: '', // DVLA API doesn't provide model
        VRM: dvlaData.registrationNumber,
        Colour: colour,
        Cc: engineCapacity,
        Fuel: fuelType,
        Body: bodyType,
        VehicleType: dvlaData.typeApproval === 'N1' ? 'Van' : 'Car',
        VehicleAge: `${vehicleAge} years`,
        HasVehicleAge: true,
        YearOfManufacture: manufactureYear,
        ManufacturedDate: manufacturedDate,
        RegistrationPlateDate: registrationDate,
        WheelPlan: wheelPlan,
        AverageMileage: null,
        AverageMileagePerYear: null,
        IsMileageAverageMessage: null,
        IsUnderThreeYearsOld: vehicleAge < 3,
        MileageBetweenLastMotPasses: null,
        VIN: null,
        VINEndsWith: null,
        VINLastFourCharacters: null,
        VINMatches: null,
        EngineNumber: null,
        ElectricVehicleData: null,
        UserEnteredV5CDate: dvlaData.dateOfLastV5CIssued || null,
        UserEnteredVin: null
      },
      EnvironmentalInformation: {
        Co2OuputOfVehicle: dvlaData.co2Emissions ? String(dvlaData.co2Emissions) : '0',
        HasCo2OutputOfVehicle: !!dvlaData.co2Emissions,
        Co2LetterMarker: dvlaData.co2Emissions ? calculateCO2Band(dvlaData.co2Emissions) : 'N/A',
        HasFuelEconomyDataModel: false,
        FuelEconomyDataModel: null
      },
      ExtendedVehicleInformation: dvlaData.euroStatus ? {
        EuroStatus: dvlaData.euroStatus || 'Not Available',
        ExactCc: engineCapacity,
        FuelType: fuelType,
        Bhp: null,
        BodyStyle: bodyType,
        CylinderCount: null,
        CylinderLayout: null,
        DoorCount: null,
        DriveType: null,
        DrivingPosition: null,
        EngineAlignment: null,
        EngineCode: null,
        EngineLocation: null,
        EngineSize: null,
        FuelDelivery: null,
        GearsCount: null,
        GrossWeight: dvlaData.revenueWeight ? String(dvlaData.revenueWeight) : null,
        InsuranceGroup: null,
        KwOutputOfEngine: null,
        SeatCount: null,
        TransmissionType: null,
        TyreFront: null,
        TyreRear: null,
        ValveCount: null,
        VehicleAccelerationMph: null,
        VehicleHeight: null,
        VehicleLength: null,
        VehicleTopSpeed: null,
        VehicleWidth: null
      } : null,
      ImportantChecks: {
        MotAndRoadTaxInformation: {
          DateMotDue: motExpiryDate,
          DateRoadTaxDue: taxDueDate,
          IsMOTDue: isMOTDue,
          IsRoadTaxDue: isRoadTaxDue,
          IsVehicleSORN: isVehicleSORN,
          MotResultsSummary: null
        },
        Exported: dvlaData.markedForExport || false,
        Imported: false,
        IsStolen: null,
        IsWrittenOff: null,
        ColourChanges: null,
        KeeperDurationDetails: null,
        PlateChanges: null
      },
      RoadTaxInformation: {
        TaxStatus: dvlaData.taxStatus || 'Not Available',
        TaxDueDate: taxDueDate,
        Co2Emissions: dvlaData.co2Emissions ? String(dvlaData.co2Emissions) : '0'
      },
      PreviousKeepersInformation: null,
      ValuationInformation: null
    }
  };

  console.log('[DVLA Mapper] Mapped data:', JSON.stringify(mappedData, null, 2));

  return mappedData;
}

/**
 * Calculate CO2 emission band based on g/km
 * @param {number} co2 - CO2 emissions in g/km
 * @returns {string} - Band letter (A-M)
 */
function calculateCO2Band(co2) {
  if (co2 === 0) return 'A';
  if (co2 <= 50) return 'B';
  if (co2 <= 75) return 'C';
  if (co2 <= 90) return 'D';
  if (co2 <= 100) return 'E';
  if (co2 <= 110) return 'F';
  if (co2 <= 130) return 'G';
  if (co2 <= 150) return 'H';
  if (co2 <= 170) return 'I';
  if (co2 <= 190) return 'J';
  if (co2 <= 225) return 'K';
  if (co2 <= 255) return 'L';
  return 'M';
}

/**
 * Example DVLA API response for reference:
 * {
 *   "registrationNumber": "EA61RPY",
 *   "taxStatus": "Untaxed",
 *   "taxDueDate": "2024-10-09",
 *   "motStatus": "Not valid",
 *   "make": "MERCEDES-BENZ",
 *   "yearOfManufacture": 2011,
 *   "engineCapacity": 2143,
 *   "co2Emissions": 0,
 *   "fuelType": "DIESEL",
 *   "markedForExport": false,
 *   "colour": "YELLOW",
 *   "typeApproval": "N1",
 *   "revenueWeight": 3500,
 *   "dateOfLastV5CIssued": "2024-10-10",
 *   "motExpiryDate": "2025-04-23",
 *   "wheelplan": "2 AXLE RIGID BODY",
 *   "monthOfFirstRegistration": "2011-12"
 * }
 */
