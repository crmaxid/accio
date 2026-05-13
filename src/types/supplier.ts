import { BaseReponse, GenericAddress, PaginatedResponse } from './base'

export interface Supplier {
  _id: string
  name: string
  phone: string | null
  email: string | null
  createdAt: string
}

export interface SupplierDetail {
  _id: string
  name: string
  phone: string | null
  email: string | null
  description: string | null
  address: GenericAddress
  products?: SupplierProduct[]
  createdAt: string
}

export interface SupplierProduct {
  _id: string
  name: string
  price: number
  unit: string
  createdAt: string
}

export interface CreateSupplierPayload {
  name: string
  phone?: string | null
  email?: string | null
  address: GenericAddress
}

export interface CreateSupplierProductPayload {
  name: string
  price: number
  unit: string
}

export type SupplierList = PaginatedResponse<Supplier>
export type SupplierDetailResponse = BaseReponse<SupplierDetail>
export type CreateSupplierResponse = BaseReponse<{ message: string }>
export type CreateSupplierProductResponse = BaseReponse<{ message: string }>
