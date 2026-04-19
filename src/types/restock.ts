import { BaseReponse, PaginatedResponse } from './base'

export interface Restock {
  id: string
  number: string
  status: string
  paymentStatus: string
  deliveryStatus: string
  createdAt: string
  createdBy: {
    name: string
    profile: {
      avatarUrl: string | null
    }
  }
}

export interface RestockProductSelection {
  id: string
  quantity: number
  uom: string
  product: {
    id: string
    name: string
    restockDelivery: {
      id: string
      containerType: string
      containerCapacity: number
      uom: string
    }
  }
  remainingBox: number
}

export interface RestockSelection {
  id: string
  number: string
  createdAt: string
  status: string
  products: RestockProductSelection[]
}

export interface CreateRestockProductPayload {
  productId: string
  quantity: number
  uom: string
}

export interface CreateRestockPayload {
  products: CreateRestockProductPayload[]
  notes?: string
}

export type RestockList = PaginatedResponse<Restock>
export type RestockSelectionList = BaseReponse<RestockSelection[]>
export type CreateRestockResponse = BaseReponse<{ message: string }>
