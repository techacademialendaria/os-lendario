// PRD Project Detail - Navigation Hook
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import type { PRDProject } from '@/types/prd';

interface UseProjectNavigationProps {
  slug: string | undefined;
  project: PRDProject | null;
}

interface UseProjectNavigationResult {
  handleBack: () => void;
  handleContinueProduction: () => void;
  handleNavigateToPhase: (phase: string) => void;
  handleNavigateToEpics: () => void;
  handleNavigateToStories: () => void;
  handleEditBrief: () => void;
  handleEditPRD: () => void;
  handleViewStories: () => void;
  handleExport: () => void;
  handleDownloadZip: () => void;
}

export function useProjectNavigation({
  slug,
  project,
}: UseProjectNavigationProps): UseProjectNavigationResult {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = useCallback(() => {
    navigate('/prd');
  }, [navigate]);

  const handleContinueProduction = useCallback(() => {
    if (!project || !slug) return;
    const status = project.status || 'upload';
    const routes: Record<string, string> = {
      upload: `/prd/${slug}/upload`,
      brief: `/prd/${slug}/brief`,
      prd: `/prd/${slug}/prd`,
      epics: `/prd/${slug}/epicos`,
      stories: `/prd/${slug}/stories`,
      exported: `/prd/${slug}/exportar`,
      completed: `/prd/${slug}/exportar`,
    };
    navigate(routes[status] || `/prd/${slug}/upload`);
  }, [project, slug, navigate]);

  const handleNavigateToPhase = useCallback(
    (phase: string) => {
      if (!slug) return;
      const routes: Record<string, string> = {
        upload: `/prd/${slug}/upload`,
        brief: `/prd/${slug}/brief`,
        prd: `/prd/${slug}/prd`,
        epics: `/prd/${slug}/epicos`,
        stories: `/prd/${slug}/stories`,
        export: `/prd/${slug}/exportar`,
      };
      navigate(routes[phase] || `/prd/${slug}`);
    },
    [slug, navigate]
  );

  const handleNavigateToEpics = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/epicos`);
  }, [slug, navigate]);

  const handleNavigateToStories = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/stories`);
  }, [slug, navigate]);

  const handleEditBrief = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/brief`);
  }, [slug, navigate]);

  const handleEditPRD = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/prd`);
  }, [slug, navigate]);

  const handleViewStories = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/stories`);
  }, [slug, navigate]);

  const handleExport = useCallback(() => {
    if (slug) navigate(`/prd/${slug}/exportar`);
  }, [slug, navigate]);

  const handleDownloadZip = useCallback(() => {
    toast({
      title: 'Preparando Download...',
      description: 'Compactando especificacoes, pesquisas e assets em docs.zip.',
    });
    setTimeout(() => {
      const element = document.createElement('a');
      element.href =
        'data:text/plain;charset=utf-8,Simulacao de arquivo ZIP com documentos do projeto.';
      element.download = 'docs.zip';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast({
        title: 'Download Concluido',
        description: 'O arquivo docs.zip foi baixado com sucesso.',
      });
    }, 1500);
  }, [toast]);

  return {
    handleBack,
    handleContinueProduction,
    handleNavigateToPhase,
    handleNavigateToEpics,
    handleNavigateToStories,
    handleEditBrief,
    handleEditPRD,
    handleViewStories,
    handleExport,
    handleDownloadZip,
  };
}
