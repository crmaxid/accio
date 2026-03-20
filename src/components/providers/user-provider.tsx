'use client'

import { useUser } from '@/services/core/user'

export function UserProvider({ children }: { children: React.ReactNode }) {
  useUser()
  return <>{children}</>
}
