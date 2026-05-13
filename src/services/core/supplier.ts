import { core } from '@/lib'
import {
  CreateSupplierPayload,
  CreateSupplierProductPayload,
  CreateSupplierProductResponse,
  CreateSupplierResponse,
  SupplierDetailResponse,
  SupplierList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SUPPLIER_QUERY_KEY = 'suppliers'

export const useSupplier = ({
  page,
  limit,
  search,
  detailId,
}: {
  page?: number
  limit?: number
  search?: string
  detailId?: string
}) => {
  const queryClient = useQueryClient()

  const getSuppliers = useQuery({
    queryKey: [`${SUPPLIER_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<SupplierList>('/v1/suppliers', { params: { page, limit, search } })
        .then((res) => res.data),
  })

  const getSupplierDetail = useQuery({
    queryKey: [`${SUPPLIER_QUERY_KEY}-detail`, detailId],
    queryFn: async () =>
      await core
        .get<SupplierDetailResponse>(`/v1/suppliers/${detailId}`)
        .then((res) => res.data),
    enabled: !!detailId,
  })

  const createSupplier = useMutation({
    mutationFn: (payload: CreateSupplierPayload) =>
      core
        .post<CreateSupplierResponse>('/v1/suppliers', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${SUPPLIER_QUERY_KEY}-list`],
      })
    },
  })

  const createSupplierProduct = useMutation({
    mutationFn: ({
      supplierId,
      payload,
    }: {
      supplierId: string
      payload: CreateSupplierProductPayload
    }) =>
      core
        .post<CreateSupplierProductResponse>(
          `/v1/suppliers/${supplierId}/products`,
          payload,
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${SUPPLIER_QUERY_KEY}-detail`, detailId],
      })
    },
  })

  return {
    getSuppliers,
    getSupplierDetail,
    createSupplier,
    createSupplierProduct,
  }
}
