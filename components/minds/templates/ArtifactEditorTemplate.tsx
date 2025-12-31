// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select } from '../../ui/select';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Switch } from '../../ui/switch';
import { TiptapEditor } from '../../ui/tiptap-editor';
import { cn } from '../../../lib/utils';
import { useMind } from '../../../hooks/useMind';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../../hooks/useMindArtifacts';

interface ArtifactEditorProps {
  setSection: (s: Section) => void;
}

type ContentType = 'other';

const CONTENT_TYPE_OPTIONS = [{ value: 'other', label: 'Artefato' }];

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const ArtifactEditorTemplate: React.FC<ArtifactEditorProps> = ({ setSection }) => {
  const { mindSlug, artifactId } = useParams<{ mindSlug: string; artifactId?: string }>();
  const navigate = useNavigate();
  const { mind, loading: mindLoading } = useMind(mindSlug || '');

  const isEditing = !!artifactId;

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('other');
  const [category, setCategory] = useState('other');
  const [isPublished, setIsPublished] = useState(true);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'settings' | 'info'>('settings');

  // Track changes
  useEffect(() => {
    setHasChanges(title.trim().length > 0 || content.trim().length > 0);
  }, [title, content, contentType, category]);

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
    if (!mind) {
      setError('Mente nao encontrada');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Check if project exists
      const { data: existingProject } = await supabase
        .from('content_projects')
        .select('id')
        .eq('persona_mind_id', mind.id)
        .eq('project_type', 'mind_artifacts')
        .single();

      let projectId = existingProject?.id;

      // Create project if doesn't exist
      if (!projectId) {
        // @ts-ignore - Supabase insert type inference issue
        const { data: newProject, error: projectError } = await supabase
          .from('content_projects')
          .insert({
            persona_mind_id: mind.id,
            project_type: 'mind_artifacts',
            slug: `mind-artifacts-${mind.slug}`,
            name: `${mind.name} Artifacts`,
            status: 'active',
          })
          .select('id')
          .single();

        if (projectError) throw projectError;
        projectId = newProject.id;
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
      });

      if (contentError) throw contentError;

      // Navigate back to mind profile
      navigate(`/minds/${mindSlug}?tab=artifacts`);
    } catch (err) {
      console.error('Error saving artifact:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar artefato');
    } finally {
      setIsSaving(false);
    }
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
      <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/minds/${mindSlug}`)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow-left" size="size-4" /> Voltar
          </Button>
          <div className="h-5 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {isEditing ? 'Editando Artefato' : 'Novo Artefato'}
            </span>
            <span className="text-sm font-semibold text-foreground">{mind.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
            <span className="text-xs text-muted-foreground">
              {isPublished ? 'Publicado' : 'Rascunho'}
            </span>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} className="scale-90" />
          </div>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <Icon name="refresh" className="animate-spin" size="size-4" />
            ) : (
              <Icon name="check" size="size-4" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* CENTER - Editor */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-4xl space-y-6 p-8">
              {/* Title */}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-auto border-none bg-transparent px-0 text-3xl font-bold shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
                placeholder="Titulo do Artefato"
              />

              {/* Main Editor */}
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Escreva o conteudo do artefato..."
                minHeight="450px"
              />

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <Icon name="exclamation" size="size-4" />
                  {error}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT SIDEBAR - Settings */}
        <div className="flex w-80 shrink-0 flex-col border-l border-border bg-card/50">
          {/* Tab Switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setSidebarTab('settings')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                sidebarTab === 'settings'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon name="settings-sliders" size="size-3" />
              Configuracoes
            </button>
            <button
              onClick={() => setSidebarTab('info')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                sidebarTab === 'info'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon name="info" size="size-3" />
              Info
            </button>
          </div>

          {/* Sidebar Content */}
          <ScrollArea className="flex-1">
            {sidebarTab === 'settings' ? (
              <div className="space-y-6 p-4">
                {/* Type */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Tipo
                  </Label>
                  <Select
                    value={contentType}
                    onValueChange={(v) => setContentType(v as ContentType)}
                    options={CONTENT_TYPE_OPTIONS}
                    placeholder="Selecione o tipo"
                  />
                </div>

                <Separator />

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Categoria
                  </Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    options={CATEGORY_OPTIONS}
                    placeholder="Selecione a categoria"
                  />
                </div>

                <Separator />

                {/* Category Preview */}
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon
                        name={CATEGORY_ICONS[category] || 'folder'}
                        size="size-5"
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{CATEGORY_LABELS[category]}</div>
                      <div className="text-xs text-muted-foreground">Artefato</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-4">
                {/* Mind Info */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Mente
                  </Label>
                  <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <img
                      src={mind.avatar}
                      alt={mind.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{mind.name}</div>
                      <div className="text-xs text-muted-foreground">{mind.signatureSkill}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tips */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Dicas
                  </Label>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                      <span>Use Markdown para formatar o conteudo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                      <span>Artefatos sao documentos, prompts sao instrucoes para IA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                      <span>Categorize para facilitar a busca</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ArtifactEditorTemplate;
