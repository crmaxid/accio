'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { toast } from 'sonner'
import Mapbox from './mapbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { usePlaceDetails, usePlacesAutocomplete } from '@/services/google'
import { GenericAddress } from '@/types'

interface AddressFinderProps {
  onChange?: (address: GenericAddress | null) => void
}

export default function AddressFinder({ onChange }: AddressFinderProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 700)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [dragPosition, setDragPosition] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [line2Edit, setLine2Edit] = useState<string | null>(null)

  const { data: suggestions = [] } = usePlacesAutocomplete(debouncedQuery)
  const { data: fetchedAddress, isError } = usePlaceDetails(selectedPlaceId)

  const displayAddress: GenericAddress | null = fetchedAddress
    ? {
        ...fetchedAddress,
        latitude: dragPosition?.latitude ?? fetchedAddress.latitude,
        longitude: dragPosition?.longitude ?? fetchedAddress.longitude,
        line2: line2Edit ?? fetchedAddress.line2,
      }
    : null

  const buildAddress = useCallback(
    (overrides: Partial<GenericAddress>): GenericAddress | null => {
      if (!fetchedAddress) return null
      return {
        ...fetchedAddress,
        latitude: dragPosition?.latitude ?? fetchedAddress.latitude,
        longitude: dragPosition?.longitude ?? fetchedAddress.longitude,
        line2: line2Edit ?? fetchedAddress.line2,
        ...overrides,
      }
    },
    [fetchedAddress, dragPosition, line2Edit],
  )

  useEffect(() => {
    if (!fetchedAddress) return
    onChange?.(fetchedAddress)
  }, [fetchedAddress, onChange])

  useEffect(() => {
    if (isError) toast.error('Failed to fetch place details')
  }, [isError])

  const handleSelectPlace = (placeId: string, mainText: string) => {
    setQuery(mainText)
    setSelectedPlaceId(placeId)
    setDragPosition(null)
    setLine2Edit(null)
    setShowSuggestions(false)
  }

  const handleMarkerDragEnd = (coords: {
    latitude: number
    longitude: number
  }) => {
    setDragPosition(coords)
    onChange?.(buildAddress(coords))
  }

  const handleLine2Change = (value: string) => {
    setLine2Edit(value)
    onChange?.(buildAddress({ line2: value }))
  }

  const isOpen = showSuggestions && suggestions.length > 0

  return (
    <div className="flex flex-col gap-3">
      <Label>Address</Label>

      <div className="h-64 w-full overflow-hidden rounded-lg border border-gray-200">
        <Mapbox
          latitude={displayAddress?.latitude}
          longitude={displayAddress?.longitude}
          onMarkerDragEnd={handleMarkerDragEnd}
        />
      </div>

      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(!!e.target.value)
          }}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search address..."
          className="h-8 text-xs"
        />
        {isOpen && (
          <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-lg">
            {suggestions.map((s) => (
              <li
                key={s.placeId}
                onMouseDown={() => handleSelectPlace(s.placeId, s.mainText)}
                className="cursor-pointer px-3 py-2 hover:bg-gray-50"
              >
                <p className="text-xs font-medium text-gray-800">
                  {s.mainText}
                </p>
                {s.secondaryText && (
                  <p className="text-[11px] text-gray-400">{s.secondaryText}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {displayAddress && (
        <Textarea
          value={displayAddress.line2 ?? ''}
          onChange={(e) => handleLine2Change(e.target.value)}
          placeholder="Full address details"
          className="font-mono text-xs"
        />
      )}
    </div>
  )
}
