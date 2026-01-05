/**
 * CalendarShowcase - Calendar and date picker scheduling demo
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';

export const CalendarShowcase: React.FC = () => {
  const [date, setDate] = useState<Date>();

  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Agendamento & Datas
      </h3>
      <div className="flex flex-col items-start gap-12 md:flex-row">
        <div className="w-full md:w-auto">
          <Calendar className="w-full md:w-auto" selected={date} onSelect={setDate} />
        </div>
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agendar Mentoria</CardTitle>
              <CardDescription>Selecione uma data para sua sessao com a IA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Data Selecionada</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="cursor-pointer rounded-lg border border-primary bg-primary/5 p-3 text-center">
                  <span className="mb-1 block text-xs font-bold text-primary">09:00</span>
                  <span className="text-[10px] text-muted-foreground">Disponivel</span>
                </div>
                <div className="cursor-pointer rounded-lg border border-border p-3 text-center hover:bg-muted">
                  <span className="mb-1 block text-xs font-bold">14:00</span>
                  <span className="text-[10px] text-muted-foreground">Disponivel</span>
                </div>
              </div>
              <Button className="w-full">Confirmar Agendamento</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
