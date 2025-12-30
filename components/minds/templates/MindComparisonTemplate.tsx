import React, { useState } from 'react';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import RadarChart from '../ui/RadarChart';
import { getDiscTheme, getBigFiveColor } from '../../../utils/psychometrics';
import { usePageTitle } from '../../../hooks/usePageTitle';

interface MindComparisonProps {
  setSection: (s: Section) => void;
}

// --- MOCK DATA ---
const mindsData = [
  {
    id: 'mark-manson',
    name: 'Mark Manson',
    title: 'The Philosopher',
    avatar:
      'https://yt3.googleusercontent.com/ytc/AIdro_k6E7jSjX6K3y6n5x5o5f5q5z5x5o5f5q5z5x5o=s900-c-k-c0x00ffffff-no-rj', // Placeholder
    superpower: 'Traduzir complexidade em simplicidade vulgar memorável',
    kryptonite: 'Impaciência com processos lentos e burocracia',
    archetypes: { mbti: 'ENTP', enneagram: '8w7', disc: 'DI' },
    strat: 'IV-V',
    disc: { d: 85, i: 80, s: 25, c: 55 },
    bigFive: [92, 65, 78, 35, 45], // Open, Consc, Extro, Agree, Neuro
    darkTriad: { narc: 4, mach: 4, psych: 1 },
    radar: [
      { skillName: 'Abertura', level: 9 },
      { skillName: 'Consc.', level: 6 },
      { skillName: 'Extrov.', level: 8 },
      { skillName: 'Amabil.', level: 3 },
      { skillName: 'Neurot.', level: 4 },
    ],
  },
  {
    id: 'naval-ravikant',
    name: 'Naval Ravikant',
    title: 'The Sage',
    avatar: 'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwh5u4_400x400.jpg',
    superpower: 'Síntese de complexidade em simplicidade (Tweets/Aforismos)',
    kryptonite: 'Impaciência com ineficiência e desperdício de tempo',
    archetypes: { mbti: 'INTJ', enneagram: '5w4', disc: 'DI/DC' },
    strat: 'VI-VII',
    disc: { d: 85, i: 55, s: 25, c: 65 },
    bigFive: [92, 75, 35, 45, 25], // Open, Consc, Extro, Agree, Neuro
    darkTriad: { narc: 2, mach: 4, psych: 2 },
    radar: [
      { skillName: 'Abertura', level: 9 },
      { skillName: 'Consc.', level: 8 },
      { skillName: 'Extrov.', level: 3 },
      { skillName: 'Amabil.', level: 4 },
      { skillName: 'Neurot.', level: 2 },
    ],
  },
  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    title: 'The Visionary',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    superpower: 'Reality Distortion Field (fazer outros acreditarem no impossível)',
    kryptonite: 'Incapacidade de aceitar mediocridade (perfeccionismo tóxico)',
    archetypes: { mbti: 'INTJ', enneagram: '7w8', disc: 'DI' },
    strat: 'VI-VII',
    disc: { d: 85, i: 90, s: 15, c: 45 }, // High D due to assertiveness, High I for charisma/vision
    bigFive: [99, 45, 60, 15, 70], // Open, Consc (low due to chaos?), Extro, Agree (low), Neuro (high)
    darkTriad: { narc: 9, mach: 7, psych: 3 },
    radar: [
      { skillName: 'Abertura', level: 10 },
      { skillName: 'Consc.', level: 5 },
      { skillName: 'Extrov.', level: 6 },
      { skillName: 'Amabil.', level: 1 },
      { skillName: 'Neurot.', level: 7 },
    ],
  },
];

const bigFiveLabels = [
  'Abertura (Openness)',
  'Conscienciosidade',
  'Extroversão',
  'Agradabilidade',
  'Neuroticismo',
];

