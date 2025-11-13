// Demo vehicle data based on TotalCarCheck API responses
// This serves as our mock data for development and demonstration

import { mapDVLADataToVehicleFormat } from './dvlaApiMapper';

export const DEMO_VEHICLE_VRM = "WA67YSB";

// DVLA API Mock Response (Free Tier Data Source)
// This simulates what the DVLA Vehicle Enquiry Service API returns
export const dvlaApiMockData = {
  registrationNumber: "WA67YSB",
  taxStatus: "Taxed",
  taxDueDate: "2025-09-01",
  motStatus: "Valid",
  make: "SKODA",
  yearOfManufacture: 2017,
  engineCapacity: 1395,
  co2Emissions: 117,
  fuelType: "PETROL",
  markedForExport: false,
  colour: "GREY",
  typeApproval: "M1",
  revenueWeight: 1861,
  dateOfLastV5CIssued: "2021-03-15",
  motExpiryDate: "2025-12-15",
  wheelplan: "2 AXLE RIGID BODY",
  monthOfFirstRegistration: "2017-09",
  euroStatus: "6b"
};

// GOLD CHECK DATA - Includes ALL features
export const goldCheckData = {
  Id: "WA67YSB-YyaloXtO",
  Report: {
    BasicVehicleInformation: {
      AverageMileage: 58400,
      AverageMileagePerYear: 6300,
      Body: "Estate",
      Cc: "1395 cc",
      Colour: "Grey",
      ElectricVehicleData: null,
      EngineNumber: "CZDA721471",
      Fuel: "Petrol",
      HasVehicleAge: true,
      IsMileageAverageMessage: "below average",
      IsUnderThreeYearsOld: false,
      Make: "Skoda",
      ManufacturedDate: "07092017",
      MileageBetweenLastMotPasses: 10862,
      Model: "Octavia SE L TSI S-A",
      RegistrationPlateDate: "07 September 2017",
      UserEnteredV5CDate: null,
      UserEnteredVin: null,
      VehicleAge: "8 years 1 month",
      VehicleType: "Car",
      VIN: "TMBKC7NE5J0122285",
      VINEndsWith: "85",
      VINLastFourCharacters: "2285",
      VINMatches: null,
      VRM: "WA67YSB",
      WheelPlan: "2 Axle Rigid Body"
    },
    EnvironmentalInformation: {
      Co2LetterMarker: "G",
      Co2OuputOfVehicle: "117",
      FuelEconomyDataModel: {
        CO2_Economy: "117",
        FuelCost12k_Economy: "1615",
        FuelDescription_Economy: "",
        FuelEconomyDataExists: true,
        ImperialCombined_Economy: "55.4",
        ImperialExtraUrban_Economy: "64.2",
        ImperialUrban_Economy: "45.6",
        MetricCombined_Economy: "5.1",
        MetricExtraUrban_Economy: "4.4",
        MetricUrban_Economy: "6.2",
        Model_Economy: "Octavia Estate",
        VehicleDescription_Economy: "1.4 TSI 150PS 7speed",
        MetricLow_WLTP_Economy: null,
        MetricMedium_WLTP_Economy: null,
        MetricHigh_WLTP_Economy: null,
        MetricExtraHigh_WLTP_Economy: null,
        MetricCombined_WLTP_Economy: null,
        ImperialLow_WLTP_Economy: null,
        ImperialMedium_WLTP_Economy: null,
        ImperialHigh_WLTP_Economy: null,
        ImperialExtraHigh_WLTP_Economy: null,
        ImperialCombined_WLTP_Economy: null,
        CO2_WLTP_Economy: null,
        IsWldpScheme: false,
        EngineCapacity: 1395.0
      },
      HasCo2OutputOfVehicle: true,
      HasFuelEconomyDataModel: true
    },
    ExtendedVehicleInformation: {
      Bhp: "147 BHP",
      BodyStyle: "Estate",
      CylinderCount: "4 Cylinders",
      CylinderLayout: "Inline",
      DoorCount: "5 Doors",
      DriveType: "Front Wheel Drive",
      DrivingPosition: "RHD",
      EdiCode: "375477",
      EngineAlignment: "Transverse",
      EngineCode: "CZDA",
      EngineLocation: "Front",
      EngineSize: "1.4 litres",
      EuroStatus: "6b",
      ExactCc: "1395 cc",
      ExtendedSpecificationDetails: "TSI 150 DSG Auto Start/Stop",
      FuelDelivery: "Turbo Injection",
      FuelType: "Petrol",
      GearsCount: "7 Gears",
      GrossWeight: "1861",
      InsuranceGroup: "18E",
      KwOutputOfEngine: "110 kW",
      ModelVersionWithStartAndEndDate: "5E",
      SeatCount: "5 Seats",
      TransmissionType: "Semi Automatic",
      TyreFront: "Not Available",
      TyreRear: "Not Available",
      ValveCount: "16 Valves",
      VehicleAccelerationMph: "8.30 secs",
      VehicleHeight: "1495 mm",
      VehicleImageUrl: "https://totalcarcheck.co.uk/VehicleImage/octavia-estate-skoe-18.jpg?v=ad",
      VehicleLength: "4667 mm",
      VehicleMaxSpeedMph: "134 MPH",
      VehicleRecalls: null,
      VehicleSeats: "005",
      VehicleTypeDescription: "Car",
      VehicleWidth: "Not Available",
      VrmInformationModel: {
        AgeInformation: {
          AgeOfVrm: "8 years old",
          DateVrmRegistered: "Between 01 Sep 17 & 28 Feb 18"
        },
        DistrictOffice: "West of England",
        LocalOffice: "Exeter"
      },
      WheelBaseOfVehicle: "2686 mm",
      UnladenWeight: "1861"
    },
    ImportantChecks: {
      AdditionalMileageInformation: {
        HasAdditionalMileageData: false,
        AdditionalMileageRecords: null,
        AdditionalMileageIssueIdentified: false,
        AdditionalMileageIssueSummary: null
      },
      Exported: false,
      ExportedDate: "Not Available",
      HasMileageIssue: false,
      HasScrappedDate: false,
      HasVicTestResult: false,
      HasVrmChanges: false,
      Imported: false,
      ImportedDate: "Not Available",
      ImportedFromNorthernIreland: false,
      IsStolen: false,
      IsWrittenOff: false,
      KeeperDurationDetails: {
        Vrm: "WA67YSB",
        EndDateOfCalculations: "08 November 2021",
        KeeperInformation: [
          {
            KeeperNumber: 1,
            KeeperAcquired: "2015-02-23",
            KeeperDisposed: "2019-08-21",
            DaysBetweenKeeperAcquiredAndKeeperDisposed: 1640,
            DaysBetweenKeeperAcquiredAndNextKeeperAcquired: 1952,
            DaysBetweenKeeperDisposedAndNextKeeperAcquired: 312,
            DaysBetweenKeeperAcquiredAndKeeperDisposed_Description: "4 years, 5 months and 29 days",
            DaysBetweenKeeperAcquiredAndNextKeeperAcquired_Description: "5 years, 4 months and 5 days",
            DaysBetweenKeeperDisposedAndNextKeeperAcquired_Description: "10 months and 7 days",
            IsLatestKeeper: false,
            DaysBetweenLatestKeeperAcquiredAndToday: null,
            DaysBetweenLatestKeeperAcquiredAndToday_Description: null
          },
          {
            KeeperNumber: 2,
            KeeperAcquired: "2020-06-28",
            KeeperDisposed: null,
            DaysBetweenKeeperAcquiredAndKeeperDisposed: null,
            DaysBetweenKeeperAcquiredAndNextKeeperAcquired: null,
            DaysBetweenKeeperDisposedAndNextKeeperAcquired: null,
            DaysBetweenKeeperAcquiredAndKeeperDisposed_Description: null,
            DaysBetweenKeeperAcquiredAndNextKeeperAcquired_Description: null,
            DaysBetweenKeeperDisposedAndNextKeeperAcquired_Description: null,
            IsLatestKeeper: true,
            DaysBetweenLatestKeeperAcquiredAndToday: 463,
            DaysBetweenLatestKeeperAcquiredAndToday_Description: "1 year, 3 months and 6 days"
          }
        ]
      },
      LastColourChangeDate: "Not Available",
      LastColourCode: "Not Available",
      MiaftrStolenVehicleDetails: {
        IsStolen: false,
        Make: null,
        Model: null,
        TheftDate: null,
        VIN: null,
        VRM: null,
        InsurerDetails: null
      },
      MileageIssueSummary: null,
      MotAndRoadTaxInformation: {
        AdditionalRateOfTaxEndDate: null,
        DateMotDue: "06 Sep 2026",
        DateRoadTaxDue: "01 Dec 2025",
        IsMOTDue: false,
        IsMOTNearExpiry: false,
        IsRoadTaxDue: false,
        IsRoadTaxNearExpiry: null,
        IsVehicleSORN: false,
        MotResultsSummary: {
          DvsaFirstMotDueDate: null,
          HasResults: true,
          MileageIssueIdentified: false,
          MileageIssueSummary: null,
          MotResults: [
            {
              AdvisoryNotices: [
                "Front brake disc worn, but not excessively both (1.1.14 (a) (i))",
                "Front lower suspension arm pin or bush worn but not resulting in excessive movement rear (both) (5.3.4 (a) (i))"
              ],
              AdvisoryNotices_V2: [
                {
                  IsDangerous: false,
                  Text: "Front brake disc worn, but not excessively both (1.1.14 (a) (i))",
                  Type: "ADVISORY"
                },
                {
                  IsDangerous: false,
                  Text: "Front lower suspension arm pin or bush worn but not resulting in excessive movement rear (both) (5.3.4 (a) (i))",
                  Type: "ADVISORY"
                }
              ],
              DateOfTest: "2025-08-20T11:28:23.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 10862,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 50382,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2026-09-06T00:00:00",
              TestNumber: "285981326299",
              Location: "",
              DataSource: "DVSA"
            },
            {
              AdvisoryNotices: [
                "Front brake disc worn, but not excessively (1.1.14 (a) (i))",
                "Offside rear tyre slightly damaged/cracking or perishing (5.2.3 (d) (ii))"
              ],
              AdvisoryNotices_V2: [
                {
                  IsDangerous: false,
                  Text: "Front brake disc worn, but not excessively (1.1.14 (a) (i))",
                  Type: "ADVISORY"
                },
                {
                  IsDangerous: false,
                  Text: "Offside rear tyre slightly damaged/cracking or perishing (5.2.3 (d) (ii))",
                  Type: "ADVISORY"
                }
              ],
              DateOfTest: "2024-08-28T10:07:25.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 9803,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 39520,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2025-09-06T00:00:00",
              TestNumber: "233511524101",
              Location: "",
              DataSource: "DVSA"
            },
            {
              AdvisoryNotices: null,
              AdvisoryNotices_V2: null,
              DateOfTest: "2023-08-30T10:11:45.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 8583,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 29717,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2024-09-06T00:00:00",
              TestNumber: "158094699087",
              Location: "",
              DataSource: "DVSA"
            },
            {
              AdvisoryNotices: null,
              AdvisoryNotices_V2: null,
              DateOfTest: "2022-08-31T10:19:52.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 8735,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 21134,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2023-09-06T00:00:00",
              TestNumber: "869422867363",
              Location: "",
              DataSource: "DVSA"
            },
            {
              AdvisoryNotices: null,
              AdvisoryNotices_V2: null,
              DateOfTest: "2021-08-31T09:36:58.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 6382,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 12399,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2022-09-06T00:00:00",
              TestNumber: "932798299992",
              Location: "",
              DataSource: "DVSA"
            },
            {
              AdvisoryNotices: null,
              AdvisoryNotices_V2: null,
              DateOfTest: "2020-08-14T11:28:03.001+01:00",
              HadMixedOdometerFormats: false,
              HasMileageIssue: false,
              MileageDifference: 0,
              OdometerModel: {
                OdometerFormat: "miles",
                OdometerReading: 6017,
                OdometerResultType: "READ"
              },
              RefusalReasons: null,
              RefusalReasons_V2: null,
              Result: true,
              ResultText: "Pass",
              TestDueDate: "0001-01-01T00:00:00",
              TestExpiryDate: "2021-09-06T00:00:00",
              TestNumber: "157349050770",
              Location: "",
              DataSource: "DVSA"
            }
          ],
          MotVehicleColour: "Grey",
          MotVehicleDateOfFirstRegistration: "2017-09-07T00:00:00",
          MotVehicleDateOfManufacture: "2017-09-07T00:00:00",
          MotVehicleEngineSize: "1395",
          MotVehicleFuelType: "Petrol",
          MotVehicleManufacturer: "Skoda",
          MotVehicleModel: "Octavia",
          MotVehicleVrm: "WA67YSB",
          MotHasOutstandingRecalls: "Unknown"
        },
        RealDrivingEmissions: "Not Available"
      },
      NoOfVrmChanges: 0,
      OriginalColourCode: "Not Available",
      OutstandingFinanceDetails: null,
      PoliceStolenVehicleDetails: {
        ChasisFrame: null,
        CreationDate: null,
        IsStolen: false,
        Make: null,
        Model: null,
        PoliceForce: null,
        PoliceForceName: null,
        ReportType: null,
        VRM: null
      },
      PreviousVrms: null,
      QRegistration: false,
      Scrapped: false,
      ScrappedDate: "Not Available",
      Unscrapped: false,
      VehicleHadPreviousColours: false,
      VehiclePreviousColours: "0",
      VicTestDate: "Not Available",
      VicTestResult: true,
      WrittenOffVehicleDetails: [],
      ExTaxiData: null
    },
    PreviousKeepersInformation: {
      CurrentOwnerAquiredDate: "06 December 2020",
      CurrentOwnershipDuration: "4 years 10 months",
      PreviousKeepers: "2",
      PreviousOwnerBoughtDate: "06 October 2020",
      PreviousOwnerSoldDate: "19 October 2020",
      V5CLogBookDate: "06/12/20",
      V5CLogBookDateMatches: null,
      VehicleHasPreviousKeepers: true
    },
    ReportMetaData: {
      CustomerEmailAddress: "Eyedastore",
      DateOfCheck: "15 October 2025 14:38",
      ReferenceNumber: "XTX-CF2E528C5C324BADB35807661ED0875A",
      ReferrerId: "XTX"
    },
    RoadTaxInformation: {
      HasRoadTaxInfo: true,
      SixMonthsRate: "107.25",
      TwelveMonthsRate: "195"
    },
    ValuationInformation: {
      HasValuationResults: true,
      Mileage: 50382,
      PlateYear: "67",
      ShouldValuationBeIncluded: true,
      ValuationResults: {
        TradeAverage: "8500",
        TradeGood: "9200",
        TradeExcellent: "9800",
        PrivateAverage: "9800",
        PrivateGood: "10500",
        PrivateExcellent: "11200",
        Retail: "11800"
      },
      VehicleDescription: "Skoda Octavia Estate 1.4 TSI 150 SE L"
    },
    ReportResult: {
      Message: "Pass",
      ResultInformationMessage: null
    }
  }
};

