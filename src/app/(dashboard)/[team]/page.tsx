'use client'

import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/use-page-title'
import { CrmaxDashboard } from './_components/crmax-dashboard'

export default function TeamDashboardPage() {
  const { team } = useParams<{ team: string }>()
  usePageTitle('Overview')

  if (team === 'crmax') return <CrmaxDashboard />

  return (
    <div className="text-muted-foreground flex flex-1 items-center justify-center rounded-xl border border-dashed">
      <p>Dashboard — {team}</p>
    </div>
  )
}
