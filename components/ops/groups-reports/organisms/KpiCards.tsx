import { motion } from 'framer-motion';
import { Card, CardContent } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { OpsGrid } from '../../ops-ui';

interface KpiCardsProps {
  totalRegistros: number;
  totalMembrosUnicos: number;
  positivos: number;
  negativos: number;
  complaintsCount: number;
}

export function KpiCards({
  totalRegistros,
  totalMembrosUnicos,
  positivos,
  negativos,
  complaintsCount,
}: KpiCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <OpsGrid columns={5}>
        <Card className="rounded-2xl border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Icon name="page" className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalRegistros}</p>
                <p className="text-xs text-muted-foreground">Registros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Icon name="group" className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalMembrosUnicos}</p>
                <p className="text-xs text-muted-foreground">Membros Unicos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-green-500/20 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-500/20">
                <Icon name="graph-up" className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{positivos}</p>
                <p className="text-xs text-muted-foreground">Positivos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/20">
                <Icon name="graph-down" className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{negativos}</p>
                <p className="text-xs text-muted-foreground">Negativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/20">
                <Icon name="warning-triangle" className="size-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{complaintsCount}</p>
                <p className="text-xs text-muted-foreground">Reclamacoes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </OpsGrid>
    </motion.div>
  );
}
