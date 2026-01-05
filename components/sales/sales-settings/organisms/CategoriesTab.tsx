import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { ObjectionCategory } from '../types';

interface CategoriesTabProps {
  categories: ObjectionCategory[];
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({ categories }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categorias de Objecao</CardTitle>
        <Button size="sm" variant="outline" className="gap-2">
          <Icon name="plus" size="size-3" /> Nova Categoria
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50"
          >
            <Icon
              name="menu-burger"
              className="cursor-grab text-muted-foreground opacity-50 hover:opacity-100"
              size="size-4"
            />
            <div className="flex-1">
              <p className="text-sm font-bold">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </div>
            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="pencil" size="size-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Icon name="trash" size="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
