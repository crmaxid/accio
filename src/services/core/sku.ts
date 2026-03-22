import { core } from '@/lib'
import { BundleList } from '@/types'
import { SkuList, StockTransactionList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const SKU_QUERY_KEY = 'sku'
const BUNDLE_QUERY_KEY = 'bundle'

interface SkuParams {
  page: number
  limit: number
  code?: string
  productName?: string
  search?: string
  startDate?: string
  endDate?: string
}

export const useSku = ({
  page,
  limit,
  code,
  productName,
  search,
  startDate,
  endDate,
}: SkuParams) => {
  const getSkuList = useQuery({
    queryKey: [SKU_QUERY_KEY, page, limit, code, productName],
    queryFn: async () =>
      await core
        .get<SkuList>('/v1/sku', { params: { page, limit, code, productName } })
        .then((res) => res.data),
  })

  const getBundleList = useQuery({
    queryKey: [BUNDLE_QUERY_KEY, page, limit, search],
    queryFn: async () =>
      await core
        .get<BundleList>('/v1/sku/group', { params: { page, limit, search } })
        .then((res) => res.data),
  })

  const getStockTransaction = useQuery({
    queryKey: [
      `${SKU_QUERY_KEY}-stock-transaction`,
      page,
      limit,
      startDate,
      endDate,
    ],
    queryFn: async () =>
      await core
        .get<StockTransactionList>('/v1/sku/stock-transactions', {
          params: { page, limit, startDate, endDate },
        })
        .then((res) => res.data),
  })

  return {
    getSkuList,
    getStockTransaction,
    getBundleList,
  }
}
