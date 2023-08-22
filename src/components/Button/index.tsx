/* eslint-disable react/no-unused-prop-types */
import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react'

import {
  color as genColor,
  ColorActionColors,
  ColorContentColors,
  KeyBoardshortcut,
  Key,
  ProgressCircle,
  renderOrCreateElement,
  Style,
  styled,
  Text,
  useKeyboardShortcut,
} from '../..'
import { ClickHandler } from '../../types'

const stopPropagation = (e) => e.stopPropagation()

export type ButtonProps = {
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  children?: ReactNode
  disabled?: boolean
  color?: ColorActionColors
  fill?: boolean // TODO: add this on inputs etc as well
  ghost?: boolean
  icon?: ReactNode
  afterIcon?: ReactNode
  loading?: boolean
  onClick?: ClickHandler
  onPointerDown?: MouseEventHandler
  light?: boolean
  size: 'large' | 'medium' | 'small' | 'xsmall'
  style?: Style
  underline?: boolean
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
  const { disabled, color: colorProp = 'primary', clickAnimation } = props

  const isLight = props.light
  const isGhost = props.ghost || props.size === 'xsmall'

  const style: Style = {
    transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
    pointerEvents: disabled ? 'none' : 'auto',
    border: `1px solid transparent`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isGhost
      ? 'transparent'
      : genColor('action', colorProp, isLight ? 'subtleNormal' : 'normal'),
    '&:active': {
      backgroundColor: isGhost
        ? 'transparent'
        : genColor('action', colorProp, isLight ? 'subtleActive' : 'active'),
    },
    '&:focus': {
      backgroundColor: isGhost
        ? 'transparent'
        : genColor(
            'action',
            colorProp,
            isLight ? 'subtleSelected' : 'selected'
          ),
      border:
        props.size !== 'xsmall'
          ? `1px solid ${genColor('content', 'inverted', 'primary')}`
          : '1px solid transparent',
      boxShadow:
        props.size !== 'xsmall'
          ? `0px 0px 0px 2px ${genColor('action', 'primary', 'normal')}`
          : 'none',
    },
    '&:hover': {
      backgroundColor: isGhost
        ? 'transparent'
        : genColor('action', colorProp, isLight ? 'subtleHover' : 'hover'),
    },
    width: 'fit-content',
    opacity: disabled ? 0.6 : 1,
  }

  if (isButton) {
    style.cursor = 'pointer'
  }

  return style
}

export const Button: FC<ButtonProps> = (props) => {
  let {
    children,
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
    size = 'medium',
    style,
    underline,
  } = props

  const isLight = props.light
  const isGhost = props.ghost || props.size === 'xsmall'
  const [isLoading, setIsLoading] = useState(false)
  const buttonElem = useRef<HTMLElement>(null)
  const extendedOnClick = useCallback(
    async (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      const t = buttonElem.current
      if (!t) {
        return
      }
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
    props.color === 'inverted'
      ? 'inverted'
      : (isLight || isGhost) && props.color === 'alert'
      ? 'negative'
      : (isLight || isGhost) && props.color === 'neutral'
      ? 'default'
      : isLight || isGhost
      ? 'brand'
      : 'inverted'

  return (
    <styled.button
      ref={buttonElem}
      disabled={props.disabled}
      onClick={onClick && extendedOnClick}
      onPointerDown={onPointerDown || stopPropagation}
      style={{
        padding:
          size === 'large'
            ? '10px 16px'
            : size === 'medium'
            ? '6px 16px'
            : size === 'small'
            ? '4px 12px'
            : '0px',
        borderRadius: size === 'large' || size === 'medium' ? 8 : 4,
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading && (
          <styled.div style={{ marginRight: 8, marginLeft: '-4px' }}>
            <ProgressCircle loading color={props.color} />
          </styled.div>
        )}
        {icon &&
          renderOrCreateElement(icon, {
            color: contentColor,
            style: { marginRight: 8 },
          })}
        <Text
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration:
              size === 'xsmall' && underline ? 'underline' : 'inherit',
            textUnderlineOffset: size === 'xsmall' && underline ? '2px' : '0px',
          }}
          color={contentColor}
          size={size === 'large' || size === 'medium' ? 16 : 14}
          weight={size === 'xsmall' ? 'medium' : 'strong'}
        >
          {children}
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
      </div>
    </styled.button>
  )
}
