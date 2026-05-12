import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils/format'

interface CreatedByCellProps {
  name?: string | null
  avatarUrl?: string | null
}

export function CreatedByCell({ name, avatarUrl }: CreatedByCellProps) {
  if (!name) return <span className="text-gray-400">—</span>

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6 rounded-lg">
        <AvatarImage src={avatarUrl ?? undefined} />
        <AvatarFallback className="rounded-lg text-xs font-semibold text-gray-600">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  )
}
