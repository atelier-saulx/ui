import React, { FC, useEffect, useState } from 'react'
import {
  styled,
  Input,
  Toggle,
  Badge,
  ArrayList,
  Button,
  useDialog,
  useContextState,
} from '~'
import { FileUploadContentEditor } from './FileUploadContentEditor'
import { BOTTOMSPACE } from './constants'
import { SetList } from '~/components/SetList/index'
import { useSchema } from '~/apps/Schema/hooks/useSchema'
import { RecordList } from '~/components/RecordList'
import { ObjectList } from '~/components/ObjectList'
import { Modal } from '.'
import { getByPath } from '@saulx/utils'

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
  console.log('Incoming  🥮 data??', data, fields, state)

  // console.log('🐤--> state', state)
  // console.log('DATA-->', data)
  // console.log('Fields --> ', fields)

  const [objectTarget, setObjectTarget] = useContextState('object-target')

  const makeArrayFromObjectTarget = (target: string): string[] => {
    if (target?.split('.')?.length > 1) {
      const arr = target.split('.')

      const filteredArr = arr.filter((item) => item !== 'properties')
      console.log('ARRRR MATEYS', filteredArr)
      return filteredArr
    } else {
      return [target]
    }
  }

  // deeper objects
  // set more object-targets paths,

  // 1 arg ->
  // get correct fields loop check
  if (objectTarget) {
    // let lastObjectPart =
    //   objectTarget?.split('.')[objectTarget?.split('.').length - 1]
    // console.log(lastObjectPart, '🧀')

    // walktrough the array and skip over properties

    for (const prop in fields) {
      if (fields[prop]?.key === objectTarget) {
        console.log('This one -->', fields[prop])
        const newFields = []

        for (const x in fields[prop].properties) {
          console.log()
          newFields.push(fields[prop].properties[x])
        }

        fields = newFields
      }
    }

    console.log('🍜', objectTarget)
    makeArrayFromObjectTarget(objectTarget)
    // data = data[objectTarget]

    console.log('NEWFIELDS', fields)

    console.log('DATA Object Target', data)
    //  const test = getByPath(data, objectTarget?.split('.'))
    // console.log('🥧', test)
  }

  // objectTarget word array
  // functie -> ignore properties, skip over properties.
  // path = directe path

  // get by path skip properties

  // 2
  // get correct data
  // getByPath(t,  als array)
  const test = getByPath(data, makeArrayFromObjectTarget(objectTarget))
  console.log('--> TEST 🍿', test)

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer
          state={state}
          setState={setState}
          data={data}
          item={item}
          itemValue={data[item.key]}
          key={i}
        />
      ))}
    </styled.div>
  )
}

// 3 close modal remove object target from url

