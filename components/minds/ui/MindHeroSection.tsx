import React from 'react';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { HERO_SECTION_CLASSES } from '../studio-tokens';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { MindProfile } from '../../../hooks/useMind';

interface MindHeroSectionProps {
  mind: MindProfile;
  avatarSrc: string;
  onImageError: () => void;
  onEditClick: () => void;
  onEditSettingsClick: () => void;
  onDeleteClick: () => void;
  setSection: (s: Section) => void;
}

const tierColors: Record<number, string> = {
  1: 'bg-studio-primary text-white border-studio-primary shadow-[0_0_15px_rgba(48,176,199,0.3)]',
  2: 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(14,165,233,0.3)]',
  3: 'bg-zinc-700 text-zinc-300 border-zinc-600',
};

const statusConfig = {
  production: {
    label: 'OPERATIONAL',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: 'activity',
  },
  progress: {
    label: 'TRAINING',
    color: 'text-studio-primary',
    bg: 'bg-studio-primary/10',
    border: 'border-studio-primary/20',
    icon: 'zap',
  },
  draft: {
    label: 'OFFLINE',
    color: 'text-zinc-500',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
    icon: 'power',
  },
};

export const MindHeroSection: React.FC<MindHeroSectionProps> = ({
  mind,
  avatarSrc,
  onImageError,
  onEditClick,
  onEditSettingsClick,
  onDeleteClick,
  setSection,
}) => {
  const status = statusConfig[mind.status || 'draft'];

  // Calculate specific metrics
  const topProficiency = mind.proficiencies?.sort((a, b) => b.level - a.level)[0];
  const hasObsession = !!mind.obsession;

  return (
    <div className="relative overflow-hidden border-b border-studio-border bg-studio-bg">
      {/* Neural Data Stream Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,15,19,0.95),rgba(15,15,19,0.8)),url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow rounded-full bg-primary/10 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-studio-primary/5 blur-[100px]"></div>

      {/* Decorative Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10"></div>

      <div className="relative z-10 mx-auto max-w-[1400px] p-6 md:p-8">
        {/* Navigation & Status Header */}
        <div className="mb-8 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setSection(Section.APP_MINDS_GALLERY)}
                  className="flex transform cursor-pointer items-center gap-2 text-zinc-500 transition-colors duration-200 hover:scale-105 hover:text-white"
                >
                  <Icon name="grid" size="size-3" />
                  Galeria
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-700" />
              <BreadcrumbItem>
                <span className="font-semibold tracking-wide text-white">{mind.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* System Status Badge */}
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1 ${status.bg} ${status.border} backdrop-blur-md`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${status.color.replace('text', 'bg')} animate-pulse`}
            ></div>
            <span className={`text-[10px] font-bold tracking-widest ${status.color}`}>
              SYSTEM {status.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-10 lg:flex-row">
          {/* LEFT: Avatar & Identity */}
          <div className="flex min-w-[300px] flex-1 items-start gap-8">
            {/* Holographic Avatar Container */}
            <div className="group relative shrink-0">
              {/* Spinning Rings Effect */}
              <div className="absolute -inset-1 h-[136px] w-[136px] animate-[spin_10s_linear_infinite] rounded-full border border-studio-primary/30 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute -inset-2 h-[144px] w-[144px] animate-[spin_15s_linear_infinite_reverse] rounded-full border border-primary/20 opacity-0 transition-opacity group-hover:opacity-100"></div>

              <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-studio-border bg-zinc-900 shadow-2xl transition-colors duration-500 group-hover:border-studio-primary/50">
                <img
                  src={avatarSrc}
                  alt={mind.name}
                  className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  onError={onImageError}
                />
                {/* Glitch Overlay on Hover (simulated with gradient) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-studio-primary/20 bg-black/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-studio-primary backdrop-blur">
                ID: {mind.slug.substring(0, 6)}
              </div>
            </div>

            {/* Mind Identity Data */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
                    {mind.name}
                  </h1>
                  <Badge
                    className={`${tierColors[mind.tier]} rounded-sm border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest`}
                  >
                    Tier 0{mind.tier}
                  </Badge>
                </div>
                <p className="border-l-2 border-studio-primary/50 py-1 pl-4 font-serif text-lg italic text-zinc-400">
                  {mind.signatureSkill}
                </p>
              </div>

              {/* Active Obsession */}
              {mind.obsession && (
                <div className="flex max-w-[400px] items-center gap-2 overflow-hidden">
                  <Icon name="zap" size="size-3" className="shrink-0 text-studio-primary" />
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    <span className="cursor-default whitespace-nowrap transition-colors hover:text-white">
                      [{mind.obsession}]
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Vital Signs (Metrics) */}
          <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
            {/* APEX Score Module */}
            <div className="bg-studio-card group relative w-[160px] shrink-0 overflow-hidden rounded-lg border border-studio-border p-4 transition-colors hover:border-studio-primary/30">
              <div className="absolute right-0 top-0 p-1.5 opacity-50">
                <Icon
                  name="brain"
                  size="size-3"
                  className="text-zinc-600 group-hover:text-studio-primary"
                />
              </div>
              <div className="flex h-full flex-col justify-end">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Apex Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">
                    {mind.apexScore ? (mind.apexScore * 10).toFixed(1) : '--'}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-600">/100</span>
                </div>
                {/* Mini Progress Bar */}
                <div className="relative mt-3 h-0.5 w-full overflow-hidden bg-zinc-800">
                  <div
                    className="absolute left-0 top-0 h-full bg-studio-primary"
                    style={{ width: `${(mind.apexScore || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Knowledge Module */}
            <div className="bg-studio-card group relative w-[160px] shrink-0 overflow-hidden rounded-lg border border-studio-border p-4 transition-colors hover:border-studio-primary/30">
              <div className="absolute right-0 top-0 p-1.5 opacity-50">
                <Icon
                  name="database"
                  size="size-3"
                  className="text-zinc-600 group-hover:text-primary"
                />
              </div>
              <div className="flex h-full flex-col justify-end">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Neural Data
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{mind.sourcesCount}</span>
                  <span className="text-[10px] font-bold text-zinc-600">files</span>
                </div>
                <div className="relative mt-3 h-0.5 w-full overflow-hidden bg-zinc-800">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary"
                    style={{ width: `${Math.min(mind.sourcesCount, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Top Skill Module */}
            <div className="bg-studio-card group relative w-[180px] shrink-0 overflow-hidden rounded-lg border border-studio-border p-4 transition-colors hover:border-studio-primary/30">
              <div className="absolute right-0 top-0 p-1.5 opacity-50">
                <Icon
                  name="trophy"
                  size="size-3"
                  className="text-zinc-600 group-hover:text-blue-600"
                />
              </div>
              <div className="flex h-full flex-col justify-end">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Top Skill
                </span>
                <div
                  className="text-md truncate font-bold leading-tight text-white"
                  title={topProficiency?.skillName || 'N/A'}
                >
                  {topProficiency?.skillName || 'Learning...'}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${i < (topProficiency ? Math.ceil(topProficiency.level / 2) : 0) ? 'bg-blue-600' : 'bg-zinc-800'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-blue-500">
                    LVL {topProficiency?.level || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            <div className="ml-2 flex flex-col justify-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-studio-border bg-zinc-900/50 text-zinc-400 hover:border-studio-primary/30 hover:text-white"
                  >
                    <Icon name="settings" size="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] border-studio-border bg-black">
                  <DropdownMenuItem onClick={onEditSettingsClick} className="text-xs">
                    <Icon name="edit" className="mr-2 size-3" />
                    Editar Informações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEditClick} className="text-xs">
                    <Icon name="image" className="mr-2 size-3" />
                    Alterar Avatar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-studio-border" />
                  <DropdownMenuItem
                    onClick={onDeleteClick}
                    className="text-xs text-red-500 focus:text-red-500"
                  >
                    <Icon name="trash" className="mr-2 size-3" />
                    Deletar Mente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="icon"
                className="h-8 w-8 bg-studio-primary text-white shadow-[0_0_10px_rgba(255,188,2,0.2)] hover:bg-studio-primary/90"
              >
                <Icon name="play" size="size-4" type="solid" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindHeroSection;
