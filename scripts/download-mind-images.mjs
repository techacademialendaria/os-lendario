/**
 * Download Mind Profile Images
 *
 * This script downloads profile images for minds from various sources:
 * - Wikipedia API (primary)
 * - Direct URLs (fallback)
 *
 * Usage: node app/scripts/download-mind-images.mjs
 */

import { createWriteStream, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import https from 'https';
import http from 'http';

const OUTPUT_DIR = '/Users/alan/Code/mmos/public/minds-profile-images';

// Mind slug -> Wikipedia article title or direct image URL
const MIND_IMAGE_SOURCES = {
  // === REMAINING TO DOWNLOAD ===

  // Alex Hormozi - entrepreneur, author
  'alex_hormozi': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Alex_Hormozi_2023.jpg/440px-Alex_Hormozi_2023.jpg'
  },

  // Brad Frost - web designer, atomic design creator
  'brad_frost': {
    url: 'https://bradfrost.com/wp-content/uploads/2019/06/brad-frost-web-350.jpg'
  },

  // Dan Kennedy - marketing legend
  'dan_kennedy': {
    url: 'https://nobsinnercircle.com/wp-content/uploads/2021/03/dan-kennedy-photo.jpg'
  },

  // Dan Koe - modern creator/entrepreneur
  'dan_koe': { search: 'Dan Koe' },

  // Russell Brunson - ClickFunnels founder
  'russel_brunson': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Russell_Brunson.jpg/440px-Russell_Brunson.jpg'
  },

  // Abilio Diniz - Brazilian businessman (try pt.wikipedia)
  'abilio_diniz': { wikiPt: 'Abílio_Diniz' },

  // Marty Cagan - SVPG, product management
  'marty_cagan': {
    url: 'https://www.svpg.com/wp-content/uploads/2022/02/Marty-2022-600x600-1.jpg'
  },

  // Jeff Patton - agile, story mapping
  'jeff_patton': {
    url: 'https://www.jpattonassociates.com/wp-content/uploads/2015/01/Jeff-Patton-Headshot-1.jpg'
  },

  // Jon Benson - copywriter
  'jon_benson': { search: 'Jon Benson copywriter VSL' },

  // === BRAZILIAN FIGURES ===
  'adriano-de-marqui': { search: 'Adriano de Marqui Academia Lendária' },
  'pedro_valerio': { search: 'Pedro Valério copywriter' },
  'thiago_finch': { search: 'Thiago Finch' },
  'rafa_medeiros': { search: 'Rafa Medeiros' },
  'joao_lozano': { search: 'João Lozano' },

  // === COMBINED/SPECIAL ===
  'cagan_patton': { skip: true, note: 'Combined persona - use Marty Cagan image' },

  // Rick and Morty - cartoon
  'ricky_and_morty': {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_and_Morty_title_card.png'
  },
};

/**
 * Fetch Wikipedia page image using the API
 * @param {string} articleTitle - Wikipedia article title
 * @param {string} lang - Language code ('en' or 'pt')
 */
async function getWikipediaImage(articleTitle, lang = 'en') {
  const apiUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleTitle)}`;

  return new Promise((resolve, reject) => {
    https.get(apiUrl, { headers: { 'User-Agent': 'MindImageDownloader/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.originalimage?.source) {
            resolve(json.originalimage.source);
          } else if (json.thumbnail?.source) {
            resolve(json.thumbnail.source);
          } else {
            reject(new Error('No image found'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download image from URL to file
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, { headers: { 'User-Agent': 'MindImageDownloader/1.0' } }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(outputPath);
      pipeline(response, file).then(resolve).catch(reject);
    }).on('error', reject);
  });
}

/**
 * Process a single mind
 */
async function processMind(slug, config) {
  const outputPath = `${OUTPUT_DIR}/${slug}.jpg`;

  // Skip if already exists
  if (existsSync(outputPath)) {
    console.log(`SKIP  ${slug} (already exists)`);
    return { slug, status: 'skip', reason: 'exists' };
  }

  // Skip if marked to skip
  if (config.skip) {
    console.log(`SKIP  ${slug} (${config.note || 'marked to skip'})`);
    return { slug, status: 'skip', reason: config.note };
  }

  try {
    let imageUrl = null;

    // Try direct URL first (most reliable)
    if (config.url) {
      imageUrl = config.url;
      console.log(`URL   ${slug}`);
    }

    // Try English Wikipedia
    if (!imageUrl && config.wiki) {
      try {
        imageUrl = await getWikipediaImage(config.wiki, 'en');
        console.log(`WIKI  ${slug} -> ${config.wiki}`);
      } catch (e) {
        console.log(`WARN  ${slug} Wikipedia EN failed: ${e.message}`);
      }
    }

    // Try Portuguese Wikipedia
    if (!imageUrl && config.wikiPt) {
      try {
        imageUrl = await getWikipediaImage(config.wikiPt, 'pt');
        console.log(`WIKI  ${slug} -> pt:${config.wikiPt}`);
      } catch (e) {
        console.log(`WARN  ${slug} Wikipedia PT failed: ${e.message}`);
      }
    }

    // If no image found, mark as needing manual intervention
    if (!imageUrl) {
      console.log(`TODO  ${slug} - needs manual search: ${config.search || config.wiki || config.wikiPt || 'no source'}`);
      return { slug, status: 'todo', search: config.search || config.wiki || config.wikiPt };
    }

    // Download the image
    await downloadImage(imageUrl, outputPath);
    console.log(`OK    ${slug}`);
    return { slug, status: 'ok' };

  } catch (error) {
    console.log(`ERROR ${slug}: ${error.message}`);
    return { slug, status: 'error', error: error.message };
  }
}

// Main execution
async function main() {
  console.log('\n=== Downloading Mind Profile Images ===\n');

  const results = { ok: [], skip: [], todo: [], error: [] };

  for (const [slug, config] of Object.entries(MIND_IMAGE_SOURCES)) {
    const result = await processMind(slug, config);
    results[result.status].push(result);
  }

  console.log('\n=== Summary ===');
  console.log(`Downloaded: ${results.ok.length}`);
  console.log(`Skipped:    ${results.skip.length}`);
  console.log(`Need manual: ${results.todo.length}`);
  console.log(`Errors:     ${results.error.length}`);

  if (results.todo.length > 0) {
    console.log('\n=== NEEDS MANUAL SEARCH ===');
    results.todo.forEach(r => console.log(`  ${r.slug}: search "${r.search}"`));
  }
}

main().catch(console.error);
