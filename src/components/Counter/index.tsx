import React, { FC, ReactNode } from 'react'
import {
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
} from '../../varsTypes'
import { isSemanticColor } from '../../utils'
import { useTheme } from '../../hooks'
import { color as genColor } from '../../varsUtilities'
import { Text } from '../../components'
import { Center } from '../Styled'
import { Style, styled } from 'inlines'
import { ClickHandler } from '../../types'
import { renderOrCreateElement } from '../../utils'
import { prettyNumber, NumberFormat } from '@based/pretty-number'

export type CounterProps = {
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  children?: ReactNode
  onClick?: ClickHandler
  style?: Style
  light?: boolean
  label?: string
  icon?: ReactNode
  valueFormat?: NumberFormat
}

export const Counter: FC<CounterProps> = ({
  color: colorProp = 'default',
  children,
  onClick,
  style,
  light,
  label,
  icon,
  valueFormat = 'number-round-0',
}) => {
  const { theme } = useTheme()

  const color =
    colorProp === 'white'
      ? theme === 'dark'
        ? 'inverted'
        : 'default'
      : colorProp

  const contentColor: string = light
    ? color === 'neutral'
      ? 'default'
      : color
    : isSemanticColor(color)
    ? color === 'warning'
      ? 'default'
      : 'inverted'
    : color === 'orange'
    ? 'grey'
    : 'white'

  return (
    <Center
      onClick={onClick}
      style={{
        border: color === 'default' ? '1px solid' : undefined,
        borderColor: genColor(
          'nonSemanticBorder',
          'grey',
          light ? 'subtle' : 'strong'
        ),
        backgroundColor: genColor(
          isSemanticColor(color) ? 'background' : 'nonSemanticBackground',
          color as ColorBackgroundColors | ColorNonSemanticBackgroundColors,
          light ? 'muted' : 'strong'
        ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                contentColor as ColorContentColors,
                'primary'
              ),
        borderRadius: '16px',
        minWidth: '24px',
        width: 'fit-content',
        padding: '2px 6px',
        maxHeight: '24px',
        height: '24px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {icon && (
        <styled.div
          style={{
            display: 'flex',
            marginLeft: 2,
            marginRight: children ? 6 : 0,
            width: 12,
            height: 12,
            maxWidth: '100%',
            maxHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              width: '12px',
              heigth: '12px',
            },
          }}
        >
          {renderOrCreateElement(icon, { color: 'inherit' })}
        </styled.div>
      )}
      <Text
        selectable="none"
        style={{ color: 'inherit' }}
        weight="strong"
        size={12}
      >
        {prettyNumber(Number(children), valueFormat)}
      </Text>
    </Center>
  )
}
