import { format } from 'date-fns'
import { Calendar } from './Calendar.js'
import { Dropdown } from '../Dropdown/index.js'

type DateInputProps = {
  value?: number // milliseconds elapsed since the epoch (so like Date.now())
  onChange: (value: number) => void
  variant: 'date' | 'date-time'
  error?: boolean
  disabled?: boolean
  placeholder?: string
}

function DateInput({
  value,
  onChange,
  variant,
  error,
  disabled,
  placeholder,
}: DateInputProps) {
  return (
    <Calendar variant={variant} value={value} onChange={onChange}>
      {({ open }) => (
        <Dropdown
          open={open}
          error={error}
          leadIcon="date"
          disabled={disabled}
          placeholder={placeholder}
          value={
            value
              ? format(
                  new Date(value),
                  variant === 'date-time' ? 'MMM d, yyy HH:mm' : 'MMM d, yyy',
                )
              : undefined
          }
        />
      )}
    </Calendar>
  )
}

export { DateInput }
export type { DateInputProps }
