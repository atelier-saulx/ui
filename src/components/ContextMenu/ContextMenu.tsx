import React, { FC, useEffect } from 'react'
import { useOverlayPosition } from '~/hooks'
import { Overlay, OverlayProps } from '../Overlay'

type ContextMenuType<P = any> = FC<OverlayProps<P>>

export const ContextMenu: ContextMenuType = ({
  positionProps = {},
  target,
  props,
  Component,
  style,
}) => {
  const [elementRef, position, resize] = useOverlayPosition(
    target,
    positionProps
  )

  // make into hook
  useEffect(() => {
    let currentFocus: number = 0
    let elem: any
    const focus = (elems?: any) => {
      if (!elems) {
        elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
      }
      elem = elems[currentFocus]
      if (elem) {
        elem.focus()
      }
    }
    focus()
    const setFocus = (e) => {
      const { key } = e
      if (key === 'Escape') {
        focus()
      } else if (key === 'Tab' || key === 'ArrowDown') {
        currentFocus++
        const elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
        if (currentFocus > elems.length - 1) {
          currentFocus = 0
        }
        focus(elems)
        e.preventDefault()
      } else if (key === 'ArrowUp') {
        currentFocus--
        const elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
        if (currentFocus < 0) {
          currentFocus = elems.length - 1
        }
        focus(elems)
        e.preventDefault()
      }
    }
    window.document.addEventListener('keydown', setFocus)
    return () => {
      window.document.removeEventListener('keydown', setFocus)
    }
  }, [elementRef])

  if (!positionProps.width) {
    positionProps.width = 256
  }

  const s = { paddingTop: 4, paddingBottom: 4, ...style }

  if (props.filterable) {
    s.paddingTop = 0
  }

  // misch met ref gwn checken wat er allemaal in zit

  return (
    <Overlay style={s} elementRef={elementRef} position={position}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
      })}
    </Overlay>
  )
}
