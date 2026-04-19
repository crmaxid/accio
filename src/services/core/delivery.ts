import { core } from '@/lib'
import {
  CreateDeliveryPayload,
  CreateDeliveryResponse,
  DeliveryList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

  const getAllDelivery = useQuery({
    queryKey: [DELIVERY_QUERY_KEY, page, limit, search, status],
    queryFn: async () =>
      core
        .get<DeliveryList>('/v1/stock-replenishment/delivery', {
          params: { page, limit, search, status },
        })
        .then((res) => res.data),
  })

  const createDelivery = useMutation({
    mutationFn: ({
      restockId,
      ...payload
    }: { restockId: string } & CreateDeliveryPayload) =>
      core
        .post<CreateDeliveryResponse>(
          `/v1/stock-replenishment/${restockId}/delivery`,
          payload,
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEY] })
    },
  })

  return {
    getAllDelivery,
    createDelivery,
  }
}
