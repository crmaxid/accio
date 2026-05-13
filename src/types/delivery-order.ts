import { PaginatedResponse } from './base'

export interface DeliveryOrderPurchaseOrder {
  _id: string
  number: string
  externalNumber: string | null
}

export interface DeliveryOrder {
  _id: string
  number: string
  deliveryDate: string
  note: string | null
  purchaseOrderId: DeliveryOrderPurchaseOrder
  createdAt: string
}

export type DeliveryOrderList = PaginatedResponse<DeliveryOrder>
