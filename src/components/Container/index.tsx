import React, { FC, MouseEventHandler, ReactNode } from 'react'
import { IconErrorFill, IconAlertFill, IconInfoFill } from '../../icons'
import { styled, Style } from 'inlines'
import { RowSpaced, Row, Column } from '../Styled'
import { Text } from '../Text'
import { border, color as genColor } from '../../varsUtilities'
import { ColorBackgroundColors } from '../../varsTypes'
import { ClickHandler } from 'src/types'

export type ContainerProps = {
  color?: ColorBackgroundColors
  style?: Style
  size?: 'medium' | 'small'
  expandable?: boolean
  isExpanded?: boolean //(same can be controlled etc) undefined means uncontrolled
  icon?: ReactNode
  afterIcon?: ReactNode
  label?: ReactNode
  description?: ReactNode
  children?: ReactNode
  onClick?: ClickHandler
  seperator?: boolean
}

export const Container: FC<ContainerProps> = ({
  color = 'default',
  size = 'medium',
  children,
  style,
  seperator,
  expandable,
  isExpanded,
  icon,
  afterIcon,
  label,
  description,
  onClick,
}) => {
  const contentColor = color === 'default' ? 'default' : 'inverted'

  const hasHeader = icon || label || description

  return (
    <styled.div
      style={{
        color: contentColor,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        borderRadius: 8,
        backgroundColor: genColor('background', color, 'subtle'),
        border: border(1),
        width: '100%',
        cursor: onClick ? 'pointer' : null,
        '@media (hover: hover)': {
          '&:hover': onClick
            ? {
                backgroundColor: genColor('action', 'system', 'subtleHover'),
              }
            : null,
        },
        ...style,
      }}
    >
      {hasHeader ? (
        <RowSpaced
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            paddingBottom: seperator ? 16 : 4,
            alignItems: 'flex-start',
            position: 'relative',
            borderBottom: seperator ? border(1) : undefined,
          }}
        >
          {
            <Row
              style={{
                gap: 12,
                marginRight: 12,
              }}
            >
              {icon ? <styled.div>{icon}</styled.div> : null}
              <Column>
                <Text weight="strong" style={{ marginBottom: -6 }}>
                  {label}
                </Text>
                <Text weight="normal" light>
                  {description}
                </Text>
              </Column>
            </Row>
          }
          <Row
            style={{
              gap: 12,
              marginLeft: 12,
            }}
          >
            {afterIcon ? afterIcon : null}
          </Row>
        </RowSpaced>
      ) : null}
      {children ? (
        <styled.div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
            marginTop: icon || description ? 12 : hasHeader ? 4 : 16,
            flexGrow: 1,
          }}
        >
          {children}
        </styled.div>
      ) : null}
    </styled.div>
  )
}
