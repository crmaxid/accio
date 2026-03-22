import { core } from '@/lib'
import { SkuList, StockTransactionList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const SKU_QUERY_KEY = 'sku'

interface SkuParams {
  page: number
  limit: number
  code?: string
  productName?: string
  startDate?: string
  endDate?: string
}

export const useSku = ({
  page,
  limit,
  code,
  productName,
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
  }
}
