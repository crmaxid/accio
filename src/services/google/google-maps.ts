import { useQuery } from '@tanstack/react-query'
import { googlemaps } from '@/lib'
import {
  GenericAddress,
  GooglePlaceAutocompleteResponse,
  GooglePlaceDetails,
} from '@/types'

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!

export const usePlacesAutocomplete = (query: string) => {
  return useQuery({
    queryKey: ['places-autocomplete', query],
    queryFn: () =>
      googlemaps
        .post<GooglePlaceAutocompleteResponse>(
          '/places:autocomplete',
          {
            input: query.trim(),
            locationBias: {
              circle: {
                center: { latitude: -6.9341099, longitude: 107.6189368 },
                radius: 5000,
              },
            },
          },
          {
            headers: {
              'X-Goog-Api-Key': GOOGLE_API_KEY,
              'X-Goog-FieldMask':
                'suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat',
            },
          },
        )
        .then((res) =>
          res.data.suggestions.map((s) => ({
            placeId: s.placePrediction.placeId,
            mainText: s.placePrediction.structuredFormat.mainText.text,
            secondaryText:
              s.placePrediction.structuredFormat.secondaryText?.text,
          })),
        ),
    enabled: query.length > 0,
    staleTime: 1000 * 60,
  })
}

export const usePlaceDetails = (placeId: string | null) => {
  return useQuery({
    queryKey: ['place-details', placeId],
    queryFn: () =>
      googlemaps
        .get<GooglePlaceDetails>(`/places/${placeId}`, {
          headers: {
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': '*',
          },
        })
        .then((res) => {
          const d = res.data
          const get = (type: string) =>
            d.addressComponents.find((c) => c.types.includes(type))?.longText ??
            ''

          const address: GenericAddress = {
            fullAddress: d.formattedAddress,
            line1: get('route'),
            line2: d.formattedAddress,
            subDistrict: get('administrative_area_level_3'),
            village: get('administrative_area_level_4') || null,
            city: get('administrative_area_level_2'),
            province: get('administrative_area_level_1'),
            postalCode: get('postal_code') || null,
            country: get('country'),
            latitude: d.location.latitude,
            longitude: d.location.longitude,
          }

          return address
        }),
    enabled: !!placeId,
    staleTime: 1000 * 60 * 10,
  })
}
