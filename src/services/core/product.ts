import { core } from '@/lib'
import { ProductList, ProductSelectionList } from '@/types'
import { useQuery } from '@tanstack/react-query'

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

  return {
    getProductList,
    getProductSelection,
  }
}
