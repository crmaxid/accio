export const ENV = {
  MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
} as const
