#!/usr/bin/env node

/**
 * Register a new Mind to Supabase database
 *
 * Usage: node app/scripts/register-mind.mjs <slug> <display_name> [description]
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function registerMind(slug, displayName, description = null) {
  try {
    console.log(`\n📝 Registering mind: ${slug}`);
    console.log(`Display Name: ${displayName}`);

    // Check if already exists
    const { data: existing } = await supabase
      .from('minds')
      .select('id, slug')
      .eq('slug', slug)
      .single();

    if (existing) {
      console.log(`\n❌ Mind already exists with slug: ${slug}`);
      console.log(`ID: ${existing.id}`);
      return false;
    }

    // Insert new mind
    const { data, error } = await supabase
      .from('minds')
      .insert({
        slug,
        display_name: displayName
      })
      .select()
      .single();

    if (error) {
      console.error(`\n❌ Error registering mind:`, error);
      return false;
    }

    console.log(`\n✅ Mind registered successfully!`);
    console.log(`ID: ${data.id}`);
    console.log(`Slug: ${data.slug}`);
    console.log(`Display Name: ${data.display_name}`);

    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}

async function main() {
  const slug = process.argv[2];
  const displayName = process.argv[3];
  const description = process.argv[4];

  if (!slug || !displayName) {
    console.error('Usage: node app/scripts/register-mind.mjs <slug> <display_name> [description]');
    console.error('Example: node app/scripts/register-mind.mjs academia_lendaria "Academia Lendária"');
    process.exit(1);
  }

  const success = await registerMind(slug, displayName, description);
  process.exit(success ? 0 : 1);
}

main();
