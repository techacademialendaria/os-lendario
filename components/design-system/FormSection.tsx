import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { FileUpload } from '../ui/file-upload';
import { OTPInput } from '../ui/otp-input';
import { Rating } from '../ui/rating';
import { Calendar } from '../ui/calendar';
import { DatePicker } from '../ui/date-picker'; // New Import
import { AutosizeTextarea } from '../ui/autosize-textarea'; // New Import
import { Combobox } from '../ui/combobox';
import { FormField } from '../ui/form-field';

const FormSection: React.FC = () => {
  // State for interactive examples
  const [volume, setVolume] = useState(75);
  const [rating, setRating] = useState(4);
  const [date, setDate] = useState<Date>();
  const [chatMessage, setChatMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Formulários Avançados</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          De inputs nativos a componentes complexos de upload e verificação.
        </p>
      </div>

      {/* --- PRIMITIVES SHOWCASE --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Primitivos & Controles
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Texto & Area */}
          <div className="h-full space-y-6 rounded-xl border border-border bg-card p-6">
            <h4 className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <Icon name="text" size="size-4" /> Texto
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Input Padrão</Label>
                <Input placeholder="Digite algo..." />
              </div>
              <div className="space-y-2">
                <Label>Input com Ícone</Label>
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

          {/* Seleção */}
          <div className="h-full space-y-6 rounded-xl border border-border bg-card p-6">
            <h4 className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <Icon name="list-check" size="size-4" /> Seleção
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Dropdown</Label>
                <Select
                  options={[
                    { label: 'Opção 1', value: '1' },
                    { label: 'Opção 2', value: '2' },
                    { label: 'Opção 3', value: '3' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label>Combobox (Search)</Label>
                <Combobox
                  options={[
                    { label: 'React', value: 'react' },
                    { label: 'Vue', value: 'vue' },
                    { label: 'Angular', value: 'angular' },
                    { label: 'Svelte', value: 'svelte' },
                    { label: 'Next.js', value: 'next' },
                  ]}
                  placeholder="Selecione um framework..."
                />
              </div>
              <div className="space-y-3 pt-2">
                <Label>Radio Group</Label>
                <RadioGroup defaultValue="opt1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="opt1" id="r1" />
                    <Label htmlFor="r1" className="font-normal">
                      Opção A
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="opt2" id="r2" />
                    <Label htmlFor="r2" className="font-normal">
                      Opção B
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
                <Label>Avaliação (Rating)</Label>
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

      {/* --- AI CHAT INPUT (Autosize) --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Chat Input (Autosize)
        </h3>
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-4">
              <Label className="mb-2 block">Experimente digitar várias linhas...</Label>
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
                  <Icon name="arrow-up" size="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- NEW SECTION: CALENDAR PICKER --- */}
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
                <CardDescription>Selecione uma data para sua sessão com a IA.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Data Selecionada</Label>
                  <DatePicker date={date} setDate={setDate} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="cursor-pointer rounded-lg border border-primary bg-primary/5 p-3 text-center">
                    <span className="mb-1 block text-xs font-bold text-primary">09:00</span>
                    <span className="text-[10px] text-muted-foreground">Disponível</span>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border p-3 text-center hover:bg-muted">
                    <span className="mb-1 block text-xs font-bold">14:00</span>
                    <span className="text-[10px] text-muted-foreground">Disponível</span>
                  </div>
                </div>
                <Button className="w-full">Confirmar Agendamento</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* --- CENÁRIO: SECURITY CHECK --- */}
        <section className="space-y-8">
          <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
            Verificação de Segurança
          </h3>
          <Card className="max-w-md">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name="shield-check" size="size-6" />
              </div>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>
                Digite o código de 6 dígitos enviado para seu dispositivo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-4">
                <OTPInput length={6} onComplete={(code) => alert(`Código: ${code}`)} />
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" className="text-xs text-muted-foreground">
                Não recebeu? Reenviar código
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* --- CENÁRIO: MEDIA UPLOAD --- */}
        <section className="space-y-8">
          <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
            Upload de Mídia
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Anexar Documentos</CardTitle>
              <CardDescription>
                Faça upload de comprovantes ou imagens para o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Imagem de Capa</Label>
                <FileUpload accept="image/*" />
              </div>

              <div className="grid gap-2">
                <Label>Descrição do Arquivo</Label>
                <Textarea placeholder="Adicione notas sobre este anexo..." />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Enviar Arquivos</Button>
            </CardFooter>
          </Card>
        </section>

        {/* --- ACCESSIBILITY: VALIDATION --- */}
        <section className="space-y-8">
          <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
            ♿ Validação com Acessibilidade
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Exemplo: Email com aria-describedby</CardTitle>
              <CardDescription>
                Campo de email com validação que anuncia erros para screen readers via aria-describedby
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md space-y-4">
              <FormField
                label="Email"
                fieldId="form-email"
                error={emailError}
                description="Use um endereço de email válido"
                required
              >
                <Input
                  type="email"
                  placeholder="você@exemplo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value && !e.target.value.includes('@')) {
                      setEmailError('Email inválido');
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
      </div>

      {/* --- GUIDELINES --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Diretrizes de Formulários
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* DO'S */}
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Labels Visíveis</span>
                <p className="text-xs text-muted-foreground">
                  Sempre use labels visíveis acima do input. Placeholders desaparecem ao digitar e
                  prejudicam a acessibilidade.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Feedback Imediato</span>
                <p className="text-xs text-muted-foreground">
                  Valide campos (como email) assim que o usuário terminar de digitar (onBlur), não
                  apenas no submit.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Agrupamento Lógico</span>
                <p className="text-xs text-muted-foreground">
                  Agrupe campos relacionados (Endereço, Dados Pessoais) usando espaçamento ou
                  divisores sutis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DON'TS */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que não fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Formulários Longos</span>
                <p className="text-xs text-muted-foreground">
                  Evite formulários com mais de 5-7 campos em uma única etapa. Use Steppers ou Tabs
                  para dividir a carga cognitiva.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Botões Vagos</span>
                <p className="text-xs text-muted-foreground">
                  Evite "Enviar" genérico. Use "Criar Conta", "Atualizar Perfil", etc.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Placeholders como Label</span>
                <p className="text-xs text-muted-foreground">
                  Nunca use o placeholder como única instrução. Se o usuário esquecer o que está
                  digitando, terá que apagar o texto.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FormSection;
