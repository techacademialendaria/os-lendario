import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { useToast } from '../../../hooks/use-toast';
import { Section } from '../../../types';
import MindsTopbar from '../MindsTopbar';
import { useDebates, type Debate, incrementDebateViews } from '../../../hooks/useDebates';
import { debateService, DebateStatus } from '../../../services/debateService';
import { MindCardSelect } from '../arena/MindCardSelect';

// Helper: Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// --- TYPES ---

type ViewState = 'lobby' | 'create' | 'live' | 'replay';

interface Mind {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
}

interface Framework {
  id: string;
  name: string;
  rounds: number;
  desc: string;
}

interface HistoryItem {
  round: number;
  speaker: Mind;
  text: string;
}

interface ArenaTemplateProps {
  setSection: (s: Section) => void;
}

// --- MOCK DATA ---

// --- INITIAL STATE ---

const INITIAL_MINDS: Mind[] = [
  { id: 'elon', name: 'Elon Musk', role: 'Visionary Engineer', avatar: 'EM', winRate: 70, debates: 127, fidelity: 92, color: 'text-cyan-400' },
  { id: 'naval', name: 'Naval Ravikant', role: 'Modern Philosopher', avatar: 'NR', winRate: 65, debates: 98, fidelity: 95, color: 'text-brand-gold' },
  { id: 'sam', name: 'Sam Altman', role: 'AI Architect', avatar: 'SA', winRate: 63, debates: 145, fidelity: 88, color: 'text-blue-400' },
  { id: 'nassim', name: 'Nassim Taleb', role: 'Risk Analyst', avatar: 'NT', winRate: 60, debates: 73, fidelity: 90, color: 'text-red-400' },
  { id: 'ray', name: 'Ray Dalio', role: 'Macro Investor', avatar: 'RD', winRate: 54, debates: 54, fidelity: 85, color: 'text-green-400' },
];


const FRAMEWORKS: Framework[] = [
  { id: 'oxford', name: 'Oxford Debate', rounds: 5, desc: 'Clássico: Abertura, Refutação, Encerramento.' },
  { id: 'socratic', name: 'Socratic Dialogue', rounds: 7, desc: 'Exploração através de perguntas profundas.' },
  { id: 'steelman', name: 'Steel Man', rounds: 4, desc: 'Defender o melhor argumento do oponente.' },
  { id: 'twitter', name: 'X/Twitter Thread', rounds: 6, desc: 'Batalha viral de argumentos curtos e incisivos.' },
];

const MOCK_ARGUMENTS: Record<string, string[]> = {
  elon: [
    "A centralização do desenvolvimento de IA é um risco existencial. Open source permite auditoria global e democratização do poder. Se apenas uma empresa controlar a AGI, teremos uma ditadura digital inevitável.",
    "First principles: sistemas centralizados falham catastroficamente. Física não mente. Open source permite auditoria distribuída. Como sei que seus safeguards funcionam? 'Confia em mim, brother?'",
    "Sam's argument boils down to: 'Too hard, too risky'. That's exactly the thinking that would've kept us in caves."
  ],
  sam: [
    "Segurança deve vir antes de abertura. Liberar modelos poderosos sem salvaguardas é como dar urânio enriquecido para qualquer um. Precisamos de governança centralizada até entendermos os riscos.",
    "O argumento sobre segurança não é sobre controle, é sobre responsabilidade. GPT-4 é poderoso demais para release open source irrestrito. Imagina modelos de bioweapons design...",
    "A questão não é possibilidade - é probabilidade e timeline. Iterative deployment funciona."
  ],
  naval: [
    "Wealth creation is not zero-sum. Technology amplifies human capability. The question isn't whether AI should be open, but how we structure incentives for beneficial development.",
    "Play long-term games with long-term people. The AI race rewards short-term thinking. We need to optimize for civilizational upside, not quarterly returns.",
    "Specific knowledge in AI will be the most valuable skill. But specific knowledge requires authenticity - you can't fake understanding alignment."
  ],
  nassim: [
    "O problema não é o risco conhecido, é o risco que não conseguimos calcular. Fat tails in AI development mean we should be more cautious, not less.",
    "Skin in the game: if you're building AGI, you should be the first to suffer the consequences of failure. Centralized development without accountability is asymmetric risk.",
    "Antifragility requires optionality. Open source provides more options for recovery than a single point of failure."
  ],
  ray: [
    "Principles matter more than positions. In AI development, we need to establish clear principles for decision-making before we face the hard choices.",
    "The economy is a machine. AI is adding new gears to that machine. We need to understand the second and third-order effects before accelerating.",
    "Radical transparency is the only way to build trust. Closed AI development creates information asymmetries that will eventually destabilize markets."
  ]
};

