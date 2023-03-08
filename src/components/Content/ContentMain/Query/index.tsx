import { ArrowRightIcon, AttachmentIcon, LayersIcon, MoreIcon } from '~/icons'
import { border, color } from '~/utils'
import { Button } from '~/components/Button'
import { deepEqual } from '@saulx/utils'
import { FilterInput } from './FilterInput'
import { Pill } from './Pill'
import { ReferencesInput } from './ReferencesInput'
import { ResizableInput } from './ResizableInput'
import { SelectInput } from './SelectInput'
import { Text } from '~/components/Text'
import { useRoute } from 'kabouter'
import { ValueInput } from './ValueInput'
import React, { Fragment, useRef, useState } from 'react'

const operatorMap = {
  '=': 'is',
  '!=': 'is not',
  includes: 'includes',
  has: 'has',
}

const operatorByType = {
  string: 'includes',
  email: 'includes',
  url: 'includes',
  references: 'has',
  set: 'has',
}

const logicalOperatorsMap = {
  and: 'AND',
  or: 'OR',
  not: 'NOT',
}

// bigger than 1
// smaller than
// bigger than or equal to

const ScopePill = ({ query, setOverlay, setLocation }) => {
  return (
    <Pill>
      <Text color="text2">IN</Text>
      <>
        <LayersIcon color="accent" style={{ marginRight: 8 }} />
        <ResizableInput
          value={query.target}
          onSubmit={(value) => {
            setLocation(`?target=${value.trim()}`)
          }}
        />
      </>
      <>
        <AttachmentIcon color="accent" style={{ marginRight: 8 }} />
        <ReferencesInput
          target={query.target}
          onOverlay={setOverlay}
          value={query.field}
          onSubmit={(val) => {
            setLocation(`?field=${val}`)
          }}
        />
      </>
    </Pill>
  )
}

const Filters = ({ query, types, inputRef, setOverlay, setLocation }) => {
  return query.filters.map(({ $field, $operator, $value }, index) => {
    return (
      <Fragment key={index}>
        {index ? (
          <div
            style={{
              border: `1px solid ${color('border')}`,
              borderRadius: 4,
              padding: '4px 8px',
            }}
          >
            <SelectInput
              value="and"
              options={Object.keys(logicalOperatorsMap).map((value) => {
                return { value, label: operatorMap[value] }
              })}
              onOverlay={setOverlay}
              onSubmit={() => {
                // so now add this operator at the end of this index
                query.filters[index - 1].$and = {}
              }}
            />
          </div>
        ) : null}
        <Pill>
          {/* left side of the pill */}
          <Text color="text2">{$field}</Text>
          {/* center of the pill */}
          <SelectInput
            // TODO remove
            key={$operator}
            options={Object.keys(operatorMap).map((value) => {
              return { value, label: operatorMap[value] }
            })}
            value={$operator}
            onOverlay={setOverlay}
            onSubmit={(value) => {
              query.filters[index].$operator = value
              setLocation(
                `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
              )
            }}
          />
          {/* right side of the pill */}
          <ValueInput
            types={types}
            field={$field}
            nextInputRef={inputRef}
            value={$value}
            onOverlay={setOverlay}
            onSubmit={(value) => {
              query.filters[index].$value = value
              setLocation(
                `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
              )
            }}
            onDelete={() => {
              inputRef.current.focus()
              setLocation(
                `?filter=${encodeURIComponent(
                  JSON.stringify(
                    query.filters.filter((_, i) => {
                      return i !== index
                    })
                  )
                )}`
              )
            }}
          />
        </Pill>
      </Fragment>
    )
  })
}

export const Query = ({ types, fields, fieldTypes, query }) => {
  const { setLocation } = useRoute()
  const [options, setOptions] = useState('')
  const [focused, setFocused] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const clearRef = useRef<Function>()
  const inputRef = useRef()

  const addFieldFilter = (field) => {
    const filter = {
      $field: field,
      $operator: operatorByType[fieldTypes[field]] || '=',
    }
    if (!query.filters.find((f) => deepEqual(f, filter))) {
      setLocation(
        `?filter=${encodeURIComponent(
          JSON.stringify([...query.filters, filter])
        )}`
      )
    }
    clearRef.current?.()
  }

  return (
    <>
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: focused || overlay ? border(2, 'accent') : border(1),
          borderRadius: 8,
          padding: focused || overlay ? 3 : 4,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px 8px',
        }}
      >
        <ScopePill
          query={query}
          setOverlay={setOverlay}
          setLocation={setLocation}
        />
        <ArrowRightIcon size={20} />
        <Filters
          query={query}
          types={types}
          inputRef={inputRef}
          setOverlay={setOverlay}
          setLocation={setLocation}
        />
        <FilterInput
          clearRef={clearRef}
          inputRef={inputRef}
          fields={fields}
          setOptions={setOptions}
          onDelete={() => {
            query.filters.pop()
            setLocation(
              `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
            )
          }}
          onSubmit={(value) => {
            console.log('------>', value || fields[0])
            addFieldFilter(value || fields[0])
          }}
        />
      </div>
      <div style={{ display: 'flex', marginTop: 8 }}>
        {((options && options.split(',')) || fields).map((field, index) => {
          if (index > 6) {
            return null
          }
          if (index === 6) {
            return (
              <Button
                icon={MoreIcon}
                color="text2"
                style={{
                  padding: '2px 8px',
                  border: border(1),
                  marginRight: 8,
                  // textTransform: 'capitalize',
                }}
                outline
                key={field}
                onClick={() => {
                  addFieldFilter(field)
                }}
              />
            )
          }
          return (
            <Button
              color="text2"
              style={{
                padding: '2px 8px',
                border: border(1),
                marginRight: 8,
                // textTransform: 'capitalize',
              }}
              outline
              key={field}
              onClick={() => {
                addFieldFilter(field)
              }}
            >
              {index ? field : `${field} (Tab)`}
            </Button>
          )
        })}
      </div>
      {/* <pre
        style={{
          bottom: 0,
          right: 0,
          position: 'fixed',
          background: 'black',
          color: 'white',
          zIndex: 9999,
        }}
      >
        {JSON.stringify(query, null, 2)}
      </pre> */}
    </>
  )
}
