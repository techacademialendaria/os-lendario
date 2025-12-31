import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { ScrollArea } from '../../ui/scroll-area';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '../../ui/dropdown-menu';
import { cn } from '../../../lib/utils';
import {
  getRelevanceColor,
  getRelevanceLabel,
  getConfidenceColor,
  confidenceToPercent,
} from '../../../lib/fragment-utils';
import {
  MindFragment,
  FragmentUpdate,
  FRAGMENT_TYPE_LABELS,
  FRAGMENT_TYPE_ICONS,
  FRAGMENT_TYPE_COLORS,
} from '../../../hooks/useMindFragments';
import { FragmentRelationships } from './FragmentRelationships';
import { FragmentEditForm } from './FragmentEditForm';

interface FragmentDetailPanelProps {
  fragment: MindFragment | null;
  onUpdate: (id: string, updates: FragmentUpdate) => Promise<boolean>;
  onDelete: (id: string) => void;
  onNavigateToFragment: (fragmentId: string) => void;
}

export const FragmentDetailPanel: React.FC<FragmentDetailPanelProps> = ({
  fragment,
  onUpdate,
  onDelete,
  onNavigateToFragment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!fragment) return;

    const text = `${fragment.content}\n\nContexto: ${fragment.context}\n\nInsight: ${fragment.insight}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (updates: FragmentUpdate) => {
    if (!fragment) return;

    setIsSaving(true);
    const success = await onUpdate(fragment.id, updates);
    setIsSaving(false);

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Empty state
  if (!fragment) {
    return (
      <Card className="flex-1 rounded-xl border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4 border border-border">
              <Icon name="box" size="size-8" className="opacity-30" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Selecione um fragmento para visualizar</p>
          </div>
        </div>
      </Card>
    );
  }

  const confidencePercent = confidenceToPercent(fragment.confidence);

  return (
    <Card className="flex-1 rounded-xl border-border bg-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="py-3 px-5 border-b border-border/50 bg-black/20 flex items-start justify-between shrink-0">
        <div className="space-y-2 flex-1">
          {/* Type and badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
              <Icon
                name={FRAGMENT_TYPE_ICONS[fragment.type] || 'file'}
                size="size-3"
                className={FRAGMENT_TYPE_COLORS[fragment.type]}
              />
              <span>{FRAGMENT_TYPE_LABELS[fragment.type] || fragment.type}</span>
            </div>
            <span className="opacity-30">|</span>
            <Badge
              variant="outline"
              className={cn("text-[10px] h-4 px-1.5 border-0", getRelevanceColor(fragment.relevance))}
            >
              Relevância {fragment.relevance}/10 ({getRelevanceLabel(fragment.relevance)})
            </Badge>
          </div>

          {/* Confidence bar */}
          {fragment.confidence !== undefined && fragment.confidence > 0 && (
            <div className="flex items-center gap-2 max-w-xs">
              <span className="text-[10px] text-muted-foreground font-mono">Confiança:</span>
              <Progress
                value={confidencePercent}
                max={100}
                className="h-1.5 flex-1 bg-white/5"
                indicatorClassName={getConfidenceColor(fragment.confidence)}
              />
              <span className="text-[10px] text-muted-foreground font-mono">
                {Math.round(confidencePercent)}%
              </span>
            </div>
          )}

          {/* Source */}
          {fragment.contentTitle && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Icon name="document" size="size-3" />
              Fonte: {fragment.contentTitle}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {!isEditing ? (
            <DropdownMenu
              align="end"
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/20">
                  <Icon name="menu-dots-vertical" size="size-4" />
                </Button>
              }
            >
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy}>
                <Icon name={copied ? 'check' : 'copy'} className="mr-2 h-4 w-4" />
                {copied ? 'Copiado!' : 'Copiar'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive onClick={() => onDelete(fragment.id)}>
                <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenu>
          ) : (
            <div className="text-xs text-muted-foreground">
              Modo de edição
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <CardContent className="pt-6 pb-20 space-y-6">
          {isEditing ? (
            <FragmentEditForm
              fragment={fragment}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          ) : (
            <>
              {/* Content Section */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="quote-right" size="size-3" />
                  Conteúdo
                </h4>
                <blockquote className="border-l-2 border-brand-gold/50 pl-4 py-2 bg-brand-gold/5 rounded-r text-sm text-foreground/90 italic">
                  "{fragment.content}"
                </blockquote>
              </div>

              {/* Context Section */}
              {fragment.context && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Icon name="info" size="size-3" />
                    Contexto
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fragment.context}
                  </p>
                </div>
              )}

              {/* Insight Section */}
              {fragment.insight && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Icon name="lightbulb" size="size-3" />
                    Insight
                  </h4>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-foreground leading-relaxed">
                      {fragment.insight}
                    </p>
                  </div>
                </div>
              )}

              {/* Relationships Section */}
              <div className="pt-4 border-t border-white/5">
                <FragmentRelationships
                  fragmentId={fragment.id}
                  onNavigate={onNavigateToFragment}
                />
              </div>

              {/* Metadata Section */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="database" size="size-3" />
                  Metadados
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 rounded bg-muted/20">
                    <span className="text-muted-foreground">Localização:</span>
                    <span className="ml-2 font-mono">{fragment.location}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/20">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="ml-2 font-mono text-[10px]">{fragment.id.slice(0, 8)}...</span>
                  </div>
                  <div className="p-2 rounded bg-muted/20 col-span-2">
                    <span className="text-muted-foreground">Extraído em:</span>
                    <span className="ml-2 font-mono">
                      {new Date(fragment.createdAt).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {fragment.updatedAt && fragment.updatedAt !== fragment.createdAt && (
                    <div className="p-2 rounded bg-muted/20 col-span-2">
                      <span className="text-muted-foreground">Atualizado em:</span>
                      <span className="ml-2 font-mono">
                        {new Date(fragment.updatedAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  )}
                  {fragment.metadata && Object.keys(fragment.metadata).length > 0 && (
                    <div className="p-2 rounded bg-muted/20 col-span-2">
                      <span className="text-muted-foreground block mb-1">Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        {(fragment.metadata.tags as string[] || []).map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[9px] h-4 px-1.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {(!fragment.metadata.tags || (fragment.metadata.tags as string[]).length === 0) && (
                          <span className="text-muted-foreground/50 text-[10px]">Nenhuma tag</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default FragmentDetailPanel;
