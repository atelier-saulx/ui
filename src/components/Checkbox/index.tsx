import React, { FC } from 'react'
import { ToggleProps } from '../types'
import { styled } from 'inlines'
import { color as genColor } from '../../../src'
import { usePropState } from '../../hooks/usePropState'

export const Toggle: FC<ToggleProps> = ({
  active,
  disabled,
  onClick,
  size = 'large',
  style,
}) => {
  const [checked, setChecked] = usePropState(active)

  const width = size === 'large' ? '36px' : '28px'
  const height = size === 'large' ? '20px' : '16px'
  const circleSize = size === 'large' ? '16px' : '12px'

  return (
    <styled.input
      key="asdasd"
      type="checkbox"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        const newChecked = !checked
        setChecked(newChecked)
        onClick?.(newChecked)
      }}
      style={{
        width,
        height,
        borderRadius: '24px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: genColor(
          'action',
          checked ? 'primary' : 'neutral',
          checked ? 'normal' : 'subtleNormal'
        ),
        '&:hover': !disabled
          ? {
              backgroundColor: genColor(
                'action',
                checked ? 'primary' : 'neutral',
                checked ? 'hover' : 'subtleHover'
              ),
            }
          : null,
        '&:active': !disabled
          ? {
              backgroundColor: genColor(
                'action',
                checked ? 'primary' : 'neutral',
                checked ? 'active' : 'subtleActive'
              ),
            }
          : null,
        '&:focus': !disabled
          ? {
              outline: '1px solid',
              outlineColor: genColor('action', 'primary', 'selected'),

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
