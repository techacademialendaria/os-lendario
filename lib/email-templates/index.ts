/**
 * Email Templates - Academia Lendária
 *
 * Sistema de templates de email com design luxury premium.
 *
 * Uso:
 * import { generateInviteEmail, generateWelcomeEmail } from '@/lib/email-templates';
 *
 * const { subject, html } = generateInviteEmail({
 *   recipientName: 'João',
 *   recipientEmail: 'joao@email.com',
 *   roleDisplayName: 'Aluno',
 *   inviteUrl: 'https://...',
 * });
 */

// Types
export type {
  EmailTemplateCategory,
  EmailTemplateVariable,
  EmailTemplateMetadata,
  EmailTemplateRecord,
  EmailTemplateInput,
} from './types';
export { DEFAULT_TEMPLATE_VARIABLES } from './types';

// Design Tokens
export { EMAIL_DESIGN, ROLE_COLORS, AREA_LABELS, SITE_DEFAULTS } from './design-tokens';

// Base Template
export { wrapEmailContent, EmailComponents } from './base-template';
export type { BaseTemplateProps, EmailTemplateResult } from './base-template';

// Templates - import for internal use + re-export
import { generateInviteEmail } from './templates/invite';
import { generatePasswordResetEmail } from './templates/password-reset';
import { generateWelcomeEmail } from './templates/welcome';
import { generateMagicLinkEmail } from './templates/magic-link';
import { generateEmailVerificationEmail } from './templates/email-verification';
import { generateNotificationEmail } from './templates/notification';

// Re-export for external use
export { generateInviteEmail, generatePasswordResetEmail, generateWelcomeEmail, generateMagicLinkEmail, generateEmailVerificationEmail, generateNotificationEmail };
export type { InviteEmailProps } from './templates/invite';
export type { PasswordResetEmailProps } from './templates/password-reset';
export type { WelcomeEmailProps } from './templates/welcome';
export type { MagicLinkEmailProps } from './templates/magic-link';
export type { EmailVerificationProps } from './templates/email-verification';
export type { NotificationEmailProps, NotificationType } from './templates/notification';

// ============================================================================
// Template Registry (for preview system)
// ============================================================================

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'auth' | 'onboarding' | 'notification' | 'transactional';
  generator: (props: Record<string, unknown>) => { subject: string; html: string; preheader: string };
  defaultProps: Record<string, unknown>;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'invite',
    name: 'Convite de Usuário',
    description: 'Enviado quando um admin convida um novo usuário para a plataforma',
    category: 'onboarding',
    generator: (props) => generateInviteEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      roleDisplayName: 'Colaborador',
      areas: ['mkt', 'conteudo'],
      message: 'Bem-vindo à equipe! Estamos ansiosos para trabalhar com você.',
      inviteUrl: 'https://academialendaria.com.br/auth/signup?invite=abc123',
      expirationDays: 7,
    },
  },
  {
    id: 'password-reset',
    name: 'Recuperação de Senha',
    description: 'Enviado quando o usuário solicita redefinição de senha',
    category: 'auth',
    generator: (props) => generatePasswordResetEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      resetUrl: 'https://academialendaria.com.br/auth/reset?token=xyz789',
      expirationMinutes: 60,
    },
  },
  {
    id: 'welcome',
    name: 'Boas-vindas',
    description: 'Enviado após o usuário criar sua conta com sucesso',
    category: 'onboarding',
    generator: (props) => generateWelcomeEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      roleDisplayName: 'Aluno',
      loginUrl: 'https://academialendaria.com.br/auth/login',
    },
  },
  {
    id: 'magic-link',
    name: 'Magic Link / Login sem Senha',
    description: 'Enviado quando o usuário solicita login via link mágico',
    category: 'auth',
    generator: (props) => generateMagicLinkEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      magicLinkUrl: 'https://academialendaria.com.br/auth/callback?token=magic123',
      expirationMinutes: 60,
    },
  },
  {
    id: 'email-verification',
    name: 'Verificação de Email',
    description: 'Enviado para confirmar o endereço de email do usuário',
    category: 'auth',
    generator: (props) => generateEmailVerificationEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      verificationUrl: 'https://academialendaria.com.br/auth/verify?token=verify456',
      verificationCode: '847291',
      expirationHours: 24,
    },
  },
  {
    id: 'notification-info',
    name: 'Notificação (Info)',
    description: 'Notificação informativa genérica',
    category: 'notification',
    generator: (props) => generateNotificationEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      title: 'Novo conteúdo disponível',
      message: 'Um novo livro foi adicionado à sua biblioteca: "O Investidor Inteligente" de Benjamin Graham. Aproveite para começar sua leitura!',
      type: 'info',
      ctaText: 'Ver Livro',
      ctaUrl: 'https://academialendaria.com.br/books/investidor-inteligente',
    },
  },
  {
    id: 'notification-success',
    name: 'Notificação (Sucesso)',
    description: 'Notificação de ação concluída com sucesso',
    category: 'notification',
    generator: (props) => generateNotificationEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      title: 'Curso concluído!',
      message: 'Parabéns! Você completou o curso "Fundamentos de Investimentos" com nota máxima. Seu certificado está disponível.',
      type: 'success',
      ctaText: 'Ver Certificado',
      ctaUrl: 'https://academialendaria.com.br/certificates/123',
      additionalInfo: 'Continue sua jornada com nossos cursos avançados.',
    },
  },
  {
    id: 'notification-warning',
    name: 'Notificação (Aviso)',
    description: 'Notificação de alerta ou atenção necessária',
    category: 'notification',
    generator: (props) => generateNotificationEmail(props as never),
    defaultProps: {
      recipientName: 'João Silva',
      recipientEmail: 'joao@exemplo.com',
      title: 'Sua assinatura expira em breve',
      message: 'Sua assinatura Premium expira em 7 dias. Renove agora para continuar tendo acesso a todo o conteúdo exclusivo.',
      type: 'warning',
      ctaText: 'Renovar Assinatura',
      ctaUrl: 'https://academialendaria.com.br/subscription/renew',
    },
  },
];