const MindComparisonTemplate: React.FC<MindComparisonProps> = ({ setSection }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Page title
  usePageTitle('Matriz de Comparação');

  const renderGridView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-500">
      {/* --- 1. MINDS CARDS ROW --- */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {mindsData.map((mind, idx) => {
          const discTheme = getDiscTheme(mind.archetypes.disc);

          return (
            <Card
              key={mind.id}
              className={`bg-studio-card group relative overflow-hidden border-white/5 transition-all duration-300 hover:border-white/10 ${idx === 1 ? 'z-10 scale-[1.02] border-indigo-500/30 shadow-2xl ring-1 ring-indigo-500/20' : 'opacity-90 hover:opacity-100'}`}
            >
              <div
                className={`absolute left-0 top-0 h-1 w-full ${idx === 1 ? 'bg-indigo-500' : idx === 0 ? 'bg-studio-primary' : 'bg-zinc-500'} opacity-50`}
              ></div>
              <CardHeader className="relative z-10 pb-4 pt-8 text-center">
                <div className="absolute right-4 top-4 font-mono text-[10px] text-zinc-600">
                  {idx + 1}
                </div>
                <div className="mx-auto mb-3 h-20 w-20 rounded-full border border-white/10 bg-black p-1 transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={mind.avatar}
                    alt={mind.name}
                    className="h-full w-full rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <CardTitle className="mb-1 text-xl text-white">{mind.name}</CardTitle>
                <Badge
                  variant="outline"
                  className="mx-auto border-white/5 text-[10px] uppercase tracking-wider text-zinc-500"
                >
                  {mind.title}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="-my-4 flex h-[200px] w-full items-center justify-center">
                  <RadarChart
                    data={mind.radar}
                    size={220}
                    colors={{
                      stroke: idx === 0 ? '#D4AF37' : idx === 1 ? '#6366f1' : '#e4e4e7',
                      fill:
                        idx === 0
                          ? 'rgba(212, 175, 55, 0.2)'
                          : idx === 1
                            ? 'rgba(99, 102, 241, 0.2)'
                            : 'rgba(228, 228, 231, 0.1)',
                      text: 'fill-zinc-500',
                      grid: 'rgba(255,255,255,0.05)',
                    }}
                  />
                </div>

                <div className="space-y-3 px-4 text-center">
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      Superpower
                    </p>
                    <p className="font-serif text-xs italic leading-relaxed text-zinc-300">
                      "{mind.superpower}"
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      Kryptonite
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-500">{mind.kryptonite}</p>
                  </div>
                </div>
              </CardContent>

              {/* Footer / Quick Stats */}
              <div className="grid grid-cols-3 border-t border-white/5 bg-white/[0.02]">
                <div className="border-r border-white/5 p-3 text-center">
                  <div className="text-lg font-bold leading-none text-white">
                    {mind.archetypes.mbti}
                  </div>
                  <div className="mt-1 text-[9px] uppercase text-zinc-600">MBTI</div>
                </div>
                <div className="border-r border-white/5 p-3 text-center">
                  <div className="text-lg font-bold leading-none text-white">
                    {mind.archetypes.enneagram}
                  </div>
                  <div className="mt-1 text-[9px] uppercase text-zinc-600">Eneagrama</div>
                </div>
                <div className="p-3 text-center">
                  <div className={`text-lg font-bold leading-none ${discTheme.color}`}>
                    {mind.archetypes.disc}
                  </div>
                  <div className="mt-1 text-[9px] uppercase text-zinc-600">DISC</div>
                </div>
              </div>
              <div className="border-t border-white/5 bg-black/40 py-2 text-center">
                <span className="font-mono text-[10px] tracking-wider text-zinc-500">
                  ESTRATO COGNITIVO: <span className="font-bold text-zinc-300">{mind.strat}</span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* --- 2. DISC COMPARISON --- */}
      <div className="bg-studio-card space-y-8 rounded-3xl border border-white/5 p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded bg-white/5 p-2">
            <Icon name="pie-chart" className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">DISC - Comportamento Observável</h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Labels */}
          <div className="hidden space-y-8 md:block md:pt-8">
            <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
              <span className="h-1 w-1 rounded-full bg-red-500"></span> Dominância (D)
            </div>
            <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
              <span className="h-1 w-1 rounded-full bg-yellow-500"></span> Influência (I)
            </div>
            <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
              <span className="h-1 w-1 rounded-full bg-emerald-500"></span> Estabilidade (S)
            </div>
            <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
              <span className="h-1 w-1 rounded-full bg-blue-500"></span> Conformidade (C)
            </div>
          </div>

          {/* Mind Columns */}
          {mindsData.map((mind) => (
            <div key={mind.id} className="space-y-8">
              <div className="mb-4 flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>{mind.name}</span>
                <span className="text-white">{mind.archetypes.disc}</span>
              </div>

              {[
                { val: mind.disc.d, color: 'bg-red-500' },
                { val: mind.disc.i, color: 'bg-yellow-500' },
                { val: mind.disc.s, color: 'bg-emerald-500' },
                { val: mind.disc.c, color: 'bg-blue-500' },
              ].map((metric, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -top-4 mb-1 flex w-full justify-between font-mono text-[10px] text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                    <span>{metric.val}/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${metric.color}`}
                      style={{ width: `${metric.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. BIG FIVE COMPARISON --- */}
      <div className="bg-studio-card space-y-8 rounded-3xl border border-white/5 p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded bg-white/5 p-2">
            <Icon name="bar-chart-alt" className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Big Five (OCEAN)</h3>
        </div>

        <div className="space-y-8">
          {bigFiveLabels.map((trait, i) => (
            <div
              key={i}
              className="group grid grid-cols-1 items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/[0.02] md:grid-cols-12"
            >
              <div className="text-sm font-medium uppercase tracking-wider text-zinc-400 md:col-span-3">
                {trait}
              </div>
              <div className="grid grid-cols-3 gap-8 md:col-span-9">
                {mindsData.map((mind, idx) => {
                  const val = mind.bigFive[i];
                  const colorClass =
                    idx === 0 ? 'bg-studio-primary' : idx === 1 ? 'bg-indigo-500' : 'bg-zinc-500';
                  return (
                    <div key={mind.id} className="relative">
                      <div className="mb-1 flex justify-between font-mono text-[10px] text-zinc-500">
                        <span className="opacity-50">{mind.name.split(' ')[0]}</span>
                        <span
                          className={
                            idx === 0
                              ? 'text-studio-primary'
                              : idx === 1
                                ? 'text-indigo-400'
                                : 'text-zinc-300'
                          }
                        >
                          {val}/100
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${colorClass}`}
                          style={{ width: `${val}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. DARK TRIAD (Footer Alert) --- */}
      <div className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-6">
        <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
          <Icon name="shield-check" className="text-red-500" /> Dark Triad Profile
        </h3>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          {mindsData.map((mind) => (
            <div key={mind.id} className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase text-zinc-400">{mind.name}</span>
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                  <span>Narcisismo</span> <span>{mind.darkTriad.narc}/7</span>
                </div>
                <div className="h-1 w-full rounded-full bg-red-500/10">
                  <div
                    className="h-full rounded-full bg-red-500/50"
                    style={{ width: `${(mind.darkTriad.narc / 7) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                  <span>Maquiavelismo</span> <span>{mind.darkTriad.mach}/7</span>
                </div>
                <div className="h-1 w-full rounded-full bg-red-500/10">
                  <div
                    className="h-full rounded-full bg-red-500/50"
                    style={{ width: `${(mind.darkTriad.mach / 7) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                  <span>Psicopatia</span> <span>{mind.darkTriad.psych}/7</span>
                </div>
                <div className="h-1 w-full rounded-full bg-red-500/10">
                  <div
                    className="h-full rounded-full bg-red-500/50"
                    style={{ width: `${(mind.darkTriad.psych / 7) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 overflow-x-auto duration-500">
      <Card className="bg-studio-card min-w-[800px] overflow-hidden rounded-2xl border-white/5">
        <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="pl-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Critério Comparativo
            </div>
            {mindsData.map((mind, idx) => (
              <div key={mind.id} className="flex items-center gap-3 border-l border-white/5 pl-4">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10">
                  <img src={mind.avatar} className="h-full w-full object-cover" alt={mind.name} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{mind.name}</span>
                  <span className="text-[10px] uppercase text-zinc-500">{mind.title}</span>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Row: Superpower */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-studio-primary">
                <Icon name="lightning" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Superpoder</span>
              </div>
            </div>
            {mindsData.map((mind) => (
              <div
                key={mind.id}
                className="border-l border-white/5 px-6 font-serif text-sm italic text-zinc-300"
              >
                "{mind.superpower}"
              </div>
            ))}
          </div>

          {/* Row: Kryptonite */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-red-400">
                <Icon name="shield-check" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Kryptonita</span>
              </div>
            </div>
            {mindsData.map((mind) => (
              <div key={mind.id} className="border-l border-white/5 px-6 text-sm text-zinc-400">
                {mind.kryptonite}
              </div>
            ))}
          </div>

          {/* Row: Archetypes */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-blue-400">
                <Icon name="layout" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Arquétipos</span>
              </div>
            </div>
            {mindsData.map((mind) => {
              const theme = getDiscTheme(mind.archetypes.disc);
              return (
                <div key={mind.id} className="space-y-3 border-l border-white/5 px-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">MBTI</span>
                    <Badge variant="outline" className="border-white/10 font-mono text-white">
                      {mind.archetypes.mbti}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Eneagrama</span>
                    <Badge variant="outline" className="border-white/10 font-mono text-white">
                      {mind.archetypes.enneagram}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">DISC</span>
                    <Badge variant="outline" className={`border-white/10 font-mono ${theme.color}`}>
                      {mind.archetypes.disc}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-1 text-xs">
                    <span className="text-[10px] uppercase text-zinc-600">Estrato</span>
                    <span className="font-mono font-bold text-zinc-300">{mind.strat}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section: Big Five Table */}
          <div className="bg-black/20">
            <div className="border-b border-white/5 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Detalhamento Big Five (0-100)
            </div>
            {bigFiveLabels.map((trait, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 border-b border-white/5 py-3 last:border-0 hover:bg-white/[0.02]"
              >
                <div className="flex items-center px-6 text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {trait}
                </div>
                {mindsData.map((mind) => (
                  <div
                    key={mind.id}
                    className="flex items-center gap-2 border-l border-white/5 px-6"
                  >
                    <span className="w-8 font-mono text-xs font-bold text-white">
                      {mind.bigFive[i]}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full bg-indigo-500/50"
                        style={{ width: `${mind.bigFive[i]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_MATRIX} setSection={setSection} />

      {/* HERO HEADER */}
      <div className="relative overflow-hidden border-b border-white/5 bg-studio-bg p-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050507] to-[#050507] opacity-60"></div>
        <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-white/10 text-[10px] uppercase tracking-widest text-zinc-400"
          >
            High-Level Analysis
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">DNA Mental</h1>
          <p className="mx-auto max-w-2xl font-serif text-xl italic text-zinc-400">
            Análise comparativa profunda dos modelos mentais, motivações e comportamentos de três
            mentes lendárias.
          </p>

          <div className="flex justify-center gap-2 pt-4">
            <Badge
              onClick={() => setViewMode('grid')}
              className={`cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'border border-white/10 bg-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}
            >
              Abas (Focado)
            </Badge>
            <Badge
              onClick={() => setViewMode('list')}
              className={`cursor-pointer transition-all ${viewMode === 'list' ? 'bg-white/20 text-white' : 'border border-white/10 bg-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}
            >
              Lista (Relatório)
            </Badge>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1600px] p-6 md:p-10">
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </main>
    </div>
  );
};

export default MindComparisonTemplate;
