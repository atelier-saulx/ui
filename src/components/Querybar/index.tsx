/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import {
  color,
  CopyIcon,
  ClipboardIcon,
  DeleteIcon,
  Text,
  useContextMenu,
  ContextItem,
  useCopyToClipboard,
} from '~'
import { styled } from 'inlines'
import { SuggestionTags } from './SuggestionTags'
import { logicalOperatorsMap, operatorMap } from './Operators'
import { LeftPill } from './LeftPill'
import { MiddlePill } from './MiddlePill'
import { RightPill } from './RightPill'
import { LogicalOperatorPill } from './LogicalOperatorPill'
import { FromQueryToText } from './FromQueryToText'
import { useRoute } from 'kabouter'

// TODO: Caret position in and around middle block indicator

// Might have to split up the first 3 blocks and the rest as repeatable component blocks..
// TODO: make little query segments that can be copied , pasted and saved which will become filters

// TODO: double click to select all text in a block
// TODO: check default keypress options for input field (like arrows etc)
// TODO: submit after mouse selected selectbox
// TODO: Hoookup to url location to use query in table --> URL encode the filters etc
// TODO: Refactor / Clean up code / keypress handler and more
// TODO: index.tsx:210 Uncaught TypeError: _a2.forEach is not a function nested filter ts error
// TODO: bug testing 🪲

const AP_LIMIT = 140

const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

