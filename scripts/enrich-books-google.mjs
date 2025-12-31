/**
 * Script: enrich-books-google.mjs
 * Enriquece livros da biblioteca com dados da Google Books API
 *
 * Dados obtidos:
 * - image_url (capa em alta resolução)
 * - metadata.isbn, metadata.publisher, metadata.published_date
 * - metadata.page_count, metadata.categories, metadata.description
 * - metadata.google_books_id, metadata.preview_link
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 500; // Rate limit: 2 requests/second

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Google Books API search
async function searchGoogleBooks(title, author) {
  const query = author
    ? `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`
    : `intitle:${encodeURIComponent(title)}`;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&langRestrict=pt`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      // Try without language restriction
      const urlEn = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
      const responseEn = await fetch(urlEn);
      const dataEn = await responseEn.json();

      if (!dataEn.items || dataEn.items.length === 0) {
        return null;
      }
      return dataEn.items[0];
    }

    return data.items[0];
  } catch (error) {
    console.error(`   ⚠️  Erro na API: ${error.message}`);
    return null;
  }
}

// Extract best image URL (prefer larger images)
function getBestImageUrl(imageLinks) {
  if (!imageLinks) return null;

  // Priority order: extraLarge > large > medium > small > thumbnail
  return imageLinks.extraLarge
    || imageLinks.large
    || imageLinks.medium
    || imageLinks.small
    || imageLinks.thumbnail?.replace('zoom=1', 'zoom=2'); // Upgrade thumbnail
}

// Extract enriched metadata
function extractMetadata(volumeInfo, existingMetadata) {
  return {
    ...existingMetadata,
    // Google Books data
    google_books_id: volumeInfo.id,
    isbn_10: volumeInfo.industryIdentifiers?.find(i => i.type === 'ISBN_10')?.identifier,
    isbn_13: volumeInfo.industryIdentifiers?.find(i => i.type === 'ISBN_13')?.identifier,
    publisher: volumeInfo.publisher,
    published_date: volumeInfo.publishedDate,
    page_count: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    description: volumeInfo.description?.substring(0, 1000), // Truncate
    language: volumeInfo.language,
    preview_link: volumeInfo.previewLink,
    info_link: volumeInfo.infoLink,
    average_rating: volumeInfo.averageRating,
    ratings_count: volumeInfo.ratingsCount,
    // Enrichment timestamp
    enriched_at: new Date().toISOString(),
    enriched_source: 'google_books'
  };
}

async function main() {
  console.log('📚 Enriquecimento de Livros via Google Books API');
  console.log('='.repeat(50));
  if (DRY_RUN) console.log('🔍 MODO DRY-RUN\n');

  // 1. Buscar livros sem imagem ou sem enriquecimento
  console.log('1️⃣ Buscando livros para enriquecer...\n');

  const { data: books, error } = await supabase
    .from('contents')
    .select('id, slug, title, metadata, image_url')
    .eq('content_type', 'book_summary')
    .is('deleted_at', null)
    .order('title');

  if (error) throw new Error(`Erro ao buscar livros: ${error.message}`);

  // Filter: no image OR not enriched yet
  const booksToEnrich = books.filter(b =>
    !b.image_url || !b.metadata?.enriched_source
  );

  console.log(`   Total de livros: ${books.length}`);
  console.log(`   Já enriquecidos: ${books.length - booksToEnrich.length}`);
  console.log(`   Para enriquecer: ${booksToEnrich.length}\n`);

  if (booksToEnrich.length === 0) {
    console.log('✅ Todos os livros já estão enriquecidos!');
    return;
  }

  // 2. Process each book
  console.log('2️⃣ Processando livros...\n');

  const stats = {
    enriched: 0,
    notFound: 0,
    errors: 0,
    skipped: 0
  };

  for (const book of booksToEnrich) {
    const author = book.metadata?.author;

    process.stdout.write(`   📖 ${book.title.substring(0, 40).padEnd(42)}... `);

    // Search Google Books
    const result = await searchGoogleBooks(book.title, author);

    if (!result) {
      console.log('❌ Não encontrado');
      stats.notFound++;
      await sleep(DELAY_MS);
      continue;
    }

    const volumeInfo = result.volumeInfo;
    const imageUrl = getBestImageUrl(volumeInfo.imageLinks);
    const enrichedMetadata = extractMetadata(volumeInfo, book.metadata);

    if (!DRY_RUN) {
      const { error: updateError } = await supabase
        .from('contents')
        .update({
          image_url: imageUrl || book.image_url,
          metadata: enrichedMetadata
        })
        .eq('id', book.id);

      if (updateError) {
        console.log(`⚠️  Erro: ${updateError.message}`);
        stats.errors++;
      } else {
        console.log(`✅ ${imageUrl ? '🖼️' : '📝'}`);
        stats.enriched++;
      }
    } else {
      console.log(`[DRY-RUN] ${imageUrl ? '🖼️' : '📝'}`);
      stats.enriched++;
    }

    await sleep(DELAY_MS);
  }

  // 3. Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO');
  console.log('='.repeat(50));
  console.log(`   ✅ Enriquecidos:    ${stats.enriched}`);
  console.log(`   ❌ Não encontrados: ${stats.notFound}`);
  console.log(`   ⚠️  Erros:          ${stats.errors}`);

  if (DRY_RUN) {
    console.log('\n🔍 Execute sem --dry-run para aplicar');
  }
}

main().catch(console.error);
