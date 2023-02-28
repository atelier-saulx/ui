import React, { FC, useEffect, ReactNode, useRef } from 'react'
import { useSelect } from '~/hooks/useSelect'
import { Value, Option } from '~/components/ContextMenu'
import { Text } from '~/components/Text'
import { styled, Style } from 'inlines'
import { PositionProps } from '../Overlay'
import { Color } from '~/types'
import { ChevronDownIcon } from '~/icons'
import { boxShadow, color } from '~/utils'
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
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  '@media (hover: hover)': {
    '&:hover': {
      border: `1px solid ${color('border:hover')}`,
    },
  },
})

export type SelectProps = {
  value?: Value
  options: (Option | Value)[]
  onChange?: (value: Value) => void
  filterable?: boolean | 'create'
  placeholder?: string
  overlay?: PositionProps
  label?: string
  name?: string
  color?: Color
  style?: Style
  id?: string
  ghost?: boolean
  onClick?: () => void
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
}) => {
  const openedRef = useRef<boolean>()
  const [currentValue, open] = useSelect(options, value, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })
  let labelValue: ReactNode = currentValue

  useEffect(() => {
    if (openedRef.current) {
      if (currentValue !== value) {
        // TODO: Fix this type
        onChange?.(currentValue as Value)
      }
    }
  }, [currentValue, onChange])

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
      <ChevronDownIcon color={color} size={16} />
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

  return label ? (
    <SelectLabel
      label={label}
      onClick={(e) => {
        openedRef.current = true
        open(e)
      }}
      style={style}
    >
      {children}
    </SelectLabel>
  ) : (
    <StyledSelect
      onClick={(e) => {
        if (onClick) {
          onClick()
        }
        openedRef.current = true
        open(e)
      }}
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
