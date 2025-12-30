import { useState, useEffect, useMemo } from 'react';
import { groupsSupabase } from '../lib/groups-supabase';
import type { GroupRecord } from '../types/groups';

export interface MemberRanking {
  nome: string;
  participacoes: number;
  grupos: string[];
}

export interface GroupHealthScore {
  grupo: string;
  score: number;
  totalRegistros: number;
  positivo: number;
  misto: number;
  neutro: number;
  negativo: number;
  tendencia: 'up' | 'down' | 'stable';
  ultimoSentimento: string;
}

export interface ComplaintRecord {
  grupo: string;
  data: string;
  texto: string;
  sentimento: string;
}

export interface HubComparison {
  hub: string;
  registros: number;
  percentualPositivo: number;
  score: number;
  membrosUnicos: number;
}

export interface SentimentTrend {
  data: string;
  positivo: number;
  misto: number;
  neutro: number;
  negativo: number;
  total: number;
}

export interface GeneralStats {
  totalRegistros: number;
  totalGrupos: number;
  totalMembrosUnicos: number;
  mediaParticipantesPorDia: number;
  sentimentos: {
    positivo: number;
    misto: number;
    neutro: number;
    negativo: number;
  };
  periodoInicio: string;
  periodoFim: string;
}

/**
 * Hook para processar dados gerais de todos os grupos de WhatsApp
 * Conecta ao Supabase separado (Academia Lendária)
 */
