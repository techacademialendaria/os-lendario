import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import {
  marketingDefinition,
  marketingCharacteristics,
  valueAlignments,
  practicalApplications,
} from '../data';

export const MarketingView: React.FC = () => (
  <section className="space-y-12 border-t-2 border-primary/20 pt-12">
    {/* Header */}
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
      <div>
        <h3 className="mb-2 flex items-center gap-3 font-sans text-3xl font-bold">
          <Icon name="megaphone" className="text-primary" size="size-8" /> 6. Marketing Autentico
        </h3>
        <p className="font-serif text-xl italic text-muted-foreground">
          "Vender sem esforco e sem mentir."
        </p>
      </div>
      <Badge variant="outline" className="border-primary py-1 text-sm text-primary">
        Filosofia Central
      </Badge>
    </div>

    {/* Definition - The "Manifesto" */}
    <div className="relative overflow-hidden rounded-xl bg-foreground p-8 text-background shadow-2xl md:p-12">
      <Icon
        name="flame"
        className="absolute -bottom-10 -right-10 rotate-12 text-[12rem] text-primary/10"
      />
      <div className="relative z-10 space-y-8">
        <h4 className="font-sans text-3xl font-bold text-primary">A Definicao</h4>
        <div className="max-w-4xl space-y-6 font-serif text-lg leading-relaxed opacity-90 md:text-xl">
          <p>
            Marketing Autentico e o unico tipo de marketing que{' '}
            <strong className="rounded bg-primary/10 px-1 text-primary">
              nao reserva um lugar para voce no inferno
            </strong>
            ; ele se dedica a impulsionar mensagens autenticas e transparentes.
          </p>
          <p className="font-sans text-base text-background/70">
            {marketingDefinition.secondaryParagraph}
          </p>
          <div className="border-l-4 border-primary pl-6 italic text-primary-foreground">
            {marketingDefinition.quote}
          </div>
        </div>
      </div>
    </div>

    {/* Characteristics - Grid */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {marketingCharacteristics.map((item, i) => (
        <div
          key={i}
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Icon name={item.icon} size="size-5" />
          </div>
          <h5 className="mb-2 text-sm font-bold">{item.title}</h5>
          <p className="font-sans text-xs font-medium leading-snug text-muted-foreground">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Values & Application - Split View */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="border-brand-blue/20 bg-brand-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-blue">
            <Icon name="refresh" /> Alinhamento de Valores
          </CardTitle>
          <CardDescription>Como nossa filosofia se conecta com quem somos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {valueAlignments.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-brand-blue/10 bg-background/50 p-3"
            >
              <Badge variant="outline" className="mt-0.5 border-brand-blue text-brand-blue">
                {i + 1}
              </Badge>
              <div>
                <span className="block text-sm font-bold text-foreground">{item.val}</span>
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-brand-green/20 bg-brand-green/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-green">
            <Icon name="rocket" /> Aplicacoes Praticas
          </CardTitle>
          <CardDescription>Transformando filosofia em acao diaria.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {practicalApplications.map((app, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-brand-green/10 bg-background p-4"
            >
              <div className="shrink-0 rounded-full bg-brand-green/10 p-3 text-brand-green">
                <Icon name={app.icon} />
              </div>
              <div>
                <h5 className="text-sm font-bold">{app.title}</h5>
                <p className="font-sans text-xs font-medium text-muted-foreground">{app.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </section>
);
