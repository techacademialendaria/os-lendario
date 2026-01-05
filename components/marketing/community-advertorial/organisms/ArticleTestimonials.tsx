import React from 'react';
import { TESTIMONIALS } from '../data';

export const ArticleTestimonials: React.FC = () => (
  <div className="my-12 rounded-xl border border-border/50 bg-muted/10 p-8">
    <h3 className="mb-8 text-center font-sans text-xl font-bold">O que dizem os que aplicaram</h3>
    <div className="not-prose grid gap-4 md:grid-cols-2">
      {TESTIMONIALS.map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-background p-4 font-serif text-sm shadow-sm"
        >
          <p className="mb-2 italic text-muted-foreground">"{item.text}"</p>
          <p className="font-sans font-bold text-foreground">- {item.author}</p>
        </div>
      ))}
    </div>
  </div>
);
