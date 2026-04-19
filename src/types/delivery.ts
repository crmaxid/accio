import { BaseReponse, PaginatedResponse } from './base'

export interface Delivery {
  id: string
  number: string
  status: string
  deliveryDate: string
  createdBy: {
    id: string
    name: string
    profile: {
      avatarUrl: string | null
    } | null
  } | null
}

export interface CreateDeliveryItemPayload {
  stockReplenishmentProductId: string
  quantity: number
}

export interface CreateDeliveryPayload {
  deliveryDate: string
  items: CreateDeliveryItemPayload[]
  notes?: string
  enableNotification?: boolean
}

export type DeliveryList = PaginatedResponse<Delivery>
export type CreateDeliveryResponse = BaseReponse<{ message: string }>
