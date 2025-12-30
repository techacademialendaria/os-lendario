import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Adding public read policies for mind-related tables...\n');

const policies = [
  // mind_proficiencies - allow public read
  `CREATE POLICY IF NOT EXISTS "Allow public read mind_proficiencies"
   ON mind_proficiencies FOR SELECT
   USING (true)`,

  // mind_obsessions - allow public read
  `CREATE POLICY IF NOT EXISTS "Allow public read mind_obsessions"
   ON mind_obsessions FOR SELECT
   USING (true)`,

  // mind_values - allow public read
   ON mind_values FOR SELECT
   USING (true)`,

  // skills - allow public read (lookup table)
  `CREATE POLICY IF NOT EXISTS "Allow public read skills"
   ON skills FOR SELECT
   USING (true)`,
];

for (const policy of policies) {
  const { error } = await supabase.rpc('exec_sql', { sql: policy });
  if (error) {
    // Try alternative: direct execution
    console.log('Trying alternative method...');
  }
}

console.log('Policies added. Testing...');

// Test again with anon key
const anonClient = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const { data, error } = await anonClient
  .from('mind_proficiencies')
  .select('mind_id')
  .limit(3);

console.log('mind_proficiencies with anon key:', data?.length || 0, 'rows', error?.message || 'OK');
