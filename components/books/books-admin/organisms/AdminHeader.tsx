import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { AdminBook } from '@/hooks/useAdminBooks';

interface AdminHeaderProps {
  view: 'list' | 'editor' | 'pipeline';
  selectedBook: AdminBook | null;
  saving: boolean;
  onBack?: () => void;
  onViewChange: (view: 'list' | 'editor' | 'pipeline') => void;
  onCreate: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  view,
  selectedBook,
  saving,
  onBack,
  onViewChange,
  onCreate,
  onSave,
  onCancel,
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {view === 'editor' ? (
            <Button variant="ghost" size="icon" onClick={() => onViewChange('list')}>
              <Icon name="arrow-left" />
            </Button>
          ) : (
            onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <Icon name="arrow-left" />
              </Button>
            )
          )}
          <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Icon name="settings-sliders" className="text-brand-gold" />
            {view === 'editor'
              ? selectedBook
                ? 'Editor de Livro'
                : 'Novo Livro'
              : 'Gestao de Acervo'}
          </h1>
          {view !== 'editor' && (
            <div className="ml-6 flex rounded-lg border border-border bg-muted/30 p-1">
              <Button
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('list')}
                className="gap-2"
              >
                <Icon name="book" size="size-4" />
                Livros
              </Button>
              <Button
                variant={view === 'pipeline' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('pipeline')}
                className="gap-2"
              >
                <Icon name="play-circle" size="size-4" />
                Pipeline
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {view === 'list' ? (
            <div className="flex gap-2">
              <Button variant="outline" className="hidden gap-2 border-dashed sm:flex">
                <Icon name="layers" size="size-3" /> Nova Colecao
              </Button>
              <Button
                className="bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                onClick={onCreate}
              >
                <Icon name="plus" size="size-3" /> Novo Livro
              </Button>
            </div>
          ) : view === 'pipeline' ? null : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onCancel} disabled={saving}>
                Cancelar
              </Button>
              <Button
                className="gap-2 bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Icon name="spinner" size="size-3" className="animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Icon name="check" size="size-3" /> Salvar Alteracoes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
