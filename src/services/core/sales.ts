import { core } from '@/lib'
import {
  CreateOrderPayload,
  CreateOrderResponse,
  OrderList,
  ShippingProviderSelectionList,
} from '@/types/sales'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

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

  const getShippingProviderSelection = useQuery({
    queryKey: [`${SALES_QUERY_KEY}-shipping-provider-selection`],
    queryFn: async () =>
      await core
        .get<ShippingProviderSelectionList>(
          '/v1/order/shipping-provider/selection',
        )
        .then((res) => res.data),
  })

  const createOrder = useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      core
        .post<CreateOrderResponse>('/v1/order', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SALES_QUERY_KEY] })
    },
  })

  return {
    getOrderList,
    getShippingProviderSelection,
    createOrder,
  }
}
