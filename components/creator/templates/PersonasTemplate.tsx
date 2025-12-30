import React, { useState, useEffect } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { GoogleGenAI, Type } from '@google/genai';
import { useToast } from '../../../hooks/use-toast';
import { ScrollArea } from '../../ui/scroll-area';
import { Skeleton } from '../../ui/skeleton';
import { STUDIO_KPI_CLASSES, STUDIO_CARD_CLASSES, STUDIO_GOLD_GRADIENT } from '../studio-tokens';
import { useAudienceProfiles, Persona } from '../../../hooks/useAudienceProfiles';

// PersonaData type for AI-generated personas (before saving to DB)
interface PersonaData {
  id: string;
  name: string;
  icon: string; // Icon name for Icon component (never use emojis)
  demographics: {
    age: string;
    role: string;
    income: string;
    location: string;
  };
  psychographics: {
    mindset: string;
    values: string[];
    fears: string[];
  };
  painPoints: {
    superficial: string;
    deep: string;
  }[];
  desires: {
    surface: string;
    hidden: string;
  }[];
  redFlags: string[];
  greenFlags: string[];
  definingQuote: string;
  createdAt: string;
}

const PersonasTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [view, setView] = useState<'list' | 'input' | 'processing' | 'result' | 'edit'>('list');
  const [inputText, setInputText] = useState('');
  const [currentPersona, setCurrentPersona] = useState<Persona | PersonaData | null>(null);
  const { toast } = useToast();

  // Fetch personas from database
  const { personas, loading, error, refetch, createPersona } = useAudienceProfiles();

  // --- ACTIONS ---

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setView('processing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const schema = {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          icon: { type: Type.STRING }, // Icon name: user, rocket, chart-line, laptop-code, sparkles, brain, etc.
          demographics: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.STRING },
              role: { type: Type.STRING },
              income: { type: Type.STRING },
              location: { type: Type.STRING },
            },
          },
          psychographics: {
            type: Type.OBJECT,
            properties: {
              mindset: { type: Type.STRING },
              values: { type: Type.ARRAY, items: { type: Type.STRING } },
              fears: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          painPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                superficial: { type: Type.STRING },
                deep: { type: Type.STRING },
              },
            },
          },
          desires: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                surface: { type: Type.STRING },
                hidden: { type: Type.STRING },
              },
            },
          },
          redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          greenFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          definingQuote: { type: Type.STRING },
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Crie uma Buyer Persona profunda baseada em: "${inputText}". Seja específico, criativo e use linguagem de marketing direto. Para o campo "icon", use um dos seguintes nomes: user, rocket, chart-line, laptop-code, sparkles, brain, briefcase, graduation-cap, lightbulb, target, star, users-alt.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.7,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        // Hydrate with ID and Date
        const newPersona: PersonaData = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        };
        setCurrentPersona(newPersona);
        setView('result');
      } else {
        throw new Error('Resposta vazia');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Falha ao gerar persona.', variant: 'destructive' });
      setView('input');
    }
  };

  const handleSave = async () => {
    if (!currentPersona) return;

    try {
      // Convert to database format
      const dbData = {
        slug: currentPersona.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
        name: currentPersona.name,
        description: currentPersona.definingQuote,
        demographics: {
          age_range: currentPersona.demographics.age,
          occupation: currentPersona.demographics.role,
          income: currentPersona.demographics.income,
          location: currentPersona.demographics.location,
        },
        psychographics: {
          mindset: currentPersona.psychographics.mindset,
          values: currentPersona.psychographics.values,
          fears: currentPersona.psychographics.fears,
          pain_points: currentPersona.painPoints.map((p) => p.superficial),
          goals: currentPersona.desires.map((d) => d.surface),
        },
        technical_level: 'intermediate' as const,
      };

      const result = await createPersona(dbData);

      if (result) {
        toast({
          title: 'Persona Salva',
          description: 'Dados salvos no banco de dados.',
          variant: 'success',
        });
        await refetch();
        setView('list');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      console.error('Error saving persona:', err);
      toast({ title: 'Erro', description: 'Falha ao salvar persona.', variant: 'destructive' });
    }
  };

  const handleEditField = (path: string, value: any) => {
    if (!currentPersona) return;

    // Deep update helper (simplified for 2 levels)
    const keys = path.split('.');
    if (keys.length === 1) {
      setCurrentPersona({ ...currentPersona, [keys[0]]: value });
    } else if (keys.length === 2) {
      setCurrentPersona({
        ...currentPersona,
        [keys[0]]: {
          ...(currentPersona as any)[keys[0]],
          [keys[1]]: value,
        },
      });
    }
  };

  // --- RENDERERS ---

  const renderList = () => {
    // Calculate KPI stats
    const totalPersonas = personas.length;
    const icpCount = personas.filter((p) => p.isIcp).length || (totalPersonas > 0 ? 1 : 0);
    const totalGreenFlags = personas.reduce((acc, p) => acc + p.greenFlags.length, 0);
    const totalRedFlags = personas.reduce((acc, p) => acc + p.redFlags.length, 0);
    const totalPainPoints = personas.reduce((acc, p) => acc + p.painPoints.length, 0);

    return (
      <div className="animate-fade-in space-y-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-sans text-2xl font-bold">Buyer Personas</h2>
            <p className="text-sm text-muted-foreground">
              Perfis psicográficos do seu público ideal para direcionar conteúdo e ofertas.
            </p>
          </div>
          <Button
            onClick={() => {
              setInputText('');
              setView('input');
            }}
            className="gap-2 bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-all hover:scale-105"
          >
            <Icon name="sparkles" size="size-4" /> Gerar com IA
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className={STUDIO_KPI_CLASSES}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-primary/10">
                  <Icon name="users-alt" size="size-5" className="text-studio-primary" />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{totalPersonas}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Personas Criadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={cn("bg-gradient-to-br", STUDIO_GOLD_GRADIENT, "border-studio-accent/20 rounded-xl")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-accent/10">
                  <Icon name="target" size="size-5" className="text-studio-accent" />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{icpCount}</p>
                  )}
                  <p className="text-xs text-muted-foreground">ICP Principal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={STUDIO_CARD_CLASSES}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Icon name="check-circle" size="size-5" className="text-emerald-400" />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{totalGreenFlags || totalPainPoints}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {totalGreenFlags > 0 ? 'Green Flags' : 'Pain Points'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={STUDIO_CARD_CLASSES}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <Icon name="cross-circle" size="size-5" className="text-red-400" />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {totalRedFlags || personas.reduce((acc, p) => acc + p.desires.length, 0)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {totalRedFlags > 0 ? 'Red Flags' : 'Desejos'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-1 w-full bg-muted" />
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-14" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="flex items-center gap-4 p-6">
              <Icon name="cross-circle" size="size-6" className="text-destructive" />
              <div>
                <p className="font-medium">Erro ao carregar personas</p>
                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-auto">
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Personas Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona, index) => (
              <Card
                key={persona.id}
                className={cn(STUDIO_CARD_CLASSES, "group cursor-pointer overflow-hidden transition-all hover:border-studio-primary/50")}
                onClick={() => {
                  setCurrentPersona(persona);
                  setView('result');
                }}
              >
                {/* Color Bar - first is gold (ICP), rest are primary */}
                <div
                  className={cn(
                    'h-1 w-full',
                    (persona.isIcp || index === 0) ? 'bg-studio-accent' : 'bg-studio-primary'
                  )}
                />
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-studio-primary/20 bg-studio-accent/5 shadow-inner"
                  >
                    <Icon
                      name={persona.icon as any}
                      size="size-6"
                      className="text-studio-primary"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <CardTitle className="truncate text-lg">{persona.name}</CardTitle>
                      {(persona.isIcp || index === 0) && (
                        <Badge
                          className="shrink-0 border-studio-accent/30 bg-studio-accent/10 text-[10px] text-studio-accent"
                        >
                          ICP
                        </Badge>
                      )}
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {persona.demographics.role}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p
                    className="line-clamp-2 border-l-2 border-studio-primary/30 pl-3 text-sm italic text-muted-foreground"
                  >
                    "{persona.definingQuote}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {persona.psychographics.values.slice(0, 3).map((v, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px]">
                        {v}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Icon name="flame" size="size-3" className="text-orange-400" />
                        {persona.painPoints.length} dores
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="star" size="size-3" className="text-emerald-400" />
                        {persona.desires.length} desejos
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-medium transition-colors group-hover:text-studio-primary">
                      Ver <Icon name="arrow-right" size="size-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Create New Persona Card */}
            <Button
              variant="ghost"
              onClick={() => {
                setInputText('');
                setView('input');
              }}
              className="group flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border/50 transition-all duration-300 hover:border-studio-primary/50 hover:bg-studio-primary/5 h-auto"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 text-muted-foreground transition-colors group-hover:bg-studio-primary/20 group-hover:text-studio-primary">
                <Icon name="plus" size="size-8" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground group-hover:text-studio-primary">
                Nova Persona
              </span>
              <span className="mt-1 text-xs text-muted-foreground/60 font-normal">Gerar com IA</span>
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && personas.length === 0 && (
          <Card className={cn(STUDIO_CARD_CLASSES, "border-dashed")}>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                <Icon name="users-alt" size="size-8" className="text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Nenhuma persona cadastrada</h3>
              <p className="mb-6 max-w-md text-sm text-muted-foreground">
                Crie sua primeira buyer persona para direcionar melhor seu conteúdo e ofertas.
              </p>
              <Button
                onClick={() => setView('input')}
                className="gap-2 bg-studio-primary text-white shadow-lg shadow-studio-primary/20"
              >
                <Icon name="sparkles" size="size-4" /> Criar Primeira Persona
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderEdit = () => {
    if (!currentPersona) return null;
    return (
      <div className="mx-auto max-w-4xl animate-fade-in pb-20">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setView('result')}>
            <Icon name="arrow-left" className="mr-2" /> Cancelar
          </Button>
          <h2 className="text-xl font-bold">Editando Persona</h2>
          <Button
            onClick={handleSave}
            className="bg-studio-accent text-studio-bg hover:opacity-90"
          >
            <Icon name="check" className="mr-2" size="size-4" /> Salvar Alterações
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Identity */}
          <Card className={STUDIO_CARD_CLASSES}>
            <CardHeader>
              <CardTitle className="text-base">Identidade</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome da Persona</Label>
                <Input
                  value={currentPersona.name}
                  onChange={(e) => handleEditField('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Ícone</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'user',
                    'rocket',
                    'chart-line',
                    'laptop-code',
                    'sparkles',
                    'brain',
                    'briefcase',
                    'graduation-cap',
                    'lightbulb',
                    'target',
                    'star',
                    'users-alt',
                  ].map((iconName) => (
                    <Button
                      key={iconName}
                      type="button"
                      variant="ghost"
                      onClick={() => handleEditField('icon', iconName)}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg border transition-all p-0',
                        currentPersona.icon === iconName
                          ? 'border-studio-primary bg-studio-primary/20 text-studio-primary'
                          : 'border-border/50 hover:border-studio-primary/50 hover:bg-muted/30'
                      )}
                    >
                      <Icon
                        name={iconName as any}
                        size="size-5"
                      />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Frase Definidora (Quote)</Label>
                <Input
                  value={currentPersona.definingQuote}
                  onChange={(e) => handleEditField('definingQuote', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card className={STUDIO_CARD_CLASSES}>
            <CardHeader>
              <CardTitle className="text-base">Demografia</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Idade</Label>
                <Input
                  value={currentPersona.demographics.age}
                  onChange={(e) => handleEditField('demographics.age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Cargo / Ocupação</Label>
                <Input
                  value={currentPersona.demographics.role}
                  onChange={(e) => handleEditField('demographics.role', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Renda Estimada</Label>
                <Input
                  value={currentPersona.demographics.income}
                  onChange={(e) => handleEditField('demographics.income', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input
                  value={currentPersona.demographics.location}
                  onChange={(e) => handleEditField('demographics.location', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Psychographics (Simple Text Areas for Arrays simplification in this demo) */}
          <Card className={STUDIO_CARD_CLASSES}>
            <CardHeader>
              <CardTitle className="text-base">
                Psicografia (Separar por vírgula para arrays)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mindset Dominante</Label>
                <AutosizeTextarea
                  value={currentPersona.psychographics.mindset}
                  onChange={(e) => handleEditField('psychographics.mindset', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Valores (Array)</Label>
                <Input
                  value={currentPersona.psychographics.values.join(', ')}
                  onChange={(e) =>
                    handleEditField(
                      'psychographics.values',
                      e.target.value.split(',').map((s) => s.trim())
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Medos (Array)</Label>
                <Input
                  value={currentPersona.psychographics.fears.join(', ')}
                  onChange={(e) =>
                    handleEditField(
                      'psychographics.fears',
                      e.target.value.split(',').map((s) => s.trim())
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_PERSONAS} setSection={setSection} />

      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col p-6 md:p-12">
        {/* --- VIEW SWITCHER --- */}
        {view === 'list' && renderList()}

        {view === 'edit' && renderEdit()}

        {/* --- INPUT VIEW --- */}
        {view === 'input' && (
          <div className="relative mx-auto flex w-full max-w-2xl flex-1 animate-fade-in flex-col items-center justify-center">
            <Button
              variant="ghost"
              className="absolute left-0 top-0"
              onClick={() => setView('list')}
            >
              <Icon name="arrow-left" className="mr-2" /> Voltar
            </Button>

            <div className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-xl">
              {/* Decorative Top Line */}
              <div
                className="absolute left-0 top-0 h-1 w-full bg-studio-primary"
              />

              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-studio-accent/20 text-studio-primary"
                >
                  <Icon name="magic-wand" size="size-5" />
                </div>
                <h3 className="text-lg font-bold">Quem é seu cliente ideal?</h3>
              </div>

              <AutosizeTextarea
                placeholder="Descreva seu cliente: idade, profissão, o que tira o sono dele, o que ele sonha..."
                className="min-h-[150px] resize-none border-border/50 bg-muted/20 p-4 text-base focus:border-studio-primary/50"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {['Executivos', 'Mães Solo', 'Freelancers', 'Gamers'].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-studio-primary/30 hover:bg-studio-primary/10 hover:text-studio-primary"
                      onClick={() => setInputText((prev) => prev + (prev ? ' ' : '') + tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!inputText.trim()}
                  className="bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-all hover:scale-105"
                >
                  <Icon name="sparkles" className="mr-2 size-4" /> Gerar Persona
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* --- PROCESSING VIEW --- */}
        {view === 'processing' && (
          <div className="flex flex-1 animate-fade-in flex-col items-center justify-center">
            <div className="relative mb-8 h-24 w-24">
              <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
              <div
                className="absolute inset-0 animate-spin rounded-full border-4 border-studio-primary border-t-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon
                  name="brain"
                  size="size-8"
                  className="animate-pulse text-studio-primary"
                />
              </div>
            </div>
            <h3 className="mb-2 font-sans text-xl font-bold">Criando Perfil Psicológico...</h3>
            <p className="text-muted-foreground">A IA está analisando padrões comportamentais.</p>
          </div>
        )}

        {/* --- RESULT VIEW (READ ONLY) --- */}
        {view === 'result' && currentPersona && (
          <div className="animate-fade-in space-y-6">
            {/* Header Profile */}
            <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-start">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-studio-primary/20 bg-studio-accent/10 shadow-inner"
              >
                <Icon
                  name={currentPersona.icon as any}
                  size="size-10"
                  className="text-studio-primary"
                />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <h2 className="font-sans text-2xl font-bold">{currentPersona.name}</h2>
                  <Badge
                    variant="outline"
                    className="mx-auto w-fit border-studio-primary/30 bg-studio-primary/10 text-studio-primary md:mx-0"
                  >
                    ICP Principal
                  </Badge>
                </div>
                <p
                  className="border-l-2 border-studio-primary/30 pl-4 text-lg italic leading-relaxed text-muted-foreground"
                >
                  "{currentPersona.definingQuote}"
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => setView('list')}>
                  <Icon name="arrow-left" className="mr-2 size-3" /> Voltar
                </Button>
                <Button variant="outline" size="sm" onClick={() => setView('edit')}>
                  <Icon name="pencil" className="mr-2 size-3" /> Editar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-studio-accent text-studio-bg hover:opacity-90"
                >
                  <Icon name="check" className="mr-2 size-3" /> Salvar
                </Button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Demographics */}
              <Card className={cn(STUDIO_CARD_CLASSES, "h-full")}>
                <CardHeader className="border-b border-border bg-muted/5 pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="id-card-clip-alt" size="size-4" /> Demografia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between border-b border-border/50 py-2">
                    <span className="text-sm text-muted-foreground">Idade</span>
                    <span className="text-sm font-semibold">{currentPersona.demographics.age}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 py-2">
                    <span className="text-sm text-muted-foreground">Ocupação</span>
                    <span className="max-w-[60%] text-right text-sm font-semibold">
                      {currentPersona.demographics.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 py-2">
                    <span className="text-sm text-muted-foreground">Renda</span>
                    <span className="text-sm font-semibold">
                      {currentPersona.demographics.income}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Local</span>
                    <span className="text-sm font-semibold">
                      {currentPersona.demographics.location}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Psychographics */}
              <Card className={cn(STUDIO_CARD_CLASSES, "h-full lg:col-span-2")}>
                <CardHeader className="border-b border-border bg-muted/5 pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="brain" size="size-4" /> Psicografia & Mindset
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8 p-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-studio-primary">
                      Valores Core
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentPersona.psychographics.values.map((val, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted font-normal">
                          {val}
                        </Badge>
                      ))}
                    </div>
                    <h4
                      className="mt-4 text-xs font-bold uppercase text-studio-primary"
                    >
                      Medos Secretos
                    </h4>
                    <ul className="space-y-1">
                      {currentPersona.psychographics.fears.map((fear, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Icon
                            name="cross-circle"
                            className="mt-1 shrink-0 text-destructive"
                            size="size-3"
                          />
                          {fear}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-lg border border-studio-primary/20 bg-studio-primary/10 p-4"
                  >
                    <h4
                      className="mb-2 text-xs font-bold uppercase text-studio-primary"
                    >
                      Pensamento Dominante (Loop)
                    </h4>
                    <p className="italic leading-relaxed text-foreground/80">
                      "{currentPersona.psychographics.mindset}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pain Points */}
              <Card className={cn(STUDIO_CARD_CLASSES, "h-full border-t-4 border-t-orange-500")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
                    <Icon name="flame" size="size-4" /> Dores (Inferno)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {currentPersona.painPoints.map((pain, i) => (
                    <div key={i} className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>{' '}
                        {pain.superficial}
                      </p>
                      <p className="border-l border-orange-500/20 pl-3.5 text-xs text-muted-foreground">
                        ↳ {pain.deep}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Desires */}
              <Card className={cn(STUDIO_CARD_CLASSES, "h-full border-t-4 border-t-emerald-500")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
                    <Icon name="star" size="size-4" /> Desejos (Céu)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {currentPersona.desires.map((desire, i) => (
                    <div key={i} className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{' '}
                        {desire.surface}
                      </p>
                      <p className="border-l border-emerald-500/20 pl-3.5 text-xs text-muted-foreground">
                        ↳ {desire.hidden}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Flags */}
              <Card className={cn(STUDIO_CARD_CLASSES, "h-full bg-muted/10")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="flag" size="size-4" /> Sinais de Compra
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-destructive">
                      <Icon name="cross-circle" size="size-3" /> Red Flags (Evitar)
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {currentPersona.redFlags.map((flag, i) => (
                        <li key={i}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-emerald-500">
                      <Icon name="check-circle" size="size-3" /> Green Flags (Focar)
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {currentPersona.greenFlags.map((flag, i) => (
                        <li key={i}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PersonasTemplate;
