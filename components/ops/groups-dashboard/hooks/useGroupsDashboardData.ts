import { useState, useEffect, useCallback } from 'react';
import { groupsSupabase } from '../../../../lib/groups-supabase';
import { format } from 'date-fns';
import type { GroupRecord } from '../../../../types/groups';
import type {
  GroupsDashboardState,
  SentimentDataPoint,
  ParticipantStats,
  ParticipantsDataPoint,
  ComplaintRecord,
  SentimentRecord,
} from '../types';

interface UseGroupsDashboardDataReturn extends GroupsDashboardState {
  loadGroupData: () => Promise<void>;
  handleDataSelect: (data: string) => Promise<void>;
}

export function useGroupsDashboardData(groupName: string): UseGroupsDashboardDataReturn {
  const [datas, setDatas] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [registros, setRegistros] = useState<GroupRecord[]>([]);
  const [sentimentoAtual, setSentimentoAtual] = useState<string | null>(null);
  const [ultimosTresSentimentos, setUltimosTresSentimentos] = useState<SentimentRecord[]>([]);
  const [graficoData, setGraficoData] = useState<SentimentDataPoint[]>([]);
  const [participantesAtivos, setParticipantesAtivos] = useState<ParticipantStats[]>([]);
  const [evolucaoDiaria, setEvolucaoDiaria] = useState<ParticipantsDataPoint[]>([]);
  const [ultimasReclamacoes, setUltimasReclamacoes] = useState<ComplaintRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const sentimentoNumerico = (s: string) =>
    s?.toLowerCase() === 'positivo' ? 1 : s?.toLowerCase() === 'negativo' ? -1 : 0;

  const processarParticipantes = useCallback((registrosData: GroupRecord[]): ParticipantStats[] => {
    const contagemParticipantes = new Map<string, number>();

    registrosData.forEach((reg) => {
      if (reg.participantes_do_dia) {
        const participantes = reg.participantes_do_dia
          .split(',')
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 0);

        participantes.forEach((participante: string) => {
          contagemParticipantes.set(
            participante,
            (contagemParticipantes.get(participante) || 0) + 1
          );
        });
      }
    });

    return Array.from(contagemParticipantes.entries())
      .map(([nome, participacoes]) => ({ nome, participacoes }))
      .sort((a, b) => b.participacoes - a.participacoes);
  }, []);

  const agruparPorDia = useCallback((registrosData: GroupRecord[]): ParticipantsDataPoint[] => {
    const dias = new Map<string, Set<string>>();

    registrosData.forEach((reg) => {
      if (reg.data_resumo && reg.participantes_do_dia) {
        const dataFormatada = format(new Date(reg.data_resumo), 'dd/MM');

        if (!dias.has(dataFormatada)) {
          dias.set(dataFormatada, new Set<string>());
        }

        const participantes = reg.participantes_do_dia
          .split(',')
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 0);

        participantes.forEach((p: string) => dias.get(dataFormatada)?.add(p));
      }
    });

    return Array.from(dias.entries())
      .map(([data, participantes]) => ({
        data,
        total: participantes.size,
      }))
      .sort((a, b) => {
        const [diaA, mesA] = a.data.split('/');
        const [diaB, mesB] = b.data.split('/');
        const dataA = new Date(2025, parseInt(mesA) - 1, parseInt(diaA));
        const dataB = new Date(2025, parseInt(mesB) - 1, parseInt(diaB));
        return dataA.getTime() - dataB.getTime();
      });
  }, []);

  const loadGroupData = useCallback(async () => {
    setLoading(true);

    // Fetch available dates
    const { data: datasData } = await groupsSupabase
      .from('resumo_de_grupo')
      .select('data_resumo')
      .eq('grupo', groupName)
      .order('data_resumo', { ascending: false });

    const uniqueDates = [...new Set(datasData?.map((r: any) => r.data_resumo) || [])];
    setDatas(uniqueDates);

    // Fetch last 7 sentiments for chart
    const { data: ultimos } = await groupsSupabase
      .from('resumo_de_grupo')
      .select('Sentimento, data_resumo')
      .eq('grupo', groupName)
      .order('data_resumo', { ascending: false })
      .limit(7);

    const dadosGrafico: SentimentDataPoint[] = (ultimos || [])
      .map((r: any) => ({
        data: r.data_resumo,
        valor: sentimentoNumerico(r.Sentimento),
      }))
      .reverse();

    setGraficoData(dadosGrafico);

    // Calculate current sentiment (average of last 3)
    const media =
      (ultimos || []).slice(0, 3).reduce((acc: number, r: any) => acc + sentimentoNumerico(r.Sentimento), 0) /
      Math.min(3, ultimos?.length || 1);

    setSentimentoAtual(media > 0.3 ? 'Positivo' : media < -0.3 ? 'Negativo' : 'Misto');

    setUltimosTresSentimentos(
      (ultimos || []).slice(0, 3).map((r: any) => ({
        data_resumo: r.data_resumo,
        Sentimento: r.Sentimento,
      }))
    );

    // Fetch last 10 records
    const { data: registrosData } = await groupsSupabase
      .from('resumo_de_grupo')
      .select('*')
      .eq('grupo', groupName)
      .order('data_resumo', { ascending: false })
      .limit(10);

    setRegistros((registrosData as GroupRecord[]) || []);
    setLoading(false);
  }, [groupName]);

  const handleDataSelect = useCallback(async (data: string) => {
    if (!data || data === '__todas__') {
      setDataSelecionada(null);

      const { data: registrosData } = await groupsSupabase
        .from('resumo_de_grupo')
        .select('*')
        .eq('grupo', groupName)
        .order('data_resumo', { ascending: false })
        .limit(10);

      setRegistros((registrosData as GroupRecord[]) || []);
      return;
    }

    setDataSelecionada(data);

    const { data: registrosData } = await groupsSupabase
      .from('resumo_de_grupo')
      .select('*')
      .eq('grupo', groupName)
      .eq('data_resumo', data);

    setRegistros((registrosData as GroupRecord[]) || []);
  }, [groupName]);

  // Process data when records change
  useEffect(() => {
    if (registros.length > 0) {
      const participantes = processarParticipantes(registros);
      setParticipantesAtivos(participantes.slice(0, 10));

      const evolucao = agruparPorDia(registros);
      setEvolucaoDiaria(evolucao);

      const reclamacoesComData: ComplaintRecord[] = registros
        .filter((r) => r['reclamacao/queixas'] && r['reclamacao/queixas'].trim().length > 0)
        .map((r) => ({
          data: r.data_resumo,
          texto: r['reclamacao/queixas']!, // filter above guarantees this is defined
          sentimento: r.Sentimento,
        }))
        .slice(0, 5);

      setUltimasReclamacoes(reclamacoesComData);
    } else {
      setParticipantesAtivos([]);
      setEvolucaoDiaria([]);
      setUltimasReclamacoes([]);
    }
  }, [registros, processarParticipantes, agruparPorDia]);

  // Load on mount
  useEffect(() => {
    loadGroupData();
  }, [loadGroupData]);

  return {
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
    loadGroupData,
    handleDataSelect,
  };
}
