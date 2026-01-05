import React from 'react';
import { useParams } from 'react-router-dom';
import MindsTopbar from '../../MindsTopbar';
import { Section } from '../../../../types';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { useMind } from '../../../../hooks/useMind';
import { useMindContents } from '../../../../hooks/useMindContents';
import { useMindArtifacts } from '../../../../hooks/useMindArtifacts';
import { useMindPsychometrics } from '../../../../hooks/useMindPsychometrics';
import { useMindHistory } from '../../../../hooks/useMindHistory';
import { useMindFragments } from '../../../../hooks/useMindFragments';
import { MindAvatarUpload } from '../../ui/MindAvatarUpload';
import { MindHeroSection } from '../../ui/MindHeroSection';
import { MindProfileSkeleton } from '../../ui/MindSkeletons';
import { MindEditDialog } from '../../ui/MindEditDialog';
import { usePageTitle } from '../../../../hooks/usePageTitle';
import { useMindProfileTabs, useMindProfileDialogs, useMindProfileImage } from './hooks';
import { MindProfileTabs, MindDeleteDialog } from './organisms';
import type { MindProfileProps } from './types';

const MindProfileTemplate: React.FC<MindProfileProps> = ({ setSection, mindSlug: propSlug }) => {
  const { mindSlug: paramSlug } = useParams<{ mindSlug: string }>();
  const mindSlug = propSlug || paramSlug || '';

  // Custom hooks for state management
  const { activeTab, handleTabChange } = useMindProfileTabs();
  const { mind, loading, error, refetch } = useMind(mindSlug);
  const dialogs = useMindProfileDialogs(mind);
  const { imgError, setImgError, avatarSrc } = useMindProfileImage(mind);

  // Dynamic page title
  usePageTitle(mind?.name);

  // Data hooks
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

  // Loading state
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
            <h2 className="text-xl font-bold">Mente nao encontrada</h2>
            <p className="text-muted-foreground">
              {error?.message || 'A mente solicitada nao existe ou foi removida.'}
            </p>
            <Button onClick={() => setSection(Section.APP_MINDS_GALLERY)}>Voltar para Galeria</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <MindsTopbar currentSection={Section.APP_MINDS_PROFILE} setSection={setSection} />

      <MindHeroSection
        mind={mind}
        avatarSrc={avatarSrc}
        onImageError={() => setImgError(true)}
        onEditClick={dialogs.openEditAvatar}
        onEditSettingsClick={dialogs.openEditSettings}
        onDeleteClick={dialogs.openDeleteDialog}
        setSection={setSection}
      />

      <main className="p-6 flex-1 max-w-[1400px] mx-auto w-full">
        <MindProfileTabs
          mind={mind}
          mindSlug={mindSlug}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          artifactsData={artifactsData}
          artifactsLoading={artifactsLoading}
          psychometrics={psychometrics}
          psychometricsLoading={psychometricsLoading}
          historyData={historyData}
          historyLoading={historyLoading}
          contentsData={contentsData}
          contentsLoading={contentsLoading}
          fragmentsData={fragmentsData}
          fragmentsLoading={fragmentsLoading}
          onUpdateFragment={updateFragment}
          onDeleteFragment={deleteFragment}
          onDeleteFragmentsByContentId={deleteFragmentsByContentId}
          onCreateFragment={createFragment}
        />
      </main>

      <MindAvatarUpload
        open={dialogs.isEditAvatarOpen}
        onOpenChange={dialogs.setEditAvatarOpen}
        mindId={mind.id}
        mindSlug={mind.slug}
        mindName={mind.name}
        currentAvatar={mind.avatar}
        onSuccess={() => refetch()}
      />

      <MindEditDialog
        open={dialogs.isEditSettingsOpen}
        onOpenChange={dialogs.setEditSettingsOpen}
        mind={mind}
        onSuccess={() => refetch()}
      />

      <MindDeleteDialog
        mind={mind}
        open={dialogs.isDeleteDialogOpen}
        onOpenChange={dialogs.setDeleteDialogOpen}
        isDeleting={dialogs.isDeleting}
        onDelete={dialogs.handleDeleteMind}
      />
    </div>
  );
};

export default MindProfileTemplate;
