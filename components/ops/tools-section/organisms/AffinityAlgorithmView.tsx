import React from 'react';
import { AFFINITY_ALGORITHM } from '../../data/tool-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';

export const AffinityAlgorithmView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={`${AFFINITY_ALGORITHM.title} - Deep Dive`} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{AFFINITY_ALGORITHM.description}</OpsText>

        {/* Formula */}
        <div className="p-4 rounded-lg bg-muted/20 mb-4">
          <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
            {AFFINITY_ALGORITHM.formula.title}
          </h4>
          <OpsCode className="block text-xs bg-muted/30 p-3 rounded font-mono text-foreground mb-3">
            {AFFINITY_ALGORITHM.formula.equation}
          </OpsCode>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {AFFINITY_ALGORITHM.formula.components.map((comp, i) => (
              <div key={i} className="text-xs">
                <OpsCode className="font-bold" style={{ color: OPS_ACCENT }}>{comp.name}</OpsCode>
                <span className="text-muted-foreground"> - {comp.desc}</span>
                <span className="block text-[10px] italic text-muted-foreground mt-0.5">ex: {comp.example}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example Calculation */}
        <div className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
          <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>
            {AFFINITY_ALGORITHM.example.title}
          </h4>

          {/* Profile */}
          <div className="mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Perfil de {AFFINITY_ALGORITHM.example.profile.name}:
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {AFFINITY_ALGORITHM.example.profile.drivers.map((d, i) => (
                <span key={i} className="text-[10px] bg-muted/20 px-2 py-1 rounded">
                  {d.driver}: <span className="font-bold">{d.value}</span>{' '}
                  <span className="text-muted-foreground">({d.source})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Tool Affinities */}
          <div className="mb-3">
            <span className="text-xs font-medium text-muted-foreground">Afinidades do GTD:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {AFFINITY_ALGORITHM.example.toolAffinities.map((a, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-1 rounded"
                  style={{
                    backgroundColor: a.direction === 1 ? '#10b98130' : '#ef444430',
                    color: a.direction === 1 ? '#10b981' : '#ef4444'
                  }}
                >
                  {a.driver}: {a.type} (w={a.weight})
                </span>
              ))}
            </div>
          </div>

          {/* Calculation Steps */}
          <div className="mb-3">
            <span className="text-xs font-medium text-muted-foreground">Calculo:</span>
            <div className="mt-1 space-y-1">
              {AFFINITY_ALGORITHM.example.calculation.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <OpsCode className="font-mono bg-muted/20 px-2 py-0.5 rounded text-foreground">
                    {c.step}
                  </OpsCode>
                  <span className="text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Resultado:</span>
              <span className="text-sm font-bold" style={{ color: OPS_ACCENT }}>
                {AFFINITY_ALGORITHM.example.result.score.toFixed(3)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {AFFINITY_ALGORITHM.example.result.interpretation}
            </p>
          </div>
        </div>

        {/* Aggregation Methods */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          {AFFINITY_ALGORITHM.aggregationMethods.map((m, i) => (
            <div key={i} className="p-2 rounded bg-muted/20 text-xs">
              <OpsCode className="font-bold" style={{ color: OPS_ACCENT }}>{m.method}</OpsCode>
              <p className="text-muted-foreground text-[10px] mt-1">{m.desc}</p>
              <p className="text-[10px] italic" style={{ color: OPS_PRIMARY }}>Uso: {m.useCase}</p>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
