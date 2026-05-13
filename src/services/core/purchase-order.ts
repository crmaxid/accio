import { core } from '@/lib'
import {
  CreatePurchaseOrderPayload,
  CreatePurchaseOrderResponse,
  PurchaseOrderList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const PURCHASE_ORDER_QUERY_KEY = 'purchase-orders'

export const usePurchaseOrder = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  const queryClient = useQueryClient()

  const getPurchaseOrders = useQuery({
    queryKey: [`${PURCHASE_ORDER_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<PurchaseOrderList>('/v1/purchase-order', {
          params: { page, limit, search },
        })
        .then((res) => res.data),
  })

  const createPurchaseOrder = useMutation({
    mutationFn: (payload: CreatePurchaseOrderPayload) =>
      core
        .post<CreatePurchaseOrderResponse>('/v1/purchase-order', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${PURCHASE_ORDER_QUERY_KEY}-list`],
      })
    },
  })

  return { getPurchaseOrders, createPurchaseOrder }
}
