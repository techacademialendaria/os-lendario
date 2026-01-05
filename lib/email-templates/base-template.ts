/**
 * Base Email Template - Academia Lendária
 * Estrutura comum para todos os emails
 */

import { EMAIL_DESIGN, SITE_DEFAULTS } from './design-tokens';

export interface BaseTemplateProps {
  siteName?: string;
  siteUrl?: string;
  logoUrl?: string;
  tagline?: string;
  preheaderText?: string;
}

export interface EmailTemplateResult {
  subject: string;
  html: string;
  preheader: string;
}

/**
 * Gera o wrapper base do email
 */
export function wrapEmailContent(
  content: string,
  props: BaseTemplateProps & { preheaderText?: string }
): string {
  const {
    siteName = SITE_DEFAULTS.name,
    siteUrl = SITE_DEFAULTS.url,
    logoUrl = SITE_DEFAULTS.logoUrl,
    tagline = SITE_DEFAULTS.tagline,
    preheaderText = '',
  } = props;

  const fullLogoUrl = logoUrl.startsWith('http') ? logoUrl : `${siteUrl}${logoUrl}`;
  const D = EMAIL_DESIGN;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>${siteName}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${D.bgDark}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${D.bgDark};">
    <tr>
      <td style="padding: 40px 20px;">

        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto;">

          <!-- Pre-header Text (Hidden) -->
          <tr>
            <td style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
              ${preheaderText}
            </td>
          </tr>

          <!-- Logo & Header -->
          <tr>
            <td style="padding: 0 0 32px; text-align: center;">
              <!-- Gold Line Top -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="height: 2px; background: linear-gradient(90deg, transparent 0%, ${D.gold} 50%, transparent 100%);"></td>
                </tr>
              </table>

              <!-- Logo Container -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 32px;">
                <tr>
                  <td style="text-align: center;">
                    <img
                      src="${fullLogoUrl}"
                      alt="${siteName}"
                      width="180"
                      style="display: inline-block; max-width: 180px; height: auto;"
                    >
                  </td>
                </tr>
              </table>

              <!-- Tagline -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
                <tr>
                  <td style="text-align: center; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${D.gold}; font-weight: 600;">
                    ${tagline}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${D.bgCard}; border-radius: 16px; border: 1px solid ${D.border}; overflow: hidden; box-shadow: 0 25px 50px -12px ${D.shadowDark};">

                <!-- Card Header with Gold Accent -->
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, ${D.goldDark} 0%, ${D.gold} 50%, ${D.goldDark} 100%);"></td>
                </tr>

                <!-- Card Content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    ${content}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 20px; text-align: center;">

              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td style="height: 1px; background: linear-gradient(90deg, transparent 0%, ${D.border} 50%, transparent 100%);"></td>
                </tr>
              </table>

              <!-- Security Notice -->
              <p style="margin: 0 0 16px; font-size: 11px; color: ${D.textMuted}; line-height: 1.5;">
                Se você não esperava este email, pode ignorá-lo com segurança.<br>
                Nenhuma ação será tomada sem sua confirmação.
              </p>

              <!-- Copyright -->
              <p style="margin: 0; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted};">
                © ${new Date().getFullYear()} ${siteName}
              </p>

              <!-- Gold Line Bottom -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
                <tr>
                  <td style="height: 2px; background: linear-gradient(90deg, transparent 0%, ${D.gold} 50%, transparent 100%);"></td>
                </tr>
              </table>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Componentes reutilizáveis para emails
 */
