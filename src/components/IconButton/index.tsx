import { useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { Icon, IconProps } from '../Icon/index.js'
import { color } from '../../utils/colors.js'

type IconButtonProps = {
  variant: IconProps['variant']
  onClick?: () => void
  disabled?: boolean
  size?: 'normal' | 'small'
  color?: 'neutral' | 'destructive'
}

function IconButton({
  variant,
  onClick,
  disabled,
  size = 'normal',
  color: colorProp = 'neutral',
}: IconButtonProps) {
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)

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
        borderRadius: borderRadius(8),
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outlineStyle: 'none',
        ...(size === 'normal' && {
          padding: '6px',
        }),
        ...(size === 'small' && {
          padding: 0,
        }),
        ...(colorProp === 'neutral' && {
          background: color('neutral-100'),
          color: color('neutral-inverted-100'),
          ...(hover &&
            !disabled && {
              background: color('neutral-10-adjusted'),
              color: color('neutral-100'),
            }),
          ...(focus &&
            !disabled && {
              background: color('neutral-10-adjusted'),
              color: color('neutral-100'),
              outlineWidth: 4,
              outlineStyle: 'solid',
              outlineColor: color('neutral-20'),
            }),
          ...(disabled && {
            background: 'transparent',
            color: color('neutral-80'),
          }),
        }),
        ...(colorProp === 'destructive' && {
          background: color('destructive-100'),
          color: color('neutral-inverted-100'),
          ...(hover &&
            !disabled && {
              background: color('destructive-10'),
              color: color('destructive-100'),
            }),
          ...(focus &&
            !disabled && {
              background: color('destructive-10'),
              color: color('destructive-100'),
              outlineWidth: 4,
              outlineStyle: 'solid',
              outlineColor: color('destructive-20'),
            }),
          ...(disabled && {
            background: 'transparent',
            color: color('destructive-80'),
          }),
        }),
      }}
    >
      <Icon variant={variant} />
    </button>
  )
}

export type { IconButtonProps }
export { IconButton }
