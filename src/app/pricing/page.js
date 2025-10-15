'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRocket, FaCircleCheck } from 'react-icons/fa6';
import PricingCard from '../components/pricing/PricingCard';
import ComparisonTable from '../components/pricing/ComparisonTable';
import PricingFAQ from '../components/pricing/PricingFAQ';
import PaymentModal from '../components/pricing/PaymentModal';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import { PRICING_PLANS } from '../lib/constants';
import { useSetTier } from '../hooks/useCurrentTier';

/**
 * Pricing Page
 * Complete pricing page with payment flow
 */
export default function PricingPage() {
  const router = useRouter();
  const setTier = useSetTier();

  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Toast notification state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle plan selection
  const handlePlanSelect = (tier, price) => {
    if (tier === 'basic') {
      // Free plan - just set tier and show success
      setTier(tier);
      showToast('Switched to Basic plan successfully!');
      return;
    }

    // Paid plans - open payment modal
    setSelectedTier(tier);
    setSelectedPrice(price);
    setPaymentModalOpen(true);
  };

  // Handle successful payment
  const handlePaymentSuccess = (tier) => {
    // Update tier in localStorage
    setTier(tier);

    // Show success toast
    const planName = tier === 'silver' ? 'Silver' : 'Gold';
    showToast(`Successfully subscribed to ${planName} plan!`);

    // Close modal
    setPaymentModalOpen(false);

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  // Show toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Start free, upgrade when you need more. Unlock comprehensive vehicle
              intelligence with flexible pricing.
            </p>
            <p className="text-sm text-gray-500">
              No credit card required for Basic plan. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Basic Plan */}
            <PricingCard
              plan={PRICING_PLANS.basic}
              onSelect={handlePlanSelect}
            />

            {/* Silver Plan */}
            <PricingCard
              plan={PRICING_PLANS.silver}
              onSelect={handlePlanSelect}
            />

            {/* Gold Plan */}
            <PricingCard
              plan={PRICING_PLANS.gold}
              onSelect={handlePlanSelect}
            />
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See exactly what you get with each plan. All the details, side by side.
            </p>
          </motion.div>

          <ComparisonTable />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans.
            </p>
          </motion.div>

          <PricingFAQ />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaRocket className="text-6xl mx-auto mb-6 drop-shadow-lg" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try Basic for free, no credit card required. Upgrade anytime for
              advanced features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/')}
                className="bg-white text-primary hover:bg-gray-100 border-0"
              >
                <FaCircleCheck className="text-xl" />
                Start Checking Vehicles
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  const pricingSection = document.querySelector('section');
                  pricingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white border-white hover:bg-white/10"
              >
                View Plans Again
              </Button>
            </div>

            <p className="mt-8 text-sm opacity-75">
              Join thousands of satisfied customers already using MOT Vehicle Check
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        tier={selectedTier}
        price={selectedPrice}
        onSuccess={handlePaymentSuccess}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type="success"
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        duration={3000}
      />
    </div>
  );
}
