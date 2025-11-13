'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaGauge,
  FaCar,
  FaGear,
  FaClockRotateLeft,
  FaUsers,
  FaSterlingSign,
  FaLeaf,
  FaChartLine,
  FaShare,
  FaDownload,
  FaBookmark
} from 'react-icons/fa6';

// UI Components
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Vehicle Components
import VehicleHeader from '../../components/vehicle/VehicleHeader';
import StatusCard from '../../components/vehicle/StatusCard';
import VehicleSpecs from '../../components/vehicle/VehicleSpecs';
import MOTHistoryTimeline from '../../components/vehicle/MOTHistoryTimeline';
import EnvironmentalInfo from '../../components/vehicle/EnvironmentalInfo';
import MileageChart from '../../components/vehicle/MileageChart';
import KeeperHistoryTimeline from '../../components/vehicle/KeeperHistoryTimeline';
import ValuationCard from '../../components/vehicle/ValuationCard';
import FeatureLock from '../../components/vehicle/FeatureLock';
import SectionHeader from '../../components/vehicle/SectionHeader';
import FreeTierDataInfo from '../../components/vehicle/FreeTierDataInfo';
import FreeTierDataDisplay from '../../components/vehicle/FreeTierDataDisplay';

// Promotion Components
import TierUpgradePrompt from '../../components/promotion/TierUpgradePrompt';
import FloatingUpgradeBanner from '../../components/promotion/FloatingUpgradeBanner';
import FeatureComparisonPopup from '../../components/promotion/FeatureComparisonPopup';
import ExitIntentModal from '../../components/promotion/ExitIntentModal';
import StickyUpgradeBar from '../../components/promotion/StickyUpgradeBar';

// Hooks
import { useCurrentTier, useSetTier } from '../../hooks/useCurrentTier';
import useVehicleData from '../../hooks/useVehicleData';

// Utils
import { formatVRM, daysUntil, formatMileage } from '../../lib/utils';
import { PRICING_TIERS } from '../../lib/demoData';

/**
 * Vehicle Check Result Page - REDESIGNED
 * Single scroll page with sectioned layout (NO TABS)
 * Strategic tier promotions throughout
 * Dynamic route: /check/[vrm]
 */
