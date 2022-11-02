import { styled } from 'inlines'
import React, {
  FC,
  useCallback,
  useState,
  useReducer,
  SyntheticEvent,
  CSSProperties,
  FunctionComponent,
  ReactNode,
  ChangeEventHandler,
} from 'react'
import { removeOverlay } from '~/components/Overlay'
import { Text } from '../Text'
import { AddIcon, CheckIcon, CloseIcon, SearchIcon } from '~/icons'
import { Color } from '~/types'
import { ContextDivider, ContextItem } from '.'
import { color } from '~/utils'

const FilterInputHolderSticky = styled('div', {
  width: '100%',
  position: 'sticky',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  top: 0,
  backgroundColor: color('background2dp'),
})

const FilterInputHolder = styled('div', {
  paddingTop: 4,
  paddingBottom: 4,
  height: 36,
  paddingLeft: 22,
  paddingRight: 12,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${color('border')}`,
  width: '100%',
  backgroundColor: color('background2dp:hover'),
})

const FilterInput = styled('input', {
  position: 'relative',
  display: 'block',
  height: '36px',
  minHeight: '36px',
  width: '100%',
  minWidth: '0px',
  textAlign: 'left',
  paddingLeft: '12px',
  background: 'transparent',
  color: color('text'),
  userSelect: 'text',
})

export type Value = string | number | undefined

type onSelect = (
  e?: SyntheticEvent<Element, Event>,
  opt?: Option
) => true | void // (true means dont close)

export type Option =
  | {
      value: Value
      label?: ReactNode
      icon?: FunctionComponent
      divider?: boolean
      onSelect?: onSelect
    }
  | {
      value?: Value
      label?: ReactNode
      icon?: FunctionComponent
      divider?: boolean
      onSelect: onSelect
    }

export type ContextOptionsFilterProps = {
  // eslint-disable-next-line
  filterable?: boolean | 'create'
  placeholder?: string
  resize?: () => void
  // eslint-disable-next-line
  multiSelect?: boolean
}

export type ContextOptionsProps = {
  items: Option[] | null | undefined
  value?: Value
  onChange: (value: Value) => void
}

export type ContextMultiOptionsProps = {
  items: Option[] | null | undefined
  values?: Value[]
  onChange: (values: Value[]) => void
}

export const ContextOptionItem = ({
  option,
  onChange,
  selected,
  tabIndex,
  noRemove,
  noInset,
}: {
  option: Option
  onChange: (value: Value) => void
  selected: boolean
  tabIndex?: number
  noRemove?: boolean
  noInset?: boolean
}) => {
  const [isSelected, setIsSelected] = useState(0)

  if (option.value === '$-no-results-aviato') {
    return (
      <ContextItem inset={!noInset} noFocus color="text2">
        {option.label}
      </ContextItem>
    )
  }

  return (
    <>
      {option.divider ? <ContextDivider /> : null}
      <ContextItem
        inset={!noInset}
        tabIndex={tabIndex}
        style={{
          backgroundColor:
            isSelected === 1 ? color('lightbackground2:contrast') : null,
          '&:active': {
            backgroundColor: color('lightbackground2:contrast'),
          },
        }}
        icon={option.icon || (!noInset && selected ? CheckIcon : null)}
        onClick={(e) => {
          setIsSelected(1)

          if (option.onSelect) {
            return option.onSelect(e, option)
          } else {
            onChange(option.value)
            setTimeout(() => {
              setIsSelected(2)
              setTimeout(() => {
                if (!noRemove) {
                  removeOverlay()
                } else {
                  setIsSelected(0)
                }
              }, 125)
            }, 75)
            return true
          }
        }}
      >
        {option.label || option.value}
      </ContextItem>
    </>
  )
}

const filterItems = (
  items: Option[],
  filter?: string,
  values?: Value[]
): Option[] => {
  // TODO reduce / remake
  if (filter) {
    items = items.filter((opt) => {
      const s = String(
        (typeof opt.label === 'string' && opt.label) || opt.value
      ).toLowerCase()
      const splitFilter = filter.split(' ')
      let correct = 0
      for (const segment of splitFilter) {
        if (s.includes(segment.toLowerCase())) {
          correct++
          if (correct === splitFilter.length) {
            return true
          }
        }
      }
      return false
    })

    if (items.length === 0) {
      return [{ value: '$-no-results-aviato', label: 'No results' }]
    }
  }

  if (values) {
    items = items.filter((opt) => {
      return !values.includes(
        (typeof opt.label === 'string' && opt.label) || opt.value
      )
    })

    if (items.length === 0) {
      return [{ value: '$-no-results-aviato', label: 'No options left' }]
    }
  }

  return items
}

const FilterableContextOptions: FC<
  ContextOptionsProps & ContextOptionsFilterProps
> = ({ items, value, onChange, resize, placeholder, filterable }) => {
  const [f, setFilter] = useState('')
  const onFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFilter(e.target.value)
    if (resize) {
      resize()
    }
  }, [])
  let filteredItems = filterItems(items, f)

  if (filterable === 'create' && f && !items.find((o) => o.value === f)) {
    if (
      filteredItems.length === 1 &&
      filteredItems[0].value === '$-no-results-aviato'
    ) {
      filteredItems = [{ value: f, label: `Add "${f}"` }]
    } else {
      // clear input on click on this...
      filteredItems.push({ value: f, label: `Add "${f}"` })
    }
  }

  return (
    <>
      <FilterInputHolderSticky>
        <FilterInputHolder>
          <SearchIcon color="text2" size={16} />
          <FilterInput
            autoFocus
            data-aviato-context-item
            placeholder={placeholder || 'Filter...'}
            onChange={onFilter}
          />
        </FilterInputHolder>
      </FilterInputHolderSticky>
      <ContextItems items={filteredItems} onChange={onChange} value={value} />
    </>
  )
}

const ContextItems: FC<ContextOptionsProps> = ({ items, value, onChange }) => {
  const [currentValue, setValue] = useState(value)
  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          if (v === currentValue) {
            setValue(undefined)
            onChange(undefined)
          } else {
            setValue(v)
            onChange(v)
          }
        }}
        option={opt}
        selected={currentValue === opt.value}
      />
    )
  })
  return <>{children}</>
}

export const ContextOptions: FC<
  ContextOptionsProps & ContextOptionsFilterProps
> = ({ items = [], value, onChange, filterable, placeholder, resize }) => {
  if (filterable) {
    return (
      <FilterableContextOptions
        items={items}
        value={value}
        onChange={onChange}
        filterable={filterable}
        placeholder={placeholder}
        resize={resize}
      />
    )
  } else {
    return <ContextItems items={items} onChange={onChange} value={value} />
  }
}

const selectValuesReducer = (state: Value[], action: Value): Value[] => {
  if (state.includes(action)) {
    return state.filter((v) => v !== action)
  } else {
    return [...state, action]
  }
}

const ContextMultiItems: FC<ContextMultiOptionsProps> = ({
  items,
  values = [],
  onChange,
}) => {
  const [currentValues, setValue] = useReducer(selectValuesReducer, values)
  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          setValue(v)
          onChange(selectValuesReducer(currentValues, v))
        }}
        option={opt}
        noRemove
        selected={currentValues.includes(opt.value)}
      />
    )
  })
  return <>{children}</>
}

const FilterInputMultiHolder = styled('div', {
  paddingBottom: 4,
  flexWrap: 'wrap',
  paddingTop: 2,
  borderTopLeftRadius: 3,
  paddingLeft: 4,
  borderBottom: `1px solid ${color('border')}`,
  borderTopRightRadius: 3,
  display: 'flex',
  width: '100%',
  backgroundColor: color('lightbackground2:contrast'),
})

const FilterMultiInput = styled('input', {
  position: 'relative',
  display: 'block',
  width: 'auto',
  flexGrow: 1,
  minWidth: '0px',
  maxWidth: 260,
  paddingRight: 12,
  textAlign: 'left',
  paddingLeft: 12,
  background: 'transparent',
  // lineHeight: '$md',
  marginBottom: 4,
  marginTop: 4,
  // fontSize: '$md',
  color: color('text'),
  userSelect: 'text',
})

const StyledFilterSelectedBadge = styled('div', {
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 4,
  userSelect: 'none',
  marginTop: 4,
  flexShrink: 0,
  borderRadius: 4,
  paddingLeft: 8,
  paddingRight: 8,
  backgroundColor: color('lightbackground2:contrast'),
})

export const FilterSelectBadge: FC<{
  label: string | ReactNode
  onClose: () => void
  color?: Color
  style?: CSSProperties
}> = ({ label, onClose, color = 'inherit', style }) => {
  if (color) {
    if (!style) {
      style = { color }
    } else {
      style.color = color
    }
  }
  return (
    <StyledFilterSelectedBadge style={style}>
      <Text>{label}</Text>
      <CloseIcon
        color="text"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        size={16}
        style={{
          flexShrink: 0,
          marginLeft: 8,
        }}
      />
    </StyledFilterSelectedBadge>
  )
}

export const FilterSelectMoreBadge: FC<{
  onClick?: (e: SyntheticEvent) => void
  number: number
  color?: Color
  style?: CSSProperties
}> = ({ number, onClick, color = 'inherit', style }) => {
  // make a function for this
  if (color) {
    if (!style) {
      style = { color }
    } else {
      style.color = color
    }
  }
  return (
    <StyledFilterSelectedBadge style={style} data-aviato-select-more>
      <AddIcon
        size={16}
        color="text"
        style={{ marginRight: 8 }}
        onClick={onClick}
      />
      <Text>{String(number)}</Text>
    </StyledFilterSelectedBadge>
  )
}

const FilterableContextMultiOptions: FC<
  ContextMultiOptionsProps & ContextOptionsFilterProps
> = ({
  items,
  values,
  onChange,
  resize,
  placeholder = 'Filter...',
  filterable,
}) => {
  const [f, setFilter] = useState('')
  const onFilter: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFilter(e.target.value)
    if (resize) {
      resize()
    }
  }, [])
  const [currentValues, setValue] = useReducer(selectValuesReducer, values)

  let filteredItems = filterItems(items, f, currentValues)

  if (filterable === 'create' && f && !items.find((o) => o.value === f)) {
    if (
      filteredItems.length === 1 &&
      filteredItems[0].value === '$-no-results-aviato'
    ) {
      filteredItems = [{ value: f, label: `Add "${f}"` }]
    } else {
      // clear input on click on this...
      filteredItems.push({ value: f, label: `Add "${f}"` })
    }
  }

  const children = filteredItems.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        noInset
        onChange={(v) => {
          if (v === f && filterable === 'create') {
            setFilter('')
          }
          setValue(v)
          onChange(selectValuesReducer(currentValues, v))
          if (resize) {
            resize()
          }
        }}
        option={opt}
        noRemove
        selected={currentValues.includes(opt.value)}
      />
    )
  })

  return (
    <>
      <FilterInputHolderSticky>
        <FilterInputMultiHolder>
          {currentValues.map((v) => {
            return (
              <FilterSelectBadge
                style={{ marginLeft: 8 }}
                key={v}
                label={items.find((opt) => opt.value === v)?.label || v}
                onClose={() => {
                  setValue(v)
                  onChange(selectValuesReducer(currentValues, v))
                  if (resize) {
                    resize()
                  }
                }}
              />
            )
          })}
          <FilterMultiInput
            size={f ? f.length : placeholder.length}
            data-aviato-context-item
            value={f}
            placeholder={placeholder}
            onChange={onFilter}
          />
        </FilterInputMultiHolder>
      </FilterInputHolderSticky>
      {children}
    </>
  )
}

export const ContextMultiOptions: FC<
  ContextMultiOptionsProps & ContextOptionsFilterProps
> = ({ items = [], values, onChange, filterable, placeholder, resize }) => {
  if (filterable) {
    return (
      <FilterableContextMultiOptions
        items={items}
        values={values}
        onChange={onChange}
        filterable={filterable}
        resize={resize}
        placeholder={placeholder}
      />
    )
  } else {
    return (
      <ContextMultiItems items={items} onChange={onChange} values={values} />
    )
  }
}
