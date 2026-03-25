import axios from 'axios'
import { createApiInstance } from './axios'

export const core = createApiInstance('/core')
export const analytics = createApiInstance('/core-analytics')
export const documents = createApiInstance('/core-document')
export const reports = createApiInstance('/core-report')

//? external api
export const googlemaps = axios.create({
  baseURL: 'https://places.googleapis.com/v1',
  headers: { 'Content-Type': 'application/json' },
})
