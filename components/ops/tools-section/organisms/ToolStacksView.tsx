import React from 'react';
import { Icon } from '../../../ui/icon';
import { TOOL_STACKS } from '../../data/tool-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';

interface ToolStacksViewProps {
  expandedStack: string | null;
  onToggleStack: (stackName: string) => void;
}

export const ToolStacksView: React.FC<ToolStacksViewProps> = ({
  expandedStack,
  onToggleStack
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={TOOL_STACKS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{TOOL_STACKS.description}</OpsText>

        <OpsGrid columns={3}>
          {TOOL_STACKS.stacks.map((stack, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-muted/20 border-l-4 cursor-pointer transition-all hover:bg-muted/30"
              style={{ borderColor: stack.color }}
              onClick={() => onToggleStack(stack.name)}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name={stack.icon} size="size-4" style={{ color: stack.color }} />
                <h4 className="font-bold text-sm" style={{ color: stack.color }}>{stack.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{stack.subtitle}</p>

              <div className="text-[10px] text-muted-foreground mb-2">
                <span className="font-medium">Perfil ideal:</span> {stack.idealProfile}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {stack.tools.map((tool, j) => (
                  <span
                    key={j}
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: stack.color + '30', color: stack.color }}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>

              {expandedStack === stack.name && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <div>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Funcao de cada tool:
                    </span>
                    <div className="mt-1 space-y-1">
                      {stack.tools.map((tool, j) => (
                        <div key={j} className="text-[10px]">
                          <span className="font-medium">{tool.name}:</span>
                          <span className="text-muted-foreground ml-1">{tool.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-muted-foreground">Sinergia:</span>
                    <p className="text-[10px] text-foreground mt-0.5">{stack.synergy}</p>
                  </div>
                  <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
                    <span className="text-[10px] font-medium text-yellow-500">Atencao:</span>
                    <p className="text-[10px] text-yellow-400/80 mt-0.5">{stack.warning}</p>
                  </div>
                </div>
              )}

              <div className="text-[9px] text-muted-foreground mt-2 text-right">
                {expandedStack === stack.name ? 'Clique para fechar' : 'Clique para expandir'}
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
