/**
 * InteractiveSection - Interactive and utility card demos
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const InteractiveSection: React.FC = () => (
  <section className="space-y-8">
    <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
      Interativo & Utilitario
    </h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Button Actions */}
      <Card>
        <div className="h-32 bg-gradient-to-r from-brand-blue to-brand-cyan" />
        <CardHeader>
          <CardTitle>Acoes Principais</CardTitle>
          <CardDescription>CTA CARD</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Focado em conversao. O footer contem botoes de alta prioridade.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Confirmar</Button>
          <Button variant="ghost">Cancelar</Button>
        </CardFooter>
      </Card>

      {/* Alert Inside */}
      <Card>
        <CardHeader>
          <span className="text-xs font-bold uppercase text-muted-foreground">Notificacao</span>
          <CardTitle>Card com Alerta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="warning">
            <Icon name="exclamation" size="size-4" />
            <AlertTitle>Atencao</AlertTitle>
            <AlertDescription>Sua assinatura expira em 3 dias.</AlertDescription>
          </Alert>
          <p className="font-serif text-sm text-muted-foreground">
            Utilize alertas dentro de cards para destacar informacoes contextuais sem bloquear o
            fluxo.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0">
            Renovar Agora
          </Button>
        </CardFooter>
      </Card>

      {/* Navigation Tabs */}
      <Card className="md:col-span-2 lg:col-span-1">
        <Tabs defaultValue="account">
          <div className="border-b border-border px-6 pt-4">
            <TabsList className="h-auto w-full justify-start bg-transparent p-0">
              <TabsTrigger
                value="account"
                className="mr-4 rounded-none border-b-2 border-transparent px-0 pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Conta
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-none border-b-2 border-transparent px-0 pb-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Seguranca
              </TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="pt-6">
            <TabsContent value="account" className="mt-0 animate-fade-in space-y-2">
              <h4 className="text-sm font-bold">Dados da Conta</h4>
              <p className="font-serif text-xs text-muted-foreground">
                Gerencie seus dados publicos aqui.
              </p>
              <Button size="sm" className="mt-2">
                Editar Perfil
              </Button>
            </TabsContent>
            <TabsContent value="security" className="mt-0 animate-fade-in space-y-2">
              <h4 className="text-sm font-bold">Senha e Acesso</h4>
              <p className="font-serif text-xs text-muted-foreground">
                Autenticacao de dois fatores.
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                Alterar Senha
              </Button>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  </section>
);
