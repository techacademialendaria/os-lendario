import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PHASE_OPTIONS } from '../types';

interface UseBatchActionsOptions {
  playBook: (slug: string) => Promise<{ success: boolean; message: string }>;
  pauseBook: (slug: string) => Promise<{ success: boolean; message: string }>;
  retryBook: (slug: string, fromPhase?: number) => Promise<{ success: boolean; message: string }>;
  removeBook: (slug: string) => Promise<{ success: boolean; message: string }>;
  addBook: (title: string, author: string, slug?: string) => Promise<{ success: boolean; message: string }>;
  retryAllFailed: () => Promise<{ success: boolean; message: string }>;
  pauseAll: () => Promise<{ success: boolean; message: string }>;
}

export function useBatchActions(options: UseBatchActionsOptions) {
  const { toast } = useToast();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState<string | null>(null);

  const handlePlay = async (slug: string) => {
    setActionLoading(slug);
    const result = await options.playBook(slug);
    setActionLoading(null);
    toast({
      title: result.success ? 'Pipeline iniciado' : 'Erro',
      description: result.message,
      variant: result.success ? 'success' : 'destructive',
    });
  };

  const handlePause = async (slug: string) => {
    setActionLoading(slug);
    const result = await options.pauseBook(slug);
    setActionLoading(null);
    toast({
      title: result.success ? 'Pipeline pausado' : 'Erro',
      description: result.message,
      variant: result.success ? 'warning' : 'destructive',
    });
  };

  const handleRetry = async (slug: string, fromPhase: number = 1) => {
    setActionLoading(slug);
    const result = await options.retryBook(slug, fromPhase);
    setActionLoading(null);
    toast({
      title: result.success ? 'Pipeline reiniciado' : 'Erro',
      description: result.success
        ? `Fase ${fromPhase}: ${PHASE_OPTIONS[fromPhase - 1]?.label}`
        : result.message,
      variant: result.success ? 'success' : 'destructive',
    });
  };

  const handleRemove = async (slug: string) => {
    setActionLoading(slug);
    const result = await options.removeBook(slug);
    setActionLoading(null);
    toast({
      title: result.success ? 'Removido do pipeline' : 'Erro',
      description: result.message,
      variant: result.success ? 'success' : 'destructive',
    });
  };

  const handleAddBook = async (title: string, author: string, slug?: string) => {
    const result = await options.addBook(title, author, slug);
    if (result.success) {
      toast({ title: 'Livro adicionado', description: result.message });
    } else {
      toast({
        title: 'Erro ao adicionar',
        description: result.message,
        variant: 'destructive',
      });
    }
    return result;
  };

  const handleRetryAllFailed = async () => {
    setBulkLoading('retry');
    const result = await options.retryAllFailed();
    setBulkLoading(null);
    toast({
      title: result.success ? 'Retry em lote' : 'Erro',
      description: result.message,
      variant: result.success ? 'success' : 'destructive',
    });
  };

  const handlePauseAll = async () => {
    setBulkLoading('pause');
    const result = await options.pauseAll();
    setBulkLoading(null);
    toast({
      title: result.success ? 'Todos pausados' : 'Erro',
      description: result.message,
      variant: result.success ? 'warning' : 'destructive',
    });
  };

  return {
    actionLoading,
    bulkLoading,
    handlePlay,
    handlePause,
    handleRetry,
    handleRemove,
    handleAddBook,
    handleRetryAllFailed,
    handlePauseAll,
  };
}
