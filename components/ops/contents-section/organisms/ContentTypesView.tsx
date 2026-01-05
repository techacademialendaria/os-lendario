import React from 'react';
import { Badge } from '../../../ui/badge';
import { CONTENT_TYPES } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';

// Helper component for MIU density display
const MiuDensityBadge: React.FC<{ density: 'high' | 'medium' | 'low' }> = ({ density }) => {
  const colorMap = {
    high: 'bg-emerald-500/20 text-emerald-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded ${colorMap[density]}`}>
      {density === 'high' ? 'Alta' : density === 'medium' ? 'Media' : 'Baixa'}
    </span>
  );
};

/**
 * ContentTypesView - Table showing content types and their MIU density
 */
export const ContentTypesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Content Types - Densidade de MIU" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 max-w-3xl">
          Diferentes tipos de conteudo produzem densidades diferentes de MIUs.
          Conteudo em primeira pessoa (entrevistas, podcasts) tem maior densidade.
        </OpsText>

        <div className="overflow-x-auto rounded-lg border border-border/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-muted/20">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Tipo</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Categoria</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">MIU</th>
              </tr>
            </thead>
            <tbody>
              {CONTENT_TYPES.map((ct, i) => (
                <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4">
                    <OpsCode className="bg-muted/10" style={{ color: OPS_ACCENT }}>{ct.type}</OpsCode>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">
                    <Badge variant="outline" className="text-[10px]">{ct.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs leading-relaxed">{ct.description}</td>
                  <td className="py-3 px-4">
                    <MiuDensityBadge density={ct.miuDensity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
