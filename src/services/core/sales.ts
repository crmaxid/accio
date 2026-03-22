import { core } from '@/lib'
import { OrderList } from '@/types/sales'
import { useQuery } from '@tanstack/react-query'

const SALES_QUERY_KEY = 'order'

export const useSales = ({
  page,
  limit,
  search,
  source,
  startDate,
  endDate,
}: {
  page: number
  limit: number
  search?: string
  source?: string
  startDate?: string
  endDate?: string
}) => {
  const getOrderList = useQuery({
    queryKey: [
      SALES_QUERY_KEY,
      page,
      limit,
      search,
      source,
      startDate,
      endDate,
    ],
    queryFn: async () =>
      await core
        .get<OrderList>('/v1/order', {
          params: {
            page,
            limit,
            search,
            source: source && source !== 'ALL' ? source : undefined,
            startDate,
            endDate,
          },
        })
        .then((res) => res.data),
  })

  return {
    getOrderList,
  }
}
