import { createClient } from '@supabase/supabase-js';
import { readdirSync } from 'fs';
import { config } from 'dotenv';

config({ path: '/Users/alan/Code/mmos/.env' });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

// Get all minds from DB
const { data: minds, error } = await supabase
  .from('minds')
  .select('slug, display_name')
  .eq('privacy_level', 'public')
  .order('display_name');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

// Get existing images
const imagesDir = '/Users/alan/Code/mmos/public/minds-profile-images';
const existingImages = new Set(
  readdirSync(imagesDir)
    .filter(f => f.endsWith('.jpg'))
    .map(f => f.replace('.jpg', ''))
);

// Find missing
const missing = minds.filter(m => !existingImages.has(m.slug));

console.log('Total minds:', minds.length);
console.log('With images:', minds.length - missing.length);
console.log('Missing images:', missing.length);
console.log('\n=== MINDS WITHOUT IMAGES ===\n');
missing.forEach(m => {
  console.log(m.slug.padEnd(30) + ' | ' + m.display_name);
});
