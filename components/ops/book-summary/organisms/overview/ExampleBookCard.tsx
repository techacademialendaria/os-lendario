import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsCode } from '../../../ops-ui';
import { OPS_ACCENT } from '../../../ops-tokens';
import { EXAMPLE_BOOK } from '../../../data/book-summary-content';

const BasicInfoPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-muted/20">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: OPS_ACCENT }}>
      Dados Basicos (contents)
    </h4>
    <div className="space-y-2">
      {Object.entries(EXAMPLE_BOOK.basic).map(([key, value]) => (
        <div key={key} className="flex justify-between text-xs">
          <OpsCode className="text-muted-foreground">{key}</OpsCode>
          <span className="text-foreground">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const MetadataPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-muted/20">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: OPS_ACCENT }}>
      Metadata Enriquecido
    </h4>
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <OpsCode className="text-muted-foreground">copies_sold</OpsCode>
        <span className="text-foreground">{EXAMPLE_BOOK.metadata.copies_sold}</span>
      </div>
      <div className="flex justify-between text-xs">
        <OpsCode className="text-muted-foreground">controversy</OpsCode>
        <Badge variant="outline" className="text-[9px] text-emerald-400 border-emerald-400/30">
          {EXAMPLE_BOOK.metadata.controversy_level}
        </Badge>
      </div>
      <div className="flex justify-between text-xs">
        <OpsCode className="text-muted-foreground">sci_validity</OpsCode>
        <Badge variant="outline" className="text-[9px] text-amber-400 border-amber-400/30">
          {EXAMPLE_BOOK.metadata.scientific_validity}
        </Badge>
      </div>
      <div className="text-xs">
        <OpsCode className="text-muted-foreground block mb-1">key_concepts</OpsCode>
        <div className="flex flex-wrap gap-1">
          {EXAMPLE_BOOK.metadata.key_concepts.map((c, i) => (
            <span key={i} className="text-[9px] bg-muted/30 px-1.5 py-0.5 rounded">{c}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TagsAuthorPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-muted/20">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: OPS_ACCENT }}>
      Tags & Autor
    </h4>
    <div className="mb-3">
      <span className="text-[10px] text-muted-foreground">Categorias:</span>
      <div className="flex gap-1 mt-1">
        {EXAMPLE_BOOK.tags.map((tag, i) => (
          <Badge key={i} variant="outline" className="text-[10px]">{tag}</Badge>
        ))}
      </div>
    </div>
    <div>
      <span className="text-[10px] text-muted-foreground">Autor (via content_minds):</span>
      <div className="mt-1 p-2 rounded bg-muted/20">
        <OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>{EXAMPLE_BOOK.author_mind.name}</OpsCode>
        <span className="text-[10px] text-muted-foreground ml-2">role: {EXAMPLE_BOOK.author_mind.role}</span>
      </div>
    </div>
  </div>
);

const InteractionsPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-muted/20">
    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: OPS_ACCENT }}>
      Interacoes (mind_content_interactions)
    </h4>
    <div className="grid grid-cols-3 gap-2">
      {EXAMPLE_BOOK.interactions.map((int, i) => (
        <div key={i} className="text-center p-2 rounded bg-muted/30">
          <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>
            {int.count || int.avg}
          </div>
          <div className="text-[10px] text-muted-foreground uppercase">{int.type}</div>
        </div>
      ))}
    </div>
  </div>
);

export const ExampleBookCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={EXAMPLE_BOOK.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={2}>
        <BasicInfoPanel />
        <MetadataPanel />
        <TagsAuthorPanel />
        <InteractionsPanel />
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);
