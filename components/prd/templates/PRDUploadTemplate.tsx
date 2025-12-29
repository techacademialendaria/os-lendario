import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import { PRD_PRIMARY } from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';

import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { cn } from '../../../lib/utils';

// =============================================================================
// CONSTANTS
// =============================================================================

const MIN_CHARS = 50; // Reduced for chat-style input

const UPLOAD_PLACEHOLDER = 'Descreva sua ideia, cole um briefing ou grave um áudio...';

const SUGGESTION_CHIPS = [
  { label: 'CRM', value: 'Quero criar um CRM para gerenciar clientes e vendas' },
  { label: 'Landing Page', value: 'Preciso de uma landing page de alta conversão' },
  { label: 'SaaS B2B', value: 'Quero desenvolver um SaaS B2B para empresas' },
  { label: 'App Mobile', value: 'Preciso de um aplicativo mobile para iOS e Android' },
  { label: 'E-commerce', value: 'Quero criar uma loja online completa' },
  { label: 'Dashboard', value: 'Preciso de um dashboard de analytics e métricas' },
];

type InputState = 'empty' | 'typing' | 'recording' | 'loading';

// =============================================================================
// TYPES
// =============================================================================

interface PRDUploadTemplateProps {
  setSection: (section: Section) => void;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const LoadingState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="refresh" className="mx-auto size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    </div>
  </div>
);

const NotFoundState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="folder-open" size="size-16" className="mx-auto text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Projeto não encontrado</h2>
        <p className="text-muted-foreground">O projeto que você está procurando não existe.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar
        </Button>
      </div>
    </div>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDUploadTemplate: React.FC<PRDUploadTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateUpload, advancePhase } = usePRDProject(slug || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state
  const [content, setContent] = useState('');
  const [inputState, setInputState] = useState<InputState>('empty');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Initialize content from project
  useEffect(() => {
    if (project?.project_metadata?.upload?.content) {
      setContent(project.project_metadata.upload.content);
      setInputState(project.project_metadata.upload.content.length > 0 ? 'typing' : 'empty');
    }
  }, [project]);

  // Update input state based on content
  useEffect(() => {
    if (inputState !== 'recording' && inputState !== 'loading') {
      setInputState(content.length > 0 ? 'typing' : 'empty');
    }
  }, [content, inputState]);

  // NOTE: Auto-redirect removed to allow free navigation between phases

  // Computed
  const isValid = content.trim().length >= MIN_CHARS || attachedFiles.length > 0;
  const canSubmit = isValid && inputState !== 'loading';

  // Handlers
  const handleSubmit = useCallback(async () => {
    if (!canSubmit || !project) return;

    setInputState('loading');
    await updateUpload({ content });
    const success = await advancePhase();

    if (success) {
      navigate(`/prd/${slug}/brief`);
    } else {
      setInputState('typing');
    }
  }, [canSubmit, project, content, updateUpload, advancePhase, navigate, slug]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && canSubmit) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [canSubmit, handleSubmit]
  );

  const handleChipClick = useCallback((value: string) => {
    setContent(value);
    setInputState('typing');
  }, []);

  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleRecordClick = useCallback(() => {
    if (inputState === 'recording') {
      // Stop recording - TODO: implement actual recording
      setInputState('typing');
    } else {
      // Start recording - TODO: implement actual recording
      setInputState('recording');
    }
  }, [inputState]);

  const removeFile = useCallback((index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
  }

  // NOTE: Status check removed to allow free navigation between phases

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />

      {/* Hero Container with subtle gradient */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, ${PRD_PRIMARY}15 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
          {/* Project name */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
            <p className="mt-2 text-muted-foreground">Fase 1 de 6 • Upload</p>
          </div>

          {/* Chat Input Container */}
          <div
            className={cn(
              'relative rounded-2xl border bg-card shadow-lg transition-all duration-200',
              inputState === 'recording' && 'border-red-500 ring-2 ring-red-500/20',
              inputState === 'loading' && 'opacity-70'
            )}
          >
            {/* Recording indicator */}
            {inputState === 'recording' && (
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <span className="size-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-sm text-red-500">Gravando...</span>
              </div>
            )}

            {/* Attached files */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 border-b border-border px-4 py-2">
                {attachedFiles.map((file, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                    <Icon name="clip" className="size-3" />
                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      <Icon name="cross" className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Textarea */}
            <AutosizeTextarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={UPLOAD_PLACEHOLDER}
              disabled={inputState === 'loading'}
              maxHeight={300}
              className={cn(
                'w-full border-0 bg-transparent px-4 py-4 text-base focus:ring-0 focus-visible:ring-0',
                'placeholder:text-muted-foreground/60'
              )}
            />

            {/* Action buttons */}
            <div className="flex items-center justify-between border-t border-border px-3 py-2">
              <div className="flex items-center gap-1">
                {/* Attach button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAttachClick}
                  disabled={inputState === 'loading'}
                  className="size-8 p-0"
                >
                  <Icon name="clip" className="size-4 text-muted-foreground" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Record button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRecordClick}
                  disabled={inputState === 'loading'}
                  className={cn(
                    'size-8 p-0',
                    inputState === 'recording' && 'bg-red-100 text-red-500 hover:bg-red-200'
                  )}
                >
                  <Icon
                    name={inputState === 'recording' ? 'pause' : 'microphone'}
                    className={cn(
                      'size-4',
                      inputState === 'recording' ? 'text-red-500' : 'text-muted-foreground'
                    )}
                  />
                </Button>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="sm"
                className={cn(
                  'size-8 rounded-full p-0 transition-all',
                  canSubmit
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {inputState === 'loading' ? (
                  <Icon name="refresh" className="size-4 animate-spin" />
                ) : (
                  <Icon name="paper-plane" className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SUGGESTION_CHIPS.map((chip) => (
              <Badge
                key={chip.label}
                variant="outline"
                className={cn(
                  'cursor-pointer px-3 py-1.5 text-sm transition-all hover:bg-accent',
                  inputState === 'loading' && 'pointer-events-none opacity-50'
                )}
                onClick={() => handleChipClick(chip.value)}
              >
                {chip.label}
              </Badge>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/prd')}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Voltar aos projetos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PRDUploadTemplate;
