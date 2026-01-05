/**
 * AvatarsSectionView
 * Design System - Avatars & Groups Showcase
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';

export function AvatarsSectionView() {
  return (
    <section className="space-y-8 border-t border-border pt-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
        Avatares & Grupos
      </h3>
      <div className="flex flex-wrap items-center gap-12 rounded-xl bg-muted/30 p-8">
        {/* Individual Avatars */}
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Avatar Group Showcase */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-muted-foreground">Times:</span>
            <AvatarGroup limit={3}>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>U4</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>U5</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-muted-foreground">Online:</span>
            <AvatarGroup limit={4} size="sm">
              <Avatar>
                <AvatarFallback className="bg-green-100 text-green-700">A</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700">B</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700">C</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-orange-100 text-orange-700">D</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