export const EmailComponents = {
  badge: (text: string, variant: 'gold' | 'success' | 'warning' | 'error' | 'info' = 'gold') => {
    const D = EMAIL_DESIGN;
    const colors = {
      gold: { bg: 'rgba(201, 178, 152, 0.1)', text: D.gold, border: D.borderGold },
      success: { bg: 'rgba(34, 197, 94, 0.1)', text: D.success, border: 'rgba(34, 197, 94, 0.3)' },
      warning: { bg: 'rgba(245, 158, 11, 0.1)', text: D.warning, border: 'rgba(245, 158, 11, 0.3)' },
      error: { bg: 'rgba(239, 68, 68, 0.1)', text: D.error, border: 'rgba(239, 68, 68, 0.3)' },
      info: { bg: 'rgba(59, 130, 246, 0.1)', text: D.info, border: 'rgba(59, 130, 246, 0.3)' },
    };
    const c = colors[variant];
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 24px;">
        <tr>
          <td style="background-color: ${c.bg}; border: 1px solid ${c.border}; border-radius: 100px; padding: 8px 20px;">
            <span style="font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${c.text};">
              ${text}
            </span>
          </td>
        </tr>
      </table>
    `;
  },

  heading: (text: string, subtitle?: string) => {
    const D = EMAIL_DESIGN;
    return `
      <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 700; color: ${D.textPrimary}; text-align: center; font-family: Georgia, 'Times New Roman', serif;">
        ${text}
      </h1>
      ${subtitle ? `
        <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: ${D.textSecondary}; text-align: center;">
          ${subtitle}
        </p>
      ` : ''}
    `;
  },

  button: (text: string, url: string) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
        <tr>
          <td style="text-align: center;">
            <a href="${url}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, ${D.gold} 0%, ${D.goldDark} 100%); color: ${D.bgDark}; text-decoration: none; padding: 16px 48px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-radius: 8px; box-shadow: 0 4px 20px ${D.shadowGold}, 0 8px 32px ${D.shadowDark};">
              ${text}
            </a>
          </td>
        </tr>
      </table>
    `;
  },

  fallbackLink: (url: string) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="text-align: center;">
            <p style="margin: 0 0 8px; font-size: 12px; color: ${D.textMuted};">
              Se o botão não funcionar, copie e cole este link:
            </p>
            <p style="margin: 0; font-size: 11px; word-break: break-all; color: ${D.gold};">
              ${url}
            </p>
          </td>
        </tr>
      </table>
    `;
  },

  infoBox: (content: string, icon?: string) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="background-color: ${D.bgElevated}; border-radius: 12px; padding: 20px; border: 1px solid ${D.border};">
            ${icon ? `<span style="font-size: 24px; display: block; text-align: center; margin-bottom: 12px;">${icon}</span>` : ''}
            ${content}
          </td>
        </tr>
      </table>
    `;
  },

  quote: (text: string, label?: string) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
        <tr>
          <td style="background-color: ${D.bgElevated}; border-left: 3px solid ${D.gold}; border-radius: 0 8px 8px 0; padding: 16px 20px;">
            ${label ? `
              <p style="margin: 0 0 8px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${D.textMuted};">
                ${label}
              </p>
            ` : ''}
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${D.textSecondary}; font-style: italic; font-family: Georgia, 'Times New Roman', serif;">
              "${text}"
            </p>
          </td>
        </tr>
      </table>
    `;
  },

  expiration: (text: string) => {
    const D = EMAIL_DESIGN;
    return `
      <p style="margin: 0 0 16px; font-size: 12px; color: ${D.textMuted}; text-align: center;">
        ${text.replace(/(\d+\s*\w+)/, `<span style="color: ${D.gold};">$1</span>`)}
      </p>
    `;
  },

  code: (code: string) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="background-color: ${D.bgElevated}; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid ${D.border};">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: ${D.gold}; font-family: 'Courier New', monospace;">
              ${code}
            </span>
          </td>
        </tr>
      </table>
    `;
  },

  steps: (steps: string[]) => {
    const D = EMAIL_DESIGN;
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
        ${steps.map((step, i) => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${D.border};">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="width: 32px; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; background-color: ${D.gold}; color: ${D.bgDark}; border-radius: 50%; font-size: 12px; font-weight: 700;">
                      ${i + 1}
                    </span>
                  </td>
                  <td style="padding-left: 12px; font-size: 14px; color: ${D.textSecondary}; line-height: 1.5;">
                    ${step}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  },
};
