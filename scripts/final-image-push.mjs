#!/usr/bin/env node

/**
 * Final Push: Specific Image Sources
 *
 * Uses more aggressive tactics:
 * 1. Book publisher author photos
 * 2. Conference speaker databases
 * 3. Podcast guest photos
 * 4. GitHub profile pictures (if dev)
 * 5. Medium author photos
 * 6. Substack author photos
 */

import https from 'https';
import { createWriteStream, existsSync } from 'fs';

const OUTPUT_DIR = '/Users/alan/Code/mmos/public/minds-profile-images';

const FINAL_SOURCES = {
  // *** MARTY CAGAN (Product Management Legend) ***
  'marty_cagan': {
    sources: [
      // Books (INSPIRED, EMPOWERED, LOVED, TRANSFORMED)
      {
        name: 'O\'Reilly author photo',
        url: 'https://www.oreilly.com/library/view/inspired-how-to-create-products-customers-love-3rd-edition/9781492278511/assets/images/marty_cagan_headshot.jpg'
      },
      {
        name: 'Amazon author central',
        url: 'https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod-images/marty-cagan-headshot.jpg'
      },
      {
        name: 'Goodreads author photo',
        url: 'https://images.gr-assets.com/authors/photos/marty_cagan.jpg'
      },
      {
        name: 'Product Talk podcast',
        url: 'https://www.producttalk.org/images/guests/marty-cagan.jpg'
      },
      {
        name: 'Mind the Product conference',
        url: 'https://www.mindtheproduct.com/wp-content/uploads/2023/speakers/marty-cagan.jpg'
      }
    ]
  },

  // *** JEFF PATTON (Agile User Stories) ***
  'jeff_patton': {
    sources: [
      {
        name: 'O\'Reilly author (Story Mapping)',
        url: 'https://www.oreilly.com/library/view/user-story-mapping-discover-the-whole-story-build-the-right-product-2nd-edition/9781491904909/assets/images/jeff_patton_headshot.jpg'
      },
      {
        name: 'Amazon Books author photo',
        url: 'https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod-images/jeff-patton.jpg'
      },
      {
        name: 'InfoQ author',
        url: 'https://www.infoq.com/articles/user-story-mapping/images/jeff_patton.jpg'
      },
      {
        name: 'Agile Alliance speaker',
        url: 'https://www.agilealliance.org/images/speakers/2024/jeff-patton.jpg'
      },
      {
        name: 'Scrum.org author',
        url: 'https://www.scrum.org/authors/jeff-patton/images/profile.jpg'
      }
    ]
  },

  // *** DAN KENNEDY (Copywriting Legend) ***
  'dan_kennedy': {
    sources: [
      {
        name: 'Business books author',
        url: 'https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod-images/dan-kennedy.jpg'
      },
      {
        name: 'Entrepreneur.com contributor',
        url: 'https://www.entrepreneur.com/images/bio/dan-kennedy.jpg'
      },
      {
        name: 'Marketing speak circuit',
        url: 'https://www.marketingspeaker.com/speakers/dan-kennedy/photo.jpg'
      },
      {
        name: 'GKIC (Glazer Kennedy)',
        url: 'https://www.gkic.com/images/instructors/dan-kennedy.jpg'
      },
      {
        name: 'Direct Mail Magazine',
        url: 'https://www.directmailtoday.com/images/experts/dan-kennedy.jpg'
      }
    ]
  },

  // *** JON BENSON (Copywriting/VSL Expert) ***
  'jon_benson': {
    sources: [
      {
        name: 'VSL official speaker photo',
        url: 'https://www.videoselesletter.com/images/speakers/jon-benson.jpg'
      },
      {
        name: 'Copy Chief newsletter',
        url: 'https://www.copychief.com/images/experts/jon-benson.jpg'
      },
      {
        name: 'Copywriting podcasts',
        url: 'https://www.copypod.com/images/guests/jon_benson.jpg'
      },
      {
        name: 'Marketing seminars',
        url: 'https://www.marketingseminar.com/speakers/jon-benson/photo.jpg'
      },
      {
        name: 'Industry publications',
        url: 'https://www.marketingprofs.com/authors/jon-benson/photo.jpg'
      }
    ]
  },

  // *** BRAZILIAN FIGURES ***
  'pedro_valerio': {
    sources: [
      {
        name: 'Brazilian marketing site 1',
        url: 'https://www.marketingdigitaldobrasil.com.br/experts/pedro-valerio.jpg'
      },
      {
        name: 'Hotmart course instructor',
        url: 'https://hotmart.s3.amazonaws.com/instructors/pedro-valerio/photo.jpg'
      },
      {
        name: 'Brasil Digital courses',
        url: 'https://www.brasildigital.com.br/instructors/pedro-valerio/image.jpg'
      },
      {
        name: 'Facebook business page',
        url: 'https://graph.facebook.com/pedrovaleriomarketing/picture?type=large'
      },
      {
        name: 'YouTube channel art',
        url: 'https://yt3.ggpht.com/-pedrovaleriomarketing/profile.jpg'
      }
    ]
  },

  'adriano-de-marqui': {
    sources: [
      {
        name: 'Academia Lendária YouTube',
        url: 'https://yt3.ggpht.com/-academialendaria/profile.jpg'
      },
      {
        name: 'Hotmart instructor',
        url: 'https://hotmart.s3.amazonaws.com/instructors/adriano-marqui/photo.jpg'
      },
      {
        name: 'Brazilian tech blogs',
        url: 'https://www.techdobrasil.com.br/experts/adriano-marqui.jpg'
      },
      {
        name: 'Facebook profile cached',
        url: 'https://graph.facebook.com/adrianodemarqui/picture?type=large'
      },
      {
        name: 'LinkedIn cached image',
        url: 'https://media.licdn.com/dms/image/adriano-marqui.jpg'
      }
    ]
  },

  // *** SPECIAL: CAGAN_PATTON (Use Marty Cagan) ***
  'cagan_patton': {
    sources: [
      {
        name: 'Marty Cagan primary image',
        url: 'https://www.oreilly.com/library/view/inspired-how-to-create-products-customers-love-3rd-edition/9781492278511/assets/images/marty_cagan_headshot.jpg'
      }
    ]
  }
};

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/*',
      },
      timeout: 10000,
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        return downloadImage(redirectUrl, outputPath)
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

      file.on('error', (err) => {
        file.close();
        reject(err);
      });
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
    console.log(`⊘ ${slug.padEnd(20)} (already exists)`);
    return { status: 'skip' };
  }

  for (const source of config.sources) {
    try {
      await downloadImage(source.url, outputPath);
      console.log(`✓ ${slug.padEnd(20)} ← ${source.name}`);
      return { status: 'ok' };
    } catch (error) {
      // Try next source
    }
  }

  console.log(`✗ ${slug.padEnd(20)} (${config.sources.length} sources failed)`);
  return { status: 'fail' };
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════╗');
  console.log('║  FINAL PUSH - Specific Image Sources           ║');
  console.log('╚═══════════════════════════════════════════════╝\n');

  const results = { ok: [], skip: [], fail: [] };
  const startTime = Date.now();

  for (const [slug, config] of Object.entries(FINAL_SOURCES)) {
    const result = await processMind(slug, config);
    results[result.status].push(slug);
    // Smaller delay
    await new Promise(r => setTimeout(r, 300));
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n╔═══════════════════════════════════════════════╗`);
  console.log(`║  RESULTS                                      ║`);
  console.log(`╚═══════════════════════════════════════════════╝`);
  console.log(`✓ Downloaded:  ${results.ok.length}`);
  console.log(`⊘ Skipped:    ${results.skip.length}`);
  console.log(`✗ Failed:     ${results.fail.length}`);
  console.log(`⏱ Time:       ${duration}s\n`);

  if (results.ok.length > 0) {
    console.log('🎉 New images added:');
    results.ok.forEach(slug => console.log(`  ✓ ${slug}`));
  }

  if (results.fail.length > 0) {
    console.log('\nStill need manual intervention:');
    results.fail.forEach(slug => console.log(`  • ${slug}`));
  }
}

main().catch(console.error);
