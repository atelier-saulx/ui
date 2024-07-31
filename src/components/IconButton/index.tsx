import { forwardRef, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'
import { useHadKeyboardEvent } from '../../hooks/useHadKeyboardEvent.js'
import { styled } from 'inlines'

type IconButtonProps = {
  variant: IconProps['variant']
  onClick?: () => void
  disabled?: boolean
  size?: 'normal' | 'small' | 'tiny'
  color?: 'neutral' | 'destructive'
  toggled?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant,
      onClick,
      disabled,
      size = 'normal',
      color: colorProp = 'neutral',
      toggled,
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState(false)
    const [focus, setFocus] = useState(false)
    const hadKeyboardEvent = useHadKeyboardEvent()
    const focused = focus && hadKeyboardEvent

    return (
      <styled.button
        ref={ref}
        onClick={() => {
          onClick?.()
        }}
        onMouseEnter={() => {
          setHovered(true)
        }}
        onMouseLeave={() => {
          setHovered(false)
        }}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
        disabled={disabled}
        style={{
          display: 'inline-flex',
          flexShrink: 0,
          position: 'relative',
          border: 'none',
          overflow: 'hidden',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outlineStyle: 'none',
          padding: 0,
          transition: 'transform 100ms cubic-bezier(0.2,0,0,1)',
          '&:active:not(:disabled)': {
            transform: 'scale(0.96)',
          },
          ...(size === 'normal' && {
            width: 36,
            height: 36,
            borderRadius: radius[8],
          }),
          ...(size === 'small' && {
            width: 24,
            height: 24,
            borderRadius: radius[8],
          }),
          ...(size === 'tiny' && {
            width: 16,
            height: 16,
            borderRadius: radius[4],
          }),
          ...(colorProp === 'neutral' && {
            background: 'transparent',
            color: colors.neutral80,
            ...(hovered &&
              !disabled && {
                background: colors.neutral10Adjusted,
                color: colors.neutral100,
              }),
            ...(focused &&
              !disabled && {
                background: colors.neutral10Adjusted,
                color: colors.neutral100,
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.neutral20,
              }),
            ...(disabled && {
              background: 'transparent',
              color: colors.neutral20,
            }),
            ...(toggled && {
              background: colors.neutral100,
              color: colors.neutralInverted100,
              ...(disabled && {
                background: colors.neutral20,
                color: colors.neutralInverted60,
              }),
            }),
          }),
          ...(colorProp === 'destructive' && {
            background: 'transparent',
            color: colors.red80,
            ...(hovered &&
              !disabled && {
                background: colors.red10,
                color: colors.red100,
              }),
            ...(focused &&
              !disabled && {
                background: colors.red10,
                color: colors.red100,
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.red20,
              }),
            ...(disabled && {
              background: 'transparent',
              color: colors.red20,
            }),
            ...(toggled && {
              background: colors.red100,
              color: colors.white100,
              ...(disabled && {
                background: colors.red20,
                color: colors.white20,
              }),
            }),
          }),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: size === 'tiny' ? radius[4] : radius[8],
            ...(toggled &&
              colorProp === 'neutral' &&
              (hovered || focused) &&
              !disabled && {
                background: colors.neutralInverted20,
              }),
            ...(toggled &&
              colorProp === 'destructive' &&
              (hovered || focused) &&
              !disabled && {
                background: colors.neutral10,
              }),
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Icon variant={variant} />
        </div>
      </styled.button>
    )
  },
)

export type { IconButtonProps }
export { IconButton }
