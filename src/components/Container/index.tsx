import React, { FC, useState, ReactNode } from 'react'
import { IconChevronRight } from '../../icons'
import { styled, Style } from 'inlines'
import { RowSpaced, Row, Column } from '../Styled'
import { Text } from '../Text'
import { border, color as genColor } from '../../varsUtilities'
import { ColorBackgroundColors } from '../../varsTypes'
import { ClickHandler } from 'src/types'

export type ContainerProps = {
  color?: ColorBackgroundColors
  style?: Style
  expandable?: boolean
  onExpand?: (expanded: boolean) => void
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
  children,
  style,
  seperator,
  expandable,
  isExpanded,
  icon,
  onExpand,
  afterIcon,
  label,
  description,
  onClick,
}) => {
  const [isExpandedState, setExpanded] = useState(false)

  if (isExpanded === undefined) {
    isExpanded = isExpandedState
  }

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
      onClick={onClick}
    >
      {hasHeader ? (
        <RowSpaced
          style={{
            cursor: !onClick && expandable ? 'pointer' : null,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            paddingBottom: seperator ? 16 : 4,
            position: 'relative',
            '@media (hover: hover)': {
              '&:hover':
                !onClick && expandable
                  ? {
                      backgroundColor: genColor(
                        'action',
                        'system',
                        'subtleHover'
                      ),
                    }
                  : null,
            },
            borderBottom:
              seperator && !(expandable && !isExpanded) ? border(1) : undefined,
          }}
          onClick={
            !onClick
              ? () => {
                  setExpanded(!isExpanded)
                  if (onExpand) {
                    onExpand(!isExpanded)
                  }
                }
              : null
          }
        >
          {
            <Row
              style={{
                gap: 12,
                marginRight: 12,
              }}
            >
              {expandable ? (
                <IconChevronRight
                  onClick={() => {
                    setExpanded(!isExpanded)
                    if (onExpand) {
                      onExpand(!isExpanded)
                    }
                  }}
                  style={{
                    transition: 'transform 0.15s',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              ) : null}
              {icon ? <styled.div>{icon}</styled.div> : null}
              <Column>
                <Text
                  selectable="none"
                  weight="strong"
                  style={{ marginBottom: -6 }}
                >
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
      {!(expandable && !isExpanded) && children ? (
        <styled.div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
            marginTop:
              icon || description || seperator ? 12 : hasHeader ? 4 : 16,
            flexGrow: 1,
          }}
        >
          {children}
        </styled.div>
      ) : null}
    </styled.div>
  )
}
