import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { modalGalleryItems, legacyModalButtons } from '../data';
import { useGalleryModals, useLegacyModals } from './hooks/useModalGallery';
import { GalleryModals } from './organisms/GalleryModals';
import { LegacyModals } from './organisms/LegacyModals';
import type { GalleryModalId, LegacyModalId } from './types';

// =============================================================================
// MAIN COMPONENT (Orchestrator: ~55 lines)
// =============================================================================

export const ModalGallerySection: React.FC = () => {
  const gallery = useGalleryModals();
  const legacy = useLegacyModals();

  const handleGalleryClick = (id: string) => {
    gallery.open(id as GalleryModalId);
  };

  const handleLegacyClick = (id: string) => {
    legacy.open(id as LegacyModalId);
  };

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="copy" /> Galeria de Modais
      </h3>
      <p className="mb-6 font-serif text-sm text-muted-foreground">
        Padroes comuns de dialogo para diferentes contextos da aplicacao.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {modalGalleryItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleGalleryClick(item.id)}
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
          {legacyModalButtons.map((btn) => (
            <Button key={btn.id} onClick={() => handleLegacyClick(btn.id)} variant="secondary">
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Legacy Modals */}
      <LegacyModals state={legacy.state} onClose={legacy.close} />
    </section>
  );
};

export default ModalGallerySection;
