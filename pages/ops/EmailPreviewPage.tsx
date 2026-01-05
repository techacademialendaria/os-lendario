/**
 * Email Preview & Editor Page - Admin Area
 *
 * Permite visualizar, testar e editar templates de email da plataforma.
 * Templates customizados são salvos na tabela `contents`.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Icon } from '../../components/ui/icon';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select } from '../../components/ui/select';
import { useEmailTemplates } from '../../hooks/useEmailTemplates';
import { EMAIL_TEMPLATES } from '../../lib/email-templates';
import type { EmailTemplateRecord } from '../../lib/email-templates/types';
import { DEFAULT_TEMPLATE_VARIABLES } from '../../lib/email-templates/types';

// Category labels
const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  auth: { label: 'Autenticação', icon: 'lock', color: 'text-blue-400' },
  onboarding: { label: 'Onboarding', icon: 'user-add', color: 'text-green-400' },
  notification: { label: 'Notificação', icon: 'bell', color: 'text-amber-400' },
  transactional: { label: 'Transacional', icon: 'receipt', color: 'text-purple-400' },
};

type ViewMode = 'preview' | 'edit' | 'code';

const EmailPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    templates,
    loading,
    error: templatesError,
    saveTemplate,
    resetTemplate,
    getDefaultTemplate,
    isCustomized,
  } = useEmailTemplates();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [testVariables, setTestVariables] = useState<Record<string, unknown>>({});
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Editor state
  const [editedContent, setEditedContent] = useState<string>('');
  const [editedSubject, setEditedSubject] = useState<string>('');
  const [editedPreheader, setEditedPreheader] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Get selected template
  const selectedTemplate = useMemo(
    () => templates.find((t) => t.slug === selectedTemplateId),
    [templates, selectedTemplateId]
  );

  // Get default template for comparison
  const defaultTemplate = useMemo(
    () => getDefaultTemplate(selectedTemplateId),
    [selectedTemplateId, getDefaultTemplate]
  );

  // Initialize editor when template changes
  useEffect(() => {
    if (selectedTemplate) {
      setEditedContent(selectedTemplate.content);
      setEditedSubject(selectedTemplate.metadata.subject);
      setEditedPreheader(selectedTemplate.metadata.preheader);

      // Get default props for testing
      const defaultDef = EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId);
      if (defaultDef) {
        setTestVariables(defaultDef.defaultProps);
      }
    }
  }, [selectedTemplate, selectedTemplateId]);

  // Set initial template
  useEffect(() => {
    if (!selectedTemplateId && templates.length > 0) {
      setSelectedTemplateId(templates[0].slug);
    }
  }, [templates, selectedTemplateId]);

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setViewMode('preview');
    setSaveSuccess(false);
    setSaveError(null);
  };

  // Handle variable change
  const handleVariableChange = (key: string, value: unknown) => {
    setTestVariables((prev) => ({ ...prev, [key]: value }));
  };

  // Generate preview HTML with variables
  const previewHtml = useMemo(() => {
    if (!editedContent) return '';

    let html = editedContent;

    // Replace ${variable} syntax
    Object.entries(testVariables).forEach(([key, value]) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      const strValue = Array.isArray(value) ? value.join(', ') : String(value ?? '');
      html = html.replace(regex, strValue);
    });

    return html;
  }, [editedContent, testVariables]);

  // Save template
  const handleSave = async () => {
    if (!selectedTemplate) return;

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const result = await saveTemplate({
        slug: selectedTemplate.slug,
        title: selectedTemplate.title,
        content: editedContent,
        metadata: {
          ...selectedTemplate.metadata,
          subject: editedSubject,
          preheader: editedPreheader,
        },
        status: 'published',
      });

      if (result) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Erro ao salvar template');
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!selectedTemplateId || !defaultTemplate) return;

    if (!confirm('Tem certeza que deseja reverter para o template padrão? As alterações serão perdidas.')) {
      return;
    }

    const success = await resetTemplate(selectedTemplateId);
    if (success) {
      setEditedContent(defaultTemplate.content);
      setEditedSubject(defaultTemplate.metadata.subject);
      setEditedPreheader(defaultTemplate.metadata.preheader);
    }
  };

  // Copy HTML to clipboard
  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(previewHtml);
  };

  // Download HTML file
  const handleDownloadHtml = () => {
    const blob = new Blob([previewHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${selectedTemplateId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Template options for select
  const templateOptions = templates.map((t) => ({
    label: `${t.title}${isCustomized(t.slug) ? ' (customizado)' : ''}`,
    value: t.slug,
  }));

  // Group templates by category
  const templatesByCategory = useMemo(() => {
    const groups: Record<string, EmailTemplateRecord[]> = {};
    templates.forEach((t) => {
      const category = t.metadata.category || 'other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(t);
    });
    return groups;
  }, [templates]);

  // Get variables for current template
  const templateVariables = useMemo(() => {
    return DEFAULT_TEMPLATE_VARIABLES[selectedTemplateId] || [];
  }, [selectedTemplateId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <Icon name="chevron-left" className="mr-1 size-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Email Templates</h1>
              <p className="text-sm text-muted-foreground">
                Visualize, teste e edite os templates de email
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-border/50 p-1">
              <Button
                variant={viewMode === 'preview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('preview')}
                className="h-7"
              >
                <Icon name="eye" className="mr-1 size-3" />
                Preview
              </Button>
              <Button
                variant={viewMode === 'edit' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('edit')}
                className="h-7"
              >
                <Icon name="edit" className="mr-1 size-3" />
                Editar
              </Button>
              <Button
                variant={viewMode === 'code' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('code')}
                className="h-7"
              >
                <Icon name="code" className="mr-1 size-3" />
                Código
              </Button>
            </div>

            {/* Device Toggle */}
            <div className="flex rounded-lg border border-border/50 p-1">
              <Button
                variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('desktop')}
                className="h-7"
              >
                <Icon name="desktop" className="size-3" />
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('mobile')}
                className="h-7"
              >
                <Icon name="mobile" className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {templatesError && (
        <div className="mx-auto max-w-[1600px] px-6 pt-4">
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {templatesError}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1600px] p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 space-y-4 lg:col-span-4 xl:col-span-3">
            {/* Template Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="document" className="size-4 text-brand-gold" />
                  Selecionar Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedTemplateId}
                  onValueChange={handleTemplateChange}
                  options={templateOptions}
                  placeholder="Selecione um template..."
                />

                {selectedTemplate && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${CATEGORY_LABELS[selectedTemplate.metadata.category]?.color}`}>
                        {CATEGORY_LABELS[selectedTemplate.metadata.category]?.label}
                      </span>
                      {isCustomized(selectedTemplateId) && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                          Customizado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedTemplate.metadata.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subject & Preheader Editor (when in edit mode) */}
            {viewMode === 'edit' && selectedTemplate && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Icon name="envelope" className="size-4 text-brand-gold" />
                    Assunto & Preheader
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Assunto</label>
                    <Input
                      value={editedSubject}
                      onChange={(e) => setEditedSubject(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Preheader</label>
                    <Textarea
                      value={editedPreheader}
                      onChange={(e) => setEditedPreheader(e.target.value)}
                      rows={2}
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Test Variables */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="settings" className="size-4 text-brand-gold" />
                  Variáveis de Teste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templateVariables.map((variable) => {
                  const value = testVariables[variable.name] ?? variable.defaultValue ?? '';

                  return (
                    <div key={variable.name} className="space-y-1">
                      <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        {variable.name}
                        {variable.required && <span className="text-destructive">*</span>}
                      </label>
                      {variable.type === 'array' ? (
                        <Input
                          value={Array.isArray(value) ? value.join(', ') : String(value)}
                          onChange={(e) =>
                            handleVariableChange(
                              variable.name,
                              e.target.value.split(',').map((s) => s.trim())
                            )
                          }
                          placeholder="item1, item2, item3"
                          className="h-8 text-xs"
                        />
                      ) : (
                        <Input
                          value={String(value)}
                          onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                          className="h-8 text-xs"
                        />
                      )}
                      <p className="text-[10px] text-muted-foreground">{variable.description}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="grid-2x2" className="size-4 text-brand-gold" />
                  Por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
                  <div key={category}>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon
                        name={CATEGORY_LABELS[category]?.icon || 'document'}
                        className={`size-3 ${CATEGORY_LABELS[category]?.color}`}
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        {CATEGORY_LABELS[category]?.label || category}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {categoryTemplates.map((t) => (
                        <button
                          key={t.slug}
                          onClick={() => handleTemplateChange(t.slug)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors ${
                            selectedTemplateId === t.slug
                              ? 'bg-brand-gold/20 text-brand-gold'
                              : 'text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <span>{t.title}</span>
                          {isCustomized(t.slug) && (
                            <Icon name="edit" className="size-3 text-amber-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Preview/Editor Area */}
          <div className="col-span-12 space-y-4 lg:col-span-8 xl:col-span-9">
            {/* Toolbar */}
            {selectedTemplate && (
              <Card>
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Assunto:</p>
                    <p className="font-medium text-foreground">{editedSubject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCustomized(selectedTemplateId) && (
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <Icon name="refresh" className="mr-1 size-4" />
                        Resetar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                      <Icon name="clipboard" className="mr-1 size-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
                      <Icon name="download" className="mr-1 size-4" />
                      Download
                    </Button>
                    {viewMode === 'edit' && (
                      <Button size="sm" onClick={handleSave} disabled={saving}>
                        {saving ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Icon name="check" className="mr-1 size-4" />
                            Salvar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Status */}
            {saveError && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {saveError}
              </div>
            )}
            {saveSuccess && (
              <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-500">
                Template salvo com sucesso!
              </div>
            )}

            {/* Main Content */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {viewMode === 'edit' ? (
                  <div className="grid grid-cols-2 divide-x divide-border">
                    {/* Editor */}
                    <div className="h-[700px]">
                      <div className="border-b border-border bg-muted/30 px-4 py-2">
                        <span className="text-xs font-medium text-muted-foreground">Editor HTML</span>
                      </div>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="h-[calc(100%-36px)] w-full resize-none bg-[#1a1a2e] p-4 font-mono text-xs text-gray-300 focus:outline-none"
                        spellCheck={false}
                      />
                    </div>
                    {/* Live Preview */}
                    <div className="h-[700px]">
                      <div className="border-b border-border bg-muted/30 px-4 py-2">
                        <span className="text-xs font-medium text-muted-foreground">Preview</span>
                      </div>
                      <iframe
                        srcDoc={previewHtml}
                        title="Email Preview"
                        className="h-[calc(100%-36px)] w-full border-0"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </div>
                ) : viewMode === 'code' ? (
                  <div className="max-h-[700px] overflow-auto bg-[#1a1a2e] p-4">
                    <pre className="text-xs text-gray-300">
                      <code>{previewHtml}</code>
                    </pre>
                  </div>
                ) : (
                  <div
                    className={`mx-auto transition-all duration-300 ${
                      deviceMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
                    }`}
                  >
                    {previewHtml ? (
                      <iframe
                        srcDoc={previewHtml}
                        title="Email Preview"
                        className="h-[700px] w-full border-0"
                        sandbox="allow-same-origin"
                      />
                    ) : (
                      <div className="flex h-[400px] items-center justify-center">
                        <p className="text-muted-foreground">Selecione um template para visualizar</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preheader Preview */}
            {selectedTemplate && editedPreheader && (
              <Card>
                <CardContent className="py-3">
                  <p className="text-xs text-muted-foreground">Preheader (preview na inbox):</p>
                  <p className="text-sm text-foreground">{editedPreheader}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewPage;
