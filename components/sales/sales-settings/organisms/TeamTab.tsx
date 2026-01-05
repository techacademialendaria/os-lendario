import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TeamMember } from '../types';

interface TeamTabProps {
  team: TeamMember[];
}

export const TeamTab: React.FC<TeamTabProps> = ({ team }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Consultores Ativos</CardTitle>
        <Button size="sm" className="gap-2">
          <Icon name="plus" size="size-3" /> Adicionar Consultor
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Consultor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Calls (Mes)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Acoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((member, i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{member.name}</span>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {member.email}
              </TableCell>
              <TableCell className="font-mono text-sm">{member.calls}</TableCell>
              <TableCell>
                <Switch checked={member.active} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="pencil" size="size-3" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
