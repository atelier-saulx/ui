import React, { FC, ReactNode } from 'react'
import { IconCheckCircle } from '../../icons'
import { ClickHandler } from '../../types'
import {
  ColorBackgroundColors,
  ColorNonSemanticContentColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
} from '../../varsTypes'
import { useTheme, useCopyToClipboard } from '../../hooks'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'

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
  copyValue?: string | number
  copy?: boolean
}

const CopyBadgeInner: FC<BadgeProps & { copyValue?: string | number }> = ({
  copyValue,
  icon,
  onClick,
  ...rest
}) => {
  const valueToCopy: any =
    copyValue ??
    (typeof rest.children === 'string' || typeof rest.children === 'number'
      ? rest.children
      : '')
  const [copy, copyClick] = useCopyToClipboard(valueToCopy)
  return (
    <BadgeInner
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        copyClick()
        if (onClick) {
          onClick(e)
        }
      }}
      icon={copy ? <IconCheckCircle /> : icon}
      {...rest}
    />
  )
}

const BadgeInner: FC<BadgeProps> = ({
  icon,
  style,
  onClick,
  light,
  children,
  afterIcon,
  color: colorProp = 'neutral',
}) => {
  const { theme } = useTheme()
  const color =
    colorProp === 'white'
      ? theme === 'dark'
        ? 'inverted'
        : 'default'
      : colorProp

  const contentColor: ColorContentColors | ColorNonSemanticContentColors = light
    ? color === 'neutral'
      ? 'default'
      : color
    : COLORGUARD.includes(color)
    ? color === 'warning' || color === 'default'
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
            marginRight: children ? 4 : 0,
            width: 16,
            height: 16,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              width: children ? '14px' : '16px',
              height: children ? '14px' : '16px',
            },
          }}
        >
          {icon}
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
          afterIcon
        </styled.div>
      )}
    </styled.div>
  )
}

export const Badge: FC<BadgeProps> = (props) => {
  if (props.copy) {
    return <CopyBadgeInner {...props} />
  } else {
    return <BadgeInner {...props} />
  }
}
