'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaFileLines,
  FaBrain,
  FaShield,
  FaChartLine,
  FaUsers,
  FaMagnifyingGlass,
  FaCartShopping,
  FaTag,
  FaWrench,
  FaHeart,
  FaCheck,
  FaCircleCheck,
  FaKeyboard,
  FaDatabase,
  FaFileCircleCheck,
  FaStar,
  FaArrowRight
} from 'react-icons/fa6';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import { formatVRM, isValidVRM } from './lib/utils';
import { FEATURE_HIGHLIGHTS, USE_CASES, TESTIMONIALS, FAQ_ITEMS } from './lib/constants';
import Accordion from './components/ui/Accordion';
import FloatingInfoCard from './components/home/FloatingInfoCard';
import TrustStat from './components/home/TrustStat';
import ProcessStep from './components/home/ProcessStep';
import DataSourceCard from './components/home/DataSourceCard';
import StatCard from './components/home/StatCard';
import LiveCheckFeed from './components/home/LiveCheckFeed';
import MiniPricingCard from './components/home/MiniPricingCard';

/**
 * Home Page Component
 * Landing page with hero, features, testimonials, FAQ
 */
export default function Home() {
  const [vrmInput, setVrmInput] = useState('');
  const [vrmError, setVrmError] = useState('');

  const handleVrmSubmit = (e) => {
    e.preventDefault();

    const vrm = vrmInput.trim();

    if (!vrm) {
      setVrmError('Please enter a vehicle registration number');
      return;
    }

    if (!isValidVRM(vrm)) {
      setVrmError('Please enter a valid UK registration number');
      return;
    }

    // Navigate to check page
    const formattedVrm = vrm.toUpperCase().replace(/\s/g, '');
    window.location.href = `/check/${formattedVrm}`;
  };

  const featureIcons = {
    FaBolt,
    FaFileLines,
    FaBrain,
    FaShield,
    FaChartLine,
    FaUsers
  };

  const useCaseIcons = {
    FaCartShopping,
    FaTag,
    FaWrench,
    FaHeart
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - ENHANCED WITH EDGE-TO-EDGE CAR */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        {/* Mesh Gradient Background with Animated Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* Hero Text - WITH PADDING */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="px-6 md:px-8 lg:px-12 xl:px-20 py-12"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Revolutionary UK Vehicle{' '}
                <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Unlock comprehensive vehicle intelligence in milliseconds. From MOT and tax status to AI-powered insights, experience the future of vehicle data analysis.
              </p>

              {/* FREE Badge */}
              <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-500 text-green-700 px-6 py-3 rounded-full font-bold text-lg mb-6 shadow-lg">
                <FaCheck className="text-green-600" />
                FREE Basic Checks - No Credit Card Required
              </div>

              {/* Enhanced VRM Search Form with Glow */}
              <div className="relative group max-w-2xl mb-6">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>

                <form onSubmit={handleVrmSubmit} className="relative bg-white rounded-3xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={vrmInput}
                      onChange={(e) => {
                        setVrmInput(e.target.value.toUpperCase());
                        setVrmError('');
                      }}
                      placeholder="Enter VRM... e.g. WA67YSB"
                      className="w-full px-6 py-4 text-xl font-mono bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all">
                    <FaMagnifyingGlass />
                    Check Now
                  </Button>
                </form>
                {vrmError && (
                  <p className="mt-2 text-sm text-danger-500 font-medium">{vrmError}</p>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <TrustStat
                  number="150000"
                  label="Checks Performed"
                  icon={FaChartLine}
                  suffix="+"
                />
                <TrustStat
                  number="99.9"
                  label="Accuracy Rate"
                  icon={FaShield}
                  suffix="%"
                />
                <TrustStat
                  number="2"
                  label="Avg Response"
                  icon={FaBolt}
                  suffix="s"
                />
              </div>
            </motion.div>

            {/* Hero Visual - 3D Perspective Car with Floating Info Cards - EDGE TO EDGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block perspective-1000 overflow-visible"
            >
              <motion.div
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, -2, 0, 2, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative transform-3d"
                style={{ transform: 'rotateY(-15deg) rotateX(5deg)' }}
              >
                <Image
                  src="https://www.pikpng.com/pngl/b/118-1189512_1280-x-854-0-bmw-car-png-side.png"
                  alt="Vehicle"
                  width={1280}
                  height={854}
                  className="w-[140%] h-auto drop-shadow-2xl ml-auto"
                  unoptimized
                />

                {/* Floating Info Cards */}
                <FloatingInfoCard
                  icon={FaCircleCheck}
                  text="MOT Valid"
                  className="top-20 -left-10"
                  delay={0}
                />
                <FloatingInfoCard
                  icon={FaShield}
                  text="Not Stolen"
                  className="bottom-32 -right-16"
                  delay={0.5}
                />
                <FloatingInfoCard
                  icon={FaChartLine}
                  text="5 Owners"
                  className="top-40 right-4"
                  delay={1}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Fast, and{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Powerful
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Everything you need to know about a vehicle, available in an instant. Our platform delivers comprehensive data with unparalleled accuracy and speed.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg">
              <FaCheck />
              Start FREE - Upgrade Only When You Need More
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURE_HIGHLIGHTS.map((feature, index) => {
              const IconComponent = featureIcons[feature.icon];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="text-white text-3xl" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Report in{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              We have made checking a vehicle history incredibly simple
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
              <ProcessStep
                number="1"
                icon={FaKeyboard}
                title="Enter Registration"
                description="Simply type the vehicle registration number into our secure search bar."
                gradient="from-blue-500 to-indigo-600"
              />

              <ProcessStep
                number="2"
                icon={FaDatabase}
                title="We Fetch The Data"
                description="Our system queries official UK databases in real-time for the latest information."
                gradient="from-indigo-600 to-purple-600"
              />

              <ProcessStep
                number="3"
                icon={FaFileCircleCheck}
                title="View Full Report"
                description="Receive a comprehensive report with all the details you need to make confident decisions."
                gradient="from-purple-600 to-pink-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Section - NEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Official UK Data
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Real-time access to government databases you can trust
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataSourceCard
              name="DVLA"
              description="Vehicle registration & licensing data"
              checkmark="Real-time sync"
            />
            <DataSourceCard
              name="DVSA"
              description="MOT history & test results"
              checkmark="Updated daily"
            />
            <DataSourceCard
              name="Police DB"
              description="Stolen vehicle checks"
              checkmark="Instant verification"
            />
            <DataSourceCard
              name="Market Data"
              description="Live valuation feeds"
              checkmark="Gold tier only"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted By{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Everyone
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              From private buyers to professional garages, our data empowers all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {USE_CASES.map((useCase, index) => {
              const IconComponent = useCaseIcons[useCase.icon];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {IconComponent && <IconComponent className="text-white text-2xl" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{useCase.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{useCase.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Banner Section - NEW */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={FaUsers}
              number="50000"
              label="Active Users"
              animate
              suffix="+"
            />
            <StatCard
              icon={FaMagnifyingGlass}
              number="250000"
              label="Vehicles Checked"
              animate
              suffix="+"
            />
            <StatCard
              icon={FaStar}
              number="4.9"
              label="User Rating"
              animate
            />
            <StatCard
              icon={FaBolt}
              number="1.8"
              label="Avg Response Time"
              animate
            />
          </div>
        </div>
      </section>

      {/* Live Check Feed Section - NEW */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Live{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Check Feed
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              See what others are checking right now
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <LiveCheckFeed />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users making informed decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section - NEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple,{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Start FREE, upgrade when ready
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <MiniPricingCard
              tier="basic"
              price="FREE"
              popular={false}
              features={['MOT Status', 'Tax Status', 'Basic Specs']}
              cta="Start Free"
            />
            <MiniPricingCard
              tier="silver"
              price="£2.99"
              popular={true}
              features={['Full MOT History', 'Mileage Charts', 'Environmental Data']}
              cta="Most Popular"
              highlight
            />
            <MiniPricingCard
              tier="gold"
              price="£5.99"
              popular={false}
              features={['Keeper History', 'Valuation', 'Premium Support']}
              cta="Go Premium"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                See Full Pricing Details
                <FaArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion
              items={FAQ_ITEMS.map((item, index) => ({
                id: `faq-${index}`,
                title: item.question,
                content: item.answer
              }))}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full font-bold text-sm mb-6">
              <FaCheck />
              100% FREE to Start - No Hidden Fees
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Check a Vehicle?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get instant, reliable data for any UK vehicle right now. Start FREE and upgrade only when you need premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/check/WA67YSB">
                <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  <FaMagnifyingGlass />
                  Start FREE Check
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                  View Upgrade Options
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
