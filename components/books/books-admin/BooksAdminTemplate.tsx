import React, { useState } from 'react';
import { Section } from '@/types';
import BooksTopbar from '../topbar';
import { useBooksAdmin } from './hooks';
import { AdminHeader, DeleteBookDialog, AdminLoadingSkeleton, AdminMainContent } from './organisms';

interface BooksAdminTemplateProps {
  onBack?: () => void;
  setSection?: (s: Section) => void;
}

const BooksAdminTemplate: React.FC<BooksAdminTemplateProps> = ({ onBack, setSection: propSetSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);
  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    propSetSection?.(section);
  };

  const admin = useBooksAdmin();

  if (admin.loading && admin.view === 'list') {
    return <AdminLoadingSkeleton />;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-20 font-sans text-foreground">
      {/* BooksTopbar FORA do container animado para não quebrar position:fixed */}
      <BooksTopbar currentSection={currentSection} setSection={handleSetSection} />
      <div className="animate-fade-in flex flex-1 flex-col">
        <AdminHeader
          view={admin.view}
          selectedBook={admin.selectedBook}
          saving={admin.saving}
          onBack={onBack}
          onViewChange={admin.setView}
          onCreate={admin.handleCreate}
          onSave={admin.handleSave}
          onCancel={() => admin.setView('list')}
        />
        <AdminMainContent admin={admin} />
        <DeleteBookDialog
          open={admin.showDeleteDialog}
          onOpenChange={admin.setShowDeleteDialog}
          target={admin.deleteTarget}
          onConfirm={admin.handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default BooksAdminTemplate;
