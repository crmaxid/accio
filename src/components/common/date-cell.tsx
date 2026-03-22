import { formatDateTime } from '@/lib/utils/format'

interface DateCellProps {
  iso: string | undefined | null
}

export function DateCell({ iso }: DateCellProps) {
  const { date, time } = formatDateTime(iso)

  if (!iso) return <span className="text-gray-400">—</span>

  return (
    <div className="flex flex-col">
      <span>{date}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  )
}
