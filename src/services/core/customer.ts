import { core } from '@/lib'
import {
  CreateCustomerPayload,
  CreateCustomerResponse,
  CustomerList,
  CustomerSelectionList,
} from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

  const getCustomers = useQuery({
    queryKey: [`${CUSTOMER_QUERY_KEY}-list`, page, limit, search],
    queryFn: async () =>
      await core
        .get<CustomerList>('/v1/customer', { params: { page, limit, search } })
        .then((res) => res.data),
  })

  const createCustomer = useMutation({
    mutationFn: (payload: CreateCustomerPayload) =>
      core
        .post<CreateCustomerResponse>('/v1/customer', payload)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${CUSTOMER_QUERY_KEY}-list`],
      })
    },
  })

  const getCustomerSelection = useQuery({
    queryKey: [`${CUSTOMER_QUERY_KEY}-selection`],
    queryFn: async () =>
      await core
        .get<CustomerSelectionList>('/v1/customer/selection')
        .then((res) => res.data),
  })

  return { getCustomers, getCustomerSelection, createCustomer }
}
