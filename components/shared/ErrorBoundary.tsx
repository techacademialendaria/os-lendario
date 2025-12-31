import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

// ============================================================================
// Types
// ============================================================================

export interface ErrorFallbackProps {
  error: Error;
  errorInfo?: ErrorInfo;
  resetError: () => void;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorFallbackProps) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ============================================================================
// ErrorFallback Component
// ============================================================================

export function ErrorFallback({
  error,
  errorInfo,
  resetError,
  className,
}: ErrorFallbackProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center',
        className
      )}
      role="alert"
    >
      {/* Error Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <Icon
          name="warning-triangle"
          size="size-8"
          className="text-destructive"
        />
      </div>

      {/* Error Message */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Something went wrong
      </h3>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. Please try again or refresh the page.
      </p>

      {/* Dev-only: Error Details */}
      {isDev && error && (
        <details className="mb-6 w-full max-w-lg rounded-md border border-border bg-muted/30 p-4 text-left">
          <summary className="cursor-pointer text-sm font-medium text-foreground">
            Error Details (Development Only)
          </summary>
          <div className="mt-3 space-y-2">
            <p className="font-mono text-xs text-destructive">
              {error.name}: {error.message}
            </p>
            {error.stack && (
              <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded bg-muted p-2 font-mono text-xs text-muted-foreground">
                {error.stack}
              </pre>
            )}
            {errorInfo?.componentStack && (
              <div className="mt-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Component Stack:
                </p>
                <pre className="max-h-32 overflow-auto whitespace-pre-wrap rounded bg-muted p-2 font-mono text-xs text-muted-foreground">
                  {errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <Icon name="refresh" size="size-4" className="mr-2" />
          Refresh Page
        </Button>
        <Button onClick={resetError}>
          <Icon name="redo" size="size-4" className="mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}

ErrorFallback.displayName = 'ErrorFallback';

// ============================================================================
// ErrorBoundary Class Component
// ============================================================================

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);

    // Update state with error info
    this.setState({ errorInfo });

    // Call optional onError callback
    this.props.onError?.(error, errorInfo);
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    this.props.onReset?.();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, className } = this.props;

    if (hasError && error) {
      // Custom fallback render function
      if (typeof fallback === 'function') {
        return fallback({
          error,
          errorInfo: errorInfo ?? undefined,
          resetError: this.resetError,
          className,
        });
      }

      // Custom fallback ReactNode
      if (fallback) {
        return fallback;
      }

      // Default ErrorFallback
      return (
        <ErrorFallback
          error={error}
          errorInfo={errorInfo ?? undefined}
          resetError={this.resetError}
          className={className}
        />
      );
    }

    return children;
  }
}

// ============================================================================
// HOC: withErrorBoundary
// ============================================================================

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode | ((props: ErrorFallbackProps) => ReactNode),
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children' | 'fallback'>
): React.FC<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithErrorBoundary: React.FC<P> = (props) => {
    return (
      <ErrorBoundary fallback={fallback} {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}

// ============================================================================
// Compact ErrorFallback Variant
// ============================================================================

export function ErrorFallbackCompact({
  error,
  resetError,
  className,
}: Omit<ErrorFallbackProps, 'errorInfo'>) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3',
        className
      )}
      role="alert"
    >
      <Icon
        name="warning-triangle"
        size="size-5"
        className="flex-shrink-0 text-destructive"
      />
      <div className="flex-1 text-sm">
        <span className="font-medium text-foreground">Error: </span>
        <span className="text-muted-foreground">
          {error.message || 'Something went wrong'}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={resetError}
        className="flex-shrink-0"
      >
        Retry
      </Button>
    </div>
  );
}

ErrorFallbackCompact.displayName = 'ErrorFallbackCompact';
