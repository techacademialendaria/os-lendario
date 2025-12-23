import React from 'react';
import { cn } from '../../lib/utils';

/**
 * FormField component for wrapping form inputs with error messages
 * Automatically manages aria-describedby connections for accessibility
 *
 * @example
 * <FormField label="Email" error={errors.email} fieldId="email">
 *   <Input id="email" errorId="email-error" {...props} />
 * </FormField>
 */
interface FormFieldProps {
  label?: React.ReactNode;
  error?: string;
  fieldId: string;
  children: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  fieldId,
  children,
  required = false,
  description,
  className,
}) => {
  const errorId = error ? `${fieldId}-error` : undefined;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Clone children to inject errorId and aria-describedby */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            id: fieldId,
            errorId,
            'aria-describedby': [errorId, descriptionId].filter(Boolean).join(' '),
          })
        : children}

      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}

      {error && (
        <div id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
