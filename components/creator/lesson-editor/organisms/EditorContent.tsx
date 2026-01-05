/**
 * EditorContent Organism
 * Main content area with tabs, toolbar, and text editor.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { cn } from '@/lib/utils';
import { INPUT_CLASSES, TEXTAREA_CLASSES, STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { EditorContentProps } from '../types';

export const EditorContent: React.FC<EditorContentProps> = ({
  title,
  script,
  activeTab,
  onTitleChange,
  onScriptChange,
  onActiveTabChange,
}) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-4xl space-y-6 p-8">
        {/* Title Input */}
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={cn(
            INPUT_CLASSES,
            'h-auto border-none bg-transparent px-0 text-2xl font-bold shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0'
          )}
          placeholder="Titulo da Aula"
        />

        {/* Metadata Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            <strong>Modulo:</strong> 3 - Organizacao Inteligente
          </span>
          <span>
            <strong>Duracao:</strong> 40 minutos
          </span>
          <span>
            <strong>Tipo:</strong> Estrategico + Hands-on
          </span>
        </div>

        {/* Editor Tabs */}
        <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
          <div className="flex items-center gap-4 border-b border-border">
            <TabsList className="h-auto gap-1 bg-transparent p-0">
              <TabsTrigger
                value="content"
                className={cn(
                  'rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground',
                  'data-[state=inactive]:text-muted-foreground'
                )}
              >
                <Icon name="eye" size="size-4" className="mr-2" />
                Visual
              </TabsTrigger>
              <TabsTrigger
                value="markdown"
                className={cn(
                  'rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground',
                  'data-[state=inactive]:text-muted-foreground'
                )}
              >
                Markdown
              </TabsTrigger>
            </TabsList>

            {/* Formatting Toolbar */}
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="bold" size="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="italic" size="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="strikethrough" size="size-4" />
              </Button>
              <div className="mx-1 h-5 w-px bg-border" />
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">
                H2
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">
                H3
              </Button>
              <div className="mx-1 h-5 w-px bg-border" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="list" size="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="quote-left" size="size-4" />
              </Button>
              <div className="mx-1 h-5 w-px bg-border" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="undo" size="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="redo" size="size-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="content" className="animate-fade-in pt-6">
            {/* App Icon/Logo */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-pink-500">
                <Icon name="folder" size="size-8" className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <Badge variant="secondary" className="mt-1">
                  ClickUp
                </Badge>
              </div>
            </div>

            {/* Rich Content Area */}
            <div className="prose prose-invert max-w-none">
              <AutosizeTextarea
                value={script}
                onChange={(e) => onScriptChange(e.target.value)}
                className={cn(
                  TEXTAREA_CLASSES,
                  'min-h-[500px] w-full resize-none border-none bg-transparent p-0 font-sans text-base leading-relaxed focus-visible:ring-0'
                )}
                placeholder="Escreva o conteudo da aula..."
              />
            </div>
          </TabsContent>

          <TabsContent value="markdown" className="animate-fade-in pt-6">
            <Card className={STUDIO_CARD_CLASSES}>
              <CardContent className="p-0">
                <AutosizeTextarea
                  value={script}
                  onChange={(e) => onScriptChange(e.target.value)}
                  className={cn(
                    TEXTAREA_CLASSES,
                    'min-h-[500px] resize-none border-none p-6 font-mono text-sm leading-relaxed focus-visible:ring-0'
                  )}
                  placeholder="Escreva em Markdown..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
