/**
 * Email Template: Boas-vindas
 */

import { EMAIL_DESIGN, ROLE_COLORS, SITE_DEFAULTS } from '../design-tokens';
import { wrapEmailContent, EmailComponents, BaseTemplateProps, EmailTemplateResult } from '../base-template';

export interface WelcomeEmailProps extends BaseTemplateProps {
  recipientName: string;
  recipientEmail: string;
  roleDisplayName?: string;
  loginUrl: string;
  features?: string[];
}

export function generateWelcomeEmail(props: WelcomeEmailProps): EmailTemplateResult {
  const {
    recipientName,
    recipientEmail,
    roleDisplayName,
    loginUrl,
    features,
    siteName = SITE_DEFAULTS.name,
    ...baseProps
  } = props;

  const D = EMAIL_DESIGN;
  const roleColor = roleDisplayName ? (ROLE_COLORS[roleDisplayName] || ROLE_COLORS['Usuário Free']) : null;

  const defaultFeatures = [
    'Acesse nossa biblioteca de livros curada',
    'Explore conteúdos exclusivos de especialistas',
    'Aprenda com os maiores nomes do mercado',
    'Acompanhe seu progresso de leitura',
  ];

  const featureList = features || defaultFeatures;

  const content = `
    ${EmailComponents.badge('✨ Bem-vindo à Comunidade ✨', 'success')}

    ${EmailComponents.heading(`Olá, ${recipientName}!`, 'Sua conta foi criada com sucesso. Estamos muito felizes em tê-lo conosco!')}

    ${roleColor ? `
    <!-- Role Badge -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="text-align: center;">
          <span style="display: inline-block; background-color: ${roleColor.bg}; color: ${roleColor.text}; border: 1px solid ${roleColor.border}; border-radius: 100px; padding: 8px 20px; font-size: 12px; font-weight: 700; letter-spacing: 1px;">
            ${roleDisplayName?.toUpperCase()}
          </span>
        </td>
      </tr>
    </table>
    ` : ''}

    <!-- Features -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
      <tr>
        <td style="background-color: ${D.bgElevated}; border-radius: 12px; padding: 20px; border: 1px solid ${D.border};">
          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted}; text-align: center;">
            O que você pode fazer
          </p>
          ${featureList.map(feature => `
            <p style="margin: 0 0 12px; font-size: 14px; color: ${D.textSecondary}; padding-left: 24px; position: relative; line-height: 1.5;">
              <span style="color: ${D.gold}; position: absolute; left: 0;">✦</span>
              ${feature}
            </p>
          `).join('')}
        </td>
      </tr>
    </table>

    ${EmailComponents.button('Acessar Plataforma', loginUrl)}

    ${EmailComponents.quote(
      'A jornada de mil milhas começa com um único passo.',
      'Lao Tzu'
    )}
  `;

  return {
    subject: `✨ Bem-vindo à ${siteName}!`,
    preheader: `Sua conta foi criada com sucesso. Comece sua jornada de conhecimento lendário.`,
    html: wrapEmailContent(content, {
      ...baseProps,
      siteName,
      preheaderText: `Bem-vindo à ${siteName}, ${recipientName}!`,
    }),
  };
}
