import React, { FC, Fragment, ReactNode, MouseEvent } from 'react'
import { ButtonProps } from '../../types'
import { IconChevronDown, color, Button, ScrollArea, Text, border } from '../..'
import { Style, styled } from 'inlines'
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
          style={{
            // marginBottom: 16,
            textTransform: 'uppercase',
            color: color('content', 'default', 'secondary'),
            ...style,
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

const StyledChevron = styled(IconChevronDown, {
  transition: 'transform 0.2s',
  '&.closed': {
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
}) => {
  const menuDataItems: MenuDataItemObject[] = []

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
        console.log('thingy')
      }
      return (
        <MenuItem
          key={i}
          active={isActive ? isActive(value) : active === value}
          onClick={(e) => {
            if (onChange) {
              onChange(value)
            }
            if (onClick) {
              onClick(e)
            }
          }}
        >
          {icon ? <div style={{ marginRight: 8 }}>{icon}</div> : null}
          {label}
        </MenuItem>
      )
    }
  )

  return (
    <ScrollArea
      style={{
        flexShrink: 0,
        backgroundColor: color('background', 'default', 'muted'),
        borderRight: border(1),
        padding: '24px 20px 20px 20px',
        height: '100%',
        width: 224,
        ...style,
      }}
    >
      <MenuHeader>{header}</MenuHeader>
      {items}
      {children}
    </ScrollArea>
  )
}

// if (items) {
//   const topValue = value
//   return (
//     <Fragment key={i}>
//       <MenuHeader
//         id={`${i}-menuheader`}
//         style={{
//           marginTop: i && 36,
//           border: '1px solid red',
//           justifyContent: collapse ? 'space-between' : 'unset',
//           display: collapse ? 'flex' : 'unset',
//           alignItems: 'center',
//           marginBottom: '12px',
//         }}
//         onClick={(e) => {
//           if (onChange) {
//             onChange(value)
//           }
//           if (onClick) {
//             onClick(e)
//           }
//           if (collapse) {
//             // @ts-ignore FIX THIS
//             e.currentTarget.parentNode.nextSibling.classList.toggle(
//               'hidden'
//             )
//             // @ts-ignore FIX THIS
//             e.currentTarget.parentNode?.childNodes[0]?.childNodes[1]?.classList.toggle(
//               'closed'
//             )
//           }
//         }}
//       >
//         console.log('menuheader')
//         {icon ? <div style={{ marginRight: 8 }}>{icon}</div> : null}
//         {label}
//         {collapse && <StyledChevron id={`${i}-menuchevron`} />}
//       </MenuHeader>
//       <HideableStyledDiv id={`${i}-menuitems`}>
//         {items.map(({ value, label, onClick, icon }, index: number) => {
//           return (
//             <MenuItem
//               key={index}
//               onClick={(e) => {
//                 if (onChange) {
//                   onChange(value, topValue)
//                 }
//                 if (onClick) {
//                   onClick(e)
//                 }
//               }}
//               active={isActive ? isActive(value) : active === value}
//             >
//               {icon ? <div style={{ marginRight: 8 }}>{icon}</div> : null}
//               <Text weight="strong">{label}</Text>
//             </MenuItem>
//           )
//         })}
//       </HideableStyledDiv>
//     </Fragment>
//   )
// }
