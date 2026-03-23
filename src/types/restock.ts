import { PaginatedResponse } from './base'

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

export type RestockList = PaginatedResponse<Restock>
