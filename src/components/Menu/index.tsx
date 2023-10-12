import React, {
  FC,
  Fragment,
  ReactNode,
  MouseEvent,
  useState,
  useEffect,
} from 'react'
import { color } from '../../varsUtilities'
import { useWindowResize } from '../../hooks'
import { ScrollArea, Text, Button } from '../../components'
import { Style, styled } from 'inlines'
import {
  IconMenu,
  IconClose,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from '../../icons'
import { MenuItem } from './MenuItem'
import { BpMobile, BpSmall } from '../../utils'

type MenuItemsHeaderProps = {
  children?: ReactNode
  style?: Style
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  id?: string
}

const MenuItemsHeader: FC<MenuItemsHeaderProps> = ({
  children,
  style,
  onClick,
  id,
}) => {
  return (
    <styled.div
      id={id}
      style={{
        marginTop: '24px',
        marginBottom: '12px',
        '&.closed': {
          marginBottom: '-12px',
        },
      }}
    >
      <styled.span onClick={onClick}>
        <Text
          weight="strong"
          color="default"
          size={12}
          light
          style={{
            // marginBottom: 16,
            display: 'flex',
            position: 'relative',
            textTransform: 'uppercase',
          }}
        >
          {children}
        </Text>
      </styled.span>
    </styled.div>
  )
}

const HideableStyledDiv = styled('div', {
  display: 'block',
  '&.hidden': {
    display: 'none',
  },
})

const StyledChevron = styled('div', {
  transition: 'transform 0.2s',
  position: 'absolute',
  right: 12,
  '&.closed ': {
    transform: 'rotate(180deg)',
  },
})

export type MenuDataItemObject =
  | {
      value?: string | number
      icon?: ReactNode
      onClick?: (e: MouseEvent) => void
      label?: ReactNode
      items?: MenuDataItemObject[]
    }
  | {
      value?: any
      icon?: ReactNode
      onClick?: (e: MouseEvent) => void
      label: ReactNode
      items?: MenuDataItemObject[]
    }

export type MenuDataItem = MenuDataItemObject | ReactNode

export type MenuDataObjectItem = {
  [key: string]: ReactNode | MenuDataItem[]
}

type MenuDataObject = {
  [key: string]: ReactNode | MenuDataItem[] | MenuDataObjectItem
}

export type MenuData = MenuDataItem[] | MenuDataObject

const isMenuDataObject = (data: MenuData): data is MenuDataObject => {
  return !Array.isArray(data) && !React.isValidElement(data)
}

export const isMenuDataObjectItem = (
  config: MenuDataObjectItem | ReactNode | MenuDataItem[]
): config is MenuDataObjectItem => {
  return (
    typeof config === 'object' &&
    !Array.isArray(config) &&
    !React.isValidElement(config)
  )
}

const toMenuItemObject = (
  item: MenuDataItem | MenuDataItem[],
  key?: string
): MenuDataItemObject => {
  if (Array.isArray(item)) {
    return {
      label: key,
      value: key,
      items: item.map((i) => toMenuItemObject(i)),
    }
  } else if (typeof item === 'string' || typeof item === 'number') {
    return {
      label: item,
      value: key || item,
    }
  } else if (React.isValidElement(item)) {
    return {
      label: item,
      value: key,
    }
  } else {
    // @ts-ignore
    return item
  }
}

type MenuProps = {
  config?: MenuData
  active?: any
  isActive?: (value: any) => boolean
  onChange?: (value: any, header?: any) => void
  style?: Style
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  footer?: ReactNode | ReactNode[]
  collapse?: boolean
  shrinkable?: boolean
  shrunk?: boolean
}

export const Menu: FC<MenuProps> = ({
  config = {},
  onChange,
  active,
  style,
  children,
  header,
  footer,
  isActive,
  collapse,
  shrinkable,
  shrunk = false,
}) => {
  const menuDataItems: MenuDataItemObject[] = []
  const { width } = useWindowResize()
  const [open, setOpen] = useState(true)
  const [shrink, setShrink] = useState(shrunk)

  if (isMenuDataObject(config)) {
    for (const key in config) {
      const item = config[key]
      if (isMenuDataObjectItem(item)) {
        const items: MenuDataItemObject[] = []
        for (const itemKey in item) {
          items.push(toMenuItemObject(item[itemKey], itemKey))
        }
        menuDataItems.push({
          label: key,
          value: key,
          items,
        })
      } else {
        menuDataItems.push(toMenuItemObject(item, key))
      }
    }
  } else {
    for (const item of config) {
      menuDataItems.push(toMenuItemObject(item))
    }
  }

  useEffect(() => {
    if (width > 640) {
      setOpen(true)
    }
  }, [width])

  const ItemThing = ({ label, icon, items, onClick, i, value, depth }) => {
    if (items) {
      return (
        <div
          style={{
            width: `calc(100% - ${depth * 20}px)`,
            paddingLeft: depth * 20,
          }}
          // key={i + label + depth}
        >
          {items.length > 0 && !shrink && (
            <MenuItemsHeader
              id={`${i}-menuheader`}
              style={{
                marginTop: i && 36,
                justifyContent: collapse ? 'space-between' : 'unset',
                display: collapse ? 'flex' : 'flex',
                marginBottom: '12px',
              }}
              onClick={(e) => {
                if (onClick) {
                  onClick(e)
                }
                if (collapse) {
                  // @ts-ignore FIX THIS
                  e.currentTarget.parentNode.nextSibling.classList.toggle(
                    'hidden'
                  )

                  // @ts-ignore FIX THIS
                  e.currentTarget.parentNode?.childNodes[0]?.childNodes[0]?.childNodes[1]?.classList.toggle(
                    'closed'
                  )
                }
              }}
            >
              {icon ? <styled.div>{icon}</styled.div> : null}
              <Text
                light
                selectable="none"
                weight="strong"
                size={12}
                transform="uppercase"
              >
                {label}
              </Text>
              {collapse && !shrink && (
                <StyledChevron id={`${i}-menuchevron`}>
                  <IconChevronDown />
                </StyledChevron>
              )}
            </MenuItemsHeader>
          )}
          <HideableStyledDiv
            id={`${i}-menuitems`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            {items.map(({ label, icon, items, onClick, value }, i) => {
              return (
                <ItemThing
                  key={i + label + depth}
                  depth={depth + 1}
                  value={value}
                  label={label}
                  icon={icon}
                  onClick={onClick}
                  i={i}
                  items={items}
                />
              )
            })}
          </HideableStyledDiv>
        </div>
      )
    }
    return (
      <MenuItem
        key={i + label + depth}
        value={value}
        label={label}
        icon={icon}
        onClick={() => setOpen(false)}
        onChange={onChange}
        active={isActive ? isActive(value) : active === value}
        shrink={shrink}
      />
    )
  }
  // console.log(menuDataItems)
  const items = menuDataItems.map(
    ({ label, icon, items, onClick, value }, i) => {
      return (
        <ItemThing
          key={Math.random()}
          depth={0}
          value={value}
          label={label}
          icon={icon}
          onClick={onClick}
          i={i}
          items={items}
        />
      )
    }
  )

  return (
    <>
      {/* mobile button menu */}
      <styled.div
        style={{
          position: 'fixed',
          right: 16,
          top: 16,
          display: 'none',
          [BpSmall]: {
            display: 'block',
          },
        }}
      >
        <Button
          color="system"
          icon={open ? <IconClose /> : <IconMenu />}
          size="small"
          onClick={() => {
            setOpen(!open)
          }}
        />
      </styled.div>

      {/* mobile menu */}

      {shrinkable && open && (
        <styled.div
          onClick={() => setShrink(!shrink)}
          style={{
            width: 8,
            background: 'transparent',
            position: 'absolute',
            height: '100%',
            cursor: 'pointer',
            right: 0,
            left: !shrink ? 240 : 58,
            transition: '0.3s all',
            zIndex: 2,
            '& div': {
              display: 'none',
            },
            '&:hover': {
              '& div': {
                display: 'flex',
              },
            },
            [BpSmall]: {
              left: !shrink ? '272px' : '62px',
              '& div': {
                display: 'flex',
              },
            },
          }}
        >
          <styled.div
            style={{
              position: 'relative',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: 3,
              borderRadius: 32,
              // display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 16,
              height: 16,
              marginLeft: -4,
              backgroundColor: color('background', 'default', 'muted'),
              border: `1px solid ${color(
                'inputBorder',
                'neutralNormal',
                'default'
              )} `,
              '& svg': {
                width: '12px',
                height: '12px',
              },
            }}
          >
            {!shrink ? <IconChevronLeft /> : <IconChevronRight />}
          </styled.div>
        </styled.div>
      )}
      <ScrollArea
        style={{
          display: 'block',
          flexShrink: 0,
          backgroundColor: color('background', 'default', 'muted'),
          padding: '24px 12px',
          paddingLeft: !shrink ? '16px' : '6px',
          paddingRight: '8px',
          height: 'auto',
          minHeight: '100%',
          width: !shrink ? 224 : 42,
          transition: '0.3s all',
          overflowX: 'clip',
          borderRight: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          [BpSmall]: {
            display: open ? 'block' : 'none',
            zIndex: 1,
            position: 'absolute',
            width: !shrink ? '264px' : '54px',
            paddingRight: '4px !important',
            paddingLeft: '12px',
          },
          ...style,
        }}
      >
        <div style={{ display: 'flex', width: '100%' }}>{header}</div>
        {items}
        {children}
        <styled.div
          style={{
            marginTop: '24px',
            marginBottom: '12px',
            display: 'flex',
            width: '100%',
          }}
        >
          {footer}
        </styled.div>
      </ScrollArea>
    </>
  )
}
