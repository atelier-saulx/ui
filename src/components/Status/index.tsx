import React, { FC } from 'react'
import { StatusProps } from '../types'
import { Center } from '../Styled'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
} from '../../varsTypes'
import { isSemanticColor } from '../../utils/isSemanticColor'
import { color as genColor } from '../../../src'
import { styled } from 'inlines'
import { Text } from '../Text'

export const Status: FC<StatusProps> = ({
  color = 'default',
  ghost,
  label,
  onClick,
  style,
  subtle,
}) => {
  const contentColor: ColorContentColors | ColorNonSemanticContentColors =
    subtle || ghost
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
    <styled.div
      onClick={onClick}
      style={{
        // display: 'inline-flex',
        backgroundColor: ghost
          ? null
          : genColor(
              isSemanticColor(color) ? 'background' : 'nonSemanticBackground',
              color,
              subtle ? 'muted' : 'strong'
            ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                contentColor,
                'primary'
              ),
        borderRadius: '4px',
        minWidth: '24px',
        width: 'fit-content',
        padding: ' 0px 8px 0px 4px',
        maxHeight: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',

        ...style,
      }}
    >
      <styled.div
        style={{
          height: '8px',
          width: '8px',
          //   marginLeft: '4px',
          marginRight: '4px',
          backgroundColor:
            color === 'default'
              ? genColor('content', 'default', 'primary')
              : genColor(
                  isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                  contentColor,
                  'primary'
                ),
          borderRadius: '50%',
        }}
      />

      <Text
        style={{
          userSelect: 'none',
          color:
            color === 'default'
              ? genColor('content', 'default', 'primary')
              : genColor(
                  isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                  contentColor,
                  'primary'
                ),
          height: '24px',
          lineHeight: '23px',
        }}
      >
        {label}
      </Text>
    </styled.div>
  )
}

// pulsate
