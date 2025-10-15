'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCircleQuestion,
  FaPaperPlane,
  FaCircleCheck
} from 'react-icons/fa6';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

/**
 * Contact Page
 * Contact form and support information
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  // Contact information
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'support@motvehiclecheck.com',
      description: 'Send us an email anytime'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+44 20 1234 5678',
      description: 'Mon-Fri: 9am-6pm GMT'
    },
    {
      icon: FaClock,
      title: 'Support Hours',
      value: 'Mon-Fri: 9am-6pm',
      description: 'Weekend: 10am-4pm'
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
              Get in{' '}
              <span className="bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Have a question or need help? We&apos;re here to assist you. Reach out and
              we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Send us a Message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            required
                          />
                          <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>

                        <Input
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                        />

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 resize-none"
                            placeholder="Tell us more about your inquiry..."
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          fullWidth
                          loading={isSubmitting}
                          disabled={isSubmitting}
                        >
                          <FaPaperPlane />
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>

                        <p className="text-sm text-gray-500 text-center">
                          We typically respond within 24 hours during business days
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCircleCheck className="text-success-500 text-4xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Thank you for contacting us. We&apos;ve received your message and
                        will get back to you as soon as possible.
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;

                  return (
                    <Card key={index} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <IconComponent className="text-white text-2xl" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 font-semibold mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </Card>
                  );
                })}

                {/* FAQ Link Card */}
                <Card className="bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white border-0">
                  <div className="text-center py-6">
                    <FaCircleQuestion className="text-4xl mx-auto mb-4 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">
                      Check our FAQ
                    </h3>
                    <p className="text-sm mb-4 opacity-90">
                      Find answers to common questions
                    </p>
                    <Link href="/">
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        className="bg-white text-primary hover:bg-gray-100 border-0"
                      >
                        View FAQ
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support Options */}
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
              Other Ways to Get Help
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer multiple support channels to assist you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card hover>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaCircleQuestion className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Help Center
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Browse our comprehensive help articles and guides
                  </p>
                  <Button variant="ghost" size="sm">
                    Visit Help Center
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card hover>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaEnvelope className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Email Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get detailed help via email within 24 hours
                  </p>
                  <Button variant="ghost" size="sm">
                    Send Email
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaPhone className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Phone Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Call us during business hours for immediate help
                  </p>
                  <Button variant="ghost" size="sm">
                    View Numbers
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Inquiries */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Business Inquiries
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Interested in API access, bulk checking, or partnership opportunities?
                We&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  <FaEnvelope />
                  Contact Sales
                </Button>
                <Link href="/pricing">
                  <Button variant="secondary" size="lg">
                    View API Pricing
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
