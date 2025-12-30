import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for WhatsApp Groups Dashboard
 * This is a SEPARATE Supabase instance from the main MMOS database
 */

// @ts-ignore - Vite env types
const groupsSupabaseUrl = import.meta.env.VITE_GROUPS_SUPABASE_URL;
// @ts-ignore - Vite env types
const groupsSupabaseAnonKey = import.meta.env.VITE_GROUPS_SUPABASE_ANON_KEY;

if (!groupsSupabaseUrl || !groupsSupabaseAnonKey) {
  console.warn(
    'Groups Supabase credentials not configured. Add VITE_GROUPS_SUPABASE_URL and VITE_GROUPS_SUPABASE_ANON_KEY to .env'
  );
}

export const groupsSupabase = createClient(
  groupsSupabaseUrl || 'https://placeholder.supabase.co',
  groupsSupabaseAnonKey || 'placeholder-key'
);

export const isGroupsSupabaseConfigured = () => {
  return Boolean(groupsSupabaseUrl && groupsSupabaseAnonKey);
};
