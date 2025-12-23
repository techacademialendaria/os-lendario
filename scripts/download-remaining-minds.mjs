/**
 * Download Remaining Mind Profile Images
 * Strategy: Direct URLs from LinkedIn, official sites, and Wikimedia
 */

import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import https from 'https';

const OUTPUT_DIR = '/Users/alan/Code/mmos/public/minds-profile-images';

const SOURCES = {
  // Alex Hormozi - entrepreneur, found on Wikimedia Commons
  'alex_hormozi': 'https://commons.wikimedia.org/wiki/Special:FilePath/Alex_Hormozi.jpg',

  // Russell Brunson - ClickFunnels founder
  'russel_brunson': 'https://commons.wikimedia.org/wiki/Special:FilePath/Russell_Brunson_2020.jpg',

  // Marty Cagan - SVPG founder  
  'marty_cagan': 'https://commons.wikimedia.org/wiki/Special:FilePath/Marty_Cagan.jpg',

  // Jeff Patton - Agile coach
  'jeff_patton': 'https://commons.wikimedia.org/wiki/Special:FilePath/Jeff_Patton.jpg',

  // Dan Kennedy - Marketing legend
  'dan_kennedy': 'https://commons.wikimedia.org/wiki/Special:FilePath/Dan_Kennedy.jpg',

  // Jon Benson - Copywriter
  'jon_benson': 'https://commons.wikimedia.org/wiki/Special:FilePath/Jon_Benson.jpg',

  // Dan Koe - Creator/Entrepreneur (no commons, will skip)
  'dan_koe': null,

  // Brazilian figures - try to find from local sources
  'pedro_valerio': null,
  'adriano-de-marqui': null,
  'joao_lozano': null,
  'rafa_medeiros': null,
  'thiago_finch': null,

  // Special cases
  'cagan_patton': null,
  'ricky_and_morty': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Rick_and_Morty_season_1.jpg'
};

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(outputPath);
      pipeline(response, file).then(resolve).catch(reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('\n=== Downloading Remaining Mind Images ===\n');

  for (const [slug, url] of Object.entries(SOURCES)) {
    if (!url) {
      console.log(`SKIP  ${slug} (no source)`);
      continue;
    }

    const outputPath = `${OUTPUT_DIR}/${slug}.jpg`;

    try {
      await downloadImage(url, outputPath);
      console.log(`OK    ${slug}`);
    } catch (error) {
      console.log(`ERROR ${slug}: ${error.message}`);
    }
  }
}

main().catch(console.error);
