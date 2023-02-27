import React, { FC, useEffect } from 'react'
import { useOverlayPosition } from '~/hooks'
import { Overlay, OverlayProps } from '../Overlay'
import { color } from '~'

export const ContextMenu: FC<OverlayProps> = ({
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

  // elems[highlighted].style.backgroundColor = color(
  //   'lightbackground2:contrast'
  // )

  // make into hook
  // useEffect(() => {
  //   let currentFocus: number = 0

  //   let elem: any
  //   const focus = (elems?: any) => {
  //     if (!elems) {
  //       elems = elementRef.current.querySelectorAll(
  //         '[data-aviato-context-item]'
  //       )
  //     }
  //     elem = elems[currentFocus]
  //     if (elem) {
  //       elem.focus()
  //     }
  //   }
  //   focus()
  //   const setFocus = (e) => {
  //     const { key } = e
  //     if (key === 'Escape') {
  //       focus()
  //     } else if (key === 'Tab' || key === 'ArrowDown') {
  //       currentFocus++

  //       const elems = elementRef.current.querySelectorAll(
  //         '[data-aviato-context-item]'
  //       )
  //       if (currentFocus > elems.length - 1) {
  //         currentFocus = 0
  //       }
  //       focus(elems)
  //       e.preventDefault()
  //     } else if (key === 'ArrowUp') {
  //       currentFocus--
  //       const elems = elementRef.current.querySelectorAll(
  //         '[data-aviato-context-item]'
  //       )
  //       if (currentFocus < 0) {
  //         currentFocus = elems.length - 1
  //       }
  //       focus(elems)
  //       e.preventDefault()
  //     }
  //   }
  //   window.document.addEventListener('keydown', setFocus)
  //   return () => {
  //     window.document.removeEventListener('keydown', setFocus)
  //   }
  // }, [elementRef])

  // // Set highlighted selection
  useEffect(() => {
    let currentHighlight: number = 1
    let currentFocus: number = 0
    let elem: any
    const highlight = (elems?: any) => {
      if (!elems) {
        elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
        elems[currentHighlight].style.background = color(
          'lightbackground2:contrast'
        )
      }
      elem = elems[currentFocus]
      if (elem) {
        elem.focus()
        // elem.highlight()
      }
    }
    highlight()
    const setHighlight = (e) => {
      const { key } = e
      if (key === 'Escape') {
        focus()
      } else if (key === 'ArrowDown') {
        currentHighlight++
        const elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
        if (currentHighlight > elems.length - 1) {
          currentHighlight = 0
        }
        highlight(elems)

        Array.from(elems).filter((item) =>
          item === elems[currentHighlight]
            ? (item.style.background = color('lightbackground2:contrast'))
            : (item.style.background = color('background'))
        )

        e.preventDefault()
      } else if (key === 'ArrowUp') {
        currentHighlight--
        const elems = elementRef.current.querySelectorAll(
          '[data-aviato-context-item]'
        )
        if (currentHighlight < 0) {
          currentHighlight = elems.length - 1
        }
        highlight(elem)

        Array.from(elems).filter((item) =>
          item === elems[currentHighlight]
            ? (item.style.background = color('lightbackground2:contrast'))
            : (item.style.background = color('background'))
        )

        e.preventDefault()
      }
    }
    window.document.addEventListener('keydown', setHighlight)
    return () => {
      window.document.removeEventListener('keydown', setHighlight)
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
