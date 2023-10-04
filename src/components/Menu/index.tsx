import React, { FC, Fragment, ReactNode, MouseEvent, useState } from 'react'
import { color } from '../../varsUtilities'
import { useWindowResize } from '../../hooks'
import { ScrollArea, Text, Button } from '../../components'
import { Style, styled } from 'inlines'
import { IconMenu, IconClose, IconChevronDown } from '../../icons'
import { MenuItem } from './MenuItem'
import { BpMobile } from 'src/utils'

type MenuHeaderProps = {
  children?: ReactNode
  style?: Style
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  id?: string
}

const MenuHeader: FC<MenuHeaderProps> = ({ children, style, onClick, id }) => {
  return (
    <styled.div
      id={id}
      style={{
        marginBottom: '8px',
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
  data: MenuDataObjectItem | ReactNode | MenuDataItem[]
): data is MenuDataObjectItem => {
  return (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    !React.isValidElement(data)
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
  data?: MenuData
  active?: any
  isActive?: (value: any) => boolean
  onChange?: (value: any, header?: any) => void
  style?: Style
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  collapse?: boolean
  shrinkable?: boolean
  shrunk?: boolean
}

export const Menu: FC<MenuProps> = ({
  data = {},
  onChange,
  active,
  style,
  children,
  header,
  isActive,
  collapse,
  shrinkable,
  shrunk = false,
}) => {
  const menuDataItems: MenuDataItemObject[] = []
  const { width } = useWindowResize()
  const [open, setOpen] = useState(true)
  const [shrink, setShrink] = useState(shrunk)

  if (isMenuDataObject(data)) {
    for (const key in data) {
      const item = data[key]
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
    for (const item of data) {
      menuDataItems.push(toMenuItemObject(item))
    }
  }

  const items = menuDataItems.map(
    ({ label, value, icon, items, onClick }, i) => {
      // menu header thing not working>?
      if (items) {
        const topValue = value
        return (
          <Fragment key={i}>
            <MenuHeader
              id={`${i}-menuheader`}
              style={{
                marginTop: i && 36,
                justifyContent: collapse ? 'space-between' : 'unset',
                display: collapse ? 'flex' : 'flex',
                marginBottom: '12px',
              }}
              onClick={(e) => {
                if (onChange) {
                  onChange(value)
                }
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
            </MenuHeader>
            <HideableStyledDiv
              id={`${i}-menuitems`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              {items.map(({ value, label, onClick, icon }, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={(e: any) => {
                      if (onChange) {
                        // if changed on mobile close the menu
                        setOpen(false)
                        onChange(value, topValue)
                      }
                      if (onClick) {
                        onClick(e)
                      }
                    }}
                    active={isActive ? isActive(value) : active === value}
                    shrink={shrink}
                  >
                    {icon ? (
                      <styled.div style={{ marginLeft: 0 }}>{icon}</styled.div>
                    ) : null}
                    {!icon && shrink && typeof label === 'string' ? (
                      <>{label.split('').splice(0, 2)}</>
                    ) : null}

                    {!shrink && label}
                  </MenuItem>
                )
              })}
            </HideableStyledDiv>
          </Fragment>
        )
      }

      return (
        <MenuItem
          key={i}
          active={isActive ? isActive(value) : active === value}
          onClick={(e: any) => {
            if (onChange) {
              onChange(value)
            }
            if (onClick) {
              onClick(e)
            }
          }}
        >
          {icon ? (
            <styled.div style={{ marginRight: 8 }}>{icon}</styled.div>
          ) : null}
          {label}
        </MenuItem>
      )
    }
  )

  return (
    <>
      <styled.div
        style={{
          position: 'fixed',
          right: 16,
          top: 16,
          display: 'none',
          '@media only screen and (max-width: 480px )': {
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
      <ScrollArea
        style={{
          display: 'block',
          flexShrink: 0,
          backgroundColor: color('background', 'default', 'muted'),
          padding: '24px 12px',
          height: '100%',
          width: !shrink ? 224 : 42,
          transition: '0.5s all',
          overflowX: 'clip',
          borderRight: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          '@media only screen and (max-width: 480px )': {
            display: open ? 'block' : 'none',
            zIndex: 1,
            position: 'absolute',
            width: !shrink ? '264px' : 42,
            paddingRight: '4px !important',
          },
          ...style,
        }}
      >
        <MenuHeader>{header}</MenuHeader>
        {items}
        {children}
      </ScrollArea>
    </>
  )
}
