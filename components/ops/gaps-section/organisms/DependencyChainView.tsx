import React from 'react';
import { Icon } from '@/components/ui/icon';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode,
} from '../../ops-ui';
import { DEPENDENCY_CHAIN_DIAGRAM } from '../data';

export const DependencyChainView: React.FC = () => {
  return (
    <OpsCard style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
      <OpsCardHeader title="Efeito Domino - Cadeia de Dependencias" accentColor="#f87171">
        <Icon name="arrow-right" size="size-4" className="text-red-400 mr-2" />
      </OpsCardHeader>
      <OpsCardContent>
        <OpsText className="mb-6 max-w-4xl">
          Cada gap critico bloqueia os proximos. A raiz do problema e{' '}
          <OpsCode className="text-red-400 bg-red-500/10">mius = 0</OpsCode>.
          Sem MIUs extraidos, todo o pipeline fica travado.
        </OpsText>
        <MermaidDiagram chart={DEPENDENCY_CHAIN_DIAGRAM} id="dependency-chain" />
      </OpsCardContent>
    </OpsCard>
  );
};
