import React, { useState, createContext, useContext } from 'react'

import { createPortal } from 'react-dom'
import { Toast } from './Toast'
import { Style, styled, ColorBackgroundColors, color as genColor } from '../..'

type ToastProps = {
  label?: string
  color?: ColorBackgroundColors
  description?: string
  style?: Style
  closeable?: boolean
  strong?: Boolean
  action?: { onClick: () => void; label: string }
  id?: any
}

const ToastContainer = ({ toasts }) => {
  let lastOne = toasts.length - 1
  return createPortal(
    <styled.div
      style={{
        position: 'fixed',
        top: lastOne > 4 ? 24 : 'auto',
        bottom: lastOne > 4 ? null : 24,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid red',
        gap: 12,
      }}
    >
      {toasts.length < 4 ? (
        toasts.map(
          ({
            label,
            action,
            closeable,
            color,
            description,
            style,
            strong,
            id,
          }) => (
            <Toast
              key={id}
              id={id}
              label={label}
              action={action}
              closeable={closeable}
              color={color}
              description={description}
              strong={strong}
              style={style}
            />
          )
        )
      ) : (
        <styled.div style={{}}>
          <Toast
            key={toasts[lastOne].id}
            id={toasts[lastOne].id}
            label={toasts[lastOne].label}
            action={toasts[lastOne].action}
            closeable={toasts[lastOne].closeable}
            color={toasts[lastOne].color}
            description={toasts[lastOne].description}
            strong={toasts[lastOne].strong}
            style={toasts[lastOne].style}
          />
        </styled.div>
      )}
    </styled.div>,
    document.body
  )
}

const ToastContext = createContext<any>(null)

let id = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastProps>>([])

  const add = ({
    label,
    action,
    closeable,
    color,
    description,
    style,
    strong,
  }) => {
    setToasts([
      ...toasts,
      {
        id: id++,
        label: label,
        action: action,
        closeable: closeable,
        color: color,
        description: description,
        style: style,
        strong: strong,
      },
    ])
  }

  const remove = (id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }

  const useCount = () => {
    return toasts.length
  }

  return (
    <ToastContext.Provider value={{ add, remove, useCount }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const toast = useContext(ToastContext)
  return toast
}
