'use client'

import { useState } from 'react'
import { useOrderAnalytics } from '@/services/analytics'
import { type Period } from '@/types'

export const useDashboard = () => {
  const [period, setPeriod] = useState<Period>('monthly')
  const { stats, monthly, distribution, topProducts, allProducts } =
    useOrderAnalytics(period)

  return {
    period,
    setPeriod,
    stats,
    monthly,
    distribution,
    topProducts,
    allProducts,
  }
}
