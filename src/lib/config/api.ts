import { createApiInstance } from './axios'

export const core = createApiInstance('/core')
export const analytics = createApiInstance('/core-analytics')
export const documents = createApiInstance('/core-document')
export const reports = createApiInstance('/core-report')
