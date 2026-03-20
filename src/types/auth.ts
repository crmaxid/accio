import { BaseReponse } from './base'

export interface LoginResponseApi {
  message: string
}

export type LoginResponse = BaseReponse<LoginResponseApi>
