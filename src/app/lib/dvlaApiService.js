/**
 * DVLA API Service
 * Service for interacting with the DVLA Vehicle Enquiry Service (VES) API
 * Used for FREE tier users to get basic vehicle information
 *
 * This calls our Next.js API route (/api/vehicle) which proxies to DVLA
 * to avoid CORS issues and keep the API key secure on the server
 */

/**
 * Query vehicle information from DVLA API via our Next.js proxy
 * @param {string} registrationNumber - Vehicle Registration Number (VRM)
 * @returns {Promise<Object>} - Vehicle data or error
 */
export async function queryDVLAVehicle(registrationNumber) {
  // Clean and format VRM
  const vrm = registrationNumber.replace(/\s/g, '').toUpperCase();

  try {
    console.log(`[DVLA API Client] Querying vehicle via proxy: ${vrm}`);

    // Call our Next.js API route (server-side proxy)
    const response = await fetch('/api/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        registrationNumber: vrm
      }),
      cache: 'no-store' // Don't cache API responses
    });

    const responseData = await response.json();

    if (responseData.success) {
      console.log('[DVLA API Client] Success:', responseData.data);
      return {
        success: true,
        data: responseData.data,
        statusCode: responseData.statusCode || response.status
      };
    } else {
      console.error('[DVLA API Client] Error:', responseData);
      return {
        success: false,
        error: responseData.error || 'Failed to fetch vehicle data',
        statusCode: responseData.statusCode || response.status,
        data: responseData.data
      };
    }
  } catch (error) {
    console.error('[DVLA API Client] Network error:', error);
    return {
      success: false,
      error: `Network error: ${error.message}`,
      statusCode: null,
      data: null
    };
  }
}

/**
 * Check if we should use DVLA API for this tier
 * @param {string} tier - User's pricing tier
 * @returns {boolean}
 */
export function shouldUseDVLAAPI(tier) {
  // Check for both 'basic' string and PRICING_TIERS.BASIC constant
  return tier === 'basic' || tier?.tier === 'basic' || tier === 'BASIC';
}

/**
 * Test VRNs for testing (when USE_TEST is true)
 * TE57VRN - Valid test vehicle
 * ER19BAD - 400 Bad Request
 * ER19NF  - 404 Not Found
 * ER19ISE - 500 Internal Server Error
 * ER19SU  - 503 Service Unavailable
 */
export const TEST_VRNS = {
  VALID: 'TE57VRN',
  BAD_REQUEST: 'ER19BAD',
  NOT_FOUND: 'ER19NF',
  SERVER_ERROR: 'ER19ISE',
  UNAVAILABLE: 'ER19SU'
};

/**
 * Enable/disable test mode
 * @param {boolean} enabled
 */
export function setTestMode(enabled) {
  DVLA_API_CONFIG.USE_TEST = enabled;
}
