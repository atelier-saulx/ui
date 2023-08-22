import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { ToastContext, ToastContextType } from './ToastContext'
import { styled } from 'inlines'
import { Text } from '../Text'
import { color } from '../../varsUtilities'

export const ToastContainer = ({
  id,
  children,
  onClick = null,
  toast,
  first = false,
  style,
}) => {
  const [fade, setFade] = useState(first)

  const close = () => toast.close(id)

  useEffect(() => {
    if (first) {
      requestAnimationFrame(() => {
        setFade(false)
      })
    }

    const timer = setTimeout(() => {
      setFade(true)
    }, 5e3)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        opacity: fade ? 0 : 1,
        transition: `opacity 300ms`,
        cursor: 'pointer',
        borderRadius: 8,
        ...style,
      }}
      onTransitionEnd={fade ? close : null}
      onClick={() => {
        close()
        onClick?.()
      }}
    >
      {children}
    </div>
  )
}

type PositionStyleProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type Toast = {
  id: number
  children: ReactNode
}

export const ToastProvider = ({
  children,
  position = 'bottom-right',
  fixed = true,
}) => {
  const [length, setLength] = useState(0)
  const [toastHeightY, setToastHeightY] = useState(90)

  const [positionFlipped, setPositionFlipped] = useState(false)

  const positionRef = useRef<typeof position>()
  const positionStyleRef = useRef<PositionStyleProps>()
  const toastsRef = useRef<Toast[]>()

  const toastyRef = useRef(null)
  const toastHolderRef = useRef(null)

  const toastRef = useRef<ToastContextType>()
  if (!toastRef.current) {
    let count = 0

    const listeners = new Set([setLength])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const toast = (child) => {
      const id = count++

      update(
        toastsRef.current.unshift({
          id,
          children: (
            <ToastContainer
              id={id}
              toast={toast}
              first={!toastsRef.current.length}
              style={{
                marginBottom: 16,
                boxShadow: !positionFlipped
                  ? 'rgb(0 0 0 / 12%) 0px 8px 20px'
                  : 'none',
              }}
            >
              {child}
            </ToastContainer>
          ),
        })
      )

      return id
    }

    toast.add = toast
    toast.close = (id?: number) => {
      if (typeof id === 'number') {
        const index = toastsRef.current.findIndex(
          ({ id: toastId }) => toastId === id
        )
        if (index !== -1) {
          toastsRef.current.splice(index, 1)
          update(toastsRef.current.length)
        }
      } else {
        toastsRef.current = []
        update(0)
      }
    }

    toast.useCount = () => {
      const [toastCount, setToastCount] = useState(length)

      useEffect(() => {
        listeners.add(setToastCount)
        return () => {
          listeners.delete(setToastCount)
        }
      }, [])

      return toastCount
    }

    toastRef.current = toast
    toastsRef.current = []
  }

  if (positionRef.current !== position) {
    positionRef.current = position

    const [y, x] = position.split('-')
    const positionStyle: PositionStyleProps = {}

    if (y === 'bottom') {
      //   positionStyle.bottom = 16
    } else {
      positionStyle.top = 16
    }

    if (x === 'left') {
      positionStyle.left = 16
    } else {
      positionStyle.right = 16
    }

    positionStyleRef.current = positionStyle
  }

  const CounterBadge = styled('div', {
    width: 30,
    height: 30,
    borderRadius: 15,
    border: `1px solid ${color('border', 'default', 'strong')}`,
    backgroundColor: color('background', 'default', 'surface'),
    position: 'absolute',
    right: -10,
    top: -10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //   boxShadow: boxShadow('small'),
  })

  const toasts = toastsRef.current.map(({ id, children }, index) => {
    return (
      <div
        key={id}
        ref={toastyRef}
        onClick={() => {
          // close all toasts if more then 8
          positionFlipped && toastRef.current.close()
        }}
        style={{
          // TODO FIX THIS
          //     zIndex: 99999999999,
          top: positionFlipped ? 15 : '',
          transition: positionFlipped ? '' : 'transform 0.3s',
          position: positionFlipped ? 'absolute' : 'static',
          marginLeft: 'auto',

          ...positionStyleRef.current,
        }}
      >
        {children}
        {positionFlipped && (
          <CounterBadge>
            <Text size={16}>{length}</Text>
          </CounterBadge>
        )}
      </div>
    )
  })

  useEffect(() => {
    if (length > 3) {
      setPositionFlipped(true)
    }
    if (length === 0) {
      setPositionFlipped(false)
    }
  }, [length])

  useEffect(() => {
    // @ts-ignore
    if (toasts[0]?.ref?.current?.clientHeight) {
      // @ts-ignore
      setToastHeightY(toasts[0]?.ref?.current?.clientHeight)
    }

    if (positionFlipped) {
      for (let i = 0; i < toastHolderRef.current.childNodes.length; i++) {
        if (i === toastHolderRef.current.childNodes.length - 1) {
          toastHolderRef.current.childNodes[
            i
          ].childNodes[0].childNodes[0].style.boxShadow =
            'rgb(0 0 0 / 12%) 0px 8px 20px'
        } else {
          toastHolderRef.current.childNodes[i].style.boxShadow = 'none'
          toastHolderRef.current.childNodes[i].childNodes[0].style.boxShadow =
            'none'
          toastHolderRef.current.childNodes[
            i
          ].childNodes[0].childNodes[0].style.boxShadow = 'none'
        }
      }
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={toastRef.current}>
      {children}
      <styled.div
        ref={toastHolderRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
          position: 'absolute',
          bottom: !positionFlipped ? 16 : '',
          right: positionFlipped ? 0 : 16,
          top: positionFlipped ? 0 : '',
          minHeight: positionFlipped && toastHeightY,
        }}
      >
        {toasts.reverse()}
      </styled.div>
    </ToastContext.Provider>
  )
}
