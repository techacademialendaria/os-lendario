import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode } from '../../../ops-ui';
import { BOOK_MINDS_CONNECTION } from '../../../data/book-summary-content';

const AuthorConnectionPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
      {BOOK_MINDS_CONNECTION.authorConnection.title}
    </h4>
    <p className="text-xs text-muted-foreground mb-3">{BOOK_MINDS_CONNECTION.authorConnection.description}</p>
    <div className="mb-3">
      <span className="text-[10px] font-bold text-muted-foreground">Fluxo:</span>
      <div className="mt-1 space-y-1">
        {BOOK_MINDS_CONNECTION.authorConnection.flow.map((step, i) => (
          <div key={i} className="text-[10px] text-foreground flex items-start gap-2">
            <span className="text-emerald-400">{i + 1}.</span>
            {step}
          </div>
        ))}
      </div>
    </div>
    <div>
      <span className="text-[10px] font-bold text-muted-foreground">Beneficios:</span>
      <div className="mt-1 flex flex-wrap gap-1">
        {BOOK_MINDS_CONNECTION.authorConnection.benefits.map((b, i) => (
          <span key={i} className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">{b}</span>
        ))}
      </div>
    </div>
  </div>
);

const ReaderConnectionPanel: React.FC = () => (
  <div className="p-4 rounded-lg bg-violet-500/5 border border-violet-500/20">
    <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
      {BOOK_MINDS_CONNECTION.readerConnection.title}
    </h4>
    <p className="text-xs text-muted-foreground mb-3">{BOOK_MINDS_CONNECTION.readerConnection.description}</p>
    <div className="mb-3">
      <span className="text-[10px] font-bold text-muted-foreground">Interacoes:</span>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {BOOK_MINDS_CONNECTION.readerConnection.interactions.map((int, i) => (
          <div key={i} className="text-[10px] p-1.5 rounded bg-muted/20">
            <OpsCode className="text-violet-400">{int.type}</OpsCode>
            <span className="text-muted-foreground ml-1">- {int.description}</span>
          </div>
        ))}
      </div>
    </div>
    <div>
      <span className="text-[10px] font-bold text-muted-foreground">RPC Functions:</span>
      <div className="mt-1 flex flex-wrap gap-1">
        {BOOK_MINDS_CONNECTION.readerConnection.rpcFunctions.slice(0, 4).map((fn, i) => (
          <OpsCode key={i} className="text-[9px] bg-muted/20 px-1 py-0.5 rounded">{fn}</OpsCode>
        ))}
      </div>
    </div>
  </div>
);

export const MindsConnectionCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_MINDS_CONNECTION.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="mb-4">{BOOK_MINDS_CONNECTION.description}</OpsText>
      <OpsGrid columns={2}>
        <AuthorConnectionPanel />
        <ReaderConnectionPanel />
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);
