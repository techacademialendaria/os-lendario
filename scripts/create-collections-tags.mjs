#!/usr/bin/env node
/**
 * Creates 3 book collections using tags
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

  for (const collection of COLLECTIONS) {
    console.log(`--- ${collection.name} ---`);

    // 1. Check if tag exists
    let { data: existingTag } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', collection.slug)
      .single();

    let tag;
    if (existingTag) {
      // Update existing
      const { data: updated, error: updateError } = await supabase
        .from('tags')
        .update({
          name: collection.name,
          description: collection.description,
          tag_type: 'collection'
        })
        .eq('slug', collection.slug)
        .select('id')
        .single();

      if (updateError) {
        console.error(`Error updating tag: ${updateError.message}`);
        continue;
      }
      tag = updated;
      console.log(`Tag updated: ${tag.id}`);
    } else {
      // Insert new
      const { data: newTag, error: insertError } = await supabase
        .from('tags')
        .insert({
          slug: collection.slug,
          name: collection.name,
          description: collection.description,
          tag_type: 'collection'
        })
        .select('id')
        .single();

      if (insertError) {
        console.error(`Error creating tag: ${insertError.message}`);
        continue;
      }
      tag = newTag;
      console.log(`Tag created: ${tag.id}`);
    }

    // 2. Get book IDs
    const { data: books } = await supabase
      .from('contents')
      .select('id, slug')
      .eq('content_type', 'book_summary')
      .in('slug', collection.books);

    console.log(`Found ${books?.length || 0} of ${collection.books.length} books`);

    // 3. Link books to tag
    if (books && books.length > 0) {
      let linked = 0;
      for (const book of books) {
        const { error: linkError } = await supabase
          .from('content_tags')
          .upsert({
            content_id: book.id,
            tag_id: tag.id
          }, { onConflict: 'content_id,tag_id' });

        if (!linkError) linked++;
      }
      console.log(`Linked ${linked} books\n`);
    }
  }

  // Summary
  console.log('\n=== RESULT ===\n');

  const { data: collections } = await supabase
    .from('tags')
    .select('slug, name')
    .eq('tag_type', 'collection');

  if (collections) {
    for (const c of collections) {
      const { data: tag } = await supabase
        .from('tags')
        .select('id')
        .eq('slug', c.slug)
        .single();

      const { count } = await supabase
        .from('content_tags')
        .select('*', { count: 'exact', head: true })
        .eq('tag_id', tag.id);

      console.log(`${c.name}: ${count || 0} livros`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
