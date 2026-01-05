/**
 * Configuration constants for MarkdownRenderer
 */

// ============================================================================
// Mermaid Theme Configuration
// ============================================================================

export const MERMAID_LUXURY_PALETTE = {
  GOLD: '#c9a227',
  GOLD_DARK: '#1a1916',
  GOLD_BORDER: 'rgba(201, 162, 39, 0.25)',
  TEXT_LIGHT: '#fafafa',
  LINE_COLOR: 'rgba(201, 162, 39, 0.4)',
} as const;

export const MERMAID_THEME_VARIABLES = {
  // Luxury monochromatic gold palette
  background: '#0a0a0a',
  primaryColor: '#c9a227',
  primaryTextColor: '#fafafa',
  primaryBorderColor: '#c9a22740',
  secondaryColor: '#1a1916',
  tertiaryColor: '#141310',
  // Node colors - all gold tones
  nodeBkg: '#1a1916',
  mainBkg: '#0a0a0a',
  nodeBorder: '#c9a22730',
  clusterBkg: '#141310',
  clusterBorder: '#c9a22720',
  // Text
  titleColor: '#c9a227',
  textColor: '#e5e5e5',
  lineColor: '#c9a22750',
  // Mindmap specific - force monochrome
  cScale0: '#c9a227',
  cScale1: '#a88a1e',
  cScale2: '#8b7355',
  cScale3: '#6b5c47',
  cScale4: '#4a4238',
  cScale5: '#3a352d',
  cScale6: '#2a2622',
  cScale7: '#1a1816',
  cScaleLabel0: '#fafafa',
  cScaleLabel1: '#fafafa',
  cScaleLabel2: '#fafafa',
  cScaleLabel3: '#fafafa',
  cScaleLabel4: '#fafafa',
  cScaleLabel5: '#e5e5e5',
  cScaleLabel6: '#d4d4d4',
  cScaleLabel7: '#a1a1aa',
} as const;

export const MERMAID_CONFIG = {
  startOnLoad: false,
  theme: 'base' as const,
  securityLevel: 'loose' as const,
  mindmap: {
    useMaxWidth: true,
    padding: 16,
  },
  themeVariables: MERMAID_THEME_VARIABLES,
} as const;

// ============================================================================
// SVG Style Override (injected into Mermaid SVGs)
// ============================================================================

export const getMermaidStyleOverride = (): string => {
  const { GOLD, GOLD_DARK, GOLD_BORDER, TEXT_LIGHT, LINE_COLOR } = MERMAID_LUXURY_PALETTE;

  return `
    <style>
      .node rect, .node polygon { fill: ${GOLD_DARK} !important; stroke: ${GOLD_BORDER} !important; }
      .node circle { fill: ${GOLD} !important; stroke: ${GOLD_BORDER} !important; }
      .edgePath path { stroke: ${LINE_COLOR} !important; }
      text, tspan { fill: ${TEXT_LIGHT} !important; }
      .label { fill: ${TEXT_LIGHT} !important; }
      .nodeLabel { fill: ${TEXT_LIGHT} !important; }
    </style>
  `;
};
