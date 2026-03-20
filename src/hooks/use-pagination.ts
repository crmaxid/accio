import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function usePagination(initialLimit = 15) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const limit = initialLimit

  const setPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(newPage))
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  return { page, limit, setPage }
}
