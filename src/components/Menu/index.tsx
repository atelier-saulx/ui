import React, { CSSProperties, FC, Fragment, ReactNode, useEffect } from 'react'
import { parseHref, useLocation } from '~/hooks'
import { Weight } from '~/types'
import { color, setLocation } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Button, ButtonProps } from '../Button'
import { Link } from '../Link'
import { ScrollArea } from '../ScrollArea'
import { Text } from '../Text'
import { ChevronDownIcon } from '~/icons'
import { styled } from 'inlines'

type MenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
  onClick?: (e: any) => void
  id?: string
  href?: string
  isActive?: boolean
}

type MenuItemProps = {
  children?: ReactNode
  style?: CSSProperties
  href?: string
  isActive?: boolean
  isNested?: boolean
  weight?: Weight
}

const MenuHeader: FC<MenuHeaderProps> = ({
  children,
  style,
  onClick,
  id,
  href,
  isActive,
}) => {
  return (
    <styled.div
      id={id}
      style={{
        '&.closed': {
          marginBottom: '-12px',
        },
      }}
    >
      {href ? (
        <Link
          href={href}
          style={{
            padding: '4px 12px',
            margin: '-4px -12px 10px',
            fontWeight: 600,
            borderRadius: 4,
            backgroundColor: isActive ? color('lightaccent:active') : null,
            '&:hover': !isActive
              ? {
                  backgroundColor: color('background:hover'),
                  color: `${color('text')} !important`,
                }
              : null,
            ...style,
          }}
        >
          {typeof children === 'function' ? children({ isActive }) : children}
        </Link>
      ) : (
        <Text
          weight="600"
          style={{
            marginBottom: 12,
            ...style,
          }}
          onClick={onClick}
        >
          {children}
        </Text>
      )}
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
      color={isActive ? 'lightaccent:contrast' : isNested ? 'text2' : 'text'}
      weight={isActive ? 600 : weight}
      wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <Link
        href={href}
        style={{
          padding: '4px 12px',
          margin: '-4px -12px',
          borderRadius: 4,
          backgroundColor: isActive ? color('lightaccent:active') : null,
          '&:hover': !isActive
            ? {
                backgroundColor: color('background:hover'),
                color: `${color('text')} !important`,
              }
            : null,
        }}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </Link>
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
  const [location] = useLocation()

  if (!selected) {
    selected = location
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

  let firstHref: string
  let hasActive: boolean
  const items = data.map(({ label, href, items }, i: number) => {
    if (items) {
      if (!Array.isArray(items)) {
        items = Object.keys(items).map((key) => ({
          label: key,
          href: items[key],
        }))
      }
      const isActive = hrefIsActive(href, selected, items)

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
            }}
            href={href}
            isActive={isActive}
            onClick={(e) => {
              if (collapse) {
                e.currentTarget.parentNode.nextSibling.classList.toggle(
                  'hidden'
                )
              } else if (href) {
                setLocation(href)
              }
            }}
          >
            {label}
            {collapse && <StyledChevron id={`${i}-menuchevron`} />}
          </MenuHeader>
          <HideableStyledDiv id={`${i}-menuitems`}>
            {items.map(({ href, label }, index: number) => {
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
