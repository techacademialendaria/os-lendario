import React from 'react';
import { Icon } from '../../../ui/icon';
import { TOOL_RELATIONS } from '../../data/tool-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';

export const RelationsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={TOOL_RELATIONS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{TOOL_RELATIONS.description}</OpsText>

        <div className="space-y-4">
          {TOOL_RELATIONS.relationTypes.map((rel, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: rel.color }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={rel.icon} size="size-4" style={{ color: rel.color }} />
                <OpsCode className="text-xs font-bold" style={{ color: rel.color }}>{rel.type}</OpsCode>
                <span className="text-xs text-muted-foreground">- {rel.description}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {rel.examples.map((ex, j) => (
                  <div key={j} className="p-2 rounded bg-muted/20">
                    <p className="text-xs text-foreground">
                      {'tool' in ex && 'derivedFrom' in ex && (
                        <><span className="font-medium">{ex.tool}</span> {'<-'} {ex.derivedFrom}</>
                      )}
                      {'tool' in ex && 'requires' in ex && (
                        <><span className="font-medium">{ex.tool}</span> {'<-'} {ex.requires}</>
                      )}
                      {'tools' in ex && (
                        <span className="font-medium">{(ex as { tools: string[] }).tools.join(' + ')}</span>
                      )}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">{ex.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
