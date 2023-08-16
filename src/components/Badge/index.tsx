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
        height: 24,
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : null,
        padding: '0 8px',
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
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
            marginRight: 8,
            minWidth: 10,
            maxWidth: '100%',
            height: 'auto',
          }}
        >
          {renderOrCreateElement(icon, { size: 10, color: contentColor })}
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
        <styled.div style={{ marginLeft: 8, display: 'flex' }}>
          {renderOrCreateElement(afterIcon, { size: 10, color: contentColor })}
        </styled.div>
      )}
    </styled.div>
  )
}
