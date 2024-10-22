import {
  autoPlacement,
  autoUpdate,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { colors } from '../../utils/colors.js'
import { shadows } from '../../utils/shadows.js'
import { radius } from '../../utils/radius.js'
import { Separator } from '../Separator/index.js'
import { IconButton, IconButtonProps } from '../IconButton/index.js'

type MiniSheetContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  isMounted: ReturnType<typeof useTransitionStyles>['isMounted']
  transitionStyles: ReturnType<typeof useTransitionStyles>['styles']
} | null

const MiniSheetContext = createContext<MiniSheetContextType>(null)

type MiniSheetRootProps = {
  children: ReactNode
}

function MiniSheet({ children }: MiniSheetRootProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles, context, placement } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
    middleware: [
      offset(8),
      autoPlacement({
        allowedPlacements: [
          'bottom',
          'top',
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
        ],
      }),
    ],
  })

  const click = useClick(context, { event: 'click', toggle: true })
  const focus = useFocus(context)
  const dismiss = useDismiss(context, { referencePress: true })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    focus,
    dismiss,
  ])
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 50,
    initial: {
      transform: `scale(0.9) translateY(${placement.startsWith('top') ? 8 : -8}px`,
      opacity: 0,
    },
    open: {
      opacity: 1,
      transform: `scale(1) translateY(0px)`,
    },
    close: {
      transform: `scale(0.9) translateY(${placement.startsWith('top') ? 8 : -8}px)`,
      opacity: 0,
    },
  })

  return (
    <MiniSheetContext.Provider
      value={{
        open,
        setOpen,
        refs,
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
        isMounted,
        transitionStyles,
      }}
    >
      {children}
    </MiniSheetContext.Provider>
  )
}

type MiniSheetTriggerProps = {
  children: ReactElement | (({ open }: { open: boolean }) => ReactElement)
}

function MiniSheetTrigger({ children }: MiniSheetTriggerProps) {
  const { open, refs, getReferenceProps } = useContext(MiniSheetContext)

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

type MiniSheetItemsProps = {
  children: ReactNode
}

function MiniSheetItems({ children }: MiniSheetItemsProps) {
  const {
    isMounted,
    refs,
    floatingStyles,
    getFloatingProps,
    transitionStyles,
  } = useContext(MiniSheetContext)

  if (!isMounted) return null

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        {...getFloatingProps()}
        style={{ ...floatingStyles }}
      >
        <div
          style={{
            background: colors.neutralInverted100,
            border: `1px solid  ${colors.neutral20Adjusted}`,
            boxShadow: shadows.popoverSmall,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius[16],
            gap: 4,
            height: 40,
            padding: 8,
            transitionTimingFunction: 'ease-in-out',
            ...transitionStyles,
          }}
        >
          {children}
        </div>
      </div>
    </FloatingPortal>
  )
}

type MiniSheetSeparatorProps = {}

function MiniSheetSeparator({}: MiniSheetSeparatorProps) {
  return <Separator orientation="vertical" />
}

type MiniSheetItemProps = IconButtonProps

function MiniSheetItem({ onClick, ...props }: MiniSheetItemProps) {
  const { setOpen } = useContext(MiniSheetContext)

  return (
    <IconButton
      {...props}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
    />
  )
}

MiniSheet.Trigger = MiniSheetTrigger
MiniSheet.Items = MiniSheetItems
MiniSheet.Separator = MiniSheetSeparator
MiniSheet.Item = MiniSheetItem

export { MiniSheet }
export type { MiniSheetRootProps, MiniSheetItemsProps, MiniSheetTriggerProps }
