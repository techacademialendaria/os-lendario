/**
 * useEmailTemplates - Hook para gerenciar templates de email no banco
 *
 * Templates são armazenados na tabela `contents` com content_type = 'email_template'
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Content } from '../types/database';
import type {
  EmailTemplateRecord,
  EmailTemplateInput,
  EmailTemplateMetadata,
} from '../lib/email-templates/types';
import { EMAIL_TEMPLATES } from '../lib/email-templates';

// Content type for email templates
const CONTENT_TYPE = 'email_template';

interface UseEmailTemplatesReturn {
  // Data
  templates: EmailTemplateRecord[];
  loading: boolean;
  error: string | null;

  // CRUD
  fetchTemplates: () => Promise<void>;
  getTemplate: (slug: string) => Promise<EmailTemplateRecord | null>;
  saveTemplate: (template: EmailTemplateInput) => Promise<EmailTemplateRecord | null>;
  deleteTemplate: (slug: string) => Promise<boolean>;
  resetTemplate: (slug: string) => Promise<boolean>;

  // Utilities
  renderTemplate: (slug: string, variables: Record<string, unknown>) => Promise<string | null>;
  getDefaultTemplate: (slug: string) => EmailTemplateRecord | null;
  isCustomized: (slug: string) => boolean;
}

/**
 * Converte template padrão para formato de registro
 */
