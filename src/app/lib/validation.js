// Payment form validation utilities

/**
 * Luhn algorithm for credit card validation
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} True if valid
 */
function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate credit card number
 * @param {string} number - Card number to validate
 * @returns {object} Validation result with valid flag and message
 */
export function validateCardNumber(number) {
  // Remove spaces
  const cleaned = number.replace(/\s/g, '');

  // Check if empty
  if (!cleaned) {
    return { valid: false, message: 'Card number is required' };
  }

  // Check length (13-19 digits)
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { valid: false, message: 'Invalid card number length' };
  }

  // Check if only digits
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, message: 'Card number must contain only digits' };
  }

  // Luhn algorithm check
  if (!luhnCheck(cleaned)) {
    return { valid: false, message: 'Invalid card number' };
  }

  return { valid: true };
}

/**
 * Validate expiry date
 * @param {string} expiry - Expiry date in MM/YY format
 * @returns {object} Validation result
 */
export function validateExpiryDate(expiry) {
  // Check if empty
  if (!expiry) {
    return { valid: false, message: 'Expiry date is required' };
  }

  // Format: MM/YY
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return { valid: false, message: 'Format must be MM/YY' };
  }

  const month = parseInt(match[1]);
  const year = parseInt(match[2]) + 2000;

  if (month < 1 || month > 12) {
    return { valid: false, message: 'Invalid month' };
  }

  const now = new Date();
  const expDate = new Date(year, month - 1);

  if (expDate < now) {
    return { valid: false, message: 'Card has expired' };
  }

  return { valid: true };
}

/**
 * Validate CVV
 * @param {string} cvv - CVV to validate
 * @returns {object} Validation result
 */
export function validateCVV(cvv) {
  // Check if empty
  if (!cvv) {
    return { valid: false, message: 'CVV is required' };
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    return { valid: false, message: 'CVV must be 3 or 4 digits' };
  }
  return { valid: true };
}

/**
 * Validate cardholder name
 * @param {string} name - Cardholder name
 * @returns {object} Validation result
 */
export function validateCardholderName(name) {
  // Check if empty
  if (!name) {
    return { valid: false, message: 'Cardholder name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 3) {
    return { valid: false, message: 'Name too short' };
  }

  if (trimmed.length > 50) {
    return { valid: false, message: 'Name too long' };
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { valid: false, message: 'Name must contain only letters and spaces' };
  }
  return { valid: true };
}

/**
 * Format card number with spaces every 4 digits
 * @param {string} value - Card number to format
 * @returns {string} Formatted card number
 */
export function formatCardNumber(value) {
  const cleaned = value.replace(/\s/g, '');
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(' ');
}

/**
 * Format expiry date as MM/YY
 * @param {string} value - Expiry date value
 * @returns {string} Formatted expiry date
 */
export function formatExpiryDate(value) {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  return cleaned;
}

/**
 * Validate all payment form fields
 * @param {object} formData - Form data object
 * @returns {object} Validation results
 */
export function validatePaymentForm(formData) {
  const errors = {};

  const cardNumberResult = validateCardNumber(formData.cardNumber || '');
  if (!cardNumberResult.valid) {
    errors.cardNumber = cardNumberResult.message;
  }

  const expiryResult = validateExpiryDate(formData.expiry || '');
  if (!expiryResult.valid) {
    errors.expiry = expiryResult.message;
  }

  const cvvResult = validateCVV(formData.cvv || '');
  if (!cvvResult.valid) {
    errors.cvv = cvvResult.message;
  }

  const nameResult = validateCardholderName(formData.cardholderName || '');
  if (!nameResult.valid) {
    errors.cardholderName = nameResult.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
