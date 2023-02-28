import React, { useState } from 'react'
import { color, Text } from '~'
import { styled } from 'inlines'
import { FirstFilterPill } from './FirstFilterPill'
import { RootPill } from './RootPill'
import { FakeCarret } from './FakeCarret'
import { SuggestionTags } from './SuggestionTags'
import { FirstPill } from './FirstPill'

export const QueryBuilder = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [inputString, setInputString] = useState<string>('')
  const [filters, setFilters] = useState<Object[]>([{}])
  const [suggestions, setSuggestions] = useState([
    'Yow',
    'What',
    'upa',
    'Hallo',
    'Dog',
  ])

  console.log('Filters from index --> ', filters)

  return (
    <div>
      <div style={{ marginBottom: 64 }}>
        <FirstPill />
      </div>

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
