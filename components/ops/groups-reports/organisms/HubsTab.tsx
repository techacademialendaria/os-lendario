import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SENTIMENT_COLORS } from '../types';
import { cn } from '../../../../lib/utils';

interface HubComparison {
  hub: string;
  registros: number;
  percentualPositivo: number;
  score: number;
  membrosUnicos: number;
}

interface HubsTabProps {
  hubComparison: HubComparison[];
}

function getScoreColor(score: number) {
  if (score >= 2) return 'text-green-600 bg-green-500/10';
  if (score >= 1) return 'text-emerald-600 bg-emerald-500/10';
  if (score >= 0) return 'text-amber-600 bg-amber-500/10';
  return 'text-red-600 bg-red-500/10';
}

export function HubsTab({ hubComparison }: HubsTabProps) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="pin-alt" className="size-5 text-primary" />
          Comparativo de Hubs Regionais
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Performance dos Hubs Lendarios por regiao
        </p>
      </CardHeader>
      <CardContent>
        {hubComparison.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum Hub regional encontrado
          </div>
        ) : (
          <>
            {/* Chart */}
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hubComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hub" fontSize={11} angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="percentualPositivo" name="% Positivo" fill={SENTIMENT_COLORS.positivo} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Hub</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Registros</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">% Positivo</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Membros</th>
                  </tr>
                </thead>
                <tbody>
                  {hubComparison.map((hub, index) => (
                    <tr key={hub.hub} className={cn(
                      "border-b border-border/50",
                      index === 0 && "bg-green-500/5"
                    )}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Icon name="trophy" className="size-4 text-amber-500" />}
                          <span className="font-medium">{hub.hub}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">{hub.registros}</td>
                      <td className="text-center py-3 px-4">
                        <Badge variant="outline" className={cn(
                          "rounded-full",
                          hub.percentualPositivo >= 60 ? "bg-green-500/10 text-green-600 border-green-500/30" :
                          hub.percentualPositivo >= 40 ? "bg-amber-500/10 text-amber-600 border-amber-500/30" :
                          "bg-red-500/10 text-red-600 border-red-500/30"
                        )}>
                          {hub.percentualPositivo}%
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className={cn("rounded-full", getScoreColor(hub.score))}>
                          {hub.score.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4 text-muted-foreground">{hub.membrosUnicos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