// --- SAVED DEBATES (from outputs/debates/) ---

interface SavedDebate {
  id: string;
  topic: string;
  framework: string;
  date: string;
  mind1: { id: string; name: string; role: string };
  mind2: { id: string; name: string; role: string };
  rounds: Array<{
    number: number;
    type: string;
    mind1Argument: string;
    mind2Argument: string;
  }>;
  views: number;
  rating: number;
}

const SAVED_DEBATES: SavedDebate[] = [
  {
    id: '87e7fe78',
    topic: 'Elon Musk nao vai conseguir ir para Marte',
    framework: 'Oxford Debate',
    date: '2025-10-14',
    mind1: { id: 'sam', name: 'Sam Altman', role: 'proposer' },
    mind2: { id: 'elon', name: 'Elon Musk', role: 'opposer' },
    views: 2134,
    rating: 4.8,
    rounds: [
      {
        number: 1,
        type: 'Opening',
        mind1Argument: `Look, I have massive respect for Elon's vision. SpaceX has achieved incredible things - reusable rockets, Starship development, the entire commercial space revolution.

But the timeline claim that Elon himself will go to Mars? That's exponentially harder than launching payloads. The physics is one thing. The biology is another entirely.

First, radiation exposure on a 6-month journey is brutal. We don't have shielding solutions that work at scale. Second, Mars has 38% Earth gravity - we have zero long-term data on human health in that environment. Third, life support systems for multi-year missions are unproven.

Elon might send humans to Mars in his lifetime. That's plausible, maybe even likely. But him personally going? That's a 10-20 year timeline minimum, and he'll be 70+ by then. The risk-reward calculation changes when you're running multiple critical companies.`,
        mind2Argument: `I'm going to Mars. Not "maybe". Not "if everything works". I'm going.

Why? Because that's the whole fucking point. SpaceX exists to make humanity multiplanetary. If I'm not willing to go myself, why should anyone else risk it?

Physics doesn't care about age. Radiation? We're solving it - water shielding, faster trajectories, pharmaceutical countermeasures. Gravity? 38% is enough. We'll find out the rest when we get there. Life support? Starship is designed for it.

Timeline? Starship is flying now. Full stack orbital tests happening this year. Mars transfer window in 2026 or 2028. I'll be 57-59. That's not old by modern standards, especially for someone who takes care of themselves.

Sam's playing it safe. That's fine for venture capital. For existential missions, you go all in. I'm going.`
      },
      {
        number: 2,
        type: 'Rebuttal',
        mind1Argument: `Elon's argument is classic him - optimism over physics. I love that energy, but let's be real.

SpaceX's current Starship hasn't completed a successful orbital flight yet. We're talking about scaling that to a Mars mission with life support for months. The engineering gap is massive.

And here's the thing: Elon doesn't need to go personally for the mission to succeed. His role is building the capability. The first Mars colonists will likely be specialists - geologists, engineers, doctors. Not 60-year-old CEOs managing Earth-based companies.

I'd bet on Elon getting humans to Mars. I'd bet against Elon being on that first ship.`,
        mind2Argument: `Sam says "engineering gap is massive". He's right. It IS massive. That's why I'm doing it.

We landed Falcon 9 boosters when everyone said impossible. We're catching Super Heavy with chopsticks. "Massive engineering gap" is literally what I do.

And the "60-year-old CEO" argument? Bullshit. I'm healthier than most 30-year-olds. I work 80-100 hour weeks. I'll take whatever medical screening is needed.

Here's the thing Sam misses: First Mars mission HAS to have someone who won't quit. Who'll fix things when they break. Who understands every system. That's me. You don't send "specialists" on the first mission to an alien planet. You send people who'll make it work or die trying.

I'm not sending people to Mars. I'm going WITH people to Mars.`
      },
      {
        number: 3,
        type: 'Closing',
        mind1Argument: `This isn't about possibility - it's about probability and timeline.

Could Elon go to Mars? Physically possible if everything breaks right. Will he? The constraints stack up:
- Medical clearance at 60+
- SpaceX/Tesla/xAI demanding his presence
- Risk tolerance vs. value to humanity staying Earth-side
- Timeline slippage (Mars missions always slip)

Elon's superpower is making the impossible inevitable. He'll make Mars colonization real. But he'll do it from Mission Control, not from the ship.

That's not failure - that's impact maximization.`,
        mind2Argument: `Sam finally admits it: it's a bet. Not certainty. A bet where if he's wrong, humanity pays the price.

My bet: distributed power beats concentrated power, even with risks. History proves this.

Sam's solution requires trusting that OpenAI stays benevolent forever. That Sam never corrupts. That the board actually has power (November 2023 proved they don't). That Microsoft doesn't gradually take control.

Too many single points of failure.

I'll take distributed chaos over centralized control. Every time. See you on Mars.`
      }
    ]
  },
  {
    id: 'a1d9d458',
    topic: 'O sucesso de uma startup depende mais do fundador visionario ou da execucao tecnica do time?',
    framework: 'Steel Man Debate',
    date: '2025-10-17',
    mind1: { id: 'elon', name: 'Elon Musk', role: 'advocate_a' },
    mind2: { id: 'sam', name: 'Sam Altman', role: 'advocate_b' },
    views: 1567,
    rating: 4.5,
    rounds: [
      {
        number: 1,
        type: 'Steel Man Opponent',
        mind1Argument: `Let me steel man the "execution matters more" argument:

The graveyard of startups is full of visionary founders with bad execution. Ideas are cheap - everyone has them. What separates winners from losers is the ability to ship, iterate, and scale.

Technical excellence compounds. Good engineers attract good engineers. Clean architecture enables speed. Robust infrastructure survives growth.

Vision without execution is hallucination. The best founders I know spend 80% of their time on execution details, not grand visions.`,
        mind2Argument: `Let me steel man the "founder vision matters more" argument:

Execution can be hired. Vision cannot. You can train teams, fix processes, improve systems. But you cannot teach someone to see what doesn't exist yet.

Every great company started with one person's irrational belief in something impossible. Apple needed Jobs. Tesla needed Musk. OpenAI needed... well, we're working on it.

The market rewards contrarian bets. Consensus execution leads to commodity products. Only vision creates category-defining companies.`
      },
      {
        number: 2,
        type: 'Defend Own',
        mind1Argument: `Now my actual position: Vision is the multiplier, execution is the base.

Base * Multiplier = Outcome. If your execution (base) is zero, no vision multiplies it to success. But a 10x vision on 0.5x execution still beats 1x vision on 2x execution.

The key insight: vision attracts execution talent. SpaceX got the best engineers because of the Mars vision, not because of competitive salaries. Mission matters.

Founder's job: set the vision, then obsess over execution details. Both. Not one or the other.`,
        mind2Argument: `Agreed on the math, different conclusion.

In practice: you can pivot vision, you can't pivot execution culture. Bad execution habits calcify. Technical debt compounds. Team toxicity spreads.

I'd rather fund a B+ vision with A+ execution than the reverse. The B+ vision team will discover the A+ idea through iteration. The A+ vision team with B+ execution will never ship it.

That said, both matter. The debate is about emphasis, not exclusion.`
      }
    ]
  }
];

