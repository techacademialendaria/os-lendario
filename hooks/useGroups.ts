import { useState, useEffect, useMemo } from 'react';
import { groupsSupabase } from '../lib/groups-supabase';
import type { GroupRecord, GroupSummary } from '../types/groups';

/**
 * Extrai membros únicos de uma string comma-separated
 */
function extractMembers(participantes: string | undefined | null): string[] {
  if (!participantes) return [];
  return participantes
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0);
}

/**
 * Conta membros únicos
 */
function countUniqueMembers(participantes: string | undefined | null): number {
  const members = extractMembers(participantes);
  return new Set(members).size;
}

/**
 * Hook para buscar e processar dados dos grupos de WhatsApp
 * Conecta ao Supabase separado (Academia Lendária)
 */
export function useGroups() {
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

  // Processa registros para obter resumo de cada grupo
  const groupsSummary = useMemo<GroupSummary[]>(() => {
    const groupMap = new Map<string, GroupRecord>();

    // Como os registros estão ordenados por data DESC,
    // a primeira ocorrência de cada grupo é a mais recente
    records.forEach(record => {
      if (!groupMap.has(record.grupo)) {
        groupMap.set(record.grupo, record);
      }
    });

    return Array.from(groupMap.values())
      .map(record => {
        const participantes = record.participantes_do_dia || record.Participantes || '';
        const complaints = record['reclamacao/queixas'];

        return {
          grupo: record.grupo,
          lastSentiment: record.Sentimento || 'Neutro',
          lastSummary: record.Resumo || '',
          memberCount: countUniqueMembers(participantes),
          lastActivityDate: record.data_resumo,
          hasComplaints: !!(complaints && complaints.trim().length > 0),
        };
      })
      .sort((a, b) => a.grupo.localeCompare(b.grupo));
  }, [records]);

  // Retorna lista de nomes de grupos únicos
  const groupNames = useMemo(() => {
    return groupsSummary.map(g => g.grupo);
  }, [groupsSummary]);

  // Retorna registros filtrados por grupo
  const getGroupRecords = (groupName: string): GroupRecord[] => {
    return records.filter(r => r.grupo === groupName);
  };

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

  // Calcula estatísticas agregadas
  const stats = useMemo(() => {
    const total = groupsSummary.length;
    const positive = groupsSummary.filter(
      g => g.lastSentiment?.toLowerCase() === 'positivo'
    ).length;
    const negative = groupsSummary.filter(
      g => g.lastSentiment?.toLowerCase() === 'negativo'
    ).length;
    const neutral = groupsSummary.filter(
      g => g.lastSentiment?.toLowerCase() === 'neutro' || g.lastSentiment?.toLowerCase() === 'misto'
    ).length;

    return { total, positive, negative, neutral };
  }, [groupsSummary]);

  // Alias para compatibilidade
  const groups = useMemo(() => {
    return groupsSummary.map(g => ({
      ...g,
      sentiment: g.lastSentiment?.toLowerCase() || 'neutro',
    }));
  }, [groupsSummary]);

  return {
    records,
    groupsSummary,
    groupNames,
    groups,
    stats,
    loading,
    error,
    refresh,
    getGroupRecords,
  };
}
