import { useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'

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
          ...(hover &&
            !disabled && {
              background: colors.neutral10Adjusted,
              color: colors.neutral100,
            }),
          ...(focus &&
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
        }),
        ...(colorProp === 'destructive' && {
          background: 'transparent',
          color: colors.red80,
          ...(hover &&
            !disabled && {
              background: colors.red10,
              color: colors.red100,
            }),
          ...(focus &&
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
