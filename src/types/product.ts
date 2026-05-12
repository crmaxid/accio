import { BaseReponse, PaginatedResponse } from './base'

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

export interface ProductSelection {
  id: string
  name: string
  restockDelivery: {
    id: string
    containerType: string
    containerCapacity: number
    uom: string
  }
}

export interface ProductRestockDelivery {
  id: string
  containerType: string
  containerCapacity: number
  uom: string
  createdAt: string
}

export interface CreateProductPayload {
  name: string
  productionPrice: number
  productRestockDeliveryId: string
}

export interface UpdateProductPayload {
  name: string
}

export type ProductList = PaginatedResponse<Product>
export type ProductSelectionList = BaseReponse<ProductSelection[]>
export type ProductRestockDeliveryList = BaseReponse<ProductRestockDelivery[]>
export type CreateProductResponse = BaseReponse<{ message: string }>
export type UpdateProductResponse = BaseReponse<{ message: string }>
export type DeleteProductResponse = BaseReponse<{ message: string }>
