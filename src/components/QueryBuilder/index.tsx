import React, { useState, useRef, useEffect } from 'react'
import { color, Text, removeAllOverlays } from '~'
import { styled } from 'inlines'
import { RootPill } from './RootPill'
import { FakeCaret } from './FakeCaret'
import { SuggestionTags } from './SuggestionTags'
import { FirstPill } from './FirstPill'
import { RepeatablePill } from './RepeatablePill'

export const QueryBuilder = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [pillCarretCounter, setPillCarretCounter] = useState(0)
  const [inputString, setInputString] = useState<string>('')
  const [filters, setFilters] = useState<Object[]>([{}])
  const [arrayOfFilterPills, setArrayOfFilterPills] = useState([])

  const [newIndex, setNewIndex] = useState(1)
  const [nummie, setNummie] = useState(1)

  const [suggestions, setSuggestions] = useState([
    'Yow',
    'What',
    'upa',
    'Hallo',
    'Dog',
  ])

  // TODO : Restrict certain key presses
  // TODO : refactor some loop logic
  // TODO : make sure no empty fields
  // TODO : on enter key presses
  // TODO : on focus div , set carrot in last position

  // TODO : look for cases where it will break
  // TODO : on select box, make sure the selected option has the lightgrey bg

  // TODO : connect to filter function
  // TODO : connect to location

  const mainInputRef = useRef(null)

  useEffect(() => {
    if (pillCarretCounter % 2 === 0) mainInputRef.current.focus()

    // TODO make loopie
    if (pillCarretCounter === 3) {
      setNewIndex(0)
      setNummie(1)
    }
    if (pillCarretCounter === 5) {
      setNewIndex(1)
      setNummie(1)
    }
    if (pillCarretCounter === 7) {
      setNewIndex(2)
      setNummie(1)
    }
    if (pillCarretCounter === 9) {
      setNewIndex(3)
      setNummie(1)
    }
  }, [pillCarretCounter])

  useEffect(() => {
    document.addEventListener('keydown', (e) => onKeyHandler(e))
  }, [])

  const onKeyHandler = (e) => {
    // grab the index from somewhere?
    const index = document.getElementById('index-indicator').innerHTML

    if (e.key === 'Tab' && nummie === 3) {
      e.preventDefault()
      removeAllOverlays()
      setNummie(0)
    } else if (e.key === 'Tab' && nummie === 2) {
      e.preventDefault()
      removeAllOverlays()
      document.getElementById(`${index}-selectieTwo`).click()
      console.log('Return of the nummie 🧟', nummie)
      setNummie(3)
    } else if (e.key === 'Tab' && nummie === 1) {
      e.preventDefault()
      document.getElementById(`${index}-selectieOne`).click()
      setNummie(2)
    }
  }

  return (
    <div>
      <Text color="red">Current PillCarretCounter: {pillCarretCounter}</Text>
      <Text color="accent">Current inputString: {inputString}</Text>
      <Text color="babyblue">index: {newIndex}</Text>
      <div id="index-indicator">{newIndex}</div>
      <input
        ref={mainInputRef}
        style={{ border: '1px solid green', marginBottom: 12 }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            setPillCarretCounter(pillCarretCounter - 1)
          } else if (e.key === 'ArrowRight') {
            setPillCarretCounter(pillCarretCounter + 1)
          } else {
            console.log(e.key)
            arrayOfFilterPills.push('x')
            setNummie(1)
            mainInputRef.current.blur()
            setPillCarretCounter(pillCarretCounter + 1)
            /// carretCounter gaat 1 omhoog als je iets typt
            /// create a new Element --> nieuwe pill
            /// plak het resultaat van deze element weer aan de inputString vast
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
            setPillCarretCounter(2)
          }
        }}
      >
        <RootPill />
        <FirstPill
          setInputString={setInputString}
          pillCarretCounter={pillCarretCounter}
          setPillCarretCounter={setPillCarretCounter}
        />
        {pillCarretCounter === 2 && <FakeCaret />}

        {arrayOfFilterPills.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <RepeatablePill
                index={idx}
                inputString={inputString}
                setInputString={setInputString}
                pillCarretCounter={pillCarretCounter}
                setPillCarretCounter={setPillCarretCounter}
                nummie={nummie}
              />
            </React.Fragment>
          )
        })}
      </styled.div>

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
