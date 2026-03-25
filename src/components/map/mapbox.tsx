'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import Map, { MapRef, Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { HugeiconsIcon } from '@hugeicons/react'
import { MapPinIcon } from '@hugeicons/core-free-icons'
import { ENV } from '@/lib'

interface MapboxProps {
  latitude?: number
  longitude?: number
  zoom?: number
  height?: number | string
  width?: number | string
  onMarkerDragEnd?: (coords: { latitude: number; longitude: number }) => void
}

const DEFAULT_LAT = -6.9341099
const DEFAULT_LNG = 107.6189368

function Mapbox({
  latitude = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
  zoom = 16,
  height = '100%',
  width = '100%',
  onMarkerDragEnd,
}: MapboxProps) {
  const mapRef = useRef<MapRef | null>(null)
  const [marker, setMarker] = useState({ latitude, longitude })

  const [prevLatLng, setPrevLatLng] = useState({ latitude, longitude })
  if (prevLatLng.latitude !== latitude || prevLatLng.longitude !== longitude) {
    setPrevLatLng({ latitude, longitude })
    setMarker({ latitude, longitude })
  }

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom,
      speed: 1.5,
      curve: 1.5,
      essential: true,
    })
  }, [latitude, longitude, zoom])

  const handleDrag = useCallback(
    (e: { lngLat: { lat: number; lng: number } }) =>
      setMarker({ latitude: e.lngLat.lat, longitude: e.lngLat.lng }),
    [],
  )

  const handleDragEnd = useCallback(
    (e: { lngLat: { lat: number; lng: number } }) => {
      const coords = { latitude: e.lngLat.lat, longitude: e.lngLat.lng }
      setMarker(coords)
      mapRef.current?.flyTo({
        center: [coords.longitude, coords.latitude],
        zoom,
        speed: 1.2,
        curve: 1.2,
        essential: true,
      })
      onMarkerDragEnd?.(coords)
    },
    [zoom, onMarkerDragEnd],
  )

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={ENV.MAPBOX_TOKEN}
        initialViewState={{ longitude, latitude, zoom }}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          draggable
          longitude={marker.longitude}
          latitude={marker.latitude}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          anchor="bottom"
        >
          <HugeiconsIcon
            icon={MapPinIcon}
            size={32}
            className="cursor-move text-red-600 drop-shadow-lg"
          />
        </Marker>
      </Map>
    </div>
  )
}

export default memo(Mapbox)
