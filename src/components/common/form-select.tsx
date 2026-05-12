'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  options: SelectOption[]
  value: string
  onValueChange: (value: string) => void
  label?: string
  optional?: boolean
  placeholder?: string
  error?: { message?: string }
  className?: string
}

export function FormSelect({
  options,
  value,
  onValueChange,
  label,
  optional,
  placeholder,
  error,
  className,
}: FormSelectProps) {
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
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn('h-8', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={[error]} />
    </Field>
  )
}
