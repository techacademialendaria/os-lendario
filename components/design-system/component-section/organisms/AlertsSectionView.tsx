/**
 * AlertsSectionView
 * Design System - Alerts Showcase
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';

export function AlertsSectionView() {
  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Alertas</h3>
      <div className="space-y-6">
        {/* Default Alert */}
        <Alert>
          <div className="relative z-10">
            <AlertTitle>
              <Icon name="rocket" size="size-5" /> Informacao do Sistema
            </AlertTitle>
            <AlertDescription>
              Atualizacao do Sistema Lendario v4.1 disponivel para download com novos recursos de IA.
            </AlertDescription>
          </div>
          <Icon
            name="rocket"
            className="pointer-events-none absolute -bottom-4 -right-4 -rotate-12 text-7xl opacity-5"
          />
        </Alert>

        {/* Destructive Alert */}
        <Alert variant="destructive">
          <div className="relative z-10">
            <AlertTitle>
              <Icon name="exclamation" size="size-5" /> Erro Critico
            </AlertTitle>
            <AlertDescription>
              Falha ao conectar com o servidor neural. Verifique suas credenciais de API.
            </AlertDescription>
          </div>
          <Icon
            name="exclamation"
            className="pointer-events-none absolute -bottom-4 -right-4 -rotate-12 text-7xl opacity-5"
          />
        </Alert>

        {/* Success Alert */}
        <Alert variant="success">
          <div className="relative z-10">
            <AlertTitle>
              <Icon name="check-circle" size="size-5" /> Sucesso
            </AlertTitle>
            <AlertDescription>
              Transacao completada com exito. O recibo foi enviado por email.
            </AlertDescription>
          </div>
          <Icon
            name="check-circle"
            className="pointer-events-none absolute -bottom-4 -right-4 -rotate-12 text-7xl opacity-5"
          />
        </Alert>
      </div>
    </section>
  );
}
