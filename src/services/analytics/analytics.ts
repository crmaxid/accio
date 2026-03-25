import { analytics } from '@/lib'
import {
  OrderDistributionResponse,
  OrderStatsResponse,
  OrderYearlyResponse,
  Period,
  ProductSalesResponse,
} from '@/types'
import { useQuery } from '@tanstack/react-query'

const KEY = 'analytics'

export const useOrderAnalytics = (period: Period) => {
  const stats = useQuery({
    queryKey: [`${KEY}-stats`, period],
    queryFn: () =>
      analytics
        .get<OrderStatsResponse>('/v1/orders/stats', { params: { period } })
        .then((r) => r.data.data),
  })

  const monthly = useQuery({
    queryKey: [`${KEY}-monthly`],
    queryFn: () =>
      analytics
        .get<OrderYearlyResponse>('/v1/orders/monthly')
        .then((r) => r.data.data),
  })

  const distribution = useQuery({
    queryKey: [`${KEY}-distribution`],
    queryFn: () =>
      analytics
        .get<OrderDistributionResponse>('/v1/orders/source')
        .then((r) => r.data.data),
  })

  const topProducts = useQuery({
    queryKey: [`${KEY}-top-products`, period],
    queryFn: () =>
      analytics
        .get<ProductSalesResponse>('/v1/orders/products', {
          params: { limit: 5, period },
        })
        .then((r) => r.data.data),
  })

  const allProducts = useQuery({
    queryKey: [`${KEY}-all-products`, period],
    queryFn: () =>
      analytics
        .get<ProductSalesResponse>('/v1/orders/products', {
          params: { period },
        })
        .then((r) => r.data.data),
  })

  return { stats, monthly, distribution, topProducts, allProducts }
}
