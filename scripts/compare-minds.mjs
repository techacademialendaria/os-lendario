import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readdirSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get minds from database
const { data: dbMinds } = await supabase
  .from('minds')
  .select('slug, display_name, short_bio, apex_score')
  .order('slug');

const dbSlugs = new Set(dbMinds.map(m => m.slug));

// Slug mapping for known aliases (outputs -> db)
const SLUG_MAP = {
  'jose_amorim': 'jose-carlos-amorim',
  'adriano_de_marqui': 'adriano-de-marqui'
};

function normalizeSlug(slug) {
  return SLUG_MAP[slug] || slug.replace(/_/g, '-');
}

// Get minds from outputs/minds
const outputsPath = './outputs/minds';
const outputDirs = readdirSync(outputsPath, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const outputSlugs = new Set(outputDirs);

// Compare
console.log('='.repeat(70));
console.log('MINDS COMPARISON: Database vs outputs/minds');
console.log('='.repeat(70));

// Build reverse map for DB -> outputs lookup
const normalizedOutputs = new Map(outputDirs.map(s => [normalizeSlug(s), s]));

console.log('\nIN DATABASE (' + dbMinds.length + '):');
dbMinds.forEach(m => {
  const inOutputs = outputSlugs.has(m.slug) || normalizedOutputs.has(m.slug);
  const hasBio = m.short_bio && m.short_bio.length > 10;
  console.log('  ' + (inOutputs ? '[SYNC]' : '[DB  ]') + ' ' + m.slug.padEnd(25) + (hasBio ? ' bio:YES' : ' bio:NO'));
});

console.log('\nIN OUTPUTS ONLY (not in DB):');
outputDirs.forEach(slug => {
  const normalized = normalizeSlug(slug);
  const inDb = dbSlugs.has(slug) || dbSlugs.has(normalized);
  if (!inDb) {
    console.log('  [OUT ] ' + slug);
  }
});

// Summary
const inBoth = outputDirs.filter(s => dbSlugs.has(s) || dbSlugs.has(normalizeSlug(s))).length;
const onlyInDb = dbMinds.filter(m => !outputSlugs.has(m.slug) && !normalizedOutputs.has(m.slug)).length;
const onlyInOutputs = outputDirs.filter(s => !dbSlugs.has(s) && !dbSlugs.has(normalizeSlug(s))).length;

console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log('  In both (synced):    ' + inBoth);
console.log('  Only in DB:          ' + onlyInDb);
console.log('  Only in outputs/:    ' + onlyInOutputs);
console.log('  Total DB:            ' + dbMinds.length);
console.log('  Total outputs/:      ' + outputDirs.length);
