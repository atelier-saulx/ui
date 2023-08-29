import React, {
  useEffect,
  useRef,
  useState,
  Children,
  FC,
  ReactNode,
} from 'react'
import {
  IconSmallClose,
  IconCheckLarge,
  IconChevronDownSmall,
  Style,
  styled,
  color,
  Text,
  TagProps,
} from '../..'
import { SelectInputProps } from '../Input/SelectInput'

const Tag: FC<TagProps> = ({ onClose, children, style }) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('action', 'neutral', 'subtleNormal'),
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
        padding: '0px 8px',
        width: 'fit-content',
        ...style,
      }}
    >
      <Text size={14} weight="medium" style={{ marginRight: 4 }}>
        {children}
      </Text>
      <styled.div
        onClick={onClose}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: color('action', 'neutral', 'subtleHover'),
          },
          '&:active': {
            backgroundColor: color('action', 'neutral', 'subtleActive'),
          },
        }}
      >
        <IconSmallClose />
      </styled.div>
    </styled.div>
  )
}

export type SelectInputOption = {
  label: string
  value: string
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export function MultiSelect({
  options,
  beforeIcon,
  disabled,
  placeholder,
  value: incomingValue = [],
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] =
    useState<Array<SelectInputOption | null>>(incomingValue)
  const [focus, setFocus] = useState(0)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const keyDown = (e: any) => {
    if (open) {
      if (e.keyCode === 38 && focus !== 0) {
        setFocus(focus - 1)
      }
      if (
        e.keyCode === 40 &&
        focus !== options.filter((i) => !value.includes(i)).length - 1
      ) {
        setFocus(focus + 1)
      }
      if (e.keyCode === 13) {
        //   setOpen(false)
        if (!value.includes(options.filter((i) => !value.includes(i))[focus])) {
          setValue((oldValue) => [
            ...oldValue,
            options.filter((i) => !value.includes(i))[focus],
          ])
          setFocus(0)
        }
        onChange?.(options.filter((i) => !value.includes(i))[focus].value)
      }
      if (e.keyCode === 8) {
        setValue((oldValue) =>
          oldValue.filter((i, index) => index !== oldValue.length - 1)
        )
      }
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <styled.div
      onKeyDown={(e) => keyDown(e)}
      style={{
        position: 'relative',
        minHeight: 40,
        width: '100%',
        maxWidth: '320px',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        cursor: 'pointer',
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            'neutralHover',
            'default'
          )}`,
        },
        boxSizing: 'border-box',
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
      }}
    >
      {beforeIcon && <div style={{ flexShrink: 0 }}>{beforeIcon}</div>}
      <styled.button
        ref={buttonRef}
        style={{
          width: '100%',
          height: '100%',
          appearance: 'none',
          border: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: '8px 10px',

          textAlign: 'left',
          color: color('content', 'default', 'primary'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:focus': {
            outline: 'none',
          },
          minWidth: 200,
        }}
        onClick={() => {
          if (disabled) return

          setOpen(true)
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'row',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          {value === null
            ? placeholder
            : value.map((i, index) => (
                <Tag
                  onClose={() => {
                    setValue((oldValue) => oldValue.filter((t) => t !== i))
                  }}
                  key={i?.label}
                  style={{ flexShrink: 0 }}
                >
                  {i?.label}
                </Tag>
              ))}
        </div>
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 8,
          }}
        >
          <IconChevronDownSmall />
        </div>
      </styled.button>

      {open && (
        <div style={{}}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onClick={() => {
              setOpen(false)
            }}
          />
          <styled.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 'calc(100% + 8px)',
              background: color('background', 'default', 'surface'),
              border: `1px solid ${color(
                'inputBorder',
                'neutralNormal',
                'default'
              )}`,
              borderRadius: 8,
              padding: 8,
              '& > * + *': {
                marginTop: '2px',
              },
            }}
          >
            {options
              .filter((i) => !value.includes(i))
              .map((option, index) => (
                <styled.div
                  idx={index}
                  key={option.value}
                  onMouseEnter={() => {
                    setFocus(index)
                  }}
                  onClick={() => {
                    if (!value.includes(option)) {
                      setValue((oldValue) => [...oldValue, option])
                    }
                    //   setOpen(false)
                    onChange?.(option.value)
                  }}
                  style={{
                    position: 'relative',
                    userSelect: 'none',
                    cursor: 'pointer',
                    height: 32,
                    background:
                      focus === index
                        ? color('action', 'system', 'hover')
                        : color('background', 'default', 'surface'),
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    padding: '0 12px 0 42px',
                    borderRadius: 8,
                    '&:active': {
                      background: color('action', 'system', 'active'),
                    },
                  }}
                >
                  {value?.includes(option) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 12,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconCheckLarge />
                    </div>
                  )}
                  {option.label}
                </styled.div>
              ))}
          </styled.div>
        </div>
      )}
    </styled.div>
  )
}
