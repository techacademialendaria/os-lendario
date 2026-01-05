import { useState, useCallback } from 'react';
import type { UseFragmentCreateFormReturn } from '../types';

export function useFragmentCreateForm(): UseFragmentCreateFormReturn {
  // Form values
  const [type, setType] = useState('belief');
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');
  const [insight, setInsight] = useState('');
  const [location, setLocation] = useState('manual');
  const [relevance, setRelevance] = useState(5);
  const [confidence, setConfidence] = useState(50);

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setType('belief');
    setContent('');
    setContext('');
    setInsight('');
    setLocation('manual');
    setRelevance(5);
    setConfidence(50);
    setError(null);
  }, []);

  const validate = useCallback((): boolean => {
    if (!content.trim()) {
      setError('O conteudo e obrigatorio');
      return false;
    }
    if (!context.trim()) {
      setError('O contexto e obrigatorio');
      return false;
    }
    if (!insight.trim()) {
      setError('O insight e obrigatorio');
      return false;
    }
    return true;
  }, [content, context, insight]);

  return {
    type,
    setType,
    content,
    setContent,
    context,
    setContext,
    insight,
    setInsight,
    location,
    setLocation,
    relevance,
    setRelevance,
    confidence,
    setConfidence,
    isCreating,
    error,
    reset,
    setError,
    setIsCreating,
    validate,
  };
}
