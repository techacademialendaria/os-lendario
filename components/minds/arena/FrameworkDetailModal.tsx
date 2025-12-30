import React from 'react';
import { DebateFramework } from '../../../services/frameworkService';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';

interface FrameworkDetailModalProps {
  framework: DebateFramework | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectFramework?: (framework: DebateFramework) => void;
}

export const FrameworkDetailModal: React.FC<FrameworkDetailModalProps> = ({
  framework,
  isOpen,
  onClose,
  onSelectFramework,
}) => {
  if (!isOpen || !framework) return null;

  const schema = framework.framework_schema;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{framework.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{framework.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="cross" className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-accent/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="users-alt" className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Participantes</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {schema.participants
                  ? `${schema.participants.min}-${schema.participants.max}`
                  : '2'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-accent/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Rounds</span>
              </div>
              <p className="text-lg font-bold text-foreground">{schema.rounds || 'N/A'}</p>
            </div>

            <div className="rounded-lg border border-border bg-accent/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="target" className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Complexidade</span>
              </div>
              <p className="text-lg font-bold text-foreground">{schema.complexity || 'Média'}</p>
            </div>

            <div className="rounded-lg border border-border bg-accent/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="award" className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Dimensões</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {schema.scoring_dimensions?.length || 0}
              </p>
            </div>
          </div>

          {/* Roles Section */}
          {schema.roles && schema.roles.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Icon name="users-alt" className="h-5 w-5 text-primary" />
                Papéis no Debate
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {schema.roles.map((role, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-accent/30 p-4">
                    <p className="font-semibold text-foreground">{role.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structure Section */}
          {schema.structure && schema.structure.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Icon name="play-circle" className="h-5 w-5 text-primary" />
                Estrutura do Debate
              </h3>
              <div className="space-y-2">
                {schema.structure.map((round, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-lg border border-border bg-accent/30 p-4"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {round.round}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-semibold capitalize text-foreground">
                          {round.type.replace(/_/g, ' ')}
                        </span>
                        {round.duration_seconds && (
                          <span className="rounded bg-accent px-2 py-1 text-xs text-muted-foreground">
                            {Math.floor(round.duration_seconds / 60)}:
                            {String(round.duration_seconds % 60).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{round.purpose}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        <strong>Orador:</strong> {round.speaker}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scoring Dimensions */}
          {schema.scoring_dimensions && schema.scoring_dimensions.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Icon name="award" className="h-5 w-5 text-primary" />
                Critérios de Avaliação
              </h3>
              <div className="space-y-2">
                {schema.scoring_dimensions.map((dim, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-accent/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-foreground">{dim.description}</span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {(dim.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-accent">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${dim.weight * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best For */}
          {schema.best_for && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm">
                <span className="font-semibold text-foreground">Melhor para:</span>{' '}
                <span className="text-muted-foreground">{schema.best_for}</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-6">
          <button
            onClick={onClose}
            className="rounded-lg bg-accent px-6 py-2 font-medium text-foreground transition-colors hover:bg-accent/80"
          >
            Fechar
          </button>
          {onSelectFramework && (
            <button
              onClick={() => {
                onSelectFramework(framework);
                onClose();
              }}
              className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Usar Este Framework
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
