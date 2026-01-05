import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ScrollArea } from '../../../ui/scroll-area';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';

interface MemberRankingItem {
  nome: string;
  participacoes: number;
  grupos: string[];
}

interface MembersTabProps {
  memberRanking: MemberRankingItem[];
}

function getMedalIcon(index: number) {
  if (index === 0) return <Icon name="trophy" className="size-5 text-amber-500" />;
  if (index === 1) return <Icon name="medal" className="size-5 text-gray-400" />;
  if (index === 2) return <Icon name="medal" className="size-5 text-amber-700" />;
  return <span className="w-5 h-5 flex items-center justify-center text-xs text-muted-foreground">{index + 1}</span>;
}

export function MembersTab({ memberRanking }: MembersTabProps) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="trophy" className="size-5 text-primary" />
          Ranking de Membros Mais Ativos
          <Badge variant="outline" className="ml-2">{memberRanking.length} membros</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Participacao consolidada em todos os grupos
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-2 pr-4">
            {memberRanking.slice(0, 50).map((member, index) => (
              <motion.div
                key={member.nome}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-colors",
                  index < 3 ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  {getMedalIcon(index)}
                  <div>
                    <span className="font-medium text-foreground">{member.nome}</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {member.grupos.slice(0, 3).map((grupo, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] rounded-full">
                          {grupo.length > 15 ? grupo.substring(0, 13) + '...' : grupo}
                        </Badge>
                      ))}
                      {member.grupos.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] rounded-full">
                          +{member.grupos.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="rounded-full bg-green-500/20 text-green-600 border-green-500/30 border">
                    {member.participacoes}x
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {member.grupos.length} grupo{member.grupos.length > 1 ? 's' : ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
