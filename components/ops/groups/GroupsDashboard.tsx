import { useState, useEffect, useMemo } from 'react';
import { groupsSupabase } from '../../../lib/groups-supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Select } from '../../ui/select';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';
import { GroupsChatPanel, ChatTriggerButton } from './chat';
import { ExportButton } from './ExportButton';
import SentimentGauge from './SentimentGauge';
import type { GroupRecord } from '../../../types/groups';

// --- CUSTOM SVG CHARTS (No external dependencies) ---

interface ChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

const SentimentChart = ({ data }: { data: Array<{ data: string; valor: number }> }) => {
  // Convert data to chart points (valor: -1 to 1 → y: 0 to 50)
  const points: ChartDataPoint[] = data.map((d, i) => ({
    x: data.length > 1 ? (i / (data.length - 1)) * 100 : 50,
    y: ((d.valor + 1) / 2) * 50, // Normalize -1..1 to 0..50
    label: d.data,
  }));

  if (points.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados disponíveis
      </div>
    );
  }

  const pathD = points.length > 1
    ? `M ${points.map(p => `${p.x} ${50 - p.y}`).join(' L ')}`
    : `M ${points[0].x} ${50 - points[0].y}`;

  const labels = points.length > 2
    ? [points[0], points[Math.floor(points.length / 2)], points[points.length - 1]]
    : points;

  return (
    <div className="w-full h-40 relative mt-4 group">
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Grid Lines */}
        <line x1="0" y1="0" x2="100" y2="0" className="stroke-border" strokeWidth="0.2" strokeDasharray="2" />
        <line x1="0" y1="25" x2="100" y2="25" className="stroke-border" strokeWidth="0.2" strokeDasharray="2" />
        <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.2" />

        {/* Path */}
        <path d={pathD} fill="none" stroke="#EAB308" strokeWidth="1.5" className="drop-shadow-sm" />

        {/* Area Fill (Gradient) */}
        {points.length > 1 && (
          <path d={`${pathD} L 100 50 L 0 50 Z`} fill="url(#gradient-gold)" opacity="0.2" />
        )}

        <defs>
          <linearGradient id="gradient-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={50 - p.y}
            r="2"
            fill="#EAB308"
            className="hover:r-3 transition-all cursor-pointer"
          />
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
        {labels.map((p, i) => (
          <span key={i}>{p.label}</span>
        ))}
      </div>
    </div>
  );
};

