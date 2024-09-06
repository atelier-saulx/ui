import React, { forwardRef, MouseEvent, ReactNode } from 'react'
import { Icon, IconProps } from '../Icon/index.js'
import { styled } from 'inlines'
import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'

type DropdownProps = {
  disabled?: boolean
  placeholder?: string
  error: boolean
  leadIcon?: IconProps['variant']
  value?: ReactNode
  open?: boolean
  onClick?: (event: MouseEvent) => void
}

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ disabled, error, placeholder, value, leadIcon, open, onClick }, ref) => {
    return (
      <styled.button
        onClick={onClick}
        ref={ref}
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
          color: !value ? colors.neutral60 : colors.neutral100,
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
        <Text color="inherit">{!value ? placeholder : value}</Text>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            color: open ? colors.neutral100 : colors.neutral60,
            ...(open && {
              transform: 'rotate(180deg)',
            }),
          }}
        >
          <Icon variant="chevron-down" />
        </div>
      </styled.button>
    )
  },
)
export { Dropdown }
export type { DropdownProps }
