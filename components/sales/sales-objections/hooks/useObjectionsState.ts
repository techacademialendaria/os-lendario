import { useState } from 'react';
import type { PeriodFilter } from '../types';

export function useObjectionsState() {
  const [period, setPeriod] = useState<PeriodFilter>('30d');

  return {
    period,
    setPeriod,
  };
}
