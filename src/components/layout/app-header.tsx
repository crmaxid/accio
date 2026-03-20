'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Notification01Icon } from '@hugeicons/core-free-icons'
import { useHeaderStore } from '@/stores'

export function AppHeader() {
  const title = useHeaderStore((s) => s.title)

  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-slate-100 px-5">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-slate-400 hover:text-slate-600" />
        <Separator orientation="vertical" className="h-10 bg-slate-200" />
        <div className="ml-2">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 text-slate-400 hover:text-slate-600"
      >
        <HugeiconsIcon icon={Notification01Icon} size={18} />
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      </Button>
    </header>
  )
}
