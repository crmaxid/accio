import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label: string
  optional?: boolean
  error?: { message?: string }
}

export function FormTextarea({
  label,
  optional,
  error,
  ...props
}: FormTextareaProps) {
  return (
    <Field>
      <FieldLabel>
        {label}
        {optional && (
          <span className="text-xs font-normal text-gray-400">(optional)</span>
        )}
      </FieldLabel>
      <Textarea {...props} />
      <FieldError errors={[error]} />
    </Field>
  )
}
