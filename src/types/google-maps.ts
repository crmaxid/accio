export interface GooglePlaceAutocompleteResponse {
  suggestions: Array<{
    placePrediction: {
      placeId: string
      structuredFormat: {
        mainText: { text: string }
        secondaryText?: { text: string }
      }
    }
  }>
}

export interface GooglePlaceDetails {
  formattedAddress: string
  addressComponents: Array<{
    longText: string
    shortText: string
    types: string[]
  }>
  location: {
    latitude: number
    longitude: number
  }
}
