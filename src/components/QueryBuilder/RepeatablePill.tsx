import React, { useState, useRef, useEffect } from 'react'
import { Text, color, removeAllOverlays, Select, CloseCircleIcon } from '~'
import { styled, Styled } from 'inlines'
import { FakeCaret } from './FakeCaret'

let nummie = 1

export const RepeatablePill = ({
  setInputString,
  pillCarretCounter,
  setPillCarretCounter,
  index,
}) => {
  const [subPills, setSubPills] = useState<string[]>(['', '', ''])
  const [selectWholePill, setSelectWholePill] = useState<boolean>(false)

  const inputRefUno = useRef(null)
  const firstSelectionRefUno = useRef(null)
  const secondSelectionRefDos = useRef(null)

  useEffect(() => {
    if (pillCarretCounter === index + 3) {
      if (subPills[0] && subPills[1]) {
        setSelectWholePill(true)
      } else {
        console.log('Focus mothaflippa')
        inputRefUno.current.focus()
      }
    } else {
      setSelectWholePill(false)
    }
  }, [pillCarretCounter])

  useEffect(() => {
    document.addEventListener('keydown', (e) => onKeyHandler(e))
  }, [])

  useEffect(() => {
    if (pillCarretCounter !== index + 3) {
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
      secondSelectionRefDos.current.click()
      console.log('Return of the nummie 🧟', nummie)
      nummie = 3
    } else if (e.key === 'Tab' && nummie === 1) {
      console.log('Tab was pressed')
      firstSelectionRefUno.current.click()
      nummie = 2
    }
  }

  const deletePill = () => {
    console.log('DELETE THIS')
    // TODO Delete on backspace
    setSelectWholePill(false)
  }

  return (
    <>
      <input
        ref={inputRefUno}
        type="text"
        style={{
          border: '1px solid pink',
          background: 'lightgreen',
          marginBottom: 16,
          maxWidth: 100,
          position: 'absolute',
          top: 30,
          left: 240,
        }}
        onKeyDown={(e) => {
          console.log(e.key)
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
        // onFocus={() => (nummie = 1)}
      />
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <Text
          color="text2"
          onClick={() => {
            setPillCarretCounter(index + 3)
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
            marginLeft: 12,
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
          ref={firstSelectionRefUno}
          value={subPills[1]}
          filterable
          options={['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']}
          onChange={(e: string) => {
            subPills[1] = e
            setSubPills([...subPills])
            setTimeout(() => {
              console.log('Got some time?? ⌛️')
              secondSelectionRefDos.current.click()
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
          ref={secondSelectionRefDos}
          value={subPills[2]}
          filterable
          options={['Snurpie', 'Flarpie', 'Florkie']}
          onChange={(e: string) => {
            subPills[2] = e
            setSubPills([...subPills])
            setPillCarretCounter(index + pillCarretCounter + 1)
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
