import React, {
  Dispatch,
  FC,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  styled,
  Style,
  color as genColor,
  IconCheckLarge,
  Text,
  IconChevronDown,
  IconClose,
} from '../../'

type PillOption = {
  label: string
  value: string
}

type Common = {
  prefix?: string
  label?: string
  icon?: FunctionComponent<any> | ReactNode
}

type ConditionalProps =
  | {
      value?: boolean
      options?: never
      onChange?: () => void | Dispatch<SetStateAction<Boolean>>
    }
  | {
      options?: PillOption[]
      value?: PillOption
      onChange?: (e) => void
    }
export type PillPropss = Common & ConditionalProps
export type PillProps = {
  thisIs: Style
  broken: string
}

export const Pill: FC<PillPropss> = ({
  prefix,
  label,
  value,
  icon,
  options,
  onChange,
}) => {
  const [thisValue, setThisValue] = useState<any>(value)
  const [open, setOpen] = useState<boolean>(false)
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    if (typeof value === 'boolean' && value) {
      setFilled(true)
    } else if (typeof thisValue === 'object') {
      setFilled(true)
    } else {
      setFilled(false)
    }
    console.log(filled)
  }, [thisValue])

  const colorStyle = {
    backgroundColor: filled
      ? genColor('background', 'default', 'strong')
      : genColor('action', 'neutral', 'subtleNormal'),
    '&:hover': {
      backgroundColor: filled
        ? genColor('background', 'default', 'strong')
        : genColor('action', 'neutral', 'subtleHover'),
      borderColor: genColor('inputBorder', 'neutralHover', 'default'),
    },
    '&:active': {
      backgroundColor: filled
        ? genColor('background', 'default', 'strong')
        : genColor('action', 'neutral', 'subtleActive'),
      borderColor: genColor('inputBorder', 'neutralActive', 'default'),
    },
    '&:selected': {
      backgroundColor: filled
        ? genColor('background', 'default', 'strong')
        : genColor('action', 'neutral', 'subtleSelected'),
      borderColor: genColor('inputBorder', 'neutralSelected', 'default'),
    },
  }
  return (
    <styled.div
      style={{
        position: 'relative',
        display: 'inline-flex',
        width: 'fit-content',
      }}
    >
      <styled.div
        //@ts-ignore
        onClick={typeof value === 'boolean' ? () => onChange?.(!value) : null}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: !filled ? '4px 8px' : '3px 7px',
          width: 'fit-content',
          gap: '8px',
          borderRadius: '4px',
          borderStyle: 'solid',
          borderWidth: !filled ? '0px' : '1px',
          borderColor: genColor('inputBorder', 'neutralNormal', 'default'),
          boxSizing: 'border-box',
          ...colorStyle,
        }}
      >
        {typeof value === 'boolean' && value && <IconCheckLarge />}
        <styled.div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Text color="default" light>
            {prefix}:
          </Text>
          <Text color="default">
            {typeof value !== 'boolean' ? thisValue?.label ?? label : label}
          </Text>
        </styled.div>
        {options && !thisValue && !open && (
          <IconChevronDown onClick={() => setOpen(true)} />
        )}
        {(options && thisValue) || open ? (
          <IconClose
            onClick={() => {
              setOpen(false)
              setThisValue(false)
            }}
          />
        ) : (
          <></>
        )}
      </styled.div>
      {open && (
        <styled.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 48,
            background: genColor('background', 'default', 'surface'),
            border: `1px solid ${genColor(
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
          {options?.map((option, index) => (
            <Text
              onClick={() => {
                onChange?.(option.value)
                setThisValue(option)
                setOpen(false)
              }}
              key={option.value + index}
              color="default"
              style={{
                position: 'relative',
                userSelect: 'none',
                cursor: 'pointer',
                height: 32,
                background:
                  // index === focus
                  // ? color('action', 'system', 'hover')
                  genColor('background', 'default', 'surface'),
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                padding: '0 12px 0 42px',
                borderRadius: 8,
                '&:hover': {
                  background: genColor('action', 'system', 'hover'),
                },
                '&:active': {
                  background: genColor('action', 'system', 'active'),
                },
              }}
            >
              {option.label}
            </Text>
          ))}
        </styled.div>
      )}
    </styled.div>
  )
}
