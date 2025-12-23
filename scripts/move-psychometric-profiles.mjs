/**
 * Move normalized psychometric profiles to correct locations
 * and create coverage report
 */

import { readdir, readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const NORMALIZED_DIR = '../outputs/minds/mapeamento-cognitivo/normalized';
const OUTPUTS_DIR = '../outputs/minds';

async function getMindsFromDb() {
  const { data, error } = await supabase
    .from('minds')
    .select('id, slug, display_name')
    .order('slug');

  if (error) throw error;
  return data;
}

async function getNormalizedProfiles() {
  const indexContent = await readFile(join(NORMALIZED_DIR, '_index.json'), 'utf-8');
  const index = JSON.parse(indexContent);
  return index.profiles;
}

async function main() {
  console.log('='.repeat(70));
  console.log('MOVE & COVERAGE: Psychometric Profiles');
  console.log('='.repeat(70));
  console.log();

  // Get minds from DB
  const dbMinds = await getMindsFromDb();
  console.log(`Minds no DB: ${dbMinds.length}`);

  // Get normalized profiles
  const normalizedProfiles = await getNormalizedProfiles();
  console.log(`Perfis normalizados: ${normalizedProfiles.length}`);
  console.log();

  // Create slug mapping for matching
  const normalizedBySlug = new Map();
  for (const p of normalizedProfiles) {
    // Map various slug formats
    normalizedBySlug.set(p.id, p);
    normalizedBySlug.set(p.id.replace(/_/g, '-'), p);
    normalizedBySlug.set(p.id.replace(/-/g, '_'), p);
  }

  // Special mappings
  const SLUG_MAP = {
    'gary_vee': 'gary_vaynerchuk',
    'naval': 'naval_ravikant',
    'jose-carlos-amorim': 'jose_amorim',
    'jose_carlos_amorim': 'jose_amorim'
  };

  const coverage = {
    with_profile: [],
    without_profile: [],
    moved: []
  };

  // Process each DB mind
  for (const mind of dbMinds) {
    // Try to find matching profile
    let profile = normalizedBySlug.get(mind.slug);
    if (!profile) profile = normalizedBySlug.get(SLUG_MAP[mind.slug]);
    if (!profile) profile = normalizedBySlug.get(mind.slug.replace(/-/g, '_'));
    if (!profile) profile = normalizedBySlug.get(mind.slug.replace(/_/g, '-'));

    if (profile) {
      coverage.with_profile.push({
        slug: mind.slug,
        name: mind.display_name,
        profile_id: profile.id,
        profile_file: profile.file
      });

      // Move file to correct location
      const sourceFile = join(NORMALIZED_DIR, profile.file);
      const targetDir = join(OUTPUTS_DIR, mind.slug, 'artifacts');
      const targetFile = join(targetDir, 'psychometric_profile.json');

      try {
        await mkdir(targetDir, { recursive: true });
        await copyFile(sourceFile, targetFile);
        coverage.moved.push({
          from: profile.file,
          to: `${mind.slug}/artifacts/psychometric_profile.json`
        });
      } catch (e) {
        console.log(`ERROR moving ${profile.file}: ${e.message}`);
      }
    } else {
      coverage.without_profile.push({
        slug: mind.slug,
        name: mind.display_name
      });
    }
  }

  // Print coverage report
  console.log('='.repeat(70));
  console.log('COBERTURA');
  console.log('='.repeat(70));
  console.log();
  console.log(`✅ Com perfil psicométrico: ${coverage.with_profile.length}/${dbMinds.length}`);
  console.log(`❌ Sem perfil psicométrico: ${coverage.without_profile.length}/${dbMinds.length}`);
  console.log();

  console.log('=== MINDS COM PERFIL ===');
  for (const m of coverage.with_profile) {
    console.log(`  ✅ ${m.slug} (${m.name})`);
  }

  console.log();
  console.log('=== MINDS SEM PERFIL ===');
  for (const m of coverage.without_profile.slice(0, 30)) {
    console.log(`  ❌ ${m.slug} (${m.name})`);
  }
  if (coverage.without_profile.length > 30) {
    console.log(`  ... e mais ${coverage.without_profile.length - 30}`);
  }

  console.log();
  console.log('='.repeat(70));
  console.log('ARQUIVOS MOVIDOS');
  console.log('='.repeat(70));
  for (const m of coverage.moved) {
    console.log(`  ${m.from} → ${m.to}`);
  }

  // Save coverage report
  const report = {
    generated_at: new Date().toISOString(),
    summary: {
      total_minds: dbMinds.length,
      with_psychometric_profile: coverage.with_profile.length,
      without_psychometric_profile: coverage.without_profile.length,
      coverage_percentage: Math.round((coverage.with_profile.length / dbMinds.length) * 100)
    },
    with_profile: coverage.with_profile,
    without_profile: coverage.without_profile
  };

  const reportPath = join(OUTPUTS_DIR, 'mapeamento-cognitivo', '_coverage_report.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log();
  console.log(`Relatório salvo: ${reportPath}`);
}

main().catch(console.error);
