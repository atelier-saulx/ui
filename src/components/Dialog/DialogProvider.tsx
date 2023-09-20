// @ts-nocheck
import React, { useState, useEffect, useRef, ReactNode, FC } from 'react'
import { DialogContext, DialogContextType } from './DialogContext'
import { Dialog } from './Dialog'

import {
  Style,
  color,
  Input,
  ForwardContext,
  addOverlay,
  removeOverlay,
  removeAllOverlays,
} from '../../'

const Prompt: FC<{
  type?: 'prompt' | 'alert'
  onCancel?: () => Promise<void> | (() => void)
  onConfirm?: ((val?: any) => Promise<void>) | ((val?: any) => void) | undefined
  style?: Style
  children?: ReactNode
}> = ({ type = 'prompt', onCancel, onConfirm, style, children, ...props }) => {
  const value = useRef<string | number>()
  const isPrompt = type === 'prompt'
  const isAlert = type === 'alert'
  return (
    <Dialog
      {...props}
      style={{
        width: 520,
        ...style,
      }}
    >
      {isPrompt ? (
        <Dialog.Body>
          {children}
          {/* @ts-ignore */}
          <Input type="text" onChange={(v) => (value.current = v)} />
        </Dialog.Body>
      ) : (
        children
      )}
      <Dialog.Buttons>
        {isAlert ? null : <Dialog.Cancel onCancel={onCancel} />}
        <Dialog.Confirm
          onConfirm={() =>
            // @ts-ignore
            isPrompt ? onConfirm(value.current) : onConfirm(true)
          }
        />
      </Dialog.Buttons>
    </Dialog>
  )
}

type DialogItem = {
  id: number
  children: ReactNode
}

export const DialogProvider = ({ children, fixed = true }) => {
  const dialogsRef = useRef<DialogItem[]>()
  const dialogRef = useRef<DialogContextType>()

  if (!dialogRef.current) {
    let count = 0
    const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>()
    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const dialog: DialogContextType = (children, onClose, allCtx) => {
      const id = count++
      console.log('!!!!!!!!', allCtx)
      dialog._id = id
      children = (
        <div
          key={id}
          style={{
            alignItems: 'center',
            backgroundColor: color('background', 'inverted', 'subtle'),
            display: 'flex',
            justifyContent: 'center',
            position: fixed ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              dialogRef.current.close(id)
            }
          }}
        >
          {allCtx ? (
            <ForwardContext context={allCtx}>{children}</ForwardContext>
          ) : (
            children
          )}
        </div>
      )

      requestAnimationFrame(() => {
        addOverlay(children, onClose)
        update(
          dialogsRef.current.push({
            id,
            children,
          })
        )
      })

      return id
    }

    dialog._id = null

    const prompt = (type, props, children): Promise<any | false> => {
      return new Promise((resolve) => {
        if (typeof props === 'string') {
          props = {
            label: props,
          }
        }
        dialog.open(
          <Prompt {...props} type={type} onConfirm={resolve}>
            {children}
          </Prompt>,
          () => resolve(false)
        )
      })
    }

    dialog.open = dialog

    dialog.close = (id?: number) => {
      if (id !== undefined) {
        const index = dialogsRef.current.findIndex(
          ({ id: dialogId }) => dialogId === id
        )
        if (index !== -1) {
          const removed = dialogsRef.current.splice(index, 1)
          const { length } = dialogsRef.current
          dialog._id = length ? dialogsRef.current[length - 1].id : null
          update(length)
          removeOverlay(removed?.[0].children)
        }
      } else {
        dialogsRef.current = []
        dialog._id = null
        update(0)
        removeAllOverlays()
      }
    }

    dialog.prompt = (props, children) => prompt('prompt', props, children)
    dialog.alert = (props, children) => prompt('alert', props, children)
    dialog.confirm = (props, children) => prompt('confirm', props, children)

    dialog.useCount = () => {
      const [state, setState] = useState(dialogsRef.current.length)
      useEffect(() => {
        listeners.add(setState)
        return () => {
          listeners.delete(setState)
        }
      }, [])
      return state
    }

    // @ts-ignore
    dialogRef.current = dialog
    dialogsRef.current = []
  }

  return (
    <DialogContext.Provider value={dialogRef.current}>
      {children}
    </DialogContext.Provider>
  )
}
