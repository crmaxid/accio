import { cn } from '@/lib/utils'

type StockLevel = 'out' | 'low' | 'medium' | 'good'

function getStockLevel(stock: number): StockLevel {
  if (stock === 0) return 'out'
  if (stock <= 15) return 'low'
  if (stock <= 50) return 'medium'
  return 'good'
}

const stockStyles: Record<StockLevel, string> = {
  out: 'bg-red-50 text-red-600 border-red-100',
  low: 'bg-orange-50 text-orange-600 border-orange-100',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  good: 'bg-emerald-50 text-emerald-700 border-emerald-100',
}

const stockLabel: Record<StockLevel, string> = {
  out: 'Out of stock',
  low: 'Low',
  medium: 'Medium',
  good: 'Good',
}

interface StockBadgeProps {
  stock: number
  className?: string
}

export function StockBadge({ stock, className }: StockBadgeProps) {
  const level = getStockLevel(stock)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums',
          stockStyles[level],
        )}
      >
        {stock}
      </span>
      <span className="text-xs text-gray-400">{stockLabel[level]}</span>
    </div>
  )
}
