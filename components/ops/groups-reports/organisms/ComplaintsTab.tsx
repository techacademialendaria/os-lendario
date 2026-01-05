import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ScrollArea } from '../../../ui/scroll-area';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';

interface Complaint {
  grupo: string;
  data: string;
  sentimento?: string;
  texto: string;
}

interface ComplaintsTabProps {
  complaints: Complaint[];
}

export function ComplaintsTab({ complaints }: ComplaintsTabProps) {
  return (
    <Card className="rounded-3xl border-red-500/30 bg-red-50 dark:bg-red-950/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="warning-triangle" className="size-5 text-red-500" />
          Painel de Reclamacoes
          <Badge variant="destructive" className="ml-2">{complaints.length}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Todas as reclamacoes identificadas nos grupos
        </p>
      </CardHeader>
      <CardContent>
        {complaints.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Nenhuma reclamacao identificada
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {complaints.map((complaint, index) => (
                <motion.div
                  key={`${complaint.grupo}-${complaint.data}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 rounded-2xl border border-red-500/20 bg-card hover:border-red-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="outline" className="rounded-full text-xs">
                      {complaint.grupo}
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs bg-red-500/10 text-red-600 border-red-500/30">
                      <Icon name="calendar" className="size-3 mr-1" />
                      {complaint.data}
                    </Badge>
                    <Badge variant="outline" className={cn(
                      "rounded-full text-xs capitalize",
                      complaint.sentimento?.toLowerCase() === 'negativo' ? "bg-red-500/10 text-red-600 border-red-500/30" :
                      complaint.sentimento?.toLowerCase() === 'positivo' ? "bg-green-500/10 text-green-600 border-green-500/30" :
                      "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    )}>
                      {complaint.sentimento}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {complaint.texto}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
