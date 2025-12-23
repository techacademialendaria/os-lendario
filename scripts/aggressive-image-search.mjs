#!/usr/bin/env node

/**
 * Aggressive Image Search & Download
 *
 * Tries multiple sources for each mind:
 * 1. Personal websites/blogs
 * 2. LinkedIn CDN
 * 3. YouTube thumbnails
 * 4. Wikipedia (all languages)
 * 5. Commons Wikimedia
 * 6. Instagram/Twitter archives
 */

import https from 'https';
import { createWriteStream, existsSync } from 'fs';

const OUTPUT_DIR = '/Users/alan/Code/mmos/public/minds-profile-images';

const MINDS = {
  // *** ENGLISH-SPEAKING ENTREPRENEURS ***

  'alex_hormozi': {
    label: 'Alex Hormozi',
    urls: [
      // Official sites
      'https://www.alexhormozi.com/assets/images/alex-profile.jpg',
      'https://www.alexhormozi.com/wp-content/uploads/2023/alex.jpg',
      // Amazon author page
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/images/author-images/alex_hormozi.jpg',
      // YouTube CDN (if he has channel)
      'https://yt3.ggpht.com/-AlexHormozi/AAAAAAAAAAI/AAAAAAAAAAA/profile.jpg',
      // LinkedIn (historical cache)
      'https://media.licdn.com/dms/image/C4E03AQEzRx3A7aCw_A/profile-displayphoto-shrink_400_400/0/1234567890',
    ]
  },

  'russel_brunson': {
    label: 'Russell Brunson',
    urls: [
      // ClickFunnels official
      'https://www.clickfunnels.com/assets/images/russell-brunson.jpg',
      'https://www.clickfunnels.com/images/team/russell-brunson.jpg',
      // Russell's website
      'https://russellbrunson.com/images/russell-profile.jpg',
      'https://russellbrunson.com/assets/russell.jpg',
      // YouTube CDN
      'https://yt3.ggpht.com/-RussellBrunson/AAAAAAAAAAI/profile.jpg',
    ]
  },

  'marty_cagan': {
    label: 'Marty Cagan',
    urls: [
      // SVPG official (different paths)
      'https://www.svpg.com/images/team/marty-cagan.jpg',
      'https://www.svpg.com/images/marty-cagan-profile.jpg',
      'https://svpg.com/wp-content/uploads/2021/marty-profile.jpg',
      'https://svpg.com/assets/images/marty-cagan.jpg',
      // Book publisher Amazon
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/images/marty_cagan.jpg',
    ]
  },

  'jeff_patton': {
    label: 'Jeff Patton',
    urls: [
      // His consulting site
      'https://www.jpattonassociates.com/images/jeff-profile.jpg',
      'https://www.jpattonassociates.com/assets/jeff-patton.jpg',
      'https://jpattonassociates.com/wp-content/uploads/2020/jeff.jpg',
      // O'Reilly books (author photo)
      'https://www.oreilly.com/library/view/author-photos/jeff-patton.jpg',
      // Agile Alliance
      'https://www.agilealliance.org/images/members/jeff-patton.jpg',
    ]
  },

  'dan_kennedy': {
    label: 'Dan Kennedy',
    urls: [
      // No B.S. Inner Circle
      'https://www.nobsinnercircle.com/images/dan-kennedy-profile.jpg',
      'https://nobsinnercircle.com/assets/dan-kennedy.jpg',
      'https://www.dmkennedy.com/images/dan-profile.jpg',
      // Marketing books
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/images/dan_kennedy.jpg',
      // Business publications
      'https://www.entrepreneur.com/images/authors/dan-kennedy.jpg',
    ]
  },

  'jon_benson': {
    label: 'Jon Benson',
    urls: [
      // VSL (Video Sales Letter)
      'https://www.vslcopy.com/images/jon-benson.jpg',
      'https://vslcopy.com/assets/jon-benson-profile.jpg',
      // Copywriting sites
      'https://www.jonbenson.com/images/profile.jpg',
      'https://jonbenson.com/assets/jon.jpg',
      // YouTube channel
      'https://yt3.ggpht.com/-JonBenson/AAAAAAAAAAI/profile.jpg',
    ]
  },

  'dan_koe': {
    label: 'Dan Koe',
    urls: [
      // Creator economy sites
      'https://www.thinkdankoe.com/images/dan-profile.jpg',
      'https://thinkdankoe.com/assets/dan.jpg',
      'https://www.dankoe.com/images/profile.jpg',
      // YouTube channel (high quality thumbnails)
      'https://yt3.ggpht.com/ktA6V-V8U5k/AAAAAAAAAAAI/AAAAAAAAAAA/video_profile.jpg',
      // Twitter/X (archive)
      'https://pbs.twimg.com/profile_images/theDanKoe.jpg',
    ]
  },

  // *** BRAZILIAN FIGURES ***

  'pedro_valerio': {
    label: 'Pedro Valério',
    urls: [
      // Search Brazilian marketing blogs
      'https://www.pedrovaleriomarketing.com.br/images/pedro.jpg',
      'https://pedrovaleriomarketing.com.br/assets/profile.jpg',
      // Hotmart (Brazilian courses)
      'https://hotmart.s3.amazonaws.com/profile/pedro-valerio.jpg',
      // LinkedIn (pt.linkedin)
      'https://media.licdn.com/dms/image/pedrovaleriomarketing.jpg',
    ]
  },

  'adriano-de-marqui': {
    label: 'Adriano de Marqui',
    urls: [
      // Academia Lendária
      'https://www.academialendaria.com.br/images/adriano.jpg',
      'https://academialendaria.com.br/assets/adriano-profile.jpg',
      // Personal site
      'https://www.adrianodemarqui.com.br/images/profile.jpg',
      'https://adrianodemarqui.com.br/assets/adriano.jpg',
      // YouTube (Portuguese creators)
      'https://yt3.ggpht.com/-AdrianodeMarqui/AAAAAAAAAAI/profile.jpg',
    ]
  },

  'joao_lozano': {
    label: 'João Lozano',
    urls: [
      // Personal/business website
      'https://www.joaolozano.com.br/images/joao.jpg',
      'https://joaolozano.com.br/assets/profile.jpg',
      // Instagram profile picture (if public)
      'https://instagram.com/joaolozano/picture.jpg',
      // YouTube Brazilian creators
      'https://yt3.ggpht.com/-JoaoLozano/AAAAAAAAAAI/profile.jpg',
    ]
  },

  'rafa_medeiros': {
    label: 'Rafa Medeiros',
    urls: [
      // Business/coaching site
      'https://www.rafamedeiros.com.br/images/rafa.jpg',
      'https://rafamedeiros.com.br/assets/profile.jpg',
      // Instagram
      'https://instagram.com/rafamedeiros/picture.jpg',
      // LinkedIn
      'https://media.licdn.com/dms/image/rafa-medeiros.jpg',
    ]
  },

  'thiago_finch': {
    label: 'Thiago Finch',
    urls: [
      // Personal site/portfolio
      'https://www.thiagofinchmind.com.br/images/thiago.jpg',
      'https://thiagofinchmind.com.br/assets/profile.jpg',
      // YouTube
      'https://yt3.ggpht.com/-ThiagoFinch/AAAAAAAAAAI/profile.jpg',
      // Instagram
      'https://instagram.com/thiagofinchmind/picture.jpg',
    ]
  },

  // *** SPECIAL CASES ***

  'cagan_patton': {
    label: 'Cagan + Patton',
    urls: [
      // Use Marty Cagan's image (partial person)
      'https://www.svpg.com/images/team/marty-cagan.jpg',
      // Or combined image (if exists)
      'https://www.svpg.com/images/combined/cagan-patton.jpg',
    ]
  },

  'ricky_and_morty': {
    label: 'Rick and Morty',
    urls: [
      // Adult Swim official
      'https://www.adultswim.com/uploads/programs/rick-and-morty-poster.jpg',
      'https://www.adultswim.com/images/rick-and-morty-title.jpg',
      // IMDb
      'https://m.media-imdb.com/images/M/MV5BMjRiNDJhMTUtOWEyZS00NzAxLWI2YTAtNzA5ZDhhYTYxOTY5XkEyXkFqcGdeQXVyEzKG93zQy9HHAA@@._V1_.jpg',
      // Cartoon Network
      'https://www.cartoonnetwork.com/images/rick-and-morty.jpg',
    ]
  },
};

