// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { TiptapEditor } from '../../ui/tiptap-editor';
import { useMind } from '../../../hooks/useMind';
import { useArtifactForm, useArtifactSave } from './hooks';
import { ArtifactEditorHeader, ArtifactEditorSidebar } from './organisms';
import type { ArtifactEditorProps } from './types';

/**
 * ArtifactEditorTemplate - Orchestrator Component
 *
 * STATE MANAGEMENT (extracted to hooks):
 * - useArtifactForm: title, content, contentType, category, isPublished, hasChanges (6 useState -> 1 hook)
 * - useArtifactSave: isSaving, error (2 useState -> 1 hook)
 * - sidebarTab moved to ArtifactEditorSidebar (1 useState -> moved to organism)
 *
 * TOTAL: 10 useState -> 2 custom hooks + 1 local state in organism
 */
const ArtifactEditorTemplate: React.FC<ArtifactEditorProps> = ({ setSection }) => {
  const { mindSlug, artifactId } = useParams<{ mindSlug: string; artifactId?: string }>();
  const navigate = useNavigate();
  const { mind, loading: mindLoading } = useMind(mindSlug || '');

  const isEditing = !!artifactId;

  // State management via custom hooks
  const form = useArtifactForm();
  const saver = useArtifactSave();

  const handleSave = async () => {
    if (!mind) return;
    await saver.save(mind.id, mind.slug, {
      title: form.title,
      content: form.content,
      contentType: form.contentType,
      category: form.category,
      isPublished: form.isPublished,
    });
  };

  // Loading state
  if (mindLoading) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-8">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-96 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!mind) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />
        <main className="flex flex-1 flex-col items-center justify-center">
          <Icon name="exclamation" className="mb-4 text-destructive" size="size-10" />
          <h2 className="mb-2 text-xl font-bold">Mente nao encontrada</h2>
          <Button size="sm" onClick={() => navigate('/minds')}>
            Voltar para Galeria
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />

      {/* SUB-HEADER */}
      <ArtifactEditorHeader
        mindSlug={mindSlug || ''}
        mindName={mind.name}
        isEditing={isEditing}
        isPublished={form.isPublished}
        onPublishedChange={form.setIsPublished}
        hasChanges={form.hasChanges}
        isSaving={saver.isSaving}
        onBack={() => navigate(`/minds/${mindSlug}`)}
        onSave={handleSave}
      />

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* CENTER - Editor */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-4xl space-y-6 p-8">
              {/* Title */}
              <Input
                value={form.title}
                onChange={(e) => form.setTitle(e.target.value)}
                className="h-auto border-none bg-transparent px-0 text-3xl font-bold shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
                placeholder="Titulo do Artefato"
              />

              {/* Main Editor */}
              <TiptapEditor
                content={form.content}
                onChange={form.setContent}
                placeholder="Escreva o conteudo do artefato..."
                minHeight="450px"
              />

              {/* Error */}
              {saver.error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <Icon name="exclamation" size="size-4" />
                  {saver.error}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT SIDEBAR - Settings */}
        <ArtifactEditorSidebar
          mind={mind}
          contentType={form.contentType}
          onContentTypeChange={form.setContentType}
          category={form.category}
          onCategoryChange={form.setCategory}
        />
      </div>
    </div>
  );
};

export default ArtifactEditorTemplate;
