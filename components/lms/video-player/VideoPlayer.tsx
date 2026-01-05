/**
 * VideoPlayer - Universal video embed component with event tracking
 *
 * Supports:
 * - Loom (loom.com) - postMessage events + visibility tracking
 * - Smartplayer (go.hotmart.com, player.hotmart.com) - postMessage events + visibility tracking
 * - YouTube (youtube.com, youtu.be) - Full IFrame API with progress tracking
 * - Vimeo (vimeo.com) - postMessage events (player.js protocol)
 *
 * Auto-detects provider from URL and renders appropriate embed with event callbacks.
 */

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { VideoPlayerProps, VideoPlayerCallbacks, ProviderPlayerProps } from './types';
import { useVideoParser } from './hooks';
import { YouTubePlayer, GenericIframePlayer } from './organisms';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title = 'Video',
  className,
  autoplay = false,
  enableVisibilityTracking = true,
  estimatedDuration = 600, // 10 min default
  initialTime = 0,
  onReady,
  onPlay,
  onPause,
  onProgress,
  onEnded,
  onError,
}) => {
  const parsed = useVideoParser(url, autoplay);

  const callbacks = useMemo<VideoPlayerCallbacks>(
    () => ({
      onReady,
      onPlay,
      onPause,
      onProgress,
      onEnded,
      onError,
    }),
    [onReady, onPlay, onPause, onProgress, onEnded, onError]
  );

  // Unavailable video state
  if (!parsed.embedUrl) {
    return (
      <div
        className={cn(
          'flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground',
          className
        )}
      >
        <div className="text-center">
          <p className="text-sm font-medium">Video not available</p>
          <p className="mt-1 text-xs opacity-70">Invalid or unsupported URL</p>
        </div>
      </div>
    );
  }

  const providerProps: ProviderPlayerProps = {
    parsed,
    title,
    callbacks,
    enableVisibilityTracking,
    estimatedDuration,
    initialTime,
  };

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl border border-border/20 bg-black shadow-2xl',
        className
      )}
    >
      {parsed.provider === 'youtube' ? (
        <YouTubePlayer {...providerProps} />
      ) : (
        <GenericIframePlayer {...providerProps} />
      )}
    </div>
  );
};

export default VideoPlayer;