export function useGeneralReports() {
  const [records, setRecords] = useState<GroupRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await groupsSupabase
          .from('resumo_de_grupo')
          .select('*')
          .order('data_resumo', { ascending: false });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        setRecords((data as GroupRecord[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Estatísticas gerais
  const generalStats = useMemo<GeneralStats>(() => {
    if (records.length === 0) {
      return {
        totalRegistros: 0,
        totalGrupos: 0,
        totalMembrosUnicos: 0,
        mediaParticipantesPorDia: 0,
        sentimentos: { positivo: 0, misto: 0, neutro: 0, negativo: 0 },
        periodoInicio: '',
        periodoFim: '',
      };
    }

    const grupos = new Set(records.map(r => r.grupo));
    const membrosSet = new Set<string>();
    let totalParticipantes = 0;

    records.forEach(r => {
      const participantes = (r.participantes_do_dia || r.Participantes || '')
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      participantes.forEach(p => membrosSet.add(p));
      totalParticipantes += participantes.length;
    });

    const sentimentos = {
      positivo: records.filter(r => r.Sentimento?.toLowerCase() === 'positivo').length,
      misto: records.filter(r => r.Sentimento?.toLowerCase() === 'misto').length,
      neutro: records.filter(r => r.Sentimento?.toLowerCase() === 'neutro').length,
      negativo: records.filter(r => r.Sentimento?.toLowerCase() === 'negativo').length,
    };

    const datas = records.map(r => r.data_resumo).sort();

    return {
      totalRegistros: records.length,
      totalGrupos: grupos.size,
      totalMembrosUnicos: membrosSet.size,
      mediaParticipantesPorDia: Math.round(totalParticipantes / records.length),
      sentimentos,
      periodoInicio: datas[0] || '',
      periodoFim: datas[datas.length - 1] || '',
    };
  }, [records]);

  // Ranking de membros mais ativos (cross-grupos)
  const memberRanking = useMemo<MemberRanking[]>(() => {
    const memberMap = new Map<string, { participacoes: number; grupos: Set<string> }>();

    records.forEach(r => {
      const participantes = (r.participantes_do_dia || r.Participantes || '')
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      participantes.forEach(nome => {
        if (!memberMap.has(nome)) {
          memberMap.set(nome, { participacoes: 0, grupos: new Set() });
        }
        const member = memberMap.get(nome)!;
        member.participacoes++;
        member.grupos.add(r.grupo);
      });
    });

    return Array.from(memberMap.entries())
      .map(([nome, data]) => ({
        nome,
        participacoes: data.participacoes,
        grupos: Array.from(data.grupos),
      }))
      .sort((a, b) => b.participacoes - a.participacoes);
  }, [records]);

  // Score de saúde por grupo
  const groupHealthScores = useMemo<GroupHealthScore[]>(() => {
    const groupMap = new Map<string, GroupRecord[]>();

    records.forEach(r => {
      if (!groupMap.has(r.grupo)) {
        groupMap.set(r.grupo, []);
      }
      groupMap.get(r.grupo)!.push(r);
    });

    return Array.from(groupMap.entries())
      .map(([grupo, recs]) => {
        const positivo = recs.filter(r => r.Sentimento?.toLowerCase() === 'positivo').length;
        const misto = recs.filter(r => r.Sentimento?.toLowerCase() === 'misto').length;
        const neutro = recs.filter(r => r.Sentimento?.toLowerCase() === 'neutro').length;
        const negativo = recs.filter(r => r.Sentimento?.toLowerCase() === 'negativo').length;
        const total = recs.length;

        // Score: positivo = +3, misto = +1, neutro = 0, negativo = -5
        const score = total > 0
          ? Math.round(((positivo * 3 + misto * 1 + neutro * 0 + negativo * -5) / total) * 100) / 100
          : 0;

        // Tendência: compara últimos 3 com anteriores
        const sortedRecs = [...recs].sort((a, b) =>
          new Date(b.data_resumo).getTime() - new Date(a.data_resumo).getTime()
        );

        let tendencia: 'up' | 'down' | 'stable' = 'stable';
        if (sortedRecs.length >= 6) {
          const recentScore = sortedRecs.slice(0, 3).filter(r =>
            r.Sentimento?.toLowerCase() === 'positivo'
          ).length;
          const previousScore = sortedRecs.slice(3, 6).filter(r =>
            r.Sentimento?.toLowerCase() === 'positivo'
          ).length;

          if (recentScore > previousScore) tendencia = 'up';
          else if (recentScore < previousScore) tendencia = 'down';
        }

        return {
          grupo,
          score,
          totalRegistros: total,
          positivo,
          misto,
          neutro,
          negativo,
          tendencia,
          ultimoSentimento: sortedRecs[0]?.Sentimento || 'neutro',
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [records]);

  // Reclamações agregadas
  const complaints = useMemo<ComplaintRecord[]>(() => {
    return records
      .filter(r => {
        const texto = r['reclamacao/queixas'];
        return texto &&
          texto.trim().length > 0 &&
          !texto.toLowerCase().includes('nenhuma') &&
          !texto.toLowerCase().includes('não foram identificad');
      })
      .map(r => ({
        grupo: r.grupo,
        data: r.data_resumo,
        texto: r['reclamacao/queixas'] || '',
        sentimento: r.Sentimento,
      }))
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [records]);

  // Comparativo de Hubs regionais
  const hubComparison = useMemo<HubComparison[]>(() => {
    const hubRecords = records.filter(r => r.grupo.startsWith('Hub Lendário'));
    const hubMap = new Map<string, GroupRecord[]>();

    hubRecords.forEach(r => {
      if (!hubMap.has(r.grupo)) {
        hubMap.set(r.grupo, []);
      }
      hubMap.get(r.grupo)!.push(r);
    });

    return Array.from(hubMap.entries())
      .map(([hub, recs]) => {
        const positivo = recs.filter(r => r.Sentimento?.toLowerCase() === 'positivo').length;
        const total = recs.length;
        const percentualPositivo = total > 0 ? Math.round((positivo / total) * 100) : 0;

        // Score igual ao groupHealthScores
        const misto = recs.filter(r => r.Sentimento?.toLowerCase() === 'misto').length;
        const neutro = recs.filter(r => r.Sentimento?.toLowerCase() === 'neutro').length;
        const negativo = recs.filter(r => r.Sentimento?.toLowerCase() === 'negativo').length;
        const score = total > 0
          ? Math.round(((positivo * 3 + misto * 1 + neutro * 0 + negativo * -5) / total) * 100) / 100
          : 0;

        // Membros únicos
        const membrosSet = new Set<string>();
        recs.forEach(r => {
          const participantes = (r.participantes_do_dia || r.Participantes || '')
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);
          participantes.forEach(p => membrosSet.add(p));
        });

        return {
          hub: hub.replace('Hub Lendário ', ''),
          registros: total,
          percentualPositivo,
          score,
          membrosUnicos: membrosSet.size,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [records]);

  // Tendência de sentimentos ao longo do tempo (por semana)
  const sentimentTrend = useMemo<SentimentTrend[]>(() => {
    const weekMap = new Map<string, { positivo: number; misto: number; neutro: number; negativo: number; total: number }>();

    records.forEach(r => {
      const date = new Date(r.data_resumo);
      // Agrupar por semana (YYYY-WW)
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, { positivo: 0, misto: 0, neutro: 0, negativo: 0, total: 0 });
      }

      const week = weekMap.get(weekKey)!;
      week.total++;

      const sent = r.Sentimento?.toLowerCase();
      if (sent === 'positivo') week.positivo++;
      else if (sent === 'misto') week.misto++;
      else if (sent === 'neutro') week.neutro++;
      else if (sent === 'negativo') week.negativo++;
    });

    return Array.from(weekMap.entries())
      .map(([data, stats]) => ({ data, ...stats }))
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [records]);

  // Função para recarregar dados
  const refresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await groupsSupabase
        .from('resumo_de_grupo')
        .select('*')
        .order('data_resumo', { ascending: false });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setRecords((data as GroupRecord[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  return {
    generalStats,
    memberRanking,
    groupHealthScores,
    complaints,
    hubComparison,
    sentimentTrend,
    loading,
    error,
    refresh,
  };
}
