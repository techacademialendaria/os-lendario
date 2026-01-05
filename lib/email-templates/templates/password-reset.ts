/**
 * Email Template: Recuperação de Senha
 */

import { EMAIL_DESIGN, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export interface PasswordResetEmailProps extends BaseTemplateProps {
  recipientName: string;
  recipientEmail: string;
  resetUrl: string;
  expirationMinutes?: number;
}

export function generatePasswordResetEmail(props: PasswordResetEmailProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    resetUrl,
    expirationMinutes = 60,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;

  const content = `
    ${EmailComponents.badge('🔐 Recuperação de Senha', 'warning')}

    ${EmailComponents.heading(`Olá, ${recipientName}`, 'Recebemos uma solicitação para redefinir sua senha.')}

    ${EmailComponents.infoBox(`
      <p style="margin: 0; font-size: 14px; color: ${D.textSecondary}; text-align: center; line-height: 1.6;">
        Se você não solicitou esta alteração, ignore este email.<br>
        Sua senha permanecerá inalterada.
      </p>
    `, '⚠️')}

    ${EmailComponents.button('Redefinir Senha', resetUrl)}

    ${EmailComponents.fallbackLink(resetUrl)}

    ${EmailComponents.expiration(`Este link expira em ${expirationMinutes} minutos`)}

    <!-- Security Tips -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
      <tr>
        <td style="background-color: ${D.bgElevated}; border-radius: 8px; padding: 16px; border: 1px solid ${D.border};">
          <p style="margin: 0 0 8px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted};">
            Dicas de Segurança
          </p>
          <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: ${D.textSecondary}; line-height: 1.8;">
            <li>Use uma senha forte com letras, números e símbolos</li>
            <li>Não compartilhe sua senha com ninguém</li>
            <li>Nunca clicamos links que você não solicitou</li>
          </ul>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `🔐 Redefinir Senha - ${siteName}`,
    preheader: `Clique para redefinir sua senha na ${siteName}. Este link expira em ${expirationMinutes} minutos.`,
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: `Solicitação de redefinição de senha para ${recipientEmail}.`,
    }),
  };
}
