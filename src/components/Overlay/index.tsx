import { styled } from 'inlines'
import React, {
  FC,
  PropsWithChildren,
  ComponentType,
  useEffect,
  useState,
  CSSProperties,
  ReactNode,
  useReducer,
  FunctionComponent,
  useRef,
  useCallback,
} from 'react'
import { useOverlayPosition } from '../../hooks/useOverlayPosition'
import { color } from '../../varsUtilities'
import { ScrollArea } from '../ScrollArea'

export type Target = (EventTarget | Element | Node) & {
  rect?: DOMRect
}

export type SelectTarget = (t: Target) => Target

export type Position = {
  containerWidth?: number
  y?: number
  x?: number
  bottom?: number
  width?: number | '100%' | 'target' | 'auto'
  spaceOnTop?: boolean
  correctedY?: number
  elementRect?: DOMRect
  targetRect?: DOMRect
  minWidth?: number | string
  position?: 'left' | 'right' | 'top' | 'bottom'
  placement?: 'center' | 'left' | 'right'
}

export type PositionProps = {
  width?: number | '100%' | 'target' | 'auto'
  position?: 'left' | 'right' | 'top' | 'bottom'
  placement?: 'center' | 'left' | 'right'
  variant?: 'over' | 'detached'
  offset?: { x: number; y: number }
  selectTarget?: SelectTarget
}

export type OverlayProps<P = any> = {
  Component: ComponentType<P>
  props: P
  target: Target
  positionProps: PositionProps
  style?: CSSProperties
}

export const GenericOverlay: FC<OverlayProps> = ({
  Component,
  props,
  positionProps = {},
  target,
  style,
}) => {
  const [elementRef, position, resize] = useOverlayPosition(
    target,
    positionProps
  )

  if (!positionProps.width) {
    positionProps.width = 256
  }

  return (
    <Overlay style={style} elementRef={elementRef} position={position}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
      })}
    </Overlay>
  )
}

export const InnerShared = ({ width, style, children, elementRef }) => {
  return (
    <ScrollArea
      ref={elementRef}
      style={{
        pointerEvents: 'all',
        borderRadius: 8,
        background: color('background', 'default', 'surface'),
        border: `1px solid ${color('border', 'default', 'strong')}`,
        maxHeight: 'calc(100vh - 30px)',
        boxShadow: `0px 3px 16px 1px rgba(0,0,0,0.05)`,
        width: width,
        ...style,
      }}
    >
      {children}
    </ScrollArea>
  )
}

export type SharedOverlayProps = PropsWithChildren<{
  style?: CSSProperties
  position: Position
}>

export type OnClose = () => void

export type OverlayOptions = {
  overlay?: boolean
  transparent?: boolean
  style?: CSSProperties
}

export type Overlays = [ReactNode, OnClose, OverlayOptions][]

let listeners: (() => void)[] = []
let overlays: Overlays = []

export const addOverlay = (
  overlay: ReactNode,
  onClose: OnClose = () => {},
  options?: OverlayOptions
) => {
  overlays.push([overlay, onClose, options])
  listeners.forEach((update) => update())
}

export const removeAllOverlays = () => {
  overlays.forEach(([, onClose]) => {
    if (onClose) {
      onClose()
    }
  })
  overlays = []
  listeners.forEach((update) => update())
}

export const removeOverlay = (overlay?: ReactNode) => {
  if (!overlay) {
    if (overlays.length) {
      const [, onClose] = overlays.pop()
      if (onClose) {
        onClose()
      }
    }
  } else {
    const index = overlays.findIndex((o) => o[0] === overlay)
    if (index !== -1) {
      const [, onClose] = overlays[index]
      if (onClose) {
        onClose()
      }
      overlays.splice(index, 1)
    }
  }
  listeners.forEach((update) => update())
}

export const Overlay = ({ position, children, style, elementRef }) => {
  const placement =
    position.placement === 'left'
      ? 'flex-start'
      : position.placement === 'right'
      ? 'flex-end'
      : 'center'

  const [go, setgo] = useState(false)

  useEffect(() => {
    const x = requestAnimationFrame(() => {
      setgo(true)
    })
    return () => {
      cancelAnimationFrame(x)
    }
  }, [])

  return (
    <div
      style={{
        opacity: position ? 1 : 0,
        width: position ? position.containerWidth : 'auto',
        position: 'fixed',
        top: position ? position.y : 0,
        left: position ? position.x : 0,
        bottom: position ? position.bottom : null,
        display: 'flex',
        justifyContent: placement,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent:
            position && position.spaceOnTop ? 'flex-end' : 'flex-start',
        }}
      >
        <InnerShared
          width={position.width}
          elementRef={elementRef}
          style={{
            transition: 'transform 0.15s, opacity 0.15s',
            opacity: go ? 1 : 0,
            transform: go ? 'scale(1)' : 'scale(0.9)',
            ...style,
          }}
        >
          {children}
        </InnerShared>
      </div>
    </div>
  )
}

type OverlayItemProps = PropsWithChildren<{
  options?: OverlayOptions
}>

const OverlayItemStyled = styled('div', {
  transition: 'opacity 0.15s',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
})

const OverlayItem: FunctionComponent<OverlayItemProps> = ({
  children,
  options,
}) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(true)
  }, [setVisible])

  const hidden = options && options.overlay === false

  return (
    <OverlayItemStyled
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: hidden ? 'none' : 'all',
      }}
      onMouseDown={
        hidden
          ? null
          : useCallback((e) => {
              e.stopPropagation()
              if (e.target === ref.current) {
                setVisible(false)
                setTimeout(() => {
                  removeOverlay(children)
                }, 150)
              }
            }, [])
      }
    >
      {children}
    </OverlayItemStyled>
  )
}

// TODO: We have to refactor this so that it works with context...
const providers = []

export const OverlayProvider = () => {
  const [, update] = useReducer((x) => x + 1, 0)
  const ref = useRef<boolean>()

  if (!ref.current) {
    ref.current = true
    providers.push(ref)
  }

  useEffect(() => {
    listeners.push(update)
    const remove = (e: KeyboardEvent) => {
      if (e.code === 'Esc' || e.keyCode === 27) {
        removeOverlay()
      }
    }
    document.addEventListener('keydown', remove)
    return () => {
      providers.splice(providers.indexOf('b'), 1)
      document.removeEventListener('keydown', remove)
      listeners = listeners.filter((u) => u !== update)
    }
  }, [])

  if (providers[providers.length - 1] !== ref) {
    // console.warn('overlays are using the deepest context')
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        // TODO FIX THIS
        zIndex: 99999999999,
        top: 0,
        left: 0,
      }}
    >
      {overlays.map((c, i) => {
        return (
          <OverlayItem key={i} options={c[2]}>
            {c[0]}
          </OverlayItem>
        )
      })}
    </div>
  )
}
