// @ts-nocheck
import React, { useEffect } from 'react';
import { Section } from '../../../types';
import MindsTopbar from '../MindsTopbar';
import { debateService } from '../../../services/debateService';
import { useArena, type Mind } from '../../../hooks/useArena';
import { ArenaCreate, type DebateConfig } from '../arena-create';
import { FrameworksLibrary } from '../arena/FrameworksLibrary';
import { DebatesList } from '../arena/DebatesList';
import { ArenaLiveView } from '../arena/ArenaLiveView';
import { ArenaReplayView } from '../arena/ArenaReplayView';
import { usePageTitle } from '../../../hooks/usePageTitle';

// --- TYPES ---

type ViewState = 'lobby' | 'create' | 'live' | 'replay' | 'frameworks';

// Mind type is imported from useArena hook

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
  {
    id: 'elon',
    name: 'Elon Musk',
    role: 'Visionary Engineer',
    avatar: '/minds/elon_musk.jpg',
    winRate: 70,
    debates: 127,
    fidelity: 92,
    color: 'text-cyan-400',
  },
  {
    id: 'naval',
    name: 'Naval Ravikant',
    role: 'Modern Philosopher',
    avatar: '/minds/naval_ravikant.jpg',
    winRate: 65,
    debates: 98,
    fidelity: 95,
    color: 'text-studio-primary',
  },
  {
    id: 'sam',
    name: 'Sam Altman',
    role: 'AI Architect',
    avatar: '/minds/sam_altman.jpg',
    winRate: 63,
    debates: 145,
    fidelity: 88,
    color: 'text-blue-400',
  },
  {
    id: 'nassim',
    name: 'Nassim Taleb',
    role: 'Risk Analyst',
    avatar: '/minds/nassim_taleb.jpg',
    winRate: 60,
    debates: 73,
    fidelity: 90,
    color: 'text-red-400',
  },
  {
    id: 'ray',
    name: 'Ray Dalio',
    role: 'Macro Investor',
    avatar: '/minds/ray_dalio.jpg',
    winRate: 54,
    debates: 54,
    fidelity: 85,
    color: 'text-green-400',
  },
];

// --- MAIN COMPONENT ---

export const ArenaTemplate: React.FC<ArenaTemplateProps> = ({ setSection }) => {
  // Page title
  usePageTitle('Arena');

  // Centralized state management via useArena hook
  const arena = useArena(INITIAL_MINDS);
  const {
    view,
    setView,
    selectedMind1,
    setSelectedMind1,
    selectedMind2,
    setSelectedMind2,
    topic,
    setTopic,
    framework,
    setFramework,
    visibility,
    setVisibility,
    currentRound,
    setCurrentRound,
    isStreaming,
    setIsStreaming,
    streamedText,
    setStreamedText,
    history,
    setHistory,
    pollVotes,
    setPollVotes,
    userVoted,
    setUserVoted,
    totalRounds,
    minds,
    setMinds,
    activeDebateId,
    setActiveDebateId,
    selectedReplay,
    setSelectedReplay,
    replayRoundIndex,
    setReplayRoundIndex,
    allDebates,
    debatesLoading,
    messagesEndRef,
    handleStartDebate,
    handleVote,
    resetAndGoToLobby,
    handleWatchReplay,
  } = arena;

  // Scroll to bottom of transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, streamedText]);

  // Mock Streaming Logic
  // SSE Streaming
  useEffect(() => {
    if (view === 'live' && isStreaming && activeDebateId) {
      console.log('Connecting to EventStream...', activeDebateId);
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
          console.error('Parse error', e);
        }
      };

      evtSource.addEventListener('status', (event) => {
        const status = event.data;
        console.log('Status update:', status);
        if (status === 'completed') {
          setIsStreaming(false);
          evtSource.close();
          toast({ title: 'Debate finalizado!' });
        }
      });

      evtSource.addEventListener('new_round', (event) => {
        const roundData = JSON.parse(event.data);
        const roundNum = roundData.number;

        // Add to history
        // We receive full arguments for round X
        setHistory((prev) => {
          // Avoid duplicates
          if (prev.find((h) => h.round === roundNum)) return prev;

          const m1 = minds.find((m) => m.id === selectedMind1) || minds[0];
          const m2 = minds.find((m) => m.id === selectedMind2) || minds[1];

          return [
            ...prev,
            { round: roundNum, speaker: m1, text: roundData.mind1_arg },
            { round: roundNum, speaker: m2, text: roundData.mind2_arg }, // Wait, history structure is flat list of messages?
          ];
        });

        // Update round display
        setCurrentRound(roundNum + 1);
      });

      evtSource.addEventListener('end', () => {
        setIsStreaming(false);
        evtSource.close();
      });

      evtSource.onerror = (err) => {
        console.error('EventSource failed:', err);
        // setIsStreaming(false);
        // evtSource.close();
      };

      return () => {
        evtSource.close();
      };
    }
  }, [view, isStreaming, activeDebateId, selectedMind1, selectedMind2]);

  // --- VIEWS ---

  const renderLobby = () => <DebatesList state={arena} />;

  const renderCreate = () => {
    const frameworks: any[] = [
      {
        id: 'oxford',
        name: 'Oxford Debate',
        rounds: 5,
        desc: 'Clássico: Abertura, Refutação, Encerramento.',
      },
      {
        id: 'socratic',
        name: 'Socratic Dialogue',
        rounds: 7,
        desc: 'Exploração através de perguntas profundas.',
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

    const handleStartDebate = (config: DebateConfig) => {
      const mind1 = minds.find((m) => m.id === config.clone1Id);
      const mind2 = minds.find((m) => m.id === config.clone2Id);

      if (mind1 && mind2) {
        setSelectedMind1(config.clone1Id);
        setSelectedMind2(config.clone2Id);
        setTopic(config.topic);
        setFrameworkId(config.frameworkId);
        // Start the debate
        setTimeout(() => handleStartLive(config.clone1Id, config.clone2Id, config.topic), 100);
      }
    };

    return (
      <ArenaCreate
        minds={minds}
        frameworks={frameworks}
        onBack={() => setView('lobby')}
        onStart={handleStartDebate}
      />
    );
  };

  // NOTE: renderCreateOld, renderLive, and renderReplay have been extracted to separate components:
  // - ArenaLiveView (./arena/ArenaLiveView.tsx)
  // - ArenaReplayView (./arena/ArenaReplayView.tsx)
  // renderCreateOld was dead code and has been removed

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_ARENA} setSection={setSection} />
      <div className="w-full flex-1">
        <div className="mx-auto h-full w-full max-w-[1400px] p-6">
          {view === 'lobby' && renderLobby()}
          {view === 'create' && renderCreate()}
          {view === 'live' && (
            <ArenaLiveView
              minds={minds}
              selectedMind1={selectedMind1}
              selectedMind2={selectedMind2}
              topic={topic}
              framework={framework}
              currentRound={currentRound}
              totalRounds={totalRounds}
              isStreaming={isStreaming}
              streamedText={streamedText}
              history={history}
              pollVotes={pollVotes}
              userVoted={userVoted}
              messagesEndRef={messagesEndRef}
              onVote={handleVote}
              onExit={resetAndGoToLobby}
            />
          )}
          {view === 'replay' && (
            <ArenaReplayView
              selectedReplay={selectedReplay}
              minds={minds}
              onBack={resetAndGoToLobby}
            />
          )}
          {view === 'frameworks' && (
            <FrameworksLibrary
              onSelectFramework={(fw) => {
                // TODO: Navigate to create with selected framework
                setView('create');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArenaTemplate;
