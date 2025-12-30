import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { useGroups } from '../../../hooks/useGroups';
import { GroupCard } from './GroupCard';
import { OpsGrid } from '../ops-ui';

interface GroupsOverviewProps {
  onGroupSelect: (groupName: string) => void;
  onNavigateToReports?: () => void;
  filterSentiment?: 'positivo' | 'neutro' | 'negativo';
}

export function GroupsOverview({ onGroupSelect, onNavigateToReports, filterSentiment }: GroupsOverviewProps) {
  const { groupsSummary, loading, error, refresh } = useGroups();

  // Filtra grupos por sentimento se necessário
  const filteredGroups = useMemo(() => {
    if (!filterSentiment) return groupsSummary;
    return groupsSummary.filter(g => {
      const sentiment = g.lastSentiment?.toLowerCase();
      if (filterSentiment === 'neutro') {
        return sentiment === 'neutro' || sentiment === 'misto';
      }
      return sentiment === filterSentiment;
    });
  }, [groupsSummary, filterSentiment]);

  // Título baseado no filtro
  const gridTitle = filterSentiment
    ? `Grupos ${filterSentiment === 'positivo' ? 'Positivos' : filterSentiment === 'negativo' ? 'Negativos' : 'Neutros'}`
    : 'Todos os Grupos';

  // Calculate overall stats
  const stats = useMemo(() => {
    const total = groupsSummary.length;
    const positive = groupsSummary.filter(
      g => g.lastSentiment?.toLowerCase() === 'positivo'
    ).length;
    const negative = groupsSummary.filter(
      g => g.lastSentiment?.toLowerCase() === 'negativo'
    ).length;
    const neutral = groupsSummary.filter(
      g =>
        g.lastSentiment?.toLowerCase() === 'neutro' ||
        g.lastSentiment?.toLowerCase() === 'misto'
    ).length;
    const withComplaints = groupsSummary.filter(g => g.hasComplaints).length;
    const totalMembers = groupsSummary.reduce((sum, g) => sum + g.memberCount, 0);

    return { total, positive, negative, neutral, withComplaints, totalMembers };
  }, [groupsSummary]);

  // Esconde header e KPIs quando há filtro (template já mostra o header)
  const showFullDashboard = !filterSentiment;

  return (
    <div className="space-y-8">
      {/* Header - Only show in full dashboard mode */}
      {showFullDashboard && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Dashboard de Grupos
              </h1>
              <p className="text-muted-foreground text-sm">
                Visão geral da saúde e engajamento dos grupos da Academia Lendária
              </p>
            </div>
            {onNavigateToReports && (
              <button
                onClick={onNavigateToReports}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Icon name="stats-report" className="size-4" />
                Ver Relatórios
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* KPI Cards - Only show in full dashboard mode */}
      {showFullDashboard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <OpsGrid columns={4}>
            {/* Total Groups */}
            <Card className="rounded-2xl border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon name="layout-grid" className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Grupos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Positive */}
            <Card className="rounded-2xl border-green-500/20 bg-green-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <Icon name="graph-up" className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.positive}</p>
                    <p className="text-xs text-muted-foreground">Positivos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Negative */}
            <Card className="rounded-2xl border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/20">
                    <Icon name="graph-down" className="size-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{stats.negative}</p>
                    <p className="text-xs text-muted-foreground">Negativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neutral/Mixed */}
            <Card className="rounded-2xl border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20">
                    <Icon name="activity" className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{stats.neutral}</p>
                    <p className="text-xs text-muted-foreground">Neutros/Mistos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </OpsGrid>

          {/* Complaints alert if any */}
          {stats.withComplaints > 0 && (
            <div className="mt-4">
              <Card className="rounded-2xl border-orange-500/20 bg-orange-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-orange-500/20">
                      <Icon name="warning-triangle" className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600">
                        {stats.withComplaints} grupo{stats.withComplaints > 1 ? 's' : ''} com reclamações
                      </p>
                      <p className="text-xs text-muted-foreground">Requerem atenção</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      )}

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{gridTitle}</h2>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="rounded-full">
              {filteredGroups.length} grupos
            </Badge>
            <button
              onClick={refresh}
              disabled={loading}
              className="p-2 hover:bg-muted/50 rounded-lg transition-colors disabled:opacity-50"
              title="Recarregar dados"
            >
              <Icon name="refresh-double" className={`size-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loading && !filteredGroups.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="h-48 rounded-3xl animate-pulse bg-muted/50" />
            ))}
          </div>
        ) : error ? (
          <Card className="rounded-3xl border-destructive/50 bg-destructive/5">
            <CardContent className="py-12 text-center">
              <Icon name="warning-triangle" className="size-8 text-destructive mx-auto mb-3" />
              <p className="text-destructive font-medium">{error}</p>
              <button
                onClick={refresh}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Tentar novamente
              </button>
            </CardContent>
          </Card>
        ) : filteredGroups.length === 0 ? (
          <Card className="rounded-3xl">
            <CardContent className="py-16 text-center">
              <Icon name="layout-grid" className="size-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filterSentiment ? `Nenhum grupo ${filterSentiment}` : 'Nenhum grupo disponível'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGroups.map((group, index) => (
              <GroupCard
                key={group.grupo}
                group={group}
                onClick={onGroupSelect}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
