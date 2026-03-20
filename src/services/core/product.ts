import { core } from '@/lib'
import { ProductList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const PRODUCT_QUERY_KEY = 'product'

export const useProduct = ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  const getProductList = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}`, page, limit],
    queryFn: async () =>
      core
        .get<ProductList>('/v1/product', { params: { page, limit } })
        .then((res) => res.data),
  })

  return {
    getProductList,
  }
}
