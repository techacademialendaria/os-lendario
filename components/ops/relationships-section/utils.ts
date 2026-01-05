// =============================================================================
// RELATIONSHIPS SECTION UTILITIES
// =============================================================================

/**
 * Get correlation color based on absolute value
 */
export function getCorrelationColor(r: number): string {
  const absR = Math.abs(r);
  if (absR >= 0.7) return '#4ecdc4';
  if (absR >= 0.5) return '#22d3ee';
  if (absR >= 0.3) return '#feca57';
  if (absR >= 0.1) return '#fb923c';
  return '#6b7280';
}

/**
 * Get correlation background class based on sign
 */
export function getCorrelationBg(r: number): string {
  if (r > 0) return 'bg-emerald-500/20';
  if (r < 0) return 'bg-red-500/20';
  return 'bg-gray-500/20';
}
