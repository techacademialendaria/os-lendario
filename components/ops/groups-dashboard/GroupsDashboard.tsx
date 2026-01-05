import React, { useState } from 'react';
import { GroupsChatPanel } from '../groups/chat';

// Hooks
import { useGroupsDashboardData } from './hooks';

// Organisms
import {
  DashboardHeader,
  SentimentCard,
  TopParticipantsCard,
  SentimentEvolutionCard,
  ParticipantsEvolutionCard,
  ComplaintsSection,
  DailyRecordsSection,
  LoadingState,
} from './organisms';

// Types
import type { GroupsDashboardProps } from './types';

export const GroupsDashboard: React.FC<GroupsDashboardProps> = ({ groupName, onBack }) => {
  // Data hook
  const {
    datas,
    dataSelecionada,
    registros,
    sentimentoAtual,
    ultimosTresSentimentos,
    graficoData,
    participantesAtivos,
    evolucaoDiaria,
    ultimasReclamacoes,
    loading,
    handleDataSelect,
  } = useGroupsDashboardData(groupName);

  // Local state
  const [chatOpen, setChatOpen] = useState(false);
  const [filtroSentimento, setFiltroSentimento] = useState('todos');

  // Loading state
  if (loading) {
    return <LoadingState groupName={groupName} onBack={onBack} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in p-4 md:p-8 space-y-8 pb-20">
      {/* Header */}
      <DashboardHeader
        groupName={groupName}
        dataSelecionada={dataSelecionada}
        datas={datas}
        registros={registros}
        onDataSelect={handleDataSelect}
        onBack={onBack}
        onChatOpen={() => setChatOpen(true)}
      />

      {/* Dashboard Grid (Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SentimentCard
          sentimentoAtual={sentimentoAtual}
          ultimosTresSentimentos={ultimosTresSentimentos}
        />

        <TopParticipantsCard participantes={participantesAtivos} />

        <SentimentEvolutionCard data={graficoData} />

        <ParticipantsEvolutionCard data={evolucaoDiaria} />
      </div>

      {/* Complaints Section */}
      <ComplaintsSection complaints={ultimasReclamacoes} />

      {/* Daily Records Section */}
      <DailyRecordsSection
        registros={registros}
        filtroSentimento={filtroSentimento}
        onFiltroChange={setFiltroSentimento}
      />

      {/* AI Chat Panel */}
      <GroupsChatPanel groupName={groupName} isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default GroupsDashboard;
