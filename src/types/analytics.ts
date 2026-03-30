import { BaseReponse } from './base'

export type Period = 'monthly' | 'yearly'

export interface OrderStats {
  period: string
  current: {
    count: number
    revenue: number
    online: number
    offline: number
    onlineRevenue: number
    offlineRevenue: number
    start: string
    end: string
  }
  previous: {
    count: number
    revenue: number
    online: number
    offline: number
    onlineRevenue: number
    offlineRevenue: number
    start: string
    end: string
  }
  comparison: { difference: number; percentageChange: number }
  revenueComparison: { difference: number; percentageChange: number }
  onlineComparison: { difference: number; percentageChange: number }
  offlineComparison: { difference: number; percentageChange: number }
  onlineRevenueComparison: { difference: number; percentageChange: number }
  offlineRevenueComparison: { difference: number; percentageChange: number }
}

export interface OrderMonthlyItem {
  month: string
  online: number
  offline: number
  onlineRevenue: number
  offlineRevenue: number
}

export interface OrderYearlyAnalytics {
  data: OrderMonthlyItem[]
  totalOnlineSales: number
  totalOfflineSales: number
}

export interface OrderDistributionItem {
  platform: string
  total: number
}

export interface OrderDistribution {
  data: OrderDistributionItem[]
  tokopediaTotalRevenue: number
  shopeeTotalRevenue: number
  crmaxTotalRevenue: number
}

export interface ProductSales {
  productId: string
  productName: string
  totalSold: number
  totalRevenue: number
  orderCount: number
  mainSkuCode?: string
  mainSkuUom?: string
}

export type OrderStatsResponse = BaseReponse<OrderStats>
export type OrderYearlyResponse = BaseReponse<OrderYearlyAnalytics>
export type OrderDistributionResponse = BaseReponse<OrderDistribution>
export type ProductSalesResponse = BaseReponse<ProductSales[]>
