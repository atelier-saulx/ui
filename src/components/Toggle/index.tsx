import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { ColorActionColors, color as genColor } from '../../'
import { usePropState } from '../../hooks/usePropState'
import { ClickHandler } from '../../types'
import { BpTablet } from '../../utils/breakpoints'

export type ToggleProps = {
  value?: boolean
  color?: ColorActionColors
  disabled?: boolean
  onChange?: (value: string | number | boolean) => void
  style?: Style
  size?: 'large' | 'medium'
}

export const Toggle: FC<ToggleProps> = ({
  value,
  color = 'primary',
  disabled,
  onChange,
  size = 'large',
  style,
}) => {
  const [checked, setChecked] = usePropState(value)

  const width = size === 'large' ? '36px' : '28px'
  const height = size === 'large' ? '20px' : '16px'
  const circleSize = size === 'large' ? '16px' : '12px'

  return (
    <styled.div
      key="asdasd"
      // type="checkbox"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        const newChecked = !checked
        setChecked(newChecked)
        onChange?.(newChecked as any)
      }}
      style={{
        width,
        height,
        borderRadius: '24px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: genColor(
          'action',
          checked ? color : 'neutral',
          checked ? 'normal' : 'subtleNormal'
        ),
        '&:hover': !disabled
          ? {
              backgroundColor: genColor(
                'action',
                checked ? color : 'neutral',
                checked ? 'hover' : 'subtleHover'
              ),
            }
          : null,
        [BpTablet]: {
          '&:hover': {
            backgroundColor: genColor(
              'action',
              checked ? color : 'neutral',
              checked ? 'normal' : 'subtleNormal'
            ),
          },
        },
        '&:active': !disabled
          ? {
              backgroundColor: genColor(
                'action',
                checked ? color : 'neutral',
                checked ? 'active' : 'subtleActive'
              ),
            }
          : null,
        '&:focus': !disabled
          ? {
              outline: '1px solid',
              outlineColor: genColor('action', color, 'selected'),

              outlineOffset: '1px',
            }
          : null,
        transition: 'all 0.2s',
        '&:before': {
          content: '" "',
          width: circleSize,
          height: circleSize,
          borderRadius: '50%',
          transform: checked
            ? `translate3d(${size === 'medium' ? '14px' : '18px'}, 0px, 0px)`
            : 'translate3d(2px, 0px, 0px)',
          transition: 'transform 0.2s',
          boxShadow:
            '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
          backgroundColor: genColor('content', 'inverted', 'primary'),
        },
        ...style,
      }}
    />
  )
}
