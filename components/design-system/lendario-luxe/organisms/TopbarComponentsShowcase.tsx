/**
 * TopbarComponentsShowcase - Topbar components showcase
 * Note: Some components require app context (Section enum), showing simplified versions
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { TopbarLogo } from '@/components/books/topbar/molecules/TopbarLogo';

export const TopbarComponentsShowcase: React.FC = () => {
  return (
    <>
      {/* TopbarLogo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>TopbarLogo</CardTitle>
            <CardDescription>
              <code>components/books/topbar/molecules/TopbarLogo.tsx</code> — Logo com hover effect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <TopbarLogo onNavigate={() => {}} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation Pattern Reference */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Desktop Navigation Pattern</CardTitle>
            <CardDescription>
              <code>components/books/topbar/organisms/DesktopNavigation.tsx</code> — Links com indicador hairline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Padrão de navegação (requer Section enum)
              </p>
              <nav className="flex items-center gap-8 border-b border-border pb-4">
                {['Explorar', 'Autores', 'Meus Livros'].map((label, i) => (
                  <button
                    key={label}
                    className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                      i === 0
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {label}
                    {i === 0 && (
                      <div className="absolute -bottom-4 left-0 h-[2px] w-full bg-primary" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search Bar Pattern */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Search Bar Pattern</CardTitle>
            <CardDescription>
              <code>components/books/topbar/organisms/DesktopSearchBar.tsx</code> — Glow no focus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-primary/0 opacity-0 blur-xl transition-all duration-500 group-focus-within:bg-primary/10 group-focus-within:opacity-100" />
                <div className="relative flex items-center">
                  <svg
                    className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar livros..."
                    className="h-12 w-full rounded-xl border border-border bg-muted/30 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/30 focus:bg-muted/50"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mobile Navigation Pattern */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Mobile Navigation Pattern</CardTitle>
            <CardDescription>
              <code>components/books/topbar/organisms/MobileNavigation.tsx</code> — Bottom nav
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto max-w-sm">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Bottom navigation pattern
              </p>
              <div className="flex h-16 items-center justify-around rounded-xl border border-border bg-card/95">
                {[
                  { icon: 'book' as const, label: 'Explorar', active: true },
                  { icon: 'user' as const, label: 'Autores', active: false },
                  { icon: 'search' as const, label: 'Buscar', active: false },
                  { icon: 'bookmark' as const, label: 'Meus Livros', active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all ${
                      item.active ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size="size-5" />
                    <span className="text-[8px] font-black uppercase tracking-[0.15em]">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* User Menu Pattern */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>User Menu Pattern</CardTitle>
            <CardDescription>
              <code>components/books/topbar/organisms/DesktopUserMenu.tsx</code> — Avatar dropdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Usuário autenticado
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-border">
                  <img
                    src="/minds/james_clear.jpg"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">James Clear</p>
                  <p className="text-xs text-muted-foreground">james@example.com</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Não autenticado
              </p>
              <button className="h-10 rounded-xl bg-foreground px-6 text-[10px] font-black uppercase tracking-[0.2em] text-background transition-all hover:opacity-90">
                Entrar
              </button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
