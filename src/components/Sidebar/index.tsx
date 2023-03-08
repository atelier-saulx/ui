import React, {
  FC,
  ReactNode,
  CSSProperties,
  useState,
  FunctionComponent,
} from 'react'
import {
  border,
  boxShadow,
  color,
  hrefIsActive,
  renderOrCreateElement,
} from '~/utils'
import { Link, useRoute } from 'kabouter'
import { useTooltip } from '~/hooks/useTooltip'
import { Text } from '../Text'
import { styled } from 'inlines'
import { ChevronRightIcon } from '~/icons'
import { Icon } from '~/types'

const StyledLink = styled(Link, {
  height: 40,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 8,
  borderRadius: 8,
  transition: 'width 0.24s ease-out',
  paddingLeft: 10,
  '& svg': {
    minWidth: '20px',
  },
})

type SidebarProps = {
  data: {
    icon?: ReactNode | FunctionComponent<Icon>
    label?: string
    href?: string
    subTitle?: string
  }[]
  style?: CSSProperties
  selected?: string
  prefix?: string
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  expandable?: boolean
}

type SidebarItemProps = {
  children?: ReactNode
  label?: string
  href?: string
  isActive?: boolean
  expanded?: boolean
  icon?: FunctionComponent<Icon> | ReactNode
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  href,
  isActive,
  children,
  expanded,
}) => {
  const tooltip = expanded ? undefined : useTooltip(label, 'right')

  return (
    <StyledLink
      href={href}
      style={{
        width: expanded ? 216 : 40,
        color: color(isActive ? 'lightaccent:contrast' : 'text'),
        backgroundColor: isActive ? color('lightaccent:active') : null,
        '@media (hover: hover)': {
          '&:hover': isActive
            ? null
            : {
                backgroundColor: color('background:hover'),
              },
        },
      }}
      {...tooltip}
    >
      {children}

      <styled.div
        style={{
          overflowX: 'hidden',
        }}
      >
        <Text
          style={{
            marginLeft: 16,
          }}
          weight={isActive ? 600 : 500}
          color={isActive ? color('accent') : color('text')}
        >
          {label}
        </Text>
      </styled.div>
    </StyledLink>
  )
}

export const Sidebar: FC<SidebarProps> = ({
  data,
  style,
  selected,
  prefix = '',
  header,
  children,
  expandable,
}) => {
  const route = useRoute()
  const [expanded, setExpanded] = useState(false)
  const [hoverForExpansion, setHoverForExpansion] = useState(false)
  const [menuHeight, setMenuHeight] = useState(null)

  if (!selected) {
    selected = route.location
  }

  const parsedData = data.map(({ label, href, icon, subTitle }) => {
    if (subTitle) {
      label = ''
      href = ''
      icon = ''
    }

    if (href[0] !== '?') {
      href = prefix + href
    }

    return { label, href, icon, subTitle }
  })

  const elements = parsedData.map(({ label, href, icon, subTitle }, i) => {
    const isActive = hrefIsActive(href, route.location, parsedData)

    if (subTitle) {
      return (
        <div key={i} style={{ position: 'relative', height: 52 }}>
          <Text
            wrap
            space={16}
            typo="caption600"
            color="text2"
            style={{
              textTransform: 'uppercase',
              marginTop: 16,
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              transition: 'opacity 0.24s linear',
              overflowX: 'hidden',
              opacity: expanded ? 1 : 0,
            }}
          >
            {subTitle}
          </Text>
        </div>
      )
    }

    return (
      <SidebarItem
        key={i}
        label={label}
        href={href}
        isActive={isActive}
        expanded={expanded}
        icon={renderOrCreateElement(icon)}
      >
        {renderOrCreateElement(icon, { size: 20 })}
      </SidebarItem>
    )
  })

  return (
    <div
      style={{
        width: expanded ? 246 : 70,
        minWidth: expanded ? 246 : 70,
        paddingTop: 6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        borderRight: border(1),
        transition: 'all 0.24s ease-out',
        ...style,
      }}
    >
      {header}
      <div style={{}}>{elements}</div>
      {children}
      {expandable && (
        <styled.div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            width: 10,
            borderRight: '2px solid transparent',
            '@media (hover: hover)': {
              '&:hover': {
                borderRight: `2px solid ${color('accent')}`,
                cursor: 'pointer',
              },
            },
          }}
          onMouseOver={(e) => {
            setMenuHeight(e.currentTarget.offsetHeight)
            setHoverForExpansion(true)
          }}
          onMouseLeave={() => {
            setHoverForExpansion(false)
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {hoverForExpansion ? (
            <styled.div
              style={{
                position: 'absolute',
                width: 28,
                height: 28,
                borderRadius: 16,
                backgroundColor: color('background'),
                border: `1px solid ${color('border')}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                right: -14,
                top: menuHeight / 2 - 14,
                cursor: 'pointer',
                boxShadow: boxShadow('small'),
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: color('background2'),
                  },
                },
              }}
              onClick={(e) => {
                e.stopPropagation()
                setExpanded((prev) => !prev)
              }}
            >
              <ChevronRightIcon
                color="text"
                size={12}
                style={{
                  transform: expanded ? 'scaleX(-1)' : 'scaleX(1)',
                  marginRight: -1,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded((prev) => !prev)
                }}
              />
            </styled.div>
          ) : null}
        </styled.div>
      )}
    </div>
  )
}
