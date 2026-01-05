import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsLabel } from '../../ops-ui';
import { MIU_STATISTICS } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const StatisticsCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={MIU_STATISTICS.title} />
    <OpsCardContent>
      <OpsText className="text-muted-foreground text-sm mb-6">{MIU_STATISTICS.description}</OpsText>

      {/* MIUs per Hour */}
      <div className="mb-6">
        <OpsLabel className="mb-3">{MIU_STATISTICS.perHour.title}</OpsLabel>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3" style={{ color: OPS_ACCENT }}>Fonte</th>
              <th className="text-left py-2 px-3 text-muted-foreground">Media MIUs</th>
              <th className="text-left py-2 px-3 text-muted-foreground hidden md:table-cell">Observacao</th>
            </tr>
          </thead>
          <tbody>
            {MIU_STATISTICS.perHour.data.map((row, i) => (
              <tr key={i} className="border-b border-border/30">
                <td className="py-2 px-3 text-foreground">{row.source}</td>
                <td className="py-2 px-3 font-mono" style={{ color: OPS_ACCENT }}>{row.avgMIUs}</td>
                <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validation Rates */}
      <div className="mb-6">
        <OpsLabel className="mb-3">{MIU_STATISTICS.validationRates.title}</OpsLabel>
        <div className="flex flex-wrap gap-4">
          {MIU_STATISTICS.validationRates.data.map((rate, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/20 text-center">
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  color: rate.color === 'green' ? '#22c55e' :
                    rate.color === 'red' ? '#ef4444' : '#eab308'
                }}
              >
                {rate.value}
              </div>
              <div className="text-xs text-muted-foreground">{rate.metric}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Patterns */}
      <div className="mb-6">
        <OpsLabel className="mb-3">{MIU_STATISTICS.commonPatterns.title}</OpsLabel>
        <OpsGrid columns={3}>
          {MIU_STATISTICS.commonPatterns.data.map((p, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{p.pattern}</span>
              <span className="text-sm font-mono" style={{ color: OPS_ACCENT }}>{p.frequency}</span>
            </div>
          ))}
        </OpsGrid>
      </div>

      {/* Processing Time */}
      <div>
        <OpsLabel className="mb-3">{MIU_STATISTICS.processingTime.title}</OpsLabel>
        <OpsGrid columns={3}>
          <div className="p-3 rounded-lg bg-muted/20 border-l-2 border-blue-500">
            <div className="text-xs text-blue-400 uppercase mb-1">Manual</div>
            <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.manual}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20 border-l-2 border-purple-500">
            <div className="text-xs text-purple-400 uppercase mb-1">AI-Assisted</div>
            <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.assisted}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
            <div className="text-xs uppercase mb-1" style={{ color: OPS_ACCENT }}>Automated</div>
            <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.automated}</div>
          </div>
        </OpsGrid>
      </div>
    </OpsCardContent>
  </OpsCard>
);
