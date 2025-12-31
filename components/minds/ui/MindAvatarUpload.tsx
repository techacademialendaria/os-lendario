import React, { useState, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { useMindAvatarUpload } from '../../../hooks/useMindAvatarUpload';
import { cn } from '../../../lib/utils';

interface MindAvatarUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mindId: string;
  mindSlug: string;
  mindName: string;
  currentAvatar: string;
  onSuccess?: () => void;
}

const getDiceBearUrl = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

export function MindAvatarUpload({
  open,
  onOpenChange,
  mindId,
  mindSlug,
  mindName,
  currentAvatar,
  onSuccess,
}: MindAvatarUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentImgError, setCurrentImgError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { upload, isUploading, error, clearError } = useMindAvatarUpload({
    mindId,
    mindSlug,
    onSuccess: (newUrl) => {
      handleClose();
      onSuccess?.();
    },
  });

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    clearError();
    onOpenChange(false);
  }, [clearError, onOpenChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      clearError();
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    },
    [clearError]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [previewUrl]);

  const handleSave = useCallback(async () => {
    if (selectedFile) {
      await upload(selectedFile);
    }
  }, [selectedFile, upload]);

  const currentAvatarSrc = currentImgError ? getDiceBearUrl(mindSlug) : currentAvatar;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Editar Foto de Perfil</DialogTitle>
          <DialogDescription>Atualize a foto de perfil de {mindName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Preview Section */}
          <div className="flex items-center justify-center gap-6">
            {/* Current Avatar */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-sans text-xs text-muted-foreground">Atual</span>
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted">
                <img
                  src={currentAvatarSrc}
                  alt={mindName}
                  className="h-full w-full object-cover"
                  onError={() => setCurrentImgError(true)}
                />
              </div>
            </div>

            {/* Arrow */}
            {previewUrl && (
              <>
                <Icon name="arrow-right" size="size-5" className="text-muted-foreground" />

                {/* New Avatar Preview */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-sans text-xs text-muted-foreground">Nova</span>
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary bg-muted">
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Upload Area */}
          <div
            className={cn(
              'relative flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:bg-muted/30',
              selectedFile ? 'border-solid border-border bg-card' : ''
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !selectedFile && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
            />

            {selectedFile ? (
              <div className="flex w-full items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="image" size="size-6" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate font-sans text-sm font-semibold">{selectedFile.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="trash" size="size-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Icon name="upload" className="text-muted-foreground" size="size-6" />
                </div>
                <p className="mb-1 font-sans text-sm font-semibold">
                  <span className="text-primary hover:underline">Clique para upload</span> ou
                  arraste e solte
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  JPG, PNG ou WebP (max. 2MB)
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <Icon name="exclamation-triangle" size="size-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose} disabled={isUploading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!selectedFile || isUploading}>
            {isUploading ? (
              <>
                <Icon name="refresh" size="size-4" className="mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Foto'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
