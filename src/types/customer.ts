import { BaseReponse, GenericAddress, PaginatedResponse } from './base'

export interface CreateCustomerPayload {
  name: string
  email: string | null
  phone: string
  shippingAddress: GenericAddress
}

export interface Customer {
  createdAt: string
  id: string
  name: string
  email: string
  phone: string
  address: {
    fullAddress: string
  }
}

export type CreateCustomerResponse = BaseReponse<{ message: string }>

export type CustomerList = PaginatedResponse<Customer>
