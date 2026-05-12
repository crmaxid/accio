'use client'

import { useHeaderStore } from '@/stores'
import { useEffect } from 'react'

export function usePageTitle(title: string) {
  const setTitle = useHeaderStore((s) => s.setTitle)

  useEffect(() => {
    setTitle(title)
  }, [title, setTitle])
}
