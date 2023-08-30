import React, { useState, createContext, useContext } from 'react'

import { createPortal } from 'react-dom'
import { Toast, ToastProps } from './Toast'
import { Style, styled, ColorBackgroundColors, color as genColor } from '../..'

const ToastContainer = ({ toasts }) => {
  return createPortal(
    <styled.div
      style={{
        position: 'fixed',
        minWidth: toasts.length < 4 ? null : '194px',
        top: toasts.length >= 4 ? 24 : 'auto',
        bottom: toasts.length >= 4 ? null : 24,
        left: 'auto',
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {toasts.map(
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
            style={
              toasts.length < 4
                ? style
                : { ...style, position: 'absolute', top: 0, left: 0 }
            }
          />
        )
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
  }: ToastProps) => {
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
