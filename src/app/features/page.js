'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCircleCheck,
  FaCar,
  FaClipboardList,
  FaChartLine,
  FaSterlingSign,
  FaUserGroup,
  FaShield,
  FaLeaf,
  FaBolt,
  FaGauge,
  FaClockRotateLeft,
  FaMagnifyingGlass
} from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

/**
 * Features Page
 * Comprehensive showcase of all platform capabilities
 */
export default function FeaturesPage() {
  // All features organized by category
  const allFeatures = [
    {
      id: 'mot-status',
      icon: FaCircleCheck,
      title: 'Instant MOT Status',
      description: 'Check current MOT status, expiry date, and test location in real-time.',
      tier: 'basic'
    },
    {
      id: 'tax-status',
      icon: FaSterlingSign,
      title: 'Tax Verification',
      description: 'Verify road tax status and validity period instantly.',
      tier: 'basic'
    },
    {
      id: 'mot-history',
      icon: FaClipboardList,
      title: 'Full MOT History',
      description: 'Complete MOT test history with pass/fail records and advisory notes.',
      tier: 'silver'
    },
    {
      id: 'specifications',
      icon: FaCar,
      title: 'Vehicle Specifications',
      description: 'Comprehensive spec data: make, model, engine, fuel type, and more.',
      tier: 'basic'
    },
    {
      id: 'mileage-tracking',
      icon: FaGauge,
      title: 'Mileage Tracking',
      description: 'View mileage progression over time with anomaly detection.',
      tier: 'silver'
    },
    {
      id: 'keeper-history',
      icon: FaUserGroup,
      title: 'Keeper History',
      description: 'Detailed ownership timeline with dates and keeper duration.',
      tier: 'gold'
    },
    {
      id: 'valuation',
      icon: FaChartLine,
      title: 'Market Valuation',
      description: 'Accurate market value based on condition, mileage, and market trends.',
      tier: 'gold'
    },
    {
      id: 'environmental',
      icon: FaLeaf,
      title: 'Environmental Data',
      description: 'CO2 emissions, Euro standard, and environmental impact information.',
      tier: 'silver'
    },
    {
      id: 'security',
      icon: FaShield,
      title: 'Security Checks',
      description: 'Verify stolen vehicle status and outstanding finance records.',
      tier: 'silver'
    },
    {
      id: 'history-changes',
      icon: FaClockRotateLeft,
      title: 'Change History',
      description: 'Track color changes, exports/imports, and registration changes.',
      tier: 'silver'
    },
    {
      id: 'instant-results',
      icon: FaBolt,
      title: 'Lightning Fast',
      description: 'Results delivered in under 2 seconds from official UK databases.',
      tier: 'basic'
    },
    {
      id: 'unlimited-checks',
      icon: FaMagnifyingGlass,
      title: 'Unlimited Checks',
      description: 'Check as many vehicles as you need with no restrictions.',
      tier: 'basic'
    }
  ];

  // Feature showcases for hero sections
  const showcases = [
    {
      title: 'Instant MOT & Tax Status',
      description: 'Get immediate access to critical vehicle status information. See MOT expiry dates, test locations, and road tax validity in real-time. Perfect for quick pre-purchase checks or verifying your own vehicle status.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000',
      features: [
        'Real-time MOT status and expiry date',
        'Tax validity and payment status',
        'Last MOT test location and date',
        'Instant alerts for expired or expiring status'
      ],
      tier: null,
      imagePosition: 'right'
    },
    {
      title: 'Complete Vehicle History',
      description: 'Unlock the full story behind any vehicle. Access comprehensive MOT test history, mileage progression charts, and detailed records that reveal potential issues before you buy.',
      image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2000',
      features: [
        'Full MOT test history with pass/fail records',
        'Advisory warnings and failure reasons',
        'Mileage progression visualization',
        'Color change and registration history'
      ],
      tier: 'silver',
      imagePosition: 'left'
    },
    {
      title: 'Market Valuation & Insights',
      description: 'Make confident buying and selling decisions with AI-powered valuations. Our advanced algorithms analyze market trends, vehicle condition, and mileage to provide accurate, up-to-date pricing.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000',
      features: [
        'Real-time market valuation',
        'Condition-adjusted pricing',
        'Complete keeper timeline with dates',
        'Advanced mileage anomaly detection'
      ],
      tier: 'gold',
      imagePosition: 'right'
    }
  ];

  const getTierBadgeColor = (tier) => {
    if (tier === 'gold') return 'warning';
    if (tier === 'silver') return 'info';
    return 'success';
  };

  const getTierLabel = (tier) => {
    if (tier === 'gold') return 'Gold';
    if (tier === 'silver') return 'Silver';
    return 'Free';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Vehicle Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to know about any UK vehicle, from basic MOT status
              to advanced valuation and ownership history. Trusted by thousands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button variant="primary" size="lg">
                  View Pricing Plans
                </Button>
              </Link>
              <Link href="/check/WA67YSB">
                <Button variant="secondary" size="lg">
                  <FaMagnifyingGlass />
                  Try Demo Vehicle
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcases - Alternating Layout */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {showcases.map((showcase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-24 last:mb-0"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                showcase.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className={showcase.imagePosition === 'left' ? 'lg:order-2' : ''}>
                  {showcase.tier && (
                    <div className="mb-4">
                      <Badge variant={getTierBadgeColor(showcase.tier)} size="lg">
                        {getTierLabel(showcase.tier)} Tier
                      </Badge>
                    </div>
                  )}
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {showcase.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {showcase.description}
                  </p>
                  <ul className="space-y-4">
                    {showcase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCircleCheck className="text-success-500 text-xl mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className={showcase.imagePosition === 'left' ? 'lg:order-1' : ''}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={showcase.image}
                      alt={showcase.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need,{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                In One Place
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic checks to advanced analytics, we provide comprehensive
              vehicle intelligence at your fingertips.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card hover className="h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-white text-2xl" />
                      </div>
                      <div className="flex-1">
                        <Badge variant={getTierBadgeColor(feature.tier)} size="sm">
                          {getTierLabel(feature.tier)}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tier Comparison Quick View */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with our free Basic plan and upgrade anytime for advanced features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <Card className="text-center">
              <Badge variant="success" size="lg" className="mb-4">
                Free
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <p className="text-gray-600 mb-6">
                Essential checks for casual users
              </p>
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">MOT & Tax Status</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Core Specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Unlimited Checks</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button variant="secondary" fullWidth>
                  Get Started Free
                </Button>
              </Link>
            </Card>

            {/* Silver */}
            <Card className="text-center border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="info" size="lg">
                  Most Popular
                </Badge>
              </div>
              <Badge variant="info" size="lg" className="mb-4 mt-4">
                Silver
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Silver</h3>
              <p className="text-gray-600 mb-6">
                Complete history for serious buyers
              </p>
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Everything in Basic</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Full MOT History</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Mileage Tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Environmental Data</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button variant="primary" fullWidth>
                  Upgrade to Silver
                </Button>
              </Link>
            </Card>

            {/* Gold */}
            <Card className="text-center">
              <Badge variant="warning" size="lg" className="mb-4">
                Gold
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gold</h3>
              <p className="text-gray-600 mb-6">
                Ultimate intelligence for professionals
              </p>
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Everything in Silver</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Market Valuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">Keeper History</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCircleCheck className="text-success-500 mt-1" />
                  <span className="text-gray-700">PDF Reports</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button variant="primary" fullWidth>
                  Upgrade to Gold
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Check a Vehicle?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with our free Basic plan and experience the power of comprehensive
              vehicle intelligence. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 border-0"
                >
                  <FaMagnifyingGlass />
                  Start Checking Now
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  View All Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
