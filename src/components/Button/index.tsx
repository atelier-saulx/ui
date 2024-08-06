import { ReactNode, useState, forwardRef, Fragment } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { KeyHint, KeyHintProps } from '../KeyHint/index.js'
import { styled } from 'inlines'
import { Tooltip, TooltipProps } from '../Tooltip/index.js'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut.js'
import { Loader } from '../Loader/index.js'

type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  variant?: 'fill' | 'border' | 'ghost'
  color?: 'neutral' | 'red'
  size?: 'regular' | 'small'
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
  loading?: boolean
  toggled?: boolean
  keyHint?: KeyHintProps['hint']
  keyHintPlacement?: 'label' | 'tooltip' | 'none'
  tooltip?: TooltipProps['value']
  onClick?: (e?: MouseEvent) => void | Promise<void>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      variant: variantProp = 'fill',
      color = 'neutral',
      size = 'regular',
      leadIcon,
      trailIcon,
      loading: loadingProp,
      toggled,
      keyHint,
      tooltip,
      keyHintPlacement = 'label',
      onClick,
    },
    ref,
  ) => {
    if (leadIcon && trailIcon) {
      throw new Error('Button only supports one icon at a time.')
    }

    const [internalLoading, setInternalLoading] = useState(false)
    const loading = internalLoading || loadingProp
    const variant = toggled ? 'fill' : variantProp

    useKeyboardShortcut(keyHint, onClick)

    const Wrapper =
      tooltip || (keyHint && keyHintPlacement === 'tooltip')
        ? Tooltip
        : Fragment
    const wrapperProps =
      tooltip || (keyHint && keyHintPlacement === 'tooltip')
        ? {
            value: tooltip,
            keyHint: keyHintPlacement === 'tooltip' ? keyHint : undefined,
          }
        : {}

    return (
      <Wrapper {...wrapperProps}>
        <styled.button
          ref={ref}
          onClick={async (e) => {
            try {
              const result = onClick?.(e as unknown as MouseEvent)

              if (result instanceof Promise) {
                setInternalLoading(true)
                await result
              }
            } finally {
              setInternalLoading(false)
            }
          }}
          disabled={disabled || loading}
          data-size={size}
          data-variant={variant}
          data-color={color}
          data-loading={loading ? loading : undefined}
          data-disabled={disabled ? disabled : undefined}
          data-toggled={toggled ? toggled : undefined}
          style={{
            flexShrink: 0,
            appearance: 'none',
            outline: 'none',
            overflow: 'hidden',
            border: 'none',

            position: 'relative',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius[8],

            // size styles
            '&[data-size=regular]': {
              height: 32,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: leadIcon ? 6 : 10,
              paddingRight: trailIcon ? 6 : 10,
            },
            '&[data-size=small]': {
              height: 24,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: leadIcon ? 4 : 6,
              paddingRight: trailIcon || keyHint ? 4 : 6,
            },

            // focus outline styles
            '&[data-color=neutral]:focus-visible': {
              outline: `${colors.neutral20} solid 4px`,
            },
            '&[data-color=red]:focus-visible': {
              outline: `${colors.red60} solid 4px`,
            },

            // fill variant styles
            '&[data-variant=fill][data-color=neutral]': {
              background: colors.neutral100,
              color: colors.neutralInverted100,
            },
            '&[data-variant=fill][data-color=neutral]:hover:not(:disabled) .overlay':
              {
                background: colors.neutralInverted20,
              },
            '&[data-variant=fill][data-color=neutral]:focus-visible .overlay': {
              background: colors.neutralInverted20,
            },
            '&[data-variant=fill][data-color=neutral]:disabled': {
              opacity: 0.2,
            },
            '&[data-variant=fill][data-color=red]': {
              background: colors.red100,
              color: colors.white100,
            },
            '&[data-variant=fill][data-color=red]:hover:not(:disabled) .overlay':
              {
                background: colors.neutral10,
              },
            '&[data-variant=fill][data-color=red]:focus-visible .overlay': {
              background: colors.neutral10,
            },
            '&[data-variant=fill][data-color=red]:disabled': {
              background: colors.red20,
              color: colors.red20,
            },
            '&[data-variant=fill][data-color=red]:disabled .keyHintOverlay': {
              opacity: 0.2,
            },
            '&[data-variant=fill][data-color=red]:disabled .loaderOverlay': {
              opacity: 0.2,
            },

            // border variant styles
            '&[data-variant=border][data-color=neutral]': {
              background: 'transparent',
              color: colors.neutral80,
              boxShadow: `inset 0 0 0 1px ${colors.neutral20Adjusted}`,
            },
            '&[data-variant=border][data-color=neutral]:hover:not(:disabled)': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
              boxShadow: 'none',
            },
            '&[data-variant=border][data-color=neutral]:focus-visible': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
              boxShadow: 'none',
            },
            '&[data-variant=border][data-color=neutral]:disabled': {
              background: 'transparent',
              boxShadow: `inset 0 0 0 1px ${colors.neutral10Adjusted}`,
              color: colors.neutral20,
            },
            '&[data-variant=border][data-color=neutral]:disabled .keyHintOverlay':
              {
                opacity: 0.2,
              },
            '&[data-variant=border][data-color=neutral]:disabled .loaderOverlay':
              {
                opacity: 0.2,
              },
            '&[data-variant=border][data-color=red]': {
              background: 'transparent',
              color: colors.red80,
              boxShadow: `inset 0 0 0 1px ${colors.red20}`,
            },
            '&[data-variant=border][data-color=red]:hover:not(:disabled)': {
              background: colors.red20,
              color: colors.red100,
              boxShadow: 'none',
            },
            '&[data-variant=border][data-color=red]:focus-visible': {
              background: colors.red20,
              color: colors.red100,
              boxShadow: 'none',
            },
            '&[data-variant=border][data-color=red]:disabled': {
              background: 'transparent',
              color: colors.red20,
              boxShadow: `inset 0 0 0 1px ${colors.red10}`,
            },
            '&[data-variant=border][data-color=red]:disabled .keyHintOverlay': {
              opacity: 0.2,
            },
            '&[data-variant=border][data-color=red]:disabled .loaderOverlay': {
              opacity: 0.2,
            },

            // ghost variant styles
            '&[data-variant=ghost][data-color=neutral]': {
              background: 'transparent',
              color: colors.neutral80,
            },
            '&[data-variant=ghost][data-color=neutral]:hover:not(:disabled)': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
            },
            '&[data-variant=ghost][data-color=neutral]:focus-visible': {
              color: colors.neutral100,
              background: colors.neutral10Adjusted,
            },
            '&[data-variant=ghost][data-color=neutral]:disabled': {
              background: 'transparent',
              color: colors.neutral20,
            },
            '&[data-variant=ghost][data-color=neutral]:disabled .keyHintOverlay':
              {
                opacity: 0.2,
              },
            '&[data-variant=ghost][data-color=neutral]:disabled .loaderOverlay':
              {
                opacity: 0.2,
              },
            '&[data-variant=ghost][data-color=red]': {
              background: 'transparent',
              color: colors.red80,
            },
            '&[data-variant=ghost][data-color=red]:hover:not(:disabled)': {
              background: colors.red20,
              color: colors.red100,
            },
            '&[data-variant=ghost][data-color=red]:focus-visible': {
              background: colors.red20,
              color: colors.red100,
            },
            '&[data-variant=ghost][data-color=red]:disabled': {
              background: 'transparent',
              color: colors.red20,
            },
            '&[data-variant=ghost][data-color=red]:disabled .keyHintOverlay': {
              opacity: 0.2,
            },
            '&[data-variant=ghost][data-color=red]:disabled .loaderOverlay': {
              opacity: 0.2,
            },

            transition: 'transform 100ms cubic-bezier(0.2,0,0,1)',
            '&:active:not(:disabled)': {
              transform: 'scale(0.96)',
            },
          }}
        >
          <div
            className="overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          />
          <styled.div
            data-size={size}
            style={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              '&[data-size=regular]': {
                gap: 4,
              },
              '&[data-size=small]': {
                gap: 2,
              },
            }}
          >
            {leadIcon && !loading && <Icon variant={leadIcon} />}
            {leadIcon && loading && (
              <div className="loaderOverlay" style={{ display: 'flex' }}>
                <Loader
                  color={
                    variant === 'fill'
                      ? color === 'red'
                        ? 'red'
                        : 'inverted'
                      : color === 'red'
                        ? 'red'
                        : 'neutral'
                  }
                />
              </div>
            )}
            <Text
              color="inherit"
              variant={size === 'small' ? 'subtext-medium' : 'display-medium'}
            >
              {children}
            </Text>
            {trailIcon && !loading && <Icon variant={trailIcon} />}
            {((!trailIcon && !leadIcon) || trailIcon) && loading && (
              <div className="loaderOverlay" style={{ display: 'flex' }}>
                <Loader
                  color={
                    variant === 'fill'
                      ? color === 'red'
                        ? 'red'
                        : 'inverted'
                      : color === 'red'
                        ? 'red'
                        : 'neutral'
                  }
                />
              </div>
            )}
            {keyHint && keyHintPlacement === 'label' && (
              <div className="keyHintOverlay" style={{ display: 'flex' }}>
                <KeyHint
                  color={
                    variant === 'fill'
                      ? color === 'red'
                        ? loading || disabled
                          ? 'red'
                          : 'white'
                        : 'inverted'
                      : color === 'red'
                        ? 'red'
                        : 'neutral'
                  }
                  hint={keyHint}
                />
              </div>
            )}
          </styled.div>
        </styled.button>
      </Wrapper>
    )
  },
)

export type { ButtonProps }
export { Button }
