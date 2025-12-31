#!/usr/bin/env node
/**
 * Creates the collection_contents table via Supabase RPC or direct SQL
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  console.log('Checking if collection_contents table exists...\n');

  // Try to query the table
  const { error: checkError } = await supabase
    .from('collection_contents')
    .select('id')
    .limit(1);

  if (checkError && checkError.code === '42P01') {
    console.log('Table does not exist. Please run the migration manually:\n');
    console.log('npx supabase db push');
    console.log('\nOr execute this SQL in Supabase Dashboard > SQL Editor:\n');
    console.log(`
CREATE TABLE IF NOT EXISTS collection_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES content_projects(id) ON DELETE CASCADE,
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    sequence_order SMALLINT DEFAULT 0,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT collection_contents_unique UNIQUE (collection_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_collection_contents_collection ON collection_contents(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_contents_content ON collection_contents(content_id);
`);
    return false;
  } else if (checkError) {
    console.error('Error checking table:', checkError.message);
    return false;
  } else {
    console.log('Table collection_contents already exists!');
    return true;
  }
}

main().then(exists => {
  if (exists) {
    console.log('\nYou can now run: node scripts/create-collections.mjs');
  }
});
