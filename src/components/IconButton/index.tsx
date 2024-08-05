import { forwardRef, Fragment, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'
import { Tooltip, TooltipProps } from '../Tooltip/index.js'
import { styled } from 'inlines'
import { Loader } from '../Loader/index.js'
import { KeyHintProps } from '../KeyHint/index.js'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut.js'

type IconButtonProps = {
  icon: IconProps['variant']
  onClick?: () => void
  disabled?: boolean
  size?: 'regular' | 'small' | 'tiny'
  color?: 'neutral' | 'red'
  toggled?: boolean
  loading?: boolean
  tooltip?: TooltipProps['value']
  keyHint?: KeyHintProps['hint']
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      onClick,
      disabled,
      icon,
      toggled,
      loading,
      color = 'neutral',
      tooltip,
      size = 'regular',
      keyHint,
    },
    ref,
  ) => {
    const Wrapper = tooltip || keyHint ? Tooltip : Fragment
    const wrapperProps =
      tooltip || keyHint ? { value: tooltip, keyHint: keyHint } : {}

    useKeyboardShortcut(keyHint, onClick)

    return (
      <Wrapper {...wrapperProps}>
        <styled.button
          ref={ref}
          onClick={onClick}
          disabled={disabled || loading}
          data-size={size}
          data-color={color}
          data-loading={loading ? loading : undefined}
          data-disabled={disabled ? disabled : undefined}
          data-toggled={toggled ? toggled : undefined}
          style={{
            appearance: 'none',
            outline: 'none',
            border: 'none',
            padding: 0,
            overflow: 'hidden',

            position: 'relative',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',

            // size styles
            '&[data-size=regular]': {
              height: 36,
              width: 36,
              borderRadius: radius[8],
            },
            '&[data-size=small]': {
              height: 24,
              width: 24,
              borderRadius: radius[8],
            },
            '&[data-size=tiny]': {
              height: 16,
              width: 16,
              borderRadius: radius[4],
            },

            // color styles
            '&[data-color=neutral]': {
              background: 'transparent',
              color: colors.neutral80,
            },
            '&[data-color=red]': {
              background: 'transparent',
              color: colors.red80,
            },

            // hover styles
            '&[data-color=neutral]:hover': {
              background: colors.neutral10Adjusted,
              color: colors.neutral100,
            },
            '&[data-color=red]:hover': {
              background: colors.red20,
              color: colors.red100,
            },

            // focus styles
            '&[data-color=neutral]:focus-visible': {
              background: colors.neutral10Adjusted,
              color: colors.neutral100,
              outline: `${colors.neutral20} solid 4px`,
            },
            '&[data-color=red]:focus-visible': {
              background: colors.red20,
              color: colors.red100,
              outline: `${colors.red60} solid 4px`,
            },

            // disabled styles
            '&[data-disabled]': {
              pointerEvents: 'none',
            },
            '&[data-color=neutral][data-disabled]': {
              background: 'transparent',
              color: colors.neutral20,
            },
            '&[data-color=red][data-disabled]': {
              background: 'transparent',
              color: colors.red20,
            },

            // loading styles
            '&[data-loading]': {
              pointerEvents: 'none',
            },
            '&[data-loading][data-color=neutral]': {
              opacity: 0.2,
            },
            '&[data-loading][data-color=red]': {
              opacity: 0.2,
            },

            // toggled color styles
            '&[data-toggled][data-color=neutral]': {
              background: colors.neutral100,
              color: colors.neutralInverted100,
            },
            '&[data-toggled][data-color=red]': {
              background: colors.red100,
              color: colors.white100,
            },

            // toggled hover styles
            '&[data-toggled][data-color=neutral]:hover > .overlay': {
              background: colors.neutralInverted20,
            },
            '&[data-toggled][data-color=red]:hover > .overlay': {
              background: colors.neutral10,
            },

            // toggled disabled styles
            '&[data-toggled][data-color=neutral][data-disabled]': {
              background: colors.neutral20,
              color: colors.neutralInverted60,
            },
            '&[data-toggled][data-color=red][data-disabled]': {
              background: colors.red20,
              color: colors.red20,
            },

            // toggled loading styles
            '&[data-toggled][data-loading][data-color=neutral]': {
              opacity: 0.2,
            },
            '&[data-toggled][data-loading][data-color=red]': {
              opacity: 1,
              background: colors.red20,
            },

            transition: 'transform 100ms cubic-bezier(0.2,0,0,1)',
            '&:active:not(:disabled)': {
              transform: 'scale(0.93)',
            },
          }}
        >
          {toggled && (
            <div
              className="overlay"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {loading ? (
              <span
                style={{
                  display: 'flex',
                  opacity: color === 'red' && toggled ? 0.2 : 1,
                  transform: `scale(${size === 'tiny' ? 16 / 24 : 1})`,
                }}
              >
                <Loader
                  color={color === 'neutral' && toggled ? 'inverted' : color}
                />
              </span>
            ) : (
              <Icon variant={icon} />
            )}
          </div>
        </styled.button>
      </Wrapper>
    )
  },
)

export type { IconButtonProps }
export { IconButton }
