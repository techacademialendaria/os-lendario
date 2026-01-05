/**
 * VideoPlayer Module
 * Universal video embed component with event tracking
 */

// Main component
export { VideoPlayer, default } from './VideoPlayer';

// Types
export type {
  VideoProvider,
  VideoProgress,
  VideoPlayerCallbacks,
  VideoPlayerProps,
  ParsedVideo,
  ProviderPlayerProps,
  IYouTubePlayer,
} from './types';

// Utilities
export {
  isSupportedVideoUrl,
  getVideoProvider,
  getProviderDisplayName,
} from './hooks';

// Sub-components (for advanced use cases)
export { YouTubePlayer, GenericIframePlayer } from './organisms';
