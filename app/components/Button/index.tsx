import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { ColorActionColors, ColorContentColors } from '../../../src/varsTypes'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'
import {
  IconCheckCircle,
  IconChevronDownSmall,
  color as genColor,
} from '../../../src'
import { Text } from '../Text'

// TODO add progress/ loading comp -icon

type ButtonProps = {
  // TODO add icons as IconProps here
  afterIcon?: any
  beforeIcon?: any
  color?: ColorActionColors
  disabled?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  label?: string
  loading?: boolean
  onClick?: () => void
  size?: 'large' | 'medium' | 'small'
  style?: Style
  subtle?: boolean
}

export const Button: FC<ButtonProps> = ({
  afterIcon,
  beforeIcon,
  color = 'primary',
  disabled,
  dropdownIndicator,
  ghost,
  label,
  loading,
  onClick,
  size = 'large',
  style,
  subtle,
}) => {
  //
  let contentColor: ColorContentColors =
    (subtle || ghost) && color === 'alert'
      ? 'negative'
      : (subtle || ghost) && color === 'neutral'
      ? 'default'
      : subtle || ghost
      ? 'brand'
      : 'inverted'

  return (
    <styled.div
      onClick={disabled ? null : onClick}
      style={{
        alignItems: 'center',
        backgroundColor: ghost
          ? 'transparent'
          : genColor('action', color, subtle ? 'subtleNormal' : 'normal'),
        borderRadius: size === 'small' ? '4px' : '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        opacity: disabled ? 0.4 : loading ? 0.7 : 1,
        padding:
          size === 'small'
            ? '2px 16px'
            : size === 'medium'
            ? '6px 16px'
            : '10px 16px',
        width: 'fit-content',
        '&:active': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleActive' : 'active'),
        },
        '&:focus': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleSelected' : 'selected'),
          border: `1px solid ${genColor('content', 'inverted', 'primary')}`,
          boxShadow: `0px 0px 0px 2px ${genColor(
            'action',
            'primary',
            'normal'
          )}`,
        },
        '&:hover': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleHover' : 'hover'),
        },
        ...style,
      }}
    >
      {loading && (
        <styled.div style={{ marginRight: 8 }}>
          <IconCheckCircle />
        </styled.div>
      )}
      {beforeIcon && (
        <styled.div
          style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
        >
          {renderOrCreateElement(beforeIcon, { color: contentColor })}
        </styled.div>
      )}
      <Text
        weight={size === 'small' ? 'medium' : 'strong'}
        size={size === 'small' ? 14 : 16}
        color={contentColor}
      >
        {label}
      </Text>
      {afterIcon && (
        <styled.div
          style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}
        >
          {renderOrCreateElement(afterIcon, { color: contentColor })}
        </styled.div>
      )}
      {dropdownIndicator && (
        <styled.div style={{ marginLeft: 12 }}>
          {renderOrCreateElement(IconChevronDownSmall, { color: contentColor })}
        </styled.div>
      )}
    </styled.div>
  )
}
