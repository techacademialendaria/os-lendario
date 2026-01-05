import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';

interface GroupHealthScore {
  grupo: string;
  score: number;
  positivo: number;
  misto: number;
  neutro: number;
  negativo: number;
  totalRegistros: number;
  tendencia: string;
}

interface HealthTabProps {
  groupHealthScores: GroupHealthScore[];
}

function getTrendIcon(tendencia: string) {
  if (tendencia === 'up') return <Icon name="graph-up" className="size-4 text-green-500" />;
  if (tendencia === 'down') return <Icon name="graph-down" className="size-4 text-red-500" />;
  return <Icon name="minus" className="size-4 text-gray-400" />;
}

function getScoreColor(score: number) {
  if (score >= 2) return 'text-green-600 bg-green-500/10';
  if (score >= 1) return 'text-emerald-600 bg-emerald-500/10';
  if (score >= 0) return 'text-amber-600 bg-amber-500/10';
  return 'text-red-600 bg-red-500/10';
}

function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("w-16 h-1.5 bg-muted rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function HealthTab({ groupHealthScores }: HealthTabProps) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="heart" className="size-5 text-primary" />
          Score de Saude por Grupo
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Formula: (positivo x 3) + (misto x 1) + (neutro x 0) + (negativo x -5) / total
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupHealthScores.map((group, index) => (
            <motion.div
              key={group.grupo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className={cn(
                "rounded-2xl border transition-all hover:shadow-lg",
                group.score < 0 ? "border-red-500/30 bg-red-500/5" : "border-border"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground truncate pr-2">
                        {group.grupo}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {group.totalRegistros} registros
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(group.tendencia)}
                      <Badge className={cn("rounded-full text-sm font-bold", getScoreColor(group.score))}>
                        {group.score.toFixed(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="flex-1">Positivo</span>
                      <span className="font-medium">{group.positivo}</span>
                      <ProgressBar value={(group.positivo / group.totalRegistros) * 100} />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="flex-1">Misto</span>
                      <span className="font-medium">{group.misto}</span>
                      <ProgressBar value={(group.misto / group.totalRegistros) * 100} />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <span className="flex-1">Neutro</span>
                      <span className="font-medium">{group.neutro}</span>
                      <ProgressBar value={(group.neutro / group.totalRegistros) * 100} />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="flex-1">Negativo</span>
                      <span className="font-medium">{group.negativo}</span>
                      <ProgressBar value={(group.negativo / group.totalRegistros) * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