const ContentRenderer: FC<{
  item: { [key: string]: any }
  itemValue: any
  data: any
  state: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ item, itemValue, setState, state, data }) => {
  const onChange = (v: any) => {
    console.log('👃 v', v, item, itemValue)

    // TODO
    // elke keer als ie properties tegenkomt ga verder qua diepte??
    if (item.key.split('.').includes('properties')) {
      // TODO: improve this logic make it dynamic
      const arr = item.key.split('.')
      setState({
        ...state,
        [arr[0]]: {
          [arr[2]]: v,
        },
      })
    } else {
      setState({ ...state, [item.key]: v })
    }
  }

  // **** START 🚥 ****

  // STRING // TEXT
  if (item.type === 'string' || item.type === 'text') {
    // depending on String format return a different type of input field
    // TODO: for text add Language

    let inputType

    if (item?.format === 'URL') {
      inputType = 'url'
    } else if (item?.format === 'rgbColor') {
      inputType = 'color'
    } else if (item?.format === 'email') {
      inputType = 'email'
    } else if (item?.contentMediaType === 'text/markdown') {
      inputType = 'markdown'
    } else {
      inputType = 'text'
    }

    return (
      <Input
        label={item.title}
        description={item.description}
        type={inputType}
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        maxChars={item?.maxLength}
        format={item?.format}
        disabled={item?.readOnly}
        isRequired={item?.isRequired}
        pattern={item?.pattern}
      />
    )
  }

  // ENUM

  // NUMBER
  if (item.type === 'number') {
    return (
      <Input
        label={item.title}
        disabled={item?.readOnly}
        type="number"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        description={item?.description}
        max={item?.maximum}
        min={item?.minimum}
        format={item?.format}
        // multipleOf={item?.multipleOf}
        // exclusiveMaximum={item?.exclusiveMaximum}
        // exclusiveMinimum={item?.exclusiveMinimum}
        isRequired={item?.isRequired}
      />
    )
  }

  // CARDINALITY

  // INTEGER
  // TODO: Change to Integer later
  if (item.type === 'int') {
    return (
      <Input
        label={item.title}
        disabled={item?.readOnly}
        type="number"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        description={item?.description}
        max={item?.maximum}
        min={item?.minimum}
        integer
        // multipleOf={item?.multipleOf}
        // exclusiveMaximum={item?.exclusiveMaximum}
        // exclusiveMinimum={item?.exclusiveMinimum}
        isRequired={item?.isRequired}
      />
    )
  }

  // TIMESTAMP
  if (item.type === 'timestamp') {
    return (
      <Input
        label={item.title}
        description={item.description}
        type="date"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        disabled={item?.readOnly}
        isRequired={item?.isRequired}
        time
      />
    )
  }

  // BOOLEAN
  if (item.type === 'boolean') {
    return (
      <Toggle
        label={item.title}
        description={item?.description}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        onChange={onChange}
        indent
        disabled={item?.readOnly}
        isRequired={item?.isRequired}
      />
    )
  }

  // JSON
  if (item.type === 'json') {
    return (
      <Input
        label={item.title}
        description={item?.description}
        type="json"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        disabled={item?.readOnly}
        isRequired={item?.isRequired}
      />
    )
  }

  // OBJECT
  if (item.type === 'object') {
    const [showMore, setShowMore] = useState(false)

    const [target, setTarget] = useContextState<any>('object-target')

    console.log(target)

    // maak een array van de properties
    const arrOfProperties = []
    console.log(Object.keys(item.properties))
    Object.keys(item.properties).map((i, idx) =>
      arrOfProperties.push(item.properties[i])
    )
    // console.log(arrOfProperties)
    console.log('Object -->', item)
    // console.log('🐸--> state', state)

    return (
      <>
        <ObjectList
          label={item.title}
          description={item.description}
          objectProperties={item.properties}
          onClick={() => {
            // setShowMore(true)

            // TODO: Nested Object items hebben geen key
            // los op in de propsparser??

            setTarget(
              target ? target + '.properties.title.' + item.title : item.key
            )

            console.log(item.properties)
          }}
          style={{ marginBottom: BOTTOMSPACE }}
          indent
        />

        {/* {showMore && (
          <styled.div
            style={{
              maxWidth: 742,
              margin: '48px auto',
              paddingLeft: 24,
              backgroundColor: '#f4f0fd',
            }}
          >
            {arrOfProperties?.map((objItem, i) => {
              console.log('🦊', objItem)

              // open in new sub window

              return (
                <ContentRenderer
                  state={state}
                  setState={setState}
                  data={data}
                  item={objItem}
                  itemValue={
                    data[item?.key][
                      objItem?.key?.split('.')[
                        objItem.key?.split('.').length - 1
                      ]
                    ]
                  }
                  key={i}
                />
              )
            })}
          </styled.div>
        )} */}

        {/* <Button onClick={() => setTarget(item.key)}>
          set object target in url
        </Button> */}
      </>
    )
  }

  // RECORD
  if (item.type === 'record') {
    return (
      <RecordList
        label={item.title}
        description={item.description}
        recordType={item.items.type}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        onChange={onChange}
        indent
      />
    )
  }

  // ARRAY
  if (item.type === 'array') {
    console.log('Array item --> ', item)

    return (
      <ArrayList
        label={item.title}
        description={item.description}
        style={{ marginBottom: BOTTOMSPACE }}
        value={itemValue}
        onChange={onChange}
        indent
        arrayType={item.items.type}
      />
    )
  }

  // SET
  if (item.type === 'set') {
    return (
      <SetList
        label={item.title}
        description={item.description}
        value={itemValue}
        setType={item.items.type}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  // REFERENCE
  if (item.type === 'reference') {
    if (
      item?.allowedTypes?.includes('file') ||
      item?.allowedTypes?.type === 'file'
    ) {
      //     name?: string;
      //     type: string;
      //     meta?: any;
      //     key: string;
      //     mimeTypeKey?: string;

      return (
        <FileUploadContentEditor
          data={data}
          item={item}
          name={item.title}
          state={state}
          onChange={onChange}
          style={{ marginBottom: BOTTOMSPACE }}
        />
      )
    } else {
      // TODO:  Reference Search modal
      return (
        <Input
          label={item.title}
          type="text"
          placeholder="Referenced ID"
          onChange={onChange}
          value={itemValue}
          style={{ marginBottom: BOTTOMSPACE, width: 150 }}
          indent
        />
      )
    }
  }

  // REFERENCES

  if (item.type === 'id') {
    return <Badge>{itemValue}</Badge>
  }

  // if (item.type === 'type') {
  //   return (
  //     <InputWrapper
  //       label={item.title}
  //       style={{ marginBottom: BOTTOMSPACE }}
  //       indent
  //       value=""
  //     >
  //       <Badge>{itemValue}</Badge>
  //     </InputWrapper>
  //   )
  // }

  return (
    <styled.div style={{ marginBottom: 12 }}>
      {item.title + ' : ' + item.type}
    </styled.div>
  )
}
