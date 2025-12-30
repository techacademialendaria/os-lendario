import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import CreatorTopbar from '../CreatorTopbar';
import CourseBreadcrumb from './CourseBreadcrumb';
import { useCourse } from '../../../hooks/useCourse';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { STUDIO_PRIMARY, STUDIO_GOLD } from '../studio-tokens';

interface CourseBriefProps {
  setSection: (s: Section) => void;
}

interface BriefData {
  dream_outcome: string;
  icp: string;
  pain_points: string;
}

const CourseBrief: React.FC<CourseBriefProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading, refetch } = useCourse(slug);

  const [briefData, setBriefData] = useState<BriefData>({
    dream_outcome: '',
    icp: '',
    pain_points: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load brief data from course metadata
  useEffect(() => {
    if (course?.project_metadata) {
      const metadata = course.project_metadata as Record<string, unknown>;
      setBriefData({
        dream_outcome: (metadata.dream_outcome as string) || '',
        icp: (metadata.icp as string) || '',
        pain_points: (metadata.pain_points as string) || '',
      });
      setHasChanges(false);
    }
  }, [course]);

  const handleFieldChange = (field: keyof BriefData, value: string) => {
    setBriefData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!course || !isSupabaseConfigured()) return;

    setIsSaving(true);
    try {
      const updatedMetadata = {
        ...(course.project_metadata || {}),
        ...briefData,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('content_projects')
        .update({
          project_metadata: updatedMetadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', course.id);

      if (error) throw error;

      setHasChanges(false);
      await refetch();
    } catch (err) {
      console.error('Error saving brief:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndContinue = async () => {
    await handleSave();
    navigate(`/creator/cursos/${slug}/research`);
  };

  if (loading || !course) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="mb-2 h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 animate-pulse rounded bg-muted" />
              <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            <Card>
              <CardContent className="space-y-6 p-6">
                {/* 3 textareas skeleton */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    <div
                      className={`${i === 1 ? 'h-24' : 'h-16'} w-full animate-pulse rounded bg-muted/60`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <div className="h-9 w-24 animate-pulse rounded bg-muted" />
              <div className="h-9 w-48 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-12">
        <CourseBreadcrumb
          items={[
            { label: 'Cursos', href: '/creator/cursos' },
            { label: course.name, href: `/creator/cursos/${slug}` },
            { label: 'Brief' },
          ]}
          title="Briefing Estratégico"
          actions={
            <Button variant="outline" onClick={() => navigate(`/creator/cursos/${slug}`)}>
              <Icon name="angle-left" className="mr-2 size-4" /> Voltar
            </Button>
          }
        />

        <div className="mx-auto max-w-4xl animate-fade-in space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="dream_outcome">Qual é a promessa principal? (Dream Outcome)</Label>
                <Textarea
                  id="dream_outcome"
                  placeholder="Ex: Dominar vendas B2B em 30 dias..."
                  className="min-h-[100px]"
                  value={briefData.dream_outcome}
                  onChange={(e) => handleFieldChange('dream_outcome', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icp">Quem é o aluno ideal? (ICP)</Label>
                <Textarea
                  id="icp"
                  placeholder="Ex: Gestores de vendas com equipe de 5+ pessoas..."
                  value={briefData.icp}
                  onChange={(e) => handleFieldChange('icp', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pain_points">Principais Dores</Label>
                <Textarea
                  id="pain_points"
                  placeholder="Ex: Falta de tempo, leads frios, taxas baixas de conversão..."
                  value={briefData.pain_points}
                  onChange={(e) => handleFieldChange('pain_points', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {hasChanges && (
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-studio-gold"
                  />
                  Alterações não salvas
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/creator/cursos/${slug}`)}>
                Cancelar
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="hover:border-studio-primary/50 hover:text-studio-primary"
              >
                {isSaving ? (
                  <Icon name="spinner" className="mr-2 animate-spin" size="size-4" />
                ) : (
                  <Icon name="check" className="mr-2" size="size-4" />
                )}
                Salvar
              </Button>
              <Button
                onClick={handleSaveAndContinue}
                disabled={isSaving}
                className="text-white bg-studio-primary hover:bg-studio-primary/90"
              >
                {isSaving ? 'Salvando...' : 'Salvar e Continuar'}
                <Icon name="arrow-right" className="ml-2" size="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseBrief;
