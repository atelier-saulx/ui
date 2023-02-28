import React, { useState, useRef, useEffect } from 'react'
import { styled, Styled } from 'inlines'
import { Select } from '../Select'
import { removeAllOverlays } from '../Overlay'

// todo regex the box i guess

type FirstPillProps = {}

export const FirstPill = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [subPills, setSubPills] = useState<string[]>(['', '', ''])

  const inputRefOne = useRef(null)
  const inputRefTwo = useRef(null)
  const inputRefThree = useRef(null)

  const firstSelectionRef = useRef(null)
  const secondSelectionRef = useRef(null)

  // TODO make keydownhandler for the input refs

  return (
    <>
      <input
        ref={inputRefOne}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16, maxWidth: 100 }}
        onKeyDown={(e) => {
          console.log(e.key)
          if (e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            return false
          }

          if (e.key === 'Tab') {
            e.preventDefault()
            firstSelectionRef.current.click()
          }
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          subPills[0] = e.currentTarget.value.replace(/\s/g, '')
          console.log(subPills)
          setSubPills([...subPills])
        }}
      />
      <input
        value={subPills[1]}
        ref={inputRefTwo}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16, maxWidth: 100 }}
        onKeyDown={(e) => {
          console.log(e.key)
          if (e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            return false
          }

          if (e.key === 'Tab') {
            e.preventDefault()
            secondSelectionRef.current.click()
          }
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          subPills[1] = e.currentTarget.value.replace(/\s/g, '')
          console.log(subPills)
          setSubPills([...subPills])
        }}
      />
      <input
        value={subPills[2]}
        ref={inputRefThree}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16, maxWidth: 100 }}
        onKeyDown={(e) => {
          console.log(e.key)
          if (e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            return false
          }

          if (e.key === 'Tab') {
            e.preventDefault()
            secondSelectionRef.current.click()
          }
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          subPills[2] = e.currentTarget.value.replace(/\s/g, '')
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
        onClick={() => inputRefOne.current.focus()}
      >
        <div style={{ background: 'yellow', minWidth: 36 }}>{subPills[0]}</div>
        <Select
          ref={firstSelectionRef}
          value={subPills[1]}
          filterable
          options={['=', '<', '!=']}
          onChange={(e: string) => {
            subPills[1] = e
            setSubPills([...subPills])
            inputRefTwo.current.focus()
          }}
          style={{
            maxWidth: 74,
            '& div': { padding: '8px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
        />
        <Select
          ref={secondSelectionRef}
          value={subPills[2]}
          filterable
          options={['Snurpie', 'Flarpie', 'Florkie']}
          onChange={(e: string) => {
            subPills[2] = e
            setSubPills([...subPills])
          }}
          style={{
            maxWidth: 74,
            '& div': { padding: '8px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
        />
      </styled.div>
    </>
  )
}
