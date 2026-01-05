import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListItem } from './ListItem';
import { roundedShapeItems, circleShapeItems } from '../data';

export const ShapesView: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="font-sans text-xl font-semibold">Formas & Variacoes</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-dashed bg-muted/10">
          <CardHeader>
            <CardTitle className="text-base">Rounded (Square)</CardTitle>
            <CardDescription>Para listas mais tecnicas ou modernas.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {roundedShapeItems.slice(0, 2).map((item) => (
                <ListItem
                  key={item.label}
                  label={item.label}
                  style={item.style}
                  color={item.color}
                  shape={item.shape}
                />
              ))}
            </div>
            <div className="space-y-2">
              {roundedShapeItems.slice(2).map((item) => (
                <ListItem
                  key={item.label}
                  label={item.label}
                  style={item.style}
                  color={item.color}
                  shape={item.shape}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed bg-muted/10">
          <CardHeader>
            <CardTitle className="text-base">Circle (Pill)</CardTitle>
            <CardDescription>O padrao amigavel e organico.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {circleShapeItems.slice(0, 2).map((item) => (
                <ListItem
                  key={item.label}
                  label={item.label}
                  style={item.style}
                  color={item.color}
                  shape={item.shape}
                />
              ))}
            </div>
            <div className="space-y-2">
              {circleShapeItems.slice(2).map((item) => (
                <ListItem
                  key={item.label}
                  label={item.label}
                  style={item.style}
                  color={item.color}
                  shape={item.shape}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
