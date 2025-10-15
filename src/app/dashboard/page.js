'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  FaMagnifyingGlass,
  FaCar,
  FaStar,
  FaChartLine,
  FaPlus
} from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import StatCard from '../components/dashboard/StatCard';
import VehicleCheckCard from '../components/dashboard/VehicleCheckCard';
import SavedVehicleCard from '../components/dashboard/SavedVehicleCard';
import Badge from '../components/ui/Badge';
import { useCurrentTier } from '../hooks/useCurrentTier';
import { isValidVRM } from '../lib/utils';

/**
 * Dashboard Page
 * User dashboard for saved vehicles and recent checks
 */
export default function DashboardPage() {
  const router = useRouter();
  const currentTier = useCurrentTier();

  const [vrmInput, setVrmInput] = useState('');
  const [recentChecks, setRecentChecks] = useState([]);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [statsData, setStatsData] = useState({
    checksThisMonth: 0,
    savedVehicles: 0,
    currentTier: 'basic'
  });

  // Load data from localStorage on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load recent checks
    const checksData = localStorage.getItem('recentChecks');
    if (checksData) {
      const checks = JSON.parse(checksData);
      setRecentChecks(checks.slice(0, 5)); // Show last 5
    } else {
      // Demo data if none exists
      setRecentChecks([
        {
          vrm: 'WA67YSB',
          make: 'BMW',
          model: '3 Series',
          color: 'Blue',
          checkDate: new Date().toISOString(),
          motStatus: 'valid',
          taxStatus: 'taxed'
        },
        {
          vrm: 'AB12CDE',
          make: 'Ford',
          model: 'Focus',
          color: 'Red',
          checkDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          motStatus: 'valid',
          taxStatus: 'taxed'
        },
        {
          vrm: 'XY98ZAB',
          make: 'Volkswagen',
          model: 'Golf',
          color: 'Silver',
          checkDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          motStatus: 'expired',
          taxStatus: 'untaxed'
        }
      ]);
    }

    // Load saved vehicles
    const savedData = localStorage.getItem('savedVehicles');
    if (savedData) {
      const vehicles = JSON.parse(savedData);
      setSavedVehicles(vehicles);
    } else {
      // Demo data if none exists
      setSavedVehicles([
        {
          vrm: 'WA67YSB',
          make: 'BMW',
          model: '3 Series',
          color: 'Blue',
          year: '2017',
          savedDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
          motExpiry: '2025-09-15',
          favorite: true
        },
        {
          vrm: 'FG67HJK',
          make: 'Mercedes-Benz',
          model: 'C-Class',
          color: 'Black',
          year: '2018',
          savedDate: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
          motExpiry: '2025-06-20',
          favorite: false
        },
        {
          vrm: 'LM34NOP',
          make: 'Audi',
          model: 'A4',
          color: 'White',
          year: '2019',
          savedDate: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
          motExpiry: '2024-12-10',
          favorite: false
        }
      ]);
    }

    // Calculate stats
    const currentMonth = new Date().getMonth();
    const checksThisMonth = recentChecks.filter(check => {
      const checkMonth = new Date(check.checkDate).getMonth();
      return checkMonth === currentMonth;
    }).length || 15; // Demo value

    setStatsData({
      checksThisMonth,
      savedVehicles: savedVehicles.length || 3,
      currentTier: currentTier
    });
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();

    const vrm = vrmInput.trim().toUpperCase().replace(/\s/g, '');

    if (!vrm) {
      return;
    }

    if (!isValidVRM(vrm)) {
      alert('Please enter a valid UK registration number');
      return;
    }

    // Navigate to check page
    router.push(`/check/${vrm}`);
  };

  const handleRemoveVehicle = (vrm) => {
    const updated = savedVehicles.filter(v => v.vrm !== vrm);
    setSavedVehicles(updated);
    localStorage.setItem('savedVehicles', JSON.stringify(updated));
    setStatsData(prev => ({
      ...prev,
      savedVehicles: updated.length
    }));
  };

  const getTierLabel = (tier) => {
    if (tier === 'gold') return 'Gold';
    if (tier === 'silver') return 'Silver';
    return 'Basic';
  };

  const getTierBadgeVariant = (tier) => {
    if (tier === 'gold') return 'warning';
    if (tier === 'silver') return 'info';
    return 'success';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back! Here&apos;s your vehicle activity overview.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={FaMagnifyingGlass}
            value={statsData.checksThisMonth}
            label="Checks This Month"
            variant="primary"
          />
          <StatCard
            icon={FaCar}
            value={statsData.savedVehicles}
            label="Saved Vehicles"
            variant="success"
          />
          <StatCard
            icon={FaStar}
            value={getTierLabel(statsData.currentTier)}
            label="Current Plan"
            variant={statsData.currentTier === 'gold' ? 'warning' : statsData.currentTier === 'silver' ? 'info' : 'primary'}
          />
        </div>

        {/* Quick Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Vehicle Check</h2>
            <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={vrmInput}
                  onChange={(e) => setVrmInput(e.target.value.toUpperCase())}
                  placeholder="Enter registration... e.g. WA67YSB"
                  className="font-mono font-semibold"
                />
              </div>
              <Button type="submit" variant="primary" size="lg">
                <FaMagnifyingGlass />
                Check Vehicle
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Recent Checks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Recent Checks</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <FaPlus />
              New Check
            </Button>
          </div>

          {recentChecks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentChecks.map((check, index) => (
                <VehicleCheckCard key={`${check.vrm}-${index}`} check={check} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <FaMagnifyingGlass className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No recent checks yet</p>
              <Button variant="primary" onClick={() => router.push('/')}>
                <FaMagnifyingGlass />
                Check Your First Vehicle
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Saved Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Saved Vehicles</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <FaPlus />
              Add Vehicle
            </Button>
          </div>

          {savedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVehicles.map((vehicle) => (
                <SavedVehicleCard
                  key={vehicle.vrm}
                  vehicle={vehicle}
                  onRemove={handleRemoveVehicle}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No saved vehicles yet</p>
              <p className="text-gray-500 mb-6">
                Save vehicles to quickly access their information and track MOT expiry dates
              </p>
              <Button variant="primary" onClick={() => router.push('/')}>
                <FaPlus />
                Save Your First Vehicle
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Subscription Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold">Your Subscription</h2>
                  <Badge
                    variant={getTierBadgeVariant(statsData.currentTier)}
                    size="lg"
                  >
                    {getTierLabel(statsData.currentTier)}
                  </Badge>
                </div>
                <p className="text-white/90 mb-2">
                  {statsData.currentTier === 'basic' && 'Enjoying basic vehicle checks? Upgrade for full MOT history and advanced features.'}
                  {statsData.currentTier === 'silver' && 'You have access to full MOT history and detailed vehicle information.'}
                  {statsData.currentTier === 'gold' && 'You have full access to all premium features including valuations and keeper history.'}
                </p>
                {statsData.currentTier !== 'gold' && (
                  <ul className="space-y-1 text-sm text-white/80">
                    {statsData.currentTier === 'basic' && (
                      <>
                        <li>✓ Full MOT History (Silver)</li>
                        <li>✓ Vehicle Valuation (Gold)</li>
                        <li>✓ Keeper History (Gold)</li>
                      </>
                    )}
                    {statsData.currentTier === 'silver' && (
                      <>
                        <li>✓ Vehicle Valuation (Gold)</li>
                        <li>✓ Complete Keeper History (Gold)</li>
                        <li>✓ PDF Reports (Gold)</li>
                      </>
                    )}
                  </ul>
                )}
              </div>
              <div>
                {statsData.currentTier !== 'gold' && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push('/pricing')}
                    className="bg-white text-primary hover:bg-gray-100 border-0"
                  >
                    <FaChartLine />
                    {statsData.currentTier === 'basic' ? 'Upgrade Plan' : 'Upgrade to Gold'}
                  </Button>
                )}
                {statsData.currentTier === 'gold' && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => router.push('/pricing')}
                    className="text-white border-white hover:bg-white/10"
                  >
                    Manage Subscription
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
