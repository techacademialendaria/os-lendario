import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { StudentsTabProps, StudentStatus } from '../types';
import { getStatusStyle } from '../data';

export function StudentsTab({ students }: StudentsTabProps) {
  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-muted/20 p-3 sm:flex-row">
        <div className="relative w-full">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size="size-4"
          />
          <Input
            placeholder="Encontrar colega..."
            className="h-10 border-input bg-background pl-10 text-sm focus:border-primary/50"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Aluno</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Progresso</th>
                <th className="px-6 py-4 text-right font-medium tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => {
                const statusInfo = getStatusStyle(student.status as StudentStatus);
                return (
                  <tr key={student.id} className="group transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="cursor-pointer font-bold text-foreground transition-colors group-hover:text-primary">
                            {student.name}
                          </div>
                          <div className="text-xs text-muted-foreground">Aluno</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn('border text-[10px] font-bold uppercase', statusInfo.class)}
                      >
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="w-48 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Progress value={student.progress} className="h-1.5 bg-muted" />
                        <span className="w-8 text-right font-mono text-xs font-bold text-muted-foreground">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title="Enviar Mensagem"
                        >
                          <Icon name="envelope" size="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title="Ver Perfil"
                        >
                          <Icon name="user" size="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border bg-muted/10 p-4 text-center">
          <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground">
            Carregar mais colegas
          </Button>
        </div>
      </div>
    </div>
  );
}
