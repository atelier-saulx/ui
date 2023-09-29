import React, { FC, Fragment, ReactNode, MouseEvent, useState } from 'react'
import { color } from '../../varsUtilities'
import { useWindowResize } from '../../hooks'
import { ScrollArea, Text } from '../../components'
import { Style, styled } from 'inlines'
import { IconMenu, IconClose, IconChevronDown } from '../../icons'
import { MenuItem } from './MenuItem'

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

// export const MenuButton: FC<ButtonProps> = ({ style, ...props }) => {
//   return (
//     <Button
//       {...props}
//       style={{
//         padding: '4px 12px',
//         margin: '-4px -12px',
//         ...style,
//       }}
//     />
//   )
// }

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
  tempProp?: boolean
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
  tempProp,
}) => {
  const menuDataItems: MenuDataItemObject[] = []
  const { width } = useWindowResize()
  const [open, setOpen] = useState(width > 800)

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
                  console.log(
                    e.currentTarget.parentNode?.childNodes[0].childNodes[0]
                      ?.childNodes[1]
                  )
                  // @ts-ignore FIX THIS
                  e.currentTarget.parentNode?.childNodes[0]?.childNodes[0]?.childNodes[1]?.classList.toggle(
                    'closed'
                  )
                }
              }}
            >
              {icon ? <styled.div>{icon}</styled.div> : null}
              <Text selectable="none">{label}</Text>
              {collapse && (
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
                        onChange(value, topValue)
                      }
                      if (onClick) {
                        onClick(e)
                      }
                    }}
                    active={isActive ? isActive(value) : active === value}
                    open={open}
                  >
                    {icon ? (
                      <styled.div style={{ marginLeft: 0 }}>{icon}</styled.div>
                    ) : null}
                    {!icon && !open && typeof label === 'string' ? (
                      <>{label.split('').splice(0, 2)}</>
                    ) : null}

                    {/* <div style={{ width: '100%', border: '1px solid red' }} /> */}

                    {open && label}
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
  if (tempProp) console.log('adfla;sdkfjsld;fkj')
  if (width > 800 || tempProp)
    return (
      <span style={{ position: 'relative' }}>
        <ScrollArea
          style={{
            flexShrink: 0,
            backgroundColor: color('background', 'default', 'muted'),
            padding: open ? '24px 20px 20px 20px' : 0,
            paddingLeft: open ? 20 : 10,
            height: '100%',
            width: open ? 224 : 68,
            transition: '0.5s all',
            overflowX: 'clip',
            ...style,
          }}
        >
          <MenuHeader>{header}</MenuHeader>
          {items}
          {children}
          <styled.div style={{ height: '40px' }} />
        </ScrollArea>
        <styled.div
          onClick={() => setOpen(!open)}
          style={{
            position: 'absolute',
            border: '1px solid',
            borderColor: color('inputBorder', 'neutralNormal', 'default'),
            '&:hover': {
              borderColor: color('inputBorder', 'neutralHover', 'default'),
            },
            '&:active': {
              borderColor: color('inputBorder', 'neutralActive', 'default'),
            },
            right: 0,
            top: 0,
            bottom: 0,
          }}
        ></styled.div>
      </span>
    )
  else
    return (
      <>
        {open ? (
          <ScrollArea
            style={{
              flexShrink: 0,
              backgroundColor: color('background', 'default', 'muted'),
              // borderRight: border(1),
              // position: 'relative',

              padding: '24px 20px 20px 20px',
              height: '100%',
              width: '100%',
              overflowX: 'clip',
              ...style,
            }}
          >
            <IconClose
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                padding: 10,
                border: '1px solid grey',
              }}
            />
            <MenuHeader>{header}</MenuHeader>
            {items}
            {children}
            <styled.div style={{ height: '40px' }} />
          </ScrollArea>
        ) : (
          <IconMenu
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              padding: 10,
              border: '1px solid grey',
            }}
            onClick={() => setOpen(true)}
          />
        )}
      </>
    )
}
