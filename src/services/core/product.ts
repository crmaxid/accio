import { core } from '@/lib'
import {
  CreateProductPayload,
  CreateProductResponse,
  DeleteProductResponse,
  ProductList,
  ProductRestockDeliveryList,
  ProductSelectionList,
  UpdateProductPayload,
  UpdateProductResponse,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const PRODUCT_QUERY_KEY = 'product'

export const useProduct = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  const queryClient = useQueryClient()

  const getProductList = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}`, page, limit, search],
    queryFn: async () =>
      await core
        .get<ProductList>('/v1/product', { params: { page, limit, search } })
        .then((res) => res.data),
  })

  const getProductSelection = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}-selection`],
    queryFn: async () =>
      await core
        .get<ProductSelectionList>('/v1/product/selection')
        .then((res) => res.data),
  })

  const getRestockDeliverySelection = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}-restock-delivery-selection`],
    queryFn: async () =>
      await core
        .get<ProductRestockDeliveryList>(
          '/v1/product/restock-delivery/selection',
        )
        .then((res) => res.data),
  })

  const createProduct = useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      core
        .post<CreateProductResponse>('/v1/product', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] })
    },
  })

  const updateProduct = useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & UpdateProductPayload) =>
      core
        .patch<UpdateProductResponse>(`/v1/product/${id}`, payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] })
    },
  })

  const deleteProduct = useMutation({
    mutationFn: (id: string) =>
      core
        .delete<DeleteProductResponse>(`/v1/product/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] })
    },
  })

  return {
    getProductList,
    getProductSelection,
    getRestockDeliverySelection,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
