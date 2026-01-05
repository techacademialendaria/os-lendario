import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MarkdownRenderer } from '@/components/shared';
import { TextSelectionToolbar } from '../../reader';
import { getPreviewContent, getTeaserContent } from '@/lib/reading-utils';
import { cn } from '@/lib/utils';
import type { ThemeStyle } from '../../reader';
import type { BookData } from '@/hooks/useBooks';

interface ReaderArticleProps {
  articleRef: React.RefObject<HTMLDivElement | null>;
  displayContent: string | null;
  showFullContent: boolean;
  canHighlight: boolean;
  book: BookData;
  bookSlug: string;
  fontSize: number;
  currentMode: ThemeStyle;
  onHighlight: (text: string, note?: string) => Promise<string | null>;
  onCopy: (text: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToDetails: () => void;
}

export const ReaderArticle: React.FC<ReaderArticleProps> = ({
  articleRef,
  displayContent,
  showFullContent,
  canHighlight,
  book,
  bookSlug,
  fontSize,
  currentMode,
  onHighlight,
  onCopy,
  onNavigateToLogin,
  onNavigateToDetails,
}) => {
  if (!displayContent) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon name="document" className="mx-auto mb-4" size="size-12" />
        <p>O conteudo deste livro ainda nao foi gerado.</p>
        <Button className="mt-4" variant="outline">
          <Icon name="magic-wand" className="mr-2" /> Gerar Resumo com IA
        </Button>
      </div>
    );
  }

  return (
    <article
      ref={articleRef as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative max-w-none animate-fade-in font-serif transition-all duration-700',
        currentMode.selection
      )}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: 'var(--reading-line-height, 1.6)',
        letterSpacing: 'var(--reading-letter-spacing, 0.012em)',
        fontFeatureSettings: '"liga" 1, "kern" 1',
        color: currentMode.text,
      }}
    >
      {/* Text Selection Toolbar */}
      <TextSelectionToolbar
        containerRef={articleRef as React.RefObject<HTMLElement>}
        onHighlight={onHighlight}
        onCopy={onCopy}
        disabled={!showFullContent || !canHighlight}
      />

      {showFullContent ? (
        <MarkdownRenderer content={displayContent} variant="article" inheritColors leadParagraph />
      ) : (
        /* Paywall Preview for non-authenticated users */
        <div className="relative">
          {/* Preview content */}
          <MarkdownRenderer content={getPreviewContent(displayContent)} variant="article" inheritColors />

          {/* Divider line */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Faded teaser content */}
          <div className="relative select-none">
            <div className="pointer-events-none text-muted-foreground/40">
              <MarkdownRenderer
                content={getTeaserContent(displayContent)}
                variant="article"
              />
            </div>
            {/* Fade overlay on teaser */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center space-y-6 pb-8 pt-4 text-center">
            <p className="max-w-md text-sm text-muted-foreground md:text-base">
              Faca login para acessar o resumo completo de <span className="font-medium text-foreground">"{book.title}"</span> e mais de 100 outros livros.
            </p>
            <Button
              size="lg"
              className="h-14 w-full max-w-sm rounded-full bg-brand-gold px-10 text-base font-semibold text-black hover:bg-brand-gold/90 sm:w-auto"
              onClick={onNavigateToLogin}
            >
              Entrar para Ler o Resumo Completo
            </Button>
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={onNavigateToDetails}
            >
              <Icon name="arrow-left" size="size-4" /> Voltar aos Detalhes
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};
