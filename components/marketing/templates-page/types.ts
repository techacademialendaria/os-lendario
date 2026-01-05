/**
 * Types for MarketingTemplatesPage
 * Copywriting guide with validated structures based on marketing masters
 */

export interface TabConfig {
  value: string;
  label: string;
  icon: string;
  isHighlighted?: boolean;
}

export interface PrincipleItem {
  badge: string;
  description: string;
}

export interface TemplateSection {
  title: string;
  codeTemplate: string;
  principles: PrincipleItem[];
}

export interface ChecklistItem {
  methodology: string;
  criterion: string;
}

export interface QuickFormula {
  label: string;
  formula: string;
}

export interface ImplementationStep {
  number: number;
  title: string;
  description: string;
  isHighlighted?: boolean;
}
