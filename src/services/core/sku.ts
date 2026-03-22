import { core } from '@/lib'
import { useQuery } from '@tanstack/react-query'

const SKU_QUERY_KEY = 'sku'

interface SkuParams {
  page: number
  limit: number
  code?: string
  productName?: string
}

export const useSku = ({ page, limit, code, productName }: SkuParams) => {
  const getSkuList = useQuery({
    queryKey: [SKU_QUERY_KEY, page, limit, code, productName],
    queryFn: async () =>
      await core
        .get('/v1/sku', { params: { page, limit, code, productName } })
        .then((res) => res.data),
  })
  return {
    getSkuList,
  }
}
