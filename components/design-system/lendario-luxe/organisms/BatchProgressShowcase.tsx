/**
 * BatchProgressShowcase - BatchHeader, BatchProgressBar, BatchEmptyState, BatchCompletionCard
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BatchHeader } from '@/components/books/batch-progress/organisms/BatchHeader';
import { BatchProgressBar } from '@/components/books/batch-progress/organisms/BatchProgressBar';
import { BatchEmptyState } from '@/components/books/batch-progress/organisms/BatchEmptyState';
import { BatchCompletionCard } from '@/components/books/batch-progress/organisms/BatchCompletionCard';
import { BatchFiltersBar } from '@/components/books/batch-progress/organisms/BatchFiltersBar';
import { MOCK_BATCH_STATS } from '../data';

export const BatchProgressShowcase: React.FC = () => {
  return (
    <>
      {/* BatchHeader */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BatchHeader</CardTitle>
            <CardDescription>
              <code>components/books/batch-progress/organisms/BatchHeader.tsx</code> — Header com status SSE
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Conectado (tempo real)
              </p>
              <BatchHeader
                sseState="connected"
                failedCount={3}
                inProgressCount={5}
                bulkLoading={null}
                onRetryAllFailed={() => {}}
                onPauseAll={() => {}}
                onAddBook={() => {}}
                onRefresh={() => {}}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Conectando
              </p>
              <BatchHeader
                sseState="connecting"
                failedCount={0}
                inProgressCount={2}
                bulkLoading={null}
                onRetryAllFailed={() => {}}
                onPauseAll={() => {}}
                onAddBook={() => {}}
                onRefresh={() => {}}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Desconectado (polling)
              </p>
              <BatchHeader
                sseState="disconnected"
                failedCount={0}
                inProgressCount={0}
                bulkLoading={null}
                onRetryAllFailed={() => {}}
                onPauseAll={() => {}}
                onAddBook={() => {}}
                onRefresh={() => {}}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BatchProgressBar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BatchProgressBar</CardTitle>
            <CardDescription>
              <code>components/books/batch-progress/organisms/BatchProgressBar.tsx</code> — Barra de progresso geral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                65% completo
              </p>
              <BatchProgressBar
                completed={MOCK_BATCH_STATS.completed}
                total={MOCK_BATCH_STATS.total}
                progressPercent={65}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                100% completo
              </p>
              <BatchProgressBar completed={100} total={100} progressPercent={100} />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Início (0%)
              </p>
              <BatchProgressBar completed={0} total={100} progressPercent={0} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BatchFiltersBar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BatchFiltersBar</CardTitle>
            <CardDescription>
              <code>components/books/batch-progress/organisms/BatchFiltersBar.tsx</code> — Filtros de status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BatchFiltersBar
              searchQuery=""
              onSearchChange={() => {}}
              statusFilter="all"
              onStatusChange={() => {}}
            />
          </CardContent>
        </Card>
      </section>

      {/* BatchCompletionCard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BatchCompletionCard</CardTitle>
            <CardDescription>
              <code>components/books/batch-progress/organisms/BatchCompletionCard.tsx</code> — Card de conclusão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BatchCompletionCard
              total={100}
              onAddBook={() => {}}
            />
          </CardContent>
        </Card>
      </section>

      {/* BatchEmptyState */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BatchEmptyState</CardTitle>
            <CardDescription>
              <code>components/books/batch-progress/organisms/BatchEmptyState.tsx</code> — Estado vazio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BatchEmptyState onAddBook={() => {}} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

