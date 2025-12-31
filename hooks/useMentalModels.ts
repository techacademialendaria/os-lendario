import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Mental Model Data Structures
 */
export interface MentalModel {
  name: string;
  slug: string;
  desc: string;
  origin: string;
  discipline: string;
  complexity: number;        // axis_rigidity (1-10)
  applicability: number;     // axis_prescriptive (1-10)
  useCase: string;
  example: string;
  driverAffinities: string[];
}

export interface MentalModelCategory {
  name: string;
  icon: string;
  description: string;
  discipline: string;
  models: MentalModel[];
}

export interface UseMentalModelsResult {
  categories: MentalModelCategory[];
  models: any[];
  loading: boolean;
  error: Error | null;
  totalModels: number;
  refetch: () => Promise<void>;
}

/**
 * Domain to Category Mapping
 * Maps database domains enum to display categories
 */
const DOMAIN_CATEGORY_MAP: Record<string, Omit<MentalModelCategory, 'models'>> = {
  'analysis': {
    name: 'Ferramentas de Pensamento Geral',
    icon: 'lightbulb',
    description: 'Frameworks fundamentais para estruturar o pensamento',
    discipline: 'General'
  },
  'decision': {
    name: 'Economia & Negócios',
    icon: 'coins',
    description: 'Modelos para entender mercados e alocação de recursos',
    discipline: 'Economics'
  },
  'prioritization': {
    name: 'Pensamento em Sistemas',
    icon: 'network',
    description: 'Modelos para entender sistemas complexos e interconectados',
    discipline: 'Systems'
  },
  'learning': {
    name: 'Psicologia & Comportamento',
    icon: 'brain',
    description: 'Modelos sobre como pensamos e tomamos decisões',
    discipline: 'Psychology'
  },
  'ideation': {
    name: 'Biologia & Natureza',
    icon: 'leaf',
    description: 'Modelos derivados de sistemas naturais',
    discipline: 'Natural Sciences'
  }
};

/**
 * Fallback empty state when Supabase not configured
 */
const FALLBACK_CATEGORIES: MentalModelCategory[] = [];

/**
 * Transform raw tool record to MentalModel display format
 */
function transformToolToModel(tool: any): MentalModel {
  const schema = tool.tool_schema || {};

  return {
    name: tool.name || 'Unnamed Model',
    slug: tool.slug || 'unknown',
    desc: tool.description || '',
    origin: tool.origin_author || 'Unknown origin',
    discipline: extractDiscipline(tool.domains),
    complexity: tool.axis_rigidity ? Math.min(Math.max(tool.axis_rigidity, 1), 10) : 5,
    applicability: tool.axis_prescriptive ? Math.min(Math.max(tool.axis_prescriptive, 1), 10) : 5,
    useCase: schema.when_to_apply?.[0] || '',
    example: schema.examples?.[0]?.application || schema.examples?.[0]?.insight || '',
    driverAffinities: transformDriverAffinities(tool.tool_driver_affinities || [])
  };
}

/**
 * Extract discipline from domains array
 */
function extractDiscipline(domains: string[] | null | undefined): string {
  if (!domains || domains.length === 0) return 'General';

  const disciplineMap: Record<string, string> = {
    'analysis': 'General',
    'decision': 'Economics',
    'prioritization': 'Systems',
    'learning': 'Psychology',
    'ideation': 'Nature'
  };

  return disciplineMap[domains[0]] || 'General';
}

/**
 * Transform driver affinities to slug array
 */
function transformDriverAffinities(affinities: any[]): string[] {
  return affinities
    .filter(a =>
      a.affinity_type === 'enables' ||
      a.affinity_type === 'requires'
    )
    .sort((a, b) => (b.strength || 0) - (a.strength || 0))
    .map(a => a.driver?.slug || a.driver?.name || '')
    .filter(slug => slug.length > 0)
    .slice(0, 5);
}

/**
 * Group tools by domain into categories
 */
function groupByDomain(tools: any[]): MentalModelCategory[] {
  const grouped = tools.reduce((acc, tool) => {
    const primaryDomain = tool.domains?.[0] || 'analysis';
    const categoryMeta = DOMAIN_CATEGORY_MAP[primaryDomain] || DOMAIN_CATEGORY_MAP['analysis'];

    if (!acc[primaryDomain]) {
      acc[primaryDomain] = {
        ...categoryMeta,
        models: []
      };
    }

    acc[primaryDomain].models.push(transformToolToModel(tool));
    return acc;
  }, {} as Record<string, MentalModelCategory>);

  return (Object.values(grouped) as MentalModelCategory[]).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Hook to fetch and organize mental models from Supabase
 */
export function useMentalModels(): UseMentalModelsResult {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMentalModels = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        setTools([]);
        setLoading(false);
        return;
      }

      // Query mental models from tools table
      const { data, error: queryError } = await supabase
        .from('tools')
        .select(`
          id,
          slug,
          name,
          description,
          tool_schema,
          domains,
          axis_rigidity,
          axis_prescriptive,
          origin_author,
          quality_score,
          tool_driver_affinities (
            affinity_type,
            strength,
            driver:drivers (
              slug,
              name
            )
          )
        `)
        .eq('tool_type', 'mental_model')
        .eq('is_active', true)
        .order('name');

      if (queryError) {
        throw queryError;
      }

      setTools(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchMentalModels();
  }, [fetchMentalModels]);

  // Memoize categorized data
  const categories = useMemo(() => {
    if (tools.length === 0) return FALLBACK_CATEGORIES;
    return groupByDomain(tools);
  }, [tools]);

  const totalModels = useMemo(() => tools.length, [tools]);

  return {
    categories,
    models: tools,
    loading,
    error,
    totalModels,
    refetch: fetchMentalModels
  };
}
