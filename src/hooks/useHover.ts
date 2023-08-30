import { useRef, useState, MouseEventHandler, TouchEventHandler } from 'react'
import { isTouchDevice } from '../utils'

type HoverState = {
  hover: boolean
  active: boolean
  startedTouching: boolean
  listeners:
    | {
        onMouseEnter: MouseEventHandler
        onMouseDown: MouseEventHandler
        onMouseUp: MouseEventHandler
        onMouseLeave: MouseEventHandler
      }
    | {
        onTouchStart: TouchEventHandler
        onTouchEnd: TouchEventHandler
        onMouseEnter: MouseEventHandler
        onMouseDown: MouseEventHandler
        onMouseUp: MouseEventHandler
        onMouseLeave: MouseEventHandler
      }
}

export const useHover: () => HoverState = isTouchDevice()
  ? () => {
      const [, update] = useState()
      const ref = useRef<HoverState>()
      if (!ref.current) {
        const handler = (e, active: boolean, hover: boolean) => {
          ref.current.startedTouching = true
          ref.current.active = active
          ref.current.hover = hover
          update(e)
        }
        const mouseHandler = (e, active: boolean, hover: boolean) => {
          if (ref.current.startedTouching) {
            return
          }
          ref.current.active = active
          ref.current.hover = hover
          update(e)
        }
        ref.current = {
          startedTouching: false,
          active: false,
          hover: false,
          listeners: {
            onTouchStart: (e) => handler(e, true, false),
            onTouchEnd: (e) => handler(e, false, true),
            onMouseEnter: (e) => mouseHandler(e, false, true),
            onMouseDown: (e) => mouseHandler(e, true, false),
            onMouseUp: (e) => mouseHandler(e, false, true),
            onMouseLeave: (e) => mouseHandler(e, false, false),
          },
        }
      }
      return ref.current as HoverState
    }
  : () => {
      const [, update] = useState()
      const ref = useRef<HoverState>()
      if (!ref.current) {
        const handler = (e, active: boolean, hover: boolean) => {
          ref.current.active = active
          ref.current.hover = hover
          update(e)
        }
        ref.current = {
          startedTouching: false,
          active: false,
          hover: false,
          listeners: {
            onMouseEnter: (e) => handler(e, false, true),
            onMouseDown: (e) => handler(e, true, false),
            onMouseUp: (e) => handler(e, false, true),
            onMouseLeave: (e) => handler(e, false, false),
          },
        }
      }
      return ref.current as HoverState
    }
