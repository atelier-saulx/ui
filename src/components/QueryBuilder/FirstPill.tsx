import React, { useState, useRef } from 'react'
import { styled, Styled } from 'inlines'
import { Select } from '../Select'

// todo regex the box i guess

type FirstPillProps = {}

export const FirstPill = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [subPills, setSubPills] = useState<string[]>(['', '', ''])

  const inputRef = useRef(null)

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16 }}
        onKeyDown={(e) => {
          console.log(e.key)
          if (e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            return false
            console.log('SPatie was pressed')
          }

          if (e.key === 'Tab') {
            e.preventDefault()
          }
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          subPills[0] = e.currentTarget.value.replace(/\s/g, '')
          console.log(subPills)
          setSubPills([...subPills])
        }}
      />

      <styled.div
        style={{
          height: 32,
          width: 400,
          border: '1px solid lightgrey',
          borderRadius: 4,
          display: 'flex',
          gap: 12,
        }}
        onClick={() => inputRef.current.focus()}
      >
        <div style={{ background: 'yellow' }}>{subPills[0]}</div>
        <Select
          options={['=', '<', '!=']}
          onChange={() => {}}
          style={{ maxWidth: 100 }}
        />
      </styled.div>
    </>
  )
}
