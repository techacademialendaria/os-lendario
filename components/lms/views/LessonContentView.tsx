import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Skeleton } from '../../ui/skeleton';
import { MediaCover, MarkdownRenderer } from '../../shared';
import { VideoPlayer, isSupportedVideoUrl, type VideoProgress } from '../video-player';

/**
 * Parse duration string (e.g., "10:05" or "5 min") to seconds
 */
function parseDurationToSeconds(duration: string): number {
  if (!duration) return 600; // 10 min default

  // Handle "MM:SS" format
  if (duration.includes(':')) {
    const parts = duration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10) || 0;
      const seconds = parseInt(parts[1], 10) || 0;
      return minutes * 60 + seconds;
    }
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10) || 0;
      const minutes = parseInt(parts[1], 10) || 0;
      const seconds = parseInt(parts[2], 10) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
  }

  // Handle "X min" format
  const minMatch = duration.match(/(\d+)\s*min/i);
  if (minMatch) {
    return parseInt(minMatch[1], 10) * 60;
  }

  // Handle "X hour" format
  const hourMatch = duration.match(/(\d+)\s*h/i);
  if (hourMatch) {
    return parseInt(hourMatch[1], 10) * 3600;
  }

  return 600; // 10 min default
}

/**
 * Format seconds as MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface LessonContentViewProps {
  loading: boolean;
  videoUrl?: string | null;
  title: string;
  duration?: string;
  content: string;
  resumeTime: number;
  showResumeBanner: boolean;
  onDismissResume: () => void;
  onResumeFromStart: () => void;
  onVideoProgress: (progress: VideoProgress) => void;
  onVideoEnded: () => void;
}

const LessonContentView: React.FC<LessonContentViewProps> = ({
  loading,
  videoUrl,
  title,
  duration,
  content,
  resumeTime,
  showResumeBanner,
  onDismissResume,
  onResumeFromStart,
  onVideoProgress,
  onVideoEnded,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-8 h-32 w-full" />
      </div>
    );
  }

  const hasVideo = !!videoUrl;

  // Video content (only if has videoUrl)
  if (hasVideo && videoUrl) {
    const isEmbeddable = isSupportedVideoUrl(videoUrl);

    return (
      <div className="w-full">
        {/* Video Container */}
        {isEmbeddable ? (
          <>
            {/* Resume Banner */}
            {showResumeBanner && (
              <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Icon name="play-circle" className="text-xl text-primary" />
                  <span className="text-sm">
                    Continuar de <strong>{formatTime(resumeTime)}</strong>?
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={onResumeFromStart}>
                    Começar do início
                  </Button>
                  <Button size="sm" onClick={onDismissResume}>
                    Continuar
                  </Button>
                </div>
              </div>
            )}
            <VideoPlayer
              url={videoUrl}
              title={title}
              className="shadow-2xl"
              estimatedDuration={duration ? parseDurationToSeconds(duration) : 600}
              initialTime={showResumeBanner ? 0 : resumeTime}
              onProgress={onVideoProgress}
              onEnded={onVideoEnded}
            />
          </>
        ) : (
          // Fallback for unsupported video URLs - show placeholder
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border/20 bg-black shadow-2xl">
            {/* Placeholder Cover */}
            <MediaCover image={null} title={title} showTitle={false} className="opacity-50" />

            {/* Play Overlay with link to external player */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-primary/90 pl-1 shadow-[0_0_50px_rgba(201,178,152,0.3)] transition-transform hover:scale-110"
              >
                <Icon name="play" className="text-3xl text-primary-foreground" />
              </a>
              <span className="text-sm text-white/70">Clique para abrir o vídeo</span>
            </div>
          </div>
        )}

        {/* Show text content below video if available */}
        {content && (
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-card p-8 shadow-sm md:p-12">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
              Transcrição / Notas da Aula
            </span>
            <MarkdownRenderer content={content} variant="lesson" skipFirstHeading />
          </div>
        )}
      </div>
    );
  }

  // Text content (default - when no video)
  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-card p-8 shadow-sm md:p-12">
      <MarkdownRenderer content={content} variant="lesson" />
    </div>
  );
};

export default LessonContentView;
