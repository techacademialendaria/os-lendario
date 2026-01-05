import React, { useCallback, useEffect } from 'react';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { PRDAudioUploadProps } from './types';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { useAudioUpload } from './hooks/useAudioUpload';
import { AudioPlayer } from './organisms/AudioPlayer';
import { RecordingInterface } from './organisms/RecordingInterface';

// =============================================================================
// MAIN COMPONENT (Orchestrator: ~60 lines)
// =============================================================================

export const PRDAudioUpload: React.FC<PRDAudioUploadProps> = ({
  audioUrl,
  audioDuration,
  onAudioChange,
  projectId,
  disabled = false,
}) => {
  const recorder = useAudioRecorder();
  const uploader = useAudioUpload({ projectId, onAudioChange });

  // Combine errors
  const error = recorder.error || uploader.error;

  // Handle recorded audio - auto upload when recording stops
  useEffect(() => {
    if (recorder.localAudioUrl && !recorder.isRecording) {
      const blob = recorder.getRecordedBlob();
      if (blob) {
        if (isSupabaseConfigured()) {
          uploader.uploadBlob(
            blob,
            blob.type || 'audio/webm',
            recorder.recordingDuration,
            recorder.localAudioUrl
          );
        } else {
          // Mock mode
          onAudioChange({
            url: recorder.localAudioUrl,
            duration: recorder.recordingDuration,
          });
        }
      }
    }
  }, [recorder.localAudioUrl, recorder.isRecording]);

  const handleRemove = useCallback(() => {
    onAudioChange(null);
    recorder.setLocalAudioUrl(null);
  }, [onAudioChange, recorder]);

  // If has audio, show player
  if (audioUrl) {
    return (
      <AudioPlayer
        audioUrl={audioUrl}
        audioDuration={audioDuration}
        onRemove={handleRemove}
        disabled={disabled}
      />
    );
  }

  // Recording/Upload interface
  return (
    <>
      <RecordingInterface
        isRecording={recorder.isRecording}
        isUploading={uploader.isUploading}
        recordingDuration={recorder.recordingDuration}
        error={error}
        disabled={disabled}
        onStartRecording={recorder.startRecording}
        onStopRecording={recorder.stopRecording}
        onFileUploadClick={() => uploader.fileInputRef.current?.click()}
      />
      <input
        ref={uploader.fileInputRef}
        type="file"
        accept="audio/*"
        onChange={uploader.handleFileUpload}
        className="hidden"
      />
    </>
  );
};

export default PRDAudioUpload;
