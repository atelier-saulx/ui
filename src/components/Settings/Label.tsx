import React, { ReactNode, FC } from 'react'
import { Text, Style, Row } from '~'

type LabelProps = {
  label?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  children?: ReactNode
  labelWidth?: number
  style?: Style
}

export const Label: FC<LabelProps> = ({
  label,
  description,
  icon,
  children,
  style,
  labelWidth,
}) => {
  if (!label && !description && !icon) {
    return null
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      }}
    >
      <div
        style={{
          minWidth: labelWidth,
          display: 'flex',
          marginRight: 16,
          flexDirection: 'column',
        }}
      >
        <Row>
          {icon && (
            <div
              style={{
                display: 'inline-block',
                marginRight: 8,
                marginBottom: description ? 2 : 0,
              }}
            >
              {icon}
            </div>
          )}
          <Text style={{ marginBottom: description ? 0 : 0 }} weight="strong">
            {label}
          </Text>
        </Row>
        {description && <Text weight="strong">{description}</Text>}
      </div>
      {children}
    </div>
  )
}
