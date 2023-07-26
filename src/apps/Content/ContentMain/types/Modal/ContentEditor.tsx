import React, { FC } from 'react'
import { styled, Input, Toggle, Badge } from '~'
import { FileUploadContentEditor } from './FileUploadContentEditor'
import { BOTTOMSPACE } from './constants'
import { SetList } from '~/components/SetList'
import { useSchema } from '~/apps/Schema/hooks/useSchema'

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
  console.log('data??', data, fields, state)

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
  // STRING
  if (item.type === 'string') {
    // depending on String format return a different type of input field

    let inputType

    if (item?.format === 'URL') {
      inputType = 'url'
    } else if (item?.format === 'rgbColor') {
      inputType = 'color'
    } else if (item?.format === 'email') {
      inputType = 'email'
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
        multipleOf={item?.multipleOf}
        exclusiveMaximum={item?.exclusiveMaximum}
        exclusiveMinimum={item?.exclusiveMinimum}
        isRequired={item?.isRequired}
      />
    )
  }

  // CARDINALITY
  // INTEGER

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

  // TEXT
  if (item.type === 'text') {
    return (
      <Input
        label={item.title}
        description={item.description}
        type="text"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  // OBJECT
  // RECORD
  // ARRAY
  // SET
  if (item.type === 'set') {
    return (
      <SetList
        label={item.title}
        description={item.description}
        value={item.value}
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

      // console.log('item?? 🅾️', item)

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

  // if (item.meta?.format === 'markdown') {
  //   return (
  //     <Input
  //       label={item.title}
  //       type="markdown"
  //       value={itemValue}
  //       onChange={onChange}
  //       style={{ marginBottom: BOTTOMSPACE }}
  //       indent
  //     />
  //   )
  // }

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
