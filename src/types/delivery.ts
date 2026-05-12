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

export interface DeliveryProductSku {
  id: string
  code: string
  virtual: boolean
}

export interface DeliveryProduct {
  id: string
  quantity: number
  packageType: string
  stockReplenishmentProduct: {
    id: string
    quantity: number
    uom: string
    product: {
      id: string
      name: string
      sku: DeliveryProductSku[]
    }
  }
}

export interface DeliveryProofOfDelivery {
  id: string
  updatedAt: string
  deliveryLetterNumber: string
  receivedLetterNumber: string
  deliveryLetterUrl: string
  receivedLetterUrl: string
  signedDeliveryLetterUrl: string | null
  signedReceivedLetterUrl: string | null
}

export interface DeliveryDetail {
  id: string
  number: string
  status: string
  deliveryDate: string
  notes: string | null
  createdAt: string
  stockReplenishmentRequest: {
    id: string
    number: string
    status: string
  }
  items: DeliveryProduct[]
  proofOfDelivery: DeliveryProofOfDelivery | null
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
export type DeliveryDetailResponse = BaseReponse<DeliveryDetail>
export type CreateDeliveryResponse = BaseReponse<{ message: string }>
