import { core } from '@/lib'
import { DeliveryOrderList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const DELIVERY_ORDER_QUERY_KEY = 'delivery-orders'

export const useDeliveryOrder = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  const getDeliveryOrders = useQuery({
    queryKey: [`${DELIVERY_ORDER_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<DeliveryOrderList>('/v1/delivery-order', {
          params: { page, limit, search },
        })
        .then((res) => res.data),
  })

  return { getDeliveryOrders }
}
