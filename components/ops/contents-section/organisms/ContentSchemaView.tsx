import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { CONTENT_ER_DIAGRAM } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode
} from '../../ops-ui';

/**
 * ContentSchemaView - ER diagram and key takeaway summary
 */
export const ContentSchemaView: React.FC = () => {
  return (
    <>
      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={CONTENT_ER_DIAGRAM} id="content-er" />
        </OpsCardContent>
      </OpsCard>

      {/* Key Takeaway */}
      <div className="p-6 rounded-xl border-l-4 bg-muted/5 shadow-sm" style={{ borderColor: OPS_ACCENT }}>
        <p className="text-base font-bold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></span>
          Resumo do Pipeline de Conteudo
        </p>
        <ul className="text-sm md:text-base space-y-3 text-muted-foreground leading-relaxed pl-4 border-l border-border/20 ml-1">
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>content_projects</OpsCode>
            {' '}organiza fontes em projetos (podcast series, livro, etc.)
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>contents</OpsCode>
            {' '}armazena o texto completo com metadados e status
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>content_minds</OpsCode>
            {' '}vincula conteudo a quem participou (host, guest, author)
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>mius</OpsCode>
            {' '}extrai unidades minimas sem inferencia - base para todo o resto
          </li>
        </ul>
        <p className="text-sm mt-4 pt-4 border-t border-border/10 font-medium text-foreground">
          Quanto mais conteudo em primeira pessoa, maior a qualidade dos MIUs extraidos.
        </p>
      </div>
    </>
  );
};