// --- SUB-COMPONENTS ---

const ChatMessage: React.FC<{
  user: string;
  text: string;
  time: string;
}> = ({ user, text, time }) => (
  <div className="flex gap-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
    <Avatar className="w-6 h-6 border border-border">
      <AvatarFallback className="bg-muted text-[9px] text-muted-foreground">
        {user.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-bold text-muted-foreground text-xs">{user}</span>
        <span className="text-[10px] text-muted-foreground/50">{time}</span>
      </div>
      <p className="text-muted-foreground leading-snug">{text}</p>
    </div>
  </div>
);

const LiveDebateCard: React.FC<{
  topic: string;
  mind1: Mind;
  mind2: Mind;
  round: number;
  totalRounds: number;
  viewers: number;
  score1: number;
  score2: number;
  onClick?: () => void;
}> = ({ topic, mind1, mind2, round, totalRounds, viewers, score1, score2, onClick }) => (
  <Card
    className="bg-card border-border hover:border-primary/30 transition-all cursor-pointer group"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
          <Icon name="users" size="size-3" /> {viewers.toLocaleString()} watching
        </span>
      </div>
      <h4 className="text-lg font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
        "{topic}"
      </h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={cn("border-2", mind1.color.replace('text-', 'border-'))}>
            <AvatarImage src={mind1.avatar} alt={mind1.name} />
            <AvatarFallback className="bg-muted text-xs">{getInitials(mind1.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-bold text-muted-foreground">{mind1.name.split(' ')[1]}</span>
        </div>
        <div className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">VS</div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-muted-foreground">{mind2.name.split(' ')[1]}</span>
          <Avatar className={cn("border-2", mind2.color.replace('text-', 'border-'))}>
            <AvatarImage src={mind2.avatar} alt={mind2.name} />
            <AvatarFallback className="bg-muted text-xs">{getInitials(mind2.name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground mb-1">
          <span>{mind1.name.split(' ')[1]} ({score1}%)</span>
          <span>Round {round}/{totalRounds}</span>
          <span>{mind2.name.split(' ')[1]} ({score2}%)</span>
        </div>
        <Progress value={score1} className="h-1" />
      </div>
    </CardContent>
  </Card>
);

// --- MAIN COMPONENT ---

export const ArenaTemplate: React.FC<ArenaTemplateProps> = ({ setSection }) => {
  const [view, setView] = useState<ViewState>('lobby');
  const { toast } = useToast();

  // Create State
  const [selectedMind1, setSelectedMind1] = useState<string | null>(null);
  const [selectedMind2, setSelectedMind2] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [framework, setFramework] = useState("oxford");
  const [visibility, setVisibility] = useState("public");

  // Live State
  const [currentRound, setCurrentRound] = useState(1);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [pollVotes, setPollVotes] = useState({ c1: 45, c2: 55 });
  const [userVoted, setUserVoted] = useState(false);
  const [totalRounds] = useState(5);

  // Real Data State
  const [minds, setMinds] = useState<Mind[]>(INITIAL_MINDS);
  const [activeDebateId, setActiveDebateId] = useState<string | null>(null);

  // Fetch Minds
  useEffect(() => {
    async function loadMinds() {
      try {
        const realMinds = await debateService.getMinds();
        if (realMinds.length > 0) {
          // Merge with initial/mock to keep stats or replace
          // For now replace, but safely
          setMinds(realMinds);
        }
      } catch (e) {
        console.error("Failed to load minds:", e);
      }
    }
    loadMinds();
  }, []);


  // Replay State
  const [selectedReplay, setSelectedReplay] = useState<Debate | SavedDebate | null>(null);
  const [replayRoundIndex, setReplayRoundIndex] = useState(0);

  // Fetch debates from database
  const { debates: dbDebates, loading: debatesLoading } = useDebates();

  // Combine DB debates with mock data (DB takes priority)
  const allDebates = useMemo(() => {
    if (dbDebates.length > 0) {
      // Transform DB debates to match SavedDebate interface
      return dbDebates.map(d => ({
        id: d.id,
        topic: d.topic,
        framework: d.framework,
        date: d.date,
        mind1: d.mind1,
        mind2: d.mind2,
        views: d.views,
        rating: d.rating,
        rounds: d.rounds.map(r => ({
          number: r.number,
          type: r.type,
          mind1Argument: r.mind1Argument,
          mind2Argument: r.mind2Argument
        }))
      }));
    }
    // Fall back to mock data if no DB data
    return SAVED_DEBATES;
  }, [dbDebates]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, streamedText]);

  // Mock Streaming Logic
  // SSE Streaming
  useEffect(() => {
    if (view === 'live' && isStreaming && activeDebateId) {
      console.log("Connecting to EventStream...", activeDebateId);
      const evtSource = debateService.getStreamSource(activeDebateId);

      evtSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          // Standard SSE format usually sends 'data' field
          // but sse-starlette sends the dict directly if formatted right
          // Actually, 'event.data' is the string payload.

          // However, our API sends:
          // event: status, data: "debating"
          // event: new_round, data: {...}
        } catch (e) {
          console.error("Parse error", e);
        }
      };

      evtSource.addEventListener("status", (event) => {
        const status = event.data;
        console.log("Status update:", status);
        if (status === 'completed') {
          setIsStreaming(false);
          evtSource.close();
          toast({ title: "Debate finalizado!" });
        }
      });

      evtSource.addEventListener("new_round", (event) => {
        const roundData = JSON.parse(event.data);
        const roundNum = roundData.number;

        // Add to history
        // We receive full arguments for round X
        setHistory(prev => {
          // Avoid duplicates
          if (prev.find(h => h.round === roundNum)) return prev;

          const m1 = minds.find(m => m.id === selectedMind1) || minds[0];
          const m2 = minds.find(m => m.id === selectedMind2) || minds[1];

          return [
            ...prev,
            { round: roundNum, speaker: m1, text: roundData.mind1_arg },
            { round: roundNum, speaker: m2, text: roundData.mind2_arg } // Wait, history structure is flat list of messages?
          ];
        });

        // Update round display
        setCurrentRound(roundNum + 1);
      });

      evtSource.addEventListener("end", () => {
        setIsStreaming(false);
        evtSource.close();
      });

      evtSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        // setIsStreaming(false); 
        // evtSource.close();
      };

      return () => {
        evtSource.close();
      };
    }
  }, [view, isStreaming, activeDebateId, selectedMind1, selectedMind2]);


  const handleStartDebate = async () => {
    if (!selectedMind1 || !selectedMind2 || !topic) {
      toast({
        title: "Configuracao incompleta",
        description: "Selecione duas mentes e um topico.",
        variant: "destructive"
      });
      return;
    }
    if (selectedMind1 === selectedMind2) {
      toast({
        title: "Erro",
        description: "Uma mente nao pode debater consigo mesma.",
        variant: "destructive"
      });
      return;
    }

    try {
      toast({ title: "Iniciando debate...", description: "Conectando ao Debate Engine..." });

      const result = await debateService.createDebate({
        mind1_id: selectedMind1,
        mind2_id: selectedMind2,
        topic: topic,
        framework: framework,
        rounds: 3 // MVP fixo
      });

      setActiveDebateId(result.debate_id);

      setView('live');
      setHistory([]);
      setCurrentRound(1);
      setUserVoted(false);
      setPollVotes({ c1: 45, c2: 55 });
      setIsStreaming(true);

    } catch (e) {
      toast({
        title: "Erro ao iniciar",
        description: String(e),
        variant: "destructive"
      });
    }
  };


  const handleVote = (mind: 'c1' | 'c2') => {
    if (userVoted) return;
    setUserVoted(true);
    setPollVotes(prev => ({
      ...prev,
      [mind]: prev[mind] + 1
    }));
    toast({ title: "Voto registrado!" });
  };

  const resetAndGoToLobby = () => {
    setView('lobby');
    setSelectedMind1(null);
    setSelectedMind2(null);
    setTopic("");
    setHistory([]);
    setCurrentRound(1);
    setIsStreaming(false);
    setUserVoted(false);
    setSelectedReplay(null);
    setReplayRoundIndex(0);
  };

  const handleWatchReplay = (debate: SavedDebate | Debate) => {
    setSelectedReplay(debate);
    setReplayRoundIndex(0);
    setView('replay');
    // Increment views if it's a DB debate
    if ('slug' in debate) {
      incrementDebateViews(debate.id);
    }
  };

  // --- VIEWS ---

  const renderLobby = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-8 md:p-16 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 uppercase tracking-widest px-4 py-1">
            Beta v1.0
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">ARENA</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
            Onde mentes lendarias debatem ideias em tempo real. Assista, vote e aprenda com a colisao de intelectos sinteticos.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold"
              onClick={() => setView('create')}
            >
              <Icon name="bolt" className="mr-2" /> Criar Debate
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Debates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Icon name="flame" className="text-red-500" /> Ao Vivo Agora
            </h3>
            <Button variant="link" className="text-muted-foreground">Ver Todos</Button>
          </div>

          <div className="grid gap-4">
            <LiveDebateCard
              topic="A IA deve ser Open Source ou Proprietaria?"
              mind1={minds[0]}
              mind2={minds[2]}

              round={3}
              totalRounds={5}
              viewers={1234}
              score1={52}
              score2={48}
            />
            <LiveDebateCard
              topic="O futuro do trabalho e remote ou presencial?"
              mind1={minds[1]}
              mind2={minds[4]}

              round={2}
              totalRounds={5}
              viewers={876}
              score1={61}
              score2={39}
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Icon name="trophy" className="text-brand-gold" /> Ranking Global
          </h3>
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              {minds.sort((a, b) => b.winRate - a.winRate).map((mind, i) => (

                <div
                  key={mind.id}
                  className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <span className={cn(
                    "text-lg font-black w-6 text-center",
                    i === 0 ? "text-brand-gold" : i === 1 ? "text-zinc-300" : i === 2 ? "text-amber-700" : "text-muted-foreground"
                  )}>
                    {i + 1}
                  </span>
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src={mind.avatar} alt={mind.name} />
                    <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
                      {getInitials(mind.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{mind.name}</p>
                    <p className="text-[10px] text-muted-foreground">{mind.debates} debates</p>
                  </div>
                  <Badge variant="outline" className="font-mono border-border text-muted-foreground">
                    {mind.winRate}% WR
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Replays Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Icon name="play-circle" className="text-primary" /> Debates Anteriores
          </h3>
          <Badge variant="outline" className="text-muted-foreground">
            {debatesLoading ? '...' : allDebates.length} replays
          </Badge>
        </div>

        {debatesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allDebates.map((debate) => {
              const m1 = minds.find(m => m.id === debate.mind1.id);
              const m2 = minds.find(m => m.id === debate.mind2.id);


              return (
                <Card
                  key={debate.id}
                  className="bg-card border-border hover:border-primary/30 transition-all cursor-pointer group"
                  onClick={() => handleWatchReplay(debate)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-muted">
                        <Icon name="play" size="size-3" className="mr-1" /> Replay
                      </Badge>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="eye" size="size-3" /> {debate.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="star" size="size-3" className="text-yellow-500" /> {debate.rating}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      "{debate.topic}"
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Badge variant="outline" className="text-[10px]">{debate.framework}</Badge>
                      <span>{debate.rounds.length} rounds</span>
                      <span>{debate.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 border border-border">
                          <AvatarImage src={m1?.avatar} alt={debate.mind1.name} />
                          <AvatarFallback className={cn("bg-muted text-xs font-bold", m1?.color)}>
                            {getInitials(debate.mind1.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground">{debate.mind1.name.split(' ')[1]}</span>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">{debate.mind2.name.split(' ')[1]}</span>
                        <Avatar className="w-8 h-8 border border-border">
                          <AvatarImage src={m2?.avatar} alt={debate.mind2.name} />
                          <AvatarFallback className={cn("bg-muted text-xs font-bold", m2?.color)}>
                            {getInitials(debate.mind2.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => setView('lobby')}>
          <Icon name="arrow-left" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Configurar Debate</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Mind 1 Selector */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center">
            Proponente (Thesis)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {minds.map(mind => (
              <MindCardSelect
                key={`c1-${mind.id}`}
                id={mind.id}
                name={mind.name}
                shortBio={mind.role}
                avatar={mind.avatar}
                apexScore={null}
                selected={selectedMind1 === mind.id}
                onClick={() => setSelectedMind1(mind.id)}
              />
            ))}
          </div>
        </div>

        {/* Mind 2 Selector */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center">
            Oponente (Antithesis)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {minds.map(mind => (
              <MindCardSelect
                key={`c2-${mind.id}`}
                id={mind.id}
                name={mind.name}
                shortBio={mind.role}
                avatar={mind.avatar}
                apexScore={null}
                selected={selectedMind2 === mind.id}
                onClick={() => setSelectedMind2(mind.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Settings */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Topico do Debate</label>
          <Input
            placeholder="Ex: A Inteligencia Artificial tera consciencia?"
            className="h-12 text-lg"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic("O futuro do trabalho remoto")}
            >
              Futuro do Trabalho
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic("Universal Basic Income")}
            >
              UBI
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic("Colonizacao de Marte")}
            >
              Marte
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic("A IA deve ser Open Source?")}
            >
              IA Open Source
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Framework</label>
            <Select
              value={framework}
              onValueChange={setFramework}
              options={FRAMEWORKS.map(f => ({ label: f.name, value: f.id }))}
            />
            <p className="text-xs text-muted-foreground">
              {FRAMEWORKS.find(f => f.id === framework)?.desc}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Visibilidade</label>
            <Select
              value={visibility}
              onValueChange={setVisibility}
              options={[
                { label: 'Publico', value: 'public' },
                { label: 'Privado', value: 'private' }
              ]}
            />
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-14 text-lg font-bold mt-8"
          onClick={handleStartDebate}
        >
          <Icon name="play" className="mr-2" /> Iniciar Debate
        </Button>
      </div>
    </div>
  );

  const renderLive = () => {
    const c1 = minds.find(c => c.id === selectedMind1);
    const c2 = minds.find(c => c.id === selectedMind2);

    if (!c1 || !c2) return null;

    const activeSpeaker = isStreaming ? (currentRound % 2 !== 0 ? c1 : c2) : null;
    const debateRound = Math.ceil(currentRound / 2);

    return (
      <div className="h-[calc(100vh-200px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
        {/* Main Stage (Transcript) */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden relative">
          {/* Header */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="destructive" className="animate-pulse">AO VIVO</Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  Round {debateRound}/{totalRounds} - {FRAMEWORKS.find(f => f.id === framework)?.name}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground leading-tight">{topic}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-foreground">
                  {pollVotes.c1} <span className="text-muted-foreground text-sm font-normal">vs</span> {pollVotes.c2}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Votos da Comunidade
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <div className="h-1 w-full bg-muted flex">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 border-r border-background",
                  i + 1 < debateRound ? "bg-muted-foreground" :
                    i + 1 === debateRound ? "bg-primary animate-pulse" : "bg-transparent"
                )}
              />
            ))}
          </div>

          {/* Transcript Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-8 pb-20">
              {/* History */}
              {history.map((turn, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-6",
                    turn.speaker.id === c1.id ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  <Avatar className="w-12 h-12 border-2 border-border shrink-0">
                    <AvatarImage src={turn.speaker.avatar} alt={turn.speaker.name} />
                    <AvatarFallback className="bg-muted font-bold text-xs">{getInitials(turn.speaker.name)}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "flex-1 space-y-2",
                    turn.speaker.id === c1.id ? "text-left" : "text-right"
                  )}>
                    <div
                      className="flex items-baseline gap-2"
                      style={{ justifyContent: turn.speaker.id === c1.id ? 'flex-start' : 'flex-end' }}
                    >
                      <span className="font-bold text-foreground">{turn.speaker.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">Round {turn.round}</span>
                    </div>
                    <p className="text-muted-foreground font-serif text-lg leading-relaxed">{turn.text}</p>
                  </div>
                </div>
              ))}

              {/* Active Streaming */}
              {isStreaming && activeSpeaker && (
                <div className={cn(
                  "flex gap-6",
                  activeSpeaker.id === c1.id ? "flex-row" : "flex-row-reverse"
                )}>
                  <Avatar className="w-12 h-12 border-2 border-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)] shrink-0 animate-pulse">
                    <AvatarFallback className="bg-muted font-bold text-foreground">
                      {activeSpeaker.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "flex-1 space-y-2",
                    activeSpeaker.id === c1.id ? "text-left" : "text-right"
                  )}>
                    <div
                      className="flex items-baseline gap-2"
                      style={{ justifyContent: activeSpeaker.id === c1.id ? 'flex-start' : 'flex-end' }}
                    >
                      <span className="font-bold text-primary">{activeSpeaker.name}</span>
                      <span className="text-xs text-muted-foreground font-mono animate-pulse">Digitando...</span>
                    </div>
                    <p className="text-foreground font-serif text-lg leading-relaxed">
                      {streamedText}
                      <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse align-middle" />
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Controls Footer */}
          <div className="p-4 border-t border-border bg-muted/30 flex justify-between items-center">
            <Button variant="ghost" onClick={resetAndGoToLobby} className="text-muted-foreground hover:text-foreground">
              <Icon name="arrow-left" className="mr-2" /> Sair
            </Button>
            <div className="flex gap-4">
              <Button
                variant={userVoted ? "outline" : "default"}
                className={cn(userVoted && "opacity-50")}
                onClick={() => handleVote('c1')}
                disabled={userVoted}
              >
                Vote {c1.name.split(' ')[1]}
              </Button>
              <Button
                variant={userVoted ? "outline" : "default"}
                className={cn(userVoted && "opacity-50")}
                onClick={() => handleVote('c2')}
                disabled={userVoted}
              >
                Vote {c2.name.split(' ')[1]}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {/* Fidelity Stats */}
          <Card className="bg-card border-border">
            <CardHeader className="py-3 border-b border-border">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Fidelity Score (Live)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-foreground">
                  <span>{c1.name}</span>
                  <span>{c1.fidelity}%</span>
                </div>
                <Progress value={c1.fidelity} className="h-1.5" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-foreground">
                  <span>{c2.name}</span>
                  <span>{c2.fidelity}%</span>
                </div>
                <Progress value={c2.fidelity} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card className="bg-card border-border flex-1 flex flex-col min-h-[300px]">
            <CardHeader className="py-3 border-b border-border flex flex-row justify-between items-center">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Chat da Comunidade
              </CardTitle>
              <Badge variant="outline" className="text-[9px] border-border text-muted-foreground">
                234 online
              </Badge>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                <ChatMessage user="CryptoKing" text="Argumento forte!" time="14:02" />
                <ChatMessage user="Sarah_AI" text="O argumento sobre seguranca e muito solido." time="14:03" />
                <ChatMessage user="Dev_Junior" text="Alguem mais notou a referencia ao paper de 2019?" time="14:03" />
                <ChatMessage user="Anon" text="Team Open Source sempre!" time="14:04" />
                <ChatMessage user="Mod_Bot" text="Votacao aberta." time="14:05" />
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <Input placeholder="Comente algo..." className="h-9 text-xs" />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderReplay = () => {
    if (!selectedReplay) return null;

    const m1 = minds.find(m => m.id === selectedReplay.mind1.id);
    const m2 = minds.find(m => m.id === selectedReplay.mind2.id);


    return (
      <div className="h-[calc(100vh-200px)] flex flex-col animate-in fade-in duration-500">
        {/* Header */}
        <div className="p-4 border-b border-border flex justify-between items-center bg-card rounded-t-2xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={resetAndGoToLobby}>
              <Icon name="arrow-left" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="bg-muted">
                  <Icon name="play" size="size-3" className="mr-1" /> Replay
                </Badge>
                <Badge variant="outline">{selectedReplay.framework}</Badge>
                <Badge variant="outline">{selectedReplay.rounds.length} rounds</Badge>
              </div>
              <h2 className="text-lg font-bold text-foreground">{selectedReplay.topic}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="eye" size="size-4" /> {selectedReplay.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="star" size="size-4" className="text-yellow-500" /> {selectedReplay.rating}
            </span>
            <span>{selectedReplay.date}</span>
          </div>
        </div>

        {/* Participants Bar */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-border">
              <AvatarImage src={m1?.avatar} alt={selectedReplay.mind1.name} />
              <AvatarFallback className={cn("bg-muted font-bold", m1?.color)}>
                {getInitials(selectedReplay.mind1.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-foreground">{selectedReplay.mind1.name}</p>
              <p className="text-xs text-muted-foreground">{selectedReplay.mind1.role}</p>
            </div>
          </div>
          <span className="text-xl font-black text-muted-foreground/30">VS</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-foreground">{selectedReplay.mind2.name}</p>
              <p className="text-xs text-muted-foreground">{selectedReplay.mind2.role}</p>
            </div>
            <Avatar className="w-10 h-10 border-2 border-border">
              <AvatarImage src={m2?.avatar} alt={selectedReplay.mind2.name} />
              <AvatarFallback className={cn("bg-muted font-bold", m2?.color)}>
                {getInitials(selectedReplay.mind2.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Debate Timeline */}
        <div className="flex-1 overflow-hidden bg-card rounded-b-2xl border border-t-0 border-border">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
              {selectedReplay.rounds.map((round, roundIdx) => (
                <div key={roundIdx} className="space-y-6">
                  {/* Round Header */}
                  <div className="flex items-center gap-4 py-4">
                    <Separator className="flex-1" />
                    <Badge variant="outline" className="px-4 py-1 text-xs font-bold uppercase tracking-widest">
                      Round {round.number} - {round.type}
                    </Badge>
                    <Separator className="flex-1" />
                  </div>

                  {/* Mind 1 Argument */}
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border-2 border-border shrink-0 mt-1">
                      <AvatarImage src={m1?.avatar} alt={selectedReplay.mind1.name} />
                      <AvatarFallback className={cn("bg-muted font-bold text-sm", m1?.color)}>
                        {selectedReplay.mind1.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-foreground">{selectedReplay.mind1.name}</span>
                        <span className="text-xs text-muted-foreground">Round {round.number}</span>
                      </div>
                      <div className="bg-muted/20 rounded-2xl rounded-tl-sm p-4 border border-border/50">
                        <p className="text-foreground font-serif leading-relaxed whitespace-pre-line">
                          {round.mind1Argument}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mind 2 Argument */}
                  <div className="flex gap-4 flex-row-reverse">
                    <Avatar className="w-10 h-10 border-2 border-border shrink-0 mt-1">
                      <AvatarImage src={m2?.avatar} alt={selectedReplay.mind2.name} />
                      <AvatarFallback className={cn("bg-muted font-bold text-sm", m2?.color)}>
                        {selectedReplay.mind2.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="text-xs text-muted-foreground">Round {round.number}</span>
                        <span className="font-bold text-foreground">{selectedReplay.mind2.name}</span>
                      </div>
                      <div className="bg-primary/5 rounded-2xl rounded-tr-sm p-4 border border-primary/10">
                        <p className="text-foreground font-serif leading-relaxed whitespace-pre-line">
                          {round.mind2Argument}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* End of Debate */}
              <div className="flex items-center gap-4 py-8">
                <Separator className="flex-1" />
                <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-widest">
                  Fim do Debate
                </Badge>
                <Separator className="flex-1" />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-card flex justify-between items-center mt-4 rounded-2xl">
          <Button variant="outline" onClick={resetAndGoToLobby}>
            <Icon name="arrow-left" className="mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="clock" size="size-4" />
            <span>{selectedReplay.rounds.length} rounds completos</span>
          </div>
          <Button variant="outline">
            <Icon name="share" className="mr-2" /> Compartilhar
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_ARENA} setSection={setSection} />
      <div className="flex-1 w-full">
        <div className="p-6 max-w-[1400px] mx-auto w-full h-full">
          {view === 'lobby' && renderLobby()}
          {view === 'create' && renderCreate()}
          {view === 'live' && renderLive()}
          {view === 'replay' && renderReplay()}
        </div>
      </div>
    </div>
  );
};

export default ArenaTemplate;
