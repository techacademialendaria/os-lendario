import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

/**
 * Web Vitals Metrics Tracker
 *
 * Tracks Core Web Vitals and other performance metrics (web-vitals v5):
 * - LCP (Largest Contentful Paint): How quickly largest content element renders (target: <2.5s)
 * - INP (Interaction to Next Paint): Responsiveness to user interactions (target: <200ms)
 * - CLS (Cumulative Layout Shift): Visual stability of the page (target: <0.1)
 * - FCP (First Contentful Paint): When first content appears (target: <1.8s)
 * - TTFB (Time to First Byte): Server response time (target: <600ms)
 *
 * Metrics are logged to console and can be sent to analytics services
 */

// Type for analytics callback function
export type VitalsCallback = (metric: Metric) => void;

// Store callbacks so they can be called for each metric
const callbacks: VitalsCallback[] = [];

/**
 * Register a callback to be called whenever a vital metric is recorded
 * @param callback Function to call with each metric
 */
export function onVital(callback: VitalsCallback): void {
  callbacks.push(callback);
}

/**
 * Track all Web Vitals metrics
 * Automatically logs metrics to console and calls registered callbacks
 */
export function trackWebVitals(): void {
  // Track Largest Contentful Paint (LCP)
  onLCP((metric: Metric) => {
    handleMetric('LCP', metric);
  });

  // Track Interaction to Next Paint (INP) - replaces FID in web-vitals v5
  onINP((metric: Metric) => {
    handleMetric('INP', metric);
  });

  // Track Cumulative Layout Shift (CLS)
  onCLS((metric: Metric) => {
    handleMetric('CLS', metric);
  });

  // Track First Contentful Paint (FCP)
  onFCP((metric: Metric) => {
    handleMetric('FCP', metric);
  });

  // Track Time to First Byte (TTFB)
  onTTFB((metric: Metric) => {
    handleMetric('TTFB', metric);
  });
}

/**
 * Internal handler for each metric
 * @param name Name of the metric (LCP, INP, CLS, FCP, TTFB)
 * @param metric The metric object from web-vitals
 */
function handleMetric(name: string, metric: Metric): void {
  // Log to console with formatting
  const value = metric.value.toFixed(2);
  const rating = metric.rating || 'unknown';

  // Use different console levels based on rating
  const logLevel = rating === 'good' ? 'info' : rating === 'needs-improvement' ? 'warn' : 'error';
  const logFn = console[logLevel as keyof typeof console] || console.log;

  (logFn as (...args: unknown[]) => void)(`[Web Vitals] ${name}: ${value}ms (${rating})`);

  // Call all registered callbacks
  callbacks.forEach((callback) => callback(metric));
}

/**
 * Send metrics to analytics service
 * Example implementation for sending to external service
 *
 * @example
 * trackWebVitals();
 * onVital((metric) => {
 *   sendVitalToAnalytics(metric);
 * });
 */
export function sendVitalToAnalytics(metric: Metric): void {
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'web_vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Example: Send to custom API endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // }).catch((error) => console.error('Failed to send vital:', error));
}
