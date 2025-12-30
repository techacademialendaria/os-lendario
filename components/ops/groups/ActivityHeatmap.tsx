import { useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { Icon } from '../../ui/icon';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActivityData {
  data_resumo: string;
  participantes_do_dia?: string;
  Sentimento?: string;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  weeks?: number;
  compact?: boolean;
  className?: string;
}

const getIntensityColor = (count: number, maxCount: number): string => {
  if (count === 0) return 'bg-muted/50';
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 'bg-emerald-200';
  if (ratio <= 0.5) return 'bg-emerald-300';
  if (ratio <= 0.75) return 'bg-emerald-400';
  return 'bg-emerald-500';
};

export default function ActivityHeatmap({
  data,
  weeks = 8,
  compact = false,
  className,
}: ActivityHeatmapProps) {
  const { grid, maxActivity, monthLabels, activeDaysCount, totalParticipations } = useMemo(() => {
    const today = new Date();
    const totalDays = weeks * 7;
    const startDate = startOfWeek(subDays(today, totalDays - 7), { weekStartsOn: 0 });

    // Build activity map
    const activityMap = new Map<string, { count: number; sentiment?: string }>();
    let totalParticipations = 0;

    data.forEach((record) => {
      if (!record.data_resumo) return;
      const dateKey = record.data_resumo;
      const participantCount = record.participantes_do_dia
        ? record.participantes_do_dia.split(',').filter((p) => p.trim()).length
        : 1;

      totalParticipations += participantCount;

      const existing = activityMap.get(dateKey);
      if (existing) {
        existing.count += participantCount;
      } else {
        activityMap.set(dateKey, { count: participantCount, sentiment: record.Sentimento });
      }
    });

    // Find max
    let maxActivity = 1;
    activityMap.forEach((v) => {
      if (v.count > maxActivity) maxActivity = v.count;
    });

    // Generate grid
    const grid: Array<Array<{
      date: Date;
      count: number;
      sentiment?: string;
      isToday: boolean;
      isFuture: boolean;
    }>> = [];

    const monthLabels: Array<{ label: string; weekIdx: number }> = [];
    let lastMonth = -1;

    for (let week = 0; week < weeks; week++) {
      const weekData: (typeof grid)[0] = [];

      for (let day = 0; day < 7; day++) {
        const currentDate = addDays(startDate, week * 7 + day);
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        const activity = activityMap.get(dateKey);
        const isToday = format(today, 'yyyy-MM-dd') === dateKey;
        const isFuture = currentDate > today;

        weekData.push({
          date: currentDate,
          count: activity?.count || 0,
          sentiment: activity?.sentiment,
          isToday,
          isFuture,
        });

        // Track months
        const currentMonth = currentDate.getMonth();
        if (day === 0 && currentMonth !== lastMonth) {
          monthLabels.push({
            label: format(currentDate, 'MMM', { locale: ptBR }),
            weekIdx: week,
          });
          lastMonth = currentMonth;
        }
      }

      grid.push(weekData);
    }

    return { grid, maxActivity, monthLabels, activeDaysCount: activityMap.size, totalParticipations };
  }, [data, weeks]);

  // Empty state
  if (data.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-6 text-center', className)}>
        <Icon name="calendar" className="size-6 text-muted-foreground/40 mb-2" />
        <p className="text-xs text-muted-foreground">Sem atividade</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Stats row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Icon name="activity" className="size-3 text-emerald-500" />
            <span className="font-medium">{activeDaysCount}</span>
            <span className="text-muted-foreground">dias</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="calendar" className="size-3 text-muted-foreground" />
            <span className="font-medium">{totalParticipations}</span>
            <span className="text-muted-foreground">part.</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span>-</span>
          {['bg-muted/50', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500'].map((c, i) => (
            <div key={i} className={cn('w-2 h-2 rounded-sm', c)} />
          ))}
          <span>+</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex text-[10px] text-muted-foreground font-medium">
        {monthLabels.map((m, i) => {
          const nextIdx = monthLabels[i + 1]?.weekIdx ?? weeks;
          const span = nextIdx - m.weekIdx;
          return (
            <div key={i} style={{ flex: span }} className="capitalize">
              {m.label}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <TooltipProvider delayDuration={0}>
        <div className="flex gap-1 justify-center">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <Tooltip key={di}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        'w-4 h-4 rounded-sm border border-border/40',
                        day.isFuture
                          ? 'bg-muted/20'
                          : getIntensityColor(day.count, maxActivity),
                        day.isToday && 'ring-1 ring-primary',
                        !day.isFuture && 'cursor-pointer hover:brightness-110'
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p className="font-medium">
                      {format(day.date, 'dd MMM yyyy', { locale: ptBR })}
                    </p>
                    {day.isFuture ? (
                      <p className="text-muted-foreground">Futuro</p>
                    ) : day.count > 0 ? (
                      <>
                        <p>{day.count} participações</p>
                        {day.sentiment && (
                          <p className="text-muted-foreground capitalize">{day.sentiment}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground">Sem atividade</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
