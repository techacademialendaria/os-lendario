import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import type { QuotesSectionProps } from '../types';

/**
 * QuotesSection - Displays key quotes or book summary
 */
export const QuotesSection: React.FC<QuotesSectionProps> = ({ quotes, book }) => {
  if (quotes.length > 0) {
    return (
      <>
        {quotes.map((quote, idx) => (
          <Card key={idx} className="border-border bg-background shadow-sm">
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Icon name="quote-right" size="size-3" /> Citacao
                </span>
                <div className="flex gap-2">
                  <Icon
                    name="copy"
                    size="size-3"
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                  />
                  <Icon
                    name="share"
                    size="size-3"
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
              <p className="font-serif text-sm italic text-foreground/80">"{quote}"</p>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <Card className="border-border bg-background shadow-sm">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Icon name="star" type="solid" className="text-brand-gold" size="size-3" />
          <span className="text-xs font-bold text-foreground">Sobre o Livro</span>
        </div>
        <p className="font-serif text-sm leading-relaxed text-muted-foreground">
          {book.summary || `${book.title} por ${book.author}`}
        </p>
      </CardContent>
    </Card>
  );
};

export default QuotesSection;
