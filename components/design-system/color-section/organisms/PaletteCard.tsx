import React, { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PaletteCardProps } from '../types';
import { getColorFormats, getBrightness } from '../data';

export const PaletteCard: React.FC<PaletteCardProps> = ({ palette, isDark }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const mainColor = isDark ? palette.dark : palette.main;
  const rawComplements =
    isDark && palette.complementsDark ? palette.complementsDark : palette.complements;
  const sortedComplements = [...rawComplements].sort((a, b) => getBrightness(b) - getBrightness(a));

  const handleCopy = (text: string, format: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  return (
    <div className="flex flex-col gap-0 rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md md:flex-row">
      {/* Left: Main Swatch Area */}
      <div className="flex w-full shrink-0 flex-col md:w-1/3">
        <div
          className="group relative flex min-h-[200px] flex-1 flex-col justify-between overflow-hidden rounded-t-2xl p-8 text-white transition-all duration-300 md:rounded-l-2xl md:rounded-tr-none"
          style={{ backgroundColor: mainColor }}
        >
          <div className="relative z-10">
            <h4 className="font-sans text-2xl font-bold drop-shadow-md">{palette.name}</h4>
            <span className="font-mono text-xs uppercase tracking-widest opacity-90 drop-shadow-sm">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          <div className="relative z-20 flex items-end justify-between">
            <span
              onClick={(e) => handleCopy(mainColor, 'main', e)}
              className="cursor-pointer font-mono text-xl font-bold tracking-wider decoration-white/50 underline-offset-4 drop-shadow-md hover:underline"
              title="Clique para copiar"
            >
              {mainColor}
            </span>
            <button
              onClick={(e) => handleCopy(mainColor, 'main', e)}
              className="cursor-pointer rounded-md bg-white/20 p-2 opacity-0 drop-shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 active:scale-95 group-hover:opacity-100"
              title="Copiar codigo da cor"
            >
              {copiedFormat === 'main' ? (
                <Icon name="check" size="size-5" className="text-white" />
              ) : (
                <Icon name="copy" size="size-5" className="text-white" />
              )}
            </button>
          </div>

          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-black/10 to-white/10"></div>
        </div>
      </div>

      {/* Right: Info & Complements */}
      <div className="flex flex-1 flex-col rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
        <div className="flex-1 p-8">
          <div className="mb-3 flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-foreground/20 text-xs font-bold text-muted-foreground"
            >
              <Icon name="info" size="size-3" className="mr-1" /> Nota de Uso
            </Badge>
          </div>
          <p className="font-serif text-sm leading-relaxed text-muted-foreground">
            {palette.usageNote}
          </p>
        </div>

        <div className="rounded-b-2xl border-t border-border bg-muted/10 p-6 md:rounded-bl-none md:rounded-br-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Icon name="palette" size="size-3" /> Paleta Complementar
            </h5>
            <span className="font-mono text-[10px] text-muted-foreground opacity-50">
              {selectedIndex !== null
                ? 'Selecione um formato para copiar'
                : 'Clique para ver codigos'}
            </span>
          </div>

          <div className="grid h-auto grid-cols-5 gap-2 sm:grid-cols-10">
            {sortedComplements.map((hex, i) => {
              const formats = getColorFormats(hex);
              const isSelected = selectedIndex === i;

              return (
                <div key={i} className="relative aspect-square w-full">
                  <div
                    onClick={() => setSelectedIndex(isSelected ? null : i)}
                    className={cn(
                      'h-full w-full cursor-pointer rounded-md border shadow-sm transition-all duration-200',
                      isSelected
                        ? 'z-10 scale-110 border-primary ring-2 ring-primary ring-offset-2'
                        : 'border-transparent hover:scale-105 hover:shadow-md'
                    )}
                    style={{ backgroundColor: hex }}
                  ></div>

                  <div
                    className={cn(
                      'absolute bottom-full left-1/2 z-50 mb-3 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl transition-all duration-200',
                      isSelected
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none translate-y-2 scale-95 opacity-0 group-hover:opacity-100'
                    )}
                  >
                    <div className="h-2 w-full" style={{ backgroundColor: hex }}></div>

                    <div className="space-y-1 p-3">
                      <div className="mb-2 flex items-center justify-between border-b border-border/50 pb-2">
                        <span className="font-sans text-xs font-bold">Copiar Codigo</span>
                        {isSelected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIndex(null);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Icon name="cross" size="size-3" />
                          </button>
                        )}
                      </div>

                      {[
                        { label: 'HEX', val: formats.hex },
                        { label: 'RGB', val: formats.rgb },
                        { label: 'CMYK', val: formats.cmyk },
                      ].map((fmt) => (
                        <button
                          key={fmt.label}
                          onClick={(e) => handleCopy(fmt.val, `${fmt.label}-${i}`, e)}
                          className="group/row flex w-full items-center justify-between rounded p-1.5 text-left font-mono text-[10px] transition-colors hover:bg-muted"
                        >
                          <span className="font-sans font-semibold opacity-60">{fmt.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{fmt.val}</span>
                            {copiedFormat === `${fmt.label}-${i}` ? (
                              <Icon name="check" size="size-3" className="text-green-500" />
                            ) : (
                              <Icon
                                name="copy"
                                size="size-3"
                                className="text-primary opacity-0 transition-opacity group-hover/row:opacity-100"
                              />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-popover"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
