import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { toastDemos } from '../data';

const ToastsView: React.FC = () => {
  const { toast } = useToast();

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="bell" /> Toasts & Notificacoes
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Mensagens transientes que aparecem nos cantos da tela.{' '}
        <strong>Clique para testar.</strong>
      </p>

      <div className="flex flex-wrap justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/10 p-8">
        {toastDemos.map((demo) => (
          <Button
            key={demo.label}
            variant="outline"
            onClick={() => {
              toast({
                title: demo.title,
                description: demo.description,
                variant: demo.variant,
              });
            }}
          >
            {demo.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default ToastsView;
