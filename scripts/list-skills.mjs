import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const { data: skills } = await supabase
  .from('skills')
  .select('id, code, name')
  .order('code');

console.log('ALL SKILLS (' + skills.length + '):');
skills.forEach(s => console.log(s.code));
