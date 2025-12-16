import { supabase } from '../lib/supabase';
import type { PublicMind } from '../hooks/usePublicMinds';

const API_BASE = '/api';

// DiceBear fallback for missing local images
export const getDiceBearUrl = (slug: string): string => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

export interface DebateRequest {
    mind1_id: string;
    mind2_id: string;
    topic: string;
    framework?: string;
    rounds?: number;
}

export interface DebateStatus {
    event: 'status' | 'new_round' | 'end';
    data: any;
}

export const debateService = {
    /**
     * Start a new debate
     */
    async createDebate(req: DebateRequest) {
        const res = await fetch(`${API_BASE}/debates/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        });

        if (!res.ok) {
            throw new Error('Failed to create debate');
        }

        return res.json(); // returns { debate_id, status }
    },

    /**
     * Get EventSource for streaming
     */
    getStreamSource(debateId: string): EventSource {
        return new EventSource(`${API_BASE}/debates/stream/${debateId}`);
    },

    /**
     * Fetch active minds from Supabase
     *
     * Note: Uses the same data source as usePublicMinds hook
     * Transforms PublicMind → Clone for Arena/Debate display
     */
    async getMinds() {
        const { data, error } = await supabase
            .from('minds')
            .select('id, slug, display_name, short_bio, apex_score')
            .eq('privacy_level', 'public')
            .is('deleted_at', null)
            .order('updated_at', { ascending: false });

        if (error) throw error;

        // Transform to match UI Clone interface
        return (data || []).map(m => ({
            id: m.id,
            name: (m.display_name || '').replace(/^["']|["']$/g, '') || m.slug,
            role: m.short_bio || 'Mente Sintética',
            avatar: `/minds-profile-images/${m.slug}.jpg`,
            winRate: m.apex_score ? Math.round((m.apex_score || 0) * 100) : 0,
            debates: 0, // TODO: load from debates table when available
            fidelity: 85, // TODO: load from real metrics when available
            color: 'text-zinc-400',
            personality: m.short_bio || 'Uma mente sintética em construção.'
        }));
    }
};
