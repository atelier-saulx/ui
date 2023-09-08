import React, { FC, ReactNode, MouseEvent } from 'react'
import { styled, Style, color, Text } from '../..'
import { BpTablet } from '../../utils/breakpoints'

type BreadcrumbsProps = {
  style?: Style
  data?: {
    [key: string]: ReactNode | ((e: MouseEvent<HTMLDivElement>) => void)
  }
  active?: string
  onChange?: (key: string) => void
}

const StyledLink = styled('div', {
  alignItems: 'center',
  borderRadius: 4,
  display: 'flex',
  height: 32,
  cursor: 'pointer',
})

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  data,
  style,
  active,
  onChange,
  ...props
}) => {
  if (!data) {
    return null
  }

  return (
    <styled.div style={{ display: 'flex', ...style }} {...props}>
      {Object.keys(data).map((key, index) => {
        const el = data[key]
        const onClick =
          typeof el === 'function'
            ? (e) => {
                if (onChange) {
                  onChange(key)
                }
                el(e)
              }
            : () => {
                if (onChange) {
                  onChange(key)
                }
              }

        const label = (
          <Text
            selectable="none"
            size={16}
            weight="strong"
            style={{
              padding: '2px 8px',
              color:
                index === Object.keys(data).length - 1
                  ? color('content', 'default', 'secondary')
                  : color('content', 'default', 'primary'),
              borderRadius: 4,
              '&:hover': {
                backgroundColor: color('action', 'system', 'hover'),
              },
              [BpTablet]: {
                '&:hover': {
                  backgroundColor: color('action', 'system', 'normal'),
                },
              },
              '&:focus': {
                backgroundColor: color('action', 'system', 'active'),
              },
            }}
          >
            {typeof el === 'function' ? key : el}
          </Text>
        )

        return (Object.keys(data).length > 4 && index < 3) ||
          (Object.keys(data).length > 4 &&
            index === Object.keys(data).length - 1) ? (
          <StyledLink key={index} onClick={onClick}>
            {label}
            {Object.keys(data).length - 1 !== index && (
              <Text
                selectable="none"
                size={16}
                weight="strong"
                light
                style={{
                  marginLeft: 12,
                  marginRight: 12,
                }}
              >
                /
              </Text>
            )}
          </StyledLink>
        ) : Object.keys(data).length > 4 && index === 3 ? (
          <>
            <Text
              selectable="none"
              size={16}
              weight="strong"
              style={{ padding: '2px 8px' }}
            >
              ...
            </Text>
            <Text
              selectable="none"
              size={16}
              light
              weight="strong"
              style={{
                marginLeft: 12,
                marginRight: 12,
              }}
            >
              /
            </Text>
          </>
        ) : Object.keys(data).length < 5 ? (
          <StyledLink key={index} onClick={onClick}>
            {label}
            {Object.keys(data).length - 1 !== index && (
              <Text
                selectable="none"
                size={16}
                weight="strong"
                style={{
                  marginLeft: 12,
                  marginRight: 12,
                  color: color('content', 'default', 'secondary'),
                }}
              >
                /
              </Text>
            )}
          </StyledLink>
        ) : null
      })}
    </styled.div>
  )
}
