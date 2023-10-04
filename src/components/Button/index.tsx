import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'

import { color as genColor } from '../../varsUtilities'
import { ColorActionColors, ColorContentColors } from '../../varsTypes'
import { KeyBoardshortcut, Key, Text, ProgressCircle } from '../../components'
import { useKeyboardShortcut } from '../../hooks'
import { BpTablet } from '../../utils'
import { Style, styled } from 'inlines'
import { ClickHandler } from '../../types'

const stopPropagation = (e) => e.stopPropagation()

export type ButtonProps = {
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  onFocus?: () => void
  onBlur?: () => void
  children?: ReactNode
  disabled?: boolean
  color?: ColorActionColors
  fill?: boolean // TODO: add this on inputs etc as well
  hideFocusState?: boolean
  ghost?: boolean
  icon?: ReactNode
  afterIcon?: ReactNode
  loading?: boolean
  onClick?: ClickHandler
  onPointerDown?: MouseEventHandler
  light?: boolean
  size?: 'large' | 'medium' | 'small' | 'xsmall'
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
}

export const getButtonStyle = (
  props: ButtonProps,
  isButton: boolean = !!props.onClick
): Style => {
  const { disabled, color: colorProp = 'primary' } = props

  const isLight = props.light
  const isGhost = props.ghost || props.size === 'xsmall'

  const style: Style = {
    transitionDelay: '0s,0s,0s,0.1s,0.1s',
    transitionProperty: 'width,transform,opacity,box-shadow,border',
    transitionDuration: '0.15s,  0.1s,  0.15s, 0.1s, 0.1s',
    pointerEvents: disabled ? 'none' : 'auto',
    border:
      colorProp === 'system'
        ? `1px solid ${genColor('inputBorder', 'neutralNormal', 'default')}`
        : `1px solid transparent`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isGhost
      ? 'transparent'
      : genColor('action', colorProp, isLight ? 'subtleNormal' : 'normal'),
    '&:focus': !props.hideFocusState
      ? {
          outline: 'none',
          border:
            props.size !== 'xsmall'
              ? `1px solid ${genColor('content', 'inverted', 'primary')}`
              : '1px solid transparent',
          boxShadow: `0px 0px 0px 2px ${
            colorProp === 'system'
              ? genColor('content', 'default')
              : genColor('action', colorProp, 'normal')
          }`,
        }
      : {
          outline: 'none',
          border:
            isGhost || colorProp === 'system'
              ? `1px solid ${genColor(
                  'inputBorder',
                  'neutralNormal',
                  'default'
                )}`
              : `1px solid transparent`,
          boxShadow: 'none',
        },
    '&:hover': {
      outline: 'none',
      backgroundColor: isGhost
        ? 'transparent'
        : genColor('action', colorProp, isLight ? 'subtleHover' : 'hover'),
    },
    [BpTablet]: {
      '&:hover': {
        backgroundColor: genColor(
          'action',
          colorProp,
          isLight ? 'subtleNormal' : 'normal'
        ),
      },
    },
    '&:active': {
      transform: 'scale(0.98)',
      backgroundColor: isGhost
        ? 'transparent'
        : genColor('action', colorProp, isLight ? 'subtleNormal' : 'active'),
    },
    width: 'fit-content',
    opacity: disabled ? 0.6 : 1,
  }

  if (isButton) {
    style.cursor = 'pointer'
  }

  return style
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
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
      onFocus,
      onBlur,
      size = 'medium',
      style,
      underline,
    } = props

    const isLight = props.light
    const isGhost = props.ghost || props.size === 'xsmall'
    let [isLoading, setIsLoading] = useState(false)
    let { disabled } = props

    if (loading === true) {
      isLoading = loading
    } else if (loading === false) {
      isLoading = false
    }

    const buttonElem = useRef<HTMLButtonElement>(null)
    useImperativeHandle(forwardedRef, () => buttonElem.current, [])
    const extendedOnClick = useCallback(
      async (e: any) => {
        const t = buttonElem.current
        t.blur()
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
          const t = buttonElem.current
          t.style.transform = 'scale(0.96)'
          if (!t) {
            return
          }
          setTimeout(() => {
            t.style.transform = 'scale(1)'
          }, 100)
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
      disabled = true
    }

    const contentColor: ColorContentColors =
      props.color === 'inverted' && size === 'xsmall'
        ? 'inverted'
        : props.color === 'inverted'
        ? 'default'
        : (isLight || isGhost) && props.color === 'alert'
        ? 'negative'
        : (isLight || isGhost) && props.color === 'neutral'
        ? 'default'
        : (isLight || isGhost) && props.color === 'primary'
        ? 'brand'
        : isLight || isGhost
        ? 'default'
        : props.color === 'alert'
        ? 'inverted'
        : props.color === 'system'
        ? 'default'
        : props.color === 'primary'
        ? 'inverted'
        : 'inverted'

    return (
      <styled.button
        ref={buttonElem}
        disabled={disabled}
        onClick={onClick && extendedOnClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerDown={onPointerDown || stopPropagation}
        style={{
          padding: !children
            ? size === 'large'
              ? '16px'
              : size === 'medium'
              ? '10px'
              : size === 'small'
              ? '6px'
              : '6px'
            : size === 'large'
            ? '10px 16px'
            : size === 'medium'
            ? '6px 16px'
            : size === 'small'
            ? '4px 12px'
            : '0px 4px',
          borderRadius:
            size === 'large' || size === 'medium' || !children ? 8 : 4,
          width: !children ? '20px' : fill ? '100%' : null,
          color: genColor('content', contentColor),
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
            whiteSpace: 'nowrap',
          }}
        >
          {isLoading && (
            <styled.div style={{ marginRight: 8, marginLeft: '-4px' }}>
              <ProgressCircle color={contentColor} loading />
            </styled.div>
          )}
          {icon ? (
            <styled.div
              style={{
                marginRight: children ? 8 : 0,
              }}
            >
              {icon}
            </styled.div>
          ) : null}
          <Text
            selectable="none"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration:
                size === 'xsmall' && underline ? 'underline' : 'inherit',
              textUnderlineOffset:
                size === 'xsmall' && underline ? '2px' : '0px',
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
          {afterIcon ? (
            <styled.div
              style={{
                display: 'flex',
                marginLeft: icon || children ? 8 : 0,
                width: 16,
                height: 16,
                maxWidth: icon || children ? 16 : null,
                maxHeight: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {afterIcon}
            </styled.div>
          ) : null}
        </div>
      </styled.button>
    )
  }
)
