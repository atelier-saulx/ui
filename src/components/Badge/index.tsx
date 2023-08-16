import React, { FC, SyntheticEvent } from 'react'
import { styled, Style } from 'inlines'
import { BadgeProps } from '../types'
import { color as genColor } from '../../../src'
import { Text } from '../Text'
import { renderOrCreateElement } from '../../utils/renderOrCreateElement'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
} from '../../varsTypes'

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

// export const CopyBadge: FC<BadgeProps & { copyValue?: string | number }> = ({
//   copyValue,
//   icon,
//   style,
//   label,
//   afterIcon,
//   color,
// }) => {

//   const [copy, copyClick] = useCopyToClipboard(copyValue)
//   return (
//     <Badge
//       onClick={(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         copyClick()

//       }}
//       icon={copy ? CheckIcon : icon}
//       label={label}
//     />
//   )
// }

export const Badge: FC<BadgeProps> = ({
  icon,
  style,
  onClick,
  subtle,
  label,
  afterIcon,
  color = 'neutral',
}) => {
  const contentColor: ColorContentColors | ColorNonSemanticContentColors =
    subtle
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
        minWidth: 'fit-content',
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : null,
        padding: !label ? '0px 0px' : '0px 8px',
        width: label ? 'fit-content' : 24,
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
          subtle ? 'muted' : 'strong'
        ),
        ...style,
      }}
    >
      {icon && (
        <styled.div
          style={{
            display: 'flex',
            marginRight: label ? 8 : 0,
            width: 16,
            height: 16,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderOrCreateElement(icon, { size: 10, color: 'inherit' })}
        </styled.div>
      )}
      <Text
        size={14}
        style={{
          userSelect: 'none',
          color: genColor(
            COLORGUARD.includes(color) ? 'content' : 'nonSemanticContent',
            contentColor,
            'primary'
          ),
        }}
      >
        {label}
      </Text>
      {afterIcon && (
        <styled.div
          style={{
            display: 'flex',
            marginLeft: label ? 8 : 0,
            width: 16,
            height: 16,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderOrCreateElement(afterIcon, { size: 10, color: 'inherit' })}
        </styled.div>
      )}
    </styled.div>
  )
}