const ParticipantsChart = ({ data }: { data: Array<{ data: string; total: number }> }) => {
  const maxValue = Math.max(...data.map(d => d.total), 1);

  const points: ChartDataPoint[] = data.map((d, i) => ({
    x: data.length > 1 ? (i / (data.length - 1)) * 100 : 50,
    y: (d.total / maxValue) * 45,
    label: d.data,
  }));

  if (points.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados disponíveis
      </div>
    );
  }

  const pathD = points.length > 1
    ? `M ${points.map(p => `${p.x} ${50 - p.y}`).join(' L ')}`
    : `M ${points[0].x} ${50 - points[0].y}`;

  const labels = points.length > 2
    ? [points[0], points[Math.floor(points.length / 2)], points[points.length - 1]]
    : points;

  return (
    <div className="w-full h-40 relative mt-4">
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100" y2="0" className="stroke-border" strokeWidth="0.2" />
        <line x1="0" y1="25" x2="100" y2="25" className="stroke-border" strokeWidth="0.2" strokeDasharray="2" />
        <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.2" />

        <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="1.5" />
        {points.length > 1 && (
          <path d={`${pathD} L 100 50 L 0 50 Z`} fill="url(#gradient-blue)" opacity="0.2" />
        )}

        <defs>
          <linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={50 - p.y} r="2" fill="#3B82F6" />
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
        {labels.map((p, i) => (
          <span key={i}>{p.label}</span>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT ---

interface GroupsDashboardProps {
  groupName: string;
  onBack: () => void;
}

export function GroupsDashboard({ groupName, onBack }: GroupsDashboardProps) {
  const [datas, setDatas] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [registros, setRegistros] = useState<GroupRecord[]>([]);
  const [sentimentoAtual, setSentimentoAtual] = useState<string | null>(null);
  const [ultimosTresSentimentos, setUltimosTresSentimentos] = useState<any[]>([]);
  const [graficoData, setGraficoData] = useState<any[]>([]);
  const [participantesAtivos, setParticipantesAtivos] = useState<Array<{ nome: string; participacoes: number }>>([]);
  const [evolucaoDiaria, setEvolucaoDiaria] = useState<any[]>([]);
  const [filtroSentimento, setFiltroSentimento] = useState<string>('todos');
  const [ultimasReclamacoes, setUltimasReclamacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  // Load group data on mount
  useEffect(() => {
    loadGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName]);

  const loadGroupData = async () => {
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

    const sentimentoNumerico = (s: string) =>
      s?.toLowerCase() === 'positivo' ? 1 : s?.toLowerCase() === 'negativo' ? -1 : 0;

    const dadosGrafico = (ultimos || [])
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

    setSentimentoAtual(
      media > 0.3 ? 'Positivo' : media < -0.3 ? 'Negativo' : 'Misto'
    );

    setUltimosTresSentimentos((ultimos || []).slice(0, 3));

    // Fetch last 10 records
    const { data: registrosData } = await groupsSupabase
      .from('resumo_de_grupo')
      .select('*')
      .eq('grupo', groupName)
      .order('data_resumo', { ascending: false })
      .limit(10);

    setRegistros((registrosData as GroupRecord[]) || []);
    setLoading(false);
  };

  const handleDataSelect = async (data: string) => {
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
  };

  // Process participants from records
  const processarParticipantes = (registrosData: GroupRecord[]) => {
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
  };

  // Group by day
  const agruparPorDia = (registrosData: GroupRecord[]) => {
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
  };

  // Process data when records change
  useEffect(() => {
    if (registros.length > 0) {
      const participantes = processarParticipantes(registros);
      setParticipantesAtivos(participantes.slice(0, 10));

      const evolucao = agruparPorDia(registros);
      setEvolucaoDiaria(evolucao);

      const reclamacoesComData = registros
        .filter((r) => r['reclamacao/queixas'] && r['reclamacao/queixas'].trim().length > 0)
        .map((r) => ({
          data: r.data_resumo,
          texto: r['reclamacao/queixas'],
          sentimento: r.Sentimento,
        }))
        .slice(0, 5);

      setUltimasReclamacoes(reclamacoesComData);
    } else {
      setParticipantesAtivos([]);
      setEvolucaoDiaria([]);
      setUltimasReclamacoes([]);
    }
  }, [registros]);

  const getSentimentoBadge = (sentimento: string) => {
    const s = sentimento?.toLowerCase();
    if (s === 'positivo') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (s === 'negativo') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  };

  const getAvatarInitials = (name: string) => {
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const registrosFiltrados = registros.filter(
    (r) => filtroSentimento === 'todos' || r.Sentimento?.toLowerCase() === filtroSentimento
  );

  // Options for date select
  const dateOptions = [
    { label: 'Últimos registros', value: '__todas__' },
    ...datas.map((d) => ({ label: d, value: d })),
  ];

  // Options for sentiment filter
  const sentimentOptions = [
    { label: 'Todos sentimentos', value: 'todos' },
    { label: 'Positivo', value: 'positivo' },
    { label: 'Negativo', value: 'negativo' },
    { label: 'Neutro', value: 'neutro' },
    { label: 'Misto', value: 'misto' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in p-4 md:p-8 space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="arrow-left" className="size-4" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold">{groupName}</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-48 rounded-3xl animate-pulse bg-muted/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in p-4 md:p-8 space-y-8 pb-20">

      {/* HEADER SECTION */}
      <header className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Icon name="trophy" className="text-primary" /> {groupName}
          </h1>
          <p className="text-muted-foreground text-sm font-serif">
            Monitoramento de saúde e engajamento da comunidade.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-2 rounded-xl border border-border">
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              placeholder="Data específica"
              value={dataSelecionada || '__todas__'}
              onValueChange={handleDataSelect}
              options={dateOptions}
              className="w-full sm:w-48 bg-muted/20 border-border"
            />
            <Button variant="outline" className="gap-2 bg-muted/20 border-border" onClick={onBack}>
              <Icon name="arrow-left" size="size-4" /> Voltar
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <ExportButton
              registros={registros}
              options={{ grupo: groupName, dataSelecionada }}
            />
            <ChatTriggerButton onClick={() => setChatOpen(true)} />
          </div>
        </div>
      </header>

      {/* DASHBOARD GRID (CHARTS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: SENTIMENTO ATUAL */}
        <Card className="rounded-3xl border-border bg-card shadow-sm h-full flex flex-col hover:border-primary/30 transition-colors">
          <CardContent className="p-8 flex flex-col h-full gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                <Icon name="chart-histogram" size="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Sentimento Atual</h3>
                <p className="text-xs text-muted-foreground font-serif">Média ponderada (3 dias)</p>
              </div>
            </div>

            {/* Gauge Centralizado */}
            <div className="flex justify-center py-4">
              <SentimentGauge sentiment={sentimentoAtual} size="lg" showLabel />
            </div>

            <div className="space-y-4 mt-auto">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider border-b border-border pb-2">Últimos Registros</h4>
              <div className="space-y-2">
                {ultimosTresSentimentos.map((rec, i) => (
                  <div key={i} className="flex justify-between items-center p-2 hover:bg-muted/30 rounded transition-colors">
                    <span className="text-sm font-mono text-muted-foreground">{rec.data_resumo}</span>
                    <Badge className={cn("rounded-full px-2 text-[10px] font-bold border-none capitalize", getSentimentoBadge(rec.Sentimento))}>
                      {rec.Sentimento}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: PARTICIPANTES MAIS ATIVOS */}
        <Card className="rounded-3xl border-border bg-card shadow-sm h-full hover:border-primary/30 transition-colors">
          <CardContent className="p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Icon name="users-alt" size="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Top Participantes</h3>
                <p className="text-xs text-muted-foreground font-serif">Membros mais engajados</p>
              </div>
            </div>
            <div className="space-y-3">
              {participantesAtivos.slice(0, 5).map((p, i) => (
                <div key={i} className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-6 flex justify-center">
                      {i === 0 && <Icon name="medal" className="text-yellow-500" />}
                      {i === 1 && <Icon name="medal" className="text-zinc-400" />}
                      {i === 2 && <Icon name="medal" className="text-amber-700" />}
                      {i > 2 && <span className="text-xs font-mono text-muted-foreground">#{i + 1}</span>}
                    </div>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{getAvatarInitials(p.nome)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate max-w-[150px]">
                      {p.nome}
                    </span>
                  </div>
                  <Badge className="bg-muted text-muted-foreground font-mono text-[10px] border-none rounded px-2 min-w-[32px] justify-center">
                    {p.participacoes}x
                  </Badge>
                </div>
              ))}
              {participantesAtivos.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhum participante</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: EVOLUÇÃO SENTIMENTOS */}
        <Card className="rounded-3xl border-border bg-card shadow-sm h-full">
          <CardContent className="p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <Icon name="graph-up" size="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Evolução dos Sentimentos</h3>
            </div>
            <div className="flex-1 min-h-[180px]">
              <SentimentChart data={graficoData} />
            </div>
          </CardContent>
        </Card>

        {/* CARD 4: EVOLUÇÃO DIÁRIA */}
        <Card className="rounded-3xl border-border bg-card shadow-sm h-full">
          <CardContent className="p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Icon name="chart-histogram" size="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Evolução de Participantes</h3>
            </div>
            <div className="flex-1 min-h-[180px]">
              <ParticipantsChart data={evolucaoDiaria} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- FEATURED COMPLAINTS SECTION --- */}
      {ultimasReclamacoes.length > 0 && (
        <section className="space-y-4">
          <Card className="rounded-3xl border border-red-200 bg-red-50/30 dark:bg-red-950/20 dark:border-red-900/40 overflow-hidden shadow-sm">
            <CardHeader className="pb-4 border-b border-red-200/50 dark:border-red-900/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-full text-red-500 shadow-sm">
                  <Icon name="exclamation-triangle" size="size-5" />
                </div>
                <div>
                  <CardTitle className="text-lg text-red-700 dark:text-red-400 font-bold">Reclamações em Destaque</CardTitle>
                  <CardDescription className="text-red-600/80 dark:text-red-300/80">
                    Pontos de atenção identificados pela IA nos últimos dias.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ultimasReclamacoes.map((comp, i) => (
                <div key={i} className="bg-background border border-red-100 dark:border-red-900/30 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                      <Icon name="calendar" size="size-3" /> {comp.data}
                    </div>
                    <Badge className={cn("text-[9px] uppercase font-bold border-0",
                      comp.sentimento?.toLowerCase() === 'negativo' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      {comp.sentimento}
                    </Badge>
                  </div>
                  <p className="text-sm font-serif text-foreground/90 leading-relaxed line-clamp-3">
                    "{comp.texto}"
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {/* --- DAILY RECORDS SECTION --- */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Icon name="page" size="size-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Registros Diários</h2>
          </div>

          <div className="flex gap-3">
            <Select
              value={filtroSentimento}
              onValueChange={setFiltroSentimento}
              placeholder="Filtrar por sentimento"
              options={sentimentOptions}
              className="w-48 bg-card border-border"
            />
            <Badge variant="secondary" className="px-4 text-sm font-mono bg-muted text-foreground border-border h-10 flex items-center">
              {registrosFiltrados.length} registros
            </Badge>
          </div>
        </div>

        {registrosFiltrados.length === 0 ? (
          <Card className="rounded-3xl border-border">
            <CardContent className="py-16 text-center">
              <Icon name="page" className="size-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Nenhum registro encontrado</p>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou selecione outro grupo.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {registrosFiltrados.map((record, index) => {
              const participantes = record.participantes_do_dia
                ?.split(',')
                .map((p: string) => p.trim())
                .filter((p: string) => p.length > 0) || [];
              const hasComplaints = record['reclamacao/queixas'] && record['reclamacao/queixas'].trim().length > 0;

              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all flex flex-col h-full group">
                    <CardContent className="p-6 space-y-6 flex-1 flex flex-col">

                      {/* Header: Date & Badge */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-foreground font-bold text-lg group-hover:text-primary transition-colors">
                          <Icon name="calendar" size="size-5" className="text-muted-foreground group-hover:text-primary/70" />
                          {record.data_resumo}
                        </div>
                        <Badge className={cn("border-none rounded-full px-3 uppercase font-bold text-[10px]", getSentimentoBadge(record.Sentimento || ''))}>
                          {record.Sentimento}
                        </Badge>
                      </div>

                      {/* Participants */}
                      {participantes.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                            <Icon name="users-alt" size="size-3" /> Participantes ({participantes.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {participantes.slice(0, 4).map((p: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-muted/50 font-normal text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                                {p}
                              </Badge>
                            ))}
                            {participantes.length > 4 && (
                              <Badge variant="secondary" className="bg-muted/50 font-normal text-xs">
                                +{participantes.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <Separator className="bg-border/50" />

                      {/* Content Sections */}
                      <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                            <Icon name="file-edit" size="size-3" /> Resumo
                          </p>
                          <p className="text-sm text-foreground/80 font-serif leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-text">
                            {record.Resumo}
                          </p>
                        </div>

                        {record['Insights futuros'] && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                              <Icon name="bulb" size="size-3" /> Insights
                            </p>
                            <p className="text-sm text-foreground/80 font-serif leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-text">
                              {record['Insights futuros']}
                            </p>
                          </div>
                        )}

                        {/* Complaints - Only show if present */}
                        {hasComplaints && (
                          <div className="space-y-1 pt-2 p-3 bg-red-50/50 dark:bg-red-950/10 rounded-lg border border-red-100 dark:border-red-900/20">
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                              <Icon name="exclamation-triangle" size="size-3" /> Reclamações
                            </p>
                            <p className="text-xs text-muted-foreground font-serif leading-relaxed italic">
                              {record['reclamacao/queixas']}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* AI Chat Panel */}
      <GroupsChatPanel
        groupName={groupName}
        isOpen={chatOpen}
        onOpenChange={setChatOpen}
      />
    </div>
  );
}
