import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../../lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';
import { useMind } from '../../../hooks/useMind';
import { useMindContents } from '../../../hooks/useMindContents';
import { ContentsTab } from './ContentsTab';
import { useMindArtifacts } from '../../../hooks/useMindArtifacts';
import { useMindPsychometrics } from '../../../hooks/useMindPsychometrics';
import { useMindHistory } from '../../../hooks/useMindHistory';
import { useMindFragments } from '../../../hooks/useMindFragments';
import { MindAvatarUpload } from '../ui/MindAvatarUpload';
import { ObsessionRing } from '../ui/ObsessionRing';
import { MindHeroSection } from '../ui/MindHeroSection';
import { MindProfileSkeleton } from '../ui/MindSkeletons';
import { PsychometricsTab } from './PsychometricsTab';
import { WritingStylesTab } from './WritingStylesTab';
import { HistoryTab } from './HistoryTab';
import { ArtifactsTab } from './ArtifactsTab';
import { FragmentsTab } from './FragmentsTab';
import { RecommendedToolsTab } from './RecommendedToolsTab';
import { MOCK_COMMUNICATION_DATA } from '../data/mock-communication';
import { MOCK_HISTORY_DATA, PROFESSIONAL_ACHIEVEMENTS } from '../data/mock-history';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { MindEditDialog } from '../ui/MindEditDialog';
import { usePageTitle } from '../../../hooks/usePageTitle';
import {
  STUDIO_CARD_CLASSES,
  STUDIO_PRIMARY,
  STUDIO_BADGE_CLASSES,
} from '../studio-tokens';

interface MindProfileProps {
  setSection: (s: Section) => void;
  mindSlug?: string;
}

// DiceBear fallback for missing images
const getDiceBearUrl = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

// Valid tab IDs for URL hash
const VALID_TABS = ['overview', 'psychometrics', 'communication', 'history', 'artifacts', 'contents', 'fragments', 'prompts', 'recommended-tools'];

