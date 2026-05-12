import { core } from '@/lib'
import {
  CancelRestockResponse,
  CreateRestockPayload,
  CreateRestockPaymentResponse,
  CreateRestockResponse,
  RestockDetailResponse,
  RestockList,
  RestockQrCodeList,
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
  detailId?: string
  qrPage?: number
  qrLimit?: number
}

export const useRestock = ({
  page,
  limit,
  search,
  status,
  paymentStatus,
  deliveryStatus,
  detailId,
  qrPage = 1,
  qrLimit = 10,
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

  const getRestockDetail = useQuery({
    queryKey: [RESTOCK_QUERY_KEY, 'detail', detailId],
    queryFn: async () =>
      core
        .get<RestockDetailResponse>(
          `/v1/stock-replenishment/${detailId}/detail`,
        )
        .then((res) => res.data),
    enabled: !!detailId,
  })

  const cancelRestock = useMutation({
    mutationFn: (id: string) =>
      core
        .patch<CancelRestockResponse>(`/v1/stock-replenishment/${id}/cancel`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTOCK_QUERY_KEY] })
    },
  })

  const getRestockQrCodes = useQuery({
    queryKey: [RESTOCK_QUERY_KEY, 'qr-codes', detailId, qrPage, qrLimit],
    queryFn: async () =>
      core
        .get<RestockQrCodeList>(
          `/v1/stock-replenishment/${detailId}/qr-codes/detail`,
          { params: { page: qrPage, limit: qrLimit } },
        )
        .then((res) => res.data),
    enabled: !!detailId,
  })

  const createPayment = useMutation({
    mutationFn: ({
      invoiceId,
      formData,
    }: {
      invoiceId: string
      formData: FormData
    }) =>
      core
        .post<CreateRestockPaymentResponse>(
          `/v1/stock-replenishment/invoice/${invoiceId}/payment`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESTOCK_QUERY_KEY] })
    },
  })

  return {
    getAllRestock,
    getRestockSelection,
    createRestock,
    getRestockDetail,
    cancelRestock,
    getRestockQrCodes,
    createPayment,
  }
}
