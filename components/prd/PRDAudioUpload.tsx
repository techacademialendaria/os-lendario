import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_DURATION_SECONDS = 600; // 10 minutes
const MAX_FILE_SIZE_MB = 50;

// =============================================================================
// TYPES
// =============================================================================

interface PRDAudioUploadProps {
  /** Existing audio URL (for editing) */
  audioUrl?: string;
  /** Audio duration in seconds */
  audioDuration?: number;
  /** Callback when audio is recorded/uploaded */
  onAudioChange: (data: { url: string; duration: number } | null) => void;
  /** Project ID for storage organization */
  projectId: string;
  /** Disable interaction */
  disabled?: boolean;
}

// =============================================================================
// HELPERS
// =============================================================================

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// =============================================================================
// COMPONENT
// =============================================================================

export const PRDAudioUpload: React.FC<PRDAudioUploadProps> = ({
  audioUrl,
  audioDuration,
  onAudioChange,
  projectId,
  disabled = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [localAudioUrl, setLocalAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4',
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: mimeType });
        stream.getTracks().forEach((track) => track.stop());

        // Create local URL for preview
        const localUrl = URL.createObjectURL(blob);
        setLocalAudioUrl(localUrl);

        // Upload if Supabase is configured
        if (isSupabaseConfigured()) {
          await uploadBlob(blob, mimeType);
        } else {
          // Mock mode - just use local URL
          onAudioChange({
            url: localUrl,
            duration: recordingDuration,
          });
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Duration timer
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= MAX_DURATION_SECONDS - 1) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setError('Não foi possível acessar o microfone. Verifique as permissões.');
      console.error('Recording error:', err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Upload blob to Supabase
  const uploadBlob = async (blob: Blob, mimeType: string) => {
    setIsUploading(true);
    try {
      const extension = mimeType.includes('webm') ? 'webm' : 'm4a';
      const filename = `${projectId}/${Date.now()}.${extension}`;

      const { data, error: uploadError } = await supabase.storage
        .from('prd-audio')
        .upload(filename, blob, { contentType: mimeType });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('prd-audio').getPublicUrl(data.path);

      onAudioChange({
        url: urlData.publicUrl,
        duration: recordingDuration,
      });
    } catch (err) {
      setError('Erro ao fazer upload do áudio. Usando preview local.');
      console.error('Upload error:', err);
      // Fallback to local URL
      if (localAudioUrl) {
        onAudioChange({
          url: localAudioUrl,
          duration: recordingDuration,
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo: ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    // Get duration
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = async () => {
      const duration = Math.round(audio.duration);
      if (duration > MAX_DURATION_SECONDS) {
        setError(`Áudio muito longo. Máximo: ${formatDuration(MAX_DURATION_SECONDS)}`);
        return;
      }

      if (!isSupabaseConfigured()) {
        // Mock mode
        onAudioChange({
          url: URL.createObjectURL(file),
          duration,
        });
        return;
      }

      setIsUploading(true);
      try {
        const filename = `${projectId}/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
        const { data, error: uploadError } = await supabase.storage
          .from('prd-audio')
          .upload(filename, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('prd-audio').getPublicUrl(data.path);

        onAudioChange({
          url: urlData.publicUrl,
          duration,
        });
      } catch (err) {
        setError('Erro ao fazer upload do arquivo.');
        console.error('File upload error:', err);
      } finally {
        setIsUploading(false);
      }
    };

    audio.onerror = () => {
      setError('Não foi possível ler o arquivo de áudio.');
    };
  };

  // Remove audio
  const handleRemove = async () => {
    // TODO: Delete from storage if needed
    onAudioChange(null);
    setLocalAudioUrl(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (localAudioUrl) {
        URL.revokeObjectURL(localAudioUrl);
      }
    };
  }, [localAudioUrl]);

  // If has audio, show player
  if (audioUrl) {
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
            onClick={handleRemove}
            disabled={disabled}
            className="shrink-0 hover:text-destructive"
          >
            <Icon name="trash" size="size-4" />
          </Button>
        </div>
      </Card>
    );
  }

  // Recording/Upload interface
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
            onClick={isRecording ? stopRecording : startRecording}
            disabled={disabled || isUploading}
          >
            <Icon name={isRecording ? 'stop' : 'microphone'} className="mr-2 size-4" />
            {isRecording ? 'Parar' : 'Gravar Áudio'}
          </Button>

          <span className="text-sm text-muted-foreground">ou</span>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading || isRecording}
          >
            <Icon name="upload" className="mr-2 size-4" />
            Upload Arquivo
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
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
            Máximo: {formatDuration(MAX_DURATION_SECONDS)} de áudio ou {MAX_FILE_SIZE_MB}MB
          </p>
        )}
      </div>
    </Card>
  );
};

export default PRDAudioUpload;
