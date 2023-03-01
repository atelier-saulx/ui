import React, { useState, useRef, useEffect } from 'react'
import { color, Text } from '~'
import { styled } from 'inlines'
import { FirstFilterPill } from './FirstFilterPill'
import { RootPill } from './RootPill'
import { FakeCarret } from './FakeCarret'
import { SuggestionTags } from './SuggestionTags'
import { FirstPill } from './FirstPill'

export const QueryBuilder = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [pillCarretCounter, setPillCarretCounter] = useState(0)

  const [inputString, setInputString] = useState<string>('')
  const [filters, setFilters] = useState<Object[]>([{}])

  const [selectFirstPill, setSelectFirstPill] = useState<boolean>(false)

  const [suggestions, setSuggestions] = useState([
    'Yow',
    'What',
    'upa',
    'Hallo',
    'Dog',
  ])

  const mainInputRef = useRef(null)

  useEffect(() => {
    if (pillCarretCounter % 2 === 0) mainInputRef.current.focus()
  }, [pillCarretCounter])

  console.log('Filters from index --> ', filters)

  return (
    <div>
      <Text>Current inputString: {inputString}</Text>
      <input
        ref={mainInputRef}
        style={{ border: '1px solid green', marginBottom: 12 }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            console.log('<--- LEFT')
            setPillCarretCounter(pillCarretCounter - 1)
          }
          if (e.key === 'ArrowRight') {
            console.log('RIGHT -->')
            setPillCarretCounter(pillCarretCounter + 1)
          }
        }}
      />
      <styled.div
        style={{
          border: isFocus
            ? `1px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
          outline: isFocus
            ? `2px solid rgba(44, 60, 234, 0.2)`
            : `2px solid transparent`,
          borderRadius: 4,
          padding: 5,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          cursor: 'text',
        }}
        onClick={() => {
          // mainInputRef.current.focus()
          setIsFocus(true)
          if (
            inputString.split(' ').length === 3 &&
            inputString.split(' ')[0] !== '' &&
            inputString.split(' ')[1] !== ''
          ) {
            setPillCarretCounter(2)
            mainInputRef.current.focus()
          } else {
            setPillCarretCounter(1)
          }
        }}
      >
        <FirstPill
          setInputString={setInputString}
          pillCarretCounter={pillCarretCounter}
          setPillCarretCounter={setPillCarretCounter}
        />
        {pillCarretCounter === 2 && <FakeCarret />}
      </styled.div>

      {/* <Text space>full string: {inputString}</Text>
      <styled.div
        style={{
          border: isFocus
            ? `1px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
          outline: isFocus
            ? `2px solid rgba(44, 60, 234, 0.2)`
            : `2px solid transparent`,
          borderRadius: 4,
          padding: 5,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          cursor: 'text',
        }}
        onClick={() => setIsFocus(true)}
        onKeyDown={(e) => {
          if (isFocus) {
            // console.log('EEEE -->', e)
          }
        }}
      >
        <RootPill />
        <FirstFilterPill
          setIsFocus={setIsFocus}
          suggestions={suggestions}
          setFilters={setFilters}
          filters={filters}
        />
        {/* <FakeCarret /> */}
      {/* </styled.div> */}

      {/* Array map suggestions 
      // <div style={{ display: 'flex' }}>
      //   {suggestions.map((sug, idx) => (
      //     <SuggestionTags
      //       key={idx}
      //       onClick={() => {
      //         console.log('clickie')
      //       }}
      //       suggestion={idx === 0 ? `${sug} (Tab)` : sug}
      //     />
      //   ))}
      // </div> */}
    </div>
  )
}
