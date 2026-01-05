/**
 * Types for Email Template System
 */

export type EmailTemplateCategory = 'auth' | 'onboarding' | 'notification' | 'transactional';

export interface EmailTemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  required: boolean;
  description: string;
  defaultValue?: unknown;
}

export interface EmailTemplateMetadata {
  // Template info
  subject: string;
  preheader: string;
  category: EmailTemplateCategory;
  description: string;

  // Variables schema
  variables: EmailTemplateVariable[];

  // Versioning
  version: number;
  lastEditedBy?: string;
  lastEditedAt?: string;

  // Flags
  isCustomized: boolean;
  isActive: boolean;
}

export interface EmailTemplateRecord {
  id: string;
  slug: string;
  title: string;
  content: string; // HTML template
  metadata: EmailTemplateMetadata;
  status: 'draft' | 'reviewed' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface EmailTemplateInput {
  slug: string;
  title: string;
  content: string;
  metadata: EmailTemplateMetadata;
  status?: 'draft' | 'reviewed' | 'published' | 'archived';
}

// Default variables for each template type
export const DEFAULT_TEMPLATE_VARIABLES: Record<string, EmailTemplateVariable[]> = {
  invite: [
    { name: 'recipientName', type: 'string', required: true, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'roleDisplayName', type: 'string', required: true, description: 'Nome do role (ex: Aluno, Admin)' },
    { name: 'areas', type: 'array', required: false, description: 'Áreas de acesso (para colaboradores)' },
    { name: 'message', type: 'string', required: false, description: 'Mensagem pessoal do convidante' },
    { name: 'inviteUrl', type: 'string', required: true, description: 'URL do convite' },
    { name: 'expirationDays', type: 'number', required: false, description: 'Dias até expirar', defaultValue: 7 },
  ],
  'password-reset': [
    { name: 'recipientName', type: 'string', required: true, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'resetUrl', type: 'string', required: true, description: 'URL de reset' },
    { name: 'expirationMinutes', type: 'number', required: false, description: 'Minutos até expirar', defaultValue: 60 },
  ],
  welcome: [
    { name: 'recipientName', type: 'string', required: true, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'roleDisplayName', type: 'string', required: false, description: 'Nome do role' },
    { name: 'loginUrl', type: 'string', required: true, description: 'URL de login' },
    { name: 'features', type: 'array', required: false, description: 'Lista de features disponíveis' },
  ],
  'magic-link': [
    { name: 'recipientName', type: 'string', required: false, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'magicLinkUrl', type: 'string', required: true, description: 'URL do magic link' },
    { name: 'expirationMinutes', type: 'number', required: false, description: 'Minutos até expirar', defaultValue: 60 },
  ],
  'email-verification': [
    { name: 'recipientName', type: 'string', required: false, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'verificationUrl', type: 'string', required: true, description: 'URL de verificação' },
    { name: 'verificationCode', type: 'string', required: false, description: 'Código de verificação (6 dígitos)' },
    { name: 'expirationHours', type: 'number', required: false, description: 'Horas até expirar', defaultValue: 24 },
  ],
  notification: [
    { name: 'recipientName', type: 'string', required: true, description: 'Nome do destinatário' },
    { name: 'recipientEmail', type: 'string', required: true, description: 'Email do destinatário' },
    { name: 'title', type: 'string', required: true, description: 'Título da notificação' },
    { name: 'message', type: 'string', required: true, description: 'Mensagem da notificação' },
    { name: 'type', type: 'string', required: false, description: 'Tipo: info, success, warning, error', defaultValue: 'info' },
    { name: 'ctaText', type: 'string', required: false, description: 'Texto do botão CTA' },
    { name: 'ctaUrl', type: 'string', required: false, description: 'URL do botão CTA' },
  ],
};
