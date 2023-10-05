import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { Column, Row, Text } from '../../'
import { LabelProps } from '../types'
import { border } from '../../../varsUtilities'

export const Label: FC<LabelProps> = ({
  label,
  description,
  children,
  style,
}) => {
  const [isFocus, setFocus] = useState(false)
  return (
    <Column
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
      style={{
        marginBottom: 32,
        paddingLeft: 12,
        borderLeft: border(2, isFocus ? 'brand' : 'default'),
        ...style,
      }}
    >
      {label ? (
        <Row>
          <Text style={{ marginBottom: description ? 0 : 0 }} weight="strong">
            {label}
          </Text>
        </Row>
      ) : null}
      <styled.div
        style={{
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        {children}
      </styled.div>
      {description && <Text light>{description}</Text>}
    </Column>
  )
}
