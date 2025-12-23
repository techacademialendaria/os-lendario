import { supabase } from '../lib/supabase';

export interface DebateFramework {
  id: number;
  slug: string;
  name: string;
  description: string;
  framework_type: string;
  framework_schema: {
    rounds?: number;
    roles?: Array<{
      id: string;
      label: string;
      description: string;
    }>;
    structure?: Array<{
      round: number;
      type: string;
      speaker: string;
      duration_seconds?: number;
      purpose: string;
    }>;
    scoring_dimensions?: Array<{
      id: string;
      weight: number;
      description: string;
    }>;
    participants?: {
      min: number;
      max: number;
    };
    complexity?: 'Baixa' | 'Média' | 'Alta' | 'Muito Alta';
    best_for?: string;
  };
  is_active: boolean;
  created_at: string;
}

export interface FrameworkStats {
  total_frameworks: number;
  by_complexity: Record<string, number>;
  by_participants: Record<string, number>;
}

export const frameworkService = {
  /**
   * Fetch all debate frameworks from database
   */
  async getDebateFrameworks(): Promise<DebateFramework[]> {
    const { data, error } = await supabase
      .from('toolbox')
      .select('*')
      .eq('framework_type', 'debate')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching debate frameworks:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Fetch single framework by slug
   */
  async getFrameworkBySlug(slug: string): Promise<DebateFramework | null> {
    const { data, error } = await supabase
      .from('toolbox')
      .select('*')
      .eq('slug', slug)
      .eq('framework_type', 'debate')
      .single();

    if (error) {
      console.error(`Error fetching framework ${slug}:`, error);
      return null;
    }

    return data;
  },

  /**
   * Get framework statistics
   */
  async getFrameworkStats(): Promise<FrameworkStats> {
    const frameworks = await this.getDebateFrameworks();

    const by_complexity: Record<string, number> = {};
    const by_participants: Record<string, number> = {};

    frameworks.forEach(fw => {
      const complexity = fw.framework_schema.complexity || 'Média';
      by_complexity[complexity] = (by_complexity[complexity] || 0) + 1;

      const participants = fw.framework_schema.participants;
      if (participants) {
        const key = `${participants.min}-${participants.max}`;
        by_participants[key] = (by_participants[key] || 0) + 1;
      }
    });

    return {
      total_frameworks: frameworks.length,
      by_complexity,
      by_participants
    };
  },

  /**
   * Extract participants info from framework
   */
  getParticipantsRange(framework: DebateFramework): string {
    const p = framework.framework_schema.participants;
    if (!p) return '2'; // Default for most debates

    if (p.min === p.max) return `${p.min}`;
    return `${p.min}-${p.max}`;
  },

  /**
   * Get complexity badge color
   */
  getComplexityColor(complexity?: string): string {
    switch (complexity) {
      case 'Baixa':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Média':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Alta':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Muito Alta':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  }
};
