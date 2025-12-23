import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Check skills
const { data: skills, count: skillsCount } = await supabase
  .from('skills')
  .select('*', { count: 'exact' })
  .limit(20);

console.log('SKILLS (' + (skillsCount || 0) + ' total):');
if (skills?.length) {
  skills.forEach(s => console.log('  ' + s.id + ' | ' + s.code + ' | ' + s.name));
} else {
  console.log('  (empty)');
}

// Check drivers
const { data: drivers, count: driversCount } = await supabase
  .from('drivers')
  .select('*', { count: 'exact' })
  .limit(20);

console.log('\nDRIVERS (' + (driversCount || 0) + ' total):');
if (drivers?.length) {
  drivers.forEach(d => console.log('  ' + d.id + ' | ' + d.slug + ' | ' + d.name));
} else {
  console.log('  (empty)');
}

// Check existing mind_obsessions
const { count: obsCount } = await supabase
  .from('mind_obsessions')
  .select('*', { count: 'exact', head: true });

console.log('\nEXISTING DATA:');
console.log('  mind_obsessions: ' + (obsCount || 0));

const { count: valCount } = await supabase
  .from('mind_values')
  .select('*', { count: 'exact', head: true });
console.log('  mind_values: ' + (valCount || 0));

const { count: profCount } = await supabase
  .from('mind_proficiencies')
  .select('*', { count: 'exact', head: true });
console.log('  mind_proficiencies: ' + (profCount || 0));
