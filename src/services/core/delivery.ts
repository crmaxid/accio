import { core } from '@/lib'
import { DeliveryList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const DELIVERY_QUERY_KEY = 'delivery'

interface DeliveryParams {
  page: number
  limit: number
  search?: string
  status?: string
}

export const useDelivery = ({
  page,
  limit,
  search,
  status,
}: DeliveryParams) => {
  const getAllDelivery = useQuery({
    queryKey: [DELIVERY_QUERY_KEY, page, limit, search, status],
    queryFn: async () =>
      core
        .get<DeliveryList>('/v1/stock-replenishment/delivery', {
          params: { page, limit, search, status },
        })
        .then((res) => res.data),
  })
  return {
    getAllDelivery,
  }
}
