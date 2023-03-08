import React, { CSSProperties, FC, Fragment, ReactNode, useEffect } from 'react'
import { Weight } from '~/types'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Button, ButtonProps } from '../Button'
import { Link, useRoute } from 'kabouter'
import { ScrollArea } from '../ScrollArea'
import { Text } from '../Text'
import { ChevronDownIcon } from '~/icons'
import { styled } from 'inlines'

// TODO: replace it
export const parseHref = (href = '/') => {
  if (href !== '/' && href[href.length - 1] === '/') {
    href = href.slice(0, -1)
  }
  const { search } = location
  if (search) {
    const i = href.indexOf('?')
    if (i !== -1) {
      const a = new URLSearchParams(search)
      const b = new URLSearchParams(href.substring(i))

      b.forEach((value, key) => {
        a.set(key, value)
      })
      href = `${href.substring(0, i)}?${a.toString()}`
    } else {
      href = `${href}${search}`
    }
  }
  return href
}

type MenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
  onClick?: (e) => void
  id?: string
}

type MenuItemProps = {
  children?: ReactNode | FC
  style?: CSSProperties
  href?: string
  isActive?: boolean
  isNested?: boolean
  weight?: Weight
}

const StyledLink = styled(Link, {
  padding: '4px 8px',
  margin: '-4px -4px -4px -2px',
  borderRadius: 4,
})

const MenuHeader: FC<MenuHeaderProps> = ({ children, style, onClick, id }) => {
  return (
    <styled.div
      id={id}
      style={{
        '&.closed': {
          marginBottom: '-12px',
        },
      }}
    >
      <Text
        weight="600"
        color={color('text2')}
        size={12}
        style={{
          marginBottom: 16,
          textTransform: 'uppercase',
          color: color('text2'),
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </Text>
    </styled.div>
  )
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  style,
  href,
  isActive,
  isNested = false,
  weight = isNested ? 500 : 600,
}) => {
  return (
    <Text
      color={isActive ? 'lightaccent:contrast' : 'text'}
      weight={isActive ? 500 : weight}
      wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <StyledLink
        href={href}
        style={{
          border: '10px solid red',
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
              // @ts-ignore
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

const HideableStyledDiv = styled('div', {
  display: 'block',
  '&.hidden': {
    display: 'none',
  },
})

const StyledChevron = styled(ChevronDownIcon, {
  transition: 'transform 0.2s',
  '&.closed': {
    transform: 'rotate(180deg)',
  },
})

export const Menu: FC<{
  data: any
  selected?: string
  prefix?: string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  collapse?: boolean
  forceActive?: boolean
}> = ({
  data = {},
  selected,
  prefix = '',
  style,
  children,
  header,
  collapse,
  forceActive = true,
}) => {
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
  let hasActive
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
          <MenuHeader
            id={`${i}-menuheader`}
            style={{
              marginTop: i && 36,
              justifyContent: collapse ? 'space-between' : null,
              display: collapse ? 'flex' : null,
              alignItems: 'center',
              cursor: href ? 'pointer' : null,
              color:
                href && hrefIsActive(href, selected, items)
                  ? color('accent')
                  : color('text2'),
            }}
            onClick={(e) => {
              if (collapse) {
                e.currentTarget.parentNode.nextSibling.classList.toggle(
                  'hidden'
                )
                e.currentTarget.parentNode?.childNodes[0]?.childNodes[1]?.classList.toggle(
                  'closed'
                )
              } else if (href) {
                route.setLocation(href)
              }
            }}
          >
            {label}
            {collapse && (
              <StyledChevron id={`${i}-menuchevron`} />
              // <ChevronDownIcon />
            )}
          </MenuHeader>
          <HideableStyledDiv id={`${i}-menuitems`}>
            {items.map(({ href, label }, index) => {
              if (href[0] !== '?') {
                href = prefix + href
              }
              if (!firstHref) {
                firstHref = href
              }
              const isActive = hrefIsActive(href, selected, items)

              if (isActive) {
                hasActive = true
              }
              return (
                <MenuItem key={index} href={href} isActive={isActive} isNested>
                  {label}
                </MenuItem>
              )
            })}
          </HideableStyledDiv>
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
    if (isActive) {
      hasActive = true
    }

    return (
      <MenuItem key={i} href={href} isActive={isActive} weight={500}>
        {label}
      </MenuItem>
    )
  })

  useEffect(() => {
    if (!hasActive && firstHref && forceActive) {
      window.history.replaceState({}, '', parseHref(firstHref))
    }
  }, [hasActive, forceActive])

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
