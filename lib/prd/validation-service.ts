// @ts-nocheck
// PRD Studio - Story Validation Service
// Validates user stories and provides suggestions for improvement
// Type mismatches deferred to Story 0.2.1 - PRD Studio Type System Refactor

import type { StoryData, Complexity } from '../../types/prd';

// =============================================================================
// TYPES
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  suggestion?: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationSummary {
  totalStories: number;
  validStories: number;
  invalidStories: number;
  errorsByType: Record<string, number>;
  warningsByType: Record<string, number>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const USER_STORY_PATTERN = /^como\s+.+,\s*quero\s+.+,\s*para\s+.+$/i;
const AC_VERB_PATTERN =
  /^(dado|quando|então|deve|pode|não deve|precisa|permite|exibe|retorna|valida|verifica)/i;

const MIN_TITLE_LENGTH = 5;
const MAX_TITLE_LENGTH = 100;
const MIN_USER_STORY_LENGTH = 30;
const MIN_AC_COUNT = 2;
const MIN_AC_LENGTH = 10;

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validate a single user story
 * @param story - The story to validate
 * @returns ValidationResult with errors and warnings
 */
export function validateStory(story: StoryData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Validate title
  if (!story.title || story.title.trim().length < MIN_TITLE_LENGTH) {
    errors.push({
      field: 'title',
      message: `Título muito curto (mínimo ${MIN_TITLE_LENGTH} caracteres)`,
      suggestion: 'Adicione um título descritivo que resuma a funcionalidade',
    });
  } else if (story.title.length > MAX_TITLE_LENGTH) {
    errors.push({
      field: 'title',
      message: `Título muito longo (máximo ${MAX_TITLE_LENGTH} caracteres)`,
      suggestion: 'Resuma o título mantendo apenas a informação essencial',
    });
  }

  // Validate user story format
  // @ts-ignore - StoryData type mismatch with userStory property
  if (!story.userStory || story.userStory.trim().length < MIN_USER_STORY_LENGTH) {
    errors.push({
      field: 'userStory',
      message: 'User story muito curta ou vazia',
      suggestion: 'Use o formato: "Como [persona], quero [ação], para [benefício]"',
    });
  // @ts-ignore - StoryData type mismatch with userStory property
  } else if (!USER_STORY_PATTERN.test(story.userStory.trim())) {
    errors.push({
      field: 'userStory',
      message: 'User story não segue o formato esperado',
      suggestion: 'Use: "Como [persona], quero [ação], para [benefício]"',
    });
  } else {
    // Check for generic personas
    const genericPersonas = ['usuário', 'user', 'pessoa', 'alguém'];
    // @ts-ignore - StoryData type mismatch with userStory property
    const lowerStory = story.userStory.toLowerCase();
    const hasGenericPersona = genericPersonas.some(
      (p) => lowerStory.includes(`como ${p},`) || lowerStory.includes(`como um ${p},`)
    );
    if (hasGenericPersona) {
      warnings.push({
        field: 'userStory',
        message: 'Persona genérica detectada',
        suggestion:
          'Especifique o tipo de usuário (ex: "Como administrador", "Como cliente premium")',
      });
    }
  }

  // Validate acceptance criteria
  // @ts-ignore - StoryData type mismatch with acceptanceCriteria property
  if (!story.acceptanceCriteria || story.acceptanceCriteria.length < MIN_AC_COUNT) {
    errors.push({
      field: 'acceptanceCriteria',
      message: `Poucos critérios de aceite (mínimo ${MIN_AC_COUNT})`,
      suggestion: 'Adicione critérios testáveis que definam quando a story está completa',
    });
  } else {
    // Validate each criterion
    // @ts-ignore - StoryData type mismatch with acceptanceCriteria property
    story.acceptanceCriteria.forEach((criterion, index) => {
      if (criterion.trim().length < MIN_AC_LENGTH) {
        errors.push({
          field: `acceptanceCriteria[${index}]`,
          message: `Critério ${index + 1} muito curto`,
          suggestion: 'Expanda o critério para ser mais específico e testável',
        });
      } else if (!AC_VERB_PATTERN.test(criterion.trim())) {
        warnings.push({
          field: `acceptanceCriteria[${index}]`,
          message: `Critério ${index + 1} não começa com verbo de ação`,
          suggestion: 'Inicie com: "Dado...", "Quando...", "Deve...", "Pode..."',
        });
      }
    });
  }

  // Validate complexity
  if (!story.complexity || !['P', 'M', 'G'].includes(story.complexity)) {
    errors.push({
      field: 'complexity',
      message: 'Complexidade inválida',
      suggestion: 'Use P (Pequena), M (Média) ou G (Grande)',
    });
  }

  // Additional warnings
  // @ts-ignore - StoryData type mismatch with acceptanceCriteria property
  if (story.acceptanceCriteria && story.acceptanceCriteria.length > 5) {
    warnings.push({
      field: 'acceptanceCriteria',
      message: 'Muitos critérios de aceite',
      suggestion: 'Considere dividir em múltiplas stories para facilitar o desenvolvimento',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate all stories and return a summary
 * @param stories - Array of stories to validate
 * @returns ValidationSummary with aggregated results
 */
export function validateAllStories(stories: StoryData[]): ValidationSummary {
  const errorsByType: Record<string, number> = {};
  const warningsByType: Record<string, number> = {};
  let validStories = 0;

  stories.forEach((story) => {
    const result = validateStory(story);

    if (result.isValid) {
      validStories++;
    }

    result.errors.forEach((error) => {
      const type = error.field.replace(/\[\d+\]/, '');
      errorsByType[type] = (errorsByType[type] || 0) + 1;
    });

    result.warnings.forEach((warning) => {
      const type = warning.field.replace(/\[\d+\]/, '');
      warningsByType[type] = (warningsByType[type] || 0) + 1;
    });
  });

  return {
    totalStories: stories.length,
    validStories,
    invalidStories: stories.length - validStories,
    errorsByType,
    warningsByType,
  };
}

/**
 * Validate and update story with validation results
 * @param story - The story to validate
 * @returns Story with isValid and validationErrors updated
 */
export function validateAndUpdateStory(story: StoryData): StoryData {
  const result = validateStory(story);

  return {
    ...story,
    isValid: result.isValid,
    validationErrors: result.errors.map((e) => e.message),
  };
}

/**
 * Validate all stories and update each with validation results
 * @param stories - Array of stories to validate
 * @returns Array of stories with isValid and validationErrors updated
 */
export function validateAndUpdateAllStories(stories: StoryData[]): StoryData[] {
  return stories.map(validateAndUpdateStory);
}

/**
 * Get suggestions for fixing common issues
 * @param story - The story with issues
 * @returns Object with field-specific suggestions
 */
export function getSuggestions(story: StoryData): Record<string, string> {
  const result = validateStory(story);
  const suggestions: Record<string, string> = {};

  [...result.errors, ...result.warnings].forEach((item) => {
    if (item.suggestion) {
      const field = item.field.replace(/\[\d+\]/, '');
      if (!suggestions[field]) {
        suggestions[field] = item.suggestion;
      }
    }
  });

  return suggestions;
}

/**
 * Check if a user story follows the correct format
 * @param userStory - The user story text to check
 * @returns boolean indicating if format is valid
 */
export function isValidUserStoryFormat(userStory: string): boolean {
  return USER_STORY_PATTERN.test(userStory.trim());
}

/**
 * Check if an acceptance criterion starts with an action verb
 * @param criterion - The criterion text to check
 * @returns boolean indicating if format is valid
 */
export function isValidCriterionFormat(criterion: string): boolean {
  return AC_VERB_PATTERN.test(criterion.trim());
}

/**
 * Get validation status color
 * @param isValid - Whether the item is valid
 * @returns Tailwind color class
 */
export function getValidationColor(isValid: boolean): string {
  return isValid ? 'text-emerald-500' : 'text-red-500';
}

/**
 * Get validation icon name
 * @param isValid - Whether the item is valid
 * @returns Icon name
 */
export function getValidationIcon(isValid: boolean): string {
  return isValid ? 'check-circle' : 'alert-circle';
}
