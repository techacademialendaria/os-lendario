import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { OPS_CARD_CLASSES } from '../../ops-tokens';
import { VIEWS, ENUMS, CHECK_CONSTRAINTS } from '../data';

export const EnumsTab: React.FC = () => {
  return (
    <TabsContent value="enums" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={OPS_CARD_CLASSES}>
          <CardHeader className="border-b border-border/50 pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Enums ({ENUMS.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {ENUMS.map((e, i) => (
              <div key={i}>
                <p className="text-xs font-bold mb-2 text-foreground/80">{e.name}</p>
                <div className="flex flex-wrap gap-1">
                  {e.values.map((v, j) => (
                    <span key={j} className="px-2 py-0.5 rounded text-[10px] bg-muted/30 text-muted-foreground border border-border/30">{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={OPS_CARD_CLASSES}>
          <CardHeader className="border-b border-border/50 pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Views ({VIEWS.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-1">
              {VIEWS.map((v, i) => (
                <code key={i} className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{v}</code>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={OPS_CARD_CLASSES}>
        <CardHeader className="border-b border-border/50 pb-3">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            CHECK Constraints (principais)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {CHECK_CONSTRAINTS.map((c, i) => (
              <div key={i} className="p-2 rounded-lg bg-muted/10 border border-border/20">
                <code className="text-muted-foreground font-semibold">{c.table}.</code>
                <code className="text-foreground/90 ml-1">{c.field}</code>
                <p className="text-muted-foreground mt-1 text-[10px] opacity-70">{c.values}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