// console.log('arithmeticProgression', arithmeticProgression(4, 15))
// console.log(
//   'arithmeticProgression',
//   arithmeticProgression(4, AP_LIMIT).map((v) => v + 1)
// )

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  const [inputValue, setInputValue] = useState('In root parents type = dope')
  const [splittedInputValue, setSplittedInputValue] = useState<string[]>([])
  // count and or ors in the query
  const [arrayOfLogics, setArrayOfLogics] = useState<any[]>([])
  const [carretPosition, setCarretPosition] = useState(0)
  const [filtersAreNested, setFiltersAreNested] = useState(false)

  // focused on input field
  const [isFocused, setIsFocused] = useState(false)
  const InputFieldRef = useRef<HTMLInputElement>()

  // suggestions
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  let suggestionsLength
  let suggestionsArr = []

  const [openSelectBox, setOpenSelectBox] = useState<{
    num: number
    open: boolean
  }>({ num: 0, open: false })

  // url location
  const { location, setLocation } = useRoute()

  // //////////////////////////////////////////// FOCUS AND BLUR LOGIC
  useEffect(() => {
    if (filtersAreNested && isFocused) {
      FlattenFilters(query.filters)
      query.filters = snurpArr.reverse()
      setQuery({ ...query })
      setFiltersAreNested(false)
    } else {
      // strip the empty space first
      setInputValue(inputValue.trim())
      // zet nested filters to false
      setFiltersAreNested(true)
    }
  }, [isFocused])

  // //////////////////////////////////////////// REPEATING FILTERS LOGIC
  useEffect(() => {
    setSplittedInputValue(inputValue.split(' '))

    if (inputValue.split(' ').length > 1) {
      query.target = splittedInputValue[1]
      setLocation(`?target=${inputValue.split(' ')[1]?.toString()}`)
    }

    if (inputValue.split(' ').length > 2) {
      query.field = splittedInputValue[2]
      setLocation(`?field=${inputValue.split(' ')[2]?.toString()}`)
    }

    SetQueryFilterProperties(inputValue.split(' '))
    // dus..??
    setAndOrValues(inputValue.split(' '))
  }, [inputValue])

  // reset selected suggestion index
  useEffect(() => {
    setSelectedSuggestion(0)
    suggestionsArr = []
  }, [splittedInputValue.length])

  // //////////////////////////////////////////// SET AND OR NOT VALUES

  const setAndOrValues = (splittedInputValue) => {
    console.log('setAndOrValues', splittedInputValue)
    const length = splittedInputValue.length

    const arrWithValues = arithmeticProgression(4, AP_LIMIT).map((v) => v + 3)
    const arrWithLesserValues = arithmeticProgression(4, AP_LIMIT).map(
      (v) => v + 2
    )

    //TODO:  if the length changes at once with a paste this is not firing

    for (let j = 0; j < length; j++) {
      if (arrWithValues.includes(j)) {
        for (let i = 0; i <= arrWithValues.indexOf(j); i++) {
          arrayOfLogics[i] =
            inputValue.split(' ')[i * 4 + 6]?.charAt(0) === '$'
              ? inputValue.split(' ')[i * 4 + 6]
              : `$${inputValue.split(' ')[i * 4 + 6]}`
          setArrayOfLogics([...arrayOfLogics])
        }
      } else if (arrWithLesserValues.includes(j)) {
        for (let i = 0; i <= arrWithLesserValues.indexOf(j); i++) {
          if (j <= i * 4 + 6) {
            setArrayOfLogics([...arrayOfLogics.slice(0, i)])
          }
        }
      }
    }
  }

  // //////////////////////////////////////////// SET QUERY FILTER PROPERTIES
  const SetQueryFilterProperties = (splittedInputValue) => {
    const length = splittedInputValue.length
    const arrWithValues = arithmeticProgression(4, AP_LIMIT).map((v) => v + 2)
    const arrWithLesserValues = arithmeticProgression(4, AP_LIMIT).map(
      (v) => v + 3
    )
    arrWithLesserValues.unshift(3)

    if (
      arrWithValues.includes(length) &&
      splittedInputValue[length - 1] !== ''
    ) {
      // if put loop here in a while
      for (let i = 0; i <= arrWithValues.indexOf(length); i++) {
        // use the i value
        if (length >= i * 4 + 6) {
          console.log('the operator is: 🏺', splittedInputValue[i * 4 + 4])
          query.filters[i] = {
            $field: splittedInputValue[i * 4 + 3],
            $operator: splittedInputValue[i * 4 + 4],
            $value: splittedInputValue[i * 4 + 5],
          }
        }
      }
    } else if (arrWithLesserValues.includes(length)) {
      for (let i = 0; i <= arrWithLesserValues.indexOf(length); i++) {
        if (length <= i * 4 + 3) {
          if (query.filters.length > 0) {
            //    console.log('FIRE  🐸--> 🐯', length)
            query.filters = query.filters?.slice(0, i)
          }
        }
      }
    }

    setQuery({ ...query })
  }

  // //////////////////////////////////////////// CARRET POSITION LOGIC
  let carretIsInBlockIndex = 0
  let carretInBlockSubPos = 0
  let counter = 0
  splittedInputValue?.map((text, idx) => {
    //   console.log('blok -->', idx, 'is long', text.length + 1, 'counter', counter)
    if (
      carretPosition >= counter &&
      carretPosition <= counter + text.length + 1
    ) {
      carretIsInBlockIndex = idx
      carretInBlockSubPos = carretPosition - counter
    }
    counter += text.length + 1
    return counter
  })

  const PutCursorInRightPlaceOnClick = (e, idx, offset = 0) => {
    //  console.log('E ', e, 'IDX ', idx)
    // tell de lengte op van de blocken ervoor en dat plus e.target.id is de carret position
    const countedBlocksLength = splittedInputValue.reduce(
      (acc, curr, index) => {
        if (index < idx) {
          return acc + curr.length + 1
        } else {
          return acc
        }
      },
      0
    )

    carretIsInBlockIndex = idx
    const newSelectedCarretPosition =
      countedBlocksLength + +e.target.id + offset
    setCarretPosition(newSelectedCarretPosition)
    InputFieldRef?.current?.focus()
    InputFieldRef.current.selectionStart = newSelectedCarretPosition
    InputFieldRef.current.selectionEnd = newSelectedCarretPosition
  }

  const SelectAllTextInBlock = (blockIndex, textLength) => {
    const countedBlocksLength = splittedInputValue.reduce(
      (acc, curr, index) => {
        if (index < blockIndex) {
          return acc + curr.length + 1
        } else {
          return acc
        }
      },
      0
    )

    carretIsInBlockIndex = blockIndex
    const newSelectedCarretPosition = countedBlocksLength
    setCarretPosition(newSelectedCarretPosition + textLength)
    InputFieldRef?.current?.focus()
    InputFieldRef.current.selectionStart = newSelectedCarretPosition
    InputFieldRef.current.selectionEnd = newSelectedCarretPosition + textLength
  }

  // //////////////////////////////////////////// COMBINE AND FLATTER FILTERS QUERY LOGIC
  let snurpArr = []
  const NestFilters = (query, arr) => {
    // empty the snurpArr
    snurpArr = []
    const snurp = {}
    let target = snurp
    query?.filters?.forEach((obj, index) => {
      Object.assign(target, obj)
      const l = arr[index]
      if (l) {
        target = target[l] = {}
      }
    })
    query.filters = { ...snurp }
    setQuery({ ...query })
  }

  const FlattenFilters = (obj) => {
    const tempObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // only works if key is exactly $and or $or
        if (key !== '$and' && key !== '$or' && key !== '$not') {
          tempObj[key] = obj[key]
        }
        if (typeof obj[key] === 'object') {
          FlattenFilters(obj[key])
        }
      }
    }
    snurpArr.push(tempObj)
  }

  // //////////////////////////////////////////// URL SEARCH LOCATION LOGIC
  const urlSearch = location.search

  // //////////////////////////////////////////// SUGGESTION TAGS
  const setSuggestions = () => {
    if (
      arithmeticProgression(4, AP_LIMIT)
        .map((v) => v + 1)
        .includes(inputValue.split(' ').length)
    ) {
      suggestionsLength = Object.keys(operatorMap).length
      suggestionsArr = Object.keys(operatorMap)
      return suggestionsArr
    } else if (
      arithmeticProgression(4, AP_LIMIT)
        .map((v) => v + 3)
        .includes(inputValue.split(' ').length)
    ) {
      suggestionsLength = Object.keys(logicalOperatorsMap).length
      suggestionsArr = Object.keys(logicalOperatorsMap)
      return suggestionsArr
    } else {
      return []
    }
  }

  //  /////////////////////////////////////////// CONTEXT MENU

  const openContextMenu = useContextMenu(
    QueryContextMenu,
    {
      query,
      setQuery,
      setInputValue,
      inputValue,
      setIsFocused,
      setArrayOfLogics,
    },
    { placement: 'right' }
  )

  return (
    <>
      <div
        style={{ backgroundColor: '#e4f8ff', padding: 10, marginBottom: 12 }}
      >
        <Text>CarretPOs: {carretPosition}</Text>
        <Text color="accent">{splittedInputValue.length}</Text>
        <Text>
          Carret SUB Pos in block:{carretInBlockSubPos} = {counter}
        </Text>
        <Text color="green">
          CarretPosition in index block {carretIsInBlockIndex}{' '}
        </Text>
        <Text>inputvalue length : {inputValue.length}</Text>
        <Text>
          $and $or array :{' '}
          {arrayOfLogics.map((item, idx) => (
            <span key={idx} style={{ border: '1px solid blue', margin: 4 }}>
              {item},
            </span>
          ))}
        </Text>
      </div>
      <input
        style={{
          border: '1px solid purple',
          marginBottom: 12,
          padding: 8,
          width: '100%',
          // height: 0,
          // maxWidth: 0,
          // opacity: 0,
          // position: 'absolute',
          // pointerEvents: 'none',
        }}
        type="text"
        ref={InputFieldRef}
        value={inputValue}
        onChange={(e) => {
          // set twice to sync with useeffect
          setSplittedInputValue(e.target.value.split(' '))
          setInputValue(e.target.value)
          setCarretPosition(e.target.selectionStart)
        }}
        onClick={(e: React.SyntheticEvent<HTMLDivElement, Event>) => {
          const target = e.target as HTMLInputElement
          setCarretPosition(target.selectionStart)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
          setCarretPosition(undefined)
          console.log('on Blur 🌶--->', query)
          NestFilters(query, arrayOfLogics)
          setFiltersAreNested(true)
        }}
        onKeyDown={(e) => {
          //  console.log('e.key', e.key)
          if (e.key === 'Enter') {
            e.preventDefault()

            // you are in the right pill then fire submit and ONLY on the last one
            if (
              arithmeticProgression(4, AP_LIMIT)
                .map((v) => v + 1)
                .includes(carretIsInBlockIndex) &&
              splittedInputValue[carretIsInBlockIndex] !== '' &&
              splittedInputValue.length === carretIsInBlockIndex + 1
            ) {
              console.log('MEGA FIRE SUBMIT THROUGH ENTER 🔥')
              setIsFocused(false)
              setCarretPosition(undefined)
              NestFilters(query, arrayOfLogics)
              setFiltersAreNested(true)
              InputFieldRef?.current?.blur()
            }

            // op welke positie plak je de suggestie
            if (suggestionsArr.length > 0) {
              splittedInputValue[splittedInputValue.length - 1] =
                suggestionsArr[selectedSuggestion]
              setInputValue(splittedInputValue.join(' ') + ' ')
              // if and or not update the logic array as well dont forgetti

              if (
                Object.keys(logicalOperatorsMap).includes(
                  suggestionsArr[selectedSuggestion]
                )
              ) {
                const newIndex = arithmeticProgression(4, AP_LIMIT)
                  .map((v) => v + 2)
                  .indexOf(carretIsInBlockIndex)
                arrayOfLogics[newIndex] = suggestionsArr[selectedSuggestion]
                setArrayOfLogics([...arrayOfLogics])
                console.log('AND OR NOT 🪱')
              }
            }
          }

          if (e.key === 'Tab') {
            e.preventDefault()

            if (selectedSuggestion >= suggestionsLength - 1) {
              setSelectedSuggestion(0)
            } else {
              setSelectedSuggestion(selectedSuggestion + 1)
            }
          }

          if (e.key === 'ArrowLeft' && carretPosition > 0) {
            setCarretPosition(carretPosition - 1)
          } else if (
            e.key === 'ArrowRight' &&
            carretPosition < inputValue.length
          ) {
            setCarretPosition(carretPosition + 1)
          }

          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // 4 , 8 , 12 , 16
            // of and or or not
            // 7, 11, 15, 19
            if (
              arithmeticProgression(4, AP_LIMIT)
                .map((v) => v)
                .includes(carretIsInBlockIndex) ||
              arithmeticProgression(4, AP_LIMIT)
                .map((v) => v + 2)
                .includes(carretIsInBlockIndex)
            ) {
              setOpenSelectBox({ num: carretIsInBlockIndex, open: true })
            }
          }

          // if (e.key === 'Backspace') {
          //   if (
          //     arithmeticProgression(4, AP_LIMIT)
          //       .map((v) => v)
          //       .includes(carretIsInBlockIndex) ||
          //     arithmeticProgression(4, AP_LIMIT)
          //       .map((v) => v + 2)
          //       .includes(carretIsInBlockIndex)
          //   ) {
          //     e.preventDefault()
          //     console.log('backspace in block', carretIsInBlockIndex)
          //     let tempSplittedArr = [...splittedInputValue]
          //     tempSplittedArr[carretIsInBlockIndex] = ''
          //     setInputValue(tempSplittedArr.join(' '))
          //   }
          // }
        }}
      />

      {/*** Query raw input field  */}
      <FromQueryToText />

      <div style={{ display: 'flex', gap: 8 }}>
        <styled.div
          style={{
            outline: isFocused
              ? `2px solid rgba(44, 60, 234, 0.2)`
              : `2px solid transparent`,
            border: isFocused
              ? `1px solid ${color('accent')}`
              : `1px solid ${color('border')}`,
            borderRadius: 4,
            padding: 3,
            display: 'flex',
            alignItems: 'center',
            marginBottom: 12,
            position: 'relative',
            flexGrow: 1,
          }}
          onClick={(e) => {
            // if left button clickie
            InputFieldRef.current.selectionStart = inputValue.length
            InputFieldRef.current.selectionEnd = inputValue.length
            PutCursorInRightPlaceOnClick(e, splittedInputValue.length, -1)
          }}
          onContextMenu={(e) => {
            // if right button clickie
            e.preventDefault()
            InputFieldRef.current.selectionStart = inputValue.length
            InputFieldRef.current.selectionEnd = inputValue.length
            PutCursorInRightPlaceOnClick(e, splittedInputValue.length, -1)
            openContextMenu(e)
          }}
        >
          {splittedInputValue.map((text, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 ||
              arithmeticProgression(4, AP_LIMIT)
                .map((v) => v - 1)
                .includes(idx) ? (
                <LeftPill
                  idx={idx}
                  inputValue={inputValue}
                  arithmeticProgression={arithmeticProgression}
                  carretInBlockSubPos={carretInBlockSubPos}
                  carretIsInBlockIndex={carretIsInBlockIndex}
                  carretPosition={carretPosition}
                  text={text}
                  onClick={(e) => {
                    e.stopPropagation()
                    carretIsInBlockIndex = idx
                    PutCursorInRightPlaceOnClick(e, idx)
                  }}
                  apLimit={AP_LIMIT}
                  SelectAllTextInBlock={SelectAllTextInBlock}
                />
              ) : idx === 1 ||
                arithmeticProgression(4, AP_LIMIT).includes(idx) ? (
                <MiddlePill
                  idx={idx}
                  FlattenFilters={FlattenFilters}
                  carretInBlockSubPos={carretInBlockSubPos}
                  carretIsInBlockIndex={carretIsInBlockIndex}
                  filtersAreNested={filtersAreNested}
                  query={query}
                  setFiltersAreNested={setFiltersAreNested}
                  setInputValue={setInputValue}
                  setQuery={setQuery}
                  snurpArr={snurpArr}
                  text={text}
                  splittedInputValue={splittedInputValue}
                  openSelectBox={openSelectBox}
                  setOpenSelectBox={setOpenSelectBox}
                />
              ) : idx === 2 ||
                arithmeticProgression(4, AP_LIMIT)
                  .map((v) => v + 1)
                  .includes(idx) ? (
                <RightPill
                  idx={idx}
                  text={text}
                  arithmeticProgression={arithmeticProgression}
                  carretInBlockSubPos={carretInBlockSubPos}
                  carretIsInBlockIndex={carretIsInBlockIndex}
                  onClick={(e) => {
                    e.stopPropagation()
                    carretIsInBlockIndex = idx
                    PutCursorInRightPlaceOnClick(e, idx)
                  }}
                  apLimit={AP_LIMIT}
                />
              ) : arithmeticProgression(4, AP_LIMIT)
                  .map((v) => v + 2)
                  .includes(idx) ? (
                <LogicalOperatorPill
                  idx={idx}
                  text={text}
                  arithmeticProgression={arithmeticProgression}
                  FlattenFilters={FlattenFilters}
                  arrayOfLogics={arrayOfLogics}
                  filtersAreNested={filtersAreNested}
                  query={query}
                  setFiltersAreNested={setFiltersAreNested}
                  setInputValue={setInputValue}
                  setQuery={setQuery}
                  snurpArr={snurpArr}
                  splittedInputValue={splittedInputValue}
                  openSelectBox={openSelectBox}
                  setOpenSelectBox={setOpenSelectBox}
                  carretIsInBlockIndex={carretIsInBlockIndex}
                />
              ) : null}
            </React.Fragment>
          ))}
        </styled.div>
      </div>

      <div style={{ display: 'flex' }}>
        {setSuggestions()?.map((item, idx) => (
          <SuggestionTags
            key={idx}
            suggestion={item}
            selected={selectedSuggestion === idx}
            onClick={() => {
              setSelectedSuggestion(idx)
              splittedInputValue[4] = item
              setInputValue(splittedInputValue.join(' '))
            }}
          />
        ))}
      </div>

      {/* <div style={{ display: 'flex', gap: 12 }}>
        <Button
          onClick={() => {
            NestFilters(query, arrayOfLogics)
            setFiltersAreNested(true)
          }}
        >
          COMBINE
        </Button>
        <Button
          outline
          onClick={() => {
            FlattenFilters(query.filters)
            query.filters = snurpArr.reverse()
            setQuery({ ...query })
          }}
        >
          FLATTEN
        </Button>
      </div> */}
      <pre
        style={{
          bottom: 0,
          right: 0,
          position: 'fixed',
          background: 'black',
          color: 'lightgreen',
          zIndex: 9999,
        }}
      >
        {JSON.stringify(query, null, 2)}
      </pre>
    </>
  )
}

const QueryContextMenu = ({
  query,
  setQuery,
  setInputValue,
  inputValue,
  setIsFocused,
  setArrayOfLogics,
}) => {
  const [, copy] = useCopyToClipboard(JSON.stringify(query))

  return (
    <>
      <ContextItem
        // @ts-ignore
        onClick={copy}
        icon={CopyIcon}
      >
        Copy
      </ContextItem>
      <ContextItem
        onClick={() => {
          if (!navigator.clipboard) return
          // normal text
          // should work on https environment
          navigator.clipboard
            .readText()
            .then((clipText) => setInputValue(inputValue + clipText))
          // TODO: paste query
        }}
        icon={ClipboardIcon}
      >
        Paste
      </ContextItem>
      <ContextItem
        onClick={() => {
          setInputValue('')
          setIsFocused(false)
          setArrayOfLogics([])
          setQuery({})
        }}
        icon={DeleteIcon}
      >
        Clear
      </ContextItem>
    </>
  )
}
