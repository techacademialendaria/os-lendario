// =============================================================================
// PRD AUDIO UPLOAD TYPES
// =============================================================================

export interface PRDAudioUploadProps {
  /** Existing audio URL (for editing) */
  audioUrl?: string;
  /** Audio duration in seconds */
  audioDuration?: number;
  /** Callback when audio is recorded/uploaded */
  onAudioChange: (data: { url: string; duration: number } | null) => void;
  /** Project ID for storage organization */
  projectId: string;
  /** Disable interaction */
  disabled?: boolean;
}

export interface AudioData {
  url: string;
  duration: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const MAX_DURATION_SECONDS = 600; // 10 minutes
export const MAX_FILE_SIZE_MB = 50;

// =============================================================================
// HELPERS
// =============================================================================

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
