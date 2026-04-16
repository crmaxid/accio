'use client'

import { toast } from 'sonner'
import { useProduct } from '@/services'
import { type Product } from '@/types'
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
import { Delete02Icon, Loading03Icon } from '@hugeicons/core-free-icons'

interface DeleteProductProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export default function DeleteProduct({
  open,
  onOpenChange,
  product,
}: DeleteProductProps) {
  const {
    deleteProduct: { mutate, isPending },
  } = useProduct({})

  const handleDelete = () => {
    if (!product) return
    mutate(product.id, {
      onSuccess: () => {
        toast.success('Product deleted successfully')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete product'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
            <HugeiconsIcon
              icon={Delete02Icon}
              size={22}
              strokeWidth={2}
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <DialogTitle className="text-sm font-semibold text-gray-900">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              This action cannot be undone. The product and all associated SKUs
              will be permanently removed.
            </DialogDescription>
          </div>

          <div className="w-full rounded-lg border border-red-100 bg-red-50/60 px-4 py-3 text-left">
            <p className="text-[11px] font-medium tracking-wider text-red-400 uppercase">
              Product to be deleted
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {product?.name}
            </p>
            {product?.sku?.length ? (
              <p className="mt-0.5 text-xs text-gray-400">
                {product.sku.length} SKU{product.sku.length !== 1 ? 's' : ''}{' '}
                attached
              </p>
            ) : null}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={2} />
            )}
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
