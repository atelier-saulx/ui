import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { Weight } from '~/types'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Button, ButtonProps } from '../Button'
import { Link, useRoute } from 'kabouter'
import { ScrollArea } from '../ScrollArea'
import { Text } from '../Text'
import { styled } from 'inlines'

const StyledLink = styled(Link, {
  padding: '4px 12px',
  margin: '-4px -12px',
  borderRadius: 4,
})

type SystemMenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
}

type SystemMenuItemProps = {
  children?: ReactNode | FC
  style?: CSSProperties
  href?: string
  isActive?: boolean
  isNested?: boolean
  weight?: Weight
}

const MenuHeader: FC<SystemMenuHeaderProps> = ({ children, style }) => {
  return (
    <Text
      weight="600"
      style={{
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

export const MenuItem: FC<SystemMenuItemProps> = ({
  children,
  style,
  href,
  isActive,
  isNested = false,
  weight = isNested ? 500 : 600,
}) => {
  return (
    <Text
      color={isActive ? 'lightaccent:contrast' : isNested ? 'text2' : 'text'}
      weight={isActive ? 600 : weight}
      wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <StyledLink
        href={href}
        style={{
          backgroundColor: isActive ? color('lightaccent:active') : null,
          '@media (hover: hover)': {
            '&:hover': !isActive
              ? {
                  backgroundColor: color('background:hover'),
                  color: `${color('text')} !important`,
                }
              : null,
          },
        }}
      >
        {typeof children === 'function'
          ? children({
              // @ts-ignore TODO fix
              isActive,
            })
          : children}
      </StyledLink>
    </Text>
  )
}

export const MenuButton: FC<ButtonProps> = ({ style, ...props }) => {
  return (
    <Button
      {...props}
      style={{
        padding: '4px 12px',
        margin: '-4px -12px',
        ...style,
      }}
    />
  )
}

export const Menu: FC<{
  data: any
  selected?: string
  prefix?: string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
}> = ({ data = {}, selected, prefix = '', style, children, header }) => {
  const route = useRoute()

  if (!selected) {
    selected = route.location
  }

  if (!Array.isArray(data)) {
    data = Object.keys(data).map((key) => {
      const href = data[key]
      return typeof href === 'object'
        ? {
            label: key,
            items: href,
          }
        : {
            label: key,
            href,
          }
    })
  }

  let firstHref
  const items = data.map(({ label, href, items }, i) => {
    if (items) {
      if (!Array.isArray(items)) {
        items = Object.keys(items).map((key) => ({
          label: key,
          href: items[key],
        }))
      }

      return (
        <Fragment key={i}>
          <MenuHeader style={{ marginTop: i && 40 }}>{label}</MenuHeader>
          {items.map(({ href, label }, index) => {
            if (href[0] !== '?') {
              href = prefix + href
            }
            if (!firstHref) {
              firstHref = href
            }
            const isActive = hrefIsActive(href, selected, items)

            return (
              <MenuItem key={index} href={href} isActive={isActive} isNested>
                {label}
              </MenuItem>
            )
          })}
        </Fragment>
      )
    }

    if (href[0] !== '?') {
      href = prefix + href
    }

    if (!firstHref) {
      firstHref = href
    }

    const isActive = hrefIsActive(href, selected, data)

    return (
      <MenuItem key={i} href={href} isActive={isActive} weight={500}>
        {label}
      </MenuItem>
    )
  })

  return (
    <ScrollArea
      style={{
        backgroundColor: color('background'),
        borderRight: `1px solid ${color('border')}`,
        padding: '64px 20px 20px 20px',
        width: 224,
        ...style,
      }}
    >
      {header}
      {items}
      {children}
    </ScrollArea>
  )
}
