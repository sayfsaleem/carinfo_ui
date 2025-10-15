'use client';

import { useState, useEffect } from 'react';
import { getVehicleDataByTier } from '../lib/demoData';

/**
 * useVehicleData Hook
 * Fetch vehicle data by VRM and tier
 * In production, this would call a real API
 * For demo, returns data from demoData.js
 *
 * @param {string} vrm - Vehicle registration number
 * @param {string} tier - User's pricing tier
 * @returns {object} { data, isLoading, error }
 */
export default function useVehicleData(vrm, tier) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vrm || !tier) {
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get data from demo data
        const vehicleData = getVehicleDataByTier(vrm, tier);

        if (!vehicleData) {
          throw new Error('Vehicle not found');
        }

        setData(vehicleData);
      } catch (err) {
        console.error('Error fetching vehicle data:', err);
        setError(err.message || 'Failed to fetch vehicle data');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vrm, tier]);

  return { data, isLoading, error };
}

/**
 * useVehicleCheck Hook
 * Simplified hook for checking a vehicle
 * Handles VRM formatting and validation
 *
 * @param {string} vrm - Vehicle registration number
 * @param {string} tier - User's pricing tier
 * @returns {object} { data, isLoading, error, checkVehicle }
 */
export function useVehicleCheck(tier) {
  const [vrm, setVrm] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkVehicle = async (inputVrm) => {
    if (!inputVrm) {
      setError('Please enter a vehicle registration number');
      return;
    }

    // Clean VRM input
    const cleanVrm = inputVrm.toUpperCase().replace(/\s/g, '');

    setVrm(cleanVrm);
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Get data from demo data
      const vehicleData = getVehicleDataByTier(cleanVrm, tier);

      if (!vehicleData) {
        throw new Error(`Vehicle ${cleanVrm} not found in DVLA database`);
      }

      setData(vehicleData);
      return vehicleData;
    } catch (err) {
      console.error('Error checking vehicle:', err);
      setError(err.message || 'Failed to check vehicle');
      setData(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setVrm(null);
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    vrm,
    data,
    isLoading,
    error,
    checkVehicle,
    reset
  };
}
