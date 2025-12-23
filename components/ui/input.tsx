import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input component with accessibility support
 *
 * Use errorId to connect error messages via aria-describedby:
 * @example
 * const fieldId = 'email-field';
 * const errorId = `${fieldId}-error`;
 *
 * <Input id={fieldId} errorId={errorId} />
 * <div id={errorId}>Invalid email format</div>
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional ID of the error message element.
   * Used to connect aria-describedby for accessibility.
   * Screen readers will announce the error message when this is set.
   */
  errorId?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorId, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-sm font-semibold text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-describedby={errorId}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
