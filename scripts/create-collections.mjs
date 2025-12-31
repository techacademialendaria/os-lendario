#!/usr/bin/env node
/**
 * Script: create-collections.mjs
 * Creates 3 book collections with real data
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const COLLECTIONS = [
  {
    slug: 'mente_alta_performance',
    name: 'Mente de Alta Performance',
    description: 'Em um mundo de distracoes infinitas, a capacidade de concentracao profunda se tornou o superpoder mais valioso. Esta colecao reune os melhores livros sobre dominio mental, foco profundo e autoconhecimento. De tecnicas cientificas para entrar em estado de flow ate a sabedoria milenar dos estoicos, voce encontrara um arsenal completo para reprogramar sua mente, eliminar o ruido e operar no seu nivel mais alto de performance.',
    metadata: {
      subtitle: 'Domine o foco profundo e alcance seu potencial maximo',
      icon: 'brain',
      color: 'bg-purple-500',
      curator_name: 'Alan Nicolas',
      tags: ['Produtividade', 'Psicologia', 'Filosofia']
    },
    books: [
      'deep_work_a_concentracao_maxima_num_mundo_de_distracoes',
      'flow',
      'mindset',
      'habitos_atomicos',
      'meditacoes',
      'o_ego_e_seu_inimigo',
      'essencialismo',
      'digital_minimalism',
      'the_big_leap',
      'maestria',
      'foco',
      'hyperfocus',
      'a_quietude_e_a_chave',
      'garra'
    ]
  },
  {
    slug: 'visoes_do_futuro',
    name: 'Visoes do Futuro',
    description: 'A inteligencia artificial esta transformando cada aspecto da nossa existencia - do trabalho aos relacionamentos, da economia a propria definicao do que significa ser humano. Esta colecao combina visoes de cientistas, futuristas e historiadores para equipar voce com a compreensao necessaria para navegar (e prosperar) nesta nova era. Da evolucao de Sapiens a singularidade tecnologica, prepare-se para pensar em decadas, nao em dias.',
    metadata: {
      subtitle: 'Entenda a revolucao da IA e o destino da humanidade',
      icon: 'rocket',
      color: 'bg-blue-500',
      curator_name: 'Alan Nicolas',
      tags: ['Tecnologia', 'Sociedade', 'Ciencia']
    },
    books: [
      'ai_2041',
      'ai_superpowers',
      'homo_deus',
      'sapiens_uma_breve_historia_da_humanidade',
      '21_licoes_para_o_seculo_21',
      'the_singularity_is_near',
      'the_age_of_a_i',
      'the_beginning_of_infinity',
      'abundance',
      'factfulness'
    ]
  },
  {
    slug: 'mentes_brilhantes',
    name: 'Mentes Brilhantes',
    description: 'Por tras de cada grande empresa, movimento ou ideia existe uma mente extraordinaria. Esta colecao mergulha nas biografias e filosofias dos lideres que moldaram o mundo moderno - de Steve Jobs a Warren Buffett, de Marco Aurelio a Elon Musk. Mais do que historias inspiradoras, voce descobrira os principios, frameworks mentais e habitos que transformaram pessoas comuns em figuras lendarias. Estude os mestres, absorva sua sabedoria.',
    metadata: {
      subtitle: 'Aprenda com os maiores lideres e pensadores da historia',
      icon: 'lightbulb',
      color: 'bg-amber-500',
      curator_name: 'Alan Nicolas',
      tags: ['Biografia', 'Historia', 'Lideranca']
    },
    books: [
      'a_cabeca_de_steve_jobs',
      'elon_musk_tesla_spacex_e_a_busca_por_um_futuro_fantastico',
      'efeito_bola_de_neve_a_biografia_de_warren_buffett_o_maior_investidor_do_mundo',
      'principios',
      'o_lado_dificil_das_situacoes_dificeis',
      'sapiens_uma_breve_historia_da_humanidade',
      'fora_de_serie_outliers',
      'the_daily_stoic',
      'meditacoes'
    ]
  }
];

async function main() {
  console.log('Creating Book Collections...\n');

  // 1. Get or create Alan Nicolas mind
  let { data: curator } = await supabase
    .from('minds')
    .select('id')
    .eq('slug', 'alan_nicolas')
    .single();

  if (!curator) {
    console.log('Creating Alan Nicolas mind...');
    const { data: newMind, error } = await supabase
      .from('minds')
      .insert({
        slug: 'alan_nicolas',
        name: 'Alan Nicolas',
        short_bio: 'Curador de conteudo e fundador da Academia',
        privacy_level: 'public'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating mind:', error.message);
      return;
    }
    curator = newMind;
  }

  console.log(`Curator mind_id: ${curator.id}\n`);

  // 2. Create collection_contents table if not exists
  // (This should be done via migration, but we'll skip if exists)

  // 3. Create collections
  for (const collection of COLLECTIONS) {
    console.log(`\n--- ${collection.name} ---`);

    // Create/update project
    const { data: project, error: projectError } = await supabase
      .from('content_projects')
      .upsert({
        slug: collection.slug,
        name: collection.name,
        description: collection.description,
        project_type: 'book_collection',
        status: 'completed',
        creator_mind_id: curator.id,
        project_metadata: collection.metadata
      }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (projectError) {
      console.error(`Error creating project: ${projectError.message}`);
      continue;
    }

    console.log(`Project created: ${project.id}`);

    // Link curator
    await supabase
      .from('project_minds')
      .upsert({
        project_id: project.id,
        mind_id: curator.id,
        role: 'creator',
        is_primary: true
      }, { onConflict: 'project_id,mind_id' });

    // Get book IDs
    const { data: books } = await supabase
      .from('contents')
      .select('id, slug')
      .eq('content_type', 'book_summary')
      .in('slug', collection.books);

    console.log(`Found ${books?.length || 0} of ${collection.books.length} books`);

    // Link books to collection
    if (books && books.length > 0) {
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const { error: linkError } = await supabase
          .from('collection_contents')
          .upsert({
            collection_id: project.id,
            content_id: book.id,
            sequence_order: i + 1
          }, { onConflict: 'collection_id,content_id' });

        if (linkError) {
          // Table might not exist yet
          if (linkError.code === '42P01') {
            console.error('Table collection_contents does not exist. Run migration first.');
            return;
          }
          console.error(`Error linking ${book.slug}: ${linkError.message}`);
        }
      }
      console.log(`Linked ${books.length} books`);
    }
  }

  // 4. Summary
  console.log('\n\n=== SUMMARY ===\n');

  const { data: collections } = await supabase
    .from('content_projects')
    .select('slug, name, project_metadata')
    .eq('project_type', 'book_collection');

  if (collections) {
    for (const c of collections) {
      const { count } = await supabase
        .from('collection_contents')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', (await supabase.from('content_projects').select('id').eq('slug', c.slug).single()).data?.id);

      console.log(`${c.name}: ${count || 0} livros`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
