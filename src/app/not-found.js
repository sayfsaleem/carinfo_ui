'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaHouse, FaMagnifyingGlass, FaCircleQuestion } from 'react-icons/fa6';
import Button from './components/ui/Button';
import Card from './components/ui/Card';

/**
 * 404 Not Found Page
 * Custom error page with helpful navigation
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-block"
            >
              {/* Large 404 Text */}
              <div className="text-[180px] md:text-[240px] font-black leading-none">
                <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                  404
                </span>
              </div>

              {/* Car Icon Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    x: [0, 20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="https://www.pikpng.com/pngl/b/118-1189512_1280-x-854-0-bmw-car-png-side.png"
                    alt="Lost Car"
                    width={1280}
                    height={854}
                    className="w-48 md:w-64 opacity-20"
                    unoptimized
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oops! Looks like this vehicle has driven off the road. The page you&apos;re
              looking for doesn&apos;t exist or has been moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/">
              <Button variant="primary" size="lg">
                <FaHouse />
                Back to Home
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                <FaMagnifyingGlass />
                Check a Vehicle
              </Button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Looking for something specific?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/features">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">Features</h3>
                    <p className="text-sm text-gray-600">
                      Explore all platform capabilities
                    </p>
                  </div>
                </Link>
                <Link href="/pricing">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">Pricing</h3>
                    <p className="text-sm text-gray-600">
                      View our plans and pricing
                    </p>
                  </div>
                </Link>
                <Link href="/how-it-works">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">How It Works</h3>
                    <p className="text-sm text-gray-600">
                      Learn about our process
                    </p>
                  </div>
                </Link>
                <Link href="/dashboard">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">Dashboard</h3>
                    <p className="text-sm text-gray-600">
                      Access your saved vehicles
                    </p>
                  </div>
                </Link>
                <Link href="/blog">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">Blog</h3>
                    <p className="text-sm text-gray-600">
                      Read our latest articles
                    </p>
                  </div>
                </Link>
                <Link href="/contact">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-bold text-gray-900 mb-2">Contact</h3>
                    <p className="text-sm text-gray-600">
                      Get in touch with us
                    </p>
                  </div>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Help Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                <FaCircleQuestion />
                Still need help? Contact Support
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
