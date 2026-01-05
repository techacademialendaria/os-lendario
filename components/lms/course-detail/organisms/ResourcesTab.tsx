import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ResourcesTabProps } from '../types';

export function ResourcesTab({ resources }: ResourcesTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {resources.map((res) => (
        <div
          key={res.id}
          className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              <Icon name={res.icon} size="size-6" className={res.color} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {res.title}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-4 border-0 bg-muted text-[9px] text-muted-foreground"
                >
                  {res.type}
                </Badge>
                <span className="font-mono text-[10px] text-muted-foreground">{res.size}</span>
              </div>
            </div>
          </div>
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary">
              <Icon name={res.type === 'Link' ? 'external-link' : 'download'} size="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
