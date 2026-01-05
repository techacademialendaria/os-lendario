/**
 * Email Template: Convite de Usuário
 */

import { EMAIL_DESIGN, ROLE_COLORS, AREA_LABELS, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export interface InviteEmailProps extends BaseTemplateProps {
  recipientName: string;
  recipientEmail: string;
  roleDisplayName: string;
  areas?: string[];
  message?: string | null;
  inviteUrl: string;
  expirationDays?: number;
}

export function generateInviteEmail(props: InviteEmailProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    roleDisplayName,
    areas,
    message,
    inviteUrl,
    expirationDays = 7,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;
  const roleColor = ROLE_COLORS[roleDisplayName] || ROLE_COLORS['Usuário Free'];
  const formattedAreas = areas?.map(a => AREA_LABELS[a] || a).join(' • ') || null;

  const content = `
    ${EmailComponents.badge('✦ Convite Exclusivo ✦', 'gold')}

    ${EmailComponents.heading(`Olá, ${recipientName}`, 'Você foi selecionado para fazer parte de uma comunidade exclusiva de conhecimento.')}

    <!-- Role Badge -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="background-color: ${D.bgElevated}; border-radius: 12px; padding: 20px; border: 1px solid ${D.border};">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center;">
                <span style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted};">
                  Seu Nível de Acesso
                </span>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding-top: 12px;">
                <span style="display: inline-block; background-color: ${roleColor.bg}; color: ${roleColor.text}; border: 1px solid ${roleColor.border}; border-radius: 100px; padding: 10px 24px; font-size: 14px; font-weight: 700; letter-spacing: 1px;">
                  ${roleDisplayName.toUpperCase()}
                </span>
              </td>
            </tr>
            ${formattedAreas ? `
            <tr>
              <td style="text-align: center; padding-top: 16px;">
                <span style="font-size: 12px; color: ${D.textSecondary};">
                  Áreas: <span style="color: ${D.gold};">${formattedAreas}</span>
                </span>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    ${message ? EmailComponents.quote(message, 'Mensagem Pessoal') : ''}

    ${EmailComponents.button('Aceitar Convite', inviteUrl)}

    ${EmailComponents.fallbackLink(inviteUrl)}

    ${EmailComponents.expiration(`Este convite expira em ${expirationDays} dias`)}
  `;

  return {
    subject: `✦ Convite Exclusivo - ${siteName}`,
    preheader: `Você foi convidado para fazer parte da ${siteName} como ${roleDisplayName}. Aceite seu convite exclusivo.`,
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: `Você foi convidado para fazer parte da ${siteName} como ${roleDisplayName}.`,
    }),
  };
}
