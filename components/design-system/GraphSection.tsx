import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

// --- DATA TYPES ---
interface Node {
  id: string;
  x: number;
  y: number;
  label?: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  val?: number; // Importance
}

interface Link {
  source: string;
  target: string;
  weight?: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

// --- UTILS ---
const generateNetwork = (nodeCount: number): GraphData => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Center Node
  nodes.push({ id: '0', x: 50, y: 50, label: 'LENDÁR[IA]', type: 'primary', val: 10 });

  for (let i = 1; i < nodeCount; i++) {
    nodes.push({
      id: i.toString(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      label: `Node ${i}`,
      type: Math.random() > 0.8 ? 'secondary' : 'tertiary',
      val: Math.random() * 5 + 2,
    });
  }

  // Create Connections (Proximity based simplified)
  nodes.forEach((node, i) => {
    // Connect to center sometimes
    if (i > 0 && Math.random() > 0.7) {
      links.push({ source: node.id, target: '0', weight: 1 });
    }

    // Connect to random neighbors
    nodes.forEach((target, j) => {
      if (i !== j) {
        const dist = Math.sqrt(Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2));
        if (dist < 15) {
          // Threshold for connection
          links.push({ source: node.id, target: target.id, weight: 1 });
        }
      }
    });
  });

  return { nodes, links };
};

const generateRadialTree = (): GraphData => {
  const categories = ['Estratégia', 'Tecnologia', 'Cultura', 'Marketing'];
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Center
  nodes.push({ id: 'core', x: 50, y: 50, label: 'CORE', type: 'primary', val: 10 });

  categories.forEach((cat, i) => {
    // Level 1: Categories (Circle)
    const angle = (i / categories.length) * 2 * Math.PI;
    const r1 = 20;
    const catX = 50 + r1 * Math.cos(angle);
    const catY = 50 + r1 * Math.sin(angle);
    const catId = `cat-${i}`;

    nodes.push({ id: catId, x: catX, y: catY, label: cat, type: 'secondary', val: 7 });
    links.push({ source: 'core', target: catId });

    // Level 2: Topics
    for (let j = 0; j < 3; j++) {
      const subAngle = angle + (j - 1) * 0.5;
      const r2 = 35;
      const subX = 50 + r2 * Math.cos(subAngle);
      const subY = 50 + r2 * Math.sin(subAngle);
      const subId = `sub-${i}-${j}`;
      nodes.push({ id: subId, x: subX, y: subY, label: `Item ${j + 1}`, type: 'tertiary', val: 3 });
      links.push({ source: catId, target: subId });
    }
  });

  return { nodes, links };
};

// --- VISUALIZATION COMPONENTS ---

