import { useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { useHadKeyboardEvent } from '../../hooks/useHadKeyboardEvent.js'

type ButtonProps = {
  children: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  color?: 'neutral' | 'destructive'
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
  loading?: boolean
  size?: 'normal' | 'small'
}

function Button({
  children,
  onClick,
  disabled: disabledProp,
  loading,
  variant = 'primary',
  color: colorProp = 'neutral',
  size = 'normal',
  leadIcon,
  trailIcon,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [focus, setFocus] = useState(false)
  const hadKeyboardEvent = useHadKeyboardEvent()
  const focused = focus && hadKeyboardEvent
  const disabled = loading || disabledProp

  return (
    <button
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
      style={{
        flexShrink: 0,
        position: 'relative',
        borderRadius: radius[8],
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        padding: size === 'normal' ? '6px 8px' : '0px 2px',
        minHeight: size === 'normal' ? 36 : 24,
        cursor: disabled ? 'not-allowed' : 'pointer',
        outlineStyle: 'none',
        ...(variant === 'primary' &&
          colorProp === 'neutral' && {
            color: colors.neutralInverted100,
            background: colors.neutral100,
            ...(focused &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.neutral20,
              }),
            ...(disabled && {
              color: colors.neutralInverted60,
              background: colors.neutral20,
            }),
          }),
        ...(variant === 'primary' &&
          colorProp === 'destructive' && {
            color: colors.white100,
            background: colors.red100,
            ...(focused &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.red60,
              }),
            ...(disabled && {
              color: colors.white20,
              background: colors.red20,
            }),
          }),

        ...(variant === 'secondary' &&
          colorProp === 'neutral' && {
            color: colors.neutral80,
            background: 'transparent',
            boxShadow: `inset 0 0 0 1px ${colors.neutral20Adjusted}`,
            ...(hovered &&
              !disabled && {
                boxShadow: 'none',
              }),
            ...(focused &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.neutral20,
                boxShadow: 'none',
              }),
            ...(disabled && {
              color: colors.neutral20,
              background: 'transparent',
              boxShadow: `inset 0 0 0 1px ${colors.neutral10Adjusted}`,
            }),
          }),
        ...(variant === 'secondary' &&
          colorProp === 'destructive' && {
            color: colors.red80,
            background: 'transparent',
            boxShadow: `inset 0 0 0 1px ${colors.red20}`,
            ...(hovered &&
              !disabled && {
                boxShadow: 'none',
                color: colors.red100,
              }),
            ...(focused &&
              !disabled && {
                boxShadow: 'none',
                color: colors.red100,
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.red60,
              }),
            ...(disabled && {
              boxShadow: `inset 0 0 0 1px ${colors.red10}`,
              color: colors.red20,
            }),
          }),
        ...(variant === 'ghost' &&
          colorProp === 'neutral' && {
            color: colors.neutral80,
            background: 'transparent',
            ...(focused &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.neutral20,
              }),
            ...(disabled && {
              color: colors.neutral20,
              background: 'transparent',
            }),
          }),
        ...(variant === 'ghost' &&
          colorProp === 'destructive' && {
            color: colors.red80,
            background: 'transparent',
            ...(hovered &&
              !disabled && {
                color: colors.red100,
              }),
            ...(focused &&
              !disabled && {
                color: colors.red100,
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: colors.red60,
              }),
            ...(disabled && {
              color: colors.red20,
            }),
          }),
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius[8],
          ...(variant === 'primary' &&
            colorProp === 'neutral' &&
            (hovered || focused) &&
            !disabled && {
              background: colors.neutralInverted20,
            }),
          ...(variant === 'primary' &&
            colorProp === 'destructive' &&
            (hovered || focused) &&
            !disabled && {
              background: colors.neutral10,
            }),
          ...(variant === 'secondary' &&
            colorProp === 'neutral' &&
            hovered &&
            !disabled && {
              background: colors.neutral20Adjusted,
            }),
          ...(variant === 'secondary' &&
            colorProp === 'neutral' &&
            focused &&
            !disabled && {
              background: colors.neutral10,
            }),
          ...(variant === 'secondary' &&
            colorProp === 'destructive' &&
            (hovered || focused) &&
            !disabled && {
              background: colors.red20,
            }),
          ...(variant === 'ghost' &&
            colorProp === 'neutral' &&
            (hovered || focused) &&
            !disabled && {
              background: colors.neutral10,
            }),
          ...(variant === 'ghost' &&
            colorProp === 'destructive' &&
            (hovered || focused) &&
            !disabled && {
              background: colors.red20,
            }),
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!leadIcon && !trailIcon && loading && <Icon variant="loader" />}
        {leadIcon && <Icon variant={loading ? 'loader' : leadIcon} />}
        {!leadIcon && trailIcon && <div style={{ width: 2, height: '100%' }} />}
        <Text color="inherit" variant="display-medium">
          {children}
        </Text>
        {trailIcon && (
          <Icon variant={loading && !leadIcon ? 'loader' : trailIcon} />
        )}
        {(leadIcon || (!leadIcon && !trailIcon && loading)) && !trailIcon && (
          <div style={{ width: 2, height: '100%' }} />
        )}
      </div>
    </button>
  )
}

export type { ButtonProps }
export { Button }
