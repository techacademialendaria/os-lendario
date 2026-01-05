// PRD Document Template - Orchestrator
// Composes all organisms for the PRD Document phase

import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRDDocumentData } from '@/types/prd';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import { PRDDocumentTemplateProps } from './types';
import { useDocumentForm, useDocumentUI } from './hooks';
import {
  LoadingState,
  NotFoundState,
  DocumentHeader,
  DocumentTabs,
  LivePreviewSidebar,
} from './organisms';

export const PRDDocumentTemplate: React.FC<PRDDocumentTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  // Hooks
  const {
    design,
    setDesignField,
    requirements,
    handleRequirementAction,
    pendingCount,
    allCriticalReviewed,
    techStack,
    setTechStackField,
    scopeLimits,
    setScopeLimits,
    generatePreview,
    getDocumentData,
  } = useDocumentForm({
    projectName: project?.name,
    briefData: project?.project_metadata?.brief,
    prdDocumentData: project?.project_metadata?.prdDocument,
  });

  const { activeTab, setActiveTab, isAdvancing, setIsAdvancing } = useDocumentUI();

  // Handlers
  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([generatePreview], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'prd.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [generatePreview]);

  const handleFinish = useCallback(async () => {
    if (pendingCount > 0) return;

    setIsAdvancing(true);

    await updateProject({
      prdDocument: {
        ...project?.project_metadata?.prdDocument,
        ...getDocumentData(),
      } as PRDDocumentData,
    });

    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/epicos`);
    }
    setIsAdvancing(false);
  }, [
    pendingCount,
    setIsAdvancing,
    updateProject,
    project,
    getDocumentData,
    advancePhase,
    navigate,
    slug,
  ]);

  // Loading/NotFound states
  if (loading) return <LoadingState setSection={setSection} />;
  if (!project) return <NotFoundState setSection={setSection} />;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <DocumentHeader slug={slug || ''} />

      <main className="container mx-auto grid max-w-7xl flex-1 grid-cols-1 items-start gap-8 py-8 lg:grid-cols-12">
        <DocumentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          design={design}
          onDesignChange={setDesignField}
          requirements={requirements}
          pendingCount={pendingCount}
          allCriticalReviewed={allCriticalReviewed}
          onRequirementAction={handleRequirementAction}
          techStack={techStack}
          onTechStackChange={setTechStackField}
          scopeLimits={scopeLimits}
          onScopeLimitsChange={setScopeLimits}
          isAdvancing={isAdvancing}
          onFinish={handleFinish}
        />

        <LivePreviewSidebar preview={generatePreview} onDownload={handleDownload} />
      </main>
    </div>
  );
};

export default PRDDocumentTemplate;
