import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { styled } from 'inlines'

type OptionCardGroupProps = {
  value: string
  onChange: (value: string) => void
  options: {
    label: string
    value: string
    icon: IconProps['variant']
    disabled?: boolean
  }[]
}

function OptionCardGroup({ value, onChange, options }: OptionCardGroupProps) {
  if (![2, 3, 4].includes(options.length)) {
    throw new Error('OptionCardGroup only supports 2, 3 or 4 options')
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        ...(options.length > 3 && {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }),
      }}
    >
      {options.map((option) => (
        <styled.button
          tabIndex={option.disabled ? -1 : 0}
          data-selected={option.value === value ? true : undefined}
          data-disabled={option.disabled ? true : undefined}
          style={{
            height: 72,
            flex: 1,
            gap: 4,
            borderRadius: radius[8],
            color: colors.neutral80,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            appearance: 'none',
            background: 'transparent',
            '&:hover:not([data-disabled])': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
            },
            '&:focus-visible:not([data-disabled])': {
              outlineWidth: 4,
              outlineStyle: 'solid',
              outlineColor: colors.neutral20,
            },
            '&[data-selected]': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
            },
            '&[data-selected]:hover:not([data-disabled])': {
              background: colors.neutral20Adjusted,
            },
            '&[data-disabled]': {
              color: colors.neutral20,
              cursor: 'not-allowed',
            },
          }}
          onClick={() => {
            if (option.disabled) return

            onChange(option.value)
          }}
        >
          <Icon variant={option.icon} />
          <Text
            variant={option.value === value ? 'display-bold' : 'display-medium'}
            color="inherit"
          >
            {option.label}
          </Text>
        </styled.button>
      ))}
    </div>
  )
}

export type { OptionCardGroupProps }
export { OptionCardGroup }
