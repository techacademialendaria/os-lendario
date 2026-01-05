import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Usage guide section showing when to use each icon type
 * Displays 3 cards: Iconoir, Social Icons, and Unicode Symbols
 */
export const UsageGuideView: React.FC = () => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Iconoir Card */}
      <Card className="border-l-4 border-l-primary bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon name="apps" className="text-primary" /> Iconoir (Interface)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
          <p>Icones funcionais para navegacao, botoes de acao e status do sistema.</p>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline" className="text-[10px]">
              Menus
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Botoes
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Inputs
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Social Icons Card */}
      <Card className="border-l-4 border-l-foreground bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon name="share" className="text-foreground" /> Social Icons (Brands)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
          <p>
            Logotipos de marcas externas. Devem respeitar a geometria original da marca (SVGs).
          </p>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline" className="text-[10px]">
              Login Social
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Footer
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Links
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Symbols Card */}
      <Card className="border-l-4 border-l-muted-foreground bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Symbol name="infinity" className="text-muted-foreground" /> Simbolos (Unicode)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
          <p>
            Glifos de texto para decoracao inline, listas e separadores. Carregam com a fonte.
          </p>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline" className="text-[10px]">
              Listas
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Metadados
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Texto
            </Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
