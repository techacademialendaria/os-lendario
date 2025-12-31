import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDType } from '../../../types/prd';
import { usePRDProjects } from '../../../hooks/prd/usePRDProjects';
import { PRD_PRIMARY, PRD_ACCENT, PRD_STATUS } from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDNewTemplateProps {
  setSection: (section: Section) => void;
}

// =============================================================================
// HELPERS
// =============================================================================

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// =============================================================================
// TYPE OPTIONS CONFIG
// =============================================================================

const TYPE_OPTIONS = {
  task: {
    icon: 'check-square',
    title: 'Tarefa Simples',
    description:
      'Algo pontual que precisa ser feito. Ideal para features isoladas, bugs ou melhorias pequenas.',
    time: '5-15 minutos',
  },
  project: {
    icon: 'folder',
    title: 'Projeto Completo',
    description:
      'Algo maior que requer planejamento estruturado. Ideal para novos produtos ou sistemas.',
    time: '30-60 minutos',
  },
} as const;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface TypeOptionProps {
  type: PRDType;
  selected: boolean;
  onSelect: () => void;
}

const TypeOption: React.FC<TypeOptionProps> = ({ type, selected, onSelect }) => {
  const config = TYPE_OPTIONS[type];

  return (
    <Card
      className={cn(
        'cursor-pointer border-2 transition-all duration-300 hover:shadow-lg',
        selected ? 'border-[#538096] bg-[#538096]/5' : 'border-border hover:border-[#538096]/50'
      )}
      onClick={onSelect}
    >
      <CardContent className="space-y-4 p-8">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-studio-accent text-studio-primary">
            <Icon name={config.icon} size="size-6" />
          </div>
          {selected && (
            <Icon name="check-circle" className="size-6 text-studio-primary" type="solid" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold">{config.title}</h4>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {config.time}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDNewTemplate: React.FC<PRDNewTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { createProject } = usePRDProjects();

  // State
  const [prdType, setPrdType] = useState<PRDType | null>(null);
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computed
  const slug = useMemo(() => generateSlug(name), [name]);
  const isValid = prdType !== null && name.length >= 3;

  // Handlers
  const handleCreate = async () => {
    if (!prdType || !name || name.length < 3) return;

    setIsCreating(true);
    setError(null);

    try {
      const project = await createProject({ name, prdType });
      if (project) {
        navigate(`/prd/${project.slug}`);
      } else {
        setError('Falha ao criar projeto. Tente novamente.');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Falha ao criar projeto. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    navigate('/prd');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <PRDTopbar currentSection={Section.STUDIO_PRD_NEW} setSection={setSection} />

      <main className="mx-auto w-full max-w-4xl flex-1 p-6 md:p-12">
        <div className="animate-fade-in space-y-12 pb-20">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">O que você quer criar?</h1>
            <p className="text-muted-foreground">
              Escolha o tipo de documentação que melhor se encaixa na sua necessidade
            </p>
          </div>

          {/* Type Selection */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TypeOption
              type="task"
              selected={prdType === 'task'}
              onSelect={() => setPrdType('task')}
            />
            <TypeOption
              type="project"
              selected={prdType === 'project'}
              onSelect={() => setPrdType('project')}
            />
          </div>

          {/* Name Input (appears after selection) */}
          {prdType && (
            <Card className="animate-fade-in">
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">
                    Nome {prdType === 'task' ? 'da Tarefa' : 'do Projeto'}
                  </Label>
                  <Input
                    id="project-name"
                    placeholder={
                      prdType === 'task'
                        ? 'Ex: Corrigir bug no login'
                        : 'Ex: Sistema de Autenticação'
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  {name.length > 0 && name.length < 3 && (
                    <p className="text-xs text-destructive">
                      Nome deve ter pelo menos 3 caracteres
                    </p>
                  )}
                </div>
                {name.length >= 3 && (
                  <p className="text-xs text-muted-foreground">
                    Slug: <code className="rounded bg-muted px-1.5 py-0.5">{slug}</code>
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <Icon name="exclamation" size="size-4" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 border-t border-border pt-8">
            <Button variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!isValid || isCreating}
              className={
                isValid && !isCreating ? 'bg-studio-primary hover:bg-studio-primary/90' : ''
              }
            >
              {isCreating ? (
                <>
                  <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  Continuar
                  <Icon name="arrow-right" className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PRDNewTemplate;
