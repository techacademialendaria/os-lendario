import React from 'react';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { formatDuration } from '../types';

interface AudioPlayerProps {
  audioUrl: string;
  audioDuration?: number;
  onRemove: () => void;
  disabled?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  audioDuration,
  onRemove,
  disabled = false,
}) => {
  return (
    <Card className="bg-muted/30 p-4">
      <div className="flex items-center gap-4">
        <Icon name="music" size="size-5" className="shrink-0 text-muted-foreground" />
        <audio src={audioUrl} controls className="h-10 flex-1" />
        {audioDuration && (
          <span className="shrink-0 font-mono text-sm text-muted-foreground">
            {formatDuration(audioDuration)}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={disabled}
          className="shrink-0 hover:text-destructive"
        >
          <Icon name="trash" size="size-4" />
        </Button>
      </div>
    </Card>
  );
};
