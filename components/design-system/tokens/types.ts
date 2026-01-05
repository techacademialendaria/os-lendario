export type DensityLevel = 'compact' | 'default' | 'comfortable';

export type TokensTab = 'principles' | 'foundation' | 'layout' | 'components' | 'setup' | 'extensibility';

export interface ColorPair {
  bg: string;
  text: string;
  label: string;
}

export interface SpacingToken {
  token: string;
  px: string;
  use: string;
}

export interface ShadowToken {
  token: string;
  use: string;
}
