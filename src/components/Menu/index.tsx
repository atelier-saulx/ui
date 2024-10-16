import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Text } from '../Text/index.js'
import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import {
  autoPlacement,
  autoUpdate,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  UseFloatingReturn,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
} from '@floating-ui/react'
import { Icon, IconProps } from '../Icon/index.js'
import { Separator } from '../Separator/index.js'
import {
  OptionCardGroup,
  OptionCardGroupProps,
} from '../OptionCardGroup/index.js'
import { shadows } from '../../utils/shadows.js'
import { styled } from 'inlines'

type MenuContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  getItemProps: ReturnType<typeof useInteractions>['getItemProps']
  activeIndex: number | null
  floatingContext: UseFloatingReturn['context']
  nested: boolean
  parent: MenuContextType
  elementsRef: React.MutableRefObject<any[]>
} | null

const MenuContext = createContext<MenuContextType>(null)

type MenuRootProps = {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
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

function MenuInner({ children, onOpenChange }: MenuRootProps) {
  const [open, setOpen] = useState(false)
  const elementsRef = useRef([])
  const tree = useFloatingTree()
  const nodeId = useFloatingNodeId()
  const parent = useContext(MenuContext)
  const parentId = useFloatingParentNodeId()
  const nested = parentId !== null
  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    strategy: 'fixed',
    placement: nested ? 'right-start' : 'bottom-start',
    middleware: [
      offset(nested ? 12 : 8),
      autoPlacement({
        allowedPlacements: nested
          ? ['right-start', 'right-end', 'left-start', 'left-end']
          : ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      }),
      size({
        apply({ availableHeight, rects, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight - 8}px`,
            minWidth: '240px',
            width: `${rects.reference.width}px`,
          })
        },
      }),
    ],
    whileElementsMounted: (reference, floating, update) => {
      onOpenChange?.(true)

      const cleanup = autoUpdate(reference, floating, update)

      return () => {
        onOpenChange?.(false)
        cleanup()
      }
    },
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: nested,
    onNavigate: setActiveIndex,
    virtual: true,
    focusItemOnOpen: 'auto',
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, hover, dismiss, listNavigation],
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
    if (tree) {
      tree.events.emit(open ? 'menuopen' : 'menuclose', { parentId, nodeId })
    }
  }, [tree, open, nodeId, parentId])

  return (
    <FloatingNode id={nodeId}>
      <MenuContext.Provider
        value={{
          open,
          setOpen,
          refs,
          floatingStyles,
          getReferenceProps,
          getFloatingProps,
          getItemProps,
          activeIndex,
          floatingContext: context,
          nested,
          parent,
          elementsRef,
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
          ...getReferenceProps({
            onClick: (e) => {
              typeof children === 'function'
                ? children({ open }).props.onClick?.(e)
                : children.props.onClick?.(e)
            },
          }),
        },
      )}
    </>
  )
}

type MenuItemsProps = {
  children: ReactNode
}

function MenuItems({ children }: MenuItemsProps) {
  const {
    open,
    setOpen,
    refs,
    floatingStyles,
    getFloatingProps,
    floatingContext,
    elementsRef,
    activeIndex,
  } = useContext(MenuContext)

  if (!open) return null

  return (
    <FloatingList elementsRef={elementsRef}>
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={false}>
          <styled.div
            ref={refs.setFloating}
            style={{
              zIndex: 4,
              position: 'fixed',
              borderRadius: radius[16],
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              outline: 'none',
              background: colors.neutralInverted100,
              boxShadow: shadows.popoverLarge,
              ...floatingStyles,
            }}
            {...getFloatingProps({
              onKeyDown: (event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation()
                }
                if (event.key === 'Enter') {
                  event.stopPropagation()
                  event.preventDefault()
                  if (
                    activeIndex !== null &&
                    elementsRef.current?.[activeIndex]
                  ) {
                    elementsRef.current[activeIndex].click()
                  }
                }
              },
            })}
          >
            <div
              style={{
                inset: 0,
                zIndex: -1,
                position: 'absolute',
                background: colors.neutral10Background,
                border: `1px solid ${colors.neutral10}`,
                borderRadius: radius[16],
              }}
            />
            {children}
          </styled.div>
        </FloatingFocusManager>
      </FloatingPortal>
    </FloatingList>
  )
}

type MenuItemProps = {
  children: string | ReactNode
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
  onClick?: () => void
  color?: 'neutral' | 'red'
  indentContent?: boolean
}

function MenuItem({
  children,
  leadIcon,
  indentContent = false,
  trailIcon,
  onClick,
  color = 'neutral',
}: MenuItemProps) {
  const { getItemProps, activeIndex } = useContext(MenuContext)
  const tree = useFloatingTree()
  const item = useListItem()

  return (
    <button
      ref={item.ref}
      {...getItemProps({
        onClick(e) {
          e.stopPropagation()
          onClick?.()
          tree?.events.emit('click')
        },
      })}
      tabIndex={-1}
      type="button"
      style={{
        flexShrink: 0,
        height: 32,
        color: colors.neutral80,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        cursor: 'pointer',
        borderRadius: radius[8],
        border: 'none',
        background: 'transparent',
        appearance: 'none',
        outline: 'none',
        ...(activeIndex === item.index && {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        }),
        ...(color === 'red' && {
          color: colors.red80,
          ...(activeIndex === item.index && {
            color: colors.red100,
            background: colors.red20,
          }),
        }),
      }}
    >
      {indentContent ? (
        <div style={{ height: 24, width: 24 }}>
          {leadIcon && <Icon variant={leadIcon} />}
        </div>
      ) : (
        <>{leadIcon && <Icon variant={leadIcon} />}</>
      )}

      <Text variant="display-medium" color="inherit">
        {children}
      </Text>
      {trailIcon && <Icon variant={trailIcon} />}
    </button>
  )
}

type MenuToggleItemProps = {
  children: string | ReactNode
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
  const { getItemProps, activeIndex } = useContext(MenuContext)
  const item = useListItem()

  return (
    <button
      ref={item.ref}
      tabIndex={-1}
      {...getItemProps({
        onClick() {
          if (disabled) return

          onChange?.()
        },
      })}
      type="button"
      disabled={disabled}
      style={{
        flexShrink: 0,
        height: 32,
        color: colors.neutral80,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        borderRadius: radius[8],
        cursor: 'pointer',
        border: 'none',
        appearance: 'none',
        outline: 'none',
        ...(activeIndex === item.index && {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        }),
        ...(disabled && {
          opacity: 0.2,
        }),
      }}
    >
      <div style={{ height: 24, width: 24 }}>
        {value && <Icon variant="checkmark" />}
      </div>
      {typeof children === 'string' ? (
        <Text variant="display-medium" color="inherit">
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
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

type MenuOptionCardGroupProps = OptionCardGroupProps

function MenuOptionCardGroup(props: MenuOptionCardGroupProps) {
  return <OptionCardGroup {...props} />
}

type MenuTriggerItemProps = {
  children: string
  leadIcon?: IconProps['variant']
}

function MenuTriggerItem({ children, leadIcon }: MenuTriggerItemProps) {
  const { refs, getReferenceProps, activeIndex, parent } =
    useContext(MenuContext)
  const item = useListItem()
  const tree = useFloatingTree()
  const parentId = useFloatingParentNodeId()
  const [submenuOpen, setSubmenuOpen] = useState(false)

  useEffect(() => {
    if (!tree) return

    function handleMenuOpen(event: { nodeId: string }) {
      if (event.nodeId === parentId) {
        setSubmenuOpen(true)
      }
    }

    function handleMenuClose(event: { nodeId: string }) {
      if (event.nodeId === parentId) {
        setSubmenuOpen(false)
      }
    }

    tree.events.on('menuopen', handleMenuOpen)
    tree.events.on('menuclose', handleMenuClose)

    return () => {
      tree.events.off('menuopen', handleMenuOpen)
      tree.events.on('menuclose', handleMenuClose)
    }
  }, [tree, parentId])

  return (
    <button
      tabIndex={-1}
      ref={useMergeRefs([refs.setReference, item.ref])}
      {...getReferenceProps(parent.getItemProps())}
      type="button"
      style={{
        flexShrink: 0,
        height: 32,
        color: colors.neutral80,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 8px',
        borderRadius: radius[8],
        background: 'transparent',
        cursor: 'pointer',
        border: 'none',
        appearance: 'none',
        outline: 'none',
        ...((submenuOpen || item.index === parent.activeIndex) && {
          color: colors.neutral100,
          background: colors.neutral10Adjusted,
        }),
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
    </button>
  )
}

Menu.Trigger = MenuTrigger
Menu.Items = MenuItems
Menu.Header = MenuHeader
Menu.Separator = MenuSeparator
Menu.Item = MenuItem
Menu.ToggleItem = MenuToggleItem
Menu.TriggerItem = MenuTriggerItem
Menu.OptionCardGroup = MenuOptionCardGroup

export { Menu }

export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuItemsProps,
  MenuHeaderProps,
  MenuItemProps,
  MenuTriggerItemProps,
  MenuSeparatorProps,
  MenuOptionCardGroupProps,
}
