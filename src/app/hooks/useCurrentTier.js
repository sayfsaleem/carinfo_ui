'use client';

import { useState, useEffect } from 'react';
import { PRICING_TIERS } from '../lib/demoData';

/**
 * useCurrentTier Hook
 * Get current user's pricing tier from localStorage
 * Defaults to 'silver' tier for demo purposes
 *
 * @returns {string} Current tier ('basic', 'silver', or 'gold')
 */
export function useCurrentTier() {
  const [tier, setTier] = useState(PRICING_TIERS.SILVER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get tier from localStorage
    try {
      const stored = localStorage.getItem('userTier');

      if (stored && Object.values(PRICING_TIERS).includes(stored)) {
        setTier(stored);
      } else {
        // Default to silver for demo
        setTier(PRICING_TIERS.SILVER);
        localStorage.setItem('userTier', PRICING_TIERS.SILVER);
      }
    } catch (error) {
      console.error('Error reading tier from localStorage:', error);
      setTier(PRICING_TIERS.SILVER);
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
