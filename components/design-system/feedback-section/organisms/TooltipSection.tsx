import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

const ALAN_AVATAR =
  'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

export const TooltipSection: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="info" /> Tooltips
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Dicas contextuais que aparecem ao passar o mouse. Utilize para desambiguacao ou detalhes
        extras.
      </p>

      <div className="flex flex-wrap items-center gap-12 rounded-xl border border-dashed border-border bg-muted/10 p-8">
        {/* 1. Simple Tooltip */}
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon">
              <Icon name="info" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mais informacoes</TooltipContent>
        </Tooltip>

        {/* 2. Text Link Tooltip */}
        <Tooltip>
          <TooltipTrigger>
            <span className="cursor-help text-sm text-muted-foreground underline decoration-dotted">
              Termo Tecnico
            </span>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-[200px] whitespace-normal text-center">
            Explicacao detalhada sobre o termo tecnico no contexto da IA.
          </TooltipContent>
        </Tooltip>

        {/* 3. Rich User Preview Tooltip */}
        <Tooltip>
          <TooltipTrigger>
            <div className="flex cursor-pointer items-center gap-2">
              <Avatar
                size="sm"
                className="ring-2 ring-transparent transition-all hover:ring-primary/50"
              >
                <AvatarImage src={ALAN_AVATAR} />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold transition-colors hover:text-primary">
                Alan Nicolas
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="border-none bg-transparent p-0 shadow-none">
            <div className="w-64 rounded-xl border border-border bg-card p-4 text-left shadow-2xl">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={ALAN_AVATAR} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="text-sm font-bold text-foreground">Alan Nicolas</h5>
                  <p className="text-xs text-muted-foreground">Founder @ Academia Lendaria</p>
                </div>
              </div>
              <p className="mt-3 whitespace-normal font-serif text-xs leading-relaxed text-muted-foreground">
                Lider visionario focado em potencializar humanos com Inteligencia Artificial.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* 4. Status Tooltip */}
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 cursor-help rounded-full bg-success"></div>
              <span className="text-sm">Sistema Online</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-zinc-900 text-white">
            Uptime: 99.9% (Ultimas 24h)
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};
