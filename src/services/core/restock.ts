import { core } from '@/lib'
import { RestockList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const RESTOCK_QUERY_KEY = 'restock'

interface RestockParams {
  page: number
  limit: number
  search?: string
  status?: string
  paymentStatus?: string
  deliveryStatus?: string
}

export const useRestock = ({
  page,
  limit,
  search,
  status,
  paymentStatus,
  deliveryStatus,
}: RestockParams) => {
  const getAllRestock = useQuery({
    queryKey: [
      RESTOCK_QUERY_KEY,
      page,
      limit,
      search,
      status,
      paymentStatus,
      deliveryStatus,
    ],
    queryFn: async () =>
      core
        .get<RestockList>('/v1/stock-replenishment', {
          params: {
            page,
            limit,
            search,
            status,
            paymentStatus,
            deliveryStatus,
          },
        })
        .then((res) => res.data),
  })
  return {
    getAllRestock,
  }
}
