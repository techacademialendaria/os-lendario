#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  // Get all book summaries with their tags
  const { data: books, error } = await supabase
    .from('contents')
    .select(`
      id,
      slug,
      title,
      metadata
    `)
    .eq('content_type', 'book_summary')
    .order('title');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  // Print slug and title for each book
  console.log('\n📚 SLUGS DOS LIVROS:\n');
  books.forEach(book => {
    console.log(`${book.slug} | ${book.title}`);
  });

  console.log(`\n\nTotal: ${books.length} livros`);
}

main();
