/**
 * Next.js API Route - DVLA Vehicle Enquiry Proxy
 *
 * This server-side endpoint proxies requests to the DVLA API
 * to avoid CORS issues and keep the API key secure
 *
 * POST /api/vehicle
 * Body: { registrationNumber: "ABC123" }
 */

import { NextResponse } from 'next/server';

const DVLA_API_CONFIG = {
  PROD_URL: 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
  TEST_URL: 'https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
  API_KEY: process.env.DVLA_API_KEY || 'Olp3ptj6nvaedCUbsbFcS6lzMfn6U3G53s9BXhdT',
  USE_TEST: false
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { registrationNumber } = body;

    if (!registrationNumber) {
      return NextResponse.json(
        { error: 'Registration number is required' },
        { status: 400 }
      );
    }

    // Clean and format VRM
    const vrm = registrationNumber.replace(/\s/g, '').toUpperCase();

    console.log(`[DVLA API Proxy] Querying vehicle: ${vrm}`);

    const apiUrl = DVLA_API_CONFIG.USE_TEST
      ? DVLA_API_CONFIG.TEST_URL
      : DVLA_API_CONFIG.PROD_URL;

    // Call DVLA API from server-side
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': DVLA_API_CONFIG.API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        registrationNumber: vrm
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`[DVLA API Proxy] Success for ${vrm}`);
      return NextResponse.json({
        success: true,
        data: data,
        statusCode: response.status
      });
    } else {
      console.error(`[DVLA API Proxy] Error for ${vrm}:`, data);

      let errorMessage = 'Failed to fetch vehicle data';
      if (data.errors && data.errors.length > 0) {
        const error = data.errors[0];
        errorMessage = error.detail || error.title || errorMessage;
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        statusCode: response.status,
        data: data
      }, { status: response.status });
    }

  } catch (error) {
    console.error('[DVLA API Proxy] Server error:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Server error: ${error.message}`,
        statusCode: 500
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
