import React, { FC, ReactNode } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { IconChevronDown, IconChevronDownSmall, IconClose } from '../..'
import { RowSpaced } from '../Styled'

import { Value, Option } from '../ContextMenu'
import { PositionProps } from '../Overlay'
import { useSelect } from '../../hooks/useSelect'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 8,
  alignItems: 'center',
  border: `1px solid ${genColor('border', 'default', 'strong')}`,
  backgroundColor: genColor('background', 'default', 'surface'),
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  paddingBottom: 8,
  cursor: 'pointer',
  userSelect: 'none',
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  width: '100%',
  maxHeight: '40px',
  maxWidth: '320px',
  '@media (hover: hover)': {
    '&:hover': {
      border: `1px solid ${genColor('border', 'default', 'subtle')}`,
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
  color?: any
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
      <Text
        size={14}
        style={{
          color: labelValue
            ? genColor('content', 'default', 'primary')
            : genColor('content', 'default', 'secondary'),
        }}
      >
        {labelValue || placeholder}
      </Text>
      {/* {currentValue && (
        <ClickableIcon
          icon={IconClose}
          onClick={(e) => {
            e.stopPropagation()
            setValues(null)
            onChange(null)
          }}
        />
      )} */}

      <IconChevronDownSmall
        color="default"
        //size={16} style={{ marginLeft: 8 }}
      />
    </>
  )

  if (ghost) {
    // style = {
    //   ...style,
    //   backgroundColor: null,
    //   border: null,
    //   padding: 0,
    //   '&:hover': null,
    // }
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
        //    boxShadow: ghost ? null : boxShadow('medium'),
        ...style,
      }}
      id={id}
    >
      {children}
    </StyledSelect>
  )
}

export const SelectLabel: FC<{
  children: ReactNode
  onClick: any
  style?: Style
  color?: any
  label: ReactNode
}> = ({ children, onClick, style, color: colorProp, label }) => {
  return (
    <RowSpaced
      onClick={onClick}
      style={{
        alignItems: null,
        borderRadius: 4,
        border: `1px solid ${genColor('border', 'default', 'strong')}`,
        backgroundColor: genColor('background', 'default', 'surface'),
        cursor: 'pointer',
        userSelect: 'none',
        height: 38,
        overflowY: 'hidden',
        overflowX: 'hidden',
        width: '100%',
        '@media (hover: hover)': {
          '&:hover': {
            border: `1px solid ${genColor('border', 'default', 'subtle')}`,
          },
        },
        ...style,
      }}
    >
      <Text
        color={colorProp}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          backgroundColor: genColor('background', 'neutral', 'subtle'),
          borderRight: `1px solid ${genColor('border', 'default', 'strong')}`,
          flexShrink: 0,
        }}
      >
        {label}
      </Text>
      <Text
        color={colorProp}
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderRight: `1px solid ${genColor('border', 'default', 'strong')}`,
        }}
      >
        {children}
      </Text>
    </RowSpaced>
  )
}
