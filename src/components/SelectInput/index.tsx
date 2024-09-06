import { ReactNode, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { styled } from 'inlines'
import { Text } from '../Text/index.js'
import { Menu } from '../Menu/index.js'
import { TextInput } from '../TextInput/index.js'
import { Separator } from '../Separator/index.js'

// TODO @vassbence hoist the dropdown out, so it can be reused for eg the datetimeinput.

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
}

function SelectInput({
  disabled,
  error,
  leadIcon,
  options,
  value,
  onChange,
  placeholder,
}: SelectInputProps) {
  const [filter, setFilter] = useState<string>()
  const empty = !value

  return (
    <Menu
      onOpenChange={() => {
        setFilter('')
      }}
    >
      <Menu.Trigger>
        {({ open }) => (
          <styled.button
            disabled={disabled}
            data-open={open ? open : undefined}
            data-error={error ? error : undefined}
            style={{
              position: 'relative',
              width: '100%',
              height: 36,
              gap: 4,
              display: 'inline-flex',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '0 8px',
              background: 'transparent',
              borderRadius: radius[8],
              border: `1px solid ${colors.neutral20Adjusted}`,
              color: empty ? colors.neutral60 : colors.neutral100,
              outline: 'none',
              '&:not(:disabled):focus-visible, &[data-open]': {
                background: colors.neutralInverted100,
                border: `1px solid ${colors.neutral100}`,
                outline: `4px solid ${colors.neutral20}`,
              },
              '&[data-error]': {
                border: `1px solid ${colors.red80}`,
              },
              '&[data-error]:not(:disabled):focus-visible, &[data-error][data-open]':
                {
                  background: colors.neutralInverted100,
                  border: `1px solid ${colors.red100}`,
                  outline: `4px solid ${colors.red60}`,
                },
              '&:disabled': {
                color: colors.neutral20,
                background: colors.neutral5,
                border: `1px solid transparent`,
              },
            }}
          >
            {leadIcon && <Icon variant={leadIcon} />}
            <Text color="inherit">
              {empty
                ? placeholder
                : options.find((e) => e.value === value).label}
            </Text>
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                color: open ? colors.neutral100 : colors.neutral60,
                transition: 'transform 300ms cubic-bezier(0.7, -0.4, 0.4, 1.4)',
                ...(open && {
                  transform: 'rotate(180deg)',
                }),
              }}
            >
              <Icon variant="chevron-down" />
            </div>
          </styled.button>
        )}
      </Menu.Trigger>
      <Menu.Items>
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
        {options
          .filter((option) => {
            if (filter && option.labelFilterText) {
              return option.labelFilterText
                .toLowerCase()
                .startsWith(filter.toLocaleLowerCase())
            }

            if (filter && typeof option.label === 'string') {
              return option.label
                .toLowerCase()
                .startsWith(filter.toLocaleLowerCase())
            }

            return true
          })
          .map((option) => (
            <Menu.ToggleItem
              value={value === option.value}
              onChange={() => {
                onChange(option.value)
              }}
            >
              {option.label}
            </Menu.ToggleItem>
          ))}
      </Menu.Items>
    </Menu>
  )
}

export { SelectInput }
export type { SelectInputProps }
