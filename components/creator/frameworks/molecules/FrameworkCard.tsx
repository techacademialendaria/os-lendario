import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { STUDIO_PRIMARY } from '@/components/creator/studio-tokens';
import { CATEGORY_LABELS, CATEGORY_COLORS, type FrameworkCardProps } from '../types';

export const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, onClick }) => {
  const catColors = CATEGORY_COLORS[framework.frameworkType] || CATEGORY_COLORS.pedagogical;
  const isPedagogical = framework.frameworkType === 'pedagogical';

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all"
      style={{
        borderColor: isPedagogical ? `${STUDIO_PRIMARY}50` : undefined,
      }}
      onMouseEnter={(e) => {
        if (isPedagogical) {
          e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}80`;
        }
      }}
      onMouseLeave={(e) => {
        if (isPedagogical) {
          e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}50`;
        }
      }}
      onClick={onClick}
    >
      {/* Color Bar */}
      <div className="h-1 w-full" style={{ backgroundColor: framework.color }} />

      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-xl"
          style={{
            backgroundColor: `${framework.color}20`,
            borderColor: `${framework.color}30`,
          }}
        >
          <Icon
            name={framework.icon as any}
            size="size-5"
            style={{ color: framework.color }}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="mb-1 flex items-center gap-2">
            <CardTitle className="truncate text-base">{framework.name}</CardTitle>
          </div>
          <Badge
            className={cn('text-[10px]', catColors.bg, catColors.text, catColors.border)}
          >
            {CATEGORY_LABELS[framework.frameworkType] || framework.frameworkType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {framework.description}
        </p>

        {/* Steps Preview */}
        <div className="flex items-center gap-1 overflow-hidden">
          {framework.steps.slice(0, 4).map((step, i) => (
            <React.Fragment key={i}>
              <span className="truncate font-mono text-[10px] text-muted-foreground">
                {step.name}
              </span>
              {i < Math.min(framework.steps.length - 1, 3) && (
                <Icon
                  name="arrow-right"
                  size="size-3"
                  className="shrink-0 text-muted-foreground/50"
                />
              )}
            </React.Fragment>
          ))}
          {framework.steps.length > 4 && (
            <span className="text-[10px] text-muted-foreground">
              +{framework.steps.length - 4}
            </span>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{framework.steps.length} etapas</span>
          <span
            className="flex items-center gap-1 font-medium transition-colors"
            style={{
              color: isPedagogical ? STUDIO_PRIMARY : 'inherit',
            }}
          >
            Ver detalhes <Icon name="arrow-right" size="size-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
