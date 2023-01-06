import { PositionProps } from '~/components/Overlay'
import {
  Option,
  Value,
  ContextOptions,
  ContextMenu,
  ContextMultiOptions,
} from '~/components/ContextMenu'
import { useOverlay } from './useOverlay'
import React, {
  useCallback,
  useState,
  useEffect,
  CSSProperties,
  createContext,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { PropsEventHandler, Data } from '~/types'
import { hash } from '@saulx/hash'
import { deepEqual } from '@saulx/utils'

export function useSelect<T = any>(
  items: (Option | Value)[] = [],
  value?: Value,
  position?: PositionProps & {
    filterable?: boolean | 'create'
    placeholder?: string
    style?: CSSProperties
  },
  handler?: (selection: Data<T> | Event | any) => () => void | undefined,
  disableReselect?: boolean,
): [
  SelectEvents | boolean | string | number | undefined,
  PropsEventHandler,
  (value: Value) => void
] {
  const [v, setValue] = useState(value)
  useEffect(() => {
    setValue(value)
  }, [value])
  let id: number
  const n = items.map((v) => {
    const opt = typeof v === 'object' ? v : { value: v }
    // @ts-ignore
    id = hash(id + opt.value)
    return opt
  })
  return [
    v,
    useOverlay(
      ContextOptions,
      {
        filterable: position?.filterable,
        placeholder: position?.placeholder,
        items: n,
        value: v,
        onChange: useCallback((value) => {
          if(disableReselect){
            // do not set value if value is undefined
            if(value){
              setValue(value)
            }
          }else {
            setValue(value)
          }
        }, []),
      },
      position,
      handler,
      ContextMenu,
      { transparent: true, style: position?.style },
      [n]
    ),
    setValue,
  ]
}

export function useMultiSelect(
  items: (Option | Value)[] = [],
  initialValues?: Value[],
  position?: PositionProps & {
    filterable?: boolean | 'create'
    placeholder?: string
    style?: CSSProperties
  },
  handler?: (selection: Event | any) => () => void | undefined
): [
  Value[] | null | undefined,
  PropsEventHandler,
  (value: Value[] | undefined) => void
] {
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (!deepEqual(initialValues, values)) {
      setValues(initialValues)
    }
  }, [initialValues])

  let id: number
  const n = items.map((v) => {
    const opt = typeof v === 'object' ? v : { value: v }
    // @ts-ignore
    id = hash(id + opt.value)
    return opt
  })

  if (!position) {
    position = {}
  }

  // width AUTO
  if (!position.width) {
    position.width = 350
  }

  return [
    values,
    useOverlay(
      ContextMultiOptions,
      {
        filterable: position?.filterable,
        placeholder: position?.placeholder,
        items: n,
        values,
        onChange: useCallback((value) => {
          setValues(value)
        }, []),
      },
      position,
      handler,
      ContextMenu,
      { transparent: true, style: position?.style },
      [n]
    ),
    setValues,
  ]
}

export const selection: Map<Data, any[]> = new Map()

export const getSelection = () => {
  return [...selection.keys()]
}

const selectListeners: Set<(selection: any) => void> = new Set()

export const useSelection = () => {
  const [selection, setSelection] = useState(getSelection())

  useEffect(() => {
    const listener = (selection) => {
      setSelection(selection)
    }

    selectListeners.add(listener)

    return () => {
      selectListeners.delete(listener)
    }
  }, [])

  return selection
}

export const clearSelection = () => {
  let doit = false

  selection.forEach((childSelection, data) => {
    if (childSelection.length > 2) {
      for (let i = 0; i < childSelection.length - 1; i += 2) {
        const selectionContext = childSelection[i]
        const index = childSelection[i + 1]
        if (selectionContext) {
          // find with the id
          selectionContext.selection.delete(data)
          doit = true

          if (selectionContext.children[index]) {
            selectionContext.children[index](false)
          }
        }
      }
    } else {
      const selectionContext = childSelection[0]
      const index = childSelection[1]
      if (selectionContext) {
        doit = true
        if (selectionContext.children[index]) {
          selectionContext.children[index](false)
        }
      }
    }

    selection.delete(data)
  })

  if (doit) {
    const targetSelection = getSelection()
    selectListeners.forEach((fn) => fn(targetSelection))
  }
}

export type SelectableContext<T> = {
  data: Data<T>[]
  children: { [key: string]: (...args: any[]) => void }
  selection: Set<Data<T>>
}

const defaultContext: SelectableContext<{}> = {
  data: [],
  children: {},
  selection: new Set(),
}

export const SelectionContext = createContext(defaultContext)
SelectionContext.displayName = 'SelectionContext'

export const SelectableCollection = ({ children, items }) => {
  return (
    <SelectionContext.Provider
      value={{
        data: items,
        children: {},
        selection: new Set(),
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const useClick = (
  onClick: EventHandler<SyntheticEvent>,
  refs: any[] = []
) => {
  return useCallback((event) => {
    if (!event.shiftKey) {
      onClick(event)
    }
  }, refs)
}

export type SelectEvents = {
  onMouseDown: EventHandler<SyntheticEvent>
}
