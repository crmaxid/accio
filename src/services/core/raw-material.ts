import { core } from '@/lib'
import { RawMaterialList } from '@/types'
import { useQuery } from '@tanstack/react-query'

const RAW_MATERIAL_QUERY_KEY = 'raw-materials'

export const useRawMaterial = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  const getRawMaterials = useQuery({
    queryKey: [`${RAW_MATERIAL_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<RawMaterialList>('/v1/raw-materials', {
          params: { page, limit, search },
        })
        .then((res) => res.data),
  })

  return { getRawMaterials }
}
