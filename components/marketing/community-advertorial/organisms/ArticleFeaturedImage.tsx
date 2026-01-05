import React from 'react';
import { Icon } from '@/components/ui/icon';

export const ArticleFeaturedImage: React.FC = () => (
  <figure className="mb-12">
    <div className="group relative aspect-video w-full overflow-hidden rounded-md bg-muted shadow-lg">
      <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
      <img
        src="https://images.unsplash.com/photo-1504384308090-c54be3852f9d?q=80&w=2070&auto=format&fit=crop"
        alt="Profissional sobrecarregado"
        className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <figcaption className="mt-2 flex items-center justify-center gap-2 font-sans text-xs italic text-muted-foreground">
      <Icon name="camera" size="size-3" /> O paradoxo da produtividade: mais ferramentas,
      menos tempo. (Foto: Unsplash)
    </figcaption>
  </figure>
);
