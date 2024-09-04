import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Text } from '../Text/index.js'
import {
  FloatingFocusManager,
  FloatingOverlay,
  useFloating,
} from '@floating-ui/react'
import { useTransitionStyles } from '@floating-ui/react'
import { colors } from '../../utils/colors.js'
import { shadows } from '../../utils/shadows.js'
import { radius } from '../../utils/radius.js'
import { styled } from 'inlines'

const ModalContext = createContext<{ close: () => void }>({ close: () => {} })

type ModalRootProps = {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
function Modal({ children, open, onOpenChange }: ModalRootProps) {
  const { context, refs } = useFloating({ open, onOpenChange })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: 0,
      transform: 'scale(0.92)',
      transitionTimingFunction: 'ease-out',
    },
    close: {
      opacity: 0,
      transform: 'scale(0.92)',
      transitionTimingFunction: 'ease-in',
    },
  })
  const { styles: overlayStyles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: 0,
      transitionTimingFunction: 'ease-out',
    },
    close: {
      opacity: 0,
      transitionTimingFunction: 'ease-in',
    },
  })
  const close = useCallback(() => {
    onOpenChange(false)
  }, [])

  if (!isMounted) return null

  return (
    <ModalContext.Provider value={{ close }}>
      <FloatingOverlay
        lockScroll
        style={{
          background: colors.black60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          outline: 'none',
          ...overlayStyles,
        }}
      >
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={{
              position: 'relative',
              width: 480,
              padding: 24,
              borderRadius: radius[24],
              background: colors.neutral10Background,
              border: `1px solid ${colors.neutral10}`,
              boxShadow: shadows.popoverLarge,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              ...styles,
            }}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </ModalContext.Provider>
  )
}

type ModalTitleProps = {
  children: ReactNode
}
function ModalTitle({ children }: ModalTitleProps) {
  return (
    <Text color="neutral100" variant="subheading-bold">
      {children}
    </Text>
  )
}

type ModalDescriptionProps = {
  children: ReactNode
}
function ModalDescription({ children }: ModalDescriptionProps) {
  return (
    <div style={{ marginTop: 8 }}>
      <Text variant="display-regular" color="neutral60">
        {children}
      </Text>
    </div>
  )
}

type ModalBodyProps = {
  children: ReactNode
}
function ModalBody({ children }: ModalBodyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(() => {
      setContentHeight(ref.current.offsetHeight)
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <styled.div
      style={{
        marginTop: 32,
        marginLeft: -24,
        marginRight: -24,
        paddingLeft: 24,
        paddingRight: 24,
        maxHeight: 480,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...(contentHeight > 480 && {
          borderTop: `1px solid ${colors.neutral10}`,
          borderBottom: `1px solid ${colors.neutral10}`,
        }),
      }}
    >
      <div ref={ref}>{children}</div>
    </styled.div>
  )
}

type ModalActionsProps = {
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode)
}
function ModalActions({ children }: ModalActionsProps) {
  const { close } = useContext(ModalContext)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: 16,
        marginTop: 24,
      }}
    >
      {typeof children === 'function' ? children({ close }) : children}
    </div>
  )
}

Modal.Title = ModalTitle
Modal.Description = ModalDescription
Modal.Actions = ModalActions
Modal.Body = ModalBody

export { Modal }
export type {
  ModalRootProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalActionsProps,
  ModalBodyProps,
}
