/**
 * Email Template: Notificação Genérica
 */

import { EMAIL_DESIGN, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationEmailProps extends BaseTemplateProps {
  recipientName: string;
  recipientEmail: string;
  title: string;
  message: string;
  type?: NotificationType;
  ctaText?: string;
  ctaUrl?: string;
  additionalInfo?: string;
}

const TYPE_CONFIG: Record<NotificationType, { badge: string; icon: string; variant: 'gold' | 'success' | 'warning' | 'error' | 'info' }> = {
  info: { badge: 'ℹ️ Informação', icon: 'ℹ️', variant: 'info' },
  success: { badge: '✅ Sucesso', icon: '✅', variant: 'success' },
  warning: { badge: '⚠️ Atenção', icon: '⚠️', variant: 'warning' },
  error: { badge: '❌ Importante', icon: '❌', variant: 'error' },
};

export function generateNotificationEmail(props: NotificationEmailProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    title,
    message,
    type = 'info',
    ctaText,
    ctaUrl,
    additionalInfo,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;
  const config = TYPE_CONFIG[type];

  const content = `
    ${EmailComponents.badge(config.badge, config.variant)}

    ${EmailComponents.heading(`Olá, ${recipientName}`, title)}

    ${EmailComponents.infoBox(`
      <p style="margin: 0; font-size: 14px; color: ${D.textSecondary}; line-height: 1.6;">
        ${message}
      </p>
    `, config.icon)}

    ${additionalInfo ? `
      <p style="margin: 0 0 24px; font-size: 13px; color: ${D.textMuted}; line-height: 1.6; text-align: center;">
        ${additionalInfo}
      </p>
    ` : ''}

    ${ctaText && ctaUrl ? EmailComponents.button(ctaText, ctaUrl) : ''}

    ${ctaUrl ? EmailComponents.fallbackLink(ctaUrl) : ''}
  `;

  const subjectPrefix = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return {
    subject: `${subjectPrefix[type]} ${title} - ${siteName}`,
    preheader: message.substring(0, 100) + '...',
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: message.substring(0, 150),
    }),
  };
}
