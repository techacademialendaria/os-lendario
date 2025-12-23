import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Get all minds with related data
const { data: minds, error } = await supabase
  .from('minds')
  .select(`
    id, slug, display_name, short_bio, apex_score, created_at,
    proficiencies:mind_proficiencies(count),
    profiles:mind_profiles(count),
    project_minds(count)
  `)
  .order('display_name');

if (error) {
  console.error(error);
  process.exit(1);
}

// Group by normalized name
const groups = {};
minds.forEach(m => {
  const normalized = m.display_name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .trim();
  if (!groups[normalized]) groups[normalized] = [];
  groups[normalized].push(m);
});

console.log('='.repeat(80));
console.log('DUPLICATE ANALYSIS');
console.log('='.repeat(80));

// Show duplicates
const duplicates = Object.entries(groups).filter(([k, v]) => v.length > 1);
console.log('\nDUPLICATES FOUND: ' + duplicates.length + ' groups\n');

duplicates.forEach(([name, items]) => {
  console.log('--- ' + name.toUpperCase() + ' (' + items.length + ' entries) ---');
  items.forEach(m => {
    const hasBio = m.short_bio && m.short_bio.trim().length > 0 ? 'YES' : 'NO';
    const hasRels = (m.proficiencies?.[0]?.count || 0) + (m.profiles?.[0]?.count || 0) + (m.project_minds?.[0]?.count || 0);
    console.log('  ' + m.slug.padEnd(25) + ' | bio:' + hasBio.padEnd(4) + ' | relations:' + hasRels + ' | id:' + m.id.slice(0,8));
  });
  console.log('');
});

// Generic/placeholder minds
console.log('='.repeat(80));
console.log('GENERIC/PLACEHOLDER MINDS');
console.log('='.repeat(80));
const generics = minds.filter(m =>
  ['unknown', 'rafael', 'test', 'placeholder'].includes(m.slug.toLowerCase()) ||
  m.display_name.toLowerCase().includes('unknown') ||
  m.display_name.toLowerCase().includes('test')
);
generics.forEach(m => {
  const hasRels = (m.proficiencies?.[0]?.count || 0) + (m.profiles?.[0]?.count || 0) + (m.project_minds?.[0]?.count || 0);
  console.log('  ' + m.slug.padEnd(25) + ' | relations:' + hasRels + ' | id:' + m.id.slice(0,8));
});

// Summary
console.log('\n' + '='.repeat(80));
console.log('CLEANUP RECOMMENDATION');
console.log('='.repeat(80));

const toRemove = [];
duplicates.forEach(([name, items]) => {
  // Keep the one with most data (bio, relations)
  const sorted = items.sort((a, b) => {
    const aScore = (a.short_bio ? 10 : 0) + (a.proficiencies?.[0]?.count || 0) + (a.profiles?.[0]?.count || 0);
    const bScore = (b.short_bio ? 10 : 0) + (b.proficiencies?.[0]?.count || 0) + (b.profiles?.[0]?.count || 0);
    return bScore - aScore;
  });
  // Remove all but the first (best)
  toRemove.push(...sorted.slice(1).map(m => ({ id: m.id, slug: m.slug, reason: 'duplicate' })));
});

generics.forEach(m => {
  if (!toRemove.find(r => r.id === m.id)) {
    toRemove.push({ id: m.id, slug: m.slug, reason: 'generic' });
  }
});

console.log('\nMinds to REMOVE (' + toRemove.length + '):');
toRemove.forEach(m => {
  console.log('  - ' + m.slug + ' (' + m.reason + ')');
});

console.log('\nMinds to KEEP: ' + (minds.length - toRemove.length));

// Output IDs for removal
console.log('\n--- IDs FOR REMOVAL (copy for script) ---');
console.log(JSON.stringify(toRemove.map(m => m.id)));
