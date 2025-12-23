import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Check if proficiencies are loaded correctly
const { data, error } = await supabase
  .from('minds')
  .select(`
    slug, display_name,
    proficiencies:mind_proficiencies(
      level_10,
      skill:skills(name, code)
    )
  `)
  .eq('slug', 'naval_ravikant')
  .single();

if (error) {
  console.error('Error:', error.message);
} else {
  console.log('Naval Ravikant data:');
  console.log(JSON.stringify(data, null, 2));
}

// Check duplicates
const { data: amorims } = await supabase
  .from('minds')
  .select('id, slug, display_name')
  .ilike('slug', '%amorim%');

console.log('\nAmorim entries:');
console.log(JSON.stringify(amorims, null, 2));
