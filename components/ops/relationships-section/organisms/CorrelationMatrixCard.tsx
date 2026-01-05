import React from 'react';
import { cn } from '@/lib/utils';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';
import { getCorrelationColor, getCorrelationBg } from '../utils';
import type { CorrelationMatrixCardProps } from '../types';

export const CorrelationMatrixCard: React.FC<CorrelationMatrixCardProps> = ({
  title,
  desc,
  drivers,
  matrix
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 leading-relaxed">{desc}</OpsText>
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-sm border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="p-3"></th>
                {drivers.map((d, i) => (
                  <th key={i} className="p-2 text-center min-w-[80px]">
                    <div className="font-bold text-base" style={{ color: OPS_ACCENT }}>{d.abbrev}</div>
                    <div className="text-[10px] text-muted-foreground font-normal mt-1">{d.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map((rowDriver, i) => (
                <tr key={i}>
                  <td className="p-3 text-right sticky left-0 bg-card z-10">
                    <div className="font-bold whitespace-nowrap" style={{ color: OPS_ACCENT }}>{rowDriver.abbrev}</div>
                    <div className="text-[10px] text-muted-foreground ml-1 hidden sm:block">{rowDriver.name}</div>
                  </td>
                  {matrix[i].map((r, j) => (
                    <td key={j} className="p-1 text-center">
                      <div
                        className={cn(
                          "h-10 flex items-center justify-center rounded font-mono text-xs transition-transform hover:scale-105 cursor-default",
                          i === j ? 'bg-muted/30 border border-white/5' : `${getCorrelationBg(r)} border border-transparent`
                        )}
                        style={{
                          color: i === j ? '#6b7280' : getCorrelationColor(r),
                          opacity: i === j ? 0.5 : 1
                        }}
                        title={`${rowDriver.name} x ${drivers[j].name}: ${r.toFixed(2)}`}
                      >
                        {r === 1 ? '\u00B7' : r.toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-[10px] text-muted-foreground/70 px-4 py-2 bg-muted/20 rounded-full italic">
            Diagonal = 1.0 (auto-correlacao) &#8226; Verde = positiva &#8226; Vermelho = negativa &#8226; Cinza = neutra/baixa
          </p>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
