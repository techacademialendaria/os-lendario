import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { archetypes } from '../data';

export const CoreIdentityView: React.FC = () => (
  <section className="space-y-8">
    <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
      <Icon name="diamond" /> 1. Nucleo Identitario
    </h3>

    {/* Mission / Vision / Positioning Cards */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground">
        <div className="absolute -bottom-4 -right-4 rotate-12 opacity-10">
          <Icon name="target" className="text-9xl" />
        </div>
        <CardHeader>
          <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
            <Icon name="target" /> Missao
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="font-sans text-lg font-medium leading-relaxed">
            "Unir e potencializar pessoas lendarias com IA para construirem solucoes e negocios que{' '}
            <strong>imortalizam seu legado</strong>."
          </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden">
        <div className="absolute -bottom-4 -right-4 rotate-12 opacity-5">
          <Icon name="eye" className="text-9xl" />
        </div>
        <CardHeader>
          <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
            <Icon name="eye" /> Visao
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="font-sans font-medium text-muted-foreground">
            Ser referencia global em educacao de IA generativa aplicada a negocios, com um portfolio
            de startups de sucesso internacional.
          </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden">
        <div className="absolute -bottom-4 -right-4 rotate-12 opacity-5">
          <Icon name="map-marker" className="text-9xl" />
        </div>
        <CardHeader>
          <CardTitle className="relative z-10 flex items-center gap-2 text-lg">
            <Icon name="map-marker" /> Posicionamento
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="font-sans font-medium text-muted-foreground">
            Somos um ecossistema de educacao & inovacao que potencializa pessoas e negocios com
            inteligencia artificial generativa.
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Archetypes with Hero Style Icons */}
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {archetypes.map((archetype) => (
        <div
          key={archetype.name}
          className={`group relative overflow-hidden rounded-2xl border ${archetype.borderClass} bg-gradient-to-br ${archetype.bgClass} p-8 transition-all duration-300 hover:shadow-lg`}
        >
          <div
            className={`absolute -bottom-12 -right-12 rotate-12 text-[10rem] ${archetype.colorClass}/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
          >
            <Icon name={archetype.icon} />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-sans text-3xl font-bold text-foreground">{archetype.name}</h4>
                <Icon
                  name={archetype.icon}
                  className={`${archetype.colorClass} md:hidden`}
                  size="size-6"
                />
              </div>
              <span
                className={`inline-block rounded border ${archetype.badgeBorderClass} ${archetype.badgeBgClass} px-2 py-1 text-xs font-bold uppercase tracking-widest ${archetype.badgeTextClass}`}
              >
                {archetype.level}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Motivacao
                </p>
                <p className="text-sm font-medium leading-snug">{archetype.motivation}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Manifestacao
                </p>
                <p className="font-serif text-sm italic leading-snug text-muted-foreground">
                  {archetype.manifestation}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
