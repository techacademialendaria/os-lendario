import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const { data, error } = await supabase
  .from('minds')
  .select('id, slug, display_name, short_bio, apex_score')
  .order('display_name');

if (error) {
  console.error(error);
  process.exit(1);
}

console.log('MINDS STATUS:');
console.log('='.repeat(80));

data.forEach(m => {
  const hasBio = m.short_bio && m.short_bio.trim().length > 0;
  const hasApex = m.apex_score !== null && m.apex_score > 0;
  const status = hasBio && hasApex ? 'OK' : hasBio ? 'BIO' : 'EMPTY';
  const apex = m.apex_score !== null ? m.apex_score.toString() : 'null';
  console.log(status.padEnd(6) + ' ' + m.display_name.padEnd(25) + ' | apex: ' + apex);
});

const needsBio = data.filter(m => !m.short_bio || m.short_bio.trim() === '');
const needsApex = data.filter(m => m.apex_score === null || m.apex_score === 0);
console.log('\n' + '='.repeat(80));
console.log('Needs bio: ' + needsBio.length + ' | Needs apex: ' + needsApex.length);

// Output slugs that need data
console.log('\nMinds needing bio:');
needsBio.forEach(m => console.log('  - ' + m.slug));
