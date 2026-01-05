/**
 * Email Template: Verificação de Email
 */

import { EMAIL_DESIGN, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export interface EmailVerificationProps extends BaseTemplateProps {
  recipientName?: string;
  recipientEmail: string;
  verificationUrl: string;
  verificationCode?: string;
  expirationHours?: number;
}

export function generateEmailVerificationEmail(props: EmailVerificationProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    verificationUrl,
    verificationCode,
    expirationHours = 24,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;
  const displayName = recipientName || recipientEmail.split('@')[0];

  const content = `
    ${EmailComponents.badge('📧 Verificar Email', 'info')}

    ${EmailComponents.heading(`Olá, ${displayName}`, 'Precisamos confirmar seu endereço de email para ativar sua conta.')}

    ${verificationCode ? `
      <p style="margin: 0 0 16px; font-size: 14px; color: ${D.textSecondary}; text-align: center;">
        Use o código abaixo para verificar:
      </p>
      ${EmailComponents.code(verificationCode)}
      <p style="margin: 0 0 24px; font-size: 12px; color: ${D.textMuted}; text-align: center;">
        ou clique no botão abaixo
      </p>
    ` : ''}

    ${EmailComponents.button('Verificar Email', verificationUrl)}

    ${EmailComponents.fallbackLink(verificationUrl)}

    ${EmailComponents.expiration(`Este link expira em ${expirationHours} horas`)}

    <!-- Why verify -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
      <tr>
        <td style="background-color: ${D.bgElevated}; border-radius: 8px; padding: 16px; border: 1px solid ${D.border};">
          <p style="margin: 0 0 8px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted};">
            Por que verificar?
          </p>
          <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: ${D.textSecondary}; line-height: 1.8;">
            <li>Proteger sua conta contra acessos não autorizados</li>
            <li>Receber notificações importantes</li>
            <li>Recuperar acesso caso esqueça sua senha</li>
          </ul>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `📧 Verifique seu email - ${siteName}`,
    preheader: `Confirme seu email para ativar sua conta na ${siteName}.`,
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: `Verificação de email para ${recipientEmail}.`,
    }),
  };
}
