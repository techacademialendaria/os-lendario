// ============================================================================
// Mapping Section Types
// ============================================================================

// No props needed - this is a display-only component
export interface MappingSectionProps {
  // Empty - component reads directly from data files
}

// Helper component props
export interface StarRatingProps {
  value: number;
  max?: number;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
}
