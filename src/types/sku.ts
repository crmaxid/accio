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

export interface UpdateSkuPayload {
  code: string
  uom: string
  salePrice: number
  resellerPrice: number
  specialPrice: number
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

export interface SkuOrderSelection {
  id: string
  code: string
  salePrice: number
  resellerPrice: number
  unitCount: number
  createdAt: string
  product: { id: string; name: string }
}

export interface CreateBundlePayload {
  code: string
  skuGroupItems: { skuId: string; quantity: number }[]
}

export interface SkuStockSelection {
  id: string
  code: string
  createdAt: string
  product: { id: string; name: string }
  stock: { id: string; actualQuantity: number }
}

export interface StockAdjustmentPayload {
  items: { skuId: string; quantity: number }[]
}

export type BundleList = PaginatedResponse<Bundle>
export type StockTransactionList = PaginatedResponse<StockTransaction>
export type SkuList = PaginatedResponse<Sku>
export type SkuOrderSelectionList = BaseReponse<SkuOrderSelection[]>
export type SkuStockSelectionList = BaseReponse<SkuStockSelection[]>
export type CreateBundleResponse = BaseReponse<{ message: string }>
export type UpdateSkuResponse = BaseReponse<{ message: string }>
export type DeleteSkuResponse = BaseReponse<{ message: string }>
export type StockAdjustmentResponse = BaseReponse<{ message: string }>
