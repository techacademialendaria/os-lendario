import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MediaCover, StarRating } from '@/components/shared';
import type { CourseSidebarProps } from '../types';

export function CourseSidebar({ course, onPlay }: CourseSidebarProps) {
  return (
    <div className="space-y-8 lg:col-span-4">
      {/* Cover Image Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-border shadow-2xl">
        <div className="relative aspect-[4/3]">
          <MediaCover image={course.cover} title={course.title} showTitle={!course.cover} />
          {course.cover && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="mb-2 bg-primary font-bold text-primary-foreground hover:bg-primary">
              Dev No-Code
            </Badge>
          </div>
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            onClick={onPlay}
          >
            <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-white pl-1 shadow-xl transition-transform group-hover:scale-110">
              <Icon name="play" className="text-2xl text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates & Badges */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Certificado
        </h4>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
            <Icon name="badge-check" size="size-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Certificado de Conclusao</p>
            <p className="text-xs text-muted-foreground">Complete 100% do curso</p>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="space-y-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Comunidade</h4>
        <p className="text-sm text-muted-foreground">
          Tire duvidas e faca networking com outros alunos no nosso Discord exclusivo.
        </p>
        <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10">
          Acessar Comunidade
        </Button>
      </div>

      {/* Testimonials */}
      <div className="space-y-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Depoimentos
          </h4>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
            <Icon name="star" size="size-3" /> 4.9
          </div>
        </div>

        <div className="space-y-5">
          {/* Review 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-border">
                  <AvatarFallback className="bg-muted text-[9px]">SL</AvatarFallback>
                </Avatar>
                <span className="text-xs font-bold text-foreground">Sarah Lima</span>
              </div>
              <span className="text-[10px] text-muted-foreground">2d atras</span>
            </div>
            <p className="font-serif text-xs leading-relaxed text-muted-foreground">
              "O modulo de banco de dados finalmente fez a ficha cair. Ja estou aplicando no meu
              projeto."
            </p>
            <StarRating value={5} size="sm" />
          </div>

          <Separator className="bg-border" />

          {/* Review 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-border">
                  <AvatarFallback className="bg-muted text-[9px]">MP</AvatarFallback>
                </Avatar>
                <span className="text-xs font-bold text-foreground">Marcos Paulo</span>
              </div>
              <span className="text-[10px] text-muted-foreground">1sem atras</span>
            </div>
            <p className="font-serif text-xs leading-relaxed text-muted-foreground">
              "A didatica e direto ao ponto. Sem enrolacao. O melhor investimento que fiz este ano."
            </p>
            <StarRating value={5} size="sm" />
          </div>
        </div>

        <Button
          variant="ghost"
          className="h-8 w-full border border-border text-xs text-muted-foreground hover:text-foreground"
        >
          Ver todos os 154 depoimentos
        </Button>
      </div>
    </div>
  );
}
