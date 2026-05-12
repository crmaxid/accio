import { BaseReponse, PaginatedResponse } from './base'

export interface OrderCustomer {
  id: string
  name: string
  email: string | null
  phone: string
}

export interface OrderShippingProviderImage {
  id: string
  name: string
  url: string
}

export interface OrderShippingProvider {
  id: string
  name: string
  tokopediaId: string
  image: OrderShippingProviderImage
}

export interface OrderShipping {
  id: string
  trackingNumber: string | null
  provider: OrderShippingProvider
}

export interface OrderPayment {
  id: string
  currency: string
  method: string
  taxAmount: number
  netAmount: number
  platformFee: number
  transactionFee: number
  orderGrossAmount: number
  buyerPaid: number
  revenue: number
  sellerDiscount: number
  platformSubsidy: number
  commissionFee: number
  serviceFee: number
  shippingPaidByBuyer: number
  shippingCostSeller: number
}

export interface Order {
  createdAt: string
  id: string
  source: string
  status: string
  externalOrderId: string | null
  notes: string
  customerNotes: string | null
  cancelationNotes: string | null
  customer: OrderCustomer
  shipping: OrderShipping
  payment: OrderPayment
}

export interface ShippingProviderSelection {
  id: string
  name: string
}

export interface CreateOrderPayload {
  customerId: string
  shippingProviderId?: string
  orderType?: string
  notes?: string | null
  date: string
  product: { skuId: string; quantity: number; unitPrice: number }[]
  payment: {
    amount: number
    currency: string
    method: string
    taxAmount: number
    subTotal: number
    shippingFee: number
    discount: number
  }
}

export type OrderList = PaginatedResponse<Order>
export type ShippingProviderSelectionList = BaseReponse<
  ShippingProviderSelection[]
>
export type CreateOrderResponse = BaseReponse<{ message: string }>
