import { motion } from 'framer-motion';
import { Icon } from '../../../ui/icon';

interface ReportsHeaderProps {
  onBack: () => void;
  totalGrupos: number;
  periodoInicio: string;
  periodoFim: string;
}

export function ReportsHeader({ onBack, totalGrupos, periodoInicio, periodoFim }: ReportsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <Icon name="arrow-left" className="size-4" />
        Voltar para Dashboard
      </button>
      <div className="flex items-center gap-3">
        <Icon name="stats-report" className="size-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Relatorios Gerais
          </h1>
          <p className="text-muted-foreground text-sm">
            Analise consolidada de {totalGrupos} grupos | {periodoInicio} ate {periodoFim}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
