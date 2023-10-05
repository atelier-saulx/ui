import React, { FC } from 'react'
import { styled } from 'inlines'
import { Row, Text } from '../../'
import { LabelProps } from '../types'

export const Label: FC<LabelProps> = ({
  label,
  description,
  children,
  style,
}) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          marginRight: 16,
          flexDirection: 'column',
        }}
      >
        {label ? (
          <Row>
            <Text style={{ marginBottom: description ? 0 : 0 }} weight="strong">
              {label}
            </Text>
          </Row>
        ) : null}
        {description && <Text light>{description}</Text>}
      </styled.div>
      {children}
    </styled.div>
  )
}
