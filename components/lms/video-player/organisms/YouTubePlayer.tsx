/**
 * YouTubePlayer - YouTube player with full IFrame API integration
 */

import React, { useEffect, useRef } from 'react';
import type { ProviderPlayerProps, IYouTubePlayer } from '../types';
import { loadYouTubeAPI } from '../hooks';

export const YouTubePlayer: React.FC<ProviderPlayerProps> = ({
  parsed,
  title,
  callbacks,
  initialTime,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<IYouTubePlayer | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.title = title;
      containerRef.current.appendChild(iframe);

      // Initialize YT.Player on existing iframe
      playerRef.current = new window.YT.Player(iframeId.current, {
        events: {
          onReady: (event) => {
            const duration = event.target.getDuration();
            callbacks.onReady?.(duration);
            // Seek to initial time if provided (resume playback)
            if (initialTime && initialTime > 0) {
              event.target.seekTo(initialTime, true);
            }
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
  }, [parsed.embedUrl, title, callbacks, initialTime]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default YouTubePlayer;
