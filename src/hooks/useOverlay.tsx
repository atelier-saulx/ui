import {
  addOverlay,
  GenericOverlay,
  OnClose,
  OverlayOptions,
  OverlayProps,
  PositionProps,
} from '../'
import React, { ComponentType, SyntheticEvent, useCallback } from 'react'
import { useAllContexts, ForwardContext } from '../components/Provider'
import { hash } from '@saulx/hash'

type PropsEventHandler<E = any, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>

export function useOverlay<P = any>(
  Component?: ComponentType<P>,
  props?: P,
  positionProps?: PositionProps,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType<OverlayProps<P>> = GenericOverlay,
  options: OverlayOptions = { transparent: true },
  callBackRef: null | any[] = null
): PropsEventHandler {
  const allCtx = useAllContexts()
  if (!Component) {
    return () => {}
  }

  return useCallback((e: Event | SyntheticEvent, selectionProps) => {
    e.stopPropagation?.()
    e.preventDefault?.()
    let cancel: OnClose
    if (handler) {
      cancel = handler(e)
    }
    addOverlay(
      <ForwardContext context={allCtx}>
        <Overlay
          Component={Component}
          target={e.currentTarget}
          props={{ ...props, ...selectionProps }}
          positionProps={positionProps}
          style={options.style}
        />
      </ForwardContext>,
      () => {
        if (cancel) cancel()
      },
      options
    )
    return true
  }, callBackRef || [props ? hash(props) : null])
}
