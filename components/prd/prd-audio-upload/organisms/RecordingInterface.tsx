import React from 'react';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import { formatDuration, MAX_DURATION_SECONDS, MAX_FILE_SIZE_MB } from '../types';

interface RecordingInterfaceProps {
  isRecording: boolean;
  isUploading: boolean;
  recordingDuration: number;
  error: string | null;
  disabled: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUploadClick: () => void;
}

export const RecordingInterface: React.FC<RecordingInterfaceProps> = ({
  isRecording,
  isUploading,
  recordingDuration,
  error,
  disabled,
  onStartRecording,
  onStopRecording,
  onFileUploadClick,
}) => {
  return (
    <Card
      className={cn(
        'border-dashed bg-muted/30 p-4 transition-all',
        isRecording && 'border-red-500/50 bg-red-500/5'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 text-red-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="font-mono text-lg">{formatDuration(recordingDuration)}</span>
            <span className="text-xs text-muted-foreground">
              / {formatDuration(MAX_DURATION_SECONDS)}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant={isRecording ? 'destructive' : 'outline'}
            onClick={isRecording ? onStopRecording : onStartRecording}
            disabled={disabled || isUploading}
          >
            <Icon name={isRecording ? 'stop' : 'microphone'} className="mr-2 size-4" />
            {isRecording ? 'Parar' : 'Gravar Audio'}
          </Button>

          <span className="text-sm text-muted-foreground">ou</span>

          <Button
            variant="outline"
            onClick={onFileUploadClick}
            disabled={disabled || isUploading || isRecording}
          >
            <Icon name="upload" className="mr-2 size-4" />
            Upload Arquivo
          </Button>
        </div>

        {/* Loading state */}
        {isUploading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="refresh" className="size-4 animate-spin" />
            <span className="text-sm">Fazendo upload...</span>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Help text */}
        {!isRecording && !isUploading && (
          <p className="text-center text-xs text-muted-foreground">
            Maximo: {formatDuration(MAX_DURATION_SECONDS)} de audio ou {MAX_FILE_SIZE_MB}MB
          </p>
        )}
      </div>
    </Card>
  );
};
