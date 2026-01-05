/**
 * BadgesSectionView
 * Design System - Badges & Tags Showcase
 */

import { Badge } from '@/components/ui/badge';

export function BadgesSectionView() {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Badges & Tags</h3>

      <div className="grid gap-6">
        {/* Semantic */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Semanticos
          </p>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Papeis (Roles)
          </p>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6">
            <Badge variant="admin">Admin</Badge>
            <Badge variant="editor">Editor</Badge>
            <Badge variant="viewer">Viewer</Badge>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Status
          </p>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6">
            <Badge variant="active">Active</Badge>
            <Badge variant="pending">Pending</Badge>
            <Badge variant="inactive">Inactive</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tamanhos
          </p>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6">
            <Badge size="sm" variant="outline">
              Small
            </Badge>
            <Badge size="default" variant="outline">
              Default
            </Badge>
            <Badge size="lg" variant="outline">
              Large
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
