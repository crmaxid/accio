'use client'

import { useEffect, useRef, useState } from 'react'

export function useSearchDebounce(
  externalValue: string | undefined,
  onChange: ((value: string) => void) | undefined,
) {
  const [searchInput, setSearchInput] = useState(externalValue ?? '')
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!onChangeRef.current) return
    const timeout = setTimeout(() => {
      onChangeRef.current!(searchInput)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  return { searchInput, setSearchInput }
}
