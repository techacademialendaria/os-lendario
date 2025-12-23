// @ts-nocheck
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Icon } from '../../ui/icon';
import { Select } from '../../ui/select';
import { TiptapEditor } from '../../ui/tiptap-editor';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { CATEGORY_LABELS } from '../../../hooks/useMindArtifacts';

interface AddArtifactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mindId: string;
  projectId: string | null;
  projectSlug: string | null;
  onSuccess: () => void;
}

type ContentType = 'mind_artifacts' | 'mind_prompts';

const CONTENT_TYPE_OPTIONS = [
  { value: 'mind_artifacts', label: 'Artefato' },
  { value: 'mind_prompts', label: 'System Prompt' },
];

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const AddArtifactModal: React.FC<AddArtifactModalProps> = ({
  open,
  onOpenChange,
  mindId,
  projectId,
  projectSlug,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('mind_artifacts');
  const [category, setCategory] = useState('other');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Titulo e obrigatorio');
      return;
    }
    if (!content.trim()) {
      setError('Conteudo e obrigatorio');
      return;
    }
    if (!isSupabaseConfigured()) {
      setError('Supabase nao esta configurado');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      let targetProjectId = projectId;

      // If no project exists, create one
      if (!targetProjectId) {
        // @ts-ignore - Supabase insert type inference issue
        const { data: newProject, error: projectError } = await supabase
          .from('content_projects')
          .insert({
            persona_mind_id: mindId,
            project_type: 'mind_artifacts',
            slug: projectSlug || `mind-artifacts-${mindId.slice(0, 8)}`,
            title: 'Mind Artifacts',
            status: 'active',
          })
          .select('id')
          .single();

        if (projectError) throw projectError;
        targetProjectId = newProject.id;
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Create the content
      // @ts-ignore - Supabase insert type inference issue
      const { error: contentError } = await supabase.from('contents').insert({
        content_project_id: targetProjectId,
        content_type: contentType,
        slug,
        title: title.trim(),
        content: content.trim(),
        status: 'published',
        metadata: {
          category,
          created_via: 'ui',
          created_at: new Date().toISOString(),
        },
      });

      if (contentError) throw contentError;

      // Reset form
      setTitle('');
      setContent('');
      setContentType('mind_artifacts');
      setCategory('other');

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error('Error saving artifact:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar artefato');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      setTitle('');
      setContent('');
      setContentType('mind_artifacts');
      setCategory('other');
      setError(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="plus-circle" className="text-primary" />
            Adicionar Artefato
          </DialogTitle>
          <DialogDescription>
            Crie um novo artefato ou system prompt para esta mente.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-y-auto py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="artifact-title">Titulo</Label>
            <Input
              id="artifact-title"
              errorId={error && title.trim() === '' ? 'artifact-title-error' : undefined}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Framework de Decisao, Analise Cognitiva..."
              className="text-lg"
            />
            {error && title.trim() === '' && (
              <div id="artifact-title-error" className="text-xs text-destructive">
                {error}
              </div>
            )}
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={contentType}
                onValueChange={(v) => setContentType(v as ContentType)}
                options={CONTENT_TYPE_OPTIONS}
                placeholder="Selecione o tipo"
              />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={category}
                onValueChange={setCategory}
                options={CATEGORY_OPTIONS}
                placeholder="Selecione a categoria"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label>Conteudo</Label>
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder={
                contentType === 'mind_prompts'
                  ? 'Escreva o system prompt...'
                  : 'Escreva o conteudo do artefato...'
              }
              minHeight="300px"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <Icon name="exclamation-circle" size="size-4" />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <>
                <Icon name="spinner" className="animate-spin" size="size-4" />
                Salvando...
              </>
            ) : (
              <>
                <Icon name="check" size="size-4" />
                Salvar Artefato
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddArtifactModal;
