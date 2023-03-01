import React, { useState, useRef, useEffect } from 'react'
import {
  Text,
  color,
  removeAllOverlays,
  Select,
  CloseCircleIcon,
  usePropState,
} from '~'
import { styled, Styled } from 'inlines'
import { FakeCaret } from './FakeCaret'

let nummie = 0

export const RepeatablePill = ({
  inputString,
  setInputString,
  pillCarretCounter,
  setPillCarretCounter,
  index,
}) => {
  const [subPills, setSubPills] = useState<string[]>(['', '', ''])
  const [selectWholePill, setSelectWholePill] = useState<boolean>(false)
  const [pillnum] = usePropState(pillCarretCounter)

  const inputRefUno = useRef(null)
  const firstSelectionRefUno = useRef(null)
  const secondSelectionRefDos = useRef(null)

  const selectElementOne = document.getElementById(`${index}-selectieOne`)
  const selectElementTwo = document.getElementById(`${index}-selectieTwo`)

  console.log('index --> 🥶 ', index)

  useEffect(() => {
    if (
      (index === 0 && pillnum === 3) ||
      (index === 1 && pillnum === 5) ||
      (index === 2 && pillnum === 7)
    ) {
      if (subPills[0] && subPills[1]) {
        setSelectWholePill(true)
      } else {
        console.log('Focus mothaflippa')
        nummie = 1
        document.getElementById(`${index}-oneInput`).focus()
      }
    } else {
      setSelectWholePill(false)
    }
    console.log('FIREFIERE 🔥')
  }, [])

  //   useEffect(() => {
  //     if (
  //       (index === 0 && pillCarretCounter === 3) ||
  //       (index === 1 && pillCarretCounter === 5) ||
  //       (index === 2 && pillCarretCounter === 7)
  //     ) {
  //       if (subPills[0] && subPills[1]) {
  //         setSelectWholePill(true)
  //       } else {
  //         console.log('Focus mothaflippa')
  //         nummie = 1
  //         inputRefUno?.current?.focus()
  //       }
  //     } else {
  //       setSelectWholePill(false)
  //     }
  //   }, [pillCarretCounter])

  // const controller = new AbortController()

  //   useEffect(() => {
  //     document.addEventListener('keydown', (e) => onKeyHandler(e), {
  //       signal: controller.signal,
  //     })
  //   }, [])

  useEffect(() => {
    if (index === 0 && pillnum === 3) {
      console.log('🧐')
      document.addEventListener('keydown', (e) => onKeyHandler(e))
    } else if (index === 1 && pillnum === 5) {
      console.log('🤓')
      document.addEventListener('keydown', (e) => onKeyHandler(e))
    } else if (index === 2 && pillnum === 7) {
      console.log('😛')
      document.addEventListener('keydown', (e) => onKeyHandler(e))
    }
  }, [])

  useEffect(() => {
    // if (index === 0 && pillCarretCounter !== 3) {
    //   console.log('ABORT MISSION?? ', index)
    //   document.removeEventListener('keydown', onKeyHandler)
    //   removeAllOverlays()
    //   nummie = 0
    // } else if (index === 1 && pillCarretCounter !== 5) {
    //   document.removeEventListener('keydown', onKeyHandler)
    //   removeAllOverlays()
    //   nummie = 0
    // } else if (index === 2 && pillCarretCounter !== 7) {
    //   document.removeEventListener('keydown', onKeyHandler)
    //   removeAllOverlays()
    //   nummie = 0
    // }
    document.removeEventListener('keydown', onKeyHandler)
  }, [subPills[1], subPills[2], pillnum])

  const onKeyHandler = (e) => {
    if (e.key === 'Tab' && nummie === 3) {
      e.preventDefault()
      removeAllOverlays()
      nummie = 0
      console.log('BAM!')
    } else if (e.key === 'Tab' && nummie === 2) {
      e.preventDefault()
      removeAllOverlays()
      document.getElementById(`${index}-selectieTwo`).click()
      console.log('Return of the nummie 🧟', nummie)
      nummie = 3
    } else if (e.key === 'Tab' && nummie === 1) {
      e.preventDefault()
      console.log(
        'Tab was pressed GET GET????? 😡',
        document.getElementById(`${index}-selectieOne`)
      )
      document.getElementById(`${index}-selectieOne`).click()
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
      const temp = inputString.split(' ')
      // TODO SET THE RIGHT POSITION PER INDEX
      temp[4] = subPills[0]
      temp[5] = subPills[1]
      temp[6] = subPills[2]
      setInputString(temp.join(' '))
    }
  }, [subPills[2], subPills[1]])

  return (
    <>
      <input
        id={`${index}-oneInput`}
        ref={inputRefUno}
        type="text"
        style={{
          border: '1px solid pink',
          background: 'rgba(0,0,0,0.33)',
          marginBottom: 16,
          maxWidth: 100,
          position: 'absolute',
          top: 30,
          left: index === 0 ? 100 : index * 240,
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
        onFocus={() => (nummie = 1)}
      />
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <Text
          color="text2"
          onClick={() => {
            // setPillCarretCounter(index + 3)
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
          {!subPills[0] && pillnum === 1 ? <FakeCaret /> : subPills[0]}
        </Text>
        <Select
          id={`${index}-selectieOne`}
          placeholder=""
          //  ref={firstSelectionRefUno}
          value={subPills[1]}
          filterable
          options={['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']}
          onChange={(e: string) => {
            subPills[1] = e
            setSubPills([...subPills])
            setTimeout(() => {
              console.log('Got some time?? ⌛️')
              document.getElementById(`${index}-selectieTwo`).click()
            }, 250)
          }}
          onClick={() => {
            //   nummie = 2
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
          id={`${index}-selectieTwo`}
          placeholder=""
          //    ref={secondSelectionRefDos}
          value={subPills[2]}
          filterable
          options={['Snurpie', 'Flarpie', 'Florkie']}
          onChange={(e: string) => {
            subPills[2] = e
            setSubPills([...subPills])
            setPillCarretCounter(
              index === 0 ? 4 : index === 1 ? 6 : index === 2 ? 8 : 10
            )
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
