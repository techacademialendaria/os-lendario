import { useState } from 'react';

export interface UseArenaConfigReturn {
  topic: string;
  setTopic: (topic: string) => void;
  framework: string;
  setFramework: (framework: string) => void;
}

export function useArenaConfig(): UseArenaConfigReturn {
  const [topic, setTopic] = useState('');
  const [framework, setFramework] = useState('oxford');

  return {
    topic,
    setTopic,
    framework,
    setFramework,
  };
}
