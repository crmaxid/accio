import { core } from '@/lib'
import {
  CreateDeliveryPayload,
  CreateDeliveryResponse,
  DeliveryDetailResponse,
  DeliveryList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const DELIVERY_QUERY_KEY = 'delivery'

interface DeliveryParams {
  page: number
  limit: number
  search?: string
  status?: string
  detailId?: string
}

export const useDelivery = ({
  page,
  limit,
  search,
  status,
  detailId,
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

  const getDeliveryDetail = useQuery({
    queryKey: [DELIVERY_QUERY_KEY, 'detail', detailId],
    queryFn: async () =>
      core
        .get<DeliveryDetailResponse>(
          `/v1/stock-replenishment/delivery/${detailId}`,
        )
        .then((res) => res.data),
    enabled: !!detailId,
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
    getDeliveryDetail,
    createDelivery,
  }
}
