import { ReactNode, useState } from 'react'
import { IconProps } from '../Icon/index.js'
import { Menu } from '../Menu/index.js'
import { TextInput } from '../TextInput/index.js'
import { Separator } from '../Separator/index.js'
import { Dropdown } from '../Dropdown/index.js'

type SelectInputOption = {
  value: string
  label: string | ReactNode
  labelFilterText?: string
}

type SelectInputProps = {
  value?: string
  onChange: (value: string) => void
  leadIcon?: IconProps['variant']
  error?: boolean
  disabled?: boolean
  placeholder?: string
  options: SelectInputOption[]
  filterable?: boolean
}

function SelectInput({
  disabled,
  error,
  leadIcon,
  options,
  value,
  onChange,
  placeholder,
  filterable = false,
}: SelectInputProps) {
  const [filter, setFilter] = useState<string>()

  return (
    <Menu
      onOpenChange={() => {
        setFilter('')
      }}
    >
      <Menu.Trigger>
        {({ open }) => (
          <Dropdown
            open={open}
            error={error}
            leadIcon={leadIcon}
            disabled={disabled}
            placeholder={placeholder}
            value={
              value ? options.find((e) => e.value === value).label : undefined
            }
          />
        )}
      </Menu.Trigger>
      <Menu.Items>
        {filterable && (
          <>
            <TextInput
              value={filter}
              onChange={(value) => {
                setFilter(value)
              }}
              variant="ghost"
              leadIcon="search"
              placeholder="Find..."
              size="small"
            />
            <Separator />
          </>
        )}
        {options
          .filter((option) => {
            if (filter && option.labelFilterText) {
              return option.labelFilterText
                .toLowerCase()
                .includes(filter.toLocaleLowerCase())
            }

            if (filter && typeof option.label === 'string') {
              return option.label
                .toLowerCase()
                .includes(filter.toLocaleLowerCase())
            }

            return true
          })
          .map((option) => (
            <Menu.Item
              indentContent
              leadIcon={value === option.value ? 'checkmark' : undefined}
              onClick={() => {
                onChange(option.value)
              }}
            >
              {option.label}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  )
}

export { SelectInput }
export type { SelectInputProps }