function defaultToRecord(defaultTemplate: (typeof EMAIL_TEMPLATES)[0]): EmailTemplateRecord {
  const result = defaultTemplate.generator(defaultTemplate.defaultProps);

  return {
    id: `default-${defaultTemplate.id}`,
    slug: defaultTemplate.id,
    title: defaultTemplate.name,
    content: result.html,
    metadata: {
      subject: result.subject,
      preheader: result.preheader,
      category: defaultTemplate.category,
      description: defaultTemplate.description,
      variables: [],
      version: 1,
      isCustomized: false,
      isActive: true,
    },
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function useEmailTemplates(): UseEmailTemplatesReturn {
  const [templates, setTemplates] = useState<EmailTemplateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // Fetch all templates (DB + defaults)
  // --------------------------------------------------------------------------
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from database
      const { data, error: fetchError } = await supabase
        .from('contents')
        .select('*')
        .eq('content_type', CONTENT_TYPE)
        .is('deleted_at', null)
        .order('title');

      if (fetchError) throw fetchError;

      const rows = (data || []) as unknown as Content[];
      const dbTemplates = rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content ?? '',
        metadata: row.metadata as unknown as EmailTemplateMetadata,
        status: (row.status ?? 'draft') as EmailTemplateRecord['status'],
        created_at: row.created_at,
        updated_at: row.updated_at,
      })) as EmailTemplateRecord[];

      // Merge with defaults (defaults that are not customized)
      const dbSlugs = new Set(dbTemplates.map((t) => t.slug));
      const defaultTemplates = EMAIL_TEMPLATES
        .filter((dt) => !dbSlugs.has(dt.id))
        .map(defaultToRecord);

      // Mark DB templates as customized
      const mergedTemplates = [
        ...dbTemplates.map((t) => ({
          ...t,
          metadata: { ...t.metadata, isCustomized: true },
        })),
        ...defaultTemplates,
      ];

      setTemplates(mergedTemplates);
    } catch (err) {
      console.error('Error fetching email templates:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar templates');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // --------------------------------------------------------------------------
  // Get single template
  // --------------------------------------------------------------------------
  const getTemplate = useCallback(async (slug: string): Promise<EmailTemplateRecord | null> => {
    try {
      // Try database first
      const { data, error: fetchError } = await supabase
        .from('contents')
        .select('*')
        .eq('content_type', CONTENT_TYPE)
        .eq('slug', slug)
        .is('deleted_at', null)
        .single();

      const row = data as unknown as Content | null;
      if (row && !fetchError) {
        const baseMetadata = row.metadata as unknown as EmailTemplateMetadata;
        return {
          id: row.id,
          slug: row.slug,
          title: row.title,
          content: row.content ?? '',
          metadata: { ...baseMetadata, isCustomized: true },
          status: (row.status ?? 'draft') as EmailTemplateRecord['status'],
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
      }

      // Fall back to default
      const defaultTemplate = EMAIL_TEMPLATES.find((t) => t.id === slug);
      if (defaultTemplate) {
        return defaultToRecord(defaultTemplate);
      }

      return null;
    } catch (err) {
      console.error('Error getting template:', err);
      return null;
    }
  }, []);

  // --------------------------------------------------------------------------
  // Save template (create or update)
  // --------------------------------------------------------------------------
  const saveTemplate = useCallback(async (
    template: EmailTemplateInput
  ): Promise<EmailTemplateRecord | null> => {
    try {
      // Check if exists
      const { data: existingData } = await supabase
        .from('contents')
        .select('id')
        .eq('content_type', CONTENT_TYPE)
        .eq('slug', template.slug)
        .is('deleted_at', null)
        .single();

      const existing = existingData as unknown as { id: string } | null;

      const metadata = {
        ...template.metadata,
        isCustomized: true,
        version: (template.metadata.version || 0) + 1,
        lastEditedAt: new Date().toISOString(),
      };

      if (existing) {
        // Update
        const { data, error: updateError } = await supabase
          .from('contents')
          .update({
            title: template.title,
            content: template.content,
            metadata,
            status: template.status || 'published',
            updated_at: new Date().toISOString(),
          } as never)
          .eq('id', existing.id)
          .select()
          .single();

        if (updateError) throw updateError;

        await fetchTemplates();
        return data as unknown as EmailTemplateRecord;
      } else {
        // Insert
        const { data, error: insertError } = await supabase
          .from('contents')
          .insert({
            slug: template.slug,
            title: template.title,
            content: template.content,
            content_type: CONTENT_TYPE,
            metadata,
            status: template.status || 'published',
          } as never)
          .select()
          .single();

        if (insertError) throw insertError;

        await fetchTemplates();
        return data as unknown as EmailTemplateRecord;
      }
    } catch (err) {
      console.error('Error saving template:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar template');
      return null;
    }
  }, [fetchTemplates]);

  // --------------------------------------------------------------------------
  // Delete template (soft delete - reverts to default)
  // --------------------------------------------------------------------------
  const deleteTemplate = useCallback(async (slug: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('contents')
        .update({ deleted_at: new Date().toISOString() } as never)
        .eq('content_type', CONTENT_TYPE)
        .eq('slug', slug);

      if (deleteError) throw deleteError;

      await fetchTemplates();
      return true;
    } catch (err) {
      console.error('Error deleting template:', err);
      setError(err instanceof Error ? err.message : 'Erro ao deletar template');
      return false;
    }
  }, [fetchTemplates]);

  // --------------------------------------------------------------------------
  // Reset template to default
  // --------------------------------------------------------------------------
  const resetTemplate = useCallback(async (slug: string): Promise<boolean> => {
    return deleteTemplate(slug);
  }, [deleteTemplate]);

  // --------------------------------------------------------------------------
  // Render template with variables
  // --------------------------------------------------------------------------
  const renderTemplate = useCallback(async (
    slug: string,
    variables: Record<string, unknown>
  ): Promise<string | null> => {
    try {
      const template = await getTemplate(slug);
      if (!template) return null;

      let html = template.content;

      // Replace variables using ${variable} syntax
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        html = html.replace(regex, String(value ?? ''));
      });

      // Also replace {{variable}} syntax for compatibility
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        html = html.replace(regex, String(value ?? ''));
      });

      return html;
    } catch (err) {
      console.error('Error rendering template:', err);
      return null;
    }
  }, [getTemplate]);

  // --------------------------------------------------------------------------
  // Get default template
  // --------------------------------------------------------------------------
  const getDefaultTemplate = useCallback((slug: string): EmailTemplateRecord | null => {
    const defaultTemplate = EMAIL_TEMPLATES.find((t) => t.id === slug);
    if (!defaultTemplate) return null;
    return defaultToRecord(defaultTemplate);
  }, []);

  // --------------------------------------------------------------------------
  // Check if template is customized
  // --------------------------------------------------------------------------
  const isCustomized = useCallback((slug: string): boolean => {
    const template = templates.find((t) => t.slug === slug);
    return template?.metadata.isCustomized ?? false;
  }, [templates]);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    getTemplate,
    saveTemplate,
    deleteTemplate,
    resetTemplate,
    renderTemplate,
    getDefaultTemplate,
    isCustomized,
  };
}
