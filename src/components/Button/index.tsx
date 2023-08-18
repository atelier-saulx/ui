import React, {
  FC,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react'
import { styled, Style } from 'inlines'
import { ColorContentColors } from '../../../src/varsTypes'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'
import {
  IconCheckCircle,
  IconChevronDownSmall,
  color as genColor,
} from '../../../src'
import { Text } from '../Text'
import { ColorActionColors } from '../../../src/varsTypes'
import { Key, KeyBoardshortcut } from '../KeyboardShortcut'
import { useKeyboardShortcut } from '../../hooks/useKeyboard'

import * as icons from '../../icons'
import { ProgressCircle } from '../ProgressCircle/ProgressCircle'

const IconAlarmClock = icons.IconAlarmClock
// TODO add progress/ loading comp -icon

type ButtonProps = {
  afterIcon?: any
  children?: ReactNode
  color?: ColorActionColors
  disabled?: boolean
  displayShortcut?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  icon?: any
  keyboardShortcut?: Key
  label?: string
  loading?: boolean
  onClick?: () => void
  size?: 'large' | 'medium' | 'small'
  style?: Style
  subtle?: boolean
}

export const Button: FC<ButtonProps> = ({
  afterIcon,
  children,
  color = 'primary',
  disabled,
  displayShortcut,
  dropdownIndicator,
  ghost,
  icon,
  keyboardShortcut,
  label,
  loading,
  onClick,
  size = 'large',
  style,
  subtle,
}) => {
  const [loadingCounter, setLoadingCounter] = useState<number>(0)
  //
  let contentColor: ColorContentColors =
    (subtle || ghost) && color === 'alert'
      ? 'negative'
      : (subtle || ghost) && color === 'neutral'
      ? 'default'
      : subtle || ghost
      ? 'brand'
      : 'inverted'

  const buttonElem = useRef<HTMLElement>(null)
  const extendedOnClick = useCallback(
    async (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      const t = buttonElem.current
      let isSet = false
      const timer = setTimeout(() => {
        if (!isSet) {
          // setIsLoading(true)
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
      // setIsLoading(false)
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

  if (loading) {
    if (loadingCounter < 1) {
      setTimeout(() => {
        setLoadingCounter(loadingCounter + 0.01)
      }, 24)
    } else {
      setLoadingCounter(0)
    }
  }

  return (
    <styled.div
      onClick={disabled ? null : onClick}
      style={{
        alignItems: 'center',
        backgroundColor: ghost
          ? 'transparent'
          : genColor('action', color, subtle ? 'subtleNormal' : 'normal'),
        borderRadius: size === 'small' ? '4px' : '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        opacity: disabled ? 0.4 : loading ? 0.7 : 1,
        padding:
          size === 'small'
            ? '2px 16px'
            : size === 'medium'
            ? '6px 16px'
            : '10px 16px',
        width: 'fit-content',
        '&:active': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleActive' : 'active'),
        },
        '&:focus': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleSelected' : 'selected'),
          border: `1px solid ${genColor('content', 'inverted', 'primary')}`,
          boxShadow: `0px 0px 0px 2px ${genColor(
            'action',
            'primary',
            'normal'
          )}`,
        },
        '&:hover': {
          backgroundColor: ghost
            ? 'transparent'
            : genColor('action', color, subtle ? 'subtleHover' : 'hover'),
        },
        ...style,
      }}
    >
      {loading && (
        <>
          <ProgressCircle
            value={loadingCounter}
            style={{ marginRight: 10 }}
            color="inverted"
          />
        </>
      )}

      {icon && (
        <styled.div
          style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
        >
          {renderOrCreateElement(icon, { color: contentColor })}
        </styled.div>
      )}
      {children}
      <Text
        weight={size === 'small' ? 'medium' : 'strong'}
        size={size === 'small' ? 14 : 16}
        color={contentColor}
      >
        {label}
        {displayShortcut && keyboardShortcut ? (
          <KeyBoardshortcut keyboardShortcut={keyboardShortcut} />
        ) : null}
      </Text>
      {afterIcon && (
        <styled.div
          style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}
        >
          {renderOrCreateElement(afterIcon, { color: contentColor })}
        </styled.div>
      )}
      {dropdownIndicator && (
        <styled.div style={{ marginLeft: 12 }}>
          {renderOrCreateElement(IconChevronDownSmall, { color: contentColor })}
        </styled.div>
      )}
    </styled.div>
  )
}
