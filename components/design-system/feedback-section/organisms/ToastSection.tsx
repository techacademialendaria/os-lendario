import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { useToast } from '../../../../hooks/use-toast';
import { toastVariants } from '../data';

export const ToastSection: React.FC = () => {
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
        {toastVariants.map((variant) => (
          <Button
            key={variant.label}
            variant="outline"
            onClick={() => {
              toast({
                title: variant.title,
                description: variant.description,
                variant: variant.variant === 'default' ? undefined : variant.variant,
              });
            }}
          >
            {variant.label}
          </Button>
        ))}
      </div>
    </section>
  );
};
