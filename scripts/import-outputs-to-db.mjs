/**
 * Import outputs/minds data to Supabase database
 *
 * This script:
 * 1. Adds minds from outputs/ that don't exist in DB
 * 2. Updates mind_profiles with rich data from analysis/synthesis
 * 3. Extracts values and obsessions from YAML files
 *
 * Run: node --env-file=.env app/scripts/import-outputs-to-db.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';

// Use service role key for write operations
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const OUTPUTS_DIR = './outputs/minds';

// Minds to skip (duplicates or special cases)
const SKIP_SLUGS = new Set([
  // jose_amorim now maps to jose-carlos-amorim
]);

// Slug mapping (outputs folder name -> preferred DB slug)
const SLUG_MAP = {
  'adriano_de_marqui': 'adriano-de-marqui',
  'jose_amorim': 'jose-carlos-amorim'
};

async function getOutputMinds() {
  const entries = await readdir(OUTPUTS_DIR, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name)
    .filter(slug => !SKIP_SLUGS.has(slug));
}

async function getDbMinds() {
  const { data, error } = await supabase
    .from('minds')
    .select('id, slug, display_name, short_bio, apex_score');

  if (error) throw error;
  return new Map(data.map(m => [m.slug, m]));
}

async function readYamlFile(path) {
  try {
    const content = await readFile(path, 'utf-8');
    // Handle files that have markdown headers before YAML
    const yamlStart = content.indexOf('---');
    if (yamlStart > 0) {
      const yamlEnd = content.indexOf('---', yamlStart + 3);
      if (yamlEnd > yamlStart) {
        return parseYaml(content.slice(yamlStart + 3, yamlEnd));
      }
    }
    // Try parsing as pure YAML
    return parseYaml(content);
  } catch (e) {
    return null;
  }
}

async function readTextFile(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch (e) {
    return null;
  }
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function extractMindData(slug) {
  const dir = join(OUTPUTS_DIR, slug);
  const data = {
    slug: SLUG_MAP[slug] || slug,
    display_name: null,
    short_bio: null,
    apex_score: null,
    profiles: [],
    values: [],
    obsessions: [],
    sources: []
  };

  // Read metadata.yaml
  const metadataPath = join(dir, 'metadata.yaml');
  const metadata = await readYamlFile(metadataPath);

  if (metadata) {
    // Extract basic info
    if (metadata.candidate?.name) {
      data.display_name = metadata.candidate.name;
    }
    if (metadata.apex?.score_final) {
      data.apex_score = metadata.apex.score_final / 10; // Convert to 0-1 scale
    }
    if (metadata.primary_use_case) {
      data.short_bio = metadata.primary_use_case;
    }

    // Extract sources (handle different metadata formats)
    if (Array.isArray(metadata.sources_collected)) {
      data.sources = metadata.sources_collected.map(s => ({
        title: s.title,
        type: s.type || 'article',
        url: s.url,
        quality: 'primary'
      }));
    }

    // Handle combo clones with primary_candidates
    if (metadata.primary_candidates) {
      data.display_name = metadata.primary_candidates
        .map(c => c.name.split(' ').pop())
        .join(' + ');
      data.short_bio = metadata.strategic_synergy || metadata.use_case_primary;
    }

    // Handle apex_score in different locations
    if (!data.apex_score && metadata.apex_score) {
      data.apex_score = metadata.apex_score / 10;
    }
  }

  // Read analysis files for profiles
  const analysisFiles = [
    { path: 'analysis/identity-core.yaml', type: 'identity_core' },
    { path: 'analysis/cognitive-spec.yaml', type: 'cognitive_spec' },
    { path: 'analysis/values-analysis.yaml', type: 'values_analysis' },
    { path: 'analysis/obsessions-map.yaml', type: 'obsessions_map' }
  ];

  for (const f of analysisFiles) {
    const filePath = join(dir, f.path);
    if (await fileExists(filePath)) {
      const content = await readTextFile(filePath);
      if (content) {
        data.profiles.push({
          profile_type: f.type,
          storage_format: 'yaml',
          content_text: content
        });
      }
    }
  }

  // Read synthesis files
  const synthesisFiles = [
    { path: 'synthesis/communication-style.md', type: 'communication_style' },
    { path: 'synthesis/frameworks.md', type: 'frameworks' },
    { path: 'synthesis/singularity.md', type: 'singularity' },
    { path: 'synthesis/paradoxes.md', type: 'paradoxes' },
    { path: 'synthesis/mental-models.md', type: 'mental_models' }
  ];

  for (const f of synthesisFiles) {
    const filePath = join(dir, f.path);
    if (await fileExists(filePath)) {
      const content = await readTextFile(filePath);
      if (content) {
        data.profiles.push({
          profile_type: f.type,
          storage_format: 'md',
          content_text: content
        });
      }
    }
  }

  // Read system prompts
  const promptsDir = join(dir, 'system_prompts');
  if (await fileExists(promptsDir)) {
    try {
      const promptFiles = await readdir(promptsDir);
      for (const file of promptFiles) {
        if (file.endsWith('.md')) {
          const content = await readTextFile(join(promptsDir, file));
          if (content) {
            const promptType = file.replace('.md', '').replace('system-prompt-', 'system_prompt_');
            data.profiles.push({
              profile_type: promptType,
              storage_format: 'md',
              content_text: content
            });
          }
        }
      }
    } catch (e) {
      // Directory might not exist
    }
  }

  // Parse values from values-analysis.yaml
  const valuesPath = join(dir, 'analysis/values-analysis.yaml');
  const valuesContent = await readTextFile(valuesPath);
  if (valuesContent) {
    // Extract values using regex (YAML is embedded in markdown)
    const valueMatches = valuesContent.matchAll(/####\s+\d+\.\s+([^\n]+)\npriority:\s+"(\w+)"/g);
    for (const match of valueMatches) {
      const [, name, priority] = match;
      const importance = priority === 'highest' ? 10 : priority === 'high' ? 8 : 6;
      data.values.push({ name: name.trim(), importance_10: importance });
    }
  }

  // Parse obsessions from obsessions-map.yaml
  const obsessionsPath = join(dir, 'analysis/obsessions-map.yaml');
  const obsessionsContent = await readTextFile(obsessionsPath);
  if (obsessionsContent) {
    // Extract obsessions using regex
    const obsMatches = obsessionsContent.matchAll(/###\s+\d+\.\s+([^\n]+)\nintensity:\s+"?(\d+)/g);
    for (const match of obsMatches) {
      const [, name, intensity] = match;
      data.obsessions.push({ name: name.trim(), intensity_10: parseInt(intensity) });
    }
  }

  return data;
}

async function createMind(data) {
  const mindData = {
    slug: data.slug,
    display_name: data.display_name || data.slug.replace(/_/g, ' ').replace(/-/g, ' '),
    short_bio: data.short_bio,
    apex_score: data.apex_score,
    privacy_level: 'public',
    primary_language: 'pt'
  };

  const { data: mind, error } = await supabase
    .from('minds')
    .insert(mindData)
    .select()
    .single();

  if (error) throw error;
  return mind;
}

async function upsertProfiles(mindId, profiles) {
  let count = 0;
  for (const profile of profiles) {
    const { error } = await supabase
      .from('mind_profiles')
      .upsert({
        mind_id: mindId,
        profile_type: profile.profile_type,
        storage_format: profile.storage_format,
        content_text: profile.content_text
      }, {
        onConflict: 'mind_id,profile_type,storage_format'
      });

    if (!error) count++;
  }
  return count;
}

async function upsertValues(mindId, values) {
  if (!values.length) return 0;

  // Delete existing values first
  await supabase
    .from('mind_values')
    .delete()
    .eq('mind_id', mindId);

  const { error } = await supabase
    .from('mind_values')
    .insert(values.map(v => ({
      mind_id: mindId,
      name: v.name,
      importance_10: v.importance_10
    })));

  return error ? 0 : values.length;
}

async function upsertObsessions(mindId, obsessions) {
  if (!obsessions.length) return 0;

  // Delete existing obsessions first
  await supabase
    .from('mind_obsessions')
    .delete()
    .eq('mind_id', mindId);

  const { error } = await supabase
    .from('mind_obsessions')
    .insert(obsessions.map(o => ({
      mind_id: mindId,
      name: o.name,
      intensity_10: o.intensity_10
    })));

  return error ? 0 : obsessions.length;
}

async function main() {
  console.log('='.repeat(70));
  console.log('IMPORT: outputs/minds → Supabase');
  console.log('='.repeat(70));
  console.log();

  // Get current state
  const outputMinds = await getOutputMinds();
  const dbMinds = await getDbMinds();

  console.log(`Found ${outputMinds.length} minds in outputs/`);
  console.log(`Found ${dbMinds.size} minds in DB`);
  console.log();

  const stats = {
    created: 0,
    updated: 0,
    profiles: 0,
    values: 0,
    obsessions: 0,
    errors: []
  };

  for (const slug of outputMinds) {
    const dbSlug = SLUG_MAP[slug] || slug;
    console.log(`Processing: ${slug}${dbSlug !== slug ? ` (→${dbSlug})` : ''}`);

    try {
      const data = await extractMindData(slug);
      let mind = dbMinds.get(dbSlug);

      // Create mind if not exists
      if (!mind) {
        mind = await createMind(data);
        stats.created++;
        console.log(`  + Created mind: ${mind.id}`);
      } else {
        // Update existing mind if we have new data
        if (data.display_name || data.short_bio || data.apex_score) {
          const updates = {};
          if (data.display_name && !mind.display_name) updates.display_name = data.display_name;
          if (data.short_bio && !mind.short_bio) updates.short_bio = data.short_bio;
          if (data.apex_score && !mind.apex_score) updates.apex_score = data.apex_score;

          if (Object.keys(updates).length) {
            await supabase
              .from('minds')
              .update(updates)
              .eq('id', mind.id);
            stats.updated++;
            console.log(`  ~ Updated: ${Object.keys(updates).join(', ')}`);
          }
        }
      }

      // Upsert profiles
      if (data.profiles.length) {
        const profileCount = await upsertProfiles(mind.id, data.profiles);
        stats.profiles += profileCount;
        console.log(`  + Profiles: ${profileCount}`);
      }

      // Upsert values
      if (data.values.length) {
        const valueCount = await upsertValues(mind.id, data.values);
        stats.values += valueCount;
        console.log(`  + Values: ${valueCount}`);
      }

      // Upsert obsessions
      if (data.obsessions.length) {
        const obsCount = await upsertObsessions(mind.id, data.obsessions);
        stats.obsessions += obsCount;
        console.log(`  + Obsessions: ${obsCount}`);
      }

    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
      stats.errors.push({ slug, error: e.message });
    }

    console.log();
  }

  // Summary
  console.log('='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`  Minds created:    ${stats.created}`);
  console.log(`  Minds updated:    ${stats.updated}`);
  console.log(`  Profiles added:   ${stats.profiles}`);
  console.log(`  Values added:     ${stats.values}`);
  console.log(`  Obsessions added: ${stats.obsessions}`);
  console.log(`  Errors:           ${stats.errors.length}`);

  if (stats.errors.length) {
    console.log('\nErrors:');
    for (const e of stats.errors) {
      console.log(`  - ${e.slug}: ${e.error}`);
    }
  }
}

main().catch(console.error);
