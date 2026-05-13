import { PaginatedResponse } from './base'

export interface RawMaterial {
  _id: string
  displayName: string
  kinematicViscosity40: number | null
  kinematicViscosity100: number | null
  pourPoint: number | null
  flashPoint: string | null
  viscosityIndex: number | null
  createdAt: string
}

export type RawMaterialList = PaginatedResponse<RawMaterial>
