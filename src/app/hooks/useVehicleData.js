'use client';

import { useState, useEffect } from 'react';
import { getVehicleDataByTier, PRICING_TIERS } from '../lib/demoData';
import { queryDVLAVehicle, shouldUseDVLAAPI } from '../lib/dvlaApiService';
import { mapDVLADataToVehicleFormat } from '../lib/dvlaApiMapper';

/**
 * useVehicleData Hook
 * Fetch vehicle data by VRM and tier
 * - FREE tier: Calls real DVLA API
 * - SILVER/GOLD tiers: Returns demo data (would be your paid API in production)
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

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(`[useVehicleData] Current tier: ${tier}, shouldUseDVLAAPI: ${shouldUseDVLAAPI(tier)}`);

        // FREE TIER: Use real DVLA API
        if (shouldUseDVLAAPI(tier)) {
          console.log(`[useVehicleData] Fetching from DVLA API for FREE tier: ${vrm}`);

          const response = await queryDVLAVehicle(vrm);

          if (response.success) {
            // Map DVLA response to our internal format
            const mappedData = mapDVLADataToVehicleFormat(response.data);

            if (!mappedData) {
              throw new Error('Failed to parse vehicle data');
            }

            setData(mappedData);
          } else {
            // Handle DVLA API errors
            if (response.statusCode === 404) {
              throw new Error(`Vehicle ${vrm} not found in DVLA database`);
            } else if (response.statusCode === 400) {
              throw new Error('Invalid vehicle registration number');
            } else if (response.statusCode === 503) {
              throw new Error('DVLA service temporarily unavailable. Please try again later.');
            } else {
              throw new Error(response.error || 'Failed to fetch vehicle data from DVLA');
            }
          }
        }
        // PAID TIERS: Use demo data (in production, this would be your paid API)
        else {
          console.log(`[useVehicleData] Using demo data for ${tier} tier: ${vrm}`);

          // Simulate network delay for consistency
          await new Promise(resolve => setTimeout(resolve, 500));

          const vehicleData = getVehicleDataByTier(vrm, tier);

          if (!vehicleData) {
            throw new Error(`Vehicle ${vrm} not found`);
          }

          setData(vehicleData);
        }
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
      // FREE TIER: Use real DVLA API
      if (shouldUseDVLAAPI(tier)) {
        const response = await queryDVLAVehicle(cleanVrm);

        if (response.success) {
          const mappedData = mapDVLADataToVehicleFormat(response.data);

          if (!mappedData) {
            throw new Error('Failed to parse vehicle data');
          }

          setData(mappedData);
          return mappedData;
        } else {
          if (response.statusCode === 404) {
            throw new Error(`Vehicle ${cleanVrm} not found in DVLA database`);
          } else if (response.statusCode === 400) {
            throw new Error('Invalid vehicle registration number');
          } else {
            throw new Error(response.error || 'Failed to fetch vehicle data');
          }
        }
      }
      // PAID TIERS: Use demo data
      else {
        await new Promise(resolve => setTimeout(resolve, 800));

        const vehicleData = getVehicleDataByTier(cleanVrm, tier);

        if (!vehicleData) {
          throw new Error(`Vehicle ${cleanVrm} not found`);
        }

        setData(vehicleData);
        return vehicleData;
      }
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
