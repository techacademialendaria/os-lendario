import React from 'react';
import { Icon } from '@/components/ui/icon';
import {
  OpsCard,
  OpsCardContent,
} from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';

export const ExecutiveSummary: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardContent className="p-6">
        <h4 className="text-base font-bold text-foreground mb-4 uppercase tracking-wider border-b border-border/20 pb-2">
          Resumo Executivo
        </h4>
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p className="flex gap-3">
            <Icon name="exclamation-triangle" size="size-5" className="text-red-400 mt-1" />
            <span>
              <strong className="text-red-400 block mb-1">Problema Principal</strong>
              O pipeline esta bloqueado porque nenhum MIU foi extraido ainda.
              A extracao e o primeiro passo e desbloqueia todo o resto.
            </span>
          </p>
          <p className="flex gap-3">
            <Icon name="bolt" size="size-5" style={{ color: OPS_ACCENT }} className="mt-1" />
            <span>
              <strong style={{ color: OPS_ACCENT }} className="block mb-1">Acao Imediata</strong>
              Rodar InnerLens em pelo menos 1 mind completo (4h de trabalho)
              para validar o fluxo end-to-end.
            </span>
          </p>
          <p className="flex gap-3">
            <Icon name="refresh" size="size-5" className="text-purple-400 mt-1" />
            <span>
              <strong className="text-purple-400 block mb-1">Paralelizavel</strong>
              Step 4 (tool_driver_affinities) pode ser executado em paralelo
              com Steps 1-3, ja que nao depende de MIUs.
            </span>
          </p>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
