import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../../../lib/supabase';
import type { ArtifactFormValues, UseArtifactSaveReturn } from '../types';

export function useArtifactSave(): UseArtifactSaveReturn {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const save = useCallback(async (
    mindId: string,
    mindSlug: string,
    values: ArtifactFormValues
  ): Promise<boolean> => {
    const { title, content, contentType, category, isPublished } = values;

    if (!title.trim()) {
      setError('Titulo e obrigatorio');
      return false;
    }
    if (!content.trim()) {
      setError('Conteudo e obrigatorio');
      return false;
    }
    if (!isSupabaseConfigured()) {
      setError('Supabase nao esta configurado');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Check if project exists
      const { data: existingProject } = await supabase
        .from('content_projects')
        .select('id')
        .eq('persona_mind_id', mindId)
        .eq('project_type', 'mind_artifacts')
        .single();

      let projectId = (existingProject as { id: string } | null)?.id;

      // Create project if doesn't exist
      if (!projectId) {
        const { data: newProject, error: projectError } = await (supabase
          .from('content_projects') as ReturnType<typeof supabase.from>)
          .insert({
            persona_mind_id: mindId,
            project_type: 'mind_artifacts',
            slug: `mind-artifacts-${mindSlug}`,
            name: `${mindSlug} Artifacts`,
            status: 'active',
          } as Record<string, unknown>)
          .select('id')
          .single();

        if (projectError) throw projectError;
        projectId = (newProject as { id: string })?.id;
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Create the content
      const { error: contentError } = await (supabase.from('contents') as ReturnType<typeof supabase.from>)
        .insert({
          project_id: projectId,
          content_type: contentType,
          slug,
          title: title.trim(),
          content: content.trim(),
          status: isPublished ? 'published' : 'draft',
          metadata: {
            category,
            created_via: 'ui',
            created_at: new Date().toISOString(),
          },
        } as Record<string, unknown>);

      if (contentError) throw contentError;

      // Navigate back to mind profile
      navigate(`/minds/${mindSlug}?tab=artifacts`);
      return true;
    } catch (err) {
      console.error('Error saving artifact:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar artefato');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [navigate]);

  return {
    isSaving,
    error,
    save,
    clearError,
  };
}
