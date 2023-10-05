import React, { FC } from 'react'
import { styled } from 'inlines'
import { Row, Text } from '../../'
import { LabelProps } from '../types'

export const Label: FC<LabelProps> = ({
  label,
  description,
  children,
  style,
  labelWidth,
}) => {
  if (!label && !description) {
    return null
  }
  return (
    <styled.div
      style={{
        margin: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      }}
    >
      <styled.div
        style={{
          minWidth: labelWidth,
          display: 'flex',
          marginRight: 16,
          flexDirection: 'column',
        }}
      >
        <Row>
          <Text style={{ marginBottom: description ? 0 : 0 }} weight="strong">
            {label}
          </Text>
        </Row>
        {description && <Text light>{description}</Text>}
      </styled.div>
      {children}
    </styled.div>
  )
}
