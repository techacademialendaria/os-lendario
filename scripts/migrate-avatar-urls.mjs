/**
 * Migrate avatar_url column for minds table
 *
 * This script:
 * 1. Checks if the avatar_url column exists in the minds table
 * 2. If missing, provides instructions for adding it via Supabase migration
 * 3. Updates all minds with avatar URLs from profile images
 * 4. Validates migration completion
 *
 * Consolidated from:
 * - add-avatar-column.mjs (add column logic)
 * - apply-avatar-migration.mjs (update avatars logic)
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SLUGS_WITH_PHOTOS = [
  'aaron_beck',
  'adam_smith',
  'alan_nicolas',
  'alan_watts',
  'alan-nicolas',
  'albert_einstein',
  'andrew_huberman',
  'andy_grove',
  'arthur_schopenhauer',
  'asker_jeukendrup',
  'austin_kleon',
  'ben_horowitz',
  'benjamin_franklin',
  'bj_fogg',
  'bob_proctor',
  'cal_newport',
  'carl_jung',
  'carl_sagan',
  'charles_darwin',
  'charlie_munger',
  'chris_voss',
  'claude_hopkins',
  'claude_shannon',
  'cristiano_ronaldo',
  'dale_carnegie',
  'dan_lok',
  'daniel_kahneman',
  'daniel_pink',
  'david_allen',
  'david_lynch',
  'derek_sivers',
  'donald_knuth',
  'donald_trump',
  'donella_meadows',
  'eckhart_tolle',
  'epictetus',
  'esther_perel',
  'frank_mccourt',
  'gary_halbert',
  'gary_vaynerchuk',
  'geoffrey_hinton',
  'ira_glass',
  'jake_knapp',
  'james_clear',
  'jan_oberhauser_team',
  'jean_paul_sartre',
  'jeff_bezos',
  'jeffrey_gitomer',
  'jesse_enkamp',
  'jocko_willink',
  'john_boyd',
  'john_julie_gottman',
  'john_von_neumann',
  'jordan_belfort',
  'jose_amorim',
  'jose_silva',
  'jose-carlos-amorim',
  'julia_cameron',
  'kapil_gupta',
  'krishnamurti',
  'leo_babauta',
  'leo_gura',
  'leonardo_da_vinci',
  'lucy_guo',
  'malcolm_gladwell',
  'marc_andreessen',
  'marcus_aurelius',
  'mark_manson',
  'matt_gray',
  'mestre_brewteco',
  'michael_feathers',
  'michael_porter',
  'montaigne',
  'morgan_housel',
  'napoleon_hill',
  'nassim_taleb',
  'naval_ravikant',
  'neil_rackham',
  'nikola_tesla',
  'nir_eyal',
  'osho',
  'patrick_collison',
  'paul_graham',
  'peter_attia',
  'peter_diamandis',
  'peter_drucker',
  'peter_senge',
  'phil_jackson',
  'philip_kotler',
  'ram_dass',
  'ramit_sethi',
  'ray_dalio',
  'rhonda_patrick',
  'richard_bandler',
  'richard_feynman',
  'rick_rubin',
  'robert_cialdini',
  'robert_dilts',
  'robert_greene',
  'russell_ackoff',
  'russell_barkley',
  'ryan_holiday',
  'sadhguru',
  'sam_altman',
  'sam_harris',
  'scott_galloway',
  'sean_ellis',
  'seneca',
  'shane_parrish',
  'simon_sinek',
  'stephen_covey',
  'stephen_king',
  'steve_jobs',
  'tim_ferriss',
  'tim_grover',
  'tim_urban',
  'tony_robbins',
  'viktor_frankl',
  'w_edwards_deming',
  'winston_churchill',
  'wolfgang_mozart',
  'yuval_harari',
  'zig_ziglar'
];

async function main() {
  console.log('='.repeat(60));
  console.log('MIGRATION: Avatar URLs for minds table');
  console.log('='.repeat(60));
  console.log();

  // Check if column exists
  const { data: testData, error: testError } = await supabase
    .from('minds')
    .select('avatar_url')
    .limit(1);

  if (testError && testError.message.includes('avatar_url')) {
    console.log('❌ Column avatar_url does not exist yet.');
    console.log();
    console.log('Please run the SQL migration first:');
    console.log('  supabase db push');
    console.log();
    console.log('Or run manually in Supabase Dashboard:');
    console.log('  ALTER TABLE minds ADD COLUMN IF NOT EXISTS avatar_url TEXT;');
    console.log();
    console.log('Then run this script again.');
    return;
  }

  console.log('✅ Column avatar_url exists. Updating minds...');
  console.log();

  let updated = 0;
  let notFound = 0;
  const notFoundSlugs = [];

  for (const slug of SLUGS_WITH_PHOTOS) {
    const avatarUrl = `/minds-profile-images/${slug}.jpg`;

    const { data, error } = await supabase
      .from('minds')
      .update({ avatar_url: avatarUrl })
      .eq('slug', slug)
      .select('slug');

    if (error) {
      console.log(`❌ ERROR updating ${slug}:`, error.message);
    } else if (data && data.length > 0) {
      updated++;
      process.stdout.write('.');
    } else {
      notFound++;
      notFoundSlugs.push(slug);
    }
  }

  console.log();
  console.log();
  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️  Not found in DB: ${notFound}`);

  if (notFoundSlugs.length > 0 && notFoundSlugs.length <= 20) {
    console.log('\nSlugs not found:');
    notFoundSlugs.forEach(s => console.log(`  - ${s}`));
  }

  // Validation
  console.log();
  console.log('=== Validation ===');
  const { count: withAvatar } = await supabase
    .from('minds')
    .select('id', { count: 'exact' })
    .not('avatar_url', 'is', null);

  const { count: total } = await supabase
    .from('minds')
    .select('id', { count: 'exact' });

  console.log(`Minds with avatar_url: ${withAvatar}/${total}`);
  const percentage = total > 0 ? ((withAvatar / total) * 100).toFixed(1) : 0;
  console.log(`Coverage: ${percentage}%`);
}

main().catch(console.error);
