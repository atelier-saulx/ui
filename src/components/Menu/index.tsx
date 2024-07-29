import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Text } from '../Text/index.js'
import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import {
  autoPlacement,
  autoUpdate,
  FloatingNode,
  FloatingTree,
  offset,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import { Icon, IconProps } from '../Icon/index.js'
import { styled } from 'inlines'
import { Separator } from '../Separator/index.js'

// TODO allow menutrigger to be a render prop so that open state can be handled per implementation
// TODO implement option card group
// TODO look into focus styles for items
// TODO portal and focusmanager
// TODO keyboard navigation

type MenuContextType = {
  open: boolean
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  getItemProps: ReturnType<typeof useInteractions>['getItemProps']
} | null

const MenuContext = createContext<MenuContextType>(null)

type MenuRootProps = {
  children: ReactNode
}

function Menu(props: MenuRootProps) {
  const parentId = useFloatingParentNodeId()

  if (parentId) {
    return <MenuInner {...props} />
  }

  return (
    <FloatingTree>
      <MenuInner {...props} />
    </FloatingTree>
  )
}

function MenuInner({ children }: MenuRootProps) {
  const [open, setOpen] = useState(false)
  const tree = useFloatingTree()
  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()
  const nested = parentId !== null
  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    placement: nested ? 'right-start' : 'bottom-start',
    middleware: [
      offset(nested ? 12 : 8),
      autoPlacement({
        allowedPlacements: nested
          ? ['right-start', 'right-end', 'left-start', 'left-end']
          : ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const click = useClick(context, {
    event: 'click',
    toggle: !nested,
    ignoreMouse: nested,
  })
  const hover = useHover(context, {
    enabled: nested,
    handleClose: safePolygon({ blockPointerEvents: true }),
  })
  const dismiss = useDismiss(context, { bubbles: true })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, hover, dismiss],
  )

  useEffect(() => {
    if (!tree) return

    function handleTreeClick() {
      setOpen(false)
    }

    tree.events.on('click', handleTreeClick)

    return () => {
      tree.events.off('click', handleTreeClick)
    }
  }, [tree, nodeId, parentId])

  useEffect(() => {
    if (open && tree) {
      tree.events.emit('menuopen', { parentId, nodeId })
    }
  }, [tree, open, nodeId, parentId])

  return (
    <FloatingNode id={nodeId}>
      <MenuContext.Provider
        value={{
          open,
          refs,
          floatingStyles,
          getReferenceProps,
          getFloatingProps,
          getItemProps,
        }}
      >
        {children}
      </MenuContext.Provider>
    </FloatingNode>
  )
}

type MenuTriggerProps = {
  children: ReactElement | (({ open }: { open: boolean }) => ReactElement)
}

function MenuTrigger({ children }: MenuTriggerProps) {
  const { open, refs, getReferenceProps } = useContext(MenuContext)

  return (
    <>
      {cloneElement(
        typeof children === 'function' ? children({ open }) : children,
        {
          ref: refs.setReference,
          ...getReferenceProps(),
        },
      )}
    </>
  )
}

type MenuItemsProps = {
  children: ReactNode
}

function MenuItems({ children }: MenuItemsProps) {
  const { open, refs, floatingStyles, getFloatingProps } =
    useContext(MenuContext)

  if (!open) return null

  return (
    <div
      ref={refs.setFloating}
      style={{
        position: 'relative',
        width: 240,
        borderRadius: radius[16],
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        border: `1px solid ${colors.neutral10}`,
        background: colors.neutral10Adjusted,
        ...floatingStyles,
      }}
      {...getFloatingProps()}
    >
      {children}
    </div>
  )
}

type MenuItemProps = {
  children: string
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
  onClick?: () => void
}

function MenuItem({ children, leadIcon, trailIcon, onClick }: MenuItemProps) {
  const { getItemProps } = useContext(MenuContext)
  const tree = useFloatingTree()

  return (
    <styled.div
      {...getItemProps({
        onClick() {
          onClick?.()
          tree?.events.emit('click')
        },
      })}
      style={{
        height: 32,
        color: colors.neutral80,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        borderRadius: radius[8],
        '&:hover:not(:disabled)': {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        },
      }}
    >
      {leadIcon && <Icon variant={leadIcon} />}
      <Text variant="display-medium" color="inherit">
        {children}
      </Text>
      {trailIcon && <Icon variant={trailIcon} />}
    </styled.div>
  )
}

type MenuToggleItemProps = {
  children: string
  value: boolean
  onChange?: () => void
  disabled?: boolean
}

function MenuToggleItem({
  children,
  value,
  onChange,
  disabled,
}: MenuToggleItemProps) {
  return (
    <styled.div
      onClick={() => {
        if (disabled) return

        onChange?.()
      }}
      data-disabled={disabled}
      style={{
        height: 32,
        color: colors.neutral80,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        borderRadius: radius[8],
        cursor: 'pointer',
        '&:hover:not([data-disabled])': {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        },
        '&[data-disabled]': {
          background: 'transparent',
          color: colors.neutral20,
          cursor: 'not-allowed',
        },
      }}
    >
      <div style={{ height: 24, width: 24 }}>
        {value && <Icon variant="checkmark" />}
      </div>
      <Text variant="display-medium" color="inherit">
        {children}
      </Text>
    </styled.div>
  )
}

type MenuHeaderProps = { children: string }

function MenuHeader({ children }: MenuHeaderProps) {
  return (
    <div style={{ padding: '8px 8px 4px' }}>
      <Text color="neutral60" variant="subtext-medium">
        {children}
      </Text>
    </div>
  )
}

type MenuSeparatorProps = {}

function MenuSeparator({}: MenuSeparatorProps) {
  return <Separator />
}

type MenuTriggerItemProps = {
  children: string
  leadIcon?: IconProps['variant']
}

function MenuTriggerItem({ children, leadIcon }: MenuTriggerItemProps) {
  const { refs, getReferenceProps } = useContext(MenuContext)

  // TODO show hover/focust styles when submenu is open

  return (
    <styled.div
      ref={refs.setReference}
      {...getReferenceProps()}
      style={{
        height: 32,
        color: colors.neutral80,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        borderRadius: radius[8],
        '&:hover:not(:disabled)': {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        },
      }}
    >
      {leadIcon && <Icon variant={leadIcon} />}
      <Text variant="display-medium" color="inherit">
        {children}
      </Text>
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon variant="chevron-right" />
      </div>
    </styled.div>
  )
}

Menu.Trigger = MenuTrigger
Menu.Items = MenuItems
Menu.Header = MenuHeader
Menu.Separator = MenuSeparator
Menu.Item = MenuItem
Menu.ToggleItem = MenuToggleItem
Menu.TriggerItem = MenuTriggerItem

export { Menu }

export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuItemsProps,
  MenuHeaderProps,
  MenuItemProps,
  MenuTriggerItemProps,
  MenuSeparatorProps,
}
