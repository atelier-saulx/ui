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
import {
  border,
  color,
  renderOrCreateElement,
  Color,
  Text,
  Key,
  Icon,
  styled,
  Style,
  LoadingIcon,
  useKeyboardShortcut,
  KeyBoardshortcut,
} from '~'

const stopPropagation = (e) => e.stopPropagation()

export type ButtonProps = {
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  children?: ReactNode | ReactNode[]
  disabled?: boolean
  color?: Color
  ghost?: boolean
  light?: boolean
  large?: boolean
  transparent?: boolean
  fill?: boolean // TODO: add this on inputs etc as well
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  loading?: boolean
  onClick?:
    | MouseEventHandler
    | (() => void)
    | ((e: MouseEvent) => Promise<void>)
    | (() => Promise<void>)
  onPointerDown?: MouseEventHandler
  outline?: boolean
  style?: Style
  textAlign?: 'center' | 'right' | 'left'
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
    color: colorProp = ghost ? 'text' : 'accent',
    outline,
    light,
    clickAnimation,
  } = props

  const isLight = light || ghost || outline
  const style: Style = {
    transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
    backgroundColor: ghost || outline ? null : color(colorProp, null, isLight),
    color: color(colorProp, 'contrast', isLight),
    border: border(outline && 1, colorProp, 'border', light),
    opacity: disabled ? 0.6 : 1,
  }

  if (isButton) {
    style.cursor = 'pointer'

    if (!props.transparent) {
      style['@media (hover:hover)'] = {
        '&:hover': {
          backgroundColor: color(colorProp, 'hover', isLight),
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
      }
    }
    style['&:active'] = clickAnimation
      ? {
          backgroundColor: !props.transparent
            ? color(colorProp, 'active', isLight)
            : null,
          transform: 'scale(1.05)',
        }
      : {
          backgroundColor: !props.transparent
            ? color(colorProp, 'active', isLight)
            : null,
        }
  }

  return style
}

export const Button: FC<ButtonProps> = (props) => {
  let {
    children,
    fill,
    icon,
    iconRight,
    large,
    loading,
    onClick,
    onPointerDown,
    onMouseEnter,
    onMouseLeave,
    keyboardShortcut,
    displayShortcut,
    style,
    textAlign = 'left',
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

  return (
    <styled.button
      ref={buttonElem}
      disabled={loading ? true : props.disabled}
      onClick={onClick && extendedOnClick}
      onPointerDown={onPointerDown || stopPropagation}
      style={{
        padding:
          !children && large
            ? '16px'
            : !children
            ? '8px'
            : large
            ? '8px 16px'
            : '6px 12px',
        borderRadius: large ? 8 : 4,
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
          visibility: loading ? 'hidden' : null,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            textAlign === 'left' && fill
              ? 'flex-start'
              : textAlign === 'center' && fill
              ? 'center'
              : textAlign === 'right' && fill
              ? 'flex-end'
              : fill
              ? 'space-between'
              : 'center',
        }}
      >
        {icon &&
          renderOrCreateElement(
            icon,
            children || iconRight
              ? {
                  style: { marginRight: 8, minWidth: 16 },
                }
              : null
          )}
        <Text
          style={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          typography={large ? 'subtext600' : 'body500'}
        >
          {children}
          {displayShortcut && keyboardShortcut ? (
            <KeyBoardshortcut keyboardShortcut={keyboardShortcut} />
          ) : null}
        </Text>
        {iconRight &&
          renderOrCreateElement(
            iconRight,
            children || icon
              ? {
                  style: { marginLeft: 8, minWidth: 16 },
                }
              : null
          )}
      </div>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3d(-50%,-50%,0)',
          }}
        >
          <LoadingIcon />
        </div>
      )}
    </styled.button>
  )
}
