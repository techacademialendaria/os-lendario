import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '../data';

export const FaqSection: React.FC = () => (
  <section className="bg-muted/10 px-4 py-20">
    <div className="mx-auto max-w-3xl space-y-12">
      <h2 className="text-center text-3xl font-bold">Perguntas Frequentes</h2>

      <Accordion type="single" collapsible className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-lg border border-border bg-card px-4"
          >
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-serif text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
