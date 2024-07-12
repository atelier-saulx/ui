import { useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'

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
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const disabled = loading || disabledProp

  return (
    <button
      onClick={() => {
        onClick?.()
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
      style={{
        position: 'relative',
        borderRadius: borderRadius(8),
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
            color: color('neutral-inverted-100'),
            background: color('neutral-100'),
            ...(focus &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('neutral-20'),
              }),
            ...(disabled && {
              color: color('neutral-inverted-60'),
              background: color('neutral-20'),
            }),
          }),
        ...(variant === 'primary' &&
          colorProp === 'destructive' && {
            color: color('white-100'),
            background: color('destructive-100'),
            ...(focus &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('destructive-60'),
              }),
            ...(disabled && {
              color: color('white-20'),
              background: color('destructive-20'),
            }),
          }),

        ...(variant === 'secondary' &&
          colorProp === 'neutral' && {
            color: color('neutral-80'),
            background: 'transparent',
            boxShadow: `inset 0 0 0 1px ${color('neutral-20-adjusted')}`,
            ...(hover &&
              !disabled && {
                boxShadow: 'none',
              }),
            ...(focus &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('neutral-20'),
                boxShadow: 'none',
              }),
            ...(disabled && {
              color: color('neutral-20'),
              background: 'transparent',
              boxShadow: `inset 0 0 0 1px ${color('neutral-10-adjusted')}`,
            }),
          }),
        ...(variant === 'secondary' &&
          colorProp === 'destructive' && {
            color: color('destructive-80'),
            background: 'transparent',
            boxShadow: `inset 0 0 0 1px ${color('destructive-20')}`,
            ...(hover &&
              !disabled && {
                boxShadow: 'none',
                color: color('destructive-100'),
              }),
            ...(focus &&
              !disabled && {
                boxShadow: 'none',
                color: color('destructive-100'),
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('destructive-60'),
              }),
            ...(disabled && {
              boxShadow: `inset 0 0 0 1px ${color('destructive-10')}`,
              color: color('destructive-20'),
            }),
          }),
        ...(variant === 'ghost' &&
          colorProp === 'neutral' && {
            color: color('neutral-80'),
            background: 'transparent',
            ...(focus &&
              !disabled && {
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('neutral-20'),
              }),
            ...(disabled && {
              color: color('neutral-20'),
              background: 'transparent',
            }),
          }),
        ...(variant === 'ghost' &&
          colorProp === 'destructive' && {
            color: color('destructive-80'),
            background: 'transparent',
            ...(hover &&
              !disabled && {
                color: color('destructive-100'),
              }),
            ...(focus &&
              !disabled && {
                color: color('destructive-100'),
                outlineWidth: 4,
                outlineStyle: 'solid',
                outlineColor: color('destructive-60'),
              }),
            ...(disabled && {
              color: color('destructive-20'),
            }),
          }),
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: borderRadius(8),
          ...(variant === 'primary' &&
            colorProp === 'neutral' &&
            (hover || focus) &&
            !disabled && {
              background: color('neutral-inverted-20'),
            }),
          ...(variant === 'primary' &&
            colorProp === 'destructive' &&
            (hover || focus) &&
            !disabled && {
              background: color('neutral-10'),
            }),
          ...(variant === 'secondary' &&
            colorProp === 'neutral' &&
            hover &&
            !disabled && {
              background: color('neutral-20-adjusted'),
            }),
          ...(variant === 'secondary' &&
            colorProp === 'neutral' &&
            focus &&
            !disabled && {
              background: color('neutral-10'),
            }),
          ...(variant === 'secondary' &&
            colorProp === 'destructive' &&
            (hover || focus) &&
            !disabled && {
              background: color('destructive-20'),
            }),
          ...(variant === 'ghost' &&
            colorProp === 'neutral' &&
            (hover || focus) &&
            !disabled && {
              background: color('neutral-10'),
            }),
          ...(variant === 'ghost' &&
            colorProp === 'destructive' &&
            (hover || focus) &&
            !disabled && {
              background: color('destructive-20'),
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
