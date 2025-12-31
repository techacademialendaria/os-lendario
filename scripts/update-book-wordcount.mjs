#!/usr/bin/env node
/**
 * Calculates and updates word_count for all book summaries
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  console.log('Updating word_count for book summaries...\n');

  // Fetch all books with content
  const { data: books, error } = await supabase
    .from('contents')
    .select('id, slug, content, metadata')
    .eq('content_type', 'book_summary');

  if (error) {
    console.error('Error fetching books:', error.message);
    return;
  }

  console.log(`Found ${books.length} books\n`);

  let updated = 0;
  let skipped = 0;

  for (const book of books) {
    const wordCount = countWords(book.content);

    if (wordCount === 0) {
      console.log(`  Skip: ${book.slug.substring(0, 40)} (no content)`);
      skipped++;
      continue;
    }

    // Update metadata with word_count
    const newMetadata = {
      ...(book.metadata || {}),
      word_count: wordCount,
      reading_time_minutes: Math.ceil(wordCount / 200) // ~200 wpm average
    };

    const { error: updateError } = await supabase
      .from('contents')
      .update({ metadata: newMetadata })
      .eq('id', book.id);

    if (updateError) {
      console.log(`  Error: ${book.slug} - ${updateError.message}`);
    } else {
      console.log(`  ${book.slug.substring(0, 40).padEnd(42)} ${wordCount} words (~${Math.ceil(wordCount / 200)} min)`);
      updated++;
    }
  }

  console.log(`\n=== RESULT ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log('Done!');
}

main().catch(console.error);
