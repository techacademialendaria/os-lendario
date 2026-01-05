/**
 * Email Template: Magic Link / Login sem senha
 */

import { EMAIL_DESIGN, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export interface MagicLinkEmailProps extends BaseTemplateProps {
  recipientName?: string;
  recipientEmail: string;
  magicLinkUrl: string;
  expirationMinutes?: number;
}

export function generateMagicLinkEmail(props: MagicLinkEmailProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    magicLinkUrl,
    expirationMinutes = 60,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;
  const displayName = recipientName || recipientEmail.split('@')[0];

  const content = `
    ${EmailComponents.badge('🔗 Acesso Rápido', 'info')}

    ${EmailComponents.heading(`Olá, ${displayName}`, 'Use o link abaixo para acessar sua conta sem precisar de senha.')}

    ${EmailComponents.infoBox(`
      <p style="margin: 0; font-size: 14px; color: ${D.textSecondary}; text-align: center; line-height: 1.6;">
        Este é um link de acesso único.<br>
        Não compartilhe com ninguém.
      </p>
    `, '🔐')}

    ${EmailComponents.button('Acessar Minha Conta', magicLinkUrl)}

    ${EmailComponents.fallbackLink(magicLinkUrl)}

    ${EmailComponents.expiration(`Este link expira em ${expirationMinutes} minutos`)}

    <!-- Alternative -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
      <tr>
        <td style="text-align: center;">
          <p style="margin: 0; font-size: 12px; color: ${D.textMuted};">
            Prefere usar senha? <a href="${baseProps.siteUrl || SITE_DEFAULTS.url}/auth/login" style="color: ${D.gold}; text-decoration: none;">Acesse aqui</a>
          </p>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `🔗 Seu link de acesso - ${siteName}`,
    preheader: `Clique para acessar sua conta na ${siteName}. Link válido por ${expirationMinutes} minutos.`,
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: `Link de acesso para ${recipientEmail}.`,
    }),
  };
}
