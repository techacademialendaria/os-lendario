import { Card, CardContent } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Icon } from '../../ui/icon';
import { useGeneralReports } from '../../../hooks/useGeneralReports';
import { useGroupsReportsTab, useChartData } from './hooks';
import {
  ReportsHeader,
  KpiCards,
  OverviewTab,
  MembersTab,
  HealthTab,
  HubsTab,
  ComplaintsTab,
} from './organisms';
import type { GroupsReportsProps } from './types';

/**
 * GroupsReports - Dashboard for consolidated group reports
 *
 * Refactored from 659 lines to ~100 lines (85% reduction)
 * Following Atomic Design: hooks + organisms pattern
 */
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

  const { activeTab, setActiveTab } = useGroupsReportsTab();
  const { sentimentPieData, groupBarData } = useChartData({ generalStats, groupHealthScores });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Carregando relatorios...</div>
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
      <ReportsHeader
        onBack={onBack}
        totalGrupos={generalStats.totalGrupos}
        periodoInicio={generalStats.periodoInicio}
        periodoFim={generalStats.periodoFim}
      />

      <KpiCards
        totalRegistros={generalStats.totalRegistros}
        totalMembrosUnicos={generalStats.totalMembrosUnicos}
        positivos={generalStats.sentimentos.positivo}
        negativos={generalStats.sentimentos.negativo}
        complaintsCount={complaints.length}
      />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-6">
        <TabsList variant="outline" className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview" className="gap-2">
            <Icon name="activity" className="size-4" />
            <span className="hidden sm:inline">Visao Geral</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Icon name="group" className="size-4" />
            <span className="hidden sm:inline">Membros</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Icon name="heart" className="size-4" />
            <span className="hidden sm:inline">Saude</span>
          </TabsTrigger>
          <TabsTrigger value="hubs" className="gap-2">
            <Icon name="pin-alt" className="size-4" />
            <span className="hidden sm:inline">Hubs</span>
          </TabsTrigger>
          <TabsTrigger value="complaints" className="gap-2">
            <Icon name="chat-bubble" className="size-4" />
            <span className="hidden sm:inline">Reclamacoes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab
            sentimentPieData={sentimentPieData}
            sentimentTrend={sentimentTrend}
            groupBarData={groupBarData}
          />
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <MembersTab memberRanking={memberRanking} />
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <HealthTab groupHealthScores={groupHealthScores} />
        </TabsContent>

        <TabsContent value="hubs" className="space-y-6">
          <HubsTab hubComparison={hubComparison} />
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <ComplaintsTab complaints={complaints} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
