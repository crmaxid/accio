import { core } from '@/lib'
import { ProductList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const PRODUCT_QUERY_KEY = 'product'

export const useProduct = ({
  page,
  limit,
  name,
}: {
  page: number
  limit: number
  name?: string
}) => {
  const getProductList = useQuery({
    queryKey: [`${PRODUCT_QUERY_KEY}`, page, limit, name],
    queryFn: async () =>
      await core
        .get<ProductList>('/v1/product', { params: { page, limit, name } })
        .then((res) => res.data),
  })

  return {
    getProductList,
  }
}
