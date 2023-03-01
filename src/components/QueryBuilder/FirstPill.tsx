import React, { useState, useRef, useEffect } from 'react'
import { styled, Styled } from 'inlines'
import { Select } from '../Select'
import { removeAllOverlays } from '../Overlay'

// todo regex the box i guess

type FirstPillProps = {}

let nummie = 1

export const FirstPill = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [subPills, setSubPills] = useState<string[]>(['', '', ''])
  const [openBoxNum, setOpenBoxNum] = useState<number>(1)

  const inputRefOne = useRef(null)
  const inputRefTwo = useRef(null)
  const inputRefThree = useRef(null)

  const firstSelectionRef = useRef(null)
  const secondSelectionRef = useRef(null)

  // TODO make keydownhandler for the input refs
  useEffect(() => {
    document.addEventListener('keydown', (e) => onKeyHandler(e))
  }, [])

  const onKeyHandler = (e) => {
    if (e.key === 'Tab' && nummie === 3) {
      removeAllOverlays()
      nummie = 0
      console.log('BAM!')
    } else if (e.key === 'Tab' && nummie === 2) {
      removeAllOverlays()
      //   console.log('Tab TWO was pressed')
      //  secondSelectionRef.current.click()
      inputRefThree.current.focus()
      console.log('Return of the nummie 🧟', nummie)
      nummie = 3
    } else if (e.key === 'Tab' && nummie === 1) {
      console.log('Tab was pressed')
      //  firstSelectionRef.current.click()
      inputRefTwo.current.focus()
      console.log('nummie 🇧🇪', nummie)
      nummie = 2
    }
  }

  //   useEffect(() => {
  //     removeAllOverlays()
  //     if (nummie === 2) {
  //       inputRefThree.current.focus()
  //     }
  //   }, [subPills[1]])
  return (
    <>
      {/* one */}
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
            // inputRefTwo.current.focus()
            //      setOpenBoxNum(2)
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
      {/* two */}
      <input
        value={subPills[1]}
        ref={inputRefTwo}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16, maxWidth: 100 }}
        onKeyDown={(e) => {
          console.log(e.key)

          //   if (e.key === 'Tab') {
          //     e.preventDefault()
          //     inputRefThree.current.focus()
          //   }
          //   if (e.key === 'Enter') {
          //     e.preventDefault()
          //     inputRefThree.current.focus()
          //   } else {
          //     e.preventDefault()
          //     return false
          //   }
        }}
        onChange={(e) => {
          subPills[1] = e.currentTarget.value.replace(/\s/g, '')
          setSubPills([...subPills])
        }}
        onFocus={() => {
          removeAllOverlays()
          nummie = 2
          firstSelectionRef.current.click()
        }}
      />
      {/* three */}
      <input
        value={subPills[2]}
        ref={inputRefThree}
        type="text"
        style={{ border: '1px solid purple', marginBottom: 16, maxWidth: 100 }}
        onKeyDown={(e) => {
          console.log(e.key)
          //   if (e.key === ' ') {
          //     e.preventDefault()
          //     e.stopPropagation()
          //     return false
          //   }

          //   if (e.key === 'Tab') {
          //     e.preventDefault()
          //     secondSelectionRef.current.click()
          //   }
        }}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          subPills[2] = e.currentTarget.value.replace(/\s/g, '')
          console.log(subPills)
          setSubPills([...subPills])
        }}
        onFocus={() => {
          nummie = 3
          secondSelectionRef.current.click()
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
          options={['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']}
          onChange={(e: string) => {
            subPills[1] = e
            setSubPills([...subPills])

            setTimeout(() => {
              console.log('Got some time?? ⌛️')
              secondSelectionRef.current.click()
            }, 250)
          }}
          style={{
            maxWidth: 74,
            '& div': { padding: '8px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
          //   onClick={() => {
          //     console.log('CLICKIE')
          //     nummie = 2
          //   }}
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
