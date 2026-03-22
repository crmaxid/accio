import { PaginatedResponse } from './base'

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

export type CustomerList = PaginatedResponse<Customer>
