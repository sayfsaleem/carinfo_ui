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

// Layout Components
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// UI Components
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Modal from '../../components/ui/Modal';

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
import UpgradePrompt from '../../components/vehicle/UpgradePrompt';

// Hooks
import useCurrentTier, { useSetTier } from '../../hooks/useCurrentTier';
import useVehicleData from '../../hooks/useVehicleData';

// Utils
import { formatVRM, daysUntil, formatMileage } from '../../lib/utils';
import { PRICING_TIERS } from '../../lib/demoData';

/**
 * Vehicle Check Result Page
 * Dynamic route: /check/[vrm]
 * Displays complete vehicle information based on user's tier
 */
export default function VehicleCheckPage({ params }) {
  const unwrappedParams = use(params);
  const vrm = unwrappedParams.vrm;
  const router = useRouter();

  const { tier, isLoading: tierLoading } = useCurrentTier();
  const setTier = useSetTier();
  const { data, isLoading: dataLoading, error } = useVehicleData(vrm, tier);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Combined loading state
  const isLoading = tierLoading || dataLoading;

  // Handle upgrade
  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    setTier(PRICING_TIERS.GOLD);
    setShowUpgradeModal(false);

    // Reload page to show gold features
    window.location.reload();
  };

  // Handle share
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data?.Report?.BasicVehicleInformation?.Make} ${data?.Report?.BasicVehicleInformation?.Model}`,
          text: `Check out this vehicle report for ${formatVRM(vrm)}`,
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="large" text="Loading vehicle data..." />
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <FaCar className="text-6xl text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {error || `We couldn't find vehicle data for ${formatVRM(vrm)}`}
            </p>
            <Button onClick={() => router.push('/')}>
              Check Another Vehicle
            </Button>
          </div>
        </main>
        <Footer />
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

  // Check if Gold tier features are available
  const isGoldTier = tier === PRICING_TIERS.GOLD;

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Vehicle Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
          <FaCar className="text-3xl text-blue-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Vehicle Type</p>
          <p className="text-xl font-bold text-gray-900">{basicInfo.Body}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
          <FaGear className="text-3xl text-green-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Engine</p>
          <p className="text-xl font-bold text-gray-900">{basicInfo.Cc}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
          <FaGauge className="text-3xl text-purple-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Current Mileage</p>
          <p className="text-xl font-bold text-gray-900">
            {currentMileage ? formatMileage(currentMileage) : 'N/A'}
          </p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Summary</h3>
        <p className="text-gray-700">
          This {basicInfo.Make} {basicInfo.Model} was manufactured in{' '}
          {new Date(basicInfo.ManufacturedDate).getFullYear()} and is currently{' '}
          {basicInfo.VehicleAge} old. The vehicle is a {basicInfo.Colour}{' '}
          {basicInfo.Body} with a {basicInfo.Fuel} engine ({basicInfo.Cc}).
        </p>
      </div>
    </div>
  );

  // Tab configuration
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FaCar />,
      content: <OverviewContent />
    },
    {
      id: 'specifications',
      label: 'Specifications',
      icon: <FaGear />,
      content: <VehicleSpecs data={data} />
    },
    {
      id: 'mot-history',
      label: 'MOT History',
      icon: <FaClockRotateLeft />,
      content: motResults.length > 0 ? (
        <MOTHistoryTimeline tests={motResults} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No MOT history available</p>
        </div>
      )
    },
    {
      id: 'mileage-chart',
      label: 'Mileage Chart',
      icon: <FaChartLine />,
      content: <MileageChart tests={motResults} />
    },
    {
      id: 'environmental',
      label: 'Environmental',
      icon: <FaLeaf />,
      content: <EnvironmentalInfo data={data} />
    },
    {
      id: 'keeper-history',
      label: 'Keeper History',
      icon: <FaUsers />,
      content: isGoldTier ? (
        <KeeperHistoryTimeline keeperData={keeperInfo} />
      ) : (
        <FeatureLock
          feature="Keeper History"
          description="View complete ownership history including duration of each keeper and gaps between owners."
          onUpgrade={handleUpgrade}
        />
      )
    },
    {
      id: 'valuation',
      label: 'Valuation',
      icon: <FaSterlingSign />,
      content: isGoldTier ? (
        <ValuationCard valuationData={valuationInfo} />
      ) : (
        <FeatureLock
          feature="Vehicle Valuation"
          description="Get professional valuation estimates for trade-in, private sale, and retail prices."
          onUpgrade={handleUpgrade}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container-custom">
          {/* Vehicle Header */}
          <VehicleHeader vehicle={data} />

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          {/* Main Tabs */}
          <Tabs tabs={tabs} defaultTab="overview" />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <FaShare />
              {shareSuccess ? 'Link Copied!' : 'Share Report'}
            </Button>

            <Button
              onClick={handlePrint}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <FaDownload />
              Print / PDF
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <FaBookmark />
              Save Vehicle
            </Button>
          </motion.div>

          {/* Upgrade Prompt for Silver Users */}
          {tier === PRICING_TIERS.SILVER && (
            <div className="mt-12">
              <UpgradePrompt onUpgrade={handleUpgrade} />
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Upgrade Modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Upgrade to Gold"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Unlock All Features
            </h3>
            <p className="text-gray-600 mb-4">
              Get complete access to keeper history, valuation, and more
            </p>
            <p className="text-4xl font-black text-green-600 mb-2">
              £5.99
            </p>
            <p className="text-sm text-gray-500">One-time payment</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowUpgradeModal(false)}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={confirmUpgrade}
              variant="primary"
              size="lg"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
