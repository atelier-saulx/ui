import { useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { styled } from 'inlines'
import { Text } from '../Text/index.js'
import { Menu } from '../Menu/index.js'

// TODO once done hoist the dropdown out, so it can be reused.
// TODO correct placeholder color

type SelectInputOption = {
  value: string
  label: string
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
  return (
    <Menu>
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
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 8px',
              background: 'transparent',
              borderRadius: radius[8],
              border: `1px solid ${colors.neutral20Adjusted}`,
              color: colors.neutral60,
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
            <Text>
              {value
                ? options.find((e) => e.value === value).label
                : placeholder}
            </Text>
            <div
              style={{
                display: 'flex',
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
        {options.map((option) => (
          <Menu.Item
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
