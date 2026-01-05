// ============================================================================
// MIU Section Types
// ============================================================================

// No props needed - this is a display-only component
export interface MIUSectionProps {
  // Empty - component reads directly from data files
}

// Types inferred from miu-content data constants
export type MIUExplanation = typeof import('../data/miu-content').MIU_EXPLANATION;
export type MIUValidation = typeof import('../data/miu-content').MIU_VALIDATION;
export type LinguisticMarkers = typeof import('../data/miu-content').LINGUISTIC_MARKERS;
export type MIUVsFragment = typeof import('../data/miu-content').MIU_VS_FRAGMENT;
export type MIUStatistics = typeof import('../data/miu-content').MIU_STATISTICS;
