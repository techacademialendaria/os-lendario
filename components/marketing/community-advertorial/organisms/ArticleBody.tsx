import React from 'react';
import {
  ArticleStatsGrid,
  ArticleSolutions,
  ArticleTestimonials,
  ArticleChecklist,
  ArticleOfferCard,
} from './';

export const ArticleBody: React.FC = () => (
  <article className="prose dark:prose-invert prose-lg max-w-none font-serif leading-loose text-foreground/90">
    <p className="first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-primary">
      Voce construiu 15, 20, talvez 25 anos de carreira. Formacao solida. Experiencia real.
      Resultados comprovados.
    </p>

    <p>
      E mesmo assim, acorda todo dia com a sensacao de que esta operando em 30% do seu
      potencial. <strong>Voce nao esta imaginando coisas.</strong>
    </p>

    <ArticleStatsGrid />

    <h3 className="mb-6 mt-12 font-sans text-2xl font-bold">O Inimigo tem Nome</h3>

    <p>
      Nao e falta de inteligencia. Voce provou sua competencia milhares de vezes. Nao e
      falta de informacao. Voce consome mais conteudo em uma semana do que seus pais em uma
      decada.
    </p>

    <p>
      <strong>O inimigo e o sistema de incentivos do mercado digital.</strong>
    </p>

    <p>
      Cada guru vende novidade, nao resultado. Cada ferramenta promete revolucao, entrega
      distracao. Cada "metodo" te puxa para uma direcao diferente. O resultado? Energia
      diluida. Projetos inacabados. Ciclo de entusiasmo-frustracao. E a sensacao corrosiva
      de que talvez o problema seja voce.
    </p>

    <p className="my-8 text-center text-xl font-bold text-primary">Nao e.</p>

    <h3 className="mb-6 mt-12 font-sans text-2xl font-bold uppercase tracking-wide">
      O que profissionais que sairam do loop tem em comum
    </h3>

    <p>
      Alan Nicolas - R$200+ milhoes faturados, 20.000+ alunos em 40+ paises - identificou um
      padrao depois de anos formando profissionais experientes. Quem consegue transformar
      experiencia em vantagem competitiva com IA tem 3 coisas:
    </p>

    <ArticleSolutions />

    <ArticleTestimonials />

    <h3 className="mb-6 mt-12 font-sans text-2xl font-bold">
      A pergunta que separa quem executa de quem so consome
    </h3>

    <p>
      Se profissionais como KR, Lucas, Rodrigo, Cristina e Raphael - pessoas com decadas de
      experiencia que ja tinham tentado de tudo - encontraram transformacao real...
    </p>
    <p>
      Se a taxa de retencao nas primeiras 48 horas e de <strong>98%</strong>...
    </p>
    <p>Se 20.000+ alunos em 40+ paises ja passaram pelo sistema...</p>
    <p className="text-lg font-bold">O que falta para voce?</p>
    <p>Nao e mais informacao. E o sistema certo.</p>

    <ArticleChecklist />

    <ArticleOfferCard />

    <blockquote className="my-12 border-l-4 border-primary pl-6 text-lg italic text-foreground/80">
      "Nao vou te transformar em expert em IA. Vou te ensinar a pensar com clareza
      suficiente para usar IA como extensao da sua genialidade, nao muleta para sua
      mediocridade."
      <footer className="mt-2 font-sans font-bold not-italic text-primary">
        - Alan Nicolas
      </footer>
    </blockquote>
  </article>
);
