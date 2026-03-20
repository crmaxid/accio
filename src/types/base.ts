export interface BaseReponse<T> {
  success: boolean
  data: T
}

export interface PaginationReponse<T> {
  success: boolean
  data: T[]
  meta: {
    total: number
    page: number
    pageSize: number
  }
}
