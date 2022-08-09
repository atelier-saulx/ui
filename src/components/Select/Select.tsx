import React, { FC, useEffect, ReactNode, CSSProperties } from 'react'
import { useSelect } from '~/hooks/useSelect'
import { Value, Option } from '~/components/ContextMenu'
import { Text } from '~/components/Text'
import { styled } from 'inlines'
import { PositionProps } from '../Overlay'
import { Color } from '~/types'
import { ChevronDownIcon } from '~/icons'
import { color } from '~/utils'
import { SelectLabel } from './shared'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  '&:hover': {
    border: `1px solid ${color('border:hover')}`,
  },
})

export type SelectProps = {
  value?: Value
  options: (Option | Value)[]
  onChange: (value: Value) => void
  filterable?: boolean | 'create'
  placeholder?: string
  overlay?: PositionProps
  label?: string
  color?: Color
  style?: CSSProperties
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
}) => {
  const [currentValue, open] = useSelect(options, value, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })
  let labelValue: ReactNode = currentValue

  useEffect(() => {
    if (currentValue !== value) {
      // TODO: Fix this type
      onChange(currentValue as Value)
    }
  }, [currentValue])

  if (currentValue) {
    for (const opt of options) {
      if (typeof opt === 'object' && opt.value === currentValue && opt.label) {
        labelValue = opt.label
      }
    }
  }

  const children = (
    <>
      <Text color={currentValue ? 'text2' : 'text'}>
        {labelValue || placeholder}
      </Text>
      <ChevronDownIcon color={color} size={16} />
    </>
  )

  return label ? (
    <SelectLabel label={label} onClick={open} style={style}>
      {children}
    </SelectLabel>
  ) : (
    <StyledSelect onClick={open} style={style}>
      {children}
    </StyledSelect>
  )
}
