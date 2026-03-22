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
