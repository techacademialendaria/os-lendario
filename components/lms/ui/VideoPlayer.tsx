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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';

// ============================================================================
// Types
// ============================================================================

export type VideoProvider = 'youtube' | 'vimeo' | 'loom' | 'smartplayer' | 'unknown';

export interface VideoProgress {
  currentTime: number;      // seconds watched
  duration: number;         // total duration
  percentage: number;       // 0-100
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
}

interface ParsedVideo {
  provider: VideoProvider;
  embedUrl: string | null;
  videoId: string | null;
}

// ============================================================================
// URL Parsing
// ============================================================================

function parseVideoUrl(url: string, autoplay = false): ParsedVideo {
  if (!url) {
    return { provider: 'unknown', embedUrl: null, videoId: null };
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Loom (priority - main platform)
    if (hostname.includes('loom.com')) {
      let videoId: string | null = null;

      if (urlObj.pathname.includes('/share/')) {
        videoId = urlObj.pathname.split('/share/')[1]?.split('?')[0] || null;
      } else if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
      }

      if (videoId) {
        return {
          provider: 'loom',
          videoId,
          embedUrl: `https://www.loom.com/embed/${videoId}`,
        };
      }
    }

    // Smartplayer (Hotmart) - priority platform
    if (
      hostname.includes('go.hotmart.com') ||
      hostname.includes('player.hotmart.com') ||
      hostname.includes('smartplayer')
    ) {
      return {
        provider: 'smartplayer',
        videoId: urlObj.pathname,
        embedUrl: url,
      };
    }

    // YouTube (for occasional live recordings)
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId: string | null = null;

      if (hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
      } else {
        videoId = urlObj.searchParams.get('v');
      }

      if (videoId) {
        const params = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          enablejsapi: '1', // Enable JS API for event tracking
          origin: typeof window !== 'undefined' ? window.location.origin : '',
          ...(autoplay && { autoplay: '1' }),
        });
        return {
          provider: 'youtube',
          videoId,
          embedUrl: `https://www.youtube.com/embed/${videoId}?${params}`,
        };
      }
    }

    // Vimeo
    if (hostname.includes('vimeo.com')) {
      let videoId: string | null = null;

      if (urlObj.pathname.includes('/video/')) {
        videoId = urlObj.pathname.split('/video/')[1]?.split('?')[0] || null;
      } else {
        videoId = urlObj.pathname.slice(1).split('/')[0] || null;
      }

      if (videoId && /^\d+$/.test(videoId)) {
        const params = new URLSearchParams({
          ...(autoplay && { autoplay: '1' }),
        });
        return {
          provider: 'vimeo',
          videoId,
          embedUrl: `https://player.vimeo.com/video/${videoId}?${params}`,
        };
      }
    }

    // Generic embed URL
    if (url.includes('/embed/') || url.includes('player.')) {
      return {
        provider: 'unknown',
        videoId: null,
        embedUrl: url,
      };
    }
  } catch {
    console.error('[VideoPlayer] Invalid URL:', url);
  }

  return { provider: 'unknown', embedUrl: null, videoId: null };
}

// ============================================================================
// YouTube IFrame API Integration
// ============================================================================

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayer;
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

interface YouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

let ytApiLoaded = false;
let ytApiLoading = false;
const ytApiCallbacks: (() => void)[] = [];

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (ytApiLoaded && window.YT) {
      resolve();
      return;
    }

    ytApiCallbacks.push(resolve);

    if (ytApiLoading) return;
    ytApiLoading = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      ytApiLoaded = true;
      ytApiCallbacks.forEach((cb) => cb());
      ytApiCallbacks.length = 0;
    };
  });
}

// ============================================================================
// Provider-Specific Players
// ============================================================================

interface ProviderPlayerProps {
  parsed: ParsedVideo;
  title: string;
  callbacks: VideoPlayerCallbacks;
  enableVisibilityTracking: boolean;
  estimatedDuration: number;
}

/**
 * YouTube Player with full IFrame API integration
 */
