import { useState, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../../../../lib/supabase';
import { MAX_FILE_SIZE_MB, MAX_DURATION_SECONDS, formatDuration, AudioData } from '../types';

interface UseAudioUploadProps {
  projectId: string;
  onAudioChange: (data: AudioData | null) => void;
}

interface UseAudioUploadReturn {
  isUploading: boolean;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploadBlob: (blob: Blob, mimeType: string, duration: number, localUrl?: string) => Promise<void>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (error: string | null) => void;
}

export function useAudioUpload({ projectId, onAudioChange }: UseAudioUploadProps): UseAudioUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadBlob = useCallback(
    async (blob: Blob, mimeType: string, duration: number, localUrl?: string) => {
      if (!isSupabaseConfigured()) {
        // Mock mode - just use local URL
        if (localUrl) {
          onAudioChange({ url: localUrl, duration });
        }
        return;
      }

      setIsUploading(true);
      try {
        const extension = mimeType.includes('webm') ? 'webm' : 'm4a';
        const filename = `${projectId}/${Date.now()}.${extension}`;

        const { data, error: uploadError } = await supabase.storage
          .from('prd-audio')
          .upload(filename, blob, { contentType: mimeType });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('prd-audio').getPublicUrl(data.path);

        onAudioChange({ url: urlData.publicUrl, duration });
      } catch (err) {
        setError('Erro ao fazer upload do audio. Usando preview local.');
        console.error('Upload error:', err);
        // Fallback to local URL
        if (localUrl) {
          onAudioChange({ url: localUrl, duration });
        }
      } finally {
        setIsUploading(false);
      }
    },
    [projectId, onAudioChange]
  );

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setError(null);

      // Validate size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Arquivo muito grande. Maximo: ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      // Get duration
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = async () => {
        const duration = Math.round(audio.duration);
        if (duration > MAX_DURATION_SECONDS) {
          setError(`Audio muito longo. Maximo: ${formatDuration(MAX_DURATION_SECONDS)}`);
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
        setError('Nao foi possivel ler o arquivo de audio.');
      };
    },
    [projectId, onAudioChange]
  );

  return {
    isUploading,
    error,
    fileInputRef,
    uploadBlob,
    handleFileUpload,
    setError,
  };
}
