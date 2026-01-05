import type { Integration, TeamMember, LogEntry, ObjectionCategory } from '../types';

export const MOCK_INTEGRATIONS: Integration[] = [
  { name: 'Bluedot', status: 'connected', lastSync: '2 min atras', icon: 'microphone' },
  { name: 'N8N', status: 'connected', lastSync: '15 min atras', icon: 'network-cloud' },
  { name: 'Gemini', status: 'connected', lastSync: '5 min atras', icon: 'sparkles' },
  { name: 'Supabase', status: 'connected', lastSync: 'Agora', icon: 'database' },
  { name: 'ActiveCampaign', status: 'error', lastSync: '2 dias atras', icon: 'envelope' },
  { name: 'ClickUp', status: 'connected', lastSync: '1 hora atras', icon: 'check-square' },
  { name: 'Notion', status: 'pending', lastSync: '-', icon: 'document' },
];

export const MOCK_TEAM: TeamMember[] = [
  { name: 'Alan Nicolas', email: 'alan@legends.co', calls: 142, active: true },
  { name: 'Amanda L.', email: 'amanda@legends.co', calls: 98, active: true },
  { name: 'Roberto F.', email: 'roberto@legends.co', calls: 85, active: true },
  { name: 'Carla M.', email: 'carla@legends.co', calls: 0, active: false },
];

export const MOCK_LOGS: LogEntry[] = [
  { time: '14:32:01', type: 'info', msg: 'Webhook recebido de Bluedot.' },
  { time: '14:32:05', type: 'info', msg: 'Transcricao processada. 423 tokens.' },
  { time: '14:32:10', type: 'warning', msg: 'ActiveCampaign timeout. Retrying...' },
  { time: '14:35:00', type: 'error', msg: 'Falha ao atualizar contato ID #992.' },
];

export const MOCK_OBJECTION_CATEGORIES: ObjectionCategory[] = [
  { name: 'Preco / Budget', desc: 'Cliente acha caro ou nao tem verba.' },
  { name: 'Concorrencia', desc: 'Cliente cita competidor direto.' },
  { name: 'Autoridade / Confianca', desc: 'Cliente nao conhece a marca.' },
  { name: 'Timing', desc: 'Cliente quer deixar para depois.' },
  { name: 'Decisor', desc: 'Precisa falar com socio/diretor.' },
];

export const AI_PROMPT_DEFAULT = `You are an expert Sales Analyst AI. Your goal is to extract key insights from sales calls.

Output Format: JSON
{
  "summary": "3 sentences summary",
  "sentiment": "positive" | "neutral" | "negative",
  "score": 0-100,
  "objections": [
    { "type": "price", "snippet": "..." }
  ],
  "next_steps": ["..."]
}

Constraints:
- Be concise.
- Focus on commercial intent.
- Ignore small talk.`;

export const MODEL_OPTIONS = [
  { label: 'Gemini 1.5 Pro', value: 'gemini' },
  { label: 'GPT-4 Turbo', value: 'gpt4' },
  { label: 'Claude 3.5 Sonnet', value: 'claude' },
];
