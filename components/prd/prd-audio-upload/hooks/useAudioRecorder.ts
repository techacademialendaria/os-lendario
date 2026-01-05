import { useState, useRef, useEffect, useCallback } from 'react';
import { MAX_DURATION_SECONDS } from '../types';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  recordingDuration: number;
  localAudioUrl: string | null;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  getRecordedBlob: () => Blob | null;
  clearError: () => void;
  setLocalAudioUrl: (url: string | null) => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [localAudioUrl, setLocalAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const blobRef = useRef<Blob | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const startRecording = useCallback(async () => {
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

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: mimeType });
        blobRef.current = blob;
        stream.getTracks().forEach((track) => track.stop());

        const localUrl = URL.createObjectURL(blob);
        setLocalAudioUrl(localUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= MAX_DURATION_SECONDS - 1) {
            // Will stop via stopRecording
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setError('Nao foi possivel acessar o microfone. Verifique as permissoes.');
      console.error('Recording error:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  const getRecordedBlob = useCallback(() => blobRef.current, []);

  // Auto-stop when max duration reached
  useEffect(() => {
    if (recordingDuration >= MAX_DURATION_SECONDS && isRecording) {
      stopRecording();
    }
  }, [recordingDuration, isRecording, stopRecording]);

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

  return {
    isRecording,
    recordingDuration,
    localAudioUrl,
    error,
    startRecording,
    stopRecording,
    getRecordedBlob,
    clearError,
    setLocalAudioUrl,
  };
}
