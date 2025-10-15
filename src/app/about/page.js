'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBolt,
  FaShield,
  FaHandshake,
  FaChartLine,
  FaMagnifyingGlass,
  FaUsers,
  FaCircleCheck,
  FaTrophy
} from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * About Page
 * Company mission, values, and trust indicators
 */
export default function AboutPage() {
  // Why choose us benefits
  const benefits = [
    {
      icon: FaBolt,
      title: 'Instant Results',
      description: 'Get comprehensive vehicle data in under 2 seconds. No waiting, no delays - just instant, accurate information when you need it.'
    },
    {
      icon: FaShield,
      title: 'Official Data',
      description: 'All information comes directly from UK government databases (DVLA & DVSA). Legally accurate and always up-to-date.'
    },
    {
      icon: FaHandshake,
      title: 'Always Free Option',
      description: 'Our Basic plan is completely free forever. Check MOT status, tax, and specifications without spending a penny.'
    },
    {
      icon: FaChartLine,
      title: 'Secure & Private',
      description: 'Your searches are encrypted and private. We never share your data or track your activity beyond service improvement.'
    }
  ];

  // Trust statistics
  const stats = [
    { value: '100,000+', label: 'Checks Performed', icon: FaMagnifyingGlass },
    { value: '10,000+', label: 'Happy Users', icon: FaUsers },
    { value: '99.9%', label: 'Uptime', icon: FaCircleCheck },
    { value: '4.8/5', label: 'User Rating', icon: FaTrophy }
  ];

  // Core values
  const values = [
    {
      title: 'Transparency',
      description: 'We believe in complete honesty about our data sources, pricing, and capabilities. No hidden fees, no surprises.'
    },
    {
      title: 'Accessibility',
      description: 'Vehicle data should be accessible to everyone. That\'s why we offer a free tier and competitive pricing for premium features.'
    },
    {
      title: 'Accuracy',
      description: 'We source data directly from official databases and never manipulate or alter the information we present.'
    },
    {
      title: 'Innovation',
      description: 'We\'re constantly improving our platform with new features, better visualizations, and smarter insights.'
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
              About{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                MOT Vehicle Check
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Making vehicle data accessible, accurate, and actionable for everyone
              in the United Kingdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
              <div className="text-center py-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl mx-auto">
                  We believe everyone should have access to accurate, comprehensive vehicle
                  data without complexity or excessive cost. Whether you&apos;re buying your
                  first car, selling a vehicle, or just curious about a registration number,
                  we make vehicle intelligence simple, fast, and affordable.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                MOT Vehicle Check
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to providing the best vehicle checking experience in the UK
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center shadow-lg">
                          <IconComponent className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-xl mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the growing community of users making informed vehicle decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
              <div className="py-12">
                <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Meet Our Team
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  We&apos;re a passionate team of developers, designers, and automotive
                  enthusiasts dedicated to making vehicle data accessible to everyone.
                </p>
                <p className="text-sm text-gray-500">
                  Team profiles coming soon
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
              <div className="text-center py-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of satisfied users and start checking vehicles today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-100 border-0"
                    >
                      <FaMagnifyingGlass />
                      Check a Vehicle
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-white border-white hover:bg-white/10"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
