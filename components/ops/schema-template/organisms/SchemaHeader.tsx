import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface SchemaHeaderProps {
  tables: number;
  lastUpdated: string;
  criticalIssues: number;
  loading: boolean;
  onRefresh: () => void;
}

export const SchemaHeader: React.FC<SchemaHeaderProps> = ({
  tables,
  lastUpdated,
  criticalIssues,
  loading,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Database Health</h1>
          <Badge variant="outline" className="border-border bg-muted/20 font-mono text-xs">
            v3.0 Live
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Monitoring {tables} tables - Last updated {lastUpdated}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {criticalIssues > 0 && (
          <Badge variant="destructive" className="animate-pulse shadow-lg shadow-red-500/20">
            {criticalIssues} Critical Gaps
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={loading}
          className="h-9 w-9"
          title="Refresh Data"
        >
          <Icon
            name={loading ? "loader" : "refresh-cw"}
            size="size-4"
            className={loading ? "animate-spin" : ""}
          />
        </Button>
      </div>
    </div>
  );
};
