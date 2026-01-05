import React from 'react';
import { Icon } from '@/components/ui/icon';
import { SocialIcon } from '@/components/ui/social-icon';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { SocialIconsViewProps } from '../types';

/**
 * Social icons section displaying brand icons
 */
export const SocialIconsView: React.FC<SocialIconsViewProps> = ({ socialIcons }) => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="share" /> Redes & Marcas (Simple Icons)
        </h3>
        <Badge variant="secondary">SVG Paths</Badge>
      </div>

      <p className="font-serif text-muted-foreground">
        Icones SVG vetoriais otimizados. Utilize o componente{' '}
        <code>{'<SocialIcon name="..." />'}</code>.
      </p>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {socialIcons.map((name) => (
          <Card
            key={name}
            className="group flex cursor-pointer flex-col items-center justify-center gap-4 p-6 transition-colors hover:border-foreground/50"
          >
            <SocialIcon
              name={name}
              size={28}
              className="text-muted-foreground transition-colors group-hover:text-foreground"
            />
            <span className="text-xs font-semibold capitalize">{name}</span>
          </Card>
        ))}
      </div>
    </section>
  );
};
