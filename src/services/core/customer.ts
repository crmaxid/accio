import { core } from '@/lib'
import { BasePaginatedResponse, Customer } from '@/types'
import { useQuery } from '@tanstack/react-query'

const CUSTOMER_QUERY_KEY = 'customers'

export const useCustomer = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  const getCustomers = useQuery({
    queryKey: [`${CUSTOMER_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<BasePaginatedResponse<Customer>>('/v1/customer', {
          params: { page, limit, search },
        })
        .then((res) => res.data),
  })

  return {
    getCustomers,
  }
}
