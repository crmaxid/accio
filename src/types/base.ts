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
