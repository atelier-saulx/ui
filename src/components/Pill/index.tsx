import React, {
  Dispatch,
  FC,
  FunctionComponent,
  ReactNode,
  SetStateAction,
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
  filled?: boolean
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
  filled,
  onChange,
}) => {
  const [thisValue, setThisValue] = useState<any>(value)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof value === 'boolean') {
      onChange?.()
    } else {
      onChange?.(e)
    }
  }
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
        onClick={typeof value === 'boolean' ? () => onChange?.(!value) : null}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 8px',
          width: 'fit-content',
          gap: '8px',
          borderRadius: '4px',
          border: !filled ? '0px solid' : '1px solid',
          borderColor: genColor('inputBorder', 'neutralNormal', 'default'),
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
              setThisValue(null)
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
            top: 40,
            display: 'flex',
            flexDirection: 'column',
            left: 0,
            width: '100%',
            gap: 4,
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
              style={{ padding: '4px', ...colorStyle }}
            >
              {option.label}
            </Text>
          ))}
        </styled.div>
      )}
    </styled.div>
  )
}
