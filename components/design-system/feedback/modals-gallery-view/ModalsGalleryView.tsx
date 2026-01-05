import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { modalGalleryItems } from '../data';
import { useGalleryModals, useLegacyModals } from './hooks/useModalsGallery';
import { GalleryModals } from './organisms/GalleryModals';
import { LegacyModals } from './organisms/LegacyModals';
import type { GalleryModalId, LegacyModalId } from './types';

// =============================================================================
// MAIN COMPONENT (Orchestrator: ~60 lines)
// =============================================================================

const ModalsGalleryView: React.FC = () => {
  const gallery = useGalleryModals();
  const legacy = useLegacyModals();

  const handleModalOpen = (id: string) => {
    gallery.open(id as GalleryModalId);
  };

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="copy" /> Galeria de Modais
      </h3>
      <p className="mb-6 font-serif text-sm text-muted-foreground">
        Padroes comuns de dialogo para diferentes contextos da aplicacao.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {modalGalleryItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleModalOpen(item.id)}
            variant="outline"
            className="flex h-24 flex-col gap-2"
          >
            <Icon name={item.icon} size="size-6" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>

      {/* Gallery Modals */}
      <GalleryModals state={gallery.state} onClose={gallery.close} />

      {/* Legacy Modals Section */}
      <div className="mt-8 border-t border-border pt-8">
        <h4 className="mb-4 text-sm font-bold uppercase text-muted-foreground">
          Exemplos Funcionais (Anteriores)
        </h4>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => legacy.open('terms')} variant="secondary">
            Informativo (Terms)
          </Button>
          <Button onClick={() => legacy.open('form')} variant="secondary">
            Formulario (Edit)
          </Button>
          <Button onClick={() => legacy.open('success')} variant="secondary">
            Sucesso (Action)
          </Button>
          <Button onClick={() => legacy.open('destructive')} variant="secondary">
            Critico (Delete)
          </Button>
        </div>
      </div>

      {/* Legacy Modals */}
      <LegacyModals state={legacy.state} onClose={legacy.close} />
    </section>
  );
};

export default ModalsGalleryView;
