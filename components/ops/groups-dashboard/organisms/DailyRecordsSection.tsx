import React, { useMemo } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Select } from '../../../ui/select';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { Icon } from '../../../ui/icon';
import { motion } from 'framer-motion';
import { SentimentBadge } from '../molecules';
import { SENTIMENT_FILTER_OPTIONS } from '../types';
import type { DailyRecordsSectionProps, DailyRecordCardProps } from '../types';

export const DailyRecordsSection: React.FC<DailyRecordsSectionProps> = ({
  registros,
  filtroSentimento,
  onFiltroChange,
}) => {
  const registrosFiltrados = useMemo(
    () =>
      registros.filter(
        (r) => filtroSentimento === 'todos' || r.Sentimento?.toLowerCase() === filtroSentimento
      ),
    [registros, filtroSentimento]
  );

  return (
    <section className="space-y-6 pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Icon name="page" size="size-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Registros Diários</h2>
        </div>

        <div className="flex gap-3">
          <Select
            value={filtroSentimento}
            onValueChange={onFiltroChange}
            placeholder="Filtrar por sentimento"
            options={SENTIMENT_FILTER_OPTIONS}
            className="w-48 bg-card border-border"
          />
          <Badge
            variant="secondary"
            className="px-4 text-sm font-mono bg-muted text-foreground border-border h-10 flex items-center"
          >
            {registrosFiltrados.length} registros
          </Badge>
        </div>
      </div>

      {registrosFiltrados.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {registrosFiltrados.map((record, index) => (
            <DailyRecordCard key={record.id} record={record} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

const EmptyState: React.FC = () => (
  <Card className="rounded-3xl border-border">
    <CardContent className="py-16 text-center">
      <Icon name="page" className="size-16 text-muted-foreground/30 mx-auto mb-4" />
      <p className="text-lg font-semibold text-foreground mb-2">Nenhum registro encontrado</p>
      <p className="text-sm text-muted-foreground">
        Tente ajustar os filtros ou selecione outro grupo.
      </p>
    </CardContent>
  </Card>
);

const DailyRecordCard: React.FC<DailyRecordCardProps> = ({ record, index }) => {
  const participantes =
    record.participantes_do_dia
      ?.split(',')
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0) || [];
  const hasComplaints =
    record['reclamacao/queixas'] && record['reclamacao/queixas'].trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all flex flex-col h-full group">
        <CardContent className="p-6 space-y-6 flex-1 flex flex-col">
          {/* Header: Date & Badge */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-foreground font-bold text-lg group-hover:text-primary transition-colors">
              <Icon
                name="calendar"
                size="size-5"
                className="text-muted-foreground group-hover:text-primary/70"
              />
              {record.data_resumo}
            </div>
            <SentimentBadge sentiment={record.Sentimento || ''} />
          </div>

          {/* Participants */}
          {participantes.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <Icon name="users-alt" size="size-3" /> Participantes ({participantes.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {participantes.slice(0, 4).map((p: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-muted/50 font-normal text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {p}
                  </Badge>
                ))}
                {participantes.length > 4 && (
                  <Badge variant="secondary" className="bg-muted/50 font-normal text-xs">
                    +{participantes.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <Separator className="bg-border/50" />

          {/* Content Sections */}
          <div className="space-y-4 flex-1">
            <RecordSection icon="file-edit" title="Resumo" content={record.Resumo} />

            {record['Insights futuros'] && (
              <RecordSection icon="bulb" title="Insights" content={record['Insights futuros']} />
            )}

            {hasComplaints && (
              <div className="space-y-1 pt-2 p-3 bg-red-50/50 dark:bg-red-950/10 rounded-lg border border-red-100 dark:border-red-900/20">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                  <Icon name="exclamation-triangle" size="size-3" /> Reclamações
                </p>
                <p className="text-xs text-muted-foreground font-serif leading-relaxed italic">
                  {record['reclamacao/queixas']}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface RecordSectionProps {
  icon: string;
  title: string;
  content: string;
}

const RecordSection: React.FC<RecordSectionProps> = ({ icon, title, content }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-2">
      <Icon name={icon} size="size-3" /> {title}
    </p>
    <p className="text-sm text-foreground/80 font-serif leading-relaxed line-clamp-4 hover:line-clamp-none transition-all cursor-text">
      {content}
    </p>
  </div>
);