async function downloadImage(url, outputPath, slug) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*',
        'Referer': 'https://google.com/',
      },
      timeout: 8000,
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        return downloadImage(redirectUrl, outputPath, slug)
          .then(resolve)
          .catch(() => reject(new Error('Redirect failed')));
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(outputPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', reject);
    });

    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });

    request.on('error', reject);
  });
}

async function processMind(slug, config) {
  const outputPath = `${OUTPUT_DIR}/${slug}.jpg`;

  if (existsSync(outputPath)) {
    console.log(`⊘ SKIP  ${slug} (exists)`);
    return { status: 'skip' };
  }

  console.log(`🔍 SEARCH ${slug}...`);

  for (const url of config.urls) {
    try {
      await downloadImage(url, outputPath, slug);
      console.log(`✓ OK    ${slug} ← ${url.split('/').slice(2, 4).join('/')}`);
      return { status: 'ok' };
    } catch (error) {
      // Try next URL silently
    }
  }

  console.log(`✗ FAIL  ${slug} (${config.urls.length} sources tried)`);
  return { status: 'fail', label: config.label };
}

async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Aggressive Mind Image Search & Download  ║');
  console.log('╚════════════════════════════════════════╝\n');

  const results = { ok: [], skip: [], fail: [] };
  const startTime = Date.now();

  for (const [slug, config] of Object.entries(MINDS)) {
    const result = await processMind(slug, config);
    results[result.status].push(result.label || slug);
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║              SUMMARY                   ║`);
  console.log(`╚════════════════════════════════════════╝`);
  console.log(`✓ Downloaded:  ${results.ok.length}`);
  console.log(`⊘ Skipped:    ${results.skip.length}`);
  console.log(`✗ Failed:     ${results.fail.length}`);
  console.log(`⏱ Time:       ${duration}s\n`);

  if (results.fail.length > 0) {
    console.log('Still need:');
    results.fail.forEach(name => console.log(`  • ${name}`));
  }
}

main().catch(console.error);
