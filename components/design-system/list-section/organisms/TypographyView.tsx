import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';
import { contactMetadata } from '../data';

export const TypographyView: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="font-sans text-xl font-semibold">Tipografia & Metadados</h3>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Standard HTML Lists */}
        <TextListsSection />

        {/* Inline Separators */}
        <InlineSeparatorsSection />

        {/* Icon Metadata List */}
        <IconMetadataSection />
      </div>
    </section>
  );
};

const TextListsSection: React.FC = () => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
      Listas de Texto
    </h4>
    <div className="space-y-6 rounded-xl border border-border bg-card p-6">
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
        <li>Item de lista padrao</li>
        <li>Marcador com cor primaria</li>
        <li>Texto serifado para leitura</li>
      </ul>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground marker:font-bold marker:text-foreground">
        <li>Passo ordenado um</li>
        <li>Passo ordenado dois</li>
        <li>Passo ordenado tres</li>
      </ol>
    </div>
  </div>
);

const InlineSeparatorsSection: React.FC = () => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
      Separadores Inline (Breadcrumbs/Meta)
    </h4>
    <div className="flex flex-col justify-center space-y-4 rounded-xl border border-border bg-card p-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-foreground">Home</span>
        <Icon
          name="angle-small-right"
          className="text-muted-foreground opacity-50"
          size="size-3"
        />
        <span className="text-foreground">Settings</span>
        <Icon
          name="angle-small-right"
          className="text-muted-foreground opacity-50"
          size="size-3"
        />
        <span className="font-semibold text-primary">Billing</span>
      </div>

      {/* Bullet separator */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Admin</span>
        <Symbol name="bullet" />
        <span>2h atras</span>
        <Symbol name="bullet" />
        <span>Editado</span>
      </div>

      {/* Pipe separator */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="cursor-pointer transition-colors hover:text-primary">Privacy</span>
        <span className="text-border">|</span>
        <span className="cursor-pointer transition-colors hover:text-primary">Terms</span>
        <span className="text-border">|</span>
        <span className="cursor-pointer transition-colors hover:text-primary">Support</span>
      </div>
    </div>
  </div>
);

const IconMetadataSection: React.FC = () => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
      Metadados com Icones
    </h4>
    <div className="space-y-3 rounded-xl border border-border bg-card p-6">
      {contactMetadata.map((contact) => (
        <div key={contact.icon} className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Icon name={contact.icon} size="size-4" />
          </div>
          {contact.isLink ? (
            <span className="cursor-pointer text-primary hover:underline">{contact.text}</span>
          ) : (
            <span className="text-muted-foreground">{contact.text}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);
