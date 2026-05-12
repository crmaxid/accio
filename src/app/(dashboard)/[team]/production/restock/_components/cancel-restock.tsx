'use client'

import { toast } from 'sonner'
import { useRestock } from '@/services/core/restock'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Loading03Icon } from '@hugeicons/core-free-icons'

interface CancelRestockProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  restock: { id: string; number: string } | null
}

export default function CancelRestock({
  open,
  onOpenChange,
  restock,
}: CancelRestockProps) {
  const {
    cancelRestock: { mutate, isPending },
  } = useRestock({ page: 1, limit: 10 })

  const handleCancel = () => {
    if (!restock) return
    mutate(restock.id, {
      onSuccess: () => {
        toast.success('Restock cancelled successfully')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to cancel restock'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={22}
              strokeWidth={2}
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <DialogTitle className="text-sm font-semibold text-gray-900">
              Cancel Restock Request
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              This action cannot be undone. The restock request will be
              permanently cancelled.
            </DialogDescription>
          </div>

          <div className="w-full rounded-lg border border-red-100 bg-red-50/60 px-4 py-3 text-left">
            <p className="text-[11px] font-medium tracking-wider text-red-400 uppercase">
              Request to be cancelled
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-gray-800">
              {restock?.number}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1" disabled={isPending}>
              Keep Request
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleCancel}
            disabled={isPending}
          >
            {isPending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
            )}
            Cancel Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