const MindProfileTemplate: React.FC<MindProfileProps> = ({ setSection, mindSlug: propSlug }) => {
  const { mindSlug: paramSlug } = useParams<{ mindSlug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mindSlug = propSlug || paramSlug || '';

  // Get initial tab from URL hash or default to "overview"
  const getInitialTab = (): string => {
    const hash = location.hash.replace('#', '');
    return VALID_TABS.includes(hash) ? hash : 'overview';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [imgError, setImgError] = useState(false);

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (VALID_TABS.includes(hash) && hash !== activeTab) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Update URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without triggering navigation
    window.history.replaceState(null, '', `${location.pathname}#${tab}`);
  };
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditSettingsOpen, setIsEditSettingsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mind, loading, error, refetch } = useMind(mindSlug);

  // Dynamic page title with mind name
  usePageTitle(mind?.name);

  const handleDeleteMind = async () => {
    if (!mind || !isSupabaseConfigured()) return;

    setIsDeleting(true);
    try {
      const { error: deleteError } = await (supabase
        .from('minds') as any)
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', mind.id);

      if (deleteError) throw deleteError;

      setIsDeleteDialogOpen(false);
      navigate('/minds');
    } catch (err) {
      console.error('Error deleting mind:', err);
    } finally {
      setIsDeleting(false);
    }
  };
  const { data: artifactsData, loading: artifactsLoading } = useMindArtifacts(mind?.id || null);
  const { data: psychometrics, loading: psychometricsLoading } = useMindPsychometrics(mind?.id || null);
  const { data: historyData, loading: historyLoading } = useMindHistory(mind?.id || null);
  const { data: contentsData, loading: contentsLoading } = useMindContents(mind?.id || null);
  const {
    data: fragmentsData,
    loading: fragmentsLoading,
    updateFragment,
    deleteFragment,
    deleteFragmentsByContentId,
    createFragment,
  } = useMindFragments(mind?.id || null);

  // Loading state - use skeleton that mirrors the actual layout
  if (loading) {
    return <MindProfileSkeleton setSection={setSection} />;
  }

  // Error state
  if (error || !mind) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-4 text-center">
            <Icon name="exclamation-triangle" size="size-12" className="text-destructive" />
            <h2 className="text-xl font-bold">Mente não encontrada</h2>
            <p className="text-muted-foreground">{error?.message || 'A mente solicitada não existe ou foi removida.'}</p>
            <Button onClick={() => setSection(Section.APP_MINDS_GALLERY)}>
              Voltar para Galeria
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const avatarSrc = imgError ? getDiceBearUrl(mind.slug) : mind.avatar;

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />

      {/* --- HERO HEADER --- */}
      <MindHeroSection
        mind={mind}
        avatarSrc={avatarSrc}
        onImageError={() => setImgError(true)}
        onEditClick={() => setIsEditAvatarOpen(true)}
        onEditSettingsClick={() => setIsEditSettingsOpen(true)}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        setSection={setSection}
      />

      <main className="p-6 flex-1 max-w-[1400px] mx-auto w-full">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="bg-transparent w-full justify-start p-0 h-auto gap-2 flex-wrap">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="grid" size="size-4" className="mr-1.5" /> Geral
            </TabsTrigger>
            <TabsTrigger value="psychometrics" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="chart-pie" size="size-4" className="mr-1.5" /> DNA
            </TabsTrigger>
            <TabsTrigger value="communication" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="comment-alt" size="size-4" className="mr-1.5" /> Comunicação
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="time-past" size="size-4" className="mr-1.5" /> História
            </TabsTrigger>
            <TabsTrigger value="artifacts" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="box" size="size-4" className="mr-1.5" /> Artefatos {artifactsData?.artifacts.length ? `(${artifactsData.artifacts.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="contents" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="document" size="size-4" className="mr-1.5" /> Conteúdos
            </TabsTrigger>
            <TabsTrigger value="fragments" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="box" size="size-4" className="mr-1.5" /> Fragmentos {fragmentsData?.total ? `(${fragmentsData.total})` : ''}
            </TabsTrigger>
            <TabsTrigger value="prompts" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="terminal" size="size-4" className="mr-1.5" /> Prompts {artifactsData?.prompts.length ? `(${artifactsData.prompts.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="recommended-tools" className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30">
              <Icon name="box" size="size-4" className="mr-1.5" /> Ferramentas
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* Bio */}
                <Card className={STUDIO_CARD_CLASSES}>
                  <CardHeader className="border-b border-border pb-3">
                    <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Icon name="user" /> Sobre a Mente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 font-serif text-muted-foreground leading-relaxed">
                    <p>{mind.shortBio || 'Sem descrição disponível.'}</p>
                  </CardContent>
                </Card>

                {/* Values */}
                {mind.values.length > 0 && (
                  <Card className={STUDIO_CARD_CLASSES}>
                    <CardHeader className="border-b border-border pb-3">
                      <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Icon name="heart" /> Valores Centrais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {mind.values.slice(0, 5).map((value, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <span className="text-sm font-medium text-foreground w-40">{value.name}</span>
                            <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-studio-primary transition-all"
                                style={{ width: `${value.importance * 10}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold w-8">{value.importance}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-8">
                {/* Skills/Proficiencies */}
                {mind.proficiencies.length > 0 && (
                  <Card className={cn(STUDIO_CARD_CLASSES, "bg-gradient-to-br from-card to-studio-primary/5")}>
                    <CardHeader className="border-b border-border pb-3">
                      <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Icon name="chart-pie" className="text-studio-primary" /> Proficiências
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {mind.proficiencies.slice(0, 6).map((prof, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <span className="text-xs font-bold text-muted-foreground w-32 text-right truncate" title={prof.skillName}>
                              {prof.skillName}
                            </span>
                            <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                              <div className="h-full bg-studio-primary" style={{ width: `${prof.level * 10}%` }} />
                            </div>
                            <span className="text-xs font-mono font-bold w-8">{prof.level}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Communication Style */}
                <Card className={STUDIO_CARD_CLASSES}>
                  <CardHeader className="border-b border-border pb-3">
                    <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Icon name="comment-alt" /> Comunicação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      {mind.communicationStyle.map((style, i) => (
                        <Badge key={i} variant="outline" className="rounded-md">{style}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Obsession */}
                {mind.obsession && (
                  <Card className={STUDIO_CARD_CLASSES}>
                    <CardHeader className="border-b border-border pb-3">
                      <CardTitle className="text-base uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Icon name="target" /> Obsessão
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-4 justify-center">
                        <ObsessionRing name={mind.obsession} intensity={10} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: PSYCHOMETRICS / DNA MENTAL */}
          <TabsContent value="psychometrics" className="animate-fade-in">
            <PsychometricsTab psychometrics={psychometrics} loading={psychometricsLoading} />
          </TabsContent>

          {/* TAB 3: ARTIFACTS */}
          <TabsContent value="artifacts" className="animate-fade-in">
            <ArtifactsTab artifactsData={artifactsData} loading={artifactsLoading} />
          </TabsContent>

          {/* TAB 4: SYSTEM PROMPTS */}
          <TabsContent value="prompts" className="animate-fade-in">
            {artifactsLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-studio-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : artifactsData?.prompts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="terminal" size="size-12" className="mx-auto mb-4 opacity-50" />
                <p>Nenhum system prompt disponível para esta mente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {artifactsData?.prompts.map((prompt) => (
                  <Card key={prompt.id} className={STUDIO_CARD_CLASSES}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">{prompt.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">{prompt.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg overflow-x-auto max-h-48">
                        {prompt.content?.substring(0, 500)}...
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 5: COMMUNICATION */}
          <TabsContent value="communication" className="animate-fade-in">
            <WritingStylesTab profile={{ ...mind, ...MOCK_COMMUNICATION_DATA }} />
          </TabsContent>

          {/* TAB 6: HISTORY */}
          <TabsContent value="history" className="animate-fade-in">
            <HistoryTab
              history={historyData?.events.length ? historyData.events : MOCK_HISTORY_DATA}
              quote={historyData?.quote}
              achievements={historyData?.achievements?.length ? historyData.achievements : PROFESSIONAL_ACHIEVEMENTS}
              loading={historyLoading}
            />
          </TabsContent>

          {/* TAB 7: CONTENTS */}
          <TabsContent value="contents" className="animate-fade-in">
            <ContentsTab contentsData={contentsData} loading={contentsLoading} />
          </TabsContent>

          {/* TAB: FRAGMENTS */}
          <TabsContent value="fragments" className="animate-fade-in">
            <FragmentsTab
              fragmentsData={fragmentsData}
              loading={fragmentsLoading}
              mindId={mind.id}
              onUpdateFragment={updateFragment}
              onDeleteFragment={deleteFragment}
              onDeleteFragmentsByContentId={deleteFragmentsByContentId}
              onCreateFragment={createFragment}
            />
          </TabsContent>

          {/* TAB: RECOMMENDED TOOLS */}
          <TabsContent value="recommended-tools" className="animate-fade-in">
            <RecommendedToolsTab psychometrics={psychometrics} loading={psychometricsLoading} mindSlug={mindSlug} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Avatar Upload Modal */}
      <MindAvatarUpload
        open={isEditAvatarOpen}
        onOpenChange={setIsEditAvatarOpen}
        mindId={mind.id}
        mindSlug={mind.slug}
        mindName={mind.name}
        currentAvatar={mind.avatar}
        onSuccess={() => refetch()}
      />

      {/* Mind Settings Modal */}
      <MindEditDialog
        open={isEditSettingsOpen}
        onOpenChange={setIsEditSettingsOpen}
        mind={mind}
        onSuccess={() => refetch()}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Mente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar <strong>{mind.name}</strong>?
              Esta acao pode ser revertida posteriormente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMind}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {isDeleting ? (
                <>
                  <Icon name="refresh" className="animate-spin mr-2" size="size-4" />
                  Deletando...
                </>
              ) : (
                <>
                  <Icon name="trash" className="mr-2" size="size-4" />
                  Deletar
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MindProfileTemplate;
