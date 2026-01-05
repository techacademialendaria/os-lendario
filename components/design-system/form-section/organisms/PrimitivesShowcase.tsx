/**
 * PrimitivesShowcase - Text inputs, selection controls, and basic form primitives
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { Icon } from '@/components/ui/icon';
import { Rating } from '@/components/ui/rating';
import { DatePicker } from '@/components/ui/date-picker';
import { Combobox } from '@/components/ui/combobox';
import { selectOptions, frameworkOptions } from '../data';

export const PrimitivesShowcase: React.FC = () => {
  const [volume, setVolume] = useState(75);
  const [rating, setRating] = useState(4);
  const [date, setDate] = useState<Date>();

  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Primitivos & Controles
      </h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Texto & Area */}
        <div className="h-full space-y-6 rounded-xl border border-border bg-card p-6">
          <h4 className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Icon name="edit" size="size-4" /> Texto
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Input Padrao</Label>
              <Input placeholder="Digite algo..." />
            </div>
            <div className="space-y-2">
              <Label>Input com Icone</Label>
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="size-4"
                />
                <Input className="pl-10" placeholder="Buscar..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date Picker (Interactive)</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
        </div>

        {/* Selecao */}
        <div className="h-full space-y-6 rounded-xl border border-border bg-card p-6">
          <h4 className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Icon name="check" size="size-4" /> Selecao
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Dropdown</Label>
              <Select options={selectOptions} />
            </div>
            <div className="space-y-2">
              <Label>Combobox (Search)</Label>
              <Combobox options={frameworkOptions} placeholder="Selecione um framework..." />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="opt1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="opt1" id="r1" />
                  <Label htmlFor="r1" className="font-normal">
                    Opcao A
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="opt2" id="r2" />
                  <Label htmlFor="r2" className="font-normal">
                    Opcao B
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="h-full space-y-6 rounded-xl border border-border bg-card p-6">
          <h4 className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Icon name="settings-sliders" size="size-4" /> Controles
          </h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>Toggle Switch</Label>
              <Switch />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Slider (Range)</Label>
                <span className="font-mono text-xs text-muted-foreground">{volume}%</span>
              </div>
              <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Avaliacao (Rating)</Label>
              <Rating value={rating} onValueChange={setRating} />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer font-normal">
                Checkbox simples
              </Label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
