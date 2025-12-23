#!/usr/bin/env node
/**
 * Import Psychometric Profiles to Supabase
 *
 * Reads JSON files from outputs/minds/{slug}/artifacts/psychometric_profile.json
 * and upserts into mind_psychometrics table
 *
 * Usage: node app/scripts/import-psychometric-profiles.mjs [--dry-run]
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../../.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const DRY_RUN = process.argv.includes('--dry-run');

const SLUGS = [
  "adriano_de_marqui",
  "alan_nicolas",
  "alex_hormozi",
  "dan_koe",
  "daniel_kahneman",
  "elon_musk",
  "gary_vee",
  "jesus_cristo",
  "joao_lozano",
  "jose-carlos-amorim",
  "mark_manson",
  "napoleon_hill",
  "naval_ravikant",
  "paul_graham",
  "peter_thiel",
  "ray_kurzweil",
  "sam_altman",
  "steve_jobs",
  "thiago_finch"
];

async function getMindId(slug) {
  const { data, error } = await supabase
    .from('minds')
    .select('id')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data?.id;
}

function extractProfileData(json) {
  const profile = json.profile || json;
  const metadata = json.metadata || {};

  return {
    // Queryable fields
    disc_pattern: profile.disc?.pattern || null,
    mbti_type: profile.mbti?.type || null,
    enneagram_type: profile.enneagram?.type || null,
    cognitive_stratum: profile.cognitive_stratum?.level || null,

    // JSONB sections
    disc: profile.disc || null,
    enneagram: profile.enneagram || null,
    mbti: profile.mbti || null,
    big_five: profile.big_five || null,
    dark_triad: profile.dark_triad || null,
    intelligence: profile.intelligence || null,
    unique_characteristics: profile.unique_characteristics || null,
    convergence_analysis: profile.convergence_analysis || null,
    additional_assessments: profile.additional_assessments || null,
    profile_metadata: {
      schema_version: metadata.schema_version || '1.0',
      analysis_date: metadata.analysis_date || new Date().toISOString().split('T')[0],
      confidence: metadata.confidence || null,
      analyzer: metadata.analyzer || 'imported',
      import_date: new Date().toISOString()
    }
  };
}

async function importProfile(slug) {
  const filePath = resolve(__dirname, `../../outputs/minds/${slug}/artifacts/psychometric_profile.json`);

  if (!existsSync(filePath)) {
    console.log(`  [SKIP] ${slug} - file not found`);
    return { status: 'skip', reason: 'file_not_found' };
  }

  const mindId = await getMindId(slug);
  if (!mindId) {
    console.log(`  [SKIP] ${slug} - mind not found in DB`);
    return { status: 'skip', reason: 'mind_not_found' };
  }

  try {
    const json = JSON.parse(readFileSync(filePath, 'utf-8'));
    const data = extractProfileData(json);

    if (DRY_RUN) {
      console.log(`  [DRY] ${slug} -> ${data.mbti_type || '?'} / ${data.disc_pattern || '?'} / ${data.enneagram_type || '?'}`);
      return { status: 'dry', data };
    }

    const { error } = await supabase
      .from('mind_psychometrics')
      .upsert({
        mind_id: mindId,
        ...data,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.log(`  [ERR] ${slug} - ${error.message}`);
      return { status: 'error', error: error.message };
    }

    console.log(`  [OK]  ${slug} -> ${data.mbti_type || '?'} / ${data.disc_pattern || '?'} / ${data.enneagram_type || '?'}`);
    return { status: 'ok', data };

  } catch (err) {
    console.log(`  [ERR] ${slug} - ${err.message}`);
    return { status: 'error', error: err.message };
  }
}

async function main() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Importing Psychometric Profiles ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log(`${'='.repeat(60)}\n`);

  const results = { ok: 0, skip: 0, error: 0, dry: 0 };

  for (const slug of SLUGS) {
    const result = await importProfile(slug);
    results[result.status]++;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Results: ${results.ok} imported, ${results.skip} skipped, ${results.error} errors`);
  if (DRY_RUN) console.log(`(Dry run - no changes made)`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch(console.error);
