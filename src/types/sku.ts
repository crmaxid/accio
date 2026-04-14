import { BaseReponse, PaginatedResponse } from './base'

export interface Bundle {
  id: string
  code: string
  createdAt: string
}

export interface Sku {
  createdAt: string
  id: string
  code: string
  uom: string
  unitCount: number
  salePrice: number
  resellerPrice: number
  specialPrice: number
  virtual: true
  product: {
    id: string
    name: string
  }
}

export interface StockTransaction {
  createdAt: string
  id: string
  type: string
  quantity: number
  previousStock: number
  currentStock: number
  reason: string
  referenceId: string
  sku: {
    id: string
    code: string
    product: {
      id: string
      name: string
    }
  }
  createdBy: {
    id: string
    name: string
  }
}

export interface CreateSkuPayload {
  code: string
  productId: string
  uom: string
  unitCount: number
  salePrice: number
  resellerPrice: number
  specialPrice: number
  mainSku: boolean
}

export type CreateSkuResponse = BaseReponse<{ message: string }>

export type BundleList = PaginatedResponse<Bundle>
export type StockTransactionList = PaginatedResponse<StockTransaction>
export type SkuList = PaginatedResponse<Sku>
