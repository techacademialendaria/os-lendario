/**
 * Form Section Types
 *
 * Types for the Forms Design System showcase.
 */

// Select/Combobox option type
export interface SelectOption {
  label: string;
  value: string;
}

// Form field validation state
export interface FormFieldState {
  value: string;
  error: string;
  touched: boolean;
}
