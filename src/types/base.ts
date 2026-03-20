export interface BaseReponse<T> {
  success: boolean
  data: T
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationReponse<T> {
  success: boolean
  data: T[]
  meta: PaginationMeta
}

export type BasePaginatedResponse<T> = BaseReponse<PaginationReponse<T>>
