import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { ScrollArea } from '../../ui/scroll-area';
import { Icon } from '../../ui/icon';
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
import { useGeneralReports } from '../../../hooks/useGeneralReports';
import { cn } from '../../../lib/utils';
import { OpsGrid } from '../ops-ui';

interface GroupsReportsProps {
  onBack: () => void;
}

const SENTIMENT_COLORS = {
  positivo: '#22c55e',
  misto: '#f59e0b',
  neutro: '#6b7280',
  negativo: '#ef4444',
};

const PIE_COLORS = ['#22c55e', '#f59e0b', '#6b7280', '#ef4444'];

export function GroupsReports({ onBack }: GroupsReportsProps) {
  const {
    generalStats,
    memberRanking,
    groupHealthScores,
    complaints,
    hubComparison,
    sentimentTrend,
    loading,
    error,
  } = useGeneralReports();

  const [activeTab, setActiveTab] = useState('overview');

  // Data for sentiment pie chart
  const sentimentPieData = useMemo(() => [
    { name: 'Positivo', value: generalStats.sentimentos.positivo, color: SENTIMENT_COLORS.positivo },
    { name: 'Misto', value: generalStats.sentimentos.misto, color: SENTIMENT_COLORS.misto },
    { name: 'Neutro', value: generalStats.sentimentos.neutro, color: SENTIMENT_COLORS.neutro },
    { name: 'Negativo', value: generalStats.sentimentos.negativo, color: SENTIMENT_COLORS.negativo },
  ], [generalStats]);

  // Data for group bar chart
  const groupBarData = useMemo(() => {
    return groupHealthScores.slice(0, 10).map(g => ({
      name: g.grupo.length > 20 ? g.grupo.substring(0, 18) + '...' : g.grupo,
      score: g.score,
      positivo: g.positivo,
      negativo: g.negativo,
    }));
  }, [groupHealthScores]);

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Icon name="trophy" className="size-5 text-amber-500" />;
    if (index === 1) return <Icon name="medal" className="size-5 text-gray-400" />;
    if (index === 2) return <Icon name="medal" className="size-5 text-amber-700" />;
    return <span className="w-5 h-5 flex items-center justify-center text-xs text-muted-foreground">{index + 1}</span>;
  };

  const getTrendIcon = (tendencia: string) => {
    if (tendencia === 'up') return <Icon name="graph-up" className="size-4 text-green-500" />;
    if (tendencia === 'down') return <Icon name="graph-down" className="size-4 text-red-500" />;
    return <Icon name="minus" className="size-4 text-gray-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 2) return 'text-green-600 bg-green-500/10';
    if (score >= 1) return 'text-emerald-600 bg-emerald-500/10';
    if (score >= 0) return 'text-amber-600 bg-amber-500/10';
    return 'text-red-600 bg-red-500/10';
  };

  // Progress bar component (inline for simplicity)
  const ProgressBar = ({ value, className }: { value: number; className?: string }) => (
    <div className={cn("w-16 h-1.5 bg-muted rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Carregando relatórios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="arrow-left" className="size-4" />
          Voltar
        </button>
        <Card className="rounded-3xl border-destructive/50 bg-destructive/5">
          <CardContent className="py-12 text-center">
            <Icon name="warning-triangle" className="size-8 text-destructive mx-auto mb-3" />
            <p className="text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <Icon name="arrow-left" className="size-4" />
          Voltar para Dashboard
        </button>
        <div className="flex items-center gap-3">
          <Icon name="stats-report" className="size-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Relatórios Gerais
            </h1>
            <p className="text-muted-foreground text-sm">
              Análise consolidada de {generalStats.totalGrupos} grupos | {generalStats.periodoInicio} até {generalStats.periodoFim}
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <OpsGrid columns={5}>
          <Card className="rounded-2xl border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Icon name="page" className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{generalStats.totalRegistros}</p>
                  <p className="text-xs text-muted-foreground">Registros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <Icon name="group" className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{generalStats.totalMembrosUnicos}</p>
                  <p className="text-xs text-muted-foreground">Membros Únicos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-green-500/20 bg-green-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/20">
                  <Icon name="graph-up" className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{generalStats.sentimentos.positivo}</p>
                  <p className="text-xs text-muted-foreground">Positivos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-red-500/20 bg-red-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/20">
                  <Icon name="graph-down" className="size-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{generalStats.sentimentos.negativo}</p>
                  <p className="text-xs text-muted-foreground">Negativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/20">
                  <Icon name="warning-triangle" className="size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{complaints.length}</p>
                  <p className="text-xs text-muted-foreground">Reclamações</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </OpsGrid>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList variant="outline" className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview" className="gap-2">
            <Icon name="activity" className="size-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Icon name="group" className="size-4" />
            <span className="hidden sm:inline">Membros</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Icon name="heart" className="size-4" />
            <span className="hidden sm:inline">Saúde</span>
          </TabsTrigger>
          <TabsTrigger value="hubs" className="gap-2">
            <Icon name="pin-alt" className="size-4" />
            <span className="hidden sm:inline">Hubs</span>
          </TabsTrigger>
          <TabsTrigger value="complaints" className="gap-2">
            <Icon name="chat-bubble" className="size-4" />
            <span className="hidden sm:inline">Reclamações</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment Distribution */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="rounded-3xl border-border h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="activity" className="size-5 text-primary" />
                    Distribuição de Sentimentos
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
                    Evolução Semanal
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
                  Score de Saúde dos Grupos
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
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card className="rounded-3xl border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="trophy" className="size-5 text-primary" />
                Ranking de Membros Mais Ativos
                <Badge variant="outline" className="ml-2">{memberRanking.length} membros</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Participação consolidada em todos os grupos
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 pr-4">
                  {memberRanking.slice(0, 50).map((member, index) => (
                    <motion.div
                      key={member.nome}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl transition-colors",
                        index < 3 ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {getMedalIcon(index)}
                        <div>
                          <span className="font-medium text-foreground">{member.nome}</span>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {member.grupos.slice(0, 3).map((grupo, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px] rounded-full">
                                {grupo.length > 15 ? grupo.substring(0, 13) + '...' : grupo}
                              </Badge>
                            ))}
                            {member.grupos.length > 3 && (
                              <Badge variant="secondary" className="text-[10px] rounded-full">
                                +{member.grupos.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="rounded-full bg-green-500/20 text-green-600 border-green-500/30 border">
                          {member.participacoes}x
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {member.grupos.length} grupo{member.grupos.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card className="rounded-3xl border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="heart" className="size-5 text-primary" />
                Score de Saúde por Grupo
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Fórmula: (positivo × 3) + (misto × 1) + (neutro × 0) + (negativo × -5) / total
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
        </TabsContent>

        {/* Hubs Tab */}
        <TabsContent value="hubs" className="space-y-6">
          <Card className="rounded-3xl border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="pin-alt" className="size-5 text-primary" />
                Comparativo de Hubs Regionais
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Performance dos Hubs Lendários por região
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
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-6">
          <Card className="rounded-3xl border-red-500/30 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="warning-triangle" className="size-5 text-red-500" />
                Painel de Reclamações
                <Badge variant="destructive" className="ml-2">{complaints.length}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Todas as reclamações identificadas nos grupos
              </p>
            </CardHeader>
            <CardContent>
              {complaints.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma reclamação identificada
                </div>
              ) : (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4 pr-4">
                    {complaints.map((complaint, index) => (
                      <motion.div
                        key={`${complaint.grupo}-${complaint.data}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="p-4 rounded-2xl border border-red-500/20 bg-card hover:border-red-500/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge variant="outline" className="rounded-full text-xs">
                            {complaint.grupo}
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs bg-red-500/10 text-red-600 border-red-500/30">
                            <Icon name="calendar" className="size-3 mr-1" />
                            {complaint.data}
                          </Badge>
                          <Badge variant="outline" className={cn(
                            "rounded-full text-xs capitalize",
                            complaint.sentimento?.toLowerCase() === 'negativo' ? "bg-red-500/10 text-red-600 border-red-500/30" :
                            complaint.sentimento?.toLowerCase() === 'positivo' ? "bg-green-500/10 text-green-600 border-green-500/30" :
                            "bg-amber-500/10 text-amber-600 border-amber-500/30"
                          )}>
                            {complaint.sentimento}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {complaint.texto}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
