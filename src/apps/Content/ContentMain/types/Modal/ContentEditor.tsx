import React, { FC, useEffect, useState } from 'react'
import {
  styled,
  Input,
  Toggle,
  Badge,
  ArrayList,
  useContextState,
  color,
} from '~'
import { FileUploadContentEditor } from './FileUploadContentEditor'
import { BOTTOMSPACE } from './constants'
import { SetList } from '~/components/SetList/index'
import { RecordList } from '~/components/RecordList'
import { ObjectList } from '~/components/ObjectList'
import { deepCopy, getByPath, setByPath } from '@saulx/utils'

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
  console.log('Incoming  🥮 data??', data, 'fields', fields, 'state', state)
  console.log('Still need to add keys to nested object fields 🔑')

  //  const [arrayOfDeepness, setArrayOfDeepness] = useState([])

  const [objectTarget]: [string, (value: string) => void] =
    useContextState('object-target')
  // const [renderCounter, setRenderCounter] = useState(1)
  // const [newFields, setNewFields] = useState(fields)

  // useEffect(() => {
  //   setRenderCounter(renderCounter + 1)
  // }, [objectTarget])

  // // get correct fields loop check
  // const iterate = (obj, objKeyName) => {
  //   Object.keys(obj).forEach((key) => {
  //     // TODO change title to key if all objects get keys via parser
  //     if (key === 'title' && obj[key] === objKeyName) {
  //       console.log('📒 fkaion', obj.properties)
  //       const arr = []
  //       for (const x in obj.properties) {
  //         arr.push(obj.properties[x])
  //       }
  //       setNewFields(arr)
  //     }

  //     if (typeof obj[key] === 'object' && obj[key] !== null) {
  //       iterate(obj[key], objKeyName)
  //     }
  //   })
  // }

  // if (objectTarget && renderCounter) {
  //   iterate(
  //     newFields,
  //     objectTarget?.split('.')[objectTarget?.split('.').length - 1]
  //   )
  //   console.log('NEW FIELDS THENM?? -->', newFields)
  //   data = getByPath(data, objectTarget.split('.'))
  // }

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer
          state={state}
          setState={setState}
          data={data}
          item={item}
          itemValue={data?.[item.key]}
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
    setState({ ...state, [item.key]: v })
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
    // const [target, setTarget] = useContextState<any>('object-target')

    const [expandedField, setExpandedField] = useState([])

    return (
      <>
        <ObjectList
          label={item.title}
          description={item.description}
          objectProperties={item.properties}
          onClick={() => {
            // TODO: Nested Object items hebben geen key
            console.log('item title???', item?.title)
            //    setTarget(target ? target + '.' + item.title : item.key)

            //  expandedFields.push(item.key)
            if (!expandedField?.includes(item?.title)) {
              //   const arrCopy =
              setExpandedField([...expandedField, item.title])
              // TODO set
              //      useContextState(item.title)
            }
          }}
          style={{ marginBottom: BOTTOMSPACE }}
          indent
        />

        {/* loop throug expandedfields and for every array map ghroug content editor */}
        {expandedField?.map((expFieldName, idx) => {
          const arr = []
          for (const x in item.properties) {
            arr.push(item.properties[x])
          }

          // Array of how deep you are

          console.log('Arr??? 🅱️', arr)
          console.log('STATE>?? 🅾️', state)
          console.log('exp field name 🆘', expFieldName)

          let pathData = getByPath(data, [expFieldName])
          console.log('Path DATA 🔔', pathData)
          console.log('new DaTA -->', data)

          return (
            <styled.div
              key={idx}
              style={{
                maxWidth: 742,
                marginTop: 32,
                marginLeft: 24,
                position: 'relative',
              }}
            >
              <styled.div
                style={{
                  position: 'absolute',
                  width: 2,
                  backgroundColor: 'rgba(236,236,236,1)',
                  top: 0,
                  left: 0,
                  bottom: 0,
                }}
              />
              {arr.map((x, i) => {
                console.log('X-Zibit', x)

                console.log(
                  'DATA>>>>??🟪',
                  getByPath(data['zzzz']['falk'], [x.title])
                )

                return (
                  <ContentRenderer
                    state={state?.[expFieldName]}
                    setState={(z) => {
                      setState({ ...state, [expFieldName]: z })
                    }}
                    data={data}
                    item={x}
                    itemValue={pathData?.[x.title]}
                    key={i}
                  />
                )
              })}
            </styled.div>
          )
        })}
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
