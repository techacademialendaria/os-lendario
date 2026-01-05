import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { teamKPIs, teamMembers, filterOptions } from '../data';
import { PERMISSION_STYLES } from '../types';

export const TeamManagementView: React.FC = () => {
  return (
    <section className="space-y-6 border-t border-border pt-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="font-sans text-2xl font-bold">Gestão de Times</h3>
          <p className="text-sm text-muted-foreground">
            Layout administrativo completo adaptado ao Design System (Cards & Tabela).
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {teamKPIs.map((kpi) => (
          <Card key={kpi.label} className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${kpi.iconBgColor} ${kpi.iconTextColor}`}
              >
                <Icon name={kpi.icon} size="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {kpi.label}
                </p>
                {kpi.sublabel && (
                  <p className="mb-1 text-[10px] text-muted-foreground/70">{kpi.sublabel}</p>
                )}
                <p className="font-sans text-3xl font-bold text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm lg:flex-row">
        <div className="relative w-full lg:w-96">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size="size-4"
          />
          <Input className="pl-10" placeholder="Buscar por nome ou email..." />
        </div>
        <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
          <Select placeholder="Todas as permissões" options={filterOptions.permissions} className="w-48" />
          <Select placeholder="Todos os times" options={filterOptions.teams} className="w-40" />
          <Select placeholder="Todos" options={filterOptions.status} className="w-32" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table className="whitespace-nowrap">
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Skills Principais</TableHead>
                <TableHead>Permissão</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/20">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className={`${member.avatarColor} text-white`}>
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{member.name}</span>
                        {member.hasCheckin && (
                          <span className="mt-0.5 flex w-fit items-center gap-1 rounded bg-brand-green/10 px-1.5 text-[10px] text-brand-green">
                            <Icon name="user" size="size-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{member.city}</TableCell>
                  <TableCell>
                    <Badge variant={member.specialtyVariant} className="font-normal">
                      {member.specialty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.skills.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">Sem skills</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={PERMISSION_STYLES[member.permission].variant}
                      className={`gap-1 ${PERMISSION_STYLES[member.permission].className || ''} ${member.permission === 'participant' ? 'font-normal text-muted-foreground' : ''}`}
                    >
                      <Icon name={PERMISSION_STYLES[member.permission].icon} size="size-3" />
                      {PERMISSION_STYLES[member.permission].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.team ? (
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="users-alt" size="size-3" /> {member.team}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm opacity-50">
                        <Icon name="user-delete" size="size-3" /> Sem time
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Icon name="menu-dots" />
                        </Button>
                      }
                    >
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem destructive>Remover</DropdownMenuItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
