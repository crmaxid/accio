'use client'

import {
  ShoppingBag01Icon,
  MoneyReceive02Icon,
  GlobalIcon,
  Store01Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/format'
import { useDashboard } from '../_hooks/use-dashboard'
import { StatCard } from './stat-card'
import { SalesTrendChart } from './sales-trend-chart'
import { SalesSourceChart } from './sales-source-chart'
import { TopProducts } from './top-products'
import { ProductSalesChart } from './product-sales-chart'

export function CrmaxDashboard() {
  const {
    period,
    setPeriod,
    stats,
    monthly,
    distribution,
    topProducts,
    allProducts,
  } = useDashboard()

  const s = stats.data
  const periodLabel = period === 'monthly' ? 'month' : 'year'
  const comparisonLabel =
    period === 'monthly' ? 'vs last month' : 'vs last year'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
          {(['monthly', 'yearly'] as const).map((p) => (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              onClick={() => setPeriod(p)}
              className={cn(
                'capitalize transition-all',
                period === p
                  ? 'bg-background text-foreground hover:bg-background shadow-sm'
                  : 'text-muted-foreground',
              )}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={`This ${periodLabel}'s sales`}
          value={s?.current.count ?? 0}
          description={comparisonLabel}
          icon={ShoppingBag01Icon}
          change={s?.comparison.percentageChange ?? 0}
          isLoading={stats.isLoading}
        />
        <StatCard
          title={`This ${periodLabel}'s revenue`}
          value={s ? formatCurrency(s.current.revenue) : '—'}
          description={comparisonLabel}
          icon={MoneyReceive02Icon}
          change={s?.revenueComparison.percentageChange ?? 0}
          isLoading={stats.isLoading}
        />
        <StatCard
          title="Online sales"
          value={s?.current.online ?? 0}
          description={comparisonLabel}
          icon={GlobalIcon}
          change={s?.onlineComparison.percentageChange ?? 0}
          isLoading={stats.isLoading}
        />
        <StatCard
          title="Offline sales"
          value={s?.current.offline ?? 0}
          description={comparisonLabel}
          icon={Store01Icon}
          change={s?.offlineComparison.percentageChange ?? 0}
          isLoading={stats.isLoading}
        />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="xl:w-[65%]">
          <SalesTrendChart data={monthly.data} isLoading={monthly.isLoading} />
        </div>
        <div className="xl:w-[35%]">
          <SalesSourceChart
            data={distribution.data}
            isLoading={distribution.isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row">
        <TopProducts
          data={topProducts.data}
          isLoading={topProducts.isLoading}
          period={periodLabel}
        />
        <ProductSalesChart
          data={allProducts.data}
          isLoading={allProducts.isLoading}
          period={periodLabel}
        />
      </div>
    </div>
  )
}
