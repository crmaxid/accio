import { core } from '@/lib'
import {
  CreateRestockPayload,
  CreateRestockResponse,
  RestockList,
  RestockSelectionList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

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

  const getRestockSelection = useQuery({
    queryKey: [`${RESTOCK_QUERY_KEY}-selection`],
    queryFn: async () =>
      core
        .get<RestockSelectionList>('/v1/stock-replenishment/selection')
        .then((res) => res.data),
  })

  const createRestock = useMutation({
    mutationFn: (payload: CreateRestockPayload) =>
      core
        .post<CreateRestockResponse>('/v1/stock-replenishment', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTOCK_QUERY_KEY] })
    },
  })

  return {
    getAllRestock,
    getRestockSelection,
    createRestock,
  }
}
