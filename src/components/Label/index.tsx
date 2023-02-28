import React, { ReactNode, FunctionComponent } from 'react'
import { Text, Color, spaceToPx } from '~'
import { Space, Icon } from '~/types'
import { renderOrCreateElement } from '~/utils'
import { styled, Style } from 'inlines'

type LabelProps = {
  label?: ReactNode
  labelColor?: Color
  description?: ReactNode
  descriptionColor?: Color
  icon?: FunctionComponent<Icon> | ReactNode
  iconColor?: Color
  children?: ReactNode
  space?: Space
  style?: Style
}

export const Label = ({
  label,
  labelColor,
  description,
  descriptionColor,
  icon,
  space,
  iconColor: colorProp = 'accent',
  children,
  style,
}: LabelProps) => {
  if (!label && !description && !icon) {
    return null
  }
  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: space ? spaceToPx(space) : 0,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div
            style={{
              display: 'inline-block',
              marginRight: 8,
              marginBottom: description ? 2 : 0,
            }}
          >
            {renderOrCreateElement(icon, {
              color: colorProp,
            })}
          </div>
        )}
        <Text
          wrap
          style={{ marginBottom: description ? 0 : 0 }}
          color={labelColor || 'text'}
          typo="body600"
        >
          {label}
        </Text>
      </div>
      {description && (
        <Text wrap typo="body500" color={descriptionColor || 'text2'}>
          {description}
        </Text>
      )}
      <div>{children}</div>
    </styled.div>
  )
}
