'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaMagnifyingGlass,
  FaDatabase,
  FaFileLines,
  FaCircleCheck,
  FaShield,
  FaBolt,
  FaLock,
  FaChartLine
} from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Accordion from '../components/ui/Accordion';
import { HOW_IT_WORKS_STEPS } from '../lib/constants';

/**
 * How It Works Page
 * Step-by-step guide to using the platform
 */
export default function HowItWorksPage() {
  // Step icons mapping
  const stepIcons = {
    FaMagnifyingGlass,
    FaDatabase,
    FaFileLines
  };

  // Data sources
  const dataSources = [
    {
      name: 'DVLA',
      logo: '🚗',
      description: 'Driver and Vehicle Licensing Agency',
      dataProvided: 'Vehicle registration, tax status, specifications'
    },
    {
      name: 'DVSA',
      logo: '🔍',
      description: 'Driver and Vehicle Standards Agency',
      dataProvided: 'MOT history, test results, advisory notes'
    }
  ];

  // Trust indicators
  const trustIndicators = [
    {
      icon: FaShield,
      title: 'Official Data',
      description: 'All data comes directly from UK government databases'
    },
    {
      icon: FaBolt,
      title: 'Real-Time',
      description: 'Live queries ensure you always get the latest information'
    },
    {
      icon: FaLock,
      title: 'Secure & Private',
      description: 'Your searches are encrypted and never shared'
    },
    {
      icon: FaChartLine,
      title: 'Always Accurate',
      description: 'No third-party data - direct from the source'
    }
  ];

  // FAQ items specific to "How It Works"
  const howItWorksFAQ = [
    {
      id: 'how-1',
      title: 'How long does a vehicle check take?',
      content: 'Most checks are completed in 1-2 seconds. We query official UK databases in real-time, so you get instant results without any waiting.'
    },
    {
      id: 'how-2',
      title: 'What information do I need to check a vehicle?',
      content: 'All you need is the vehicle registration number (number plate). Simply enter it into our search box and we\'ll handle the rest.'
    },
    {
      id: 'how-3',
      title: 'Are the results legally valid?',
      content: 'Yes. Our data comes directly from official UK government sources (DVLA and DVSA), making it legally accurate and reliable for all purposes.'
    },
    {
      id: 'how-4',
      title: 'Can I check vehicles from Northern Ireland?',
      content: 'Yes, our system covers all UK-registered vehicles including those from England, Scotland, Wales, and Northern Ireland.'
    },
    {
      id: 'how-5',
      title: 'What if the vehicle data is incorrect?',
      content: 'If you believe there\'s an error in the data, this would be an issue with the official government records. Contact the DVLA or DVSA directly to update the information, and our system will reflect those changes automatically.'
    },
    {
      id: 'how-6',
      title: 'Can I save or download the report?',
      content: 'Yes! Silver and Gold plan users can save vehicles to their dashboard for quick access. Gold users can also download PDF reports of vehicle checks.'
    }
  ];

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
              How{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                It Works
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Vehicle checking made simple. Get comprehensive vehicle intelligence
              in three easy steps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const IconComponent = stepIcons[step.icon];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-16 last:mb-0"
              >
                <div className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-12`}>
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {/* Large step number background */}
                      <div className="text-[120px] font-black text-gray-100 leading-none">
                        {step.number}
                      </div>
                      {/* Icon overlay */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-24 h-24 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-3xl flex items-center justify-center shadow-2xl">
                          <IconComponent className="text-white text-4xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    {index === 0 && (
                      <div className="inline-block">
                        <div className="bg-white border-2 border-gray-300 rounded-2xl px-6 py-4 font-mono font-bold text-2xl text-gray-900 shadow-lg">
                          WA67YSB
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Example registration number</p>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <div className="px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold">
                          DVLA Database
                        </div>
                        <div className="px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold">
                          DVSA Records
                        </div>
                        <div className="px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold">
                          Official Sources
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <Link href="/check/WA67YSB">
                        <Button variant="primary" size="lg">
                          <FaMagnifyingGlass />
                          Try Demo Report
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Data Sources */}
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
              Our{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Data Sources
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use only official UK government databases to ensure the highest
              accuracy and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {dataSources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="text-6xl mb-4">{source.logo}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-semibold">
                    {source.description}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      Data Provided:
                    </p>
                    <p className="text-sm text-gray-600">
                      {source.dataProvided}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {indicator.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {indicator.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example Report Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
              <div className="py-8">
                <FaFileLines className="text-6xl mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  See a Sample Report
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Want to see what a vehicle report looks like? Try our interactive
                  demo with a real vehicle.
                </p>
                <Link href="/check/WA67YSB">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 border-0"
                  >
                    <FaMagnifyingGlass />
                    View Demo Report
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about checking vehicles
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion items={howItWorksFAQ} />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start checking vehicles now with our free Basic plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg">
                  <FaMagnifyingGlass />
                  Check a Vehicle
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
