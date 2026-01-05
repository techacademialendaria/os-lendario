import React from 'react';
import { Icon } from '@/components/ui/icon';
import { ListItem } from './ListItem';
import { solidStyleItems, softStyleItems, outlinedStyleItems } from '../data';

export const StyleGalleryView: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <div className="space-y-2">
        <h3 className="font-sans text-xl font-semibold">Galeria de Estilos</h3>
        <p className="font-serif text-sm text-muted-foreground">
          Matriz de combinacoes visuais para diferentes hierarquias de informacao.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* SOLID - High Emphasis */}
        <StyleColumn title="Solid (High Emphasis)" items={solidStyleItems} />

        {/* SOFT - Medium Emphasis */}
        <StyleColumn title="Soft (Balanced)" items={softStyleItems} />

        {/* OUTLINED - Low Emphasis */}
        <StyleColumn title="Outlined (Subtle)" items={outlinedStyleItems} />

        {/* MINIMAL - Clean */}
        <div className="space-y-4">
          <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Minimal (Clean)
          </h4>
          <div className="space-y-3">
            <ListItem label="Standard Check" style="standard" color="primary" />
            <ListItem label="Green Check" style="standard" color="green" />
            <div className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground line-through">
                Disabled / Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for repeated pattern
interface StyleColumnProps {
  title: string;
  items: Array<{
    label: string;
    style: 'standard' | 'white' | 'soft' | 'soft-outlined' | 'solid' | 'outlined';
    color: 'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light' | 'primary';
  }>;
}

const StyleColumn: React.FC<StyleColumnProps> = ({ title, items }) => (
  <div className="space-y-4">
    <h4 className="border-b border-border pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {title}
    </h4>
    <div className="space-y-3">
      {items.map((item) => (
        <ListItem
          key={`${item.style}-${item.color}-${item.label}`}
          label={item.label}
          style={item.style}
          color={item.color}
        />
      ))}
    </div>
  </div>
);
