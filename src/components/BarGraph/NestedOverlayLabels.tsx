import React, { useRef } from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { colorHash, color } from '../../varsUtilities'
import { useWindowResize } from '../../hooks'

export const NestedOverlayLabels = ({
  xPos,
  yPos,
  objKey,
  objValue,
  valueFormat,
  direction,
  value,
  label,
}) => {
  const { width, height } = useWindowResize()
  const nestedLabelRef = useRef<HTMLDivElement>()
  const labelWidth = nestedLabelRef?.current?.clientWidth
  const labelHeight = nestedLabelRef?.current?.clientHeight

  return (
    <styled.div
      ref={nestedLabelRef}
      style={{
        backgroundColor: color('background', 'default', 'muted'),
        zIndex: 1,
        borderRadius: 4,
        position: 'absolute',
        left: xPos,
        top: yPos,
        transform:
          yPos + labelHeight > height - 20 && xPos + labelWidth > width - 20
            ? 'translateY(-100%) translateX(-110%)'
            : yPos + labelHeight > height - 20
            ? 'translateY(-100%) translateX(0%)'
            : xPos + labelWidth > width - 20
            ? 'translateY(0%) translateX(-100%)'
            : 'translateY(0%) translateX(0%)',
        border: `1px solid ${color('inputBorder', 'neutralNormal')}`,
      }}
    >
      {label && (
        <Text
          weight="medium"
          size={16}
          style={{
            padding: '4px 12px',
            width: '100%',
            borderBottom: `1px solid ${color('inputBorder', 'neutralNormal')}`,
          }}
        >
          {label}
        </Text>
      )}
      <Text
        size={16}
        style={{
          padding: '4px 12px',
          width: '100%',
          borderBottom: `1px solid ${color('inputBorder', 'neutralNormal')}`,
        }}
      >
        <styled.div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            display: 'inline-block',
            marginRight: 8,
            backgroundColor: color(
              'nonSemanticBackground',
              colorHash('nonSemanticBackground', objKey),
              'strong'
            ),
          }}
        />
        {objKey}: <b>{prettyNumber(objValue, valueFormat)}</b>
      </Text>
      <styled.div style={{ padding: '4px 12px' }}>
        {Object.entries(value)
          .filter((item) => item[0] !== objKey)
          .map((item, idx) => (
            <Text key={idx}>
              <styled.div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: 6,
                  backgroundColor: color(
                    'nonSemanticBackground',
                    colorHash('nonSemanticBackground', item[0]),
                    'strong'
                  ),
                }}
              />{' '}
              {item[0]}: {prettyNumber(item[1] as number, valueFormat)}
            </Text>
          ))}
      </styled.div>
    </styled.div>
  )
}