// SILVER CHECK DATA - Excludes: AdditionalMileageInformation, KeeperDurationDetails, ValuationInformation
export const silverCheckData = {
  ...goldCheckData,
  Report: {
    ...goldCheckData.Report,
    ImportantChecks: {
      ...goldCheckData.Report.ImportantChecks,
      AdditionalMileageInformation: null,
      KeeperDurationDetails: null
    },
    ValuationInformation: {
      HasValuationResults: false,
      Mileage: null,
      PlateYear: null,
      ShouldValuationBeIncluded: false,
      ValuationResults: null,
      VehicleDescription: null
    }
  }
};

// Pricing tiers
export const PRICING_TIERS = {
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold'
};

// Feature flags for each tier
export const TIER_FEATURES = {
  [PRICING_TIERS.BASIC]: {
    name: 'Basic',
    price: 0,
    priceDisplay: 'Free',
    features: [
      'Unlimited Basic Checks',
      'MOT & Tax Status',
      'Core Vehicle Specifications',
      'Basic Environmental Data',
      'Email Support'
    ]
  },
  [PRICING_TIERS.SILVER]: {
    name: 'Silver',
    price: 2.99,
    priceDisplay: '£2.99',
    features: [
      'Everything in Basic',
      'Full MOT History & Advisories',
      'Detailed Specifications',
      'Previous Owners Count',
      'Export/Import Status',
      'Stolen Vehicle Check',
      'Write-Off Check',
      'Color Change History',
      'Priority Support'
    ],
    excludedFromBasic: [
      'Full MOT History',
      'Previous Owners Count',
      'Export/Import Status'
    ]
  },
  [PRICING_TIERS.GOLD]: {
    name: 'Gold',
    price: 5.99,
    priceDisplay: '£5.99',
    features: [
      'Everything in Silver',
      'Keeper Duration History',
      'Vehicle Valuation Data',
      'Additional Mileage Records',
      'Mileage Anomaly Detection',
      'Time Between Keepers',
      'Premium Support',
      'API Access (Beta)'
    ],
    excludedFromSilver: [
      'Keeper Duration History',
      'Vehicle Valuation Data',
      'Additional Mileage Records'
    ]
  }
};

// Helper function to get data by tier
export function getVehicleDataByTier(vrm, tier) {
  // For demo, always return the same vehicle
  if (vrm.toUpperCase().replace(/\s/g, '') !== DEMO_VEHICLE_VRM.replace(/\s/g, '')) {
    return null; // Vehicle not found
  }

  switch (tier) {
    case PRICING_TIERS.GOLD:
      return goldCheckData;
    case PRICING_TIERS.SILVER:
      return silverCheckData;
    case PRICING_TIERS.BASIC:
      // For basic tier, return data mapped from DVLA API format
      // This simulates what free users get from the public DVLA API
      return mapDVLADataToVehicleFormat(dvlaApiMockData);
    default:
      return silverCheckData;
  }
}

// Check if feature is available for tier
export function isFeatureAvailable(feature, tier) {
  const goldOnly = ['keeperHistory', 'valuation', 'additionalMileage'];
  const silverOnly = ['motHistory', 'detailedSpecs', 'exportImport'];

  if (goldOnly.includes(feature)) {
    return tier === PRICING_TIERS.GOLD;
  }

  if (silverOnly.includes(feature)) {
    return tier === PRICING_TIERS.SILVER || tier === PRICING_TIERS.GOLD;
  }

  return true; // Available in all tiers
}
