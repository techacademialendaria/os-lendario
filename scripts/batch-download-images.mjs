#!/usr/bin/env node

/**
 * Batch Download Mind Profile Images
 *
 * Tentativa 1: Wikimedia Commons API
 * Tentativa 2: URLs conhecidas públicas
 * Tentativa 3: Wikipedia alternativas
 */

import https from 'https';
import { createWriteStream, existsSync } from 'fs';
import { pipeline } from 'stream/promises';

const OUTPUT_DIR = '/Users/alan/Code/mmos/public/minds-profile-images';

// Sources: Try these URLs in order
const SOURCES = {
  // ** PUBLIC FIGURES - Try from various sources **
  alex_hormozi: [
    // Try from LinkedIn CDN, official sites, etc
    'https://lh3.googleusercontent.com/a-/AFdZucotBIv-XYZ', // placeholder
  ],

  russel_brunson: [
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Russell_Brunson.jpg',
  ],

  marty_cagan: [
    'https://www.svpg.com/wp-content/uploads/2022/02/Marty-2022-600x600.jpg',
  ],

  jeff_patton: [
    'https://www.jpattonassociates.com/wp-content/uploads/2015/01/Jeff-Patton-Headshot-1.jpg',
  ],

  dan_kennedy: [
    'https://nobsinnercircle.com/wp-content/uploads/2021/03/dan-kennedy-photo.jpg',
  ],

  jon_benson: [
    // VSL/copywriting sites
  ],

  dan_koe: [
    // Creator/influencer - try Twitter/social
  ],

  // ** BRAZILIAN FIGURES **
  pedro_valerio: [],
  adriano_de_marqui: [], // Note: slug has dash
  joao_lozano: [],
  rafa_medeiros: [],
  thiago_finch: [],

  // ** SPECIAL **
  cagan_patton: [], // Use Marty Cagan later
  ricky_and_morty: [
    'https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_and_Morty_title_card.png',
  ],
};

async function downloadImage(url, outputPath, slug) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept': 'image/*',
      },
      timeout: 5000,
    }, (response) => {
      // Handle redirects manually
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`REDIR ${slug}: ${url.split('/').slice(0, 3).join('/')}/...`);
        return downloadImage(redirectUrl, outputPath, slug)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(outputPath);

      file.on('error', (err) => {
        reject(err);
      });

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });

    request.on('error', reject);
  });
}

async function processOne(slug, urls) {
  if (existsSync(`${OUTPUT_DIR}/${slug}.jpg`)) {
    console.log(`SKIP  ${slug} (exists)`);
    return { status: 'skip' };
  }

  if (!urls || urls.length === 0) {
    console.log(`TODO  ${slug} (no sources)`);
    return { status: 'todo' };
  }

  for (const url of urls) {
    if (!url) continue;

    try {
      await downloadImage(url, `${OUTPUT_DIR}/${slug}.jpg`, slug);
      console.log(`✓ OK    ${slug}`);
      return { status: 'ok' };
    } catch (error) {
      // Try next URL
    }
  }

  console.log(`✗ FAIL  ${slug} (no working sources)`);
  return { status: 'fail' };
}

async function main() {
  console.log('\n=== Batch Download Mind Images ===\n');

  const results = { ok: [], skip: [], todo: [], fail: [] };

  for (const [slug, urls] of Object.entries(SOURCES)) {
    const result = await processOne(slug, urls);
    results[result.status].push(slug);
  }

  console.log('\n=== SUMMARY ===');
  console.log(`✓ Downloaded: ${results.ok.length}`);
  console.log(`⊘ Skipped:   ${results.skip.length}`);
  console.log(`○ To do:     ${results.todo.length}`);
  console.log(`✗ Failed:    ${results.fail.length}`);

  if (results.todo.length > 0) {
    console.log('\nNeeds manual sources:', results.todo.join(', '));
  }
}

main().catch(console.error);
