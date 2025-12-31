import React from 'react';
import { cn } from '../../lib/utils';
import { iconMap, DefaultIcon, hasIcon, type IconName } from './icons';

// Re-export IconName for convenience
export type { IconName };

// Mapping from current size props to Tailwind width/height classes
// This ensures the SVG icons match the previous font-based sizing
const sizeMap: Record<string, string> = {
  'size-3': 'w-3 h-3',      // 12px
  'size-4': 'w-3.5 h-3.5',  // 14px
  'size-5': 'w-4 h-4',      // 16px (Default)
  'size-6': 'w-[18px] h-[18px]', // 18px
  'size-7': 'w-5 h-5',      // 20px
  'size-8': 'w-6 h-6',      // 24px
  'size-9': 'w-[30px] h-[30px]', // 30px
  'size-10': 'w-9 h-9',     // 36px
};

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Nome do ícone (kebab-case). Use apenas nomes válidos de icon-map.ts
   * @see app/components/ui/icons/icon-map.ts para lista completa
   */
  name: IconName | (string & {}); // IconName preferred, string allowed for gradual migration
  /** Tamanho usando classes Tailwind size-* (mapeado) ou classes arbitrárias */
  size?: keyof typeof sizeMap | string;
  /** Texto acessível para screen readers */
  label?: string;
  /** @deprecated Tipo não é mais suportado no Iconoir (mantido para compatibilidade) */
  type?: 'regular' | 'solid' | 'brands';
  className?: string;
  /** Stroke width para o ícone (padrão Iconoir é normalmente 1.5 ou 2) */
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 'size-5',
  className,
  label,
  type, // Ignored as Iconoir has a unified style
  fill, // SVGs might receive fill
  strokeWidth,
  ...props
}: IconProps) {
  // 1. Resolve Component
  // Tries to find the component in the map, falls back to DefaultIcon
  const normalizedName = name?.toLowerCase()?.trim() ?? '';
  const isValidIcon = hasIcon(normalizedName);
  const IconComponent = isValidIcon ? iconMap[normalizedName] : DefaultIcon;

  // DEV WARNING: Log invalid icons to help catch LLM-generated invalid names
  if (!isValidIcon && process.env.NODE_ENV === 'development') {
    console.warn(
      `⚠️ Icon "${name}" not found in icon-map.ts. ` +
      `Check app/components/ui/icons/icon-map.ts for valid names.`
    );
  }

  // 2. Resolve Size
  // If size is a mapped key (size-5), use the map. Otherwise, pass it through (if it's w-8 etc)
  const sizeClass = sizeMap[size as string] || size;

  // 3. Render (with visual indicator for invalid icons in dev)
  const invalidIconClass = !isValidIcon && process.env.NODE_ENV === 'development'
    ? 'ring-2 ring-red-500 rounded'
    : undefined;

  return (
    <IconComponent
      className={cn(sizeClass, invalidIconClass, className)}
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      role={label ? 'img' : undefined}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
