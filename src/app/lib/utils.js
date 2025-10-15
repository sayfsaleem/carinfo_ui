// Utility functions for the MOT Vehicle Check platform

/**
 * Format a date string to a readable format
 * @param {string} dateString - Date string to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, format = 'long') {
  if (!dateString || dateString === 'Not Available') return 'N/A';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Invalid Date';

    switch (format) {
      case 'short':
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });

      case 'long':
        return date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

      case 'relative':
        return getRelativeTime(date);

      case 'month-year':
        return date.toLocaleDateString('en-GB', {
          month: 'long',
          year: 'numeric'
        });

      default:
        return date.toLocaleDateString('en-GB');
    }
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
}

/**
 * Get relative time from a date (e.g., "2 months ago", "in 3 days")
 * @param {Date} date - Date object
 * @returns {string} Relative time string
 */
export function getRelativeTime(date) {
  const now = new Date();
  const diffMs = date - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays < 30) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays > -30) return `${Math.abs(diffDays)} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths > 0 && diffMonths < 12) return `In ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
  if (diffMonths < 0 && diffMonths > -12) return `${Math.abs(diffMonths)} ${Math.abs(diffMonths) === 1 ? 'month' : 'months'} ago`;

  const diffYears = Math.floor(diffDays / 365);
  if (diffYears > 0) return `In ${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
  return `${Math.abs(diffYears)} ${Math.abs(diffYears) === 1 ? 'year' : 'years'} ago`;
}

/**
 * Calculate days until a future date
 * @param {string} dateString - Future date string
 * @returns {number} Days until date (negative if past)
 */
export function daysUntil(dateString) {
  if (!dateString) return null;

  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Format vehicle registration number (VRM) with proper spacing
 * @param {string} vrm - Vehicle registration number
 * @returns {string} Formatted VRM
 */
export function formatVRM(vrm) {
  if (!vrm) return '';

  const cleaned = vrm.toUpperCase().replace(/\s/g, '');

  // UK VRM format varies, but typically:
  // - Old style: ABC 123D (3 letters, 3 numbers, 1 letter)
  // - New style: AB12 CDE (2 letters, 2 numbers, 3 letters)
  // - Private: Various formats

  if (cleaned.length <= 4) {
    return cleaned;
  } else if (cleaned.length === 7) {
    // Try new style format
    if (/^[A-Z]{2}\d{2}[A-Z]{3}$/.test(cleaned)) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
    // Try old style format
    if (/^[A-Z]{3}\d{3}[A-Z]$/.test(cleaned)) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }
  }

  // Default: add space after 4 characters
  return cleaned.length > 4 ? `${cleaned.slice(0, 4)} ${cleaned.slice(4)}` : cleaned;
}

/**
 * Validate UK vehicle registration number format
 * @param {string} vrm - Vehicle registration number
 * @returns {boolean} True if valid format
 */
export function isValidVRM(vrm) {
  if (!vrm) return false;

  const cleaned = vrm.toUpperCase().replace(/\s/g, '');

  // UK VRM can be 2-7 characters, letters and numbers
  if (cleaned.length < 2 || cleaned.length > 7) return false;

  // Must contain at least one letter and one number (in most cases)
  const hasLetter = /[A-Z]/.test(cleaned);
  const hasNumber = /\d/.test(cleaned);

  return hasLetter && hasNumber;
}

/**
 * Format currency (GBP)
 * @param {number|string} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || amount === 'Not Available') return 'N/A';

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) return 'N/A';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

/**
 * Format mileage with commas
 * @param {number|string} mileage - Mileage value
 * @returns {string} Formatted mileage string
 */
export function formatMileage(mileage) {
  if (mileage === null || mileage === undefined || mileage === 'Not Available') return 'N/A';

  const num = typeof mileage === 'string' ? parseInt(mileage) : mileage;

  if (isNaN(num)) return 'N/A';

  return new Intl.NumberFormat('en-GB').format(num);
}

/**
 * Get status badge info (color, text) based on MOT/Tax status
 * @param {boolean} isValid - Whether status is valid
 * @param {string} type - Type of status ('mot' or 'tax')
 * @returns {object} Badge info with class and text
 */
export function getStatusBadge(isValid, type = 'mot') {
  if (type === 'mot') {
    return isValid
      ? { class: 'success', text: 'MOT Valid', icon: 'check-circle' }
      : { class: 'danger', text: 'MOT Expired', icon: 'exclamation-circle' };
  }

  if (type === 'tax') {
    return isValid
      ? { class: 'success', text: 'Taxed', icon: 'check-circle' }
      : { class: 'danger', text: 'Untaxed', icon: 'exclamation-circle' };
  }

  return { class: 'default', text: 'Unknown', icon: 'question-circle' };
}

/**
 * Calculate percentage difference
 * @param {number} value1 - First value
 * @param {number} value2 - Second value
 * @returns {number} Percentage difference
 */
export function percentageDifference(value1, value2) {
  if (!value1 || !value2) return 0;
  return ((value1 - value2) / value2) * 100;
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Debounce function for search/input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Classify utility for conditional classes
 * @param  {...any} classes - Class names or conditional objects
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes
    .flat()
    .filter((x) => typeof x === 'string' || typeof x === 'number')
    .join(' ')
    .trim();
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep function for async delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse MOT test result to simplified format
 * @param {object} motResult - MOT result object from API
 * @returns {object} Simplified MOT result
 */
export function parseMotResult(motResult) {
  return {
    date: formatDate(motResult.DateOfTest, 'short'),
    result: motResult.Result ? 'Pass' : 'Fail',
    mileage: formatMileage(motResult.OdometerModel?.OdometerReading),
    advisories: motResult.AdvisoryNotices || [],
    failures: motResult.RefusalReasons || [],
    expiryDate: formatDate(motResult.TestExpiryDate, 'short'),
    testNumber: motResult.TestNumber
  };
}

/**
 * Get vehicle age from manufacture date
 * @param {string} manufactureDate - Manufacture date string
 * @returns {string} Vehicle age (e.g., "5 years 3 months")
 */
export function getVehicleAge(manufactureDate) {
  if (!manufactureDate) return 'N/A';

  const mfgDate = new Date(manufactureDate);
  const now = new Date();

  const diffMs = now - mfgDate;
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

  if (diffYears === 0) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
  }

  if (diffMonths === 0) {
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
  }

  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
}

/**
 * Extract year from registration plate
 * @param {string} vrm - Vehicle registration number
 * @returns {number|null} Year or null
 */
export function getYearFromVRM(vrm) {
  if (!vrm) return null;

  const cleaned = vrm.toUpperCase().replace(/\s/g, '');

  // New style (AB12 CDE) - 2 numbers indicate year
  const newStyleMatch = cleaned.match(/^[A-Z]{2}(\d{2})[A-Z]{3}$/);
  if (newStyleMatch) {
    const yearCode = parseInt(newStyleMatch[1]);
    // 51-99 = 2001-2049 (51 = Sept 2001, 02 = March 2002, etc.)
    if (yearCode >= 51) {
      return 2000 + (yearCode - 50);
    } else {
      return 2000 + yearCode;
    }
  }

  return null;
}

/**
 * Check if vehicle is SORN (Statutory Off Road Notification)
 * @param {object} vehicleData - Vehicle data object
 * @returns {boolean} True if SORN
 */
export function isSORN(vehicleData) {
  return vehicleData?.Report?.ImportantChecks?.MotAndRoadTaxInformation?.IsVehicleSORN || false;
}

/**
 * Get fuel economy display string
 * @param {object} fuelEconomyData - Fuel economy data object
 * @returns {object} Formatted fuel economy data
 */
export function formatFuelEconomy(fuelEconomyData) {
  if (!fuelEconomyData || !fuelEconomyData.FuelEconomyDataExists) {
    return null;
  }

  return {
    urban: `${fuelEconomyData.ImperialUrban_Economy} mpg`,
    extraUrban: `${fuelEconomyData.ImperialExtraUrban_Economy} mpg`,
    combined: `${fuelEconomyData.ImperialCombined_Economy} mpg`,
    co2: `${fuelEconomyData.CO2_Economy} g/km`
  };
}

/**
 * Detect credit card brand from card number
 * @param {string} number - Card number
 * @returns {string} Card brand ('visa', 'mastercard', 'amex', 'discover', 'unknown')
 */
export function detectCardBrand(number) {
  const cleaned = number.replace(/\s/g, '');

  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';

  return 'unknown';
}

/**
 * Get card brand display name
 * @param {string} brand - Card brand code
 * @returns {string} Display name
 */
export function getCardBrandName(brand) {
  const names = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
    unknown: 'Card'
  };
  return names[brand] || names.unknown;
}
