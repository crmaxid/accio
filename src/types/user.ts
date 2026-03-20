import { BaseReponse } from './base'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  role: {
    id: string
    name: string
  }
  company: {
    id: string
    name: string
    code: string
  }
  profile: {
    gender: string
    phoneNumber: string
    address: string
    avatarUrl: string
    birthDate: string | null
  }
}

export type UserInforResponse = BaseReponse<User>
