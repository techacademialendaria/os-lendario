/**
 * WhatsApp Groups Chat Service
 * Calls Edge Function for AI-powered group insights
 */

import { groupsSupabase } from '../lib/groups-supabase';
import type { ChatResponse } from '../types/groups';

// URL da Edge Function
const SUPABASE_URL = import.meta.env.VITE_GROUPS_SUPABASE_URL || 'https://hoooaulqoulkyrmwtaij.supabase.co';
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/chat-ai`;

/**
 * Envia mensagem para o chat via Edge Function
 */
export async function sendChatMessage(request: {
  grupo: string;
  query: string;
  history?: { role: string; content: string }[];
}): Promise<ChatResponse> {
  try {
    // Obter token de sessão (se houver autenticação)
    const { data: { session } } = await groupsSupabase.auth.getSession();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Adiciona token de autenticação se disponível
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        grupo: request.grupo,
        query: request.query,
        history: request.history || [],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro na Edge Function:', errorData);

      // Mensagens de erro amigáveis
      if (response.status === 500 && errorData.error?.includes('não configurado')) {
        return {
          answer: 'O serviço de IA não está configurado. Entre em contato com o administrador.',
          error: errorData.error,
        };
      }

      return {
        answer: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.',
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      answer: data.answer || 'Sem resposta',
      sources: data.sources,
    };
  } catch (error) {
    console.error('Erro no chat:', error);

    // Detecta erro de rede/CORS
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        answer: 'Erro de conexão com o servidor. Verifique se a Edge Function está ativa.',
        error: 'Network error',
      };
    }

    return {
      answer: 'Desculpe, ocorreu um erro de conexão. Verifique sua internet e tente novamente.',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Verifica se o serviço está configurado
 * Edge Function está sempre "disponível" do ponto de vista do frontend
 */
export function isChatServiceConfigured(): boolean {
  return true;
}
