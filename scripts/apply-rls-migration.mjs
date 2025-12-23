import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Applying RLS migration...\n');

const sql = readFileSync('../supabase/migrations/20251212180000_public_read_mind_relations.sql', 'utf8');

// Split into individual statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

for (const stmt of statements) {
  console.log('Executing:', stmt.substring(0, 60) + '...');

  const { error } = await supabase.rpc('exec_sql', { sql: stmt });

  if (error) {
    // If exec_sql doesn't exist, we need to run via psql or dashboard
    console.log('Note: exec_sql not available, need to run via Supabase Dashboard');
    break;
  }
}

console.log('\nDone!');
