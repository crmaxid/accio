import { core } from '@/lib'
import { ProductList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const PRODUCT_QUERY_KEY = 'product'

export const useProduct = ({
  page,
  limit,
  search,
}: {
  page: number
  limit: number
  search?: string
}) => {
  const getProductList = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}`, page, limit, search],
    queryFn: async () =>
      await core
        .get<ProductList>('/v1/product', { params: { page, limit, search } })
        .then((res) => res.data),
  })

  return {
    getProductList,
  }
}
