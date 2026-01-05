import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { spacingScale } from '../data';

export const LayoutView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Spacing Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale (4px Base)</CardTitle>
          <CardDescription>Nunca use valores arbitrários.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {spacingScale.map((s) => (
              <div
                key={s.token}
                className="rounded border border-border bg-card p-3 text-center"
              >
                <div className="text-lg font-bold text-primary">{s.token}</div>
                <div className="font-mono text-xs text-muted-foreground">{s.px}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{s.use}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Breakpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Breakpoints (Mobile First)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { bp: 'sm', width: '640px', desc: 'Tablets Peq', widthPx: 640 },
              { bp: 'md', width: '768px', desc: 'Tablets', widthPx: 768 },
              { bp: 'lg', width: '1024px', desc: 'Laptops', widthPx: 1024 },
              { bp: 'xl', width: '1280px', desc: 'Desktops', widthPx: 1280 },
            ].map((item, i) => (
              <div key={item.bp} className="flex items-center gap-4">
                <span className="w-12 font-mono font-bold">{item.bp}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded bg-muted">
                  <div
                    className="absolute left-0 h-full border-r border-primary bg-primary/20"
                    style={{
                      width: `${Math.min((item.widthPx / 1400) * 100, 100)}%`,
                      opacity: 0.2 + i * 0.2,
                    }}
                  ></div>
                </div>
                <span className="font-mono text-xs">{item.width} ({item.desc})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Containers & Z-Index */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Containers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>max-w-prose</span>
              <span className="text-muted-foreground">65ch (Texto)</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>max-w-content</span>
              <span className="text-muted-foreground">1024px (Padrão)</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span>max-w-wide</span>
              <span className="text-muted-foreground">1280px (Amplo)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Z-Index</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span>base</span> <span className="text-muted-foreground">0</span>
            </div>
            <div className="flex justify-between">
              <span>sticky</span> <span className="text-muted-foreground">100</span>
            </div>
            <div className="flex justify-between font-bold text-primary">
              <span>modal</span> <span>400</span>
            </div>
            <div className="flex justify-between">
              <span>popover</span> <span className="text-muted-foreground">500</span>
            </div>
            <div className="flex justify-between">
              <span>toast</span> <span className="text-muted-foreground">700</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>max</span> <span>9999</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
