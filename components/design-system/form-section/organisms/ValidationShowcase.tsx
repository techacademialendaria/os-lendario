/**
 * ValidationShowcase - Form validation with accessibility demo
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';

export const ValidationShowcase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Validacao com Acessibilidade
      </h3>
      <Card>
        <CardHeader>
          <CardTitle>Exemplo: Email com aria-describedby</CardTitle>
          <CardDescription>
            Campo de email com validacao que anuncia erros para screen readers via aria-describedby
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-md space-y-4">
          <FormField
            label="Email"
            fieldId="form-email"
            error={emailError}
            description="Use um endereco de email valido"
            required
          >
            <Input
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value && !e.target.value.includes('@')) {
                  setEmailError('Email invalido');
                } else {
                  setEmailError('');
                }
              }}
            />
          </FormField>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEmail('');
              setEmailError('');
            }}
          >
            Limpar
          </Button>
          <Button disabled={!!emailError || !email}>Enviar</Button>
        </CardFooter>
      </Card>
    </section>
  );
};
