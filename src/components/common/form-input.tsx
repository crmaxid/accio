import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label: string
  optional?: boolean
  error?: { message?: string }
  prefix?: string
}

export function FormInput({
  label,
  optional,
  error,
  prefix,
  className,
  ...props
}: FormInputProps) {
  return (
    <Field>
      <FieldLabel>
        {label}
        {optional && <span className="text-xs text-gray-400">(optional)</span>}
      </FieldLabel>
      {prefix ? (
        <div className="flex">
          <span className="border-input inline-flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-xs text-gray-500">
            {prefix}
          </span>
          <Input className={`rounded-l-none ${className ?? ''}`} {...props} />
        </div>
      ) : (
        <Input className={className} {...props} />
      )}
      <FieldError errors={[error]} />
    </Field>
  )
}
