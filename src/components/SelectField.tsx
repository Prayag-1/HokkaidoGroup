import * as Label from '@radix-ui/react-label'
import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  id: string
  label: string
  value: string
  placeholder: string
  options: readonly SelectOption[]
  error?: string
  describedBy?: string
  onBlur?: () => void
  onValueChange: (value: string) => void
}

export function SelectField({
  id,
  label,
  value,
  placeholder,
  options,
  error,
  describedBy,
  onBlur,
  onValueChange,
}: SelectFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const ariaDescribedBy = [describedBy, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="corporate-field">
      <Label.Root className="corporate-field__label" htmlFor={id}>
        {label}
      </Label.Root>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className="corporate-select-trigger"
          aria-invalid={Boolean(error)}
          aria-describedby={ariaDescribedBy}
          onBlur={onBlur}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="corporate-select-trigger__icon">
            <ChevronDown aria-hidden="true" size={18} strokeWidth={1.9} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="corporate-select-content" position="popper" sideOffset={6}>
            <Select.Viewport className="corporate-select-viewport">
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className="corporate-select-item">
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="corporate-select-item__indicator">
                    <Check aria-hidden="true" size={16} strokeWidth={2} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error ? (
        <p id={errorId} className="corporate-form-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
