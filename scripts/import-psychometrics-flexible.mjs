#!/usr/bin/env node
/**
 * Flexible Psychometric Profile Import
 *
 * Scans outputs/minds/{slug}/artifacts/ for JSON files with psychometric data
 * and imports them into mind_psychometrics table
 *
 * Usage: node app/scripts/import-psychometrics-flexible.mjs [--dry-run]
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import YAML from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const DRY_RUN = process.argv.includes('--dry-run');
const MINDS_DIR = resolve(__dirname, '../../outputs/minds');

// Parse file content (JSON or YAML)
function parseFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    // Handle multi-document YAML files
    const docs = YAML.parseAllDocuments(content);
    if (docs.length === 0) return null;
    if (docs.length === 1) return docs[0].toJSON();
    // Merge all documents into one object
    const merged = {};
    for (const doc of docs) {
      const json = doc.toJSON();
      if (json && typeof json === 'object') {
        Object.assign(merged, json);
      }
    }
    return merged;
  }
  return JSON.parse(content);
}

// Search directories recursively for profile files
function findFilesRecursive(dir, pattern, maxDepth = 3, currentDepth = 0) {
  if (!existsSync(dir) || currentDepth > maxDepth) return [];

  const results = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        results.push(...findFilesRecursive(fullPath, pattern, maxDepth, currentDepth + 1));
      } else if (entry.isFile() && pattern.test(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore permission errors
  }
  return results;
}

// Normalize profile from different formats to standard structure
function normalizeProfile(content, filePath) {
  // Format 1: Direct profile structure (profile.disc, profile.mbti, etc.)
  if (content.profile?.disc || content.profile?.mbti || content.profile?.enneagram) {
    return content;
  }
  if (content.disc || content.mbti || content.enneagram) {
    return { profile: content };
  }

  // Format 2: cognitive-spec.yaml format (psychometric_profile.personality_systems)
  if (content.psychometric_profile?.personality_systems) {
    const ps = content.psychometric_profile.personality_systems;
    const cp = content.psychometric_profile.cognitive_profile || {};

    const profile = {
      disc: ps.disc ? {
        D: ps.disc.scores?.D || ps.disc.D,
        I: ps.disc.scores?.I || ps.disc.I,
        S: ps.disc.scores?.S || ps.disc.S,
        C: ps.disc.scores?.C || ps.disc.C,
        pattern: ps.disc.pattern,
        pattern_name: ps.disc.pattern_name
      } : null,
      mbti: ps.mbti ? {
        type: ps.mbti.type?.split(' ')[0] || ps.mbti.type, // "ISTP-A (The Virtuoso)" -> "ISTP-A"
        type_name: ps.mbti.type?.match(/\(([^)]+)\)/)?.[1], // Extract "The Virtuoso"
        cognitive_stack: ps.mbti.cognitive_functions ? {
          dominant: { function: ps.mbti.cognitive_functions.dominant?.split(' ')[0] },
          auxiliary: { function: ps.mbti.cognitive_functions.auxiliary?.split(' ')[0] },
          tertiary: { function: ps.mbti.cognitive_functions.tertiary?.split(' ')[0] },
          inferior: { function: ps.mbti.cognitive_functions.inferior?.split(' ')[0] }
        } : null
      } : null,
      enneagram: ps.enneagram ? {
        type: ps.enneagram.core_type?.split(' ')[0] || ps.enneagram.type, // "5w4 (The Iconoclast)" -> "5w4"
        type_name: ps.enneagram.core_type?.match(/\(([^)]+)\)/)?.[1],
        instinct_stack: ps.enneagram.instinct_stack,
        stress_direction: ps.enneagram.disintegration?.toString(),
        growth_direction: ps.enneagram.integration?.toString()
      } : null,
      big_five: ps.big_five ? {
        O: ps.big_five.openness,
        C: ps.big_five.conscientiousness,
        E: ps.big_five.extraversion,
        A: ps.big_five.agreeableness,
        N: ps.big_five.neuroticism
      } : null,
      cognitive_stratum: {
        level: cp.stratum || cp.level
      },
      intelligence: cp.iq_estimated ? {
        iq_estimated: { range: cp.iq_estimated }
      } : null,
      unique_characteristics: content.psychometric_profile.statistical_rarity ? {
        statistical_rarity: content.psychometric_profile.statistical_rarity.combined_profile
      } : null
    };

    return { profile, _source_format: 'cognitive-spec' };
  }

  // Format 3: psychometrics root level (joao_lozano style)
  if (content.psychometrics?.disc || content.psychometrics?.mbti || content.psychometrics?.enneagram) {
    const ps = content.psychometrics;

    // Convert text scores to numbers
    const scoreMap = { 'high': 80, 'medium': 50, 'low': 20, 'very high': 90, 'very low': 10 };
    const parseScore = (val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') return scoreMap[val.toLowerCase()] || 50;
      return 50;
    };

    const profile = {
      disc: ps.disc ? {
        D: parseScore(ps.disc.dimensions?.dominant_d?.score || ps.disc.D),
        I: parseScore(ps.disc.dimensions?.influential_i?.score || ps.disc.I),
        S: parseScore(ps.disc.dimensions?.steady_s?.score || ps.disc.S),
        C: parseScore(ps.disc.dimensions?.conscientious_c?.score || ps.disc.C),
        pattern: ps.disc.type || ps.disc.pattern
      } : null,
      mbti: ps.mbti ? {
        type: ps.mbti.type,
        type_name: ps.mbti.type_name,
        cognitive_stack: ps.mbti.cognitive_stack || ps.mbti.cognitive_functions ? {
          dominant: { function: ps.mbti.cognitive_stack?.dominant || ps.mbti.cognitive_functions?.dominant },
          auxiliary: { function: ps.mbti.cognitive_stack?.auxiliary || ps.mbti.cognitive_functions?.auxiliary },
          tertiary: { function: ps.mbti.cognitive_stack?.tertiary || ps.mbti.cognitive_functions?.tertiary },
          inferior: { function: ps.mbti.cognitive_stack?.inferior || ps.mbti.cognitive_functions?.inferior }
        } : null
      } : null,
      enneagram: ps.enneagram ? {
        type: ps.enneagram.integration || ps.enneagram.core_type || ps.enneagram.type,
        type_name: ps.enneagram.type_name,
        instinct_stack: ps.enneagram.instinct_stack
      } : null,
      big_five: ps.big_five || ps.ocean || null
    };

    return { profile, _source_format: 'psychometrics-root' };
  }

  // Format 4: identity-core.yaml format (identity_signature with psychometric refs)
  if (content.identity_signature?.statistical_rarity) {
    // This file references psychometric data but doesn't contain it fully
    return null;
  }

  return null;
}

// Calculate richness score for a profile (more fields = richer)
function calculateRichness(profile) {
  let score = 0;
  if (profile.disc?.specific_behaviors?.length) score += 10;
  if (profile.disc?.D && profile.disc?.I && profile.disc?.S && profile.disc?.C) score += 5;
  if (profile.big_five?.openness?.facets) score += 10;
  if (profile.big_five?.openness?.total || profile.big_five?.O) score += 3;
  if (profile.dark_triad?.narcissism?.evidence) score += 10;
  if (profile.dark_triad?.narcissism?.score) score += 5;
  if (profile.unique_characteristics?.superpower?.length) score += 10;
  if (profile.unique_characteristics?.kryptonite?.length) score += 10;
  if (profile.enneagram?.behavioral_evidence?.length) score += 5;
  if (profile.mbti?.cognitive_stack?.dominant?.manifestations) score += 5;
  if (profile.intelligence?.iq_estimated) score += 3;
  if (profile.cognitive_stratum?.level) score += 3;
  return score;
}

// Find profile file with psychometric data
function findProfileFile(mindSlug) {
  const mindDir = join(MINDS_DIR, mindSlug);

  if (!existsSync(mindDir)) {
    return null;
  }

  // Find all JSON and YAML files (search deeper to include sources/)
  const pattern = /\.(json|yaml|yml)$/i;
  const files = findFilesRecursive(mindDir, pattern, 4);

  // Prioritize files with 'psychometric', 'profile', or 'cognitive-spec' in name
  const priorityOrder = [
    /psychometric.*profile/i,
    /psychometric/i,
    /-profile\.json$/i,
    /profile\.json$/i,
    /cognitive-spec/i,
    /cognitive.*spec/i,
    /profile/i
  ];

  const scoredFiles = files.map(f => {
    let score = 0;
    for (let i = 0; i < priorityOrder.length; i++) {
      if (priorityOrder[i].test(f)) {
        score = (priorityOrder.length - i) * 10;
        break;
      }
    }
    // Prefer JSON over YAML
    if (f.endsWith('.json')) score += 5;
    return { path: f, score };
  });

  scoredFiles.sort((a, b) => b.score - a.score);

  // Find all valid profiles and pick the richest one
  const validProfiles = [];
  for (const { path: filePath } of scoredFiles) {
    try {
      const content = parseFile(filePath);
      const normalized = normalizeProfile(content, filePath);

      if (normalized?.profile) {
        const richness = calculateRichness(normalized.profile);
        validProfiles.push({ path: filePath, content: normalized, richness });
      }
    } catch (e) {
      continue;
    }
  }

  if (validProfiles.length === 0) return null;

  // Sort by richness and return the richest
  validProfiles.sort((a, b) => b.richness - a.richness);
  return { path: validProfiles[0].path, content: validProfiles[0].content };
}

// Get all mind slugs from outputs/minds
function getAllMindSlugs() {
  if (!existsSync(MINDS_DIR)) {
    return [];
  }

  return readdirSync(MINDS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name);
}

// Get mind ID from database
async function getMindId(slug) {
  // Try both underscore and hyphen versions
  const slugVariants = [
    slug,
    slug.replace(/_/g, '-'),
    slug.replace(/-/g, '_'),
    slug.toLowerCase(),
    slug.toLowerCase().replace(/_/g, '-'),
    slug.toLowerCase().replace(/-/g, '_')
  ];

  for (const s of slugVariants) {
    const { data, error } = await supabase
      .from('minds')
      .select('id, slug')
      .eq('slug', s)
      .single();

    if (data) {
      return { id: data.id, dbSlug: data.slug };
    }
  }

  // Also try ILIKE for fuzzy match
  const { data } = await supabase
    .from('minds')
    .select('id, slug')
    .ilike('slug', slug.replace(/_/g, '%').replace(/-/g, '%'))
    .limit(1)
    .single();

  if (data) {
    return { id: data.id, dbSlug: data.slug };
  }

  return null;
}

// Extract and normalize profile data for database
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
      import_date: new Date().toISOString(),
      source_file: json._source_file || null
    }
  };
}

// Import single profile
async function importProfile(mindSlug) {
  const profileFile = findProfileFile(mindSlug);

  if (!profileFile) {
    return { status: 'skip', reason: 'no_profile_file' };
  }

  const mindInfo = await getMindId(mindSlug);
  if (!mindInfo) {
    console.log(`  [SKIP] ${mindSlug} - mind not found in DB`);
    return { status: 'skip', reason: 'mind_not_found' };
  }

  try {
    profileFile.content._source_file = profileFile.path.split('/').pop();
    const data = extractProfileData(profileFile.content);

    const summary = `${data.mbti_type || '?'} / ${data.disc_pattern || '?'} / ${data.enneagram_type || '?'}`;

    if (DRY_RUN) {
      console.log(`  [DRY] ${mindSlug} -> ${summary}`);
      return { status: 'dry', data };
    }

    const { error } = await supabase
      .from('mind_psychometrics')
      .upsert({
        mind_id: mindInfo.id,
        ...data,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.log(`  [ERR] ${mindSlug} - ${error.message}`);
      return { status: 'error', error: error.message };
    }

    console.log(`  [OK]  ${mindSlug} -> ${summary}`);
    return { status: 'ok', data };

  } catch (err) {
    console.log(`  [ERR] ${mindSlug} - ${err.message}`);
    return { status: 'error', error: err.message };
  }
}

async function main() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Importing Psychometric Profiles ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log(`${'='.repeat(60)}\n`);

  const allSlugs = getAllMindSlugs();
  console.log(`Found ${allSlugs.length} mind directories\n`);

  const results = { ok: 0, skip: 0, error: 0, dry: 0 };

  for (const slug of allSlugs) {
    const result = await importProfile(slug);
    results[result.status]++;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Results: ${results.ok} imported, ${results.skip} skipped, ${results.error} errors`);
  if (DRY_RUN) console.log(`(Dry run - no changes made)`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch(console.error);
