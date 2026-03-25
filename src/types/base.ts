export interface GenericAddress {
  fullAddress: string
  line1: string
  line2?: string | null
  postalCode?: string | null
  subDistrict?: string
  village?: string | null
  city: string
  province?: string
  country: string
  latitude: number
  longitude: number
}

export interface BaseReponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface BasePaginationReponse<T> {
  data: T[]
  meta: PaginationMeta
}

export type PaginatedResponse<T> = BaseReponse<BasePaginationReponse<T>>
