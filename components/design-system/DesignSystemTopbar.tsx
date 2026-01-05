import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../ui/icon';
import { Button } from '../ui/button';
import { DropdownNav, type NavCategory } from '../shared/module';
import { DS_PRIMARY, DS_ACCENT, DS_THEME } from './design-system-tokens';
import { cn } from '../../lib/utils';

// =============================================================================
// NAVIGATION STRUCTURE
// =============================================================================

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Visão Geral',
    icon: 'home',
    items: [{ label: 'Conceito', path: '/design/concept' }],
  },
  {
    label: 'Identidade & Marca',
    icon: 'fingerprint',
    items: [
      { label: 'Identidade', path: '/design/identity' },
      { label: 'Lendário vs Medíocre', path: '/design/legendary-vs-mediocre' },
      { label: '✨ Lendário Luxe', path: '/design/lendario-luxe' },
    ],
  },
  {
    label: 'Tokens',
    icon: 'cube',
    items: [
      { label: 'Cores & Temas', path: '/design/colors' },
      { label: 'Tipografia', path: '/design/typography' },
      { label: 'Espaçamentos', path: '/design/spacing' },
      { label: 'Ícones', path: '/design/icons' },
      { label: 'Motion', path: '/design/motion' },
    ],
  },
  {
    label: 'Biblioteca UI',
    icon: 'layout-fluid',
    items: [
      { label: 'Botões', path: '/design/buttons' },
      { label: 'Componentes Básicos', path: '/design/components' },
      { label: 'Cards & Boxes', path: '/design/cards' },
      { label: 'Formulários', path: '/design/forms' },
      { label: 'Tabelas', path: '/design/tables' },
      { label: 'Listas', path: '/design/lists' },
      { label: 'Estados & Loading', path: '/design/states' },
      { label: 'Feedback', path: '/design/feedback' },
      { label: 'Interações Avançadas', path: '/design/advanced' },
      { label: 'Grafos (Redes)', path: '/design/graphs' },
      { label: 'Charts (KPIs)', path: '/design/charts' },
    ],
  },
  {
    label: 'Templates & Páginas',
    icon: 'browser',
    subcategories: [
      {
        label: 'SaaS / App',
        items: [
          { label: 'CMS / Blog Manager', path: '/design/templates/cms' },
          { label: 'Kanban / Projetos', path: '/design/templates/kanban' },
          { label: 'Configurações / Perfil', path: '/design/templates/settings' },
          { label: 'Sidebar (Legacy)', path: '/design/templates/sidebar-legacy' },
        ],
      },
      {
        label: 'Marketing Templates',
        items: [
          { label: 'Guia de Copywriting', path: '/marketing/guide' },
          { label: 'Landing Page', path: '/marketing/landing' },
          { label: 'Advertorial', path: '/marketing/advertorial' },
          { label: 'Página de Vendas', path: '/marketing/sales-page' },
          { label: 'Baixar Ebook', path: '/marketing/ebook' },
          { label: 'Página VSL (Vídeo)', path: '/marketing/vsl' },
          { label: 'Registro Webinário', path: '/marketing/webinar' },
          { label: 'Obrigado / Upsell', path: '/marketing/thank-you' },
        ],
      },
      {
        label: 'Comunidade Lendária',
        items: [
          { label: 'Captura Comunidade', path: '/community/capture' },
          { label: 'Advertorial Comunidade', path: '/community/advertorial' },
          { label: 'PV Comunidade', path: '/community/sales' },
          { label: 'VSL Comunidade', path: '/community/vsl' },
          { label: 'Sequência de Emails', path: '/community/emails' },
        ],
      },
    ],
  },
  {
    label: 'Documentação',
    icon: 'book-alt',
    items: [
      { label: 'Tokens (CSS Variables)', path: '/docs/tokens' },
      { label: 'Docs Técnica', path: '/docs/general' },
      { label: 'Manual para IA', path: '/docs/ai-manual' },
    ],
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

const DesignSystemTopbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Find current page label from categories
  const getCurrentLabel = (): string => {
    for (const category of NAV_CATEGORIES) {
      if (category.items) {
        const item = category.items.find((i) => location.pathname === i.path);
        if (item) return item.label;
      }
      if (category.subcategories) {
        for (const sub of category.subcategories) {
          const item = sub.items.find((i) => location.pathname === i.path);
          if (item) return item.label;
        }
      }
    }
    return DS_THEME.name;
  };

  return (
    <div className="sticky top-0 z-40 h-16 w-full border-b border-border bg-card font-sans shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md border font-bold shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              style={{
                backgroundColor: `${DS_PRIMARY}20`,
                borderColor: `${DS_PRIMARY}50`,
                color: DS_PRIMARY,
              }}
            >
              <Icon name={DS_THEME.icon} size="size-5" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight">{DS_THEME.name}</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {getCurrentLabel()}
              </p>
            </div>
          </div>

          {/* Navigation: Dropdown centered */}
          <div className="hidden items-center gap-1 lg:flex">
            <DropdownNav categories={NAV_CATEGORIES} primaryColor={DS_PRIMARY} />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/design/concept')}
            className="relative text-muted-foreground hover:text-foreground"
            style={{
              color: 'currentColor',
            }}
          >
            <Icon name="bell" size="size-5" />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: DS_PRIMARY }}
            ></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemTopbar;
