/**
 * VideoPlayer Types
 * Universal video embed component type definitions
 */

// ============================================================================
// Core Types
// ============================================================================

export type VideoProvider = 'youtube' | 'vimeo' | 'loom' | 'smartplayer' | 'unknown';

export interface VideoProgress {
  currentTime: number; // seconds watched
  duration: number; // total duration
  percentage: number; // 0-100
  provider: VideoProvider;
}

export interface VideoPlayerCallbacks {
  onReady?: (duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onProgress?: (progress: VideoProgress) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
}

export interface VideoPlayerProps extends VideoPlayerCallbacks {
  url: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  /** Enable visibility-based progress tracking for providers without API */
  enableVisibilityTracking?: boolean;
  /** Estimated duration in seconds (used when provider doesn't report it) */
  estimatedDuration?: number;
  /** Initial time in seconds to seek to when player is ready (resume playback) */
  initialTime?: number;
}

// ============================================================================
// Internal Types
// ============================================================================

export interface ParsedVideo {
  provider: VideoProvider;
  embedUrl: string | null;
  videoId: string | null;
}

export interface ProviderPlayerProps {
  parsed: ParsedVideo;
  title: string;
  callbacks: VideoPlayerCallbacks;
  enableVisibilityTracking: boolean;
  estimatedDuration: number;
  initialTime: number;
}

// ============================================================================
// YouTube API Types
// ============================================================================

export interface IYouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

// Augment global Window for YouTube API
declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          events?: {
            onReady?: (event: { target: IYouTubePlayer }) => void;
            onStateChange?: (event: { data: number; target: IYouTubePlayer }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => IYouTubePlayer;
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
