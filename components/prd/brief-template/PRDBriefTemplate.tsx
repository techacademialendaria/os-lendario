// PRD Brief Template - Orchestrator
// Composes all organisms for the Brief Builder phase

import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import { PRDBriefTemplateProps } from './types';
import { useBriefForm, useBriefUI } from './hooks';
import {
  LoadingState,
  NotFoundState,
  BriefHeader,
  ContextSidebar,
  BriefContentSection,
  TaskDialog,
} from './organisms';

export const PRDBriefTemplate: React.FC<PRDBriefTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateBrief, advancePhase } = usePRDProject(slug || '');

  // Hooks
  const { form, setField, isValid, generateMarkdown, getBriefData } = useBriefForm({
    initialData: project?.project_metadata?.brief,
  });
  const { ui, setViewMode, setShowTaskDialog, setIsGenerating, setIsAdvancing } = useBriefUI();

  // Computed
  const uploadContent = project?.project_metadata?.upload?.content || '';
  const researchInsights = uploadContent.length > 20
    ? [
        'Identificar o publico-alvo especifico pode aumentar a clareza do projeto.',
        'Considere definir metricas de sucesso mensuraveis.',
        'Quais integracoes serao necessarias?',
      ]
    : [];

  // Handlers
  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'brief.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [generateMarkdown]);

  const handleSave = useCallback(async () => {
    if (!project) return;
    await updateBrief(getBriefData());
  }, [project, updateBrief, getBriefData]);

  const handleRegenerate = useCallback(async (field: string) => {
    setIsGenerating(field);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (field === 'problem') {
      setField('problem', `Baseado na analise do briefing, o problema central e:\n\n${uploadContent.slice(0, 150)}...\n\nOs usuarios enfrentam dificuldades especificas que resultam em perda de tempo e recursos.`);
    } else if (field === 'solution') {
      setField('solution', `A solucao proposta aborda o problema atraves de:\n\n1. Abordagem Principal: Desenvolvimento de uma plataforma focada em...\n2. Funcionalidades Chave: Login, Dashboard, Relatorios\n3. Beneficios: Reducao de tempo, melhoria na UX`);
    }
    setIsGenerating(null);
  }, [uploadContent, setField, setIsGenerating]);

  const handleTaskSelection = useCallback(() => {
    setShowTaskDialog(true);
  }, [setShowTaskDialog]);

  const handleProjectSelection = useCallback(async () => {
    setIsAdvancing(true);
    await handleSave();
    const success = await advancePhase();
    if (success) navigate(`/prd/${slug}/prd`);
    setIsAdvancing(false);
  }, [handleSave, advancePhase, navigate, slug, setIsAdvancing]);

  const confirmTaskExport = useCallback(async () => {
    setShowTaskDialog(false);
    setIsAdvancing(true);
    await handleSave();
    navigate(`/prd/${slug}/exportar`);
    setIsAdvancing(false);
  }, [handleSave, navigate, slug, setShowTaskDialog, setIsAdvancing]);

  // Loading/NotFound states
  if (loading) return <LoadingState setSection={setSection} />;
  if (!project) return <NotFoundState setSection={setSection} />;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <BriefHeader projectName={project.name} slug={slug || ''} />

      <main className="container mx-auto grid max-w-7xl flex-1 grid-cols-1 items-start gap-8 py-8 lg:grid-cols-12">
        <ContextSidebar uploadContent={uploadContent} insights={researchInsights} />

        <BriefContentSection
          viewMode={ui.viewMode}
          onViewModeChange={setViewMode}
          form={form}
          onFieldChange={setField}
          isGenerating={ui.isGenerating}
          onRegenerate={handleRegenerate}
          markdown={generateMarkdown()}
          onDownload={handleDownload}
          isValid={isValid}
          isAdvancing={ui.isAdvancing}
          onTaskSelect={handleTaskSelection}
          onProjectSelect={handleProjectSelection}
        />
      </main>

      <TaskDialog
        open={ui.showTaskDialog}
        onOpenChange={setShowTaskDialog}
        onConfirm={confirmTaskExport}
        isAdvancing={ui.isAdvancing}
      />
    </div>
  );
};

export default PRDBriefTemplate;
