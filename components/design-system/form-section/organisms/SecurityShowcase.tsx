/**
 * SecurityShowcase - OTP and 2FA verification demo
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { OTPInput } from '@/components/ui/otp-input';

export const SecurityShowcase: React.FC = () => {
  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Verificacao de Seguranca
      </h3>
      <Card className="max-w-md">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="shield-check" size="size-6" />
          </div>
          <CardTitle>Autenticacao de Dois Fatores</CardTitle>
          <CardDescription>
            Digite o codigo de 6 digitos enviado para seu dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <OTPInput length={6} onComplete={(code) => alert(`Codigo: ${code}`)} />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="link" className="text-xs text-muted-foreground">
            Nao recebeu? Reenviar codigo
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
