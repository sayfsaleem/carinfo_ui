'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex, FaShield, FaCheck } from 'react-icons/fa6';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SuccessAnimation from '../ui/SuccessAnimation';
import { validatePaymentForm, formatCardNumber, formatExpiryDate } from '../../lib/validation';
import { detectCardBrand, getCardBrandName, cn, sleep } from '../../lib/utils';
import { DEMO_CARDS } from '../../lib/constants';

/**
 * PaymentModal Component
 * Demo payment modal with card form validation
 *
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Function to close modal
 * @param {string} tier - Selected tier ('silver' or 'gold')
 * @param {number} price - Plan price
 * @param {function} onSuccess - Success callback
 */
export default function PaymentModal({
  isOpen,
  onClose,
  tier,
  price,
  onSuccess
}) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardBrand, setCardBrand] = useState('unknown');

  // Handle input changes
  const handleChange = (field, value) => {
    let formattedValue = value;

    // Format card number
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value.replace(/\s/g, '').slice(0, 19));
      const brand = detectCardBrand(formattedValue);
      setCardBrand(brand);
    }

    // Format expiry date
    if (field === 'expiry') {
      formattedValue = formatExpiryDate(value);
    }

    // Limit CVV length
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Clear field error
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validatePaymentForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors
    setErrors({});

    // Demo processing
    setProcessing(true);

    try {
      // Simulate API call
      await sleep(2000);

      // Show success state
      setSuccess(true);

      // Wait for animation
      await sleep(2000);

      // Call success callback
      onSuccess(tier);

      // Close modal
      await sleep(1000);
      handleClose();
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ general: 'Payment failed. Please try again.' });
      setProcessing(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!processing) {
      setFormData({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardholderName: ''
      });
      setErrors({});
      setProcessing(false);
      setSuccess(false);
      setCardBrand('unknown');
      onClose();
    }
  };

  // Get card brand icon
  const getCardIcon = () => {
    const iconClass = 'text-3xl';
    switch (cardBrand) {
      case 'visa':
        return <FaCcVisa className={`${iconClass} text-blue-600`} />;
      case 'mastercard':
        return <FaCcMastercard className={`${iconClass} text-red-600`} />;
      case 'amex':
        return <FaCcAmex className={`${iconClass} text-blue-800`} />;
      default:
        return <FaCreditCard className={`${iconClass} text-gray-400`} />;
    }
  };

  // Plan title
  const planTitle = tier === 'silver' ? 'Silver' : 'Gold';
  const planColor = tier === 'silver' ? 'text-primary' : 'text-yellow-600';

  // Ensure price is a valid number with fallback
  const safePrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  const formattedPrice = safePrice.toFixed(2);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="xl"
      showClose={!processing}
      className="max-w-5xl"
    >
      {success ? (
        // Success State
        <SuccessAnimation
          title="Payment Successful!"
          message="Your subscription is now active. Redirecting..."
        />
      ) : (
        // Payment Form
        <div>
          {/* Modal Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Purchase
            </h2>
            <p className="text-gray-600">
              Subscribe to{' '}
              <span className={`font-bold ${planColor}`}>{planTitle} Plan</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Payment Form (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleChange('cardNumber', e.target.value)}
                      disabled={processing}
                      className={cn(
                        'pl-12',
                        errors.cardNumber && 'border-red-500'
                      )}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      {getCardIcon()}
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      disabled={processing}
                      className={errors.expiry && 'border-red-500'}
                    />
                    {errors.expiry && (
                      <p className="mt-2 text-sm text-red-600">{errors.expiry}</p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <Input
                      type="password"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleChange('cvv', e.target.value)}
                      disabled={processing}
                      maxLength={4}
                      className={errors.cvv && 'border-red-500'}
                    />
                    {errors.cvv && (
                      <p className="mt-2 text-sm text-red-600">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Smith"
                    value={formData.cardholderName}
                    onChange={(e) => handleChange('cardholderName', e.target.value)}
                    disabled={processing}
                    className={errors.cardholderName && 'border-red-500'}
                  />
                  {errors.cardholderName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.cardholderName}
                    </p>
                  )}
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <FaLock className="text-green-600 text-xl flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    <strong>Secure Payment:</strong> Your payment information is
                    encrypted and secure.
                  </p>
                </div>

                {/* Supported Cards */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-sm text-gray-600">We accept:</span>
                  <div className="flex gap-3">
                    <FaCcVisa className="text-3xl text-blue-600" />
                    <FaCcMastercard className="text-3xl text-red-600" />
                    <FaCcAmex className="text-3xl text-blue-800" />
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary (1 column) */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>

                  {/* Plan Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{planTitle} Plan</span>
                      <span className={`font-bold ${planColor}`}>
                        £{formattedPrice}/mo
                      </span>
                    </div>
                  </div>

                  {/* Features Included */}
                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Includes:
                    </p>
                    <ul className="space-y-2">
                      {tier === 'silver' ? (
                        <>
                          <FeatureItem text="Full MOT history" />
                          <FeatureItem text="Mileage chart" />
                          <FeatureItem text="Environmental data" />
                          <FeatureItem text="Priority support" />
                        </>
                      ) : (
                        <>
                          <FeatureItem text="Everything in Silver" />
                          <FeatureItem text="Keeper history" />
                          <FeatureItem text="Vehicle valuation" />
                          <FeatureItem text="PDF reports" />
                          <FeatureItem text="Priority support (24h)" />
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        £{formattedPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Billed monthly. Cancel anytime.
                    </p>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FaShield className="text-green-600" />
                    <span className="text-xs">256-bit SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Card Hint */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                Demo Mode - Test Card Numbers:
              </p>
              <div className="space-y-1">
                {DEMO_CARDS.map((card, index) => (
                  <p key={index} className="text-xs text-blue-700">
                    {card.brand}: {card.number} (Any future date, any CVV)
                  </p>
                ))}
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={handleClose}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={processing}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay £${formattedPrice}`}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}

/**
 * FeatureItem Component
 * Small feature item for summary
 */
function FeatureItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <FaCheck className="text-green-600 text-sm mt-1 flex-shrink-0" />
      <span className="text-sm text-gray-700">{text}</span>
    </li>
  );
}
