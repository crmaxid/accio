import { BaseReponse, PaginationReponse } from './base'

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

export type BundleList = BaseReponse<PaginationReponse<Bundle>>
