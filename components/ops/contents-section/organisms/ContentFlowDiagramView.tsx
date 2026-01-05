import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { CONTENT_FLOW_DIAGRAM } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode
} from '../../ops-ui';

/**
 * ContentFlowDiagramView - Mermaid diagram and quick summary of the content pipeline
 */
export const ContentFlowDiagramView: React.FC = () => {
  return (
    <>
      {/* Content Flow Diagram */}
      <OpsCard>
        <OpsCardHeader title="Content Pipeline - Visao Geral" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={CONTENT_FLOW_DIAGRAM} id="content-flow" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Summary */}
      <div className="p-6 rounded-xl border-l-4 bg-muted/5" style={{ borderColor: OPS_ACCENT }}>
        <p className="text-base mb-4 leading-relaxed">
          <strong>O Pipeline de Conteudo transforma fontes brutas em conhecimento estruturado:</strong>
        </p>
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-muted-foreground">
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>content_projects</OpsCode>
            {' '}agrupa conteudos relacionados (serie de podcast, livro, etc.)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>contents</OpsCode>
            {' '}armazena cada peca de conteudo (episodio, capitulo, artigo)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>mius</OpsCode>
            {' '}extrai unidades minimas interpretaveis (zero-inference)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>fragments</OpsCode>
            {' '}sistema legado com insight embutido (sendo substituido)
          </p>
        </div>
      </div>
    </>
  );
};
