/**
 * Hook for auth form state management
 */

import { useState } from 'react';
import type { AuthView } from '../types';

export function useAuthForm(initialView: AuthView = 'login') {
  const [view, setView] = useState<AuthView>(initialView);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleViewChange = (newView: AuthView) => {
    setIsTransitioning(true);
    setError(null);
    setSuccess(null);
    setTimeout(() => {
      setView(newView);
      setIsTransitioning(false);
    }, 150);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    view,
    setView,
    isTransitioning,
    error,
    setError,
    success,
    setSuccess,
    handleViewChange,
    clearMessages,
  };
}
