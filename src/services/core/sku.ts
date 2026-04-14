import { core } from '@/lib'
import {
  BundleList,
  CreateSkuPayload,
  CreateSkuResponse,
  DeleteSkuResponse,
  UpdateSkuPayload,
  UpdateSkuResponse,
} from '@/types'
import { SkuList, StockTransactionList } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SKU_QUERY_KEY = 'sku'
const BUNDLE_QUERY_KEY = 'bundle'

interface SkuParams {
  page: number
  limit: number
  code?: string
  productName?: string
  search?: string
  startDate?: string
  endDate?: string
}

export const useSku = ({
  page,
  limit,
  code,
  productName,
  search,
  startDate,
  endDate,
}: SkuParams) => {
  const queryClient = useQueryClient()
  const getSkuList = useQuery({
    queryKey: [SKU_QUERY_KEY, page, limit, code, productName],
    queryFn: async () =>
      await core
        .get<SkuList>('/v1/sku', { params: { page, limit, code, productName } })
        .then((res) => res.data),
  })

  const getBundleList = useQuery({
    queryKey: [BUNDLE_QUERY_KEY, page, limit, search],
    queryFn: async () =>
      await core
        .get<BundleList>('/v1/sku/group', { params: { page, limit, search } })
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

  const createSku = useMutation({
    mutationFn: (payload: CreateSkuPayload) =>
      core
        .post<CreateSkuResponse>('/v1/sku', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKU_QUERY_KEY] })
    },
  })

  const updateSku = useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & UpdateSkuPayload) =>
      core
        .patch<UpdateSkuResponse>(`/v1/sku/${id}`, payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKU_QUERY_KEY] })
    },
  })

  const deleteSku = useMutation({
    mutationFn: (id: string) =>
      core
        .delete<DeleteSkuResponse>(`/v1/sku/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKU_QUERY_KEY] })
    },
  })

  return {
    getSkuList,
    getStockTransaction,
    getBundleList,
    createSku,
    updateSku,
    deleteSku,
  }
}
