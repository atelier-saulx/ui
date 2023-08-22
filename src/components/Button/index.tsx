/* eslint-disable react/no-unused-prop-types */
import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  MouseEvent,
} from 'react'

import { styled, Style } from 'inlines'
import { renderOrCreateElement } from '../../utils/renderOrCreateElement'
import { color as genColor } from '../../varsUtilities'
import { Text } from '../Text'
import { useKeyboardShortcut } from '../../hooks/useKeyboard'
import { KeyBoardshortcut } from '../KeyboardShortcut'
import { ProgressCircle } from '../ProgressCircle/ProgressCircle'
import { ColorActionColors, ColorContentColors } from '../../varsTypes'
import { Key } from '../KeyboardShortcut'
import { IconChevronDownSmall } from '../../icons'

const stopPropagation = (e) => e.stopPropagation()

export type ButtonProps = {
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  children?: ReactNode | ReactNode[]
  label?: string
  disabled?: boolean
  dropdownIndicator?: boolean
  color?: ColorActionColors
  ghost?: boolean
  subtle?: boolean
  transparent?: boolean
  fill?: boolean // TODO: add this on inputs etc as well
  icon?: FunctionComponent | ReactNode
  afterIcon?: FunctionComponent | ReactNode
  loading?: boolean
  onClick?:
    | MouseEventHandler
    | (() => void)
    | ((e: MouseEvent) => Promise<void>)
    | (() => Promise<void>)
  onPointerDown?: MouseEventHandler
  style?: Style
  /** 
     Use a keyboard shortcut for this button, use displayShortcut to automaticly show the shortcut if applicable.
    
     Keys: `Enter, Esc, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Tab`
     Commands: `Cmd+C, Alt+C, Shift+C, Cmd+Shift+A`
    */
  keyboardShortcut?: Key
  /** Parses action keys string and displays it if not on a touchdevice
   */
  displayShortcut?: boolean
  /** Animate onClick
   */
  clickAnimation?: boolean
}

export const getButtonStyle = (
  props: ButtonProps,
  isButton: boolean = !!props.onClick
): Style => {
  const {
    disabled,
    ghost,
    color: colorProp = ghost ? 'system' : 'primary',
    label,
    subtle,
    clickAnimation,
  } = props

  const isLight = subtle || ghost
  const style: Style = {
    transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
    pointerEvents: disabled ? 'none' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: ghost
      ? 'transparent'
      : genColor('action', colorProp, subtle ? 'subtleNormal' : 'normal'),
    // color: genColor(colorProp, 'contrast', isLight),
    '&:active': {
      backgroundColor: props.ghost
        ? 'transparent'
        : genColor(
            'action',
            colorProp,
            props.subtle ? 'subtleActive' : 'active'
          ),
    },
    '&:focus': {
      backgroundColor: props.ghost
        ? 'transparent'
        : genColor(
            'action',
            colorProp,
            props.subtle ? 'subtleSelected' : 'selected'
          ),
      border: `1px solid ${genColor('content', 'inverted', 'primary')}`,
      boxShadow: `0px 0px 0px 2px ${genColor('action', 'primary', 'normal')}`,
    },
    '&:hover': {
      backgroundColor: props.ghost
        ? 'transparent'
        : genColor('action', colorProp, props.subtle ? 'subtleHover' : 'hover'),
    },
    width: 'fit-content',
    opacity: disabled ? 0.6 : 1,
  }

  if (isButton) {
    style.cursor = 'pointer'

    // if (!props.transparent) {
    //   style['@media (hover:hover)'] = {
    //     '&:hover': {
    //       backgroundColor: genColor('action', 'primary', 'hover'),
    //       cursor: disabled ? 'not-allowed' : 'pointer',
    //     },
    //   }
    // }
    // style['&:active'] = clickAnimation
    //   ? {
    //       backgroundColor: ghost
    //         ? 'transparent'
    //         : genColor('action', colorProp, subtle ? 'subtleActive' : 'active'),
    //       transform: 'scale(1.05)',
    //     }
    //   : {
    //       backgroundColor: !props.transparent ? 'transparent' : null,
    //     }
  }

  return style
}

export const Button: FC<ButtonProps> = (props) => {
  let {
    children,
    dropdownIndicator,
    label,
    fill,
    icon,
    afterIcon,
    loading,
    onClick,
    onPointerDown,
    onMouseEnter,
    onMouseLeave,
    keyboardShortcut,
    displayShortcut,
    style,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const buttonElem = useRef<HTMLElement>(null)
  const extendedOnClick = useCallback(
    async (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      const t = buttonElem.current
      let isSet = false
      const timer = setTimeout(() => {
        if (!isSet) {
          setIsLoading(true)
        }
      }, 100)
      try {
        await onClick?.(e)
      } catch (e) {
        console.error(`Error from async click "${e.message}"`)
        t.style.transform = 'translateX(-10px)'
        setTimeout(() => {
          t.style.transform = 'translateX(10px)'
          setTimeout(() => {
            t.style.transform = 'translateX(0px)'
          }, 100)
        }, 100)
      }
      isSet = true
      setIsLoading(false)
      clearTimeout(timer)
    },
    [onClick]
  )

  if (keyboardShortcut) {
    const timeRef = useRef<any>()
    useEffect(() => {
      return () => {
        clearTimeout(timeRef.current)
      }
    }, [])
    const onKeyUp = useCallback(
      (event: any) => {
        extendedOnClick(event)
      },
      [extendedOnClick, timeRef]
    )
    useKeyboardShortcut(keyboardShortcut, onKeyUp, buttonElem)
  }

  if (isLoading) {
    loading = true
  }

  if (loading) {
    props.disabled = true
  }

  let contentColor: ColorContentColors =
    (props.subtle || props.ghost) && props.color === 'alert'
      ? 'negative'
      : (props.subtle || props.ghost) && props.color === 'neutral'
      ? 'default'
      : props.subtle || props.ghost
      ? 'brand'
      : 'inverted'

  return (
    <styled.button
      ref={buttonElem}
      disabled={props.disabled}
      onClick={onClick && extendedOnClick}
      onPointerDown={onPointerDown || stopPropagation}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        width: fill ? '100%' : null,
        position: 'relative',
        ...getButtonStyle(props, true),
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          //   visibility: loading ? 'hidden' : null,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading && (
          <styled.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%,-50%,0)',
            }}
          >
            <ProgressCircle />
          </styled.div>
        )}
        {icon &&
          renderOrCreateElement(icon, {
            color: contentColor,
            style: { marginRight: 8 },
          })}
        <Text
          style={{ display: 'flex', alignItems: 'center' }}
          color={contentColor}
          size={16}
          weight="strong"
        >
          {label || children}
          {displayShortcut && keyboardShortcut ? (
            <KeyBoardshortcut keyboardShortcut={keyboardShortcut} />
          ) : null}
        </Text>
        {afterIcon &&
          renderOrCreateElement(
            afterIcon,
            children || icon
              ? {
                  color: contentColor,
                  style: { marginLeft: 8, minWidth: 16 },
                }
              : null
          )}
        {dropdownIndicator && (
          <styled.div style={{ marginLeft: 12 }}>
            {renderOrCreateElement(IconChevronDownSmall, {
              color: contentColor,
            })}
          </styled.div>
        )}
      </div>
    </styled.button>
  )
}