const YouTubePlayer: React.FC<ProviderPlayerProps> = ({
  parsed,
  title,
  callbacks,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const iframeId = useRef(`yt-player-${Date.now()}`);

  useEffect(() => {
    if (!parsed.embedUrl) return;

    let mounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();
      if (!mounted || !window.YT || !containerRef.current) return;

      // Create iframe element
      const iframe = document.createElement('iframe');
      iframe.id = iframeId.current;
      iframe.src = parsed.embedUrl!;
      iframe.className = 'absolute inset-0 h-full w-full';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.title = title;
      containerRef.current.appendChild(iframe);

      // Initialize YT.Player on existing iframe
      playerRef.current = new window.YT.Player(iframeId.current, {
        events: {
          onReady: (event) => {
            const duration = event.target.getDuration();
            callbacks.onReady?.(duration);
          },
          onStateChange: (event) => {
            const state = event.data;

            if (state === window.YT!.PlayerState.PLAYING) {
              callbacks.onPlay?.();
              // Start progress tracking
              progressIntervalRef.current = setInterval(() => {
                if (playerRef.current) {
                  const currentTime = playerRef.current.getCurrentTime();
                  const duration = playerRef.current.getDuration();
                  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
                  callbacks.onProgress?.({
                    currentTime,
                    duration,
                    percentage,
                    provider: 'youtube',
                  });
                }
              }, 1000);
            } else if (state === window.YT!.PlayerState.PAUSED) {
              callbacks.onPause?.();
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            } else if (state === window.YT!.PlayerState.ENDED) {
              callbacks.onEnded?.();
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            }
          },
          onError: (event) => {
            callbacks.onError?.(`YouTube error: ${event.data}`);
          },
        },
      });
    };

    initPlayer();

    return () => {
      mounted = false;
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
      }
    };
  }, [parsed.embedUrl, title, callbacks]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

/**
 * Generic Iframe Player with postMessage listener and visibility tracking
 * Used for Loom, Smartplayer, Vimeo, and unknown providers
 */
const GenericIframePlayer: React.FC<ProviderPlayerProps> = ({
  parsed,
  title,
  callbacks,
  enableVisibilityTracking,
  estimatedDuration,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [watchedTime, setWatchedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Listen for postMessage events from iframe
  useEffect(() => {
    if (!parsed.embedUrl) return;

    const handleMessage = (event: MessageEvent) => {
      // Validate origin based on provider
      const validOrigins = [
        'https://www.loom.com',
        'https://loom.com',
        'https://player.hotmart.com',
        'https://go.hotmart.com',
        'https://player.vimeo.com',
      ];

      if (!validOrigins.some((origin) => event.origin.includes(new URL(origin).hostname))) {
        return;
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        // player.js protocol (Vimeo and some others)
        if (data.context === 'player.js' || data.event) {
          const eventName = data.event || data.method;

          switch (eventName) {
            case 'ready':
              callbacks.onReady?.(data.value?.duration || estimatedDuration);
              break;
            case 'play':
              setIsPlaying(true);
              callbacks.onPlay?.();
              break;
            case 'pause':
              setIsPlaying(false);
              callbacks.onPause?.();
              break;
            case 'timeupdate':
              if (data.value) {
                const { seconds, duration, percent } = data.value;
                callbacks.onProgress?.({
                  currentTime: seconds || 0,
                  duration: duration || estimatedDuration,
                  percentage: (percent || 0) * 100,
                  provider: parsed.provider,
                });
              }
              break;
            case 'ended':
              setHasEnded(true);
              setIsPlaying(false);
              callbacks.onEnded?.();
              break;
          }
        }

        // Loom-specific events (if they have any)
        if (data.type === 'loom') {
          if (data.event === 'play') {
            setIsPlaying(true);
            callbacks.onPlay?.();
          } else if (data.event === 'pause') {
            setIsPlaying(false);
            callbacks.onPause?.();
          } else if (data.event === 'ended') {
            setHasEnded(true);
            callbacks.onEnded?.();
          }
        }

        // Smartplayer/Hotmart events (if they have any)
        if (data.type === 'smartplayer' || data.source === 'hotmart') {
          if (data.event === 'play' || data.action === 'play') {
            setIsPlaying(true);
            callbacks.onPlay?.();
          } else if (data.event === 'pause' || data.action === 'pause') {
            setIsPlaying(false);
            callbacks.onPause?.();
          } else if (data.event === 'ended' || data.action === 'ended') {
            setHasEnded(true);
            callbacks.onEnded?.();
          }
        }
      } catch {
        // Not a JSON message or not relevant
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [parsed.embedUrl, parsed.provider, callbacks, estimatedDuration]);

  // Visibility-based progress tracking (fallback)
  useEffect(() => {
    if (!enableVisibilityTracking || !containerRef.current || hasEnded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Video is visible - assume playing
            if (!isPlaying && !startTimeRef.current) {
              startTimeRef.current = Date.now();
              setIsPlaying(true);
              callbacks.onPlay?.();
            }

            // Start tracking time
            if (!progressIntervalRef.current) {
              progressIntervalRef.current = setInterval(() => {
                setWatchedTime((prev) => {
                  const newTime = prev + 1;
                  const percentage = estimatedDuration > 0
                    ? Math.min((newTime / estimatedDuration) * 100, 100)
                    : 0;

                  callbacks.onProgress?.({
                    currentTime: newTime,
                    duration: estimatedDuration,
                    percentage,
                    provider: parsed.provider,
                  });

                  // Auto-complete at 90%
                  if (percentage >= 90 && !hasEnded) {
                    setHasEnded(true);
                    callbacks.onEnded?.();
                  }

                  return newTime;
                });
              }, 1000);
            }
          } else {
            // Video not visible - pause tracking
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
              setIsPlaying(false);
              callbacks.onPause?.();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [enableVisibilityTracking, estimatedDuration, callbacks, parsed.provider, isPlaying, hasEnded]);

  // Notify ready on mount
  useEffect(() => {
    if (parsed.embedUrl) {
      // Small delay to let iframe load
      const timer = setTimeout(() => {
        callbacks.onReady?.(estimatedDuration);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [parsed.embedUrl, estimatedDuration, callbacks]);

  const iframeAttrs = useMemo(() => {
    const common = {
      frameBorder: '0',
      allowFullScreen: true,
    };

    switch (parsed.provider) {
      case 'loom':
        return {
          ...common,
          allow: 'autoplay; fullscreen',
        };
      case 'smartplayer':
        return {
          ...common,
          allow: 'autoplay; fullscreen; encrypted-media',
          scrolling: 'no' as const,
        };
      case 'vimeo':
        return {
          ...common,
          allow: 'autoplay; fullscreen; picture-in-picture',
        };
      default:
        return common;
    }
  }, [parsed.provider]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <iframe
        ref={iframeRef}
        src={parsed.embedUrl!}
        title={title}
        className="absolute inset-0 h-full w-full"
        {...iframeAttrs}
      />
    </div>
  );
};

// ============================================================================
// Main VideoPlayer Component
// ============================================================================

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title = 'Video',
  className,
  autoplay = false,
  enableVisibilityTracking = true,
  estimatedDuration = 600, // 10 min default
  onReady,
  onPlay,
  onPause,
  onProgress,
  onEnded,
  onError,
}) => {
  const parsed = useMemo(() => parseVideoUrl(url, autoplay), [url, autoplay]);

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

  if (!parsed.embedUrl) {
    return (
      <div
        className={cn(
          'flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground',
          className
        )}
      >
        <div className="text-center">
          <p className="text-sm font-medium">Vídeo não disponível</p>
          <p className="mt-1 text-xs opacity-70">URL inválida ou não suportada</p>
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

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a URL is a supported video URL
 */
export function isSupportedVideoUrl(url: string): boolean {
  if (!url) return false;
  const { provider, embedUrl } = parseVideoUrl(url);
  return provider !== 'unknown' || embedUrl !== null;
}

/**
 * Get video provider from URL
 */
export function getVideoProvider(url: string): VideoProvider {
  return parseVideoUrl(url).provider;
}

/**
 * Get provider display name
 */
export function getProviderDisplayName(provider: VideoProvider): string {
  const names: Record<VideoProvider, string> = {
    loom: 'Loom',
    smartplayer: 'Smartplayer',
    youtube: 'YouTube',
    vimeo: 'Vimeo',
    unknown: 'Video',
  };
  return names[provider];
}

export default VideoPlayer;
