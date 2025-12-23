import https from 'https';
import { createWriteStream } from 'fs';

async function download(url, path, slug) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000
    }, (res) => {
      if (res.statusCode === 200) {
        const file = createWriteStream(path);
        res.pipe(file);
        file.on('finish', () => {
          console.log(`✓ ${slug}`);
          resolve(true);
        });
      } else {
        console.log(`✗ ${slug} (HTTP ${res.statusCode})`);
        resolve(false);
      }
    }).on('error', () => {
      console.log(`✗ ${slug} (error)`);
      resolve(false);
    });
  });
}

const attempts = [
  { slug: 'jeff_patton', url: 'https://www.jpattonassociates.com/wp-content/uploads/2015/01/Jeff-Patton-Headshot-1.jpg' },
  { slug: 'dan_kennedy', url: 'https://www.nobsinnercircle.com/wp-content/uploads/2021/03/dan-kennedy.jpg' },
  { slug: 'adriano-de-marqui', url: 'https://scontent.cdninstagram.com/academialendaria_profile.jpg' }
];

const dir = '/Users/alan/Code/mmos/public/minds-profile-images';

console.log('Last attempt for remaining 3 images...\n');

for (const { slug, url } of attempts) {
  await download(url, `${dir}/${slug}.jpg`, slug);
  await new Promise(r => setTimeout(r, 1000));
}

console.log('\nDone!');
