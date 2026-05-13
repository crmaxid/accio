import { BaseReponse, PaginatedResponse } from './base'

export interface PurchaseOrderCustomer {
  id: string
  name: string
  email: string | null
  phone: string | null
}

export interface PurchaseOrder {
  _id: string
  number: string
  externalNumber: string | null
  customer: PurchaseOrderCustomer | null
  createdAt: string
}

export interface PurchaseOrderProductPayload {
  productId: string
  quantity: number
  price: number
}

export interface CreatePurchaseOrderPayload {
  customerId: string
  products: PurchaseOrderProductPayload[]
  notes?: string | null
}

export type PurchaseOrderList = PaginatedResponse<PurchaseOrder>
export type CreatePurchaseOrderResponse = BaseReponse<{ message: string }>
