import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const { data } = await supabase
  .from("minds")
  .select("slug, display_name, short_bio")
  .order("slug");

console.log("Remaining minds (" + data.length + "):\n");
data.forEach(m => {
  const hasBio = m.short_bio && m.short_bio.trim().length > 0;
  console.log((hasBio ? "[BIO] " : "      ") + m.slug);
});
