import React, { FC, ReactNode } from 'react'
import {
  color as genColor,
  Text,
  styled,
  Style,
  renderOrCreateElement,
  ColorBackgroundColors,
  ColorNonSemanticContentColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
  IconCheck,
  useCopyToClipboard,
} from '../..'
import { ClickHandler } from '../../types'

const COLORGUARD = [
  'default',
  'inverted',
  'neutral',
  'informative',
  'positive',
  'warning',
  'negative',
  'brand',
]

export type BadgeProps = {
  afterIcon?: ReactNode
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  icon?: ReactNode
  children?: ReactNode
  onClick?: ClickHandler
  style?: Style
  light?: boolean
  copyValue?
}

export const CopyBadge: FC<BadgeProps & { copyValue?: string | number }> = ({
  copyValue,
  ...rest
}) => {
  const [copy, copyClick] = useCopyToClipboard(copyValue)
  return (
    <Badge
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        copyClick()
      }}
      icon={copy ? IconCheck : icon}
      ...rest
      />
  )
}

export const Badge: FC<BadgeProps> = ({
  icon,
  style,
  onClick,
  light,
  children,
  afterIcon,
  color = 'neutral',
}) => {
  const contentColor: ColorContentColors | ColorNonSemanticContentColors = light
    ? color === 'neutral'
      ? 'default'
      : color
    : COLORGUARD.includes(color)
    ? color === 'warning'
      ? 'default'
      : 'inverted'
    : color === 'orange'
    ? 'grey'
    : 'white'

  return (
    <styled.div
      onClick={onClick}
      style={{
        flexShrink: 0,
        height: 24,
        whiteSpace: 'nowrap',
        minWidth: 'fit-content',
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : null,
        padding: !children ? '0px 0px' : '0px 8px',
        width: children ? 'fit-content' : 24,
        maxWidth: '100%',
        display: 'flex',
        color: genColor(
          COLORGUARD.includes(color) ? 'content' : 'nonSemanticContent',
          contentColor,
          'primary'
        ),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: genColor(
          COLORGUARD.includes(color) ? 'background' : 'nonSemanticBackground',
          color,
          light ? 'muted' : 'strong'
        ),
        ...style,
      }}
    >
      {icon && (
        <styled.div
          style={{
            display: 'flex',
            marginRight: children ? 8 : 0,
            width: 16,
            height: 16,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderOrCreateElement(icon, { size: 16, color: 'inherit' })}
        </styled.div>
      )}
      <Text
        size={14}
        selectable="none"
        style={{
          color: 'inherit',
        }}
      >
        {children}
      </Text>
      {afterIcon && (
        <styled.div
          style={{
            display: 'flex',
            marginLeft: children ? 8 : 0,
            width: 16,
            height: 16,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderOrCreateElement(afterIcon, { size: 16, color: 'inherit' })}
        </styled.div>
      )}
    </styled.div>
  )
}
