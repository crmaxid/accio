import { PaginatedResponse } from './base'

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

export type DeliveryList = PaginatedResponse<Delivery>
