/**
 * ChatInputShowcase - Autosize textarea for chat-like input
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';

export const ChatInputShowcase: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Chat Input (Autosize)
      </h3>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Experimente digitar varias linhas...</Label>
            <div className="relative">
              <AutosizeTextarea
                placeholder="Envie uma mensagem para a IA..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="min-h-[44px] pr-12"
              />
              <Button
                size="icon"
                className="absolute bottom-1 right-1 h-8 w-8"
                disabled={!chatMessage}
              >
                <Icon name="arrow-small-up" size="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
