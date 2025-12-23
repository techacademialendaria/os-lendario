import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Test with ANON key (same as frontend)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

console.log('Testing with ANON key (frontend)...\n');

// Test minds
const { data: minds, error: mindsErr } = await supabase
  .from('minds')
  .select('slug')
  .limit(3);
console.log('minds:', minds?.length || 0, 'rows', mindsErr?.message || 'OK');

// Test mind_proficiencies
const { data: profs, error: profsErr } = await supabase
  .from('mind_proficiencies')
  .select('mind_id, skill_id')
  .limit(3);
console.log('mind_proficiencies:', profs?.length || 0, 'rows', profsErr?.message || 'OK');

// Test full query (like hook does)
const { data: fullData, error: fullErr } = await supabase
  .from('minds')
  .select(`
    slug, display_name,
    proficiencies:mind_proficiencies(
      level_10,
      skill:skills(name, code)
    )
  `)
  .eq('privacy_level', 'public')
  .limit(2);

console.log('\nFull query result:');
if (fullErr) {
  console.log('Error:', fullErr.message);
} else {
  console.log(JSON.stringify(fullData, null, 2));
}
