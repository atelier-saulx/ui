import React, { useState, useRef, useEffect } from 'react'
import { styled, Styled } from 'inlines'
import { color, Text, CloseCircleIcon } from '~'
import { Select } from '../Select'
import { removeAllOverlays } from '../Overlay'
import { FakeCaret } from './FakeCaret'

// todo regex the box i guess
// TODO -> make sure you clean time out on page change
// TODO -> you cant unselect if you select the same thing twice

type FirstPillProps = {}

let nummie = 1

export const FirstPill = ({
  setInputString,
  pillCarretCounter,
  setPillCarretCounter,
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [subPills, setSubPills] = useState<string[]>(['xx', '=', 'flip'])
  const [selectWholePill, setSelectWholePill] = useState<boolean>(false)

  const inputRefOne = useRef(null)
  const firstSelectionRef = useRef(null)
  const secondSelectionRef = useRef(null)

  // TODO make keydownhandler for the input refs
  useEffect(() => {
    document.addEventListener('keydown', (e) => onKeyHandler(e))
  }, [])

  useEffect(() => {
    if (pillCarretCounter !== 1) {
      console.log('ABORT MISSION??')
      document.removeEventListener('keydown', onKeyHandler)
      nummie = 4
    }
  }, [pillCarretCounter])

  const onKeyHandler = (e) => {
    if (e.key === 'Tab' && nummie === 3) {
      removeAllOverlays()
      nummie = 0
      console.log('BAM!')
    } else if (e.key === 'Tab' && nummie === 2) {
      removeAllOverlays()
      secondSelectionRef.current.click()
      console.log('Return of the nummie 🧟', nummie)
      nummie = 3
    } else if (e.key === 'Tab' && nummie === 1) {
      console.log('Tab was pressed')
      firstSelectionRef.current.click()
      nummie = 2
    }
  }

  const deletePill = () => {
    console.log('DELETE THIS')
    // TODO Delete on backspace
    setSelectWholePill(false)
  }

  useEffect(() => {
    if (subPills[2]) {
      setInputString(subPills.join(' '))
    }
  }, [subPills[2], subPills[1]])

  useEffect(() => {
    if (pillCarretCounter === 1) {
      if (subPills[0] && subPills[1]) {
        setSelectWholePill(true)
      } else {
        console.log('Focus mothaflippa')
        inputRefOne.current.focus()
      }
    } else {
      setSelectWholePill(false)
    }
  }, [pillCarretCounter])

  return (
    <>
      {/* one */}
      <input
        ref={inputRefOne}
        type="text"
        style={{
          border: '1px solid purple',
          marginBottom: 16,
          maxWidth: 100,
          position: 'absolute',
          top: 20,
        }}
        onKeyDown={(e) => {
          console.log('-->', e.key)
          if (e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            return false
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
        onFocus={() => (nummie = 1)}
      />

      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <Text
          color="text2"
          onClick={() => {
            setPillCarretCounter(1)
            setSelectWholePill(true)
          }}
          style={{
            height: 28,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            border: 0,
            borderRadius: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderRight: subPills[0]
              ? `1px solid ${color('border')}`
              : '1px solid transparent',
            backgroundColor: selectWholePill
              ? 'rgba(44, 60, 234, 0.08)'
              : subPills[0]
              ? color('lightgrey', 'hover') // 'rgba(44, 60, 234, 0.08)'
              : color('background'),
            position: 'relative',
            cursor: 'text',
          }}
        >
          {!subPills[0] && pillCarretCounter === 1 ? (
            <FakeCaret />
          ) : (
            subPills[0]
          )}
        </Text>
        <Select
          placeholder=""
          ref={firstSelectionRef}
          value={subPills[1]}
          filterable
          options={['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']}
          onChange={(e: string) => {
            subPills[1] = e
            setSubPills([...subPills])
            setTimeout(() => {
              console.log('Got some time?? ⌛️')
              secondSelectionRef.current.click()
            }, 250)
          }}
          onClick={() => {
            nummie = 2
          }}
          style={{
            height: 28,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            border: 0,
            borderRadius: 0,
            backgroundColor:
              selectWholePill && subPills[1]
                ? 'rgba(44, 60, 234, 0.08)'
                : subPills[1]
                ? color('lightgrey', 'hover') // 'rgba(44, 60, 234, 0.08)'
                : color('background'),
            borderRight: subPills[1]
              ? `1px solid ${color('border')}`
              : '1px solid transparent',
            boxShadow: subPills[1] ? 'inherit' : '0px',
            position: 'relative',
            cursor: 'text',
            '@media (hover: hover)': {
              '&:hover': {
                backroundColor: color('lightgrey', 'hover'),
              },
            },
            maxWidth: 'fit-content',
            '& div': { padding: '8px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
        />
        <Select
          placeholder=""
          ref={secondSelectionRef}
          value={subPills[2]}
          filterable
          options={['Snurpie', 'Flarpie', 'Florkie']}
          onChange={(e: string) => {
            subPills[2] = e
            setSubPills([...subPills])
            setPillCarretCounter(2)
            console.log('SUBPILLs', subPills)
          }}
          style={{
            height: 28,
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            border: 0,
            borderRadius: 0,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            backgroundColor:
              selectWholePill && subPills[2]
                ? 'rgba(44, 60, 234, 0.08)'
                : subPills[2]
                ? color('lightgrey', 'hover') // 'rgba(44, 60, 234, 0.08)'
                : color('background'),
            boxShadow: subPills[2] ? 'inherit' : '0px',
            position: 'relative',
            cursor: 'text',
            '@media (hover: hover)': {
              '&:hover': {
                backroundColor: color('lightgrey', 'hover'),
              },
            },
            maxWidth: 'fit-content',
            '& div': { padding: '8px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
        />
        {selectWholePill && (
          <CloseCircleIcon
            color="accent"
            size={12}
            style={{
              position: 'absolute',
              top: -4,
              right: -5,
              cursor: 'pointer',
            }}
            onClick={() => deletePill()}
          />
        )}
      </div>
    </>
  )
}