export default function VehicleCheckPage({ params }) {
  const unwrappedParams = use(params);
  const vrm = unwrappedParams.vrm;
  const router = useRouter();

  const { tier, isLoading: tierLoading } = useCurrentTier();
  const setTier = useSetTier();
  const { data, isLoading: dataLoading, error } = useVehicleData(vrm, tier);

  const [showComparisonPopup, setShowComparisonPopup] = useState(false);
  const [lockedFeature, setLockedFeature] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Combined loading state
  const isLoading = tierLoading || dataLoading;

  // Handle locked feature click
  const handleLockedFeatureClick = (featureName) => {
    setLockedFeature(featureName);
    setShowComparisonPopup(true);
  };

  // Handle upgrade
  const handleUpgrade = () => {
    // In production, this would open payment modal
    // For demo, just upgrade tier
    const targetTier = tier === PRICING_TIERS.BASIC
      ? PRICING_TIERS.SILVER
      : PRICING_TIERS.GOLD;

    setTier(targetTier);
    window.location.reload();
  };

  // Handle share
  const handleShare = async () => {
    try {
      if (navigator.share) {
        const make = data?.Report?.BasicVehicleInformation?.Make || 'Vehicle';
        const model = data?.Report?.BasicVehicleInformation?.Model || '';
        const title = model ? `${make} ${model}` : make;

        await navigator.share({
          title: title,
          text: `Check out this vehicle report for ${formatVRM(vrm)}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Handle print/PDF
  const handlePrint = () => {
    window.print();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" text="Loading vehicle data..." />
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md">
          <FaCar className="text-6xl text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {error || `We couldn't find vehicle data for ${formatVRM(vrm)}`}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Check Another Vehicle
          </button>
        </div>
      </div>
    );
  }

  // Extract data
  const basicInfo = data.Report.BasicVehicleInformation;
  const motInfo = data.Report.ImportantChecks?.MotAndRoadTaxInformation;
  const motResults = motInfo?.MotResultsSummary?.MotResults || [];
  const keeperInfo = data.Report.ImportantChecks?.KeeperDurationDetails;
  const valuationInfo = data.Report.ValuationInformation;

  // MOT Status
  const isMotValid = !motInfo?.IsMOTDue && motInfo?.DateMotDue;
  const motDaysRemaining = motInfo?.DateMotDue ? daysUntil(motInfo.DateMotDue) : null;

  // Tax Status
  const isTaxed = !motInfo?.IsRoadTaxDue && !motInfo?.IsVehicleSORN;
  const taxDate = motInfo?.DateRoadTaxDue;

  // Current Mileage
  const currentMileage = motResults[0]?.OdometerModel?.OdometerReading;

  // Tier checks
  const isBasicTier = tier === PRICING_TIERS.BASIC;
  const isSilverTier = tier === PRICING_TIERS.SILVER;
  const isGoldTier = tier === PRICING_TIERS.GOLD;

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pb-32">
      <div className="py-8 md:py-12">
        <div className="container-custom">
          {/* Free Tier Data Source Badge */}
          {isBasicTier && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">FREE Check - Basic Data from DVLA</p>
                  <p className="text-xs text-gray-600">Upgrade for complete MOT history, detailed specs, and valuation data</p>
                </div>
              </div>
              <button
                onClick={handleUpgrade}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Upgrade Now
              </button>
            </motion.div>
          )}

          {/* Vehicle Header */}
          <div className="mb-8 md:mb-12">
            <VehicleHeader vehicle={data} />
          </div>

          {/* Critical Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <StatusCard
              title="MOT Status"
              status={isMotValid ? 'valid' : 'invalid'}
              date={motInfo?.DateMotDue}
              icon={FaClipboardCheck}
              showDaysRemaining={true}
            />

            <StatusCard
              title="Road Tax"
              status={isTaxed ? 'taxed' : motInfo?.IsVehicleSORN ? 'sorn' : 'untaxed'}
              date={taxDate}
              icon={FaFileInvoiceDollar}
              showDaysRemaining={true}
            />

            <StatusCard
              title="Current Mileage"
              value={currentMileage ? `${formatMileage(currentMileage)} miles` : 'N/A'}
              subtitle={
                basicInfo.IsMileageAverageMessage
                  ? `${basicInfo.IsMileageAverageMessage} mileage`
                  : null
              }
              icon={FaGauge}
              variant="info"
            />
          </div>

          {/* FREE Tier Info Card */}
          {isBasicTier && (
            <FreeTierDataInfo onUpgrade={handleUpgrade} />
          )}

          {/* FREE -> SILVER Promotion (Basic users only) */}
          {isBasicTier && (
            <div className="mb-8 md:mb-12">
              <TierUpgradePrompt
                currentTier={tier}
                context="unlock-mot-history"
                onUpgrade={handleUpgrade}
              />
            </div>
          )}

          {/* SECTION 1: Vehicle Overview */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="overview"
              icon={<FaCar />}
              title="Vehicle Overview"
              description={isBasicTier ? "All available data from DVLA Vehicle Enquiry Service" : "Essential information about this vehicle"}
            />

            {isBasicTier ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <FreeTierDataDisplay data={data} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 md:p-6 border border-blue-200 hover:shadow-md transition-shadow">
                    <FaCar className="text-3xl md:text-4xl text-blue-600 mb-3" />
                    <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Vehicle Type</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">{basicInfo.Body}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 md:p-6 border border-green-200 hover:shadow-md transition-shadow">
                    <FaGear className="text-3xl md:text-4xl text-green-600 mb-3" />
                    <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Engine</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">{basicInfo.Cc}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 md:p-6 border border-purple-200 hover:shadow-md transition-shadow">
                    <FaGauge className="text-3xl md:text-4xl text-purple-600 mb-3" />
                    <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Current Mileage</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">
                      {currentMileage ? formatMileage(currentMileage) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 md:pt-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                    Quick Summary
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    This {basicInfo.Make}{basicInfo.Model ? ` ${basicInfo.Model}` : ''} was manufactured in{' '}
                    {new Date(basicInfo.ManufacturedDate).getFullYear()} and is currently{' '}
                    {basicInfo.VehicleAge} old. The vehicle is a {basicInfo.Colour}{' '}
                    {basicInfo.Body} with a {basicInfo.Fuel} engine ({basicInfo.Cc}).
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 2: Specifications */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="specifications"
              icon={<FaGear />}
              title="Detailed Specifications"
              description="Complete technical specifications and features"
            />

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <VehicleSpecs data={data} />
            </div>
          </section>

          {/* SECTION 3: MOT History (Silver+) */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="mot-history"
              icon={<FaClockRotateLeft />}
              title="MOT History"
              description="Complete MOT test history with advisories"
              badge={isBasicTier ? 'Silver' : undefined}
              badgeVariant="info"
            />

            {isBasicTier ? (
              <FeatureLock
                feature="MOT History"
                description="View 6+ years of MOT test records, including all advisories, failures, and mileage progression."
                onUpgrade={() => handleLockedFeatureClick('MOT History')}
                targetTier="silver"
                variant="inline"
                showComparison={true}
              />
            ) : motResults.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <MOTHistoryTimeline tests={motResults} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 text-center py-12">
                <p className="text-gray-500">No MOT history available</p>
              </div>
            )}
          </section>

          {/* SILVER -> GOLD Promotion (Silver users only) */}
          {isSilverTier && (
            <div className="mb-8 md:mb-12">
              <TierUpgradePrompt
                currentTier={tier}
                context="unlock-valuation"
                onUpgrade={handleUpgrade}
              />
            </div>
          )}

          {/* SECTION 4: Mileage Analysis (Silver+) */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="mileage-chart"
              icon={<FaChartLine />}
              title="Mileage Analysis"
              description="Visual mileage progression over time"
              badge={isBasicTier ? 'Silver' : undefined}
              badgeVariant="info"
            />

            {isBasicTier ? (
              <FeatureLock
                feature="Mileage Chart"
                description="See mileage progression with visual charts and identify any anomalies."
                onUpgrade={() => handleLockedFeatureClick('Mileage Chart')}
                targetTier="silver"
                variant="inline"
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <MileageChart tests={motResults} />
              </div>
            )}
          </section>

          {/* SECTION 5: Environmental Data (Silver+) */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="environmental"
              icon={<FaLeaf />}
              title="Environmental Information"
              description="CO2 emissions and fuel economy data"
              badge={isBasicTier ? 'Silver' : undefined}
              badgeVariant="info"
            />

            {isBasicTier ? (
              <FeatureLock
                feature="Environmental Data"
                description="View detailed CO2 emissions, fuel economy, and environmental impact information."
                onUpgrade={() => handleLockedFeatureClick('Environmental Data')}
                targetTier="silver"
                variant="inline"
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <EnvironmentalInfo data={data} />
              </div>
            )}
          </section>

          {/* SECTION 6: Keeper History (Gold Only) */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="keeper-history"
              icon={<FaUsers />}
              title="Ownership History"
              description="Complete keeper timeline with duration details"
              badge="Gold"
              badgeVariant="warning"
            />

            {isGoldTier ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <KeeperHistoryTimeline keeperData={keeperInfo} />
              </div>
            ) : (
              <FeatureLock
                feature="Keeper History"
                description="See complete ownership timeline including duration of each keeper and gaps between owners."
                onUpgrade={() => handleLockedFeatureClick('Keeper History')}
                targetTier="gold"
                variant="inline"
                showComparison={true}
              />
            )}
          </section>

          {/* SECTION 7: Valuation (Gold Only) */}
          <section className="mb-8 md:mb-16">
            <SectionHeader
              id="valuation"
              icon={<FaSterlingSign />}
              title="Market Valuation"
              description="Professional valuation based on current condition and market"
              badge="Gold"
              badgeVariant="warning"
            />

            {isGoldTier ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <ValuationCard valuationData={valuationInfo} />
              </div>
            ) : (
              <FeatureLock
                feature="Vehicle Valuation"
                description="Get professional valuation estimates for trade-in, private sale, and retail prices."
                onUpgrade={() => handleLockedFeatureClick('Vehicle Valuation')}
                targetTier="gold"
                variant="inline"
                showComparison={true}
              />
            )}
          </section>

          {/* Final CTA for non-Gold users */}
          {!isGoldTier && (
            <div className="mt-8 md:mt-16 mb-8 md:mb-12 text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl border border-blue-500/20">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">
                  Ready to see everything?
                </h2>
                <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
                  Upgrade now and unlock complete vehicle intelligence
                </p>
                <button
                  onClick={handleUpgrade}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-700 rounded-xl font-bold text-base md:text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {tier === PRICING_TIERS.BASIC ? 'Upgrade to Silver - £2.99/month' : 'Upgrade to Gold - £5.99/month'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Upgrade Banner */}
      <FloatingUpgradeBanner
        currentTier={tier}
        onUpgrade={handleUpgrade}
      />

      {/* Sticky Upgrade Bar */}
      <StickyUpgradeBar
        currentTier={tier}
        onUpgrade={handleUpgrade}
        onShare={handleShare}
        onDownload={handlePrint}
        onSave={() => {}}
        showActions={true}
      />

      {/* Feature Comparison Popup */}
      <FeatureComparisonPopup
        isOpen={showComparisonPopup}
        onClose={() => setShowComparisonPopup(false)}
        currentTier={tier}
        lockedFeature={lockedFeature}
        onUpgrade={handleUpgrade}
      />

      {/* Exit Intent Modal */}
      <ExitIntentModal
        currentTier={tier}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}
