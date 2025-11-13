'use client';

import { useState, useEffect } from 'react';
import { PRICING_TIERS } from '../lib/demoData';

/**
 * useCurrentTier Hook
 * Get current user's pricing tier from localStorage
 * Defaults to 'basic' (FREE) tier
 *
 * @returns {string} Current tier ('basic', 'silver', or 'gold')
 */
export function useCurrentTier() {
  const [tier, setTier] = useState(PRICING_TIERS.BASIC);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get tier from localStorage
    try {
      const stored = localStorage.getItem('userTier');

      // TEMPORARY: Force reset to basic tier for testing
      // Remove this in production or after testing
      if (!stored || stored === 'silver') {
        console.log('[useCurrentTier] Resetting tier to BASIC (FREE) for testing DVLA API');
        setTier(PRICING_TIERS.BASIC);
        localStorage.setItem('userTier', PRICING_TIERS.BASIC);
      } else if (stored && Object.values(PRICING_TIERS).includes(stored)) {
        console.log(`[useCurrentTier] Loaded tier from localStorage: ${stored}`);
        setTier(stored);
      } else {
        // Default to BASIC (FREE) tier
        console.log('[useCurrentTier] No valid tier found, defaulting to BASIC');
        setTier(PRICING_TIERS.BASIC);
        localStorage.setItem('userTier', PRICING_TIERS.BASIC);
      }
    } catch (error) {
      console.error('Error reading tier from localStorage:', error);
      setTier(PRICING_TIERS.BASIC);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { tier, isLoading };
}

/**
 * useSetTier Hook
 * Set user's pricing tier in localStorage
 *
 * @returns {Function} Function to set tier
 */
export function useSetTier() {
  const setTier = (newTier) => {
    if (!Object.values(PRICING_TIERS).includes(newTier)) {
      console.error('Invalid tier:', newTier);
      return false;
    }

    try {
      localStorage.setItem('userTier', newTier);

      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));

      return true;
    } catch (error) {
      console.error('Error setting tier in localStorage:', error);
      return false;
    }
  };

  return setTier;
}
