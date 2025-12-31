export type ViewState = 'lobby' | 'create' | 'live' | 'replay' | 'frameworks';

export interface Clone {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
  personality: string; // Instructions for the AI
}

export interface DebateConfig {
  clone1Id: string;
  clone2Id: string;
  topic: string;
  frameworkId: string;
}

// Clone-based HistoryItem (used in ArenaLive.tsx)
export interface HistoryItem {
  round: number;
  speaker: Clone;
  text: string;
}

// Mind interface (used by useArena hook)
export interface Mind {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
}

// Mind-based HistoryItem (used in ArenaLiveView.tsx)
export interface MindHistoryItem {
  round: number;
  speaker: Mind;
  text: string;
}

// Framework interface
export interface Framework {
  id: string;
  name: string;
  rounds: number;
  desc: string;
}

// SavedDebate interface for replay functionality
export interface SavedDebate {
  id: string;
  topic: string;
  framework: string;
  date: string;
  mind1: { id: string; name: string; role: string; avatar?: string };
  mind2: { id: string; name: string; role: string; avatar?: string };
  rounds: Array<{
    number: number;
    type: string;
    mind1Argument: string;
    mind2Argument: string;
  }>;
  views: number;
  rating: number;
}

// --- HELPER FUNCTIONS ---

/**
 * Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
 */
export const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// --- MOCK DATA ---

export const INITIAL_MINDS: Mind[] = [
  {
    id: 'elon',
    name: 'Elon Musk',
    role: 'Visionary Engineer',
    avatar: '/minds-profile-images/elon_musk.jpg',
    winRate: 70,
    debates: 127,
    fidelity: 92,
    color: 'text-cyan-400',
  },
  {
    id: 'naval',
    name: 'Naval Ravikant',
    role: 'Modern Philosopher',
    avatar: '/minds-profile-images/naval_ravikant.jpg',
    winRate: 65,
    debates: 98,
    fidelity: 95,
    color: 'text-studio-primary',
  },
  {
    id: 'sam',
    name: 'Sam Altman',
    role: 'AI Architect',
    avatar: '/minds-profile-images/sam_altman.jpg',
    winRate: 63,
    debates: 145,
    fidelity: 88,
    color: 'text-blue-400',
  },
  {
    id: 'nassim',
    name: 'Nassim Taleb',
    role: 'Risk Analyst',
    avatar: '/minds-profile-images/nassim_taleb.jpg',
    winRate: 60,
    debates: 73,
    fidelity: 90,
    color: 'text-red-400',
  },
  {
    id: 'ray',
    name: 'Ray Dalio',
    role: 'Macro Investor',
    avatar: '/minds-profile-images/ray_dalio.jpg',
    winRate: 54,
    debates: 54,
    fidelity: 85,
    color: 'text-green-400',
  },
];

export const FRAMEWORKS: Framework[] = [
  {
    id: 'oxford',
    name: 'Oxford Debate',
    rounds: 5,
    desc: 'Classico: Abertura, Refutacao, Encerramento.',
  },
  {
    id: 'socratic',
    name: 'Socratic Dialogue',
    rounds: 7,
    desc: 'Exploracao atraves de perguntas profundas.',
  },
  {
    id: 'steelman',
    name: 'Steel Man',
    rounds: 4,
    desc: 'Defender o melhor argumento do oponente.',
  },
  {
    id: 'twitter',
    name: 'X/Twitter Thread',
    rounds: 6,
    desc: 'Batalha viral de argumentos curtos e incisivos.',
  },
];

export const MOCK_ARGUMENTS: Record<string, string[]> = {
  elon: [
    'A centralizacao do desenvolvimento de IA e um risco existencial. Open source permite auditoria global e democratizacao do poder. Se apenas uma empresa controlar a AGI, teremos uma ditadura digital inevitavel.',
    "First principles: sistemas centralizados falham catastroficamente. Fisica nao mente. Open source permite auditoria distribuida. Como sei que seus safeguards funcionam? 'Confia em mim, brother?'",
    "Sam's argument boils down to: 'Too hard, too risky'. That's exactly the thinking that would've kept us in caves.",
  ],
  sam: [
    'Seguranca deve vir antes de abertura. Liberar modelos poderosos sem salvaguardas e como dar uranio enriquecido para qualquer um. Precisamos de governanca centralizada ate entendermos os riscos.',
    'O argumento sobre seguranca nao e sobre controle, e sobre responsabilidade. GPT-4 e poderoso demais para release open source irrestrito. Imagina modelos de bioweapons design...',
    'A questao nao e possibilidade - e probabilidade e timeline. Iterative deployment funciona.',
  ],
  naval: [
    "Wealth creation is not zero-sum. Technology amplifies human capability. The question isn't whether AI should be open, but how we structure incentives for beneficial development.",
    'Play long-term games with long-term people. The AI race rewards short-term thinking. We need to optimize for civilizational upside, not quarterly returns.',
    "Specific knowledge in AI will be the most valuable skill. But specific knowledge requires authenticity - you can't fake understanding alignment.",
  ],
  nassim: [
    'O problema nao e o risco conhecido, e o risco que nao conseguimos calcular. Fat tails in AI development mean we should be more cautious, not less.',
    "Skin in the game: if you're building AGI, you should be the first to suffer the consequences of failure. Centralized development without accountability is asymmetric risk.",
    'Antifragility requires optionality. Open source provides more options for recovery than a single point of failure.',
  ],
  ray: [
    'Principles matter more than positions. In AI development, we need to establish clear principles for decision-making before we face the hard choices.',
    'The economy is a machine. AI is adding new gears to that machine. We need to understand the second and third-order effects before accelerating.',
    'Radical transparency is the only way to build trust. Closed AI development creates information asymmetries that will eventually destabilize markets.',
  ],
};

export const SAVED_DEBATES: SavedDebate[] = [
  {
    id: '87e7fe78',
    topic: 'Elon Musk nao vai conseguir ir para Marte',
    framework: 'Oxford Debate',
    date: '2025-10-14',
    mind1: {
      id: 'sam',
      name: 'Sam Altman',
      role: 'proposer',
      avatar: '/minds-profile-images/sam_altman.jpg',
    },
    mind2: {
      id: 'elon',
      name: 'Elon Musk',
      role: 'opposer',
      avatar: '/minds-profile-images/elon_musk.jpg',
    },
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

Sam's playing it safe. That's fine for venture capital. For existential missions, you go all in. I'm going.`,
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

I'm not sending people to Mars. I'm going WITH people to Mars.`,
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

I'll take distributed chaos over centralized control. Every time. See you on Mars.`,
      },
    ],
  },
  {
    id: 'a1d9d458',
    topic:
      'O sucesso de uma startup depende mais do fundador visionario ou da execucao tecnica do time?',
    framework: 'Steel Man Debate',
    date: '2025-10-17',
    mind1: {
      id: 'elon',
      name: 'Elon Musk',
      role: 'advocate_a',
      avatar: '/minds-profile-images/elon_musk.jpg',
    },
    mind2: {
      id: 'sam',
      name: 'Sam Altman',
      role: 'advocate_b',
      avatar: '/minds-profile-images/sam_altman.jpg',
    },
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

The market rewards contrarian bets. Consensus execution leads to commodity products. Only vision creates category-defining companies.`,
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

That said, both matter. The debate is about emphasis, not exclusion.`,
      },
    ],
  },
];
