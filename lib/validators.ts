/**
 * INPUT VALIDATORS LIBRARY
 *
 * Centralized validation functions for forms and input fields.
 * Provides consistent error messages and reusable validators.
 *
 * @example
 * import { validators } from '@/lib/validators';
 *
 * const schema = {
 *   email: [validators.required(), validators.email()],
 *   password: [
 *     validators.required(),
 *     validators.minLength(8),
 *     validators.passwordStrength(),
 *   ],
 * };
 */

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Generic validator type - returns error message or null
 */
export type Validator<T = string> = (value: T) => string | null;

/**
 * Validation schema type - maps field names to arrays of validators
 */
export type ValidationSchema = Record<string, Validator[]>;

/**
 * Validates a form object against a schema
 * Returns object with field names as keys and error messages as values
 */
export function validateForm(
  formData: Record<string, any>,
  schema: ValidationSchema,
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(schema).forEach(([field, fieldValidators]) => {
    const value = formData[field];
    const fieldErrors = fieldValidators
      .map((validator) => validator(value))
      .filter((error): error is string => error !== null);

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors[0]; // Show first error
    }
  });

  return errors;
}

/**
 * Required field validator
 * @param message - Custom error message
 */
export function required(message?: string): Validator {
  return (value: string) => {
    const isEmpty = !value || (typeof value === 'string' && !value.trim());
    return isEmpty ? message || 'This field is required' : null;
  };
}

/**
 * Email validator
 * Uses basic RFC 5322 pattern
 * @param message - Custom error message
 */
export function email(message?: string): Validator {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string) => {
    if (!value) return null; // Let required() handle empty
    return emailRegex.test(value) ? null : message || 'Invalid email address';
  };
}

/**
 * Minimum length validator
 * @param length - Minimum allowed length
 * @param message - Custom error message
 */
export function minLength(length: number, message?: string): Validator {
  return (value: string) => {
    const isValid = !value || value.length >= length;
    return isValid ? null : message || `Minimum ${length} characters`;
  };
}

/**
 * Maximum length validator
 * @param length - Maximum allowed length
 * @param message - Custom error message
 */
export function maxLength(length: number, message?: string): Validator {
  return (value: string) => {
    const isValid = !value || value.length <= length;
    return isValid ? null : message || `Maximum ${length} characters`;
  };
}

/**
 * Password strength validator
 * Requires at least 3 of: uppercase, lowercase, number, special character
 * @param message - Custom error message
 */
export function passwordStrength(message?: string): Validator {
  return (value: string) => {
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};:'",.<>?/\\|`~]/.test(value);

    const strength = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(
      Boolean,
    ).length;

    return strength >= 3
      ? null
      : message ||
          'Password must contain uppercase, lowercase, number, and special character';
  };
}

/**
 * URL validator
 * @param message - Custom error message
 */
export function url(message?: string): Validator {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
  return (value: string) => {
    if (!value) return null;
    return urlRegex.test(value) ? null : message || 'Invalid URL';
  };
}

/**
 * Phone number validator with country support
 * @param country - Country code (BR, US, etc.)
 * @param message - Custom error message
 */
export function phone(country = 'BR', message?: string): Validator {
  const patterns: Record<string, RegExp> = {
    BR: /^(\+55\s?)?(\(?\d{2}\)?)\s?\d{4,5}-?\d{4}$/,
    US: /^(\+1\s?)?(\(?\d{3}\)?)\s?\d{3}-?\d{4}$/,
  };

  const pattern = patterns[country];
  if (!pattern) {
    throw new Error(`Phone pattern for ${country} not found`);
  }

  return (value: string) => {
    if (!value) return null;
    return pattern.test(value)
      ? null
      : message || `Invalid ${country} phone number`;
  };
}

/**
 * Custom regex validator
 * @param regex - Regular expression to test against
 * @param message - Error message to show on failure
 */
export function custom(regex: RegExp, message: string): Validator {
  return (value: string) => {
    if (!value) return null;
    return regex.test(value) ? null : message;
  };
}

/**
 * Username validator
 * Allows 3-20 characters: alphanumeric and underscore
 * @param message - Custom error message
 */
export function username(message?: string): Validator {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return (value: string) => {
    if (!value) return null;
    return usernameRegex.test(value)
      ? null
      : message || 'Username must be 3-20 characters (alphanumeric and underscore)';
  };
}

/**
 * Zipcode validator with country support
 * @param country - Country code (US, BR, etc.)
 * @param message - Custom error message
 */
export function zipcode(country = 'US', message?: string): Validator {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    BR: /^\d{5}-\d{3}$/,
  };

  const pattern = patterns[country];
  if (!pattern) {
    throw new Error(`Zipcode pattern for ${country} not found`);
  }

  return (value: string) => {
    if (!value) return null;
    return pattern.test(value)
      ? null
      : message || `Invalid ${country} zipcode`;
  };
}

/**
 * Credit card validator using Luhn algorithm
 * @param message - Custom error message
 */
export function creditCard(message?: string): Validator {
  return (value: string) => {
    if (!value) return null;

    // Remove spaces and dashes
    const cleaned = value.replace(/[\s-]/g, '');

    // Check if it's all digits and 13-19 characters
    if (!/^\d{13,19}$/.test(cleaned)) {
      return message || 'Invalid card number format';
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    const isValid = sum % 10 === 0;
    return isValid ? null : message || 'Invalid card number';
  };
}

/**
 * Field match validator (e.g., password confirmation)
 * @param getFieldValue - Function to get the value of the field to match against
 * @param fieldName - Name of the field being compared to
 * @param message - Custom error message
 */
export function match(
  getFieldValue: (field: string) => any,
  fieldName: string,
  message?: string,
): Validator {
  return (value: string) => {
    const otherValue = getFieldValue(fieldName);
    return value === otherValue
      ? null
      : message || `Must match ${fieldName}`;
  };
}

/**
 * Validator collection for convenience
 */
export const validators = {
  required,
  email,
  minLength,
  maxLength,
  passwordStrength,
  url,
  phone,
  custom,
  username,
  zipcode,
  creditCard,
  match,
};
