import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { OPS_CARD_CLASSES } from '../../ops-tokens';
import type { DbPolicy } from '@/hooks/useSchema';

interface PoliciesTabProps {
  policies: DbPolicy[];
  loading: boolean;
}

export const PoliciesTab: React.FC<PoliciesTabProps> = ({ policies, loading }) => {
  return (
    <TabsContent value="policies" className="space-y-6">
      <Card className={OPS_CARD_CLASSES}>
        <CardHeader className="border-b border-border/50 pb-3">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between items-center">
            <span>Active Security Policies (RLS)</span>
            <Badge variant="outline" className="text-[10px] font-mono">
              {policies.length} Policies Detected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/5">
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Table</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Policy Name</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Cmd</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Roles</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Using/Check</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-muted-foreground italic">
                      {loading ? 'Loading policies...' : 'No RLS policies found in public schema.'}
                    </td>
                  </tr>
                ) : (
                  policies.map((policy, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors group">
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono text-emerald-400 group-hover:text-emerald-300">{policy.table_name}</code>
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground/90">{policy.policy_name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className={cn(
                          "text-[10px] px-1.5 py-0",
                          policy.command === 'SELECT' && "bg-blue-500/10 text-blue-400",
                          policy.command === 'INSERT' && "bg-green-500/10 text-green-400",
                          policy.command === 'UPDATE' && "bg-amber-500/10 text-amber-400",
                          policy.command === 'DELETE' && "bg-red-500/10 text-red-400",
                          policy.command === 'ALL' && "bg-purple-500/10 text-purple-400"
                        )}>
                          {policy.command}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-muted-foreground">{policy.roles}</span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="space-y-1">
                          {policy.using_expression && (
                            <div className="flex gap-2 items-start">
                              <span className="text-[10px] font-bold text-muted-foreground mt-0.5">USING</span>
                              <code className="text-[10px] font-mono text-muted-foreground/70 bg-muted/20 px-1 rounded block truncate max-w-[300px]" title={policy.using_expression}>
                                {policy.using_expression}
                              </code>
                            </div>
                          )}
                          {policy.with_check_expression && (
                            <div className="flex gap-2 items-start">
                              <span className="text-[10px] font-bold text-muted-foreground mt-0.5">CHECK</span>
                              <code className="text-[10px] font-mono text-muted-foreground/70 bg-muted/20 px-1 rounded block truncate max-w-[300px]" title={policy.with_check_expression}>
                                {policy.with_check_expression}
                              </code>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge className={cn(
                          "text-[10px] px-2 py-0",
                          policy.is_enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {policy.is_enabled ? 'ENABLED' : 'DISABLED'}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Security Best Practices Tip */}
      <div className="p-4 rounded-xl border-l-4 shadow-sm" style={{ borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)' }}>
        <div className="flex items-start gap-3">
          <Icon name="info" size="size-4" className="text-emerald-400 mt-1" />
          <div>
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">RLS Governance</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Row Level Security (RLS) is active for most tables in MMOS to ensure that users can only access data belonging to their own <code className="text-emerald-400/80">user_id</code>.
              Tables marked as <strong>ENABLED</strong> enforce these rules at the database engine level, preventing accidental data leakage even if application logic fails.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
