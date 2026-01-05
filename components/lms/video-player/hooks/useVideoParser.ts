/**
 * useVideoParser - Parse video URLs and detect providers
 */

import { useMemo } from 'react';
import type { ParsedVideo, VideoProvider } from '../types';

/**
 * Parse a video URL and extract provider info
 */
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

/**
 * Hook to parse video URL with memoization
 */
export function useVideoParser(url: string, autoplay = false): ParsedVideo {
  return useMemo(() => parseVideoUrl(url, autoplay), [url, autoplay]);
}

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

export { parseVideoUrl };
