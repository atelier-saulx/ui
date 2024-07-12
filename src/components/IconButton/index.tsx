import { useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { Icon, IconProps } from '../Icon/index.js'
import { color } from '../../utils/colors.js'

type IconButtonProps = {
  variant: IconProps['variant']
  onClick?: () => void
  disabled?: boolean
  size?: 'normal' | 'small' | 'tiny'
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
        position: 'relative',
        border: 'none',
        overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outlineStyle: 'none',
        padding: 0,
        ...(size === 'normal' && {
          width: 36,
          height: 36,
          borderRadius: borderRadius(8),
        }),
        ...(size === 'small' && {
          width: 24,
          height: 24,
          borderRadius: borderRadius(8),
        }),
        ...(size === 'tiny' && {
          width: 16,
          height: 16,
          borderRadius: borderRadius(4),
        }),
        ...(colorProp === 'neutral' && {
          background: 'transparent',
          color: color('neutral-80'),
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
            color: color('neutral-20'),
          }),
        }),
        ...(colorProp === 'destructive' && {
          background: 'transparent',
          color: color('destructive-80'),
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
            color: color('destructive-20'),
          }),
        }),
      }}
    >
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
    </button>
  )
}

export type { IconButtonProps }
export { IconButton }
