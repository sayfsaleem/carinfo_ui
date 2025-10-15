'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCar, FaBars, FaXmark, FaStar, FaArrowUp } from 'react-icons/fa6';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { NAV_LINKS } from '../../lib/constants';
import { PRICING_TIERS } from '../../lib/demoData';
import { cn } from '../../lib/utils';
import { useCurrentTier } from '../../hooks/useCurrentTier';

/**
 * Navbar Component
 * Main navigation header with responsive mobile menu
 * Shows tier badge and upgrade button for non-gold users
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { tier, isLoading } = useCurrentTier();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
        scrolled
          ? 'py-4 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-md'
          : 'py-6'
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0069d9] to-[#007bff] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaCar className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
              MOT Check
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-base font-medium transition-colors duration-300',
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {link.label}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0069d9] to-[#007bff] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Tier Badge */}
            {!isLoading && (
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    tier === PRICING_TIERS.GOLD
                      ? 'warning'
                      : tier === PRICING_TIERS.SILVER
                      ? 'info'
                      : 'default'
                  }
                  className="text-xs font-bold uppercase"
                >
                  {tier === PRICING_TIERS.GOLD && <FaStar className="inline mr-1 text-xs" />}
                  {tier} Plan
                </Badge>

                {/* Upgrade Button (for non-gold users) */}
                {tier !== PRICING_TIERS.GOLD && (
                  <Link href="/pricing">
                    <Button
                      variant="secondary"
                      size="sm"
                      className={`
                        font-bold
                        ${tier === PRICING_TIERS.BASIC
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700'
                        }
                      `}
                    >
                      <FaArrowUp className="inline mr-1 text-xs" />
                      Upgrade
                    </Button>
                  </Link>
                )}
              </div>
            )}

            <Link href="/check/demo">
              <Button variant="primary" size="sm">
                FREE Check
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FaXmark className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl lg:hidden z-[1001]"
        >
          {/* Close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <FaXmark className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col p-6 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium py-3 px-4 rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col gap-3">
              {/* Tier Badge */}
              {!isLoading && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Current Plan:</span>
                  <Badge
                    variant={
                      tier === PRICING_TIERS.GOLD
                        ? 'warning'
                        : tier === PRICING_TIERS.SILVER
                        ? 'info'
                        : 'default'
                    }
                    className="text-xs font-bold uppercase"
                  >
                    {tier === PRICING_TIERS.GOLD && <FaStar className="inline mr-1 text-xs" />}
                    {tier}
                  </Badge>
                </div>
              )}

              {/* Upgrade Button (for non-gold users) */}
              {!isLoading && tier !== PRICING_TIERS.GOLD && (
                <Link href="/pricing">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    className={`
                      font-bold
                      ${tier === PRICING_TIERS.BASIC
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
                      }
                    `}
                  >
                    <FaArrowUp className="inline mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              )}

              <Link href="/check/demo">
                <Button variant="primary" size="md" fullWidth>
                  FREE Check
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-[1000]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
