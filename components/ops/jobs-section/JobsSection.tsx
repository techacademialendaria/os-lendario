import React from 'react';
import { OpsPage } from '../ops-ui';
import {
  OverviewView,
  TablesView,
  LifecycleView,
  CostBreakdownView,
  TraceabilityView,
  MetricsView,
  SummaryView
} from './organisms';

/**
 * JobsSection - Documentation for the Jobs System (job_executions, ingestion_batches, processing_queue)
 *
 * Refactored from 592 lines -> ~30 lines (95% reduction)
 * Following Atomic Design: molecules + organisms pattern
 *
 * Structure:
 * - molecules/StatusBadge: Colored status indicator
 * - molecules/FieldTable: Table for field definitions
 * - organisms/OverviewView: System overview diagram and summary
 * - organisms/TablesView: Documentation for the three main tables
 * - organisms/LifecycleView: Job states and transitions
 * - organisms/CostBreakdownView: Cost tracking and pricing
 * - organisms/TraceabilityView: Entity relationships and error handling
 * - organisms/MetricsView: Operational metrics and dashboard queries
 * - organisms/SummaryView: Bottom summary section
 */
export const JobsSection: React.FC = () => {
  return (
    <OpsPage>
      {/* System Overview & Quick Summary */}
      <OverviewView />

      {/* Table Documentation: job_executions, ingestion_batches, processing_queue */}
      <TablesView />

      {/* Job Lifecycle States and Transitions */}
      <LifecycleView />

      {/* Cost Tracking: Example Breakdown, Pricing, Aggregations */}
      <CostBreakdownView />

      {/* Traceability: Entity Relationships & Error Handling */}
      <TraceabilityView />

      {/* Operational Metrics & Dashboard Queries */}
      <MetricsView />

      {/* Bottom Summary */}
      <SummaryView />
    </OpsPage>
  );
};
