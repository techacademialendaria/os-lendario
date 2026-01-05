import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { SENTIMENT_COLORS, PIE_COLORS } from '../types';
import type { SentimentPieDataItem, GroupBarDataItem } from '../types';

interface SentimentTrendItem {
  data: string;
  positivo: number;
  misto: number;
  neutro: number;
  negativo: number;
}

interface OverviewTabProps {
  sentimentPieData: SentimentPieDataItem[];
  sentimentTrend: SentimentTrendItem[];
  groupBarData: GroupBarDataItem[];
}

export function OverviewTab({ sentimentPieData, sentimentTrend, groupBarData }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-3xl border-border h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="activity" className="size-5 text-primary" />
                Distribuicao de Sentimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={sentimentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {sentimentPieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Evolution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-3xl border-border h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="calendar" className="size-5 text-primary" />
                Evolucao Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={sentimentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="data"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="positivo" stackId="1" stroke={SENTIMENT_COLORS.positivo} fill={SENTIMENT_COLORS.positivo} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="misto" stackId="1" stroke={SENTIMENT_COLORS.misto} fill={SENTIMENT_COLORS.misto} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="neutro" stackId="1" stroke={SENTIMENT_COLORS.neutro} fill={SENTIMENT_COLORS.neutro} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="negativo" stackId="1" stroke={SENTIMENT_COLORS.negativo} fill={SENTIMENT_COLORS.negativo} fillOpacity={0.6} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top 10 Groups by Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="rounded-3xl border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="stats-report" className="size-5 text-primary" />
              Score de Saude dos Grupos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={groupBarData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" fontSize={10} />
                <YAxis type="category" dataKey="name" width={150} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
