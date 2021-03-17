import React, { useState } from 'react'
import Icon from '../icon/Search'

const Input = ({
  style,
  onChange,
  value,
  placeholder,
  defaultValue,
  autoFocus
}) => {
  const [state, setInternal] = useState(defaultValue)
  const useInternal = value === undefined

  return (
    <input
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={useInternal ? state : value}
      type='text'
      onChange={e => {
        setInternal(e.target.value)
        onChange(e.target.value)
      }}
      style={{
        fontFamily:
          'San Fransisco, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        appearance: 'none',
        fontSize: 12,
        fontWeight: 'bold',
        ...style
      }}
    />
  )
}

const Search = ({
  style,
  onChange,
  value,
  placeholder,
  defaultValue,
  color
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 2.5,
        padding: 5,
        ...style
      }}
    >
      <Search.Icon color={color} />
      <Input
        style={{
          width: '100%'
        }}
        autoFocus
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  )
}

Search.Icon = ({ style, color }) => {
  return (
    <Icon
      color={color}
      style={{
        marginLeft: 2.5,
        marginRight: 7.5,
        ...style
      }}
    />
  )
}

Search.Input = Input

export default Search
