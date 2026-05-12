import { BaseReponse, PaginatedResponse } from './base'

export interface RestockInvoiceItem {
  id: string
  quantity: number
  productionPrice: number
  totalPrice: number
  product: {
    id: string
    quantity: number
    uom: string
    product: { id: string; name: string }
  }
}

export interface RestockPaymentRecord {
  id: string
  paymentMethod: string
  amount: number
  file: {
    id: string
    name: string
    size: number
    mimeType: string
    url: string
  } | null
}

export interface RestockInvoice {
  id: string
  number: string
  status: string
  totalPrice: number
  paidAmount: number
  remainingAmount: number
  createdAt: string
  file: GeneratedFile | null
  items: RestockInvoiceItem[]
  payments: RestockPaymentRecord[]
}

export interface RestockDeliveryItem {
  id: string
  number: string
  status: string
  deliveryDate: string
}

export interface RestockQrCode {
  id: string
  identifier: string
  status: string
  sequenceNumber: number
  containedQuantity: number
  deliveryScannedAt: string | null
  receivedScannedAt: string | null
  product: { id: string; name: string }
}

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
    } | null
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

export interface RestockDetailProduct {
  id: string
  quantity: number
  uom: string
  product: {
    id: string
    name: string
    price: {
      id: string
      productionPrice: number
    }
  }
}

export interface GeneratedFile {
  id: string
  url: string
  size: number
  mimeType: string
  createdAt: string
}

export interface RestockDetail {
  id: string
  number: string
  status: string
  paymentStatus: string
  deliveryStatus: string
  notes: string | null
  createdAt: string
  file: GeneratedFile | null
  qr: { id: string; name: string; mimeType: string; url: string } | null
  invoice: RestockInvoice | null
  deliveries: RestockDeliveryItem[]
  createdBy: {
    name: string
    email: string
    role: {
      id: string
      name: string
    }
  }
  products: RestockDetailProduct[]
}

export type RestockDetailResponse = BaseReponse<RestockDetail>
export type CancelRestockResponse = BaseReponse<{ message: string }>
export type GenerateRestockDocumentResponse = BaseReponse<{ url: string }>
export type GenerateRestockInvoiceResponse = BaseReponse<{ message: string }>
export type CreateRestockPaymentResponse = BaseReponse<{ message: string }>
export type RestockQrCodeList = PaginatedResponse<RestockQrCode>
