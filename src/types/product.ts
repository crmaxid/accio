import { BaseReponse, PaginationReponse } from './base'

export interface Product {
  createdAt: string
  id: string
  name: string
  tokopediaProductId: string | null
  sku: {
    id: string
    code: string
    uom: string
    virtual: true
    stock: {
      updatedAt: string
      id: string
      actualQuantity: number
    } | null
  }[]
  price: {
    productionPrice: 51350
  }
}

export type ProductList = BaseReponse<PaginationReponse<Product>>
