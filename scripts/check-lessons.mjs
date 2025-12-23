#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(rootDir, '.env') });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_Secret_key
);

async function check() {
  // 1. Buscar o projeto
  const { data: project } = await supabase
    .from('content_projects')
    .select('id, slug, name')
    .eq('slug', 'dominando-obsidian')
    .single();

  console.log('Projeto:', project);

  // 2. Buscar módulos
  const { data: modules } = await supabase
    .from('contents')
    .select('id, slug, title, content_type, parent_content_id, sequence_order')
    .eq('project_id', project.id)
    .eq('content_type', 'course_module')
    .is('deleted_at', null)
    .order('sequence_order');

  console.log('\nMódulos:', modules?.length);
  modules?.forEach(m => console.log('  -', m.sequence_order, m.title, '(id:', m.id, ')'));

  // 3. Buscar lições
  const { data: lessons } = await supabase
    .from('contents')
    .select('id, slug, title, content_type, parent_content_id, sequence_order')
    .eq('project_id', project.id)
    .eq('content_type', 'course_lesson')
    .is('deleted_at', null)
    .order('sequence_order');

  console.log('\nLições:', lessons?.length);
  lessons?.slice(0, 10).forEach(l => console.log('  -', l.title, '| parent:', l.parent_content_id));

  // 4. Buscar TODOS os conteúdos do projeto
  const { data: allContents } = await supabase
    .from('contents')
    .select('content_type')
    .eq('project_id', project.id)
    .is('deleted_at', null);

  console.log('\nTodos os content_types do projeto:');
  const types = {};
  allContents?.forEach(c => {
    types[c.content_type] = (types[c.content_type] || 0) + 1;
  });
  Object.entries(types).forEach(([k, v]) => console.log('  -', k, ':', v));
}

check();
