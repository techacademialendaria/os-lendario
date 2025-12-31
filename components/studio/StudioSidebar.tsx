import React from 'react';
import { Icon } from '../ui/icon';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { STUDIO_STATUS, STUDIO_PRIMARY, type PipelineStep } from './studio-tokens';

// =============================================================================
// TYPES
// =============================================================================

export interface StudioSidebarProps {
  /** Título do projeto/curso */
  title: string;
  /** Subtítulo opcional */
  subtitle?: string;
  /** Steps do pipeline */
  pipeline: PipelineStep[];
  /** Step atual (key) */
  currentStep: string;
  /** Callback ao clicar em um step */
  onStepClick: (stepKey: string) => void;
  /** Callback ao clicar em voltar */
  onBack: () => void;
  /** Texto do botão voltar */
  backLabel?: string;
  /** Mostrar indicador de auto-save */
  showAutoSave?: boolean;
  /** Timestamp do último save */
  lastSaved?: Date | null;
  /** Está salvando? */
  isSaving?: boolean;
  /** Altura customizada (default: calc(100vh - 64px)) */
  height?: string;
  /** Cor primária customizada */
  primaryColor?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  title,
  subtitle,
  pipeline,
  currentStep,
  onStepClick,
  onBack,
  backLabel = 'Voltar',
  showAutoSave = true,
  lastSaved,
  isSaving = false,
  height = 'calc(100vh - 64px)',
  primaryColor = STUDIO_PRIMARY,
}) => {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `há ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `há ${diffHours}h`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div
      className="flex w-64 shrink-0 flex-col border-r border-border bg-card/50"
      style={{ height }}
    >
      {/* Header */}
      <div className="border-b border-border p-4">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="arrow-left" size="size-3" />
          <span>{backLabel}</span>
        </button>
        <h3 className="truncate font-bold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Pipeline Steps */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Pipeline
          </p>
          {pipeline.map((step) => {
            const statusConfig = STUDIO_STATUS[step.status];
            const isActive = currentStep === step.key;
            const isClickable = step.status !== 'pending';

            return (
              <button
                key={step.key}
                onClick={() => isClickable && onStepClick(step.key)}
                disabled={!isClickable}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all',
                  isActive
                    ? 'font-medium'
                    : step.status === 'pending'
                      ? 'cursor-not-allowed text-muted-foreground/50'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                style={
                  isActive
                    ? {
                      color: primaryColor,
                      backgroundColor: `${primaryColor}20`,
                    }
                    : undefined
                }
              >
                <Icon
                  name={statusConfig.icon}
                  size="size-4"
                  className={cn(
                    step.status === 'complete' && 'text-emerald-500',
                    step.status === 'current' && 'text-primary',
                    step.status === 'pending' && 'text-muted-foreground/40'
                  )}
                  type={step.status === 'complete' ? 'solid' : 'regular'}
                />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Auto-save indicator */}
      {showAutoSave && (
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Icon name="refresh" size="size-3" className="animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Icon name="clock" size="size-3" />
                <span>Auto-save ativo</span>
              </>
            )}
          </div>
          {lastSaved && !isSaving && (
            <p className="text-[10px] text-muted-foreground">
              Última alteração: {formatLastSaved(lastSaved)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudioSidebar;
