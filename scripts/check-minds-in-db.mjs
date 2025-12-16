#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  const { data } = await supabase
    .from('minds')
    .select('slug, display_name')
    .order('slug');

  console.log(`\n📋 All minds in database (${data.length}):\n`);
  data.forEach(m => {
    console.log(`  ${m.slug} - ${m.display_name}`);
  });

  // Check missing ones
  const missing = [
    'academia_lendaria',
    'adriano_de_marqui',
    'andrew_huberman',
    'jose_amorim',
    'ryan_holiday'
  ];

  const notInDb = missing.filter(slug => !data.find(m => m.slug === slug));

  if (notInDb.length > 0) {
    console.log(`\n❌ Missing from database:\n`);
    notInDb.forEach(s => console.log(`  - ${s}`));
  }
}

main().catch(console.error);
