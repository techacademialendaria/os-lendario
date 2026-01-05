/**
 * GenericIframePlayer - Generic iframe player with postMessage listener and visibility tracking
 * Used for Loom, Smartplayer, Vimeo, and unknown providers
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ProviderPlayerProps } from '../types';

export const GenericIframePlayer: React.FC<ProviderPlayerProps> = ({
  parsed,
  title,
  callbacks,
  enableVisibilityTracking,
  estimatedDuration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [, setWatchedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
                  const percentage =
                    estimatedDuration > 0 ? Math.min((newTime / estimatedDuration) * 100, 100) : 0;

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
  }, [
    enableVisibilityTracking,
    estimatedDuration,
    callbacks,
    parsed.provider,
    isPlaying,
    hasEnded,
  ]);

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

export default GenericIframePlayer;
