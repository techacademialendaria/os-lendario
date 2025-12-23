/**
 * Merge and clean duplicate minds
 *
 * Actions:
 * 1. Merge adriano_marqui → adriano-de-marqui (then delete adriano_marqui)
 * 2. Sync jose_amorim outputs → jose-carlos-amorim in DB
 *
 * Run: node --env-file=.env app/scripts/merge-duplicates.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getMindBySlug(slug) {
  const { data, error } = await supabase
    .from('minds')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

async function getRelatedData(mindId) {
  const [profiles, values, obsessions, proficiencies] = await Promise.all([
    supabase.from('mind_profiles').select('*').eq('mind_id', mindId),
    supabase.from('mind_values').select('*').eq('mind_id', mindId),
    supabase.from('mind_obsessions').select('*').eq('mind_id', mindId),
    supabase.from('mind_proficiencies').select('*').eq('mind_id', mindId)
  ]);

  return {
    profiles: profiles.data || [],
    values: values.data || [],
    obsessions: obsessions.data || [],
    proficiencies: proficiencies.data || []
  };
}

async function mergeMinds(sourceSlug, targetSlug) {
  console.log(`\nMerging ${sourceSlug} → ${targetSlug}`);

  const source = await getMindBySlug(sourceSlug);
  const target = await getMindBySlug(targetSlug);

  if (!source) {
    console.log(`  Source ${sourceSlug} not found, skipping`);
    return;
  }
  if (!target) {
    console.log(`  Target ${targetSlug} not found, skipping`);
    return;
  }

  console.log(`  Source ID: ${source.id}`);
  console.log(`  Target ID: ${target.id}`);

  // Get related data
  const sourceData = await getRelatedData(source.id);
  const targetData = await getRelatedData(target.id);

  console.log(`\n  Source data:`);
  console.log(`    Profiles: ${sourceData.profiles.length}`);
  console.log(`    Values: ${sourceData.values.length}`);
  console.log(`    Obsessions: ${sourceData.obsessions.length}`);
  console.log(`    Proficiencies: ${sourceData.proficiencies.length}`);

  console.log(`\n  Target data:`);
  console.log(`    Profiles: ${targetData.profiles.length}`);
  console.log(`    Values: ${targetData.values.length}`);
  console.log(`    Obsessions: ${targetData.obsessions.length}`);
  console.log(`    Proficiencies: ${targetData.proficiencies.length}`);

  // Migrate profiles that don't exist in target
  const existingProfileTypes = new Set(targetData.profiles.map(p => `${p.profile_type}:${p.storage_format}`));
  const profilesToMigrate = sourceData.profiles.filter(p =>
    !existingProfileTypes.has(`${p.profile_type}:${p.storage_format}`)
  );

  if (profilesToMigrate.length > 0) {
    console.log(`\n  Migrating ${profilesToMigrate.length} profiles...`);
    for (const profile of profilesToMigrate) {
      const { id, mind_id, created_at, updated_at, ...profileData } = profile;
      const { error } = await supabase
        .from('mind_profiles')
        .insert({ ...profileData, mind_id: target.id });
      if (error) console.log(`    ERROR: ${error.message}`);
      else console.log(`    + ${profile.profile_type}`);
    }
  }

  // Migrate values if target has none
  if (sourceData.values.length > 0 && targetData.values.length === 0) {
    console.log(`\n  Migrating ${sourceData.values.length} values...`);
    for (const value of sourceData.values) {
      const { id, mind_id, created_at, ...valueData } = value;
      await supabase.from('mind_values').insert({ ...valueData, mind_id: target.id });
    }
  }

  // Migrate obsessions if target has none
  if (sourceData.obsessions.length > 0 && targetData.obsessions.length === 0) {
    console.log(`\n  Migrating ${sourceData.obsessions.length} obsessions...`);
    for (const obs of sourceData.obsessions) {
      const { id, mind_id, created_at, ...obsData } = obs;
      await supabase.from('mind_obsessions').insert({ ...obsData, mind_id: target.id });
    }
  }

  // Migrate proficiencies that don't exist
  const existingSkills = new Set(targetData.proficiencies.map(p => p.skill_id));
  const proficienciesToMigrate = sourceData.proficiencies.filter(p =>
    !existingSkills.has(p.skill_id)
  );

  if (proficienciesToMigrate.length > 0) {
    console.log(`\n  Migrating ${proficienciesToMigrate.length} proficiencies...`);
    for (const prof of proficienciesToMigrate) {
      const { id, mind_id, created_at, level, ...profData } = prof;
      await supabase.from('mind_proficiencies').insert({ ...profData, mind_id: target.id });
    }
  }

  // Update target mind fields if source has better data
  const updates = {};
  if (!target.short_bio && source.short_bio) updates.short_bio = source.short_bio;
  if (!target.apex_score && source.apex_score) updates.apex_score = source.apex_score;

  if (Object.keys(updates).length > 0) {
    console.log(`\n  Updating target with: ${Object.keys(updates).join(', ')}`);
    await supabase.from('minds').update(updates).eq('id', target.id);
  }

  // Delete source mind (cascades to related data)
  console.log(`\n  Deleting source mind ${sourceSlug}...`);
  const { error: deleteError } = await supabase
    .from('minds')
    .delete()
    .eq('id', source.id);

  if (deleteError) {
    console.log(`  ERROR deleting: ${deleteError.message}`);
  } else {
    console.log(`  ✓ Deleted ${sourceSlug}`);
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('MERGE DUPLICATE MINDS');
  console.log('='.repeat(70));

  // 1. Merge adriano_marqui → adriano-de-marqui
  await mergeMinds('adriano_marqui', 'adriano-de-marqui');

  // 2. Verify jose situation
  console.log('\n' + '-'.repeat(70));
  console.log('Checking jose situation...');

  const joseDb = await getMindBySlug('jose-carlos-amorim');
  console.log(`\n  jose-carlos-amorim exists in DB: ${!!joseDb}`);
  console.log(`  jose_amorim folder in outputs: outputs/minds/jose_amorim/`);
  console.log(`\n  Recommendation: jose_amorim in outputs should be imported`);
  console.log(`  to jose-carlos-amorim in DB (same person, different slug format)`);

  console.log('\n' + '='.repeat(70));
  console.log('DONE');
  console.log('='.repeat(70));
}

main().catch(console.error);
