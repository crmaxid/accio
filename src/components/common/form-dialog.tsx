'use client'

import { ReactNode } from 'react'
import { Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type DialogButtonType = 'submit' | 'cancel' | 'delete'

export interface DialogButtonConfig {
  type: DialogButtonType
  label: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}

type DialogSize = 'sm' | 'md' | 'lg'

const sizeClass: Record<DialogSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
}

const buttonVariant: Record<
  DialogButtonType,
  'default' | 'outline' | 'destructive'
> = {
  submit: 'default',
  cancel: 'outline',
  delete: 'destructive',
}

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  size?: DialogSize
  onSubmit?: React.ComponentProps<'form'>['onSubmit']
  buttons?: DialogButtonConfig[]
  children: ReactNode
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  size = 'sm',
  onSubmit,
  buttons,
  children,
}: FormDialogProps) {
  const footer = buttons && buttons.length > 0 && (
    <DialogFooter>
      {buttons.map((btn) =>
        btn.type === 'cancel' ? (
          <DialogClose key="cancel" asChild>
            <Button
              type="button"
              variant="outline"
              onClick={btn.onClick}
              disabled={btn.disabled}
            >
              {btn.label}
            </Button>
          </DialogClose>
        ) : (
          <Button
            key={btn.type}
            type={onSubmit && btn.type === 'submit' ? 'submit' : 'button'}
            variant={buttonVariant[btn.type]}
            onClick={!onSubmit ? btn.onClick : undefined}
            disabled={btn.disabled || btn.loading}
          >
            {btn.loading && (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            )}
            {btn.label}
          </Button>
        ),
      )}
    </DialogFooter>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClass[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {onSubmit ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {children}
            {footer}
          </form>
        ) : (
          <>
            {children}
            {footer}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
