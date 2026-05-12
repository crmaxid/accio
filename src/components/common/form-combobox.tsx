'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

interface FormComboboxProps<T> {
  items: T[]
  value: string
  onValueChange: (value: string) => void
  getItemValue: (item: T) => string
  getItemLabel: (item: T) => string
  label?: string
  optional?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  renderItem?: (item: T) => React.ReactNode
  error?: { message?: string }
  className?: string
}

export function FormCombobox<T>({
  items,
  value,
  onValueChange,
  getItemValue,
  getItemLabel,
  label,
  optional,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  renderItem,
  error,
  className,
}: FormComboboxProps<T>) {
  const [open, setOpen] = useState(false)
  const selected = items.find((item) => getItemValue(item) === value)

  return (
    <Field>
      {label && (
        <FieldLabel>
          {label}
          {optional && (
            <span className="text-xs font-normal text-gray-400">
              (optional)
            </span>
          )}
        </FieldLabel>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('h-8 w-full justify-between font-normal', className)}
          >
            {selected ? (
              getItemLabel(selected)
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="size-3.5 shrink-0 opacity-50"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const itemValue = getItemValue(item)
                  return (
                    <CommandItem
                      key={itemValue}
                      value={getItemLabel(item)}
                      data-checked={value === itemValue}
                      onSelect={() => {
                        onValueChange(value === itemValue ? '' : itemValue)
                        setOpen(false)
                      }}
                    >
                      {renderItem ? renderItem(item) : getItemLabel(item)}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldError errors={[error]} />
    </Field>
  )
}