// 1. NEURAL NETWORK GRAPH (Canvas Simulation with SVG)
const NeuralGraph: React.FC = () => {
  const [data] = useState(() => generateNetwork(40));
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Filter highlights
  const activeLinks = useMemo(() => {
    if (!hoveredNode) return [];
    return data.links.filter((l) => l.source === hoveredNode || l.target === hoveredNode);
  }, [hoveredNode, data.links]);

  const activeNodes = useMemo(() => {
    // FIX: Ensure we always return a Set, never an array
    if (!hoveredNode) return new Set<string>();

    const neighbors = new Set<string>();
    neighbors.add(hoveredNode);
    activeLinks.forEach((l) => {
      neighbors.add(l.source);
      neighbors.add(l.target);
    });
    return neighbors;
  }, [hoveredNode, activeLinks]);

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur">
          Neural Map
        </Badge>
      </div>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          const isActive = activeLinks.includes(link);
          const isDimmed = hoveredNode && !isActive;

          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="currentColor"
              strokeWidth={isActive ? 0.5 : 0.1}
              className={cn(
                'transition-all duration-300',
                isActive ? 'text-primary opacity-100' : 'text-muted-foreground',
                isDimmed ? 'opacity-10' : 'opacity-30'
              )}
            />
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node) => {
          const isActive = hoveredNode === node.id || activeNodes.has(node.id);
          const isDimmed = hoveredNode && !isActive;

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.1 : 1 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === 'primary' ? 3 : isActive ? 2 : 1}
                className={cn(
                  'transition-all duration-300',
                  node.type === 'primary'
                    ? 'fill-primary'
                    : isActive
                      ? 'fill-foreground'
                      : 'fill-muted-foreground'
                )}
              />
              {/* Label only on hover or primary */}
              {(node.type === 'primary' || isActive) && (
                <text
                  x={node.x}
                  y={node.y - 4}
                  textAnchor="middle"
                  className={cn(
                    'fill-foreground font-sans text-[3px] font-bold transition-all',
                    node.type === 'primary' ? 'uppercase tracking-widest' : ''
                  )}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 2. RADIAL MIND MAP (Tree Structure)
const RadialGraph: React.FC = () => {
  const [data] = useState(() => generateRadialTree());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur">
          Radial Taxonomy
        </Badge>
      </div>

      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Concentric Guides */}
        <circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-dasharray-1 fill-none stroke-border stroke-[0.2]"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          className="stroke-dasharray-1 fill-none stroke-border stroke-[0.2]"
        />

        {/* Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          return (
            <path
              key={i}
              d={`M${source.x},${source.y} L${target.x},${target.y}`}
              className="fill-none stroke-muted-foreground/30 stroke-[0.3]"
            />
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node) => {
          let colorClass = 'fill-muted-foreground';
          if (node.type === 'primary') colorClass = 'fill-primary';
          if (node.type === 'secondary') {
            // Color based on index roughly
            const idx = parseInt(node.id.split('-')[1]) || 0;
            const colors = [
              'fill-brand-blue',
              'fill-brand-green',
              'fill-brand-red',
              'fill-brand-yellow',
            ];
            colorClass = colors[idx % colors.length];
          }

          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === 'primary' ? 6 : node.type === 'secondary' ? 3 : 1.5}
                className={cn(
                  'stroke-background stroke-2 transition-all duration-300',
                  colorClass,
                  isHovered ? 'scale-125' : 'scale-100'
                )}
              />
              {/* Text Background for readability */}
              <text
                x={node.x}
                y={node.y + (node.type === 'primary' ? 1.5 : 5)}
                textAnchor="middle"
                className="stroke-background stroke-[0.5] font-sans text-[2.5px] font-bold opacity-80"
              >
                {node.label}
              </text>
              {/* Actual Text */}
              <text
                x={node.x}
                y={node.y + (node.type === 'primary' ? 1.5 : 5)}
                textAnchor="middle"
                className={cn(
                  'pointer-events-none fill-foreground font-sans text-[2.5px] font-bold',
                  node.type === 'primary' ? 'text-[3px]' : ''
                )}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 3. DARK MODE CONCEPT MAP (Obsidian Style)
const ObsidianGraph: React.FC = () => {
  const [data] = useState(() => generateNetwork(25));

  // Auto-drift animation simulation (very simplified)
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-white shadow-inner">
      <div className="absolute left-4 top-4 z-10">
        <Badge
          variant="outline"
          className="border-brand-indigo/50 bg-brand-indigo/5 text-brand-indigo"
        >
          Digital Brain
        </Badge>
      </div>

      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background Grid */}
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.05" opacity="0.1" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Dynamic Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              className="stroke-brand-indigo"
              strokeWidth="0.15"
              strokeOpacity="0.4"
            />
          );
        })}

        {/* Nodes with Glow */}
        {data.nodes.map((node, i) => (
          <g
            key={node.id}
            transform={`translate(${Math.sin((offset + i * 10) * 0.05) * 0.5}, ${Math.cos((offset + i * 10) * 0.05) * 0.5})`}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'primary' ? 2 : 1}
              className={cn(
                'fill-brand-indigo',
                node.type === 'primary' ? 'fill-brand-indigo' : 'fill-white'
              )}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'primary' ? 4 : 2}
              className="animate-pulse fill-brand-indigo opacity-20"
            />
            {node.type === 'primary' && (
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="fill-white font-mono text-[3px] opacity-80"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

const GraphSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Grafos & Redes</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Visualização de dados relacionais complexos. Nossos grafos seguem a regra de{' '}
          <strong>densidade elegante</strong>: mostrar a complexidade sem perder a clareza.
        </p>
      </div>

      {/* --- Section 1: Network --- */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
              <Icon name="network" /> Rede Neural
            </h3>
            <p className="text-sm text-muted-foreground">
              Para visualização de comunidades, conexões de usuários ou clusters de dados não
              hierárquicos.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="refresh" className="mr-2" /> Recalcular
            </Button>
            <Button size="sm">
              <Icon name="expand" className="mr-2" /> Fullscreen
            </Button>
          </div>
        </div>

        <NeuralGraph />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Interatividade</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Hover nos nós destaca vizinhos imediatos e esmaece o restante (Focus Mode).
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Cores</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Use <span className="font-bold text-primary">Primary</span> para hubs centrais e tons
              monocromáticos para nós periféricos.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Uso Recomendado</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Mapas de stakeholders, sugestões de conexão e análise de influenciadores.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- Section 2: Radial --- */}
      <section className="space-y-6 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
          <Icon name="target" /> Taxonomia Radial
        </h3>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <RadialGraph />
          </div>
          <div className="order-1 space-y-6 md:order-2">
            <p className="font-serif text-lg leading-relaxed text-muted-foreground">
              A visualização radial é ideal para <strong>hierarquias profundas</strong> onde o
              contexto central é vital. Diferente da árvore tradicional, ela aproveita melhor o
              espaço em telas retangulares.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-brand-blue"></div>
                <span className="text-sm font-bold">Categoria A: Tecnologia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-brand-green"></div>
                <span className="text-sm font-bold">Categoria B: Negócios</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-brand-red"></div>
                <span className="text-sm font-bold">Categoria C: Pessoas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Dark Mode / Obsidian --- */}
      <section className="space-y-6 border-t border-border pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-12">
          {/* Background gradient hint */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-indigo/20 blur-[100px]"></div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ObsidianGraph />
            </div>
            <div className="flex flex-col justify-center space-y-6 text-white">
              <h3 className="bg-gradient-to-r from-white to-white/50 bg-clip-text font-sans text-3xl font-bold text-transparent">
                Cérebro Digital
              </h3>
              <p className="font-serif leading-relaxed text-white/70">
                O estilo "Second Brain". Fundo escuro profundo para reduzir a fadiga visual em
                análises prolongadas de dados complexos.
              </p>
              <ul className="space-y-3 font-mono text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Icon name="check" className="text-brand-indigo" /> Alto Contraste
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="text-brand-indigo" /> Efeito Glow (Neon)
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="text-brand-indigo" /> Animação "Drift"
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-fit border-white/20 text-white hover:bg-white/10"
              >
                Explorar Dataset
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphSection;
