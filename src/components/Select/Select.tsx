import React, { FC, ReactNode } from 'react'
import { Value, Option } from '~/components/ContextMenu'
import {
  styled,
  Style,
  Color,
  useSelect,
  PositionProps,
  Text,
  boxShadow,
  color,
  ChevronDownIcon,
  CloseIcon,
} from '~'
import { SelectLabel } from './shared'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 8,
  alignItems: 'center',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 36,
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  width: '100%',
  '@media (hover: hover)': {
    '&:hover': {
      border: `1px solid ${color('border:hover')}`,
    },
  },
})

export type SelectOption = Value | Option

export type SelectProps = {
  value?: Value
  options: SelectOption[]
  onChange?: (value: Value) => void
  filterable?: boolean | 'create'
  placeholder?: string
  overlay?: PositionProps
  label?: ReactNode
  name?: string
  color?: Color
  style?: Style
  id?: string
  ghost?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  style,
  filterable,
  color = 'text',
  placeholder = 'Select an option',
  overlay,
  label,
  name,
  id,
  ghost,
  onClick,
  disabled,
}) => {
  const [currentValue, open, setValues] = useSelect(options, value, onChange, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })
  let labelValue: ReactNode = currentValue

  if (currentValue) {
    for (const opt of options) {
      if (typeof opt === 'object' && opt.value === currentValue && opt.label) {
        labelValue = opt.label
      }
    }
  }

  const children = (
    <>
      {typeof currentValue === 'string' && (
        <input
          readOnly
          style={{ display: 'none' }}
          value={currentValue}
          name={name}
        />
      )}
      <Text color={labelValue ? 'text' : 'text2'}>
        {labelValue || placeholder}
      </Text>
      {currentValue && (
        <CloseIcon
          style={{ marginLeft: 'auto' }}
          onClick={(e) => {
            e.stopPropagation()
            setValues(null)
            onChange(null)
          }}
        />
      )}
      <ChevronDownIcon color={color} size={16} style={{ marginLeft: 8 }} />
    </>
  )

  if (ghost) {
    style = {
      ...style,
      backgroundColor: null,
      border: null,
      padding: 0,
      '&:hover': null,
    }
  }
  if (disabled) {
    style = {
      ...style,
      cursor: 'not-allowed',
      backgroundColor: 'rgba(0,0,0,0.12)',
      opacity: '0.5',
    }
  }

  return label ? (
    <SelectLabel
      label={label}
      onClick={
        disabled
          ? null
          : (e) => {
              open(e)
            }
      }
      style={style}
    >
      {children}
    </SelectLabel>
  ) : (
    <StyledSelect
      onClick={
        disabled
          ? null
          : (e) => {
              open(e)
            }
      }
      style={{
        boxShadow: ghost ? null : boxShadow('medium'),
        ...style,
      }}
      id={id}
    >
      {children}
    </StyledSelect>
  )
}
